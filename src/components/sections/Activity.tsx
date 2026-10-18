import { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

/** Activity feed styled like terminal log entries with timestamps. */
export default function Activity() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="08" label="Activity" />
      <div className="card p-5 font-mono text-sm">
        <div className="mb-3 text-white/30"># latest.log</div>
        {profile.activity.map((a, i) => (
          <div key={i} className="flex gap-3 py-1">
            <span className="text-white/30">[{a.time}]</span>
            <span className="text-[#00E5FF]">›</span>
            <span className="text-white/70">{a.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
