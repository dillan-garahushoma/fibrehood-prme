import React from "react";
import { Reveal } from "@/components/common/Reveal";

const FLOW = [
  { label: "Street network", copy: "High-capacity fibre runs through the streets of your neighbourhood." },
  { label: "Access build", copy: "We bring the fibre from the street right to your building." },
  { label: "Distribution point", copy: "A central point distributes the signal cleanly within the building." },
  { label: "Building", copy: "Your building is connected to the wider FibreHood network." },
  { label: "Individual unit", copy: "Fibre reaches your door — your unit is ready to go live." },
  { label: "Customer", copy: "You're connected. Pick a plan and get online in minutes." },
];

const SUPPORT = [
  { title: "Built for today", copy: "Fast fibre connectivity for the way people live and work right now." },
  { title: "Designed for tomorrow", copy: "Infrastructure capable of supporting future ICT services." },
  { title: "Made to scale", copy: "A shared network designed to support multiple services and providers." },
];

/**
 * "Under the Surface" — a calm, static flow diagram of the 6-stage fibre path
 * on a #031630 gradient. No interactive stepper, no swapping animation.
 */
export function UnderSurface() {
  return (
    <section
      id="network"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: "linear-gradient(155deg, #031630 0%, #072248 55%, #031630 100%)" }}
    >
      <div className="container-lattice relative">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
            <span className="h-px w-8 bg-loop" /> Under The Surface
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display max-w-2xl text-3xl font-bold leading-[1.15] text-paper sm:text-5xl">
            A lot goes into making &ldquo;connected&rdquo; feel effortless.
          </h2>
        </Reveal>

        {/* Static flow diagram */}
        <Reveal delay={0.15} className="mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-3 lg:grid-cols-6">
            {FLOW.map((stage, i) => (
              <div key={stage.label} className="bg-signal-deep/50 p-5 lg:p-6">
                <span className="font-mono text-xs text-loop/80">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-2 font-display text-sm font-semibold text-paper">{stage.label}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-paper/60">{stage.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Summary strip */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {SUPPORT.map((item, i) => (
            <Reveal key={item.title} delay={0.1 + i * 0.1}>
              <div className="h-full rounded-2xl border border-loop/20 bg-signal-deep/40 p-7">
                <h4 className="font-display mb-3 text-lg text-loop">{item.title}</h4>
                <p className="text-sm leading-relaxed text-paper/75">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UnderSurface;