import React from "react";

export function EveryPlanIncludes({ items }) {
  if (!items?.length) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 rounded-2xl bg-fog px-5 py-4">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2 text-sm text-ink-soft">
          <item.icon className="h-4 w-4 shrink-0 text-signal" strokeWidth={1.75} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export default EveryPlanIncludes;
