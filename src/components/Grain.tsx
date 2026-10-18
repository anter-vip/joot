"use client";

/**
 * Subtle animated film-grain overlay (SVG feTurbulence), kept at ~4% opacity
 * and refreshed a few times a second for a living, non-static feel.
 */
import { useEffect, useRef } from "react";

export default function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (ref.current) {
        ref.current.style.transform = `translate(${Math.random() * 6 - 3}%, ${Math.random() * 6 - 3}%)`;
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed -left-[50vw] -top-[50vh] left-0 z-[90] h-[200vh] w-[200vw] opacity-[0.045]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
