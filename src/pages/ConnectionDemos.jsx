import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { CoverageDemo } from "@/components/home/step-demo/CoverageDemo";
import { PricingDemo } from "@/components/home/step-demo/PricingDemo";
import { SchedulerDemo } from "@/components/home/step-demo/SchedulerDemo";
import { GlobeDemo } from "@/components/home/step-demo/GlobeDemo";

const DEMOS = [
  {
    num: "01",
    title: "Check coverage",
    note: "Static image placeholder · glass frame",
    body: "Enter your address to see if FibreHood is available in your area.",
    time: "~2 min",
    render: () => <CoverageDemo />,
  },
  {
    num: "02",
    title: "Choose your plan",
    note: "Ambient · auto-cycling highlight + NumberFlow price",
    body: "Pick the fibre plan that best fits your home and lifestyle.",
    time: "~2 min",
    render: () => <PricingDemo />,
  },
  {
    num: "03",
    title: "Schedule installation",
    note: "Functional · day + slot picker with reserved state",
    body: "Select a convenient time and our team will take care of the rest.",
    time: "Pick a slot",
    render: () => <SchedulerDemo />,
  },
  {
    num: "04",
    title: "Get connected",
    note: "Ambient · cobe globe + live throughput",
    body: "We install, set up and get you online — fast. It's that easy!",
    time: "Same day",
    render: () => <GlobeDemo />,
  },
];

export default function ConnectionDemos() {
  return (
    <section className="bg-paper">
      <div className="container-lattice pt-28 pb-12 md:pt-32">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <SectionLabel className="justify-center">Connection Journey · Isolated demos</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            Getting connected is <span className="text-loop">simple.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Four step demos in isolation — confirm the interaction style and glass
            treatment before they're wired into the scroll stage.
          </p>
        </Reveal>
      </div>

      <div className="container-lattice space-y-16 pb-28">
        {DEMOS.map((demo) => (
          <Reveal key={demo.num} className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
            {/* Step text */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal font-heading text-sm font-bold text-paper">
                  {demo.num}
                </span>
                <h2 className="font-heading text-xl font-bold tracking-tight text-signal">
                  {demo.title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{demo.body}</p>
              <span className="mt-3 inline-flex rounded-full bg-loop/15 px-2.5 py-1 text-[11px] font-semibold text-signal">
                {demo.time}
              </span>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-soft/60">
                {demo.note}
              </p>
            </div>

            {/* Demo panel */}
            <div className="h-[360px] sm:h-[400px] lg:h-[420px]">{demo.render()}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}