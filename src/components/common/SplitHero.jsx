import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";

/**
 * Plans-style split hero: full-bleed image right on desktop, blended behind
 * the navy hero on mobile.
 *
 * Mobile layout strategy (the hard part):
 * ─────────────────────────────────────────
 * PROBLEM: `justify-center` + absolute `bottomContent` = content hovering in
 * the middle with dead gaps above AND below. The absolute element doesn't
 * participate in flow so `pb-40` just pushed the center-point upward, creating
 * a dead zone between the two elements.
 *
 * SOLUTION: On mobile, take `bottomContent` OUT of absolute positioning and
 * put it in the NORMAL FLEX FLOW with `mt-auto`. This makes the hero a proper
 * edge-to-edge column: nav-clearance → content → stretch → checker → safe-area.
 * No gaps, no dead zones, layout fills the viewport naturally.
 *
 * On lg+ desktop: restore the original grid + absolute layout.
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
        {/*
         * `block` ensures the <ImageWrapper> span (inline-block by default)
         * fills its absolute parent rather than collapsing to intrinsic size.
         */}
        <Image
          src={image}
          alt={alt}
          fittingType="fill"
          className={`block h-full w-full ${
            fullBleed
              ? imageClassName || "object-cover object-center"
              : "object-cover"
          }`}
        />

        {fullBleed ? (
          <>
            {/* Horizontal gradient: strong on mobile (55%), feathers on desktop */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1B33] via-[#0B1B33]/92 via-55% sm:via-[#0B1B33]/88 sm:via-45% to-transparent lg:to-65%" />
            {/* Vertical bottom-up gradient: always on mobile, heavier with bottomContent */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                bottomContent
                  ? "from-[#0B1B33]/90 via-[#0B1B33]/40 to-transparent"
                  : "from-[#0B1B33]/70 via-[#0B1B33]/20 to-transparent sm:hidden"
              }`}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-signal-deep/65 lg:hidden" />
            <div className="absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-signal-deep via-signal-deep/70 to-transparent lg:block" />
          </>
        )}
      </div>

      {/* ── Content wrapper ───────────────────────────────────────────── */}
      {/*
       * Mobile (< lg):
       *   - min-h-[100svh] fills the full viewport so there are no orphan gaps
       *   - flex-col with justify-start: content flows from top, bottomContent
       *     uses mt-auto to anchor at the bottom — no absolute positioning
       *   - pt-[6.5rem] clears the transparent sticky nav (≈ 64px) with breathing room
       *   - No large bottom padding hack needed
       *
       * Desktop (lg+):
       *   - grid layout; bottomContent restores to absolute bottom-8 as designed
       */}
      <motion.div
        className={`container-lattice relative flex flex-col ${
          fullBleed
            ? "lg:grid lg:grid-cols-[50%_50%] lg:min-h-[88vh]"
            : "lg:grid lg:grid-cols-[45%_55%] lg:min-h-[80svh]"
        } ${
          bottomContent
            ? // With checker: fill exactly the viewport — content at top, checker at bottom
              "min-h-[100svh] justify-start pt-[6.5rem] pb-6 sm:pt-28 sm:pb-8 lg:justify-start lg:pt-24 lg:pb-24"
            : // Without checker: fill viewport so content centers with no orphan gap below
              "min-h-[100svh] justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:min-h-[80svh] lg:pt-24 lg:pb-20"
        } lg:items-stretch`}
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {/* ── Hero text + children ───────────────────────────────────── */}
        <div
          className={`relative z-10 transition-transform duration-300 ease-out lg:self-center ${
            bottomContent
              ? // With checker: don't center — let content sit at top, checker at bottom
                "flex flex-col justify-center flex-1 lg:flex-none lg:my-auto"
              : // Without checker: center as before
                "my-auto"
          } ${bottomContentExpanded ? "-translate-y-8 sm:-translate-y-10 lg:-translate-y-0" : ""}`}
        >
          {eyebrow && (
            <motion.div variants={entranceItem}>
              <SectionLabel tone="light">{eyebrow}</SectionLabel>
            </motion.div>
          )}

          <motion.h1
            variants={entranceItem}
            className="mt-5 max-w-xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={entranceItem}
              className="mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:mt-6 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={entranceItem} className="mt-8 sm:mt-10">
              {children}
            </motion.div>
          )}
        </div>

        {/* Right grid placeholder (desktop fullBleed only) */}
        {fullBleed && (
          <div className="hidden lg:block pointer-events-none" aria-hidden="true" />
        )}

        {/* ── bottomContent ─────────────────────────────────────────── */}
        {/*
         * Mobile: in normal flow with mt-auto → anchors to bottom of the
         *   100svh container without any absolute hacks or gap dead-zones.
         * Desktop (lg+): absolute bottom-8 so it overlaps the grid column
         *   exactly as the original design intended.
         */}
        {bottomContent && (
          <motion.div
            variants={entranceItem}
            className="relative z-10 mt-auto w-full lg:absolute lg:inset-x-0 lg:bottom-8 lg:px-12"
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