import React from "react";
import { Field, TextInput } from "./FlowField";

/** Contact-details step — name + email (phone is collected with the install
 *  details). Replaces the former account/verify steps now that auth is gone. */
export function StepContact({ account, errors = {}, onChange }) {
  const set = (k, v) => onChange({ ...account, [k]: v });

  return (
    <div>
      <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] font-semibold tracking-tight">
        Your contact details
      </h1>
      <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
        Tell us who to contact about your installation. We'll only use these details to arrange your connection.
      </p>

      <div className="mt-8 pt-7 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <Field label="First name" required error={errors.firstName}>
          <TextInput
            autoComplete="given-name"
            placeholder="Tendai"
            value={account.firstName || ""}
            invalid={!!errors.firstName} onChange={(e) => set("firstName", e.target.value)}
          />
        </Field>
        <Field label="Last name" required error={errors.lastName}>
          <TextInput
            autoComplete="family-name"
            placeholder="Moyo"
            value={account.lastName || ""}
            invalid={!!errors.lastName} onChange={(e) => set("lastName", e.target.value)}
          />
        </Field>
        <div className="col-span-full">
          <Field label="Email address" required error={errors.email}>
            <TextInput
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={account.email || ""}
              invalid={!!errors.email} onChange={(e) => set("email", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

export default StepContact;