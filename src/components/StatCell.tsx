"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats strip cell: number counts up with easing when scrolled into view,
 * plus a small animated sparkline drawn next to it.
 */
export default function StatCell({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }
        const t0 = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  // deterministic little sparkline shape
  const pts = Array.from({ length: 12 }, (_, i) => {
    const wobble = Math.sin(i * 0.9 + value) * 6;
    const y = 22 - (i / 11) * 18 - wobble;
    return `${(i / 11) * 60},${Math.max(2, Math.min(26, y))}`;
  }).join(" ");

  return (
    <div ref={ref} className="card flex items-center justify-between gap-4 p-5">
      <div>
        <div className="font-mono text-3xl font-bold text-[#00E5FF]">
          {display}
          {suffix}
        </div>
        <div className="mt-1 text-xs text-white/50">{label}</div>
      </div>
      <svg width="60" height="28" className="shrink-0 opacity-80">
        <polyline
          points={pts}
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
