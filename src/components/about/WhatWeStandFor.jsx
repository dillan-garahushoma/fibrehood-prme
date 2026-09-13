import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PRINCIPLES } from "@/data/aboutContent";

export default function WhatWeStandFor() {
  return (
    <section aria-labelledby="principles-heading" className="bg-fog py-24 lg:py-32">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>What We Stand For</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="principles-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Five things we won&rsquo;t compromise on.
            </h2>
          </Reveal>
        </div>
        <ol className="mt-14 divide-y divide-line border-y border-line">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <li className="group grid gap-2 py-7 transition-colors focus-within:bg-paper/60 hover:bg-paper/60 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="font-mono text-sm text-ink-soft/60">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-signal">{p.title}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">{p.copy}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}