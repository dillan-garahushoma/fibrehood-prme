import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { Wave } from "@/components/plans/Wave";

const HERO_IMAGE = "/images/plans-hero.jpg";
const HERO_LOGO = "/images/fibrehood-connect-hero.png";

/**
 * Plans page hero — full-bleed photo with wave transition.
 *
 * Mobile UX:
 * - OVERLAY: Smooth full-bleed contrast scrim that keeps typography 100% crisp on mobile and desktop
 *   without cutting the screen or creating block box artifacts.
 * - SPACING: Natural top-aligned flow with crisp white typography and Loop yellow highlights.
 */
export function PlansHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0B1B33] text-paper">
      {/* ── Full-Bleed Background Imagery ───────────────────────────── */}
      <div className="absolute inset-0 h-full w-full" aria-hidden="true">
        <img
          src={HERO_IMAGE}
          alt="A happy family celebrating high speed fibre connectivity at home"
          className="h-full w-full object-cover object-[68%_center]"
        />

        {/* Smooth contrast overlay: keeps text 100% readable without block overlay boundaries */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B33]/95 via-[#0B1B33]/80 via-50% to-[#0B1B33]/30 lg:from-[#0B1B33] lg:via-[#0B1B33]/90 lg:via-45% lg:to-transparent" />
        
        {/* Top header protection so logo remains crisp */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B1B33]/80 to-transparent" />

        {/* Soft golden warmth highlight on right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 50%, rgba(252,204,24,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div
        className="container-lattice relative z-10 flex min-h-[62svh] flex-col justify-start pt-36 pb-16 sm:min-h-[66svh] sm:pt-40 sm:pb-20 md:min-h-[80svh] lg:min-h-[85vh] lg:justify-center lg:pt-24 lg:pb-24"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* Logo at top — visually aligned to container-lattice left margin */}
        <div className="absolute inset-x-0 top-3 z-20 flex items-start container-lattice">
          <motion.div
            variants={entranceItem}
            className="w-[min(65vw,13.5rem)] sm:w-[min(75vw,13.5rem)]"
          >
            <img
              src={HERO_LOGO}
              alt="Fibrehood Connect"
              className="h-auto w-full object-contain drop-shadow-sm -ml-[14.5%]"
            />
          </motion.div>
        </div>

        <div className="max-w-2xl">
          <motion.h1
            variants={entranceItem}
            className="mt-4 max-w-xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-paper drop-shadow-[0_2px_10px_rgba(7,34,72,0.7)] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            Get unlimited fibre for the way you <span className="text-loop">live</span>
          </motion.h1>

          <motion.p
            variants={entranceItem}
            className="mt-3.5 max-w-lg text-sm font-medium leading-relaxed text-paper/90 drop-shadow-[0_1px_4px_rgba(7,34,72,0.8)] sm:mt-4 sm:text-base lg:text-lg"
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