// Shared chart styling + tooltips for the Fibrehood Client Portal.
import React from "react";
import { cn } from "@/lib/utils";

export const CHART = {
  navy: "#0A2E63",
  navyDeep: "#072248",
  gold: "#FFCC00",
  blue: "#1D6FB8",
  sky: "#2E9BD6",
  steel: "#7AB8E4",
  slate: "#94A3B8",
};

/**
 * Generic custom tooltip for Recharts. `formatter` maps dataKey -> (value) => string.
 */
export function ChartTooltip({ active, payload, label, formatter = {}, title }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="min-w-[150px] rounded-xl border border-border bg-card/95 px-3.5 py-3 shadow-lift backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">
        {title || label}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, i) => {
          const fmt = formatter[entry.dataKey];
          return (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: entry.color || entry.payload?.fill || CHART.gold }}
                />
                {entry.name}
              </span>
              <span className="font-mono text-xs font-semibold text-foreground">
                {fmt ? fmt(entry.value) : entry.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function axisTickStyle(dark) {
  return {
    fill: dark ? "hsl(215 20% 60%)" : "hsl(210 18% 45%)",
    fontSize: 11,
    fontWeight: 500,
  };
}

export function gridStroke(dark) {
  return dark ? "hsl(215 40% 24%)" : "hsl(215 25% 90%)";
}

export function axisLine(dark) {
  return dark ? "hsl(215 40% 24%)" : "hsl(215 25% 88%)";
}

export function ChartFrame({ children, className, height = 260 }) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      {children}
    </div>
  );
}
