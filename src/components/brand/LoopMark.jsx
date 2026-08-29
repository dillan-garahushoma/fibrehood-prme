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
        fill="none"
        className={animated ? "[stroke-dasharray:64] animate-dash-flow" : undefined}
      >
        <circle cx="14.5" cy="12" r="8.5" />
        <circle cx="29.5" cy="12" r="8.5" />
      </g>
    </svg>
  );
}

export default LoopMark;