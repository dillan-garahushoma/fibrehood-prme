import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, MessageCircle, MapPin, RotateCcw, Info } from "lucide-react";
import { DEPLOYMENT_STATUS, RESOLUTION, CONFIDENCE, statusMeta } from "@/data/coverageStatus";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

/** A calm paper panel: one status sentence, one primary action, quiet links. */
export function CoverageResultPanel({ checking, result, onPrimary, onReset }) {
  if (checking) {
    return (
      <div className="rounded-xl border border-line bg-paper p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-ink-soft" />
          <div>
            <div className="font-heading text-base font-bold text-ink">Checking coverage…</div>
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-line bg-paper"
    >
      <div className="border-b border-line px-6 py-5">
        <div className="flex items-center gap-2">
          <span className={cn("inline-block h-2 w-2 rounded-full", meta.dotClass)} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">{meta.label}</span>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-bold tracking-tighter text-ink sm:text-[1.7rem]">{headline}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{result.label}</span>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed text-ink-soft">{body}</p>

        {result.mdu && (
          <p className="mt-3 text-sm text-ink-soft">
            Building readiness: <span className="font-semibold text-ink">{result.mdu.name}</span>
          </p>
        )}

        {result.confidence === CONFIDENCE.LOW && !notFound && (
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-line bg-fog/60 px-3.5 py-3 text-xs leading-relaxed text-ink-soft">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-soft" />
            <span>
              This is an approximate match{result.area ? ` near ${result.area.name}` : ""}. Confirm your exact address for a more accurate result.
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={onPrimary}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-signal"
        >
          {isLive && !nearby ? "Get connected" : nearby ? "Register interest" : meta.cta}
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Quiet secondary actions — text links, not a button stack */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-ink-soft">
          {isLive && !nearby && (
            <Link to="/plans" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
              View fibre plans
            </Link>
          )}
          <a
            href={isLive ? WA_INTENTS.coverage(result.label) : WA_INTENTS.nearCoverage(result.label)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp us
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Check another
          </button>
        </div>

        {result.updatedAt && (
          <p className="mt-5 text-center text-[11px] text-ink-soft/80">Coverage data last updated {result.updatedAt}.</p>
        )}
      </div>
    </motion.div>
  );
}

export default CoverageResultPanel;