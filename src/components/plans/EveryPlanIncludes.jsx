import React from "react";

export function EveryPlanIncludes({ items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-6 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h3 className="w-full text-xs font-bold uppercase tracking-[0.16em] text-signal sm:w-auto sm:border-r sm:border-line sm:pr-4">
          Every plan includes
        </h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-3">
          {items.map((item) => (
            <li key={item.label} className="inline-flex min-h-8 items-center gap-2 text-sm font-medium text-ink-soft">
              <item.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-signal" strokeWidth={1.75} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EveryPlanIncludes;
