import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { HeroFibreWaves } from "./HeroFibreWaves";
import { PLANS } from "@/data/plans";
import { motion, useReducedMotion } from "framer-motion";

const STARTING_PRICE = Math.min(...PLANS.filter((p) => p.segment === "home").map((p) => p.price));

/**
 * Home page hero — full-bleed photo with navy overlay and animated fibre waves.
 *
 * Mobile UX improvements:
 * - Taller min-height (92svh) gives the hero room to breathe on small screens
 * - More top padding so the brand logo never clips the headline
 * - Logo scales down on very small phones (< 375px range) to free up headline space
 * - CTA stacks vertically on mobile with generous gap, full-width on smallest screens
 * - Price display text is slightly reduced on mobile for better proportion
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0B1B33] text-paper min-h-[100svh] lg:min-h-[88vh]">
      {/* Background imagery — full bleed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-family-3person.jpg"
            alt=""
            fittingType="fill"
            className="block h-full w-full object-cover object-[65%_center] sm:object-[60%_center] lg:object-[center_right]"
          />
          {/* Horizontal overlay: covers more on mobile so text is always readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B33] via-[#0B1B33]/92 via-55% sm:via-[#0B1B33]/90 sm:via-45% to-transparent lg:to-65%" />
          {/* Bottom-up gradient for depth on mobile */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1B33]/60 via-[#0B1B33]/15 to-transparent sm:hidden" />
        </div>
        <HeroFibreWaves />
      </div>

      <motion.div
        className="container-lattice relative z-20 flex min-h-[100svh] flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:min-h-[88vh] lg:grid lg:grid-cols-[50%_50%] lg:items-center lg:pt-20 lg:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* Brand logo — scaled down on small screens to avoid overlap with headline */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start px-5 sm:px-8 lg:px-12">
          <img
            src="/white1.png"
            alt="Fibrehood"
            className="-mt-5 -ml-2 h-[6rem] w-auto object-contain sm:-mt-9 sm:h-[7.5rem] md:-mt-11 md:-ml-2.5 md:h-[9rem]"
          />
        </div>

        {/* Left: headline, price, CTAs */}
        <div className="relative z-10 my-auto lg:my-0">
          <motion.h1
            variants={entranceItem}
            className="max-w-xl font-heading text-[2.25rem] font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Fast, reliable fibre internet for your community
          </motion.h1>

          <motion.div variants={entranceItem} className="mt-7 sm:mt-8">
            <span className="text-sm font-medium text-paper/70">Starting from</span>
            <div className="mt-1 flex items-end gap-2">
              <span className="font-heading text-[2.5rem] font-extrabold tracking-tight text-loop sm:text-5xl">
                US${STARTING_PRICE}
              </span>
              <span className="pb-1 text-sm font-medium text-paper/80">/month</span>
            </div>
          </motion.div>

          <motion.div
            variants={entranceItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-7 py-3.5 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
            >
              Sign Up <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/plans"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:border-paper hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              View Plans
            </Link>
          </motion.div>
        </div>

        {/* Right half: open for the family photo */}
        <div className="hidden lg:block pointer-events-none" aria-hidden="true" />
      </motion.div>
    </section>
  );
}

export default Hero;