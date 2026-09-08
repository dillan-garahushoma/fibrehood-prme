import React from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { num: "01", title: "Check coverage" },
  { num: "02", title: "Choose your plan" },
  { num: "03", title: "Schedule installation" },
  { num: "04", title: "Get connected" },
];

export function StepProgressRail({ activeStep, variant = "vertical", className }) {
  if (variant === "horizontal") {
    return (
      <div className={cn("flex items-center justify-between gap-1", className)}>
        {STEPS.map((step, i) => (
          <React.Fragment key={step.num}>
            <span className={cn(
              "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold transition-all duration-300",
              i === activeStep
                ? "bg-signal text-paper shadow-signal"
                : i < activeStep
                  ? "bg-signal/10 text-signal"
                  : "bg-fog text-ink-soft/40"
            )}>
              {step.num}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn(
                "h-px flex-1 transition-colors duration-300",
                i < activeStep ? "bg-signal/30" : "bg-line"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <span className="absolute left-[22px] top-3 h-[calc(100%-1.5rem)] w-px bg-line" aria-hidden="true" />
      <div className="space-y-1">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center gap-4 py-3">
            <span className={cn(
              "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold transition-all duration-300",
              i === activeStep
                ? "bg-signal text-paper shadow-signal"
                : i < activeStep
                  ? "bg-signal/10 text-signal"
                  : "bg-fog text-ink-soft/40"
            )}>
              {step.num}
            </span>
            <span className={cn(
              "text-sm font-semibold transition-colors duration-300",
              i === activeStep ? "text-signal" : "text-ink-soft/40"
            )}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepProgressRail;