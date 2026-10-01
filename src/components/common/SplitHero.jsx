import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";

/**
 * Plans-style split hero: full-bleed image right on desktop, natural image on mobile.
 *
 * Mobile UX:
 * ─────────────────────────────────────────
 * - OVERLAY: Smooth, balanced contrast scrim that keeps typography 100% crisp without
 *   cutting the screen in half or obscuring the photography.
 * - SPACING: Content flows from pt-20 (comfortably below the navbar) with balanced,
 *   even vertical spacing. No forced 100svh centering, no dead 300px voids.
 */
export function SplitHero({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
  children,
  bottomContent,
  bottomContentExpanded = false,
  fullBleed = false,
  imageClassName = "",
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden ${
        fullBleed ? "bg-[#0B1B33]" : "bg-signal-deep"
      } text-paper`}
    >
      {/* ── Background Image ─────────────────────────────────────────── */}
      <div
        className={`absolute ${
          fullBleed ? "inset-0" : "inset-y-0 right-0 w-full lg:w-[55%]"
        }`}
        aria-hidden="true"
      >
        <Image
          src={image}
          alt={alt}
          fittingType="fill"
          className={`block h-full w-full ${
            fullBleed
              ? imageClassName || "object-cover object-[65%_center]"
              : imageClassName || "object-cover object-center"
          } max-lg:scale-[1.03] max-lg:blur-[2px]`}
        />

        {fullBleed ? (
          <>
            {/* Smooth contrast overlay: keeps text crisp without harsh vertical cutoff */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B33]/85 via-[#0B1B33]/60 via-45% to-transparent lg:from-[#0B1B33] lg:via-[#0B1B33]/92 lg:via-45% lg:to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B1B33]/70 to-transparent" />
            {bottomContent && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1B33]/85 via-[#0B1B33]/30 to-transparent to-35%" />
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-signal-deep via-signal-deep/85 to-signal-deep/40 lg:hidden" />
            <div className="absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-signal-deep via-signal-deep/70 to-transparent lg:block" />
          </>
        )}
      </div>

      {/* ── Content Wrapper ───────────────────────────────────────────── */}
      <motion.div
        className={`container-lattice relative flex flex-col ${
          fullBleed
            ? `lg:grid lg:grid-cols-[50%_50%] ${
                bottomContent ? "lg:grid-rows-[minmax(0,1fr)_auto]" : ""
              } lg:min-h-[85vh]`
            : "lg:grid lg:grid-cols-[45%_55%] lg:min-h-[80svh]"
        } ${
          bottomContent
            ? "pt-28 pb-12 sm:pt-32 sm:pb-14 lg:min-h-[85vh] lg:justify-center lg:pt-20 lg:pb-10"
            : "pt-28 pb-16 sm:pt-32 sm:pb-20 lg:min-h-[82vh] lg:justify-center lg:pt-24 lg:pb-20"
        } lg:items-stretch`}
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* ── Hero Text + Children ───────────────────────────────────── */}
        <div
          className={`relative z-10 transition-transform duration-300 ease-out lg:self-center my-0 lg:my-auto ${
            bottomContentExpanded ? "-translate-y-6 sm:-translate-y-8 lg:-translate-y-0" : ""
          }`}
        >
          {eyebrow && (
            <motion.div variants={entranceItem}>
              <SectionLabel tone="light">{eyebrow}</SectionLabel>
            </motion.div>
          )}

          <motion.h1
            variants={entranceItem}
            className="mt-5 max-w-xl font-heading text-3xl font-extrabold leading-[1.12] tracking-tighter text-paper drop-shadow-[0_2px_10px_rgba(7,34,72,0.7)] sm:mt-6 sm:text-4xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={entranceItem}
              className="mt-4 max-w-lg text-sm leading-relaxed text-paper/90 drop-shadow-[0_1px_4px_rgba(7,34,72,0.8)] sm:mt-5 sm:text-base lg:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={entranceItem} className="mt-7 sm:mt-9">
              {children}
            </motion.div>
          )}
        </div>

        {/* Right grid placeholder (desktop fullBleed only) */}
        {fullBleed && (
          <div className="hidden lg:block pointer-events-none" aria-hidden="true" />
        )}

        {/* ── bottomContent ─────────────────────────────────────────── */}
        {bottomContent && (
          <motion.div
            variants={entranceItem}
            className="relative z-10 mt-7 w-full sm:mt-9 lg:col-span-2 lg:mt-6 lg:px-12"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            {bottomContent}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default SplitHero;