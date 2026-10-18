import { profile } from "@/data/profile";

/** Activity feed styled like a live terminal log, framed as a macOS-style window. */
export default function Activity() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="card border-gradient overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-neutral-500">~/activity — latest.log</span>
        </div>
        <div className="p-5 font-mono text-sm">
          {profile.activity.map((a, i) => (
            <div key={i} className="row-hover flex gap-3 rounded px-2 py-1">
              <span className="shrink-0 text-neutral-600">[{a.time}]</span>
              <span className="shrink-0 text-accent">›</span>
              <span className="text-neutral-300">{a.text}</span>
            </div>
          ))}
          <div className="mt-2 flex gap-2 px-2 text-neutral-500">
            <span className="text-accent">$</span>
            <span className="pulse-caret">▋</span>
          </div>
        </div>
      </div>
    </section>
  );
}
