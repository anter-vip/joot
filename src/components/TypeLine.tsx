"use client";

import { useEffect, useState } from "react";

/** Terminal-style typewriter with a blinking block cursor. */
export default function TypeLine({
  text,
  className = "",
  delay = 350,
  speed = 32,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (shown.length >= text.length) return;
    const t = setTimeout(() => setShown((s) => text.slice(0, s.length + 1)), speed);
    return () => clearTimeout(t);
  }, [started, shown, text, speed]);

  return (
    <span className={className}>
      {shown}
      <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse bg-[#00E5FF]/70">▊</span>
    </span>
  );
}
