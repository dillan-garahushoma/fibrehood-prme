import React from "react";
import { cn } from "@/lib/utils";
import { LoopMark } from "./LoopMark";

/**
 * FibreHood wordmark: "fibre" + infinity loop (replaces "oo") + "d".
 * The loop is rendered in Loop Yellow; the rest follows the surrounding tone.
 */
export function Logo({ className, tone = "ink", showTagline = true, taglineClass }) {
  const wordColor = tone === "light" ? "text-paper" : "text-signal";
  const tagColor = tone === "light" ? "text-paper/60" : "text-ink-soft";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("flex items-end font-heading font-extrabold tracking-tighter", wordColor)}>
        <span>fibre</span>
        <LoopMark className={cn("mx-[1px] mb-[0.18em] h-[0.74em] w-[1.18em] shrink-0")} />
        <span>d</span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-1 font-body text-[0.62em] font-medium tracking-wide",
            tagColor,
            taglineClass
          )}
        >
          Bridging the access gap
        </span>
      )}
    </span>
  );
}

export default Logo;