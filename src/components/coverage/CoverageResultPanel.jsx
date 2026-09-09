import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight, MessageCircle, MapPin, RotateCcw, Info } from "lucide-react";
import { DEPLOYMENT_STATUS, RESOLUTION, CONFIDENCE, statusMeta } from "@/data/coverageStatus";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

/** What is my status, and what can I do next — nothing more. */
export function CoverageResultPanel({ checking, result, onPrimary, onReset }) {
  if (checking) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6 shadow-signal">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-signal" />
          <div>
            <div className="font-heading text-base font-bold text-signal">Checking coverage…</div>
            <div className="text-xs text-ink-soft">Resolving your location against FibreHood deployment data.</div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const meta = statusMeta(result.status);
  const isLive = result.status === DEPLOYMENT_STATUS.LIVE;
  const nearby = result.resolution === RESOLUTION.NEARBY;
  const notFound = result.resolution === RESOLUTION.NOT_FOUND;

  const headline = nearby && isLive ? "FibreHood is available nearby" : meta.headline;
  const body = nearby
    ? "We established coverage close to your location, but not at this exact address yet. Confirm with us and we'll verify the line."
    : meta.body;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-2xl border border-line bg-paper shadow-lift"
    >
      <div className="relative bg-signal px-6 py-5">
        <div className="bg-grid-dark absolute inset-0 opacity-[0.14]" aria-hidden="true" />
        <div className="relative">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", meta.chipClass)}>
            {isLive && !nearby ? <Check className="h-3 w-3" /> : <span className={cn("h-1.5 w-1.5 rounded-full", meta.dotClass)} />}
            {meta.label}
          </span>
          <h3 className="mt-3 font-heading text-xl font-bold tracking-tighter text-paper sm:text-2xl">{headline}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-paper/75">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-loop" />
            <span className="truncate">{result.label}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed text-ink-soft">{body}</p>

        {result.mdu && (
          <p className="mt-3 text-sm text-ink-soft">
            Building readiness: <span className="font-semibold text-signal">{result.mdu.name}</span>
          </p>
        )}

        {result.confidence === CONFIDENCE.LOW && !notFound && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-fog/70 px-3.5 py-3 text-xs leading-relaxed text-ink-soft">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
            <span>
              This is an approximate match{result.area ? ` near ${result.area.name}` : ""}. Confirm your exact address for a more accurate result.
            </span>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onPrimary}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors",
              isLive && !nearby ? "bg-loop text-signal hover:bg-loopsoft" : "bg-signal text-paper hover:bg-signal-deep"
            )}
          >
            {isLive && !nearby ? meta.cta : nearby ? "Register interest" : meta.cta}
            <ArrowRight className="h-4 w-4" />
          </button>

          {isLive && !nearby && (
            <Link
              to="/plans"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:bg-fog"
            >
              View fibre plans
            </Link>
          )}

          <div className="mt-1 flex flex-col gap-2 sm:flex-row">
            <a
              href={isLive ? WA_INTENTS.coverage(result.label) : WA_INTENTS.nearCoverage(result.label)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-4 text-sm font-medium text-ink-soft transition-colors hover:bg-fog"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-4 text-sm font-medium text-ink-soft transition-colors hover:bg-fog"
            >
              <RotateCcw className="h-4 w-4" /> Check another location
            </button>
          </div>
        </div>

        {result.updatedAt && (
          <p className="mt-4 text-[11px] text-ink-soft/80">Coverage data last updated {result.updatedAt}.</p>
        )}
      </div>
    </motion.div>
  );
}

export default CoverageResultPanel;