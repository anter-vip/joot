"use client";

import { useRef } from "react";
import GradientDescent from "@/animations/GradientDescent";
import Reveal, { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

export default function About() {
  const lossRef = useRef<HTMLSpanElement>(null);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="01" label="About" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-white/75">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="pt-2 font-mono text-sm text-[#00E5FF]">💡 {profile.funFact}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="card p-5">
            <div className="mono-label mb-2">optimizing career_path.py</div>
            <div className="h-44 w-full">
              <GradientDescent lossRef={lossRef} />
            </div>
            <div className="mt-3 font-mono text-xs text-white/50">
              loss = <span ref={lossRef} className="text-[#00E5FF]">—</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
