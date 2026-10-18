"use client";

import FlowField from "@/animations/FlowField";
import KMeansCover from "@/animations/KMeansCover";
import ScrambleText from "@/components/ScrambleText";
import TypeLine from "@/components/TypeLine";
import MagneticButton from "@/components/MagneticButton";
import { profile } from "@/data/profile";

export default function Hero() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="relative min-h-[100svh] overflow-hidden">
      {/* hero flow-field background */}
      <div className="absolute inset-0">
        <FlowField />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink" />

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pt-10 pb-16">
        {/* COVER banner: live K-Means */}
        <div className="card overflow-hidden">
          <div className="h-40 w-full sm:h-56">
            <KMeansCover />
          </div>
        </div>

        {/* Avatar + open-to-work */}
        <div className="relative -mt-14 flex items-end gap-5 px-2">
          <div className="relative">
            <div className="rotating-ring h-28 w-28 rounded-full p-[3px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-surface text-3xl font-bold text-[#00E5FF]">
                {initials}
              </div>
            </div>
            {profile.openToWork && (
              <span className="absolute bottom-1 right-1 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/80 px-2 py-1 text-[10px]">
                <span className="pulse-dot" /> Open to work
              </span>
            )}
          </div>
        </div>

        {/* Name + headline */}
        <div className="mt-8 max-w-3xl">
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            <ScrambleText text={profile.name} className="gradient-text" />
          </h1>
          <div className="mt-3 font-mono text-sm text-[#00E5FF] sm:text-base">
            <TypeLine text={profile.typedHeadline} />
          </div>
          <p className="mt-4 text-white/60">
            {profile.role} · {profile.location} · {profile.languages.join(" · ")}
          </p>
          <p className="mt-1 text-white/40">🎯 {profile.goal}</p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton href={profile.links.linkedin} className="btn btn-solid">
            Connect ↗
          </MagneticButton>
          <MagneticButton href={profile.links.github} className="btn">
            View GitHub ↗
          </MagneticButton>
          <a href="#contact" className="btn">
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
