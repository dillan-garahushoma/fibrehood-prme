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
      <g
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        className={animated ? "[stroke-dasharray:60] animate-dash-flow" : undefined}
      >
        <ellipse cx="14" cy="12" rx="9.5" ry="7" />
        <ellipse cx="30" cy="12" rx="9.5" ry="7" />
      </g>
    </svg>
  );
}

export default LoopMark;