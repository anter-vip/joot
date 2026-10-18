"use client";

import { useMemo, useState } from "react";
import { SectionTag } from "@/components/Reveal";

// synthetic retail dataset, grouped by region
const DATA: Record<string, { label: string; sales: number; units: number }[]> = {
  All: [
    { label: "Cairo", sales: 820, units: 1240 },
    { label: "Giza", sales: 610, units: 980 },
    { label: "Alex", sales: 430, units: 720 },
    { label: "Delta", sales: 380, units: 640 },
    { label: "Upper", sales: 260, units: 510 },
  ],
  Egypt: [
    { label: "Cairo", sales: 820, units: 1240 },
    { label: "Giza", sales: 610, units: 980 },
    { label: "Alex", sales: 430, units: 720 },
    { label: "Delta", sales: 380, units: 640 },
  ],
  Gulf: [
    { label: "Riyadh", sales: 540, units: 760 },
    { label: "Dubai", sales: 690, units: 900 },
    { label: "Doha", sales: 300, units: 420 },
  ],
};

/**
 * Dashboard Showcase: a filterable bar chart that re-animates when you switch
 * segment — a small taste of the Al-Basira BI experience.
 */
export default function DashboardShowcase() {
  const regions = Object.keys(DATA);
  const [region, setRegion] = useState("All");
  const [metric, setMetric] = useState<"sales" | "units">("sales");

  const rows = DATA[region];
  const max = Math.max(...rows.map((r) => r[metric]));

  const total = useMemo(
    () => rows.reduce((s, r) => s + r[metric], 0),
    [rows, metric],
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <SectionTag index="05" label="Dashboard Showcase" />
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`chip transition-colors ${
                  region === r ? "!border-[#00E5FF] !text-[#00E5FF]" : "hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["sales", "units"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`chip transition-colors ${
                  metric === m ? "!border-[#7C3AED] !text-[#c4b5fd]" : "hover:text-white"
                }`}
              >
                {m === "sales" ? "Revenue (k EGP)" : "Units"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-end gap-4">
          <div>
            <div className="mono-label">total</div>
            <div className="font-mono text-3xl font-bold text-[#00E5FF]">
              {total.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-6 flex h-52 items-end gap-4">
          {rows.map((r) => {
            const h = (r[metric] / max) * 100;
            return (
              <div key={r.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="font-mono text-xs text-white/60">{r[metric]}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#7C3AED] to-[#00E5FF] transition-[height] duration-500 ease-out"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-white/50">{r.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
