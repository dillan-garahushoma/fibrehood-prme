import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PLANS, formatSpeed } from "@/data/plans";

const HOME_PLANS = PLANS.filter((p) => p.segment === "home").slice(0, 3);
const focal = HOME_PLANS.find((p) => p.popular) || HOME_PLANS[0];
const [back1, back2] = HOME_PLANS.filter((p) => p.id !== focal.id);

function BackgroundCard({ plan, className }) {
  return (
    <div
      className={`absolute w-[62%] rounded-2xl border border-line bg-card p-4 opacity-50 blur-[1px] ${className}`}
      aria-hidden="true"
    >
      <p className="font-heading text-xs font-bold text-signal/70">{plan.name}</p>
      <div className="mt-2 flex items-end gap-1">
        <span className="font-heading text-lg font-extrabold text-signal/70">${plan.price}</span>
        <span className="pb-0.5 text-[10px] text-ink-soft/60">/mo</span>
      </div>
      <div className="mt-1 text-[10px] text-ink-soft/60">
        {formatSpeed(plan.download)} down
      </div>
    </div>
  );
}

export function Step2Plans() {
  const reduce = useReducedMotion();
  const [annual, setAnnual] = useState(false);
  const displayPrice = annual ? Math.round(focal.price * 0.8) : focal.price;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── Periphery: other plans, dimmed and cropped at the edges ── */}
      <BackgroundCard plan={back1} className="-right-6 -top-6 rotate-[4deg]" />
      <BackgroundCard plan={back2} className="-right-10 bottom-4 rotate-[-3deg]" />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-paper via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* ── Focus: the popular plan, crisp and elevated, anchored bottom-left ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-3 -left-3 w-[92%] max-w-sm rounded-2xl border-2 border-signal bg-card p-5 shadow-lift sm:w-[85%] sm:p-6"
      >
        <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-paper">
          <Star className="h-3 w-3 fill-current" />
          Popular
        </span>

        <div className="flex items-center justify-between">
          <h4 className="font-heading text-sm font-bold text-signal sm:text-base">{focal.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-ink-soft">Annual</span>
            <Switch checked={annual} onCheckedChange={setAnnual} className="h-4 w-7 data-[state=checked]:bg-signal [&>span]:h-3 [&>span]:w-3" />
          </div>
        </div>

        <div className="mt-3 flex items-end gap-1.5">
          <motion.span
            key={displayPrice}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl font-extrabold tracking-tight text-signal sm:text-4xl"
          >
            ${displayPrice}
          </motion.span>
          <span className="pb-1 text-xs font-medium text-ink-soft">/mo</span>
        </div>
        <p className="mt-0.5 text-[11px] text-ink-soft">
          {annual ? "Billed annually · save 20%" : "Billed monthly"}
        </p>

        <div className="mt-3 text-xs sm:text-sm">
          <span className="font-semibold text-signal">{formatSpeed(focal.download)}</span>
          <span className="text-ink-soft"> down · {formatSpeed(focal.upload)} up</span>
        </div>

        <div className="mt-4 space-y-1.5 border-t border-line pt-4">
          {focal.features.slice(0, 3).map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-ink-soft sm:text-[13px]">
              <Check className="h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2.5} />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Step2Plans;