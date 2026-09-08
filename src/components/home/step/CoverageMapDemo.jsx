import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Check, Search } from "lucide-react";

/**
 * Coverage map "hero" visual for step 01.
 * Deliberately frameless — no card border/background — so the map glow and
 * dot-grid dissolve into the surrounding section via a radial mask, while a
 * single crisp, elevated UI moment (the address search + coverage result)
 * stays sharp in focus. Mirrors the "focus vs. periphery" treatment used by
 * Linear's product shots: most of the surface fades away, only what matters
 * stays vivid.
 */
export function CoverageMapDemo() {
  const reduce = useReducedMotion();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible">
      {/* ── Periphery: dot grid + soft coverage-zone glow, faded at every edge ── */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 50% 45%, black 35%, transparent 85%)"
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute left-[12%] top-[14%] h-56 w-56 rounded-full bg-signal/10 blur-3xl" />
        <div className="absolute right-[10%] top-[30%] h-48 w-48 rounded-full bg-loop/15 blur-3xl" />
        <div className="absolute bottom-[10%] left-[28%] h-40 w-40 rounded-full bg-signal/10 blur-3xl" />

        {/* faint streets */}
        <div className="absolute left-0 top-[42%] h-px w-full bg-signal/15" />
        <div className="absolute left-[46%] top-0 h-full w-px bg-signal/15" />
      </div>

      {/* ── Focus: signal pulse + pin, crisp and central ── */}
      <motion.div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="relative flex items-center justify-center">
          <motion.span
            className="absolute h-16 w-16 rounded-full border border-loop/50"
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 2.1, opacity: 0 }}
            transition={{ duration: 2.2, repeat: reduce ? 0 : Infinity, ease: "easeOut" }}
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-signal shadow-lift">
            <MapPin className="h-5 w-5 text-loop" strokeWidth={2} />
          </span>
        </span>
      </motion.div>

      {/* ── Focus: crisp, elevated address search card ── */}
      <motion.div
        className="absolute left-1/2 top-[62%] w-[86%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-card p-4 shadow-lift sm:w-[80%]"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-ink-soft/60" strokeWidth={1.8} />
          <span className="truncate text-sm text-ink-soft">14 Mangwende Street, Harare</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal">
            <Check className="h-3 w-3" strokeWidth={2.5} />
            Covered
          </span>
          <span className="text-xs font-medium text-ink-soft">Up to 200 Mbps</span>
        </div>
      </motion.div>
    </div>
  );
}

export default CoverageMapDemo;