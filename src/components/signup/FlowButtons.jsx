import React from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared Back / Continue footer for every step in a flow. */
export function FlowFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
  backLabel = "Back",
  nextDisabled,
  busy,
  note
}) {
  return (
    <div className="flex items-center justify-between w-full">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft size={16} />
          {backLabel}
        </button>
      ) : (
        <span className="text-xs text-stone-400">{note || ""}</span>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || busy}
        className={cn(
          "px-7 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer ml-auto",
          busy && "opacity-80"
        )}
        style={{ boxShadow: "0 12px 30px -10px rgba(28,25,20,0.45)" }}
      >
        {busy && <Loader2 size={15} className="animate-spin" />}
        {nextLabel}
      </button>
    </div>
  );
}

export default FlowFooter;