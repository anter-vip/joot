"use client";

import { useRef } from "react";
import { useCanvas } from "./useCanvas";

type Frame = { arr: number[]; i: number; j: number; swap: boolean };

/** Record every comparison/swap of a real QuickSort as renderable frames. */
function buildSteps(input: number[]): Frame[] {
  const arr = [...input];
  const frames: Frame[] = [];
  const push = (i: number, j: number, swap = false) =>
    frames.push({ arr: [...arr], i, j, swap });

  function quick(lo: number, hi: number) {
    if (lo >= hi) return;
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      push(i, j);
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        push(i, j, true);
        i++;
      }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    push(i, hi, true);
    quick(lo, i - 1);
    quick(i + 1, hi);
  }
  quick(0, arr.length - 1);
  frames.push({ arr: [...arr], i: -1, j: -1, swap: false });
  return frames;
}

/**
 * PROJECTS card motif: a mini sorting-algorithm visualizer that plays its
 * QuickSort frames once when the card scrolls into view, then holds on the
 * sorted result.
 */
export default function SortingCanvas() {
  const data = useRef<number[]>([]);
  const frames = useRef<Frame[]>([]);
  const cursor = useRef(0);
  const ready = useRef(false);

  const canvasRef = useCanvas(({ ctx, width, height }) => {
    if (!ready.current) {
      data.current = Array.from({ length: 26 }, () => 12 + Math.random() * 88);
      frames.current = buildSteps(data.current);
      ready.current = true;
      cursor.current = 0;
    }

    const f = frames.current[Math.min(cursor.current, frames.current.length - 1)];
    if (cursor.current < frames.current.length - 1) cursor.current += 1;

    ctx.clearRect(0, 0, width, height);
    const n = f.arr.length;
    const bw = width / n;
    for (let i = 0; i < n; i++) {
      const h = (f.arr[i] / 100) * (height - 4);
      const isHi = i === f.i || i === f.j;
      ctx.fillStyle = isHi ? (f.swap ? "#00E5FF" : "#7C3AED") : "rgba(255,255,255,0.28)";
      ctx.fillRect(i * bw + 1, height - h, bw - 2, h);
    }
  });

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
