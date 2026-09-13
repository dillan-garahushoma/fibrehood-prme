import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

const PRINCIPLES = [
  {
    title: "Reliability before everything",
    copy: "A connection is a promise, not a best effort. We would rather build carefully than promise quickly.",
  },
  {
    title: "The neighbourhood is the point",
    copy: "We are called FibreHood for a reason. The street, the suburb, the community — the network exists for the people on it.",
  },
  {
    title: "Simplicity is respect",
    copy: "Plain-language plans, clear prices, honest answers. Choosing your internet should not require translating fine print.",
  },
  {
    title: "Service means a person answers",
    copy: "When you message FibreHood, you reach someone who can actually help — not a queue, not a script.",
  },
  {
    title: "The work is never finished",
    copy: "A network is a living thing. We monitor, maintain and improve it long after installation day.",
  },
];

/**
 * What We Stand For — editorial numbered principles with a sticky heading,
 * not an icon-card grid.
 */
export function AboutPrinciples() {
  return (
    <section className="bg-fog py-24 lg:py-36">
      <div className="container-lattice">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── Sticky heading ─────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionLabel>What We Stand For</SectionLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-7 max-w-[14ch] font-heading text-3xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
                  Five things we won&rsquo;t compromise<span className="text-loop">.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-md text-base leading-[1.8] text-ink-soft">
                  These aren&rsquo;t values on a poster. They are the working rules our network,
                  our plans and our people are held to — every day, every street.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ── Principle rows ──────────────────────────────────────── */}
          <div className="lg:col-span-7">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i} amount={0.4}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-line py-9 first:border-t-0 first:pt-0 sm:gap-10 lg:py-10">
                  <span className="display-mono pt-1 text-xs text-ink-soft/60 transition-colors duration-300 group-hover:text-amber-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">{p.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPrinciples;
