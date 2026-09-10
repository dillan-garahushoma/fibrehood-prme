import React from "react";
import { Check } from "lucide-react";
import { WA_INTENTS } from "@/data/site";

/** Shared confirmation state for both the install request and interest flows. */
export function FlowDone({ title, body, reference, next = [], onClose, waLabel = "Talk to us on WhatsApp", waHref }) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-loop text-signal">
        <Check className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-heading text-2xl font-bold tracking-tighter text-signal">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>

      {reference && (
        <div className="mt-6 inline-flex flex-col items-center rounded-xl border border-line bg-fog/70 px-6 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">Your reference</span>
          <span className="display-mono mt-1 text-xl font-semibold text-signal">{reference}</span>
        </div>
      )}

      {next.length > 0 && (
        <ul className="mt-7 space-y-2.5 text-left">
          {next.map((item, i) => (
            <li key={item} className="flex items-start gap-3 border-b border-line pb-2.5 last:border-b-0">
              <span className="display-mono mt-0.5 text-xs text-loop">0{i + 1}</span>
              <span className="text-sm text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-signal px-6 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
        >
          Done
        </button>
        <a
          href={waHref || WA_INTENTS.connect()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-paper px-6 text-sm font-semibold text-ink transition-colors hover:bg-fog"
        >
          {waLabel}
        </a>
      </div>
    </div>
  );
}

export default FlowDone;