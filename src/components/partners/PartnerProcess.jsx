import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { cn } from "@/lib/utils";

/**
 * PartnerProcess — "How we work"
 * Aesthetic: plain bg section with hairline-divided step ledger
 * (mirrors the network narrative / proof-ledger pattern from ValueProp/About).
 * Steps live in a 4-column hairline grid on desktop, stacked on mobile.
 */

const STEPS = [
  {
    number: "01",
    title: "Understand",
    body: "We listen to your needs and assess your estate, building, or development to design the right solution — no guesswork, no generic proposals.",
  },
  {
    number: "02",
    title: "Design",
    body: "Our engineers design the best fibre solution tailored to your requirements — cable routes, riser plans, and realistic timelines.",
  },
  {
    number: "03",
    title: "Build",
    body: "We deploy the infrastructure with minimal disruption, to the highest standards, keeping you and your residents informed throughout.",
  },
  {
    number: "04",
    title: "Connect & Support",
    body: "We activate the network, onboard residents, and provide ongoing local support for the long term — not just until the job is signed off.",
  },
];

export function PartnerProcess() {
  return (
    <section className="bg-fog pb-12 pt-24 md:pb-16 md:pt-32">
      <div className="container-lattice">

        {/* ── Section head ────────────────────────────────────────────── */}
        <Reveal className="w-full text-center">
          <div className="text-left">
            <SectionLabel className="gap-3">How we work</SectionLabel>
          </div>
          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.04] tracking-tighter text-signal sm:text-5xl">
            A seamless partnership.
            <br />
            <em className="font-medium italic text-loop">Start to finish.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-center text-base leading-[1.86] text-ink-soft lg:text-lg">
            Four clear phases — from the first conversation to a fully connected
            community — with FibreHood alongside you every step of the way.
          </p>
        </Reveal>

        {/* ── Steps: hairline-divided ledger columns ──────────────────── */}
        <Reveal delay={0.1} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <article
                key={step.title}
                className={cn(
                  "p-8 md:p-10",
                  i < STEPS.length - 1
                    ? "border-b border-line sm:border-b-0 sm:border-r lg:border-b-0 lg:border-r"
                    : ""
                )}
              >
                {/* Step number — display-mono, loop accent */}
                <span className="display-mono mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-loop">
                  {step.number}
                </span>
                <h3 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-signal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.78] text-ink-soft">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 lg:mt-14">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 text-base font-semibold text-loop transition-[color,gap] duration-300 hover:gap-3 hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-loop after:transition-transform after:duration-300 group-hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-sm text-ink-soft">Let's build a connected future together.</p>
        </Reveal>
      </div>
    </section>
  );
}

export default PartnerProcess;
