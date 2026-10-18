"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

const K = 4;
const CLUSTER_COLORS = ["#00E5FF", "#7C3AED", "#22c55e", "#f59e0b"];

type Pt = { x: number; y: number; vx: number; vy: number; c: number };

/**
 * COVER banner: live K-Means. Points drift in, get assigned to the nearest of
 * K centroids, centroids step toward cluster means, and the loop restarts —
 * a subtle, always-moving "data clustering" motif.
 */
export default function KMeansCover() {
  const points = useRef<Pt[]>([]);
  const centroids = useRef<{ x: number; y: number }[]>([]);
  const phase = useRef({ acc: 0, iter: 0, resetIn: 0 });

  const canvasRef = useCanvas(({ ctx, width, height, dt }) => {
    if (points.current.length === 0) {
      points.current = Array.from({ length: 220 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        c: 0,
      }));
      centroids.current = Array.from({ length: K }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    }

    const s = phase.current;
    s.acc += dt;

    // drift + soft bounce
    for (const p of points.current) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    // run an iteration ~4 times/sec
    if (s.acc > 0.25) {
      s.acc = 0;
      // assign
      for (const p of points.current) {
        let best = 0;
        let bd = Infinity;
        centroids.current.forEach((c, i) => {
          const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        p.c = best;
      }
      // update centroids toward means
      const sums = Array.from({ length: K }, () => ({ x: 0, y: 0, n: 0 }));
      for (const p of points.current) {
        sums[p.c].x += p.x;
        sums[p.c].y += p.y;
        sums[p.c].n++;
      }
      centroids.current.forEach((c, i) => {
        if (sums[i].n > 0) {
          c.x += (sums[i].x / sums[i].n - c.x) * 0.45;
          c.y += (sums[i].y / sums[i].n - c.y) * 0.45;
        }
      });
      s.iter++;
      if (s.iter > 34) {
        s.iter = 0;
        centroids.current.forEach((c) => {
          c.x = Math.random() * width;
          c.y = Math.random() * height;
        });
      }
    }

    // render
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);

    for (const p of points.current) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `${CLUSTER_COLORS[p.c]}aa`;
      ctx.fill();
    }
    for (let i = 0; i < centroids.current.length; i++) {
      const c = centroids.current[i];
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = CLUSTER_COLORS[i];
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
