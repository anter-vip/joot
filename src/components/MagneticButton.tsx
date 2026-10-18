"use client";

import { useRef } from "react";

/** Magnetic CTA: the element leans toward the cursor while hovered. */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={move}
        onMouseLeave={leave}
        className={className}
        style={{ transition: "transform 0.25s ease" }}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
      className={className}
      style={{ transition: "transform 0.25s ease" }}
    >
      {children}
    </button>
  );
}
