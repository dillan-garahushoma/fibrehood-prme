import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { FlowField, fieldClass } from "./FlowField";

/** Step 3 — create the FibreHood account that will own this connection. */
export function StepAccount({ account, onChange }) {
  const set = (k, v) => onChange({ ...account, [k]: v });

  return (
    <div>
      <div className="flex items-start gap-3 rounded-xl border border-line bg-fog/60 p-3.5">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
        <p className="text-xs leading-relaxed text-ink-soft">
          Your account is where you'll track this installation, manage billing and reach support.{" "}
          <Link to="/login" className="font-semibold text-loop underline-offset-2 hover:underline">
            Already have an account? Log in
          </Link>
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Personal information</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FlowField label="First name" required>
              <input className={fieldClass} value={account.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Tendai" />
            </FlowField>
            <FlowField label="Last name" required>
              <input className={fieldClass} value={account.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Moyo" />
            </FlowField>
          </div>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-8">
          <h3 className="font-heading text-sm font-bold uppercase tracking-[0.14em] text-signal">Sign-in details</h3>
          <div className="mt-4 space-y-4">
            <FlowField label="Email address" required>
              <input
                type="email"
                autoComplete="email"
                className={fieldClass}
                value={account.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
              />
            </FlowField>
            <FlowField label="Password" required hint="At least 8 characters.">
              <input
                type="password"
                autoComplete="new-password"
                className={fieldClass}
                value={account.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="••••••••"
              />
            </FlowField>
            <FlowField label="Confirm password" required>
              <input
                type="password"
                autoComplete="new-password"
                className={fieldClass}
                value={account.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                placeholder="••••••••"
              />
            </FlowField>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepAccount;