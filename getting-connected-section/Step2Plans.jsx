import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { PLANS, formatSpeed } from "@/data/plans";

const HOME_PLANS = PLANS.filter((plan) => plan.segment === "home").slice(0, 3);
const FOCAL_PLAN = HOME_PLANS.find((plan) => plan.popular) || HOME_PLANS[0];
const SUPPORTING_PLANS = HOME_PLANS.filter((plan) => plan.id !== FOCAL_PLAN.id);

function BackgroundPlan({ plan, className }) {
  return (
    <div
      className={`absolute w-[42%] rounded-2xl border border-white/55 bg-white/30 p-4 opacity-70 backdrop-blur-[2px] ${className}`}
      aria-hidden="true"
    >
      <p className="font-heading text-xs font-bold text-signal/75">{plan.name}</p>
      <div className="mt-2 flex items-end gap-1">
        <span className="font-heading text-2xl font-extrabold tracking-tight text-signal/70">${plan.price}</span>
        <span className="pb-1 text-[10px] text-ink-soft/60">/mo</span>
      </div>
      <p className="mt-1 text-[10px] text-ink-soft/70">{formatSpeed(plan.download)} download</p>
      <div className="mt-4 h-px bg-signal/10" />
      <div className="mt-3 h-1.5 w-2/3 rounded-full bg-signal/10" />
      <div className="mt-2 h-1.5 w-1/2 rounded-full bg-signal/10" />
    </div>
  );
}

export function Step2Plans({ active = true }) {
  const reduce = useReducedMotion();
  const [annual, setAnnual] = useState(false);
  const displayedPrice = annual ? Math.round(FOCAL_PLAN.price * 0.8) : FOCAL_PLAN.price;

  return (
    <div className="relative h-full w-full overflow-visible">
      <BackgroundPlan plan={SUPPORTING_PLANS[0]} className="right-[4%] top-[7%] -rotate-[4deg]" />
      <BackgroundPlan plan={SUPPORTING_PLANS[1]} className="bottom-[5%] left-[3%] rotate-[3deg]" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 50% 52%, rgba(247,249,251,0.12), rgba(247,249,251,0) 66%)",
          maskImage: "radial-gradient(ellipse 86% 84% at 50% 52%, black 32%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(ellipse 86% 84% at 50% 52%, black 32%, transparent 92%)",
        }}
      />

      <motion.article
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-5 top-1/2 mx-auto w-auto max-w-[440px] -translate-y-1/2 rounded-[1.35rem] border border-white/70 bg-paper/75 p-5 shadow-[0_24px_64px_rgba(7,34,72,0.14)] backdrop-blur-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-loop/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-signal">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Most popular
            </span>
            <h4 className="mt-3 font-heading text-lg font-bold tracking-tight text-signal sm:text-xl">{FOCAL_PLAN.name}</h4>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((value) => !value)}
            className={`flex items-center gap-2 rounded-full px-1 py-1 text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${annual ? "bg-signal text-paper" : "bg-signal/7 text-ink-soft"}`}
          >
            <span className="pl-1.5">Annual</span>
            <span className={`relative h-5 w-9 rounded-full transition-colors ${annual ? "bg-loop" : "bg-line"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${annual ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
            <span className="sr-only">Toggle annual billing</span>
          </button>
        </div>

        <div className="mt-4 flex items-end gap-1.5">
          <motion.span
            key={displayedPrice}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="font-heading text-4xl font-extrabold tracking-tight text-signal sm:text-5xl"
          >
            ${displayedPrice}
          </motion.span>
          <span className="pb-1.5 text-sm font-medium text-ink-soft">/month</span>
        </div>
        <p className="mt-1 text-xs text-ink-soft">
          {annual ? "Billed annually · save 20%" : "Billed monthly · change anytime"}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-y border-line/75 py-3.5 text-sm">
          <span><strong className="font-semibold text-signal">{formatSpeed(FOCAL_PLAN.download)}</strong> <span className="text-ink-soft">down</span></span>
          <span><strong className="font-semibold text-signal">{formatSpeed(FOCAL_PLAN.upload)}</strong> <span className="text-ink-soft">up</span></span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-signal"><Sparkles className="h-3.5 w-3.5 text-loop" aria-hidden="true" /> Fibre</span>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {FOCAL_PLAN.features.slice(0, 4).map((feature, index) => (
            <motion.li
              key={feature}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.28, delay: reduce ? 0 : 0.2 + index * 0.06 }}
              className="flex min-w-0 items-center gap-2 text-xs text-ink-soft"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2.5} aria-hidden="true" />
              <span className="truncate">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default Step2Plans;
