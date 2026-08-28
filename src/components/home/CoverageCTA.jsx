import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, MapPin } from "lucide-react";
import { LoopMark } from "@/components/brand/LoopMark";
import { Reveal } from "@/components/common/Reveal";
import { WA_INTENTS } from "@/data/site";

export function CoverageCTA() {
  return (
    <section className="relative overflow-hidden bg-signal py-20 text-paper md:py-28">
      <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 -bottom-16 opacity-[0.08]">
        <LoopMark className="h-72 w-[34rem]" stroke={2} animated />
      </div>

      <div className="container-lattice relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-loop">
            <MapPin className="h-3.5 w-3.5" /> The next step
          </span>
          <h2 className="mt-6 font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Is FibreHood available at your address?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-paper/75 sm:text-lg">
            Check now and find out what fibre is live at your door — then request your
            connection in a single step.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/coverage"
              className="group inline-flex items-center gap-2 rounded-full bg-loop px-7 py-3.5 text-sm font-semibold text-signal transition-transform hover:scale-[1.02]"
            >
              Check Coverage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={WA_INTENTS.connect()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CoverageCTA;