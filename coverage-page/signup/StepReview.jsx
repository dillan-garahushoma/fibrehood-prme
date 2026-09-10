import React from "react";
import { getPlan, formatSpeed } from "@/data/plans";

const ORDER_LABELS = {
  new_installation: "New installation",
  migration: "Migrate existing fibre line"
};

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-2.5 last:border-b-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <span className="text-right text-sm font-medium text-signal">{value}</span>
    </div>
  );
}

/** Final step — everything the customer is about to submit, plus consent. */
export function StepReview({ data, location, consent, onConsentChange }) {
  const plan = getPlan(data.planId);
  const street = [data.install.streetNumber, data.install.streetName].filter(Boolean).join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Your package</h3>
        <div className="mt-4 rounded-2xl border border-loop/60 bg-signal p-5 text-paper">
          <div className="font-heading text-lg font-bold">{plan?.name}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.14em] text-loop">{plan?.usageLabel}</div>
          <div className="mt-4 display-mono text-3xl font-semibold">
            ${plan?.price}
            <span className="ml-1 text-xs font-normal text-paper/60">/{plan?.cycle}</span>
          </div>
          <div className="mt-3 text-sm text-paper/75">
            {plan ? `${formatSpeed(plan.download)} down · ${formatSpeed(plan.upload)} up` : null}
          </div>
          <div className="mt-1 text-xs text-paper/60">
            {plan?.contract} · {plan?.installation}
          </div>
        </div>
      </div>

      <div className="lg:border-l lg:border-line lg:pl-8">
        <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Installation</h3>
        <div className="mt-3">
          <Row label="Location" value={location?.label} />
          <Row label="Address" value={street} />
          <Row label="Property" value={data.install.locationType} />
          <Row label="Order" value={ORDER_LABELS[data.install.orderType]} />
          <Row label="Contact" value={data.install.phone} />
          <Row label="Account" value={data.account.email} />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-fog/60 p-3.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => onConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[#072248]"
          />
          <span className="text-xs leading-relaxed text-ink-soft">
            I'd like FibreHood to contact me about this installation and I accept the{" "}
            <a href="/terms" className="font-semibold text-loop underline-offset-2 hover:underline">
              terms of service
            </a>
            .
          </span>
        </label>
      </div>
    </div>
  );
}

export default StepReview;