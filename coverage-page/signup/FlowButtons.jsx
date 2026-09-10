import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared Back / Continue footer for every step in a flow. */
export function FlowFooter({ onBack, onNext, nextLabel = "Continue", backLabel = "Back", nextDisabled, busy, tone = "signal", note }) {
  return (
    <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 text-sm font-semibold text-ink-soft transition-colors hover:bg-fog disabled:opacity-60"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </button>
      ) : (
        <span className="hidden text-xs text-ink-soft sm:block">{note}</span>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || busy}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors disabled:opacity-50",
          tone === "loop"
            ? "bg-loop text-signal hover:bg-loopsoft"
            : "bg-signal text-paper hover:bg-signal-deep"
        )}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {nextLabel}
        {!busy && <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default FlowFooter;