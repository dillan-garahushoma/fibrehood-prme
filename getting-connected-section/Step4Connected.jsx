import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, CheckCircle2 } from "lucide-react";
import { ConnectionGlobe } from "@/components/home/step/ConnectionGlobe";

export function Step4Connected() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 53% 44%, rgba(7,34,72,0.11), transparent 37%), radial-gradient(circle at 24% 74%, rgba(255,204,0,0.16), transparent 25%)",
          maskImage: "radial-gradient(ellipse 90% 88% at 50% 49%, black 26%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 49%, black 26%, transparent 92%)",
        }}
      />

      <div className="absolute inset-0">
        <ConnectionGlobe />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/65 bg-paper/72 px-3.5 py-3 shadow-[0_12px_32px_rgba(7,34,72,0.1)] backdrop-blur-xl sm:bottom-6 sm:left-6"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <span className="absolute inset-0 rounded-full border border-emerald-500/35 animate-ping" aria-hidden="true" />
          <CheckCircle2 className="relative h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-bold text-signal">You're connected</p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-ink-soft"><Activity className="h-3 w-3 text-emerald-600" aria-hidden="true" /> Live · 99.8% uptime</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Step4Connected;
