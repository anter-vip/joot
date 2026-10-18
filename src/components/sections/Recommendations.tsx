import { SectionTag } from "@/components/Reveal";
import { profile } from "@/data/profile";

/** Auto-scrolling testimonial marquee (pauses on hover via CSS). */
export default function Recommendations() {
  const loop = [...profile.recommendations, ...profile.recommendations];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="07" label="Recommendations" />
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-track">
          {loop.map((r, i) => (
            <figure
              key={i}
              className="card w-[340px] shrink-0 p-5"
              style={{ animation: "none" }}
            >
              <blockquote className="text-sm text-white/75">“{r.quote}”</blockquote>
              <figcaption className="mt-3 font-mono text-xs text-[#00E5FF]">— {r.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
