"use client";

import SortingCanvas from "@/animations/SortingCanvas";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading index="03" kicker="Portfolio" title="Featured Projects" subtitle={profile.featuredNote} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="h-full">
            <article
              className={`card group flex h-full flex-col p-5 ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              {/* sorting motif fades into the card on entry */}
              <div className="mb-4 h-16 w-full overflow-hidden rounded-md border border-white/5 bg-black/30 opacity-70 transition-opacity group-hover:opacity-100">
                <SortingCanvas />
              </div>

              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <span className="mono-label whitespace-nowrap">{p.status}</span>
              </div>
              <p className="mt-2 flex-1 text-sm text-white/65">{p.tagline}</p>
              <div className="mt-3 font-mono text-xs text-[#00E5FF]">✦ {p.metric}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 font-mono text-xs text-white/50 hover:text-[#00E5FF]"
                >
                  View repository ↗
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
