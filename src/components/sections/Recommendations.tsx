import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

/** Auto-scrolling testimonial marquee (pauses on hover via CSS). */
export default function Recommendations() {
  const loop = [...profile.recommendations, ...profile.recommendations];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading index="07" kicker="Words" title="Recommendations" subtitle="What teammates and managers say about working with me." />
      <div className="marquee-wrap marquee-mask overflow-hidden py-2">
        <div className="marquee-track">
          {loop.map((r, i) => (
            <figure key={i} className="card w-[360px] shrink-0 p-5" style={{ animation: "none" }}>
              <div className="mb-2 font-mono text-2xl leading-none text-accent/40">“</div>
              <blockquote className="text-sm leading-relaxed text-neutral-300">{r.quote}</blockquote>
              <figcaption className="mt-3 font-mono text-xs text-accent">— {r.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
