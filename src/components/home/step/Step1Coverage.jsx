import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Check } from "lucide-react";

export function Step1Coverage() {
  const reduce = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-fog">
      {/* Address bar */}
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
        <MapPin className="h-4 w-4 shrink-0 text-signal/50" strokeWidth={1.6} />
        <span className="truncate text-sm text-ink-soft">14 Mangwende Street, Harare</span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal">
          <Check className="h-3 w-3" strokeWidth={2.5} />
          Covered
        </span>
      </div>

      {/* Map area */}
      <div className="relative flex-1 bg-grid">
        {/* Coverage zones */}
        <div className="absolute left-[8%] top-[10%] h-[55%] w-[50%] rounded-xl bg-signal/10" />
        <div className="absolute right-[5%] bottom-[8%] h-[45%] w-[40%] rounded-xl bg-signal/10" />

        {/* Streets */}
        <div className="absolute left-0 top-[45%] h-0.5 w-full bg-line" />
        <div className="absolute left-[48%] top-0 h-full w-0.5 bg-line" />

        {/* Signal radius pulse */}
        <motion.div
          className="absolute left-[42%] top-[33%] h-20 w-20 rounded-full border border-signal/20"
          initial={reduce ? false : { scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, repeat: reduce ? 0 : Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Pin */}
        <motion.div
          className="absolute left-[45%] top-[36%]"
          initial={reduce ? false : { y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-loop shadow-lift">
            <MapPin className="h-5 w-5 text-signal" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Coverage info card */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 rounded-xl border border-line bg-paper/90 px-4 py-3 shadow-signal backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-xs font-semibold text-signal">FibreHood is available here</p>
          <p className="mt-0.5 text-[11px] text-ink-soft">Up to 200 Mbps · Free installation</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Step1Coverage;