import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Field({ label, required, hint, error, className, children }) {
  return (
    <label className={cn("block", className)}>
      <span className={cn("block text-sm mb-2", error ? "text-red-700" : "text-stone-500")}>
        {label}
        {required && <span className="text-[#FFCC00] font-medium ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-stone-400 mt-1.5">{hint}</span>}
      {error && <span className="block mt-1.5 text-xs font-medium text-red-700">{error}</span>}
    </label>
  );
}

export function TextInput({ invalid, className, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        cn(
          "w-full bg-transparent border-0 border-b py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none transition-colors duration-300 text-sm",
          invalid ? "border-red-600 focus:border-red-600" : "border-stone-300 focus:border-[#FFCC00]"
        ),
        className
      )}
    />
  );
}

export const FlowField = Field;

export const fieldClass =
  "w-full bg-transparent border-0 border-b border-stone-300 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FFCC00] transition-colors duration-300 text-sm";

export function FlowError({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!children) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    ref.current?.focus({ preventScroll: true });
  }, [children]);

  if (!children) return null;
  return (
    <div ref={ref} role="alert" tabIndex={-1} className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 outline-none focus:ring-2 focus:ring-red-300">
      {children}
    </div>
  );
}

export default Field;