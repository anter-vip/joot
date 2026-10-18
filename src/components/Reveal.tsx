"use client";

import { motion } from "framer-motion";

/**
 * Mask-reveal + blur-to-sharp entrance used across sections.
 * Respects reduced motion via framer-motion's built-in handling of the
 * `initial`/`whileInView` when combined with the media query at page level.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="mono-label mb-6 flex items-center gap-3">
      <span className="text-[#00E5FF]">// {index}</span>
      <span className="h-px w-10 bg-white/15" />
      {label}
    </div>
  );
}
