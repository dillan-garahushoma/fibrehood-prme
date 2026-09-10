import React from "react";
import { Check, Download, Upload } from "lucide-react";
import { PLANS, PLAN_CATEGORIES, formatSpeed } from "@/data/plans";
import { cn } from "@/lib/utils";

/** Step 1 — choose a fibre package, grouped Home / SME by capability progression. */
export function StepPlan({ segment, onSegmentChange, planId, onPlanChange }) {
  const plans = PLANS.filter((p) => p.segment === segment).sort((a, b) => a.displayOrder - b.displayOrder);
  const category = PLAN_CATEGORIES.find((c) => c.id === segment);

  return (
    <div>
      <div className="inline-flex rounded-xl border border-line bg-fog p-1">
        {PLAN_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSegmentChange(c.id)}
            className={cn(
              "h-9 rounded-lg px-4 text-sm font-semibold transition-colors",
              segment === c.id ? "bg-signal text-paper" : "text-ink-soft hover:text-signal"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-soft">{category?.blurb}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {plans.map((p) => {
          const selected = planId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlanChange(p.id)}
              aria-pressed={selected}
              className={cn(
                "relative rounded-2xl border p-5 text-left transition-all",
                selected ? "border-loop bg-signal text-paper shadow-lift" : "border-line bg-paper hover:border-signal/40"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className={cn("font-heading text-base font-bold", selected ? "text-paper" : "text-signal")}>{p.name}</div>
                  <div className={cn("mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]", selected ? "text-loop" : "text-ink-soft")}>
                    {p.usageLabel}
                  </div>
                </div>
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                    selected ? "border-loop bg-loop text-signal" : "border-line"
                  )}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>

              <div className={cn("mt-4 display-mono text-2xl font-semibold", selected ? "text-paper" : "text-signal")}>
                ${p.price}
                <span className={cn("ml-1 text-xs font-normal", selected ? "text-paper/60" : "text-ink-soft")}>/{p.cycle}</span>
              </div>

              <div className={cn("mt-3 flex items-center gap-4 text-xs", selected ? "text-paper/75" : "text-ink-soft")}>
                <span className="inline-flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" /> {formatSpeed(p.download)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> {formatSpeed(p.upload)}
                </span>
              </div>
              <div className={cn("mt-2 text-xs", selected ? "text-paper/60" : "text-ink-soft/85")}>
                {p.contract} · {p.installation}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StepPlan;