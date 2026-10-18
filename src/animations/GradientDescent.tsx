"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

/**
 * ABOUT section motif: 1-D gradient descent on a non-convex loss surface.
 * A ball rolls down the curve, learning-rate step; the live loss value is
 * written into a sibling <span> (refs only — no per-frame React re-render).
 */
export default function GradientDescent({ lossRef }: { lossRef: React.RefObject<HTMLSpanElement> }) {
  const state = useRef({ x: -2.4, learningDone: 0 });

  // loss + its derivative
  const f = (x: number) => 0.05 * x ** 4 - 0.4 * x ** 2 + x * 0.2 + 1.6;
  const df = (x: number) => 0.2 * x ** 3 - 0.8 * x + 0.2;

  const canvasRef = useCanvas(({ ctx, width, height, dt }) => {
    const lr = 0.6;
    state.current.x -= lr * df(state.current.x) * dt * 3;
    // keep in view
    if (state.current.x < -3.2) state.current.x = -3.2;
    if (state.current.x > 3.2) state.current.x = 3.2;

    const xMin = -3.2;
    const xMax = 3.2;
    const pad = 24;
    const yPix = (v: number) => height - pad - v * (height - pad * 2) * 0.4;
    const xPix = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (width - pad * 2);

    ctx.clearRect(0, 0, width, height);

    // depth grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 6; i++) {
      const gy = pad + ((height - pad * 2) / 6) * i;
      ctx.beginPath();
      ctx.moveTo(pad, gy);
      ctx.lineTo(width - pad, gy);
      ctx.stroke();
    }

    // loss curve
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.02) {
      const px = xPix(x);
      const py = yPix(f(x));
      if (x === xMin) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "#7C3AED";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ball
    const bx = xPix(state.current.x);
    const by = yPix(f(state.current.x));
    ctx.beginPath();
    ctx.arc(bx, by, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#00E5FF";
    ctx.shadowColor = "#00E5FF";
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (lossRef.current) lossRef.current.textContent = f(state.current.x).toFixed(4);
  });

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
