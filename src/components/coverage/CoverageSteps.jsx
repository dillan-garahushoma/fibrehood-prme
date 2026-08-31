import React from "react";
import { MapPin, Radar, Rocket } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";

const STEPS = [
  { Icon: MapPin, title: "Find Your Location", body: "Enter your address or securely use your current location." },
  { Icon: Radar, title: "We Check Coverage", body: "We compare your location with FibreHood's active coverage areas." },
  { Icon: Rocket, title: "Get Connected", body: "If FibreHood is available, explore packages and begin your connection journey." }
];

export function CoverageSteps() {
  return (
    <section className="container-lattice py-16">
      <div className="max-w-2xl">
        <SectionLabel>How coverage checking works</SectionLabel>
        <h2 className="mt-3 font-heading text-2xl font-bold text-signal sm:text-3xl">Three steps to clarity</h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-line bg-paper p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-signal text-paper">
                  <s.Icon className="h-5 w-5" />
                </span>
                <span className="display-mono text-sm text-ink-soft">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-signal">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default CoverageSteps;