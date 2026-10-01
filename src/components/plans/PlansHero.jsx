import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { Wave } from "@/components/plans/Wave";

const HERO_IMAGE = "/images/plans-hero.jpg";
const HERO_LOGO = "/images/fibrehood-connect-plans-navy.png";

/**
 * Plans page hero — full-bleed photo with wave transition.
 *
 * Mobile UX:
 * - OVERLAY: Smooth, balanced contrast scrim that keeps typography 100% crisp without
 *   cutting the screen in half or obscuring the photography.
 * - SPACING: Natural top-aligned flow (pt-20 sm:pt-24) with original copy only.
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
          className="h-full w-full object-cover object-[68%_center] max-lg:scale-[1.03] max-lg:blur-[2px]"
        />

        {/* Sunny golden-yellow overlay, consistent across mobile and desktop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(252,204,24,0.35) 0%, rgba(252,204,24,0.30) 18%, rgba(253,208,42,0.22) 30%, rgba(253,212,58,0.15) 45%, rgba(254,216,76,0.08) 55%, transparent 75%)",
          }}
        />
        {/* Soft bottom glow on desktop */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to top, rgba(252,204,24,0.08) 0%, rgba(252,204,24,0) 20%)",
          }}
        />
      </div>

      <motion.div
        className="container-lattice relative z-10 flex min-h-[62svh] flex-col justify-start pt-36 pb-16 sm:min-h-[66svh] sm:pt-40 sm:pb-20 md:min-h-[80svh] lg:min-h-[85vh] lg:justify-center lg:pt-24 lg:pb-24"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* Logo at top */}
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

        <div className="max-w-2xl -mx-4 px-4 py-4 sm:mx-0 sm:px-0 sm:py-4">
          <motion.h1
            variants={entranceItem}
            className="mt-4 max-w-xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-signal drop-shadow-sm sm:text-4xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            Get unlimited fibre for the way you live
          </motion.h1>

          <motion.p
            variants={entranceItem}
            className="mt-3.5 max-w-lg text-sm font-medium leading-relaxed text-signal/90 sm:mt-4 sm:text-base lg:text-lg"
          >
            From browsing to a connected home, choose your speed. Clear pricing, Wi-Fi router included, and month-to-month service with no lock-in.
          </motion.p>
        </div>
      </motion.div>

      {/* Wave transition into the plans content */}
      <Wave fill="hsl(var(--paper))" />
    </section>
  );
}

export default PlansHero;