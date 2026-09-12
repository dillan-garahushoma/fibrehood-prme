import React from "react";
import { Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

/** Step 4 — confirm the email address with the code the platform just sent. */
export function StepVerify({ email, code, onCodeChange, onResend, resent }) {
  return (
    <div className="mx-auto max-w-md text-center py-4">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-amber-600">
        <Mail className="h-5 w-5" />
      </span>
      <h1 className="ff-serif text-3xl sm:text-[2rem] leading-tight text-stone-900 mt-5">
        Confirm your email
      </h1>
      <p className="text-stone-500 mt-3 text-[15px] leading-relaxed">
        We sent a six-digit verification code to <span className="font-medium text-stone-900">{email}</span>.
      </p>

      <div className="mt-8 flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={onCodeChange} autoFocus autoComplete="one-time-code">
          <InputOTPGroup className="gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-11 h-12 rounded-xl border border-stone-300 text-stone-900 text-lg font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="mt-6 text-sm text-stone-500">
        {resent ? (
          <span className="text-amber-700 font-medium">A new code is on its way.</span>
        ) : (
          <>
            Didn't get it?{" "}
            <button
              type="button"
              onClick={onResend}
              className="font-medium text-amber-600 hover:text-amber-700 transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              Resend code
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default StepVerify;