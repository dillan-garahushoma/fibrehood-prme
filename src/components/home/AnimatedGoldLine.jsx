import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedGoldLine({ className = "" }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`flex justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="h-px w-4/5 origin-center bg-[#FFCC00]/70 shadow-[0_0_8px_rgba(255,204,0,0.2)]"
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
