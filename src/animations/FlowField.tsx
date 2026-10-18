"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";
import { fbm } from "./noise";

type P = { x: number; y: number; px: number; py: number; life: number; speed: number };

/**
 * HERO flow field: thousands of particles advected by an fbm vector field,
 * drawing fading cyan trails. The pointer repels nearby particles.
 */
export default function FlowField() {
  const particles = useRef<P[]>([]);
  const seeded = useRef(false);

  const canvasRef = useCanvas(({ ctx, width, height, time, dt, mouse }) => {
    const target = Math.min(width < 720 ? 700 : 1600, 1600);
    if (!seeded.current || particles.current.length < target) {
      particles.current = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        px: 0,
        py: 0,
        life: Math.random() * 200,
        speed: 0.6 + Math.random() * 1.4,
      }));
      seeded.current = true;
    }

    // fade the whole field toward black for the trail effect
    ctx.fillStyle = "rgba(5,5,5,0.10)";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;

    const scale = 0.0016;
    const step = 900 * dt;

    for (const p of particles.current) {
      const angle = fbm(p.x * scale, p.y * scale + time * 0.04, 4) * Math.PI * 4;
      let vx = Math.cos(angle);
      let vy = Math.sin(angle);

      // pointer repulsion
      if (mouse.inside) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const f = (140 - Math.sqrt(d2)) / 140;
          vx += (dx / (Math.sqrt(d2) || 1)) * f * 2.2;
          vy += (dy / (Math.sqrt(d2) || 1)) * f * 2.2;
        }
      }

      p.px = p.x;
      p.py = p.y;
      p.x += vx * step * p.speed;
      p.y += vy * step * p.speed;
      p.life -= dt * 60;

      const out = p.x < 0 || p.y < 0 || p.x > width || p.y > height || p.life < 0;
      if (out) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.px = p.x;
        p.py = p.y;
        p.life = 200;
        continue;
      }

      const alpha = 0.16 + 0.28 * Math.sin(time * 0.6 + p.x * 0.01);
      ctx.strokeStyle = `rgba(0,229,255,${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  });

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
