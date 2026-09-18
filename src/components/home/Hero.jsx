import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
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
        className="container-lattice relative flex min-h-[85svh] flex-col justify-center pt-28 pb-16 md:pt-36 lg:min-h-[88vh] lg:grid lg:grid-cols-[48%_52%] lg:items-center lg:pt-20 lg:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* Brand logo — sits at navbar level, vertically aligned with content */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start px-5 sm:px-8 lg:px-12">
          <img
            src="/white.png"
            alt="FibreHood"
            className="-mt-9 -ml-2 h-[7.5rem] w-auto object-contain md:-mt-11 md:-ml-2.5 md:h-[9rem]"
          />
        </div>

        {/* ── Left: headline, price, CTAs ───────────────────────────── */}
        <div className="relative z-10 my-auto lg:my-0">
          <motion.h1
            variants={entranceItem}
            className="max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Fast, reliable fibre internet for your community
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop"
            >
              Service Plan <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/fibre-installation"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Fibre Installation <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;