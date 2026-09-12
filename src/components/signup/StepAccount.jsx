import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Field, TextInput } from "./FlowField";

/** Step 3 — create the FibreHood account that will own this connection. */
export function StepAccount({ account, onChange }) {
  const set = (k, v) => onChange({ ...account, [k]: v });

  return (
    <div>
      <h1 className="text-3xl sm:text-[2rem] leading-tight text-[#031630] font-semibold">
        Create your account
      </h1>
      <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
        Set up your login details so you can track your installation progress and manage your line.
      </p>

      {/* Account notice */}
      <div className="mt-9 pt-7 border-t border-stone-200 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <div className="text-[#031630] text-sm font-semibold">Already have an account?</div>
            <div className="text-stone-500 text-xs mt-0.5 font-medium">Log in to link this installation to your profile.</div>
          </div>
        </div>
        <Link
          to="/login"
          className="text-sm text-stone-600 hover:text-amber-700 font-medium transition-colors whitespace-nowrap"
        >
          Log in
        </Link>
      </div>

      {/* Personal Info */}
      <div className="mt-8 pt-7 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <Field label="First name" required>
          <TextInput
            autoComplete="given-name"
            placeholder="Tendai"
            value={account.firstName || ""}
            onChange={(e) => set("firstName", e.target.value)}
          />
        </Field>
        <Field label="Last name" required>
          <TextInput
            autoComplete="family-name"
            placeholder="Moyo"
            value={account.lastName || ""}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </Field>
      </div>

      {/* Sign-in credentials */}
      <div className="mt-8 pt-7 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
        <div className="col-span-full">
          <Field label="Email address" required>
            <TextInput
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={account.email || ""}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Password" required hint="At least 8 characters.">
          <TextInput
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={account.password || ""}
            onChange={(e) => set("password", e.target.value)}
          />
        </Field>
        <Field label="Confirm password" required>
          <TextInput
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={account.confirm || ""}
            onChange={(e) => set("confirm", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

export default StepAccount;