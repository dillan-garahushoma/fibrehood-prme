import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, MessageCircle, Gauge, Home, Building2 } from "lucide-react";
import { LoopMark } from "@/components/brand/LoopMark";
import { formatSpeed } from "@/data/plans";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

export function PlanCard({ plan, selected = false, onToggle, featured = false }) {
  const isBiz = plan.segment === "business";
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-paper transition-all duration-300",
        plan.popular ? "border-loop shadow-loop" : "border-line hover:border-signal/40 hover:shadow-signal",
        selected && "ring-2 ring-loop"
      )}
    >
      {plan.popular && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-loop px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-signal">
          Popular
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", isBiz ? "bg-signal text-paper" : "bg-fog text-ink-soft")}>
            {isBiz ? <Building2 className="h-3.5 w-3.5" /> : <Home className="h-3.5 w-3.5" />}
            {isBiz ? "SME" : "Home"}
          </span>
          <span className="text-xs text-ink-soft">{plan.type}</span>
        </div>

        <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-signal">{plan.name}</h3>

        <div className="mt-5 flex items-end gap-2">
          <span className="display-mono text-5xl font-bold leading-none text-ink">{formatSpeed(plan.download)}</span>
          <span className="mb-1 text-xs text-ink-soft">down</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-soft">
          <Gauge className="h-4 w-4" />
          <span className="display-mono font-semibold text-ink">{formatSpeed(plan.upload)}</span>
          <span>upload</span>
        </div>

        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-lg font-semibold text-signal">${plan.price}</span>
          <span className="text-sm text-ink-soft">/ {plan.cycle}</span>
        </div>
        {plan.dev && (
          <p className="mt-1 text-[11px] text-ink-soft/70">Indicative price — confirmed at your coverage check.</p>
        )}
      </div>

      <div className="signal-divider mx-6" />

      <div className="flex-1 p-6">
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {plan.bestFor?.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Best for</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {plan.bestFor.map((b) => (
                <span key={b} className="rounded-full bg-fog px-2.5 py-1 text-xs text-ink-soft">{b}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-2">
        {onToggle && (
          <button
            onClick={() => onToggle(plan.id)}
            className={cn(
              "mb-2 w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
              selected ? "border-loop bg-loop/10 text-signal" : "border-line text-ink-soft hover:bg-fog"
            )}
          >
            {selected ? "Selected for comparison" : "Add to compare"}
          </button>
        )}
        <a
          href={WA_INTENTS.plan(plan.name)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
        >
          <MessageCircle className="h-4 w-4 text-loop" /> Request connection
        </a>
        <Link
          to="/coverage"
          className="mt-2 inline-flex w-full items-center justify-center gap-1 text-xs font-medium text-ink-soft hover:text-signal"
        >
          Check availability first <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default PlanCard;