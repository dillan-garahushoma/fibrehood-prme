import React from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({ children, className, tone = "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "light" ? "text-loop" : "text-ink-soft",
        className
      )}
    >
      <span className={cn("h-px w-6", tone === "light" ? "bg-loop/70" : "bg-signal/40")} />
      {children}
    </span>
  );
}

export default SectionLabel;