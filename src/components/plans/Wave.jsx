import React from "react";
import { cn } from "@/lib/utils";

/**
 * Curved SVG section edge.
 *
 * `fill`  — the fill colour of the section you are transitioning INTO
 *           (use the background colour of the NEXT section).
 * `flip`  — when true the wave renders at the TOP of a section (rotated 180°),
 *           creating a curve that matches the bottom of the preceding section.
 */
export function Wave({ fill, flip = false, className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-10 w-full sm:h-14 lg:h-20",
        flip ? "top-[-1px] rotate-180" : "bottom-[-1px]",
        className
      )}
    >
      <path
        d="M0,48 C240,88 480,8 720,32 C960,56 1200,80 1440,24 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}

export default Wave;
