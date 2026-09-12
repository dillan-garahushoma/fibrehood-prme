import React from "react";
import { ArrowRight, Users, Building2, Home } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { whatsappLink } from "@/data/site";

const AUDIENCES = [
  {
    icon: Users,
    label: "Community Residents Associations",
    headline: "Bring world-class connectivity to your neighbourhood.",
    body:
      "Partner with FibreHood to give every home in your estate reliable, high-speed fibre — at no cost to the community body. We handle infrastructure, installation, and ongoing support.",
    bullets: [
      "Reliable, high-speed fibre for all homes",
      "Increases property value and desirability",
      "Future-proofs your community",
      "No cost to the estate body",
    ],
    wa: whatsappLink(
      "Hi FibreHood, I represent a Community Residents Association and I'd like to explore bringing fibre to our neighbourhood."
    ),
  },
  {
    icon: Building2,
    label: "Property Developers",
    headline: "Differentiate your development with built-in fibre.",
    body:
      "Pre-wire your greenfield and brownfield developments with fibre infrastructure during construction — increasing buyer appeal, accelerating sales, and adding lasting value.",
    bullets: [
      "Pre-wired developments",
      "Seamless project integration",
      "Faster sales, higher buyer satisfaction",
      "Turnkey utility management",
    ],
    wa: whatsappLink(
      "Hi FibreHood, I'm a property developer and I'd like to explore integrating fibre infrastructure into my development."
    ),
  },
  {
    icon: Home,
    label: "MDUs & Body Corporates",
    headline: "Upgrade your building with modern fibre infrastructure.",
    body:
      "FibreHood manages the full backbone installation for apartment blocks and gated communities — providing every resident with gigabit-capable connectivity at zero cost to the body corporate.",
    bullets: [
      "Building management liaison included",
      "Internal riser optimisation",
      "Zero cost to body corporate",
      "Open access — fair and transparent",
    ],
    wa: whatsappLink(
      "Hi FibreHood, I manage a multi-dwelling unit or body corporate and I'd like to explore fibre for our building."
    ),
  },
];

export function AudienceCards() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <Reveal className="max-w-2xl">
          <SectionLabel>Who we partner with</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            A partnership model built for your context.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Whether you represent a community, are building a new development,
            or manage an existing building — FibreHood has a partnership
            structure that fits.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-all hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-signal text-paper">
                  <a.icon className="h-5 w-5 text-loop" />
                </span>

                <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  {a.label}
                </span>

                <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-signal">
                  {a.headline}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {a.body}
                </p>

                <ul className="mt-5 space-y-2">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-loop" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={a.wa}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
                >
                  Learn more{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AudienceCards;
