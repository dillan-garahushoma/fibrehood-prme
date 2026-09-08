"use client";

/**
 * WHY THE CURRENT SCROLL TRIGGER SKIPS / FLICKERS ON REVERSE
 * ------------------------------------------------------------------
 * The usual cause of "scroll down works, scroll up skips or leaves the
 * previous visual stuck" is that each visual (map / plans / scheduler /
 * globe) is watching its OWN enter/exit events independently — e.g. four
 * separate IntersectionObservers, or four separate `whileInView` triggers,
 * or four separate GSAP ScrollTriggers with their own `start`/`end`.
 *
 * Independent observers race each other. Scrolling up fast can fire
 * "step 3 exit" a frame before "step 2 enter", or never fire "step 3 exit"
 * at all if the element leaves the viewport in one jump — so step 3's
 * visual is still mounted/visible while step 2 renders on top of it. That
 * matches exactly what you described: "the past visual or later visual
 * remains and sometimes skips a visual."
 *
 * THE FIX: one source of truth
 * ------------------------------------------------------------------
 * Pin the whole section and derive a single scroll progress value (0 to 1)
 * from it. Every visual reads its "am I active" state from the SAME number,
 * as a range (e.g. step 2 is active for progress 0.25–0.50). There is only
 * ever one number driving four ranges, so it's impossible for two steps to
 * both think they're active, and reversing scroll just walks the same
 * ranges backward — no separate "reverse" logic needed.
 */

import { useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useState } from "react";

// tune this once, based on how many pinned "screens" tall you want the
// section to be (more height = slower / more deliberate scroll per step)
const STEPS = [
  { key: "coverage", from: 0.0, to: 0.25 },
  { key: "plans", from: 0.25, to: 0.5 },
  { key: "scheduler", from: 0.5, to: 0.75 },
  { key: "globe", from: 0.75, to: 1.0 },
] as const;

export function useScrollStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState<string>(STEPS[0].key);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // small hysteresis band at each boundary so you don't flicker between
    // two steps when the scroll position sits exactly on a boundary
    const current = STEPS.find((s) => p >= s.from - 0.015 && p < s.to + 0.015);
    if (current && current.key !== active) setActive(current.key);
  });

  return { ref, scrollYProgress, active, STEPS };
}

/**
 * Usage in the section component:
 *
 *   const { ref, active } = useScrollStage();
 *
 *   <section ref={ref} style={{ height: "400vh" }}>
 *     <div style={{ position: "sticky", top: 0, height: "100vh" }}>
 *       <TextForStep active={active} />
 *       {active === "coverage"  && <CoverageMap  />}
 *       {active === "plans"     && <Pricing active plans={plans} />}
 *       {active === "scheduler" && <SchedulerStage active />}
 *       {active === "globe"     && <Globe />}
 *     </div>
 *   </section>
 *
 * Because `active` is one string derived from one progress value, exactly
 * one visual is ever mounted, scrolling up and down are symmetric for
 * free, and there's no dependence on IntersectionObserver timing.
 */
export function ScrollStageExample() {
  const { ref, active } = useScrollStage();
  return (
    <section ref={ref} style={{ height: "400vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh" }}>
        {/* swap in your real step components here, keyed off `active` */}
        <motion.div animate={{ opacity: 1 }}>{active}</motion.div>
      </div>
    </section>
  );
}
