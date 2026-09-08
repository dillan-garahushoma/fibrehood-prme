import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import LifePhoto from "@/components/home/LifePhoto";

const EASE = [0.16, 1, 0.3, 1];

const USE_CASES = ["Stream", "Work from home", "Game", "Stay connected"];

export function EverydayLife() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="container-lattice grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* ── Left: editorial copy, breathing room ────────────────── */}
        <motion.div
          className="max-w-[560px]"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft">
            <span className="h-px w-7 bg-loop" aria-hidden="true" />
            01 — Everyday connectivity
          </span>

          <h2 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
            Internet that keeps up with your life<span className="text-loop">.</span>
          </h2>

          <p className="mt-6 text-lg italic leading-relaxed text-ink-soft">
            Before anything else, your connection has to just work.
          </p>

          <p className="mt-5 text-base leading-[1.85] text-ink-soft">
            Whatever your household runs on, it runs on fibre — 4K streams that
            never buffer, calls that stay crystal-clear, latency low enough for
            competitive play, and every phone, laptop and smart device online
            at once without a single one slowing down.
          </p>

          <div className="mt-9 border-l-2 border-loop pl-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Built for
            </span>
            <p className="mt-2 text-base italic leading-relaxed text-ink-soft">
              {USE_CASES.join(" · ")}
            </p>
          </div>
        </motion.div>

        {/* ── Right: full-bleed photo ──────────────────────────────── */}
        <LifePhoto reduce={reduce} />
      </div>
    </section>
  );
}

export default EverydayLife;