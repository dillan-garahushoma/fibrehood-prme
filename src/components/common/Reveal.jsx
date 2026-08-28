import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Lightweight scroll-reveal wrapper. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div", once = true, amount = 0.25 }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export default Reveal;