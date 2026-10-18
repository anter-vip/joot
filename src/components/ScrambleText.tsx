"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "0123456789ABCDEFXYZ░▒▓<>-_/[]{}=+*";

/**
 * Text-scramble "decryption": random glyphs resolve into the target text
 * left to right. Respects reduced motion (shows final text immediately).
 */
export default function ScrambleText({
  text,
  className = "",
  speed = 1,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = text.length;
    const tick = () => {
      const revealed = Math.floor(frame / speed);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") {
          s += " ";
        } else if (i < revealed) {
          s += text[i];
        } else {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(s);
      frame++;
      if (revealed <= total) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, speed]);

  return <span className={className}>{out}</span>;
}
