import React from "react";
import { Users, Building2, Home } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const AUDIENCES = [
  {
    icon: Users,
    label: "COMMUNITY RESIDENTS ASSOCIATIONS",
    headline: "Bring world-class connectivity to your neighbourhood.",
    body: "Partner with FibreHood to give every home in your estate reliable, high-speed fibre — at no cost to the community body. We handle infrastructure, installation, and ongoing support.",
    bullets: [
      "Reliable, high-speed fibre for all homes",
      "Increases property value and desirability",
      "Future-proofs your community",
      "No cost to the estate body",
    ],
  },
  {
    icon: Building2,
    label: "PROPERTY DEVELOPERS",
    headline: "Differentiate your development with built-in fibre.",
    body: "Pre-wire your greenfield and brownfield developments with fibre infrastructure during construction — increasing buyer appeal, accelerating sales, and adding lasting value.",
    bullets: [
      "Pre-wired developments",
      "Seamless project integration",
      "Faster sales, higher buyer satisfaction",
      "Turnkey utility management",
    ],
  },
  {
    icon: Home,
    label: "PROPERTY MANAGERS & BODY CORPORATES",
    headline: "Upgrade your building with modern fibre infrastructure.",
    body: "FibreHood manages the full backbone installation for apartment blocks and gated communities — providing every resident with gigabit-capable connectivity at zero cost to the body corporate.",
    bullets: [
      "Building management liaison included",
      "Internal riser optimisation",
      "Zero cost to body corporate",
      "Open access — fair and transparent",
    ],
  },
];

export function AudienceCards() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="container-lattice">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[3.2rem]">
            A partnership model built for your context
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft lg:text-lg">
            Whether you represent a community, are building a new development, or manage an existing building — FibreHood has a partnership structure that fits.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {AUDIENCES.map((audience, i) => {
            const Icon = audience.icon;
            return (
              <Reveal key={audience.label} delay={i * 0.07}>
                <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-paper p-8 shadow-[0_14px_32px_rgba(7,34,72,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-signal/20 hover:shadow-[0_18px_38px_rgba(7,34,72,0.10)]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-signal shadow-sm">
                    <Icon className="h-6 w-6 text-loop" strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    {audience.label}
                  </span>

                  <h3 className="mt-3 font-heading text-2xl font-bold leading-snug text-signal">
                    {audience.headline}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {audience.body}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {audience.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-loop" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AudienceCards;
