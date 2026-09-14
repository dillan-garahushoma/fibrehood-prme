import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { whatsappLink } from "@/data/site";

const WA_PARTNER = whatsappLink(
  "Hi FibreHood, I'd like to explore a partnership — bringing fibre to my estate / development / community."
);

export function PartnersHero() {
  return (
    <SplitHero
      image="/images/partners-hero.jpg"
      alt="FibreHood partnership programme for communities and developers"
      eyebrow="Partnership programme"
      title={
        <>
          Bring fibre to your community<span className="text-loop">.</span>
        </>
      }
      subtitle="Partner with FibreHood to connect your community, estate, or development."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={WA_PARTNER}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
        >
          <MessageCircle className="h-4 w-4" /> Partner With Us
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
        >
          Talk to Our Team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SplitHero>
  );
}

export default PartnersHero;