import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";

const HERO_IMAGE = "/images/in-home-joy.png";

export function PlansHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* Background imagery — full-bleed behind content on mobile, right panel on desktop */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt="A family enjoying fibre-connected life at home"
          fittingType="fill"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-signal-deep/60 lg:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-signal-deep via-signal-deep/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/70 via-transparent to-signal-deep/30" />
      </div>

      <motion.div
        className="container-lattice relative flex min-h-[80svh] flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20 lg:grid lg:grid-cols-[45%_55%] lg:pt-24"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* ── Left: headline + subtitle ───────────────────────────── */}
        <div className="relative z-10 my-auto lg:self-center">
          <motion.div variants={entranceItem}>
            <SectionLabel tone="light">Fibre plans</SectionLabel>
          </motion.div>

          <motion.h1
            variants={entranceItem}
            className="mt-5 max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Get unlimited fibre for the way you live
          </motion.h1>

          <motion.p
            variants={entranceItem}
            className="mt-6 max-w-md text-base leading-relaxed text-paper/75 sm:text-lg"
          >
            From light browsing to a fully connected home — pick the speed that
            fits your life. Transparent pricing, Wi-Fi router included, and
            month-to-month with no lock-in.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export default PlansHero;