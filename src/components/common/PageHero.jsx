import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LoopMark } from "@/components/brand/LoopMark";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

export function PageHero({ eyebrow, title, subtitle, tone = "dark", children, align = "left", minHeight = "80svh" }) {
  const dark = tone === "dark";
  const reduce = useReducedMotion();

  const sectionClass = cn("relative overflow-hidden", dark ? "bg-signal text-paper" : "bg-paper text-ink");
  const innerClass = cn("max-w-3xl", align === "center" && "mx-auto text-center");
  const labelWrapClass = align === "center" ? "text-center" : "";
  const labelClass = align === "center" ? "justify-center" : "";
  const titleClass = cn(
    "mt-5 font-heading text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl",
    dark ? "text-paper" : "text-signal"
  );
  const subtitleClass = cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-paper/75" : "text-ink-soft");

  return (
    <section className={sectionClass}>
      {dark && <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />}
      <div className="pointer-events-none absolute -right-16 -top-10 opacity-[0.07]">
        <LoopMark className="h-56 w-[26rem]" stroke={2} animated />
      </div>
      <div
        className="container-lattice relative flex flex-col justify-center pt-28 pb-14 md:pt-36 md:pb-20"
        style={{ minHeight }}
      >
        <motion.div
          className={innerClass}
          variants={entranceContainer}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.div variants={entranceItem} className={labelWrapClass}>
            <SectionLabel tone={dark ? "light" : "ink"} className={labelClass}>
              {eyebrow}
            </SectionLabel>
          </motion.div>
          <motion.h1 variants={entranceItem} className={titleClass}>
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p variants={entranceItem} className={subtitleClass}>
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div variants={entranceItem} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;