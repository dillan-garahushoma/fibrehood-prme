import React from "react";
import { cn } from "@/lib/utils";

/**
 * The FibreHood loop / infinity motif. Drawn as a continuous lemniscate so it
 * reads as both "oo" and an infinite loop of connectivity.
 */
export function LoopMark({ className, stroke = 3.4, animated = false }) {
  return (
    <svg
      viewBox="0 0 44 24"
      fill="none"
      aria-hidden="true"
      className={cn("text-loop", className)}
    >
      <path
        d="M22 12C29 4 38 4 38 12C38 20 29 20 22 12C15 4 6 4 6 12C6 20 15 20 22 12Z"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        className={animated ? "animate-draw-on" : undefined}
      />
    </svg>
  );
}

export default LoopMark;