"use client";

import { useState } from "react";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  const [toast, setToast] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.links.email}`;
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-28 text-center">
      <Reveal>
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">08 — Contact</span>
          <span className="h-px w-8 bg-accent/60" />
        </div>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          <span className="gradient-text">Let&apos;s build something with data.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">{profile.goal}</p>
      </Reveal>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <MagneticButton onClick={copyEmail} className="btn btn-solid">
          ✉ {profile.links.email} · copy
        </MagneticButton>
        <MagneticButton href={profile.links.linkedin} className="btn">
          LinkedIn ↗
        </MagneticButton>
        <MagneticButton href={profile.links.github} className="btn">
          GitHub ↗
        </MagneticButton>
      </div>

      <footer className="mt-16 border-t border-white/5 pt-6 font-mono text-xs text-neutral-600">
        © {new Date().getFullYear()} {profile.name} · built with Next.js, Tailwind, Framer
        Motion, GSAP & custom algorithms.
      </footer>

      {toast && <div className="toast">✓ Email copied to clipboard</div>}
    </section>
  );
}
