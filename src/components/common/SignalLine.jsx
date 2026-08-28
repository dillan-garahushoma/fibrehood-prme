import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A thin Loop Yellow "signal" line that traces down the right edge as the user
 * scrolls, visually connecting content blocks. Hidden on small screens and
 * when reduced-motion is requested.
 */
export function SignalLine() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-[3px] lg:block"
    >
      <div className="absolute inset-0 bg-line/60" />
      <div
        className="absolute left-0 top-0 w-full bg-loop transition-[height] duration-150 ease-out"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}

export default SignalLine;