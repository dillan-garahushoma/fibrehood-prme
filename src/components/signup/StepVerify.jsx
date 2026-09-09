import React from "react";
import { Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

/** Step 4 — confirm the email address with the code the platform just sent. */
export function StepVerify({ email, code, onCodeChange, onResend, resent }) {
  return (
    <div className="mx-auto max-w-md text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-signal text-loop">
        <Mail className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-heading text-xl font-bold text-signal">Confirm your email</h3>
      <p className="mt-2 text-sm text-ink-soft">
        We sent a six-digit code to <span className="font-semibold text-signal">{email}</span>.
      </p>

      <div className="mt-6 flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={onCodeChange} autoFocus autoComplete="one-time-code">
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        {resent ? (
          <span className="text-signal">A new code is on its way.</span>
        ) : (
          <>
            Didn't get it?{" "}
            <button type="button" onClick={onResend} className="font-semibold text-loop underline-offset-2 hover:underline">
              Resend the code
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default StepVerify;