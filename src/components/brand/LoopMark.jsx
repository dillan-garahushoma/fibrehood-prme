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
        d="M22 12C26 8 38 6 38 12C38 18 26 16 22 12C18 8 6 6 6 12C6 18 18 16 22 12Z"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "[stroke-dasharray:140] animate-dash-flow" : undefined}
      />
    </svg>
  );
}

export default LoopMark;