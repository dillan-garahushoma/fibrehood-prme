import { Coins, Users, ShieldCheck } from "lucide-react";
import { NAVY, GOLD, Reveal } from "./aboutHooks";

export const VALUES = [
  { id: "affordability", icon: Coins, accent: "navy", title: "Affordability", description: "Quality internet that fits more lives." },
  { id: "inclusivity", icon: Users, accent: "gold", title: "Inclusivity", description: "Everyone connected. No one left behind." },
  { id: "reliability", icon: ShieldCheck, accent: "navy", title: "Reliability", description: "A connection you can count on." },
];

export function ValueCard({ value, delay = 0 }) {
  const Icon = value.icon;
  const isGold = value.accent === "gold";

  return (
    <Reveal delay={delay} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <span
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: isGold ? GOLD : NAVY }}
      >
        <Icon className="h-6 w-6" style={{ color: isGold ? NAVY : "#FFFFFF" }} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mb-2 text-xl font-extrabold" style={{ color: NAVY }}>
        {value.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-500">{value.description}</p>
      <span
        className="block h-1 w-8 rounded-full transition-all duration-500 group-hover:w-12"
        style={{ backgroundColor: GOLD }}
        aria-hidden="true"
      />
    </Reveal>
  );
}

export default function WhatWeStandFor({ values = VALUES }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-8" style={{ backgroundColor: GOLD }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">What We Stand For</span>
          </div>
          <h2 className="mb-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: NAVY }}>
            Three things we&apos;ll never compromise on
          </h2>
          <p className="mb-10 text-base text-slate-500">A fairer, more connected future for everyone.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((value, i) => (
            <ValueCard key={value.id} value={value} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhatWeStandFor };