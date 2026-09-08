import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { IMAGES } from "@/data/images";
import { PLANS, formatSpeed } from "@/data/plans";
import { motion, useReducedMotion } from "framer-motion";

const HOME_PLANS = PLANS.filter((p) => p.segment === "home");
const STARTING_PRICE = Math.min(...HOME_PLANS.map((p) => p.price));
const TOP_SPEED = Math.max(...PLANS.map((p) => p.download));

export function PlansHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* Background imagery — full-bleed behind content on mobile, right panel on desktop */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Image
          src={IMAGES.lightTrails}
          alt=""
          fittingType="fill"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-signal-deep/70 lg:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-signal-deep via-signal-deep/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/70 via-transparent to-signal-deep/30" />
      </div>

      <motion.div
        className="container-lattice relative flex min-h-[78svh] flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* ── Left: headline, price, CTAs ───────────────────────────── */}
        <div className="relative z-10 my-auto max-w-2xl">
          <motion.div variants={entranceItem}>
            <SectionLabel tone="light">Fibre plan discovery</SectionLabel>
          </motion.div>

          <motion.h1
            variants={entranceItem}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Find the fibre package that fits<span className="text-loop">.</span>
          </motion.h1>

          <motion.p variants={entranceItem} className="mt-5 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Compare by speed, price, and what's included. Your coverage check
            confirms availability at your address.
          </motion.p>

          <motion.div variants={entranceItem} className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
            <div>
              <span className="text-sm font-medium text-paper/70">Starting from</span>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-heading text-4xl font-extrabold tracking-tight text-loop sm:text-5xl">
                  US${STARTING_PRICE}
                </span>
                <span className="pb-1 text-sm font-medium text-paper/80">/month</span>
              </div>
            </div>
            <div className="h-10 w-px bg-paper/20" />
            <div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-paper/70">
                <Gauge className="h-4 w-4 text-loop" /> Up to
              </span>
              <div className="mt-1 flex items-end gap-2">
                <span className="display-mono text-4xl font-extrabold tracking-tight text-paper sm:text-5xl">
                  {formatSpeed(TOP_SPEED)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={entranceItem} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#plans"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-colors hover:bg-loop-soft"
            >
              View plans <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/coverage"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Check availability <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default PlansHero;