import StatCell from "@/components/StatCell";
import { profile } from "@/data/profile";

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((s) => (
          <StatCell key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}
