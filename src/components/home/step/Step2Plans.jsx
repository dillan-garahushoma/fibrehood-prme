import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { PLANS, formatSpeed } from "@/data/plans";

const HOME_PLANS = PLANS.filter((p) => p.segment === "home").slice(0, 3);

export function Step2Plans() {
  const reduce = useReducedMotion();

  return (
    <div className="flex h-full items-center gap-3">
      {HOME_PLANS.map((plan, i) => (
        <motion.div
          key={plan.id}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex-1 overflow-hidden rounded-2xl border bg-card p-3 sm:p-4 ${
            plan.popular ? "border-signal shadow-lift" : "border-line"
          }`}
        >
          {plan.popular && (
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-signal px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-paper sm:px-3 sm:text-[10px]">
              Popular
            </span>
          )}
          <h4 className="font-heading text-xs font-bold text-signal sm:text-sm">{plan.name}</h4>
          <div className="mt-2 flex items-end gap-1 sm:mt-3">
            <span className="font-heading text-xl font-extrabold text-signal sm:text-2xl">${plan.price}</span>
            <span className="pb-1 text-[10px] text-ink-soft sm:text-xs">/mo</span>
          </div>
          <div className="mt-2 text-[11px] text-ink-soft sm:text-xs">
            <span className="font-semibold text-signal">{formatSpeed(plan.download)}</span> down
          </div>
          <div className="mt-3 space-y-1 sm:mt-4">
            {plan.features.slice(0, 2).map((f) => (
              <div key={f} className="flex items-center gap-1 text-[10px] text-ink-soft sm:text-[11px]">
                <Check className="h-2.5 w-2.5 shrink-0 text-signal/60 sm:h-3 sm:w-3" strokeWidth={2.5} />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Step2Plans;