import React from "react";
import { MapPin, Home, Building2, Landmark, Phone } from "lucide-react";
import { Field, TextInput } from "./FlowField";

export const LOCATION_TYPES = [
  { id: "home", label: "Home", icon: Home },
  { id: "business", label: "Business", icon: Building2 },
  { id: "estate", label: "Estate / Complex", icon: Landmark },
];

export const ORDER_TYPES = [
  { id: "new", label: "New installation" },
  { id: "move", label: "Moving address" },
  { id: "upgrade", label: "Upgrading my line" },
];

/** Step 2 — where the line goes and how it should be installed. */
export function StepInstallation({ install, onChange, location, onChangeAddress }) {
  const set = (k, v) => onChange({ ...install, [k]: v });
  const locationType = install.locationType || "home";
  const orderType = install.orderType || "new";

  return (
    <div>
      <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] font-semibold tracking-tight">
        Where should we install your fibre?
      </h1>
      <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
        A few details about the address and the best way to reach you, so
        we can lock in an installation window.
      </p>

      {/* Address summary */}
      <div className="mt-9 pt-7 border-t border-stone-200 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-[#8A6A0C] mt-0.5 shrink-0" />
          <div>
            <div className="text-[#031630] font-semibold">{location?.label || "Southview, Harare"}</div>
            <div className="text-stone-500 text-sm mt-0.5 font-medium">Installation address</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeAddress}
          className="text-sm text-stone-600 hover:text-[#8A6A0C] transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          Change
        </button>
      </div>

      {/* Location type */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <span className="block text-sm text-stone-800 font-medium mb-3">Location type</span>
        <div className="flex flex-wrap gap-2.5">
          {LOCATION_TYPES.map(({ id, label, icon: Icon }) => {
            const active = locationType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("locationType", id)}
                className={
                  "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all duration-300 cursor-pointer font-medium " +
                  (active
                    ? "border-[#FFCC00] text-[#8A6A0C] bg-[#FFFAE0] shadow-sm"
                    : "border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-900 bg-white")
                }
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Street fields */}
      <div className="mt-8 pt-7 border-t border-stone-200 grid grid-cols-3 gap-x-6 gap-y-8">
        <div className="col-span-1">
          <Field label="Street no.">
            <TextInput
              placeholder="10"
              value={install.streetNumber || ""}
              onChange={(e) => set("streetNumber", e.target.value)}
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Street name">
            <TextInput
              placeholder="Mbovu Road"
              value={install.streetName || ""}
              onChange={(e) => set("streetName", e.target.value)}
            />
          </Field>
        </div>
        <div className="col-span-3">
          <Field label="Name for this address" hint="Optional — helps you recognise it later.">
            <TextInput
              placeholder="Home"
              value={install.customName || ""}
              onChange={(e) => set("customName", e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* Order type */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <span className="block text-sm text-stone-800 font-medium mb-3">Order type</span>
        <div className="flex flex-wrap gap-2.5">
          {ORDER_TYPES.map(({ id, label }) => {
            const active = orderType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("orderType", id)}
                className={
                  "px-4 py-2.5 rounded-full border text-sm transition-all duration-300 cursor-pointer font-medium " +
                  (active
                    ? "border-[#FFCC00] text-[#8A6A0C] bg-[#FFFAE0] shadow-sm"
                    : "border-stone-300 text-stone-700 hover:border-stone-500 hover:text-stone-900 bg-white")
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact numbers */}
      <div className="mt-8 pt-7 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <Field label="Contact number for installation">
          <div className="flex items-center gap-2.5">
            <Phone size={15} className="text-stone-500 shrink-0" />
            <TextInput
              placeholder="077 000 0000"
              value={install.phone || ""}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Alternate number" hint="Optional">
          <TextInput
            placeholder="077 000 0000"
            value={install.altPhone || ""}
            onChange={(e) => set("altPhone", e.target.value)}
          />
        </Field>
      </div>

      {/* Access notes */}
      <div className="mt-8 pt-7 border-t border-stone-200">
        <Field
          label="Access notes"
          hint="Gate codes, best times, anything our technician should know."
        >
          <textarea
            rows={2}
            value={install.notes || ""}
            onChange={(e) => set("notes", e.target.value)}
            className="w-full bg-transparent border-0 border-b border-stone-400 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FFCC00] transition-colors duration-300 resize-none text-sm"
            placeholder="Optional"
          />
        </Field>
      </div>
    </div>
  );
}

export default StepInstallation;