import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

/**
 * Closing CTA — brings the story back to the customer and hands them the
 * practical next step: check coverage.
 */
export function AboutClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-signal-deep py-24 text-paper lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,204,0,0.1),transparent_55%)]" />
      <div className="container-lattice relative max-w-3xl text-center">
        <Reveal>
          <SectionLabel tone="light" className="justify-center">
            Your FibreHood
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-6xl">
            Your neighbourhood<span className="text-loop">.</span> Your connection<span className="text-loop">.</span>
            <br />
            Your <span className="ff-serif font-normal italic text-loop">FibreHood</span><span className="text-loop">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-base leading-[1.8] text-paper/70">
            See what fibre has reached your address today — and take the next
            step without the runaround.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/coverage"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-8 py-3.5 text-sm font-semibold text-signal transition-transform hover:-translate-y-0.5"
            >
              Check coverage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-loop/60 underline-offset-8 transition-colors hover:text-loop"
            >
              View fibre plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutClosingCTA;
