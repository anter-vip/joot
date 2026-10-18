"use client";

import ForceGraph from "@/animations/ForceGraph";
import Reveal, { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

export default function Skills() {
  const edges = profile.skills.edges as [number, number][];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="04" label="Skills" />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="card p-3">
            <div className="mono-label px-2 pt-1">drag a node · hover to trace relations</div>
            <div className="h-[360px] w-full sm:h-[440px]">
              <ForceGraph nodes={profile.skills.graph} edges={edges} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card h-full p-6">
            <div className="mono-label mb-4">proficiency</div>
            <div className="space-y-4">
              {profile.skills.bars.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-white/75">{b.label}</span>
                    <span className="font-mono text-white/45">{b.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {profile.skills.groups.map((g) => (
                <div key={g.label}>
                  <div className="mono-label mb-1.5">{g.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
