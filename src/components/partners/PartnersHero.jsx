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

/**
 * Partners / Installations hero — wraps SplitHero with partner-type CTA pills.
 *
 * Mobile UX improvements:
 * - Pills now WRAP (flex-wrap) instead of scroll horizontally — no hidden content
 * - Each pill meets the 44px minimum touch target height via py-3 (12px * 2 + ~20px text)
 * - Slightly wider pill padding on mobile for comfortable tapping
 */
export function PartnersHero({
  image = "/images/partners-hero.png",
  imageClassName,
  fullBleed = false,
}) {
  return (
    <SplitHero
      image={image}
      imageClassName={imageClassName}
      alt="Fibrehood partnership programme for communities and developers"
      eyebrow="PARTNERSHIP PROGRAMME"
      title="Bring fibre to your community"
      subtitle="Partner with Fibrehood to get your suburb, estate, residential or commercial building or property development project fibre connected."
      fullBleed={fullBleed}
    >
      {/* Pills wrap cleanly on mobile — no horizontal scroll, no clipping */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-1">
        {CTAS.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-paper/40 bg-paper/5 px-4 py-3 text-sm font-semibold text-paper backdrop-blur-sm transition-all hover:border-loop hover:bg-paper/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop sm:px-4 sm:py-2.5"
          >
            <Icon
              className="h-4 w-4 text-loop transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{label}</span>
            <ArrowRight
              className="h-3.5 w-3.5 text-paper/60 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </SplitHero>
  );
}

export default PartnersHero;