"use client";

import { useEffect, useRef } from "react";

export type DrawArgs = {
  ctx: CanvasRenderingContext2D;
  width: number; // CSS pixel width
  height: number; // CSS pixel height
  time: number; // seconds since mount
  dt: number; // seconds since last frame (capped)
  mouse: { x: number; y: number; inside: boolean };
};

/**
 * Boilerplate for every algorithmic canvas:
 *  - device-pixel-ratio aware sizing that follows the parent box
 *  - requestAnimationFrame loop
 *  - pauses when scrolled out of view (IntersectionObserver)
 *  - renders a single static frame for prefers-reduced-motion
 *  - tracks pointer position in CSS pixels
 * The `draw` callback is kept in a ref so callers can re-create it freely.
 */
export function useCanvas(draw: (a: DrawArgs) => void) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement ?? canvas;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: -9999, y: -9999, inside: false };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
    };
    const onLeave = () => (mouse.inside = false);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    let t = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (visible && !reduced) {
        t += dt;
        drawRef.current({ ctx, width, height, time: t, dt, mouse });
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      // render a few warm-up frames so the static image looks populated
      for (let i = 0; i < 60; i++) {
        t += 1 / 60;
        drawRef.current({ ctx, width, height, time: t, dt: 1 / 60, mouse });
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return canvasRef;
}
