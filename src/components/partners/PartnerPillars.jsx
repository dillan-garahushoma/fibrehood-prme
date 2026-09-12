import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

/**
 * PartnerPillars — "What every partner gets"
 * Aesthetic: mirrors ValueProp's proof ledger exactly.
 * Blurred background photo wash → editorial head (copy + framed photo) →
 * hairline-divided 3-column ledger (then 6-item split into 2 rows of 3).
 */

const PILLARS = [
  {
    label: "Fast rollout",
    title: "Deployed with care",
    summary:
      "Minimal disruption to your community — we plan the route, manage the crew, and restore everything as we found it.",
  },
  {
    label: "No cost",
    title: "Infrastructure on us",
    summary:
      "The full fibre backbone at zero cost to your estate body, body corporate, or development. We carry the capital so you don't have to.",
  },
  {
    label: "Open access",
    title: "Fair for every resident",
    summary:
      "Non-discriminatory network access for all. Every home in the estate gets the same opportunity to connect.",
  },
  {
    label: "Gigabit speeds",
    title: "Future-ready from day one",
    summary:
      "Gigabit-capable infrastructure that scales with demand — not built to meet today's numbers and obsolete in five years.",
  },
  {
    label: "Boost value",
    title: "Tangible property uplift",
    summary:
      "Fibre infrastructure is a documented driver of property value and estate desirability. It's infrastructure that sells.",
  },
  {
    label: "Ongoing support",
    title: "Local — not a call centre",
    summary:
      "A team that knows your network and your neighbourhood, available long after the cables are in the ground.",
  },
];

export function PartnerPillars() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Blurred background wash — estate aerial photo */}
      <div className="pointer-events-none absolute -inset-2" aria-hidden="true">
        <img
          src="/images/partners-estate.jpg"
          alt=""
          className="h-full w-full scale-[1.04] object-cover blur-[7px]"
        />
        <div className="absolute inset-0 bg-paper/55" />
      </div>

      <div className="container-lattice relative z-10">
        {/* ── Section head ───────────────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.74fr)] lg:items-center lg:gap-16 xl:gap-24">
          <Reveal className="max-w-[640px]">
            <SectionLabel>Why FibreHood</SectionLabel>
            <h2 className="mt-8 font-heading text-4xl font-bold leading-[1.04] tracking-tighter text-signal sm:text-5xl lg:text-[4.25rem]">
              What every partner gets.
              <br />
              <em className="font-medium italic text-loop">
                Without exception.
              </em>
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.86] text-ink-soft lg:text-lg">
              Every FibreHood partnership — whether you represent a residents
              association, a developer, or a body corporate — comes with the
              same core guarantees, regardless of scale.
            </p>
          </Reveal>

          {/* Framed photo */}
          <Reveal delay={0.1} className="relative">
            <figure className="relative min-h-[300px] overflow-hidden rounded-lg lg:min-h-[400px]">
              <img
                src={IMAGES.fibreInstallation}
                alt="FibreHood field engineers running fibre cable infrastructure"
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,34,72,0.02), rgba(7,34,72,0.36))",
                  backdropFilter: "saturate(0.72) contrast(1.04)",
                }}
              />
              <figcaption className="absolute bottom-4 left-4 z-[2] text-[0.66rem] font-medium uppercase tracking-wide text-paper/90">
                Infrastructure built to last
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ── Proof ledger: hairline-divided columns ──────────────────── */}
        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          {/* Two rows of 3 — using border pattern from ValueProp */}
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
            {PILLARS.map((item, i) => {
              const isLastInRow = (i + 1) % 3 === 0;
              const isLastRow = i >= 3;
              return (
                <article
                  key={item.label}
                  className={[
                    "p-8 md:p-10",
                    "border-b border-line",
                    !isLastInRow ? "sm:border-r" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.22em] text-loop">
                    {item.label}
                  </span>
                  <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight text-signal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.78] text-ink-soft">
                    {item.summary}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PartnerPillars;
