import React, { useReducedMotion } from "react";
import { motion } from "framer-motion";
import { ConnectionGlobe } from "@/components/home/step/ConnectionGlobe";

/**
 * Step 04 — "Get connected".
 * The globe is the focus: a rotating dot-matrix sphere with live connection
 * badges tracking real nodes. A small status strip anchors the bottom so the
 * "you're online" payoff reads clearly, while the periphery dissolves away.
 */
export function Step4Connected() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* soft radial vignette so the globe lifts off the surface */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 48%, hsl(var(--paper)) 0%, transparent 75%)",
        }}
      />

      <ConnectionGlobe />

      {/* status strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-3 -left-3 flex items-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3 shadow-lift"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-bold text-signal">You're connected</p>
          <p className="text-[10px] text-ink-soft">Live · 99.8% uptime</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Step4Connected;