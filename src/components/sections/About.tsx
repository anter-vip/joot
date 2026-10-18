"use client";

import { useRef } from "react";
import GradientDescent from "@/animations/GradientDescent";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export default function About() {
  const lossRef = useRef<HTMLSpanElement>(null);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading index="01" kicker="Profile" title="About" subtitle={profile.goal} />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="pt-2 font-mono text-sm text-accent">💡 {profile.funFact}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="card border-gradient p-5">
            <div className="mono-label mb-2">optimizing career_path.py</div>
            <div className="h-44 w-full">
              <GradientDescent lossRef={lossRef} />
            </div>
            <div className="mt-3 font-mono text-xs text-neutral-500">
              loss = <span ref={lossRef} className="text-accent">—</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
