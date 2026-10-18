"use client";

import { useEffect, useState } from "react";

/** Thin gradient progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-full origin-left transition-[width] duration-150"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, #00e5ff, #7c3aed)",
          boxShadow: "0 0 12px rgba(0,229,255,0.6)",
        }}
      />
    </div>
  );
}
