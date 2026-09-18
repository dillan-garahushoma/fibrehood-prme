import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-heading" className="bg-signal py-24 text-paper lg:py-32">
      <div className="container-lattice text-center">
        <Reveal>
          <h2 id="contact-cta-heading" className="ff-serif mx-auto max-w-3xl text-3xl font-medium leading-tight text-paper sm:text-4xl lg:text-5xl">
            Ready to see what Fibrehood can do for your neighbourhood?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/coverage"
              className="inline-flex items-center gap-2 bg-loop px-7 py-3.5 text-sm font-semibold text-signal transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
            >
              Check coverage <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-loop/60 underline-offset-8 transition-colors hover:text-loop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
            >
              Explore fibre plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}