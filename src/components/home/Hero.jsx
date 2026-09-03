import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { CoverageChecker } from "@/components/coverage/CoverageChecker";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal, entranceContainer, entranceItem } from "@/components/common/Reveal";
import { IMAGES } from "@/data/images";
import { PLANS } from "@/data/plans";
import { motion, useReducedMotion } from "framer-motion";

const STARTING_PRICE = Math.min(...PLANS.filter((p) => p.segment === "home").map((p) => p.price));

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* Background imagery — full-bleed behind content on mobile, right panel on desktop */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Image
          src={IMAGES.heroHouse}
          alt=""
          fittingType="fill"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-signal-deep/60 lg:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-signal-deep via-signal-deep/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/70 via-transparent to-signal-deep/30" />
      </div>

      <motion.div
        className="container-lattice relative flex min-h-[90svh] flex-col pt-28 pb-16 md:pt-36 lg:min-h-[92vh] lg:grid lg:grid-cols-[45%_55%] lg:grid-rows-[1fr_auto] lg:pt-24 lg:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* ── Left: headline, price, CTAs ───────────────────────────── */}
        <div className="relative z-10 my-auto lg:self-center">
          <motion.h1
            variants={entranceItem}
            className="max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Fast, reliable fibre internet for your home<span className="text-loop">.</span>
          </motion.h1>

          <motion.div variants={entranceItem} className="mt-8">
            <span className="text-sm font-medium text-paper/70">Starting from</span>
            <div className="mt-1 flex items-end gap-2">
              <span className="font-heading text-4xl font-extrabold tracking-tight text-loop sm:text-5xl">
                US${STARTING_PRICE}
              </span>
              <span className="pb-1 text-sm font-medium text-paper/80">/month</span>
            </div>
          </motion.div>

          <motion.div variants={entranceItem} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/plans"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              View Plans <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Coverage checker — sits inside the hero, close under the content ── */}
        <div className="relative z-20 mt-14 sm:mt-16 lg:col-span-2 lg:mt-0">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex flex-col items-center text-center">
              <SectionLabel tone="light" className="justify-center drop-shadow-sm">
                Check if FibreHood is live at your address
              </SectionLabel>
            </div>
            <Reveal className="relative overflow-hidden rounded-2xl border border-paper/15 bg-signal-deep/60 p-2 shadow-lift backdrop-blur-xl">
              {/* loop accent hairlines */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-loop/60 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-loop/60 to-transparent" aria-hidden="true" />
              <CoverageChecker variant="hero" source="hero-bottom" />
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;