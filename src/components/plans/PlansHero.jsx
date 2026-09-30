import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { Wave } from "@/components/plans/Wave";

const HERO_IMAGE = "/images/plans-hero.jpg";
const HERO_LOGO = "/images/fibrehood-connect-plans-navy.png";

/**
 * Plans page hero — full-bleed photo with golden overlay and wave transition.
 *
 * Mobile UX improvements:
 * - Taller min-height (88svh) — from 75svh — so the photo has room to breathe
 * - Focal point shifted left (50%) on mobile so the family isn't cropped to the right edge
 * - Top padding increased to 32 (128px) on mobile — clear of nav + status bar
 * - Bottom padding up to 28 on mobile to respect wave overlap area
 */
export function PlansHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* ── Full-Bleed Background Imagery ───────────────────────────── */}
      <div className="absolute inset-0 h-full w-full" aria-hidden="true">
        <img
          src={HERO_IMAGE}
          alt="A happy family celebrating high speed fibre connectivity at home"
          className="h-full w-full object-cover object-[50%_center] sm:object-[65%_center] md:object-center"
        />
        {/* Sunny golden-yellow overlay — brighter yellow tone, reduced opacity, ultra-smooth feather */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(252,204,24,0.28) 0%, rgba(252,205,30,0.25) 14%, rgba(253,208,42,0.20) 26%, rgba(253,212,58,0.14) 38%, rgba(254,216,76,0.09) 50%, rgba(254,220,96,0.05) 62%, rgba(255,225,115,0.02) 74%, rgba(255,225,115,0.005) 86%, rgba(255,225,115,0) 94%)",
          }}
        />
        {/* Very soft warm yellow vertical glow near the bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(252,204,24,0.06) 0%, rgba(252,204,24,0) 18%)",
          }}
        />
        {/* Strong horizontal overlay on mobile so text stays readable over the photo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-signal-deep/90 via-signal-deep/70 via-50% to-transparent sm:hidden" />
      </div>

      <motion.div
        className="container-lattice relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 md:min-h-[80svh] md:pt-36 md:pb-28"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <div className="absolute inset-x-0 top-3 z-20 flex items-start px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={entranceItem}
            className="w-[min(65vw,13.5rem)] sm:w-[min(75vw,13.5rem)]"
          >
            <img
              src={HERO_LOGO}
              alt="Fibrehood Connect"
              className="h-auto w-full object-contain drop-shadow-sm"
            />
          </motion.div>
        </div>

        <div className="max-w-2xl py-8">
          <motion.h1
            variants={entranceItem}
            className="max-w-xl font-heading text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-signal drop-shadow-md sm:text-5xl lg:text-[3.5rem]"
          >
            Get unlimited fibre for the way you live
          </motion.h1>

          <motion.p
            variants={entranceItem}
            className="mt-5 max-w-lg text-base font-medium leading-relaxed text-signal/90 drop-shadow-sm sm:mt-6 sm:text-lg"
          >
            From browsing to a connected home, choose your speed. Clear
            pricing, Wi-Fi router included, and month-to-month service with no
            lock-in.
          </motion.p>
        </div>
      </motion.div>

      {/* Wave transition into the plans content */}
      <Wave fill="hsl(var(--paper))" />
    </section>
  );
}

export default PlansHero;