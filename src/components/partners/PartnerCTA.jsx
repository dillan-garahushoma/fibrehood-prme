import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Handshake } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { whatsappLink } from "@/data/site";

const WA_PARTNER = whatsappLink(
  "Hi Fibrehood, I'd like to explore a partnership — bringing fibre to my estate / development / community."
);

export function PartnerCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-signal py-16 text-paper md:py-20">
      <img
        src="/images/img-hero-6.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.04] object-cover blur-[3px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-signal/80" aria-hidden="true" />
      <Reveal className="container-lattice relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-5">
          {/* Icon accent */}
          <span className="mt-1 hidden shrink-0 rounded-2xl bg-paper/10 p-3 sm:block">
            <Handshake className="h-6 w-6 text-loop" />
          </span>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-loop">
              Let's build together
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold leading-snug sm:text-3xl">
              Let's build better, connected communities.
            </h2>
            <p className="mt-3 text-base text-paper/70">
              Partner with Fibrehood and unlock the power of fibre for your
              estate, development, or building — at no cost to you.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            <MessageCircle className="h-4 w-4" /> Talk to Our Team
          </Link>
          <a
            href={WA_PARTNER}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
          >
            Partner With Us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default PartnerCTA;
