import React from "react";
import { Users, Coins, Zap, Gauge, BarChart3, Headphones } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

const PILLARS = [
  {
    icon: Users,
    title: "Reliable Deployment",
    copy: "Planned and delivered with minimal disruption.",
  },
  {
    icon: Coins,
    title: "Zero Cost Infrastructure",
    copy: "We fund and build the fibre network.",
  },
  {
    icon: Zap,
    title: "Open Access",
    copy: "Fair, non-discriminatory network access for every resident.",
  },
  {
    icon: Gauge,
    title: "Gigabit Speeds",
    copy: "Future-ready connectivity from day one.",
  },
  {
    icon: BarChart3,
    title: "Increased Property Value",
    copy: "A more connected community is a more valuable one.",
  },
  {
    icon: Headphones,
    title: "Ongoing Local Support",
    copy: "A dedicated team long after the cables are in the ground.",
  },
];

export function PartnerPillars() {
  return (
    <section className="bg-fog pb-24 pt-10 md:pb-32 md:pt-16">
      <div className="container-lattice">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.74fr)] lg:gap-16 xl:gap-24">
          <Reveal className="max-w-[660px]">
            <SectionLabel className="gap-3 font-bold">WHY FIBREHOOD</SectionLabel>
            <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.04] tracking-tighter text-signal sm:text-5xl">
              What every partner gets.
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.86] text-ink-soft lg:text-lg">
              Every Fibrehood partnership — whether you represent a residents association, a developer, or a body corporate — comes with the same core guarantees, regardless of scale.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
              <figure className="relative h-[260px] overflow-hidden rounded-[1.5rem] ring-1 ring-white/50 shadow-[0_22px_60px_rgba(7,34,72,0.18)] sm:h-[300px] lg:h-[320px]">
              <img
                src={IMAGES.fibreInstallation}
                alt="Fibrehood field team installing fibre infrastructure in a property development"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-signal-deep/50 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-5 left-5 z-[2]">
                <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-paper">
                  Infrastructure built to last
                </span>
                <span className="mt-2 block h-0.5 w-10 bg-loop" aria-hidden="true" />
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-y-0 xl:divide-x xl:divide-line">
            {PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="xl:px-6 xl:first:pl-0 xl:last:pr-0">
                  <Icon className="h-6 w-6 text-loop" strokeWidth={1.9} aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-base font-semibold leading-snug tracking-tight text-signal">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-ink-soft">{item.copy}</p>
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