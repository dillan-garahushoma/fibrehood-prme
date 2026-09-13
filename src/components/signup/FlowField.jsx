import React from "react";
import { cn } from "@/lib/utils";

export function Field({ label, required, hint, className, children }) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-sm text-stone-500 mb-2">
        {label}
        {required && <span className="text-[#8A6A0C] font-medium ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-stone-400 mt-1.5">{hint}</span>}
    </label>
  );
}

export function TextInput({ className, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-transparent border-0 border-b border-stone-300 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FFCC00] transition-colors duration-300 text-sm",
        className
      )}
    />
  );
}

export const FlowField = Field;

export const fieldClass =
  "w-full bg-transparent border-0 border-b border-stone-300 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FFCC00] transition-colors duration-300 text-sm";

export function FlowError({ children }) {
  if (!children) return null;
  return (
    <div className="mb-6 rounded-xl border border-[#FFCC00]/40 bg-[#FFFAE0] px-4 py-3 text-sm text-[#8A6A0C]">
      {children}
    </div>
  );
}

export default Field;