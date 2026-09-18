import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

const PILLARS = [
  {
    label: "Reliable Deployment",
    title: "Planned and delivered with minimal disruption.",
    summary: "Our team coordinates routes, installation windows, and site communication with as little interruption as possible.",
  },
  {
    label: "Zero Cost Infrastructure",
    title: "We fund and build the fibre network.",
    summary: "FibreHood covers the infrastructure investment so your community or development can benefit without the upfront burden.",
  },
  {
    label: "Open Access",
    title: "Fair, non-discriminatory network access for every resident.",
    summary: "Every home or unit can access the same high-quality, transparent fibre service without hidden barriers.",
  },
  {
    label: "Gigabit Speeds",
    title: "Future-ready connectivity from day one.",
    summary: "Gigabit-capable fibre is installed to meet the needs of the next decade, not just the next few years.",
  },
  {
    label: "Increased Property Value",
    title: "A more connected community is a more valuable one.",
    summary: "Modern fibre infrastructure improves asset appeal, resident satisfaction, and long-term property value.",
  },
  {
    label: "Ongoing Local Support",
    title: "A dedicated team long after the cables are in the ground.",
    summary: "You get local support, dependable service, and a partner who stays engaged after installation is complete.",
  },
];

export function PartnerPillars() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src="/images/partners-estate.jpg"
          alt=""
          className="h-full w-full scale-[1.06] object-cover blur-[7px]"
        />
        <div className="absolute inset-0 bg-paper/65" />
      </div>

      <div className="container-lattice relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.74fr)] lg:items-center lg:gap-16 xl:gap-24">
          <Reveal className="max-w-[660px]">
            <SectionLabel>WHY FIBREHOOD</SectionLabel>
            <h2 className="mt-8 font-heading text-4xl font-bold leading-[1.04] tracking-tighter text-signal sm:text-5xl lg:text-[4.25rem]">
              What every partner gets.
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.86] text-ink-soft lg:text-lg">
              Every FibreHood partnership — whether you represent a residents association, a developer, or a body corporate — comes with the same core guarantees, regardless of scale.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <figure className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] ring-1 ring-white/50 shadow-[0_22px_60px_rgba(7,34,72,0.18)] lg:min-h-[400px]">
              <img
                src={IMAGES.fibreInstallation}
                alt="FibreHood field team installing fibre infrastructure in a property development"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/40 via-transparent to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-4 left-4 z-[2] text-[0.66rem] font-medium uppercase tracking-[0.2em] text-paper/90">
                Infrastructure built to last
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 xl:grid-cols-3">
            {PILLARS.map((item, i) => (
              <article
                key={item.label}
                className={[
                  "p-8 md:p-10",
                  "border-b border-line",
                  i % 3 !== 2 && "sm:border-r",
                  i >= 3 && "xl:border-b-0",
                ].filter(Boolean).join(" ")}
              >
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.22em] text-loop">
                  {item.label}
                </span>
                <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight text-signal">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.78] text-ink-soft">{item.summary}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PartnerPillars;
