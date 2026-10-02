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
 * Home page hero — full-bleed photo with glowing fibre wave effect.
 *
 * Mobile UX:
 * - OVERLAY: Smooth, balanced gradient protects text contrast on the left without obscuring
 *   the family or cutting the screen in half.
 * - FIBRE WAVES: Aligned with the photograph (object-right + xMaxYMid slice) so the golden
 *   fibre loop flows around the laptop and family on mobile screens.
 * - SPACING: Balanced vertical rhythm from pt-20 down through the headline, price, and CTA.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0B1B33] text-paper min-h-[82svh] sm:min-h-[86svh] lg:min-h-[88vh]">
      {/* Background imagery — full bleed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-family-3person.jpg"
            alt="Family enjoying fast fibre internet at home"
            fittingType="fill"
            className="block h-full w-full object-cover object-right lg:object-[center_right] max-lg:scale-[1.03] max-lg:blur-[2px]"
          />
          <HeroFibreWaves />
          {/* Smooth contrast overlay: keeps white text 100% readable while letting family & glowing lines shine through */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B33]/85 via-[#0B1B33]/60 via-45% to-transparent lg:from-[#0B1B33] lg:via-[#0B1B33]/92 lg:via-45% lg:to-transparent" />
          {/* Top header protection so logo and hamburger menu stay crisp */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B1B33]/70 to-transparent" />
        </div>
      </div>

      <motion.div
        className="container-lattice relative z-20 flex min-h-[82svh] sm:min-h-[86svh] flex-col justify-start pt-44 pb-14 sm:pt-40 sm:pb-20 lg:min-h-[88vh] lg:grid lg:grid-cols-[50%_50%] lg:items-center lg:pt-20 lg:pb-20"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* Brand logo — almost double size on mobile, responsive scale on desktop */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start px-5 sm:px-8 lg:px-12">
          <img
            src="/white1.png"
            alt="Fibrehood"
            className="-mt-8 -ml-2 h-[9.5rem] w-auto object-contain sm:-mt-8 sm:h-[7rem] md:-mt-10 md:-ml-2.5 md:h-[8.5rem]"
          />
        </div>

        {/* Content: mobile = flex-col spread top-to-bottom; desktop = normal block */}
        <div className="relative z-10 my-0 lg:my-0 flex flex-col flex-1 min-h-[calc(82svh-11rem)] sm:min-h-[calc(86svh-10rem)] lg:block lg:min-h-0">
          <motion.h1
            variants={entranceItem}
            className="max-w-xl font-heading text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-paper drop-shadow-[0_2px_10px_rgba(7,34,72,0.7)] sm:text-5xl lg:text-[3.6rem]"
          >
            Fast, reliable fibre internet for your community
          </motion.h1>

          <motion.div variants={entranceItem} className="mt-6 sm:mt-7">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-paper/80 drop-shadow-[0_1px_4px_rgba(7,34,72,0.8)]">
              Starting from
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-black tracking-tight text-loop drop-shadow-[0_2px_14px_rgba(252,204,24,0.4)] sm:text-6xl">
                US${STARTING_PRICE}
              </span>
              <span className="text-lg font-semibold text-paper/90 drop-shadow-[0_1px_4px_rgba(7,34,72,0.8)]">
                /month
              </span>
            </div>
          </motion.div>

          <motion.div variants={entranceItem} className="mt-auto pt-10 sm:pt-12 lg:mt-8 lg:pt-0 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-loop px-7 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop w-full sm:w-auto"
            >
              Sign Up <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right half: open for desktop */}
        <div className="hidden lg:block pointer-events-none" aria-hidden="true" />
      </motion.div>
    </section>
  );
}

export default Hero;
