"use client";

import { useRef } from "react";
import Reveal, { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

/** Certifications & Education with a holographic tilt + light-sweep on hover. */
export default function Certifications() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  const tilt = (i: number, e: React.MouseEvent) => {
    const el = cards.current[i];
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg) translateY(-4px)`;
  };
  const reset = (i: number) => {
    const el = cards.current[i];
    if (el) el.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  };

  const items = [
    ...profile.certifications.map((c) => ({ ...c, kind: "Certification" })),
    { title: "GitHub Profile", org: profile.links.github, note: "Repositories & contributions", kind: "Profile" },
  ];

  return (
    <section id="credentials" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="06" label="Certifications & Education" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <div
              ref={(el) => {
                cards.current[i] = el;
              }}
              onMouseMove={(e) => tilt(i, e)}
              onMouseLeave={() => reset(i)}
              className="card holo p-5 transition-transform duration-300 will-change-transform"
            >
              <span className="chip">{c.kind}</span>
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-[#00E5FF]/80">{c.org}</p>
              <p className="mt-2 text-sm text-white/55">{c.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
