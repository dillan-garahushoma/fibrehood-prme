import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";

/**
 * Plans-style split hero: full-bleed image right on desktop, blended behind
 * the navy hero on mobile, min-h-[80svh]. Mirrors PlansHero exactly so every
 * page hero sits at the same height and placement.
 */
export function SplitHero({ eyebrow, title, subtitle, image, alt, children }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Image src={image} alt={alt} fittingType="fill" className="h-full w-full" />
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
        <div className="relative z-10 my-auto lg:self-center">
          <motion.div variants={entranceItem}>
            <SectionLabel tone="light">{eyebrow}</SectionLabel>
          </motion.div>

          <motion.h1
            variants={entranceItem}
            className="mt-5 max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={entranceItem}
              className="mt-6 max-w-md text-base leading-relaxed text-paper/75 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={entranceItem} className="mt-8">
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default SplitHero;