import { useEffect, useRef, useState } from "react";
import { useInView as useFramerInView } from "framer-motion";
import { Reveal as CommonReveal } from "@/components/common/Reveal";

export const NAVY = "#072146";
export const GOLD = "#FFCC00";

/**
 * Robust in-view hook powered by framer-motion's tested viewport observer.
 * Returns [ref, isInView].
 */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const amount = typeof threshold === "number" ? threshold : 0.1;
  const inView = useFramerInView(ref, {
    once: true,
    amount,
  });

  return [ref, inView];
}

/**
 * Animated cubic ease-out counter.
 */
export function useCountUp(target, isActive, duration = 1200) {
  const numericTarget = typeof target === "number"
    ? target
    : parseInt(String(target).replace(/[^0-9]/g, ""), 10) || 0;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let frame;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(numericTarget * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(numericTarget);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isActive, numericTarget, duration]);

  return value;
}

/**
 * Wrapper over project standard Reveal that handles both seconds (0.1) and ms (100).
 */
export function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const normalizedDelay = delay > 5 ? delay / 1000 : delay;
  return (
    <CommonReveal as={as} delay={normalizedDelay} className={className} {...rest}>
      {children}
    </CommonReveal>
  );
}
