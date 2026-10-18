"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 75%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="02" label="Experience" />
      <div ref={root} className="relative pl-8">
        <div className="tl-line absolute left-2 top-2 h-[calc(100%-1rem)] w-[2px] bg-gradient-to-b from-[#00E5FF] via-[#7C3AED] to-transparent" />
        <div className="space-y-8">
          {profile.experience.map((e, i) => (
            <div key={i} className="tl-item relative">
              <span className="absolute -left-[26px] top-2 h-3 w-3 rounded-full border-2 border-[#00E5FF] bg-ink" />
              <div className="card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs text-[#00E5FF]">{e.period}</span>
                </div>
                <div className="mt-1 text-sm text-white/50">
                  {e.org} · <span className="text-white/40">{e.kind}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-[#7C3AED]">▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
