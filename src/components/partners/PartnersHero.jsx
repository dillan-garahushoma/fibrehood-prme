import React from "react";
import { ArrowRight, Building2, HousePlus, ShieldCheck } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { whatsappLink } from "@/data/site";

const WA_PARTNER = whatsappLink(
  "Hi Fibrehood, I'd like to explore a partnership — bringing fibre to my estate / development / community."
);

const CTAS = [
  { label: "Residents Association", Icon: HousePlus, href: WA_PARTNER },
  { label: "Property Developer", Icon: Building2, href: WA_PARTNER },
  { label: "Property Manager", Icon: ShieldCheck, href: WA_PARTNER },
];

export function PartnersHero() {
  return (
    <SplitHero
      image="/images/partners-hero.png"
      alt="Fibrehood partnership programme for communities and developers"
      eyebrow="PARTNERSHIP PROGRAMME"
      title="Bring fibre to your community"
      subtitle="Partner with Fibrehood to get your suburb, estate, residential or commercial building or property development project fibre connected."
    >
      <div className="flex flex-row items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1 flex-nowrap w-max max-w-full lg:max-w-none">
        {CTAS.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-paper/40 bg-paper/5 px-3.5 py-2 text-xs font-semibold text-paper backdrop-blur-sm transition-all hover:border-loop hover:bg-paper/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Icon className="h-4 w-4 text-loop transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <span>{label}</span>
            <ArrowRight className="h-3.5 w-3.5 text-paper/60 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        ))}
      </div>
    </SplitHero>
  );
}

export default PartnersHero;