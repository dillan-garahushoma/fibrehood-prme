import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export default function AboutCTA() {
  return (
    <section aria-labelledby="about-cta-heading" className="bg-paper py-24 lg:py-32">
      <div className="container-lattice text-center">
        <Reveal>
          <h2 id="about-cta-heading" className="ff-serif mx-auto max-w-3xl text-3xl font-medium leading-tight text-[#072146] sm:text-4xl lg:text-5xl">
            Your neighbourhood. Your connection. Your Fibrehood.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            See what fibre reaches you &mdash; and take the next step toward a connection that&rsquo;s built to last.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/coverage"
              className="inline-flex items-center gap-2 bg-signal px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              Check coverage <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-signal underline decoration-loop underline-offset-8 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              View fibre plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}