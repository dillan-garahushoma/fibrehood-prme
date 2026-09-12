import React from "react";
import { getPlan, formatSpeed } from "@/data/plans";

const ORDER_LABELS = {
  new: "New installation",
  new_installation: "New installation",
  move: "Moving address",
  upgrade: "Upgrading my line",
  migration: "Migrate existing line"
};

const LOCATION_LABELS = {
  home: "Home",
  business: "Business",
  estate: "Estate / Complex"
};

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-stone-200 py-3 last:border-b-0">
      <span className="text-sm text-stone-600 font-medium">{label}</span>
      <span className="text-right text-sm font-semibold text-[#031630]">{value}</span>
    </div>
  );
}

/** Final step — everything the customer is about to submit, plus consent. */
export function StepReview({ data, location, consent, onConsentChange }) {
  const plan = getPlan(data.planId);
  const street = [data.install.streetNumber, data.install.streetName].filter(Boolean).join(" ");
  const propertyType = LOCATION_LABELS[data.install.locationType] || data.install.locationType;
  const orderLabel = ORDER_LABELS[data.install.orderType] || data.install.orderType;

  return (
    <div>
      <h1 className="text-3xl sm:text-[2rem] leading-tight text-[#031630] font-semibold">
        Review & confirm
      </h1>
      <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
        Take a moment to check your installation details before we lock in your request.
      </p>

      {/* Package Summary Card */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <span className="block text-sm text-stone-800 font-medium mb-3">Selected package</span>
        <div className="rounded-2xl border border-stone-300 bg-stone-50/80 p-5">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-[#031630]">{plan?.name}</div>
            <span className="rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold px-2.5 py-0.5">
              {plan?.usageLabel}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-[#031630]">${plan?.price}</span>
            <span className="text-xs text-stone-500 font-medium">/{plan?.cycle}</span>
          </div>
          <div className="mt-2 text-xs sm:text-sm text-stone-700 font-medium">
            {plan ? `${formatSpeed(plan.download)} download · ${formatSpeed(plan.upload)} upload` : null}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            {plan?.contract} · {plan?.installation}
          </div>
        </div>
      </div>

      {/* Installation Summary */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <span className="block text-sm text-stone-800 font-medium mb-2">Installation details</span>
        <div className="divide-y divide-stone-200">
          <Row label="Location" value={location?.label} />
          <Row label="Address" value={street} />
          <Row label="Property" value={propertyType} />
          <Row label="Order type" value={orderLabel} />
          <Row label="Contact" value={data.install.phone} />
          {data.install.altPhone && <Row label="Alternate number" value={data.install.altPhone} />}
          {data.account.email && <Row label="Account" value={data.account.email} />}
        </div>
      </div>

      {/* Terms consent */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => onConsentChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-400 accent-amber-500 text-amber-500 focus:ring-amber-400"
          />
          <span className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
            I agree to be contacted about this installation and accept Fibrehood's{" "}
            <a href="/terms" target="_blank" className="font-semibold text-[#031630] hover:text-amber-700 underline transition-colors">
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