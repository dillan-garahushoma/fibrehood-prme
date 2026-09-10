import React from "react";
import { MapPin } from "lucide-react";
import { FlowField, fieldClass } from "./FlowField";

const LOCATION_TYPES = [
  "Freestanding home",
  "Townhouse / cluster",
  "Apartment / complex",
  "Business premises"
];

/** Step 2 — where the line goes and how it should be installed. */
export function StepInstallation({ install, onChange, location, onChangeAddress }) {
  const set = (k, v) => onChange({ ...install, [k]: v });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Line location */}
      <div>
        <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Line location</h3>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-line bg-fog/60 p-3.5">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal text-loop">
            <MapPin className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-signal">{location?.label}</div>
            <button type="button" onClick={onChangeAddress} className="mt-0.5 text-xs font-semibold text-loop underline-offset-2 hover:underline">
              Change address
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <FlowField label="Location type" required>
            <select className={fieldClass} value={install.locationType} onChange={(e) => set("locationType", e.target.value)}>
              <option value="">Please select…</option>
              {LOCATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FlowField>
          <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
            <FlowField label="Street no." required>
              <input className={fieldClass} value={install.streetNumber} onChange={(e) => set("streetNumber", e.target.value)} placeholder="10" />
            </FlowField>
            <FlowField label="Street name" required>
              <input className={fieldClass} value={install.streetName} onChange={(e) => set("streetName", e.target.value)} placeholder="Mbovu Road" />
            </FlowField>
          </div>
          <FlowField label="Name for this address" hint="Optional — helps you recognise it later.">
            <input className={fieldClass} value={install.customName} onChange={(e) => set("customName", e.target.value)} placeholder="Home" />
          </FlowField>
        </div>
      </div>

      {/* Installation details */}
      <div className="lg:border-l lg:border-line lg:pl-8">
        <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Installation details</h3>

        <div className="mt-4 space-y-4">
          <FlowField label="Order type" required>
            <select className={fieldClass} value={install.orderType} onChange={(e) => set("orderType", e.target.value)}>
              <option value="">Please select…</option>
              <option value="new_installation">New installation</option>
              <option value="migration">Migrate / transfer my existing fibre line</option>
            </select>
          </FlowField>
          <FlowField label="Contact number for installation" required>
            <input className={fieldClass} value={install.phone} onChange={(e) => set("phone", e.target.value)} placeholder="077 000 0000" />
          </FlowField>
          <FlowField label="Alternate contact number">
            <input className={fieldClass} value={install.altPhone} onChange={(e) => set("altPhone", e.target.value)} placeholder="Optional" />
          </FlowField>
          <FlowField label="Access notes" hint="Gate codes, best times, anything our technician should know.">
            <textarea
              value={install.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={`${fieldClass} h-auto min-h-[88px] py-2.5`}
              placeholder="Optional"
            />
          </FlowField>
        </div>
      </div>
    </div>
  );
}

export default StepInstallation;