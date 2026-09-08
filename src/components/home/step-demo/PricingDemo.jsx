import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { PLANS, formatSpeed } from "@/data/plans";

const PLANS_3 = PLANS.filter((p) => p.segment === "home").slice(0, 3);
const CYCLE_MS = 3200;

export function PricingDemo() {
  const reduce = useReducedMotion();
  const [isMonthly, setIsMonthly] = useState(true);
  const [active, setActive] = useState(1); // popular plan centered
  const paused = useRef(false);

  // Slow auto-cycling highlight between the three plans
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((p) => (p + 1) % PLANS_3.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="glass-panel flex h-full w-full flex-col rounded-2xl p-4 sm:p-5">
      {/* Billing toggle — self-contained */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Choose your plan
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${isMonthly ? "text-signal" : "text-ink-soft/60"}`}>
            Monthly
          </span>
          <Label>
            <Switch
              checked={!isMonthly}
              onCheckedChange={(c) => setIsMonthly(!c)}
              aria-label="Toggle annual billing"
            />
          </Label>
          <span className={`text-xs font-medium ${!isMonthly ? "text-signal" : "text-ink-soft/60"}`}>
            Annual
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div
        className="mt-4 grid flex-1 grid-cols-3 gap-2.5 sm:gap-3"
        onMouseLeave={() => (paused.current = false)}
      >
        {PLANS_3.map((plan, i) => {
          const isActive = active === i;
          const price = isMonthly ? plan.price : Math.round(plan.price * 0.8);
          return (
            <div
              key={plan.id}
              className="relative flex flex-col rounded-xl p-3 sm:p-3.5"
              onMouseEnter={() => (paused.current = true)}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              {/* Shared-layout highlight that travels between cards */}
              {isActive && (
                <motion.div
                  layoutId="price-highlight"
                  className="absolute inset-0 rounded-xl border border-loop bg-loop/5 shadow-loop"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex h-full flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft sm:text-[11px]">
                  {plan.name}
                </span>
                {plan.popular && (
                  <span className="mt-1 inline-flex w-fit rounded-full bg-signal px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-paper sm:text-[9px]">
                    Popular
                  </span>
                )}
                <div className="mt-2 flex items-end gap-1">
                  <span className="font-heading text-xl font-extrabold tracking-tight text-signal sm:text-2xl">
                    <NumberFlow
                      value={price}
                      format={{ style: "currency", currency: "USD", minimumFractionDigits: 0 }}
                      transformTiming={{ duration: 450, easing: "ease-out" }}
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  <span className="pb-1 text-[10px] text-ink-soft sm:text-xs">/mo</span>
                </div>
                <div className="mt-1.5 text-[10px] text-ink-soft sm:text-[11px]">
                  <span className="font-semibold text-signal">{formatSpeed(plan.download)}</span> down
                </div>
                <div className="mt-2.5 space-y-1 sm:mt-3">
                  {plan.features.slice(0, 2).map((f) => (
                    <div key={f} className="flex items-center gap-1 text-[9px] text-ink-soft sm:text-[10px]">
                      <Check className="h-2.5 w-2.5 shrink-0 text-loop" strokeWidth={2.5} />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PricingDemo;