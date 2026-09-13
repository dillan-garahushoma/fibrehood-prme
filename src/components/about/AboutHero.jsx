import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { IMAGES } from "@/data/images";
import { PLANS } from "@/data/plans";
import { TOWNS } from "@/data/coverageAreas";

const HOME_FROM = Math.min(...PLANS.filter((p) => p.segment === "home").map((p) => p.price));
const SUBURB_COUNT = TOWNS.reduce((n, t) => n + t.suburbs.length, 0);

/**
 * Editorial About hero — oversized headline with a serif italic accent,
 * portrait image panel, and a hairline fact strip. Deliberately distinct
 * from the standard SplitHero used on other pages.
 */
export function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* faint fibre line detail */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          d="M-40,120 C320,60 560,260 900,180 S1300,90 1480,200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fibre-line"
        />
        <path
          d="M-40,680 C280,740 620,560 940,640 S1320,720 1480,600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fibre-line"
        />
      </svg>

      <motion.div
        className="container-lattice relative pt-32 pb-16 md:pt-40 lg:pt-44 lg:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: editorial copy block ─────────────────────────── */}
          <div className="lg:col-span-7 lg:pt-10">
            <motion.div variants={entranceItem}>
              <SectionLabel tone="light">About FibreHood</SectionLabel>
            </motion.div>

            <motion.h1
              variants={entranceItem}
              className="mt-7 max-w-[14ch] font-heading text-[2.6rem] font-extrabold leading-[1.02] tracking-tighter text-paper sm:text-6xl lg:text-7xl"
            >
              Built for the way{" "}
              <span className="ff-serif font-normal italic text-loop">Zimbabwe</span>{" "}
              connects<span className="text-loop">.</span>
            </motion.h1>

            <motion.div variants={entranceItem} className="mt-8 max-w-lg space-y-5 text-base leading-relaxed text-paper/70 sm:text-lg">
              <p>
                FibreHood is a Zimbabwean fibre internet company with one job: make reliable,
                high-speed connectivity genuinely accessible — to homes, to businesses, and to
                the communities in between.
              </p>
              <p>
                Clear plans, honest coverage answers, and a network built street by street,
                around the way people actually live and work.
              </p>
            </motion.div>

            <motion.div variants={entranceItem} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/coverage"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-7 py-3 text-sm font-semibold text-signal transition-transform hover:-translate-y-0.5"
              >
                Check coverage <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-loop/60 underline-offset-8 transition-colors hover:text-loop"
              >
                Explore our plans <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: portrait image panel ────────────────────────── */}
          <motion.figure variants={entranceItem} className="lg:col-span-5 lg:pt-10">
            <div className="relative overflow-hidden rounded-xl border border-paper/10 shadow-lift">
              <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5]">
                <Image
                  src={IMAGES.aboutHero}
                  alt="Fibre infrastructure connecting a Zimbabwean neighbourhood at dusk"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/50 via-transparent to-transparent" />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-paper/50">
              <span className="h-px w-6 bg-loop/50" aria-hidden="true" />
              Fibre in the neighbourhood
            </figcaption>
          </motion.figure>
        </div>

        {/* ── Fact strip ────────────────────────────────────────────── */}
        <motion.div
          variants={entranceItem}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-paper/10 pt-8 sm:grid-cols-3 lg:mt-24"
        >
          {[
            [`${TOWNS.length}`, "Towns in our rollout data"],
            [`${SUBURB_COUNT}`, "Suburbs mapped street by street"],
            [`US$${HOME_FROM}/mo`, "Home fibre plans from"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-4 sm:block">
              <span className="font-heading text-2xl font-extrabold tracking-tight text-loop sm:text-3xl">
                {value}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-paper/50 sm:mt-2 sm:block">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutHero;
