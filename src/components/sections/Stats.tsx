import StatCell from "@/components/StatCell";
import { profile } from "@/data/profile";

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="glow-line" />
      <div className="grid gap-4 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {profile.stats.map((s) => (
          <StatCell key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
      <div className="glow-line" />
    </section>
  );
}
