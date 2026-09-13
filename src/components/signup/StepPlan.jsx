import React from "react";
import { Check, Download, Upload } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { PLANS, PLAN_CATEGORIES, formatSpeed } from "@/data/plans";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 };
const PRICE_FORMAT = { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 };

/** Step 1 — choose a fibre package. */
export function StepPlan({ segment, onSegmentChange, planId, onPlanChange }) {
  const reduce = useReducedMotion();
  const plans = PLANS.filter((p) => p.segment === segment).sort((a, b) => a.displayOrder - b.displayOrder);
  const category = PLAN_CATEGORIES.find((c) => c.id === segment);
  const spring = reduce ? { duration: 0 } : SPRING;

  return (
    <div>
      <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] font-semibold tracking-tight">
        Choose your package
      </h1>
      <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
        Select the fibre speed that best fits your daily needs. You can easily adjust your plan at any time.
      </p>

      {/* Category toggle pills */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <span className="block text-sm text-stone-800 font-medium mb-3">Plan category</span>
        <div className="flex flex-wrap gap-2.5">
          {PLAN_CATEGORIES.map((c) => {
            const active = segment === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSegmentChange(c.id)}
                className={cn(
                  "px-4 py-2.5 rounded-full border text-sm transition-all duration-300 cursor-pointer font-medium",
                  active
                    ? "border-[#FFCC00] text-[#FFCC00] bg-[#FFFAE0] shadow-sm"
                    : "border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-900 bg-white"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {category?.blurb && <p className="mt-2.5 text-xs text-stone-600 font-medium">{category.blurb}</p>}
      </div>

      {/* Plan list */}
      <div className="mt-8 pt-7 border-t border-stone-200 flex flex-col gap-3">
        {plans.map((p) => {
          const selected = planId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlanChange(p.id)}
              aria-pressed={selected}
              className={cn(
                "w-full rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer",
                selected
                  ? "border-[#FFCC00] bg-[#FFFAE0]/60"
                  : "border-stone-300 bg-white hover:border-stone-400 hover:bg-stone-50/60"
              )}
              style={
                selected
                  ? { boxShadow: "0 12px 28px -12px rgba(255,204,0,0.28)" }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3.5">
                  <span
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                      selected ? "border-[#FFCC00]" : "border-stone-400"
                    )}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FFCC00]" />
                    )}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-[#031630]">{p.name}</span>
                      {p.popular && (
                        <span className="rounded-full bg-[#FFFAE0] text-[#FFCC00] px-2.5 py-0.5 text-[10px] font-semibold">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-stone-500 font-medium">{p.usageLabel}</div>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-stone-700 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-3 w-3 text-stone-500" /> {formatSpeed(p.download)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Upload className="h-3 w-3 text-stone-500" /> {formatSpeed(p.upload)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#031630]">
                    <NumberFlow value={p.price} format={PRICE_FORMAT} />
                  </div>
                  <div className="text-xs text-stone-500 font-medium">/{p.cycle}</div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 border-t border-stone-200/80 pt-4">
                      <div className="flex flex-col gap-2">
                        {p.features.map((f) => (
                          <div key={f} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#FFCC00]/15 text-[#FFCC00]">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                            {f}
                          </div>
                        ))}
                      </div>

                      {p.bestFor?.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
                          {p.bestFor.map((tag) => (
                            <span key={tag} className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] text-stone-700 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 text-xs text-stone-500">
                        {p.contract} · {p.installation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StepPlan;