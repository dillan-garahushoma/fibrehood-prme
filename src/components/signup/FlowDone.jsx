import React from "react";
import { Check } from "lucide-react";
import { WA_INTENTS } from "@/data/site";

/** Shared confirmation state for both the install request and interest flows. */
export function FlowDone({ title, body, reference, next = [], onClose, waLabel = "Talk to us on WhatsApp", waHref }) {
  return (
    <div className="mx-auto max-w-lg text-center py-4">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFFAE0] border border-[#FFCC00]/40 text-[#FFCC00]">
        <Check className="h-7 w-7" />
      </span>
      <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] mt-5 font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{body}</p>

      {reference && (
        <div className="mt-6 inline-flex flex-col items-center rounded-2xl border border-stone-300 bg-stone-50/80 px-7 py-4">
          <span className="text-xs font-semibold tracking-wide text-stone-500 uppercase">Your reference</span>
          <span className="mt-1 text-xl font-semibold text-[#031630] tracking-wider font-mono">{reference}</span>
        </div>
      )}

      {next.length > 0 && (
        <ul className="mt-8 space-y-3 text-left">
          {next.map((item, i) => (
            <li key={item} className="flex items-start gap-3 border-b border-stone-200 pb-3 last:border-b-0">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFCC00]/15 text-[11px] font-semibold text-[#FFCC00]">
                0{i + 1}
              </span>
              <span className="text-sm text-stone-700 font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onClose}
          className="px-7 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          style={{ boxShadow: "0 12px 30px -10px rgba(28,25,20,0.45)" }}
        >
          Done
        </button>
        <a
          href={waHref || WA_INTENTS.connect()}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:border-stone-400 hover:bg-stone-50 transition-all duration-300 inline-flex items-center justify-center"
        >
          {waLabel}
        </a>
      </div>
    </div>
  );
}

export default FlowDone;