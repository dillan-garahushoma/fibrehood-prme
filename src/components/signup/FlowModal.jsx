import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Focused signup surface: Signal-Navy header with a SECURE SIGNUP eyebrow and a
 * slim hairline stepper, Paper body, sticky footer actions. Full-bleed on
 * mobile, a centred panel on desktop.
 */
export function FlowModal({ open, title, eyebrow = "Secure signup", steps = [], current = 0, onClose, footer, children }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-stretch justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-signal/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative flex max-h-full w-full flex-col overflow-hidden bg-paper shadow-lift sm:max-w-3xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="relative shrink-0 bg-signal px-6 pb-6 pt-5 sm:px-8">
              <div className="bg-grid-dark absolute inset-0 opacity-[0.14]" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-loop">
                    <span className="h-px w-5 bg-loop/70" />
                    {eyebrow}
                  </span>
                  <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tighter text-paper sm:text-3xl">{title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {steps.length > 1 && (
                <div className="relative mt-6 flex items-center gap-2">
                  {steps.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div
                        className={cn(
                          "h-px w-full transition-colors duration-500",
                          i < current ? "bg-loop" : i === current ? "bg-loop" : "bg-paper/20"
                        )}
                      />
                      <span
                        className={cn(
                          "mt-2 block truncate text-[10px] font-medium uppercase tracking-[0.14em] transition-colors",
                          i === current ? "text-loop" : "text-paper/40"
                        )}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 sm:px-8">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="shrink-0 border-t border-line bg-fog/60 px-6 py-4 sm:px-8">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FlowModal;