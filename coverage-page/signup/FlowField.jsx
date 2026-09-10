import React from "react";
import { cn } from "@/lib/utils";

export function FlowField({ label, required, hint, className, children }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}
        {required ? <span className="text-loop"> *</span> : null}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-ink-soft/80">{hint}</span>}
    </label>
  );
}

export const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink-soft/50 focus:border-loop focus:ring-2 focus:ring-loop/30";

export function FlowError({ children }) {
  if (!children) return null;
  return (
    <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
      {children}
    </div>
  );
}

export default FlowField;