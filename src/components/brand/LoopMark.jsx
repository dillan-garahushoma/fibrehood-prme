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
        d="M14 12c0-4.2 2.8-7 6.2-7 2.6 0 4.6 1.7 5.4 4 .8-2.3 2.8-4 5.4-4 3.4 0 6.2 2.8 6.2 7s-2.8 7-6.2 7c-2.6 0-4.6-1.7-5.4-4-.8 2.3-2.8 4-5.4 4-3.4 0-6.2-2.8-6.2-7Z"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "[stroke-dasharray:120] animate-dash-flow" : undefined}
      />
    </svg>
  );
}

export default LoopMark;