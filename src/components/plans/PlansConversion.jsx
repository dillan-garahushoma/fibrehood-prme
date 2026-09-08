import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { WA_INTENTS } from "@/data/site";

export function PlansConversion() {
  return (
    <section className="bg-signal-deep text-paper">
      <div className="container-lattice py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-paper/70">
            <span className="h-px w-6 bg-paper/30" />
            Next step
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-paper sm:text-4xl">
            Found your plan?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-paper/75">
            Check whether FibreHood is live at your address — coverage is the
            one thing that gates everything else.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/coverage"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-colors hover:brightness-95"
          >
            Check availability <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={WA_INTENTS.connect()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            <MessageCircle className="h-4 w-4 text-loop" /> Talk to us on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default PlansConversion;