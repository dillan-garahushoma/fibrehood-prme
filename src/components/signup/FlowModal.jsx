import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Focused signup surface following the warm stone & amber editorial design.
 * Features ambient radial lighting, Fraunces serif typography, and a minimalist hairline stepper.
 */
export function FlowModal({
  open,
  steps = [],
  current = 0,
  onClose,
  footer,
  children
}) {
  const reduce = useReducedMotion();
  const bodyRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const resetScroll = () => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = 0;
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };
    resetScroll();
    const frame1 = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 180);
    const t3 = setTimeout(resetScroll, 380);
    return () => {
      cancelAnimationFrame(frame1);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [current, open]);

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
        <div ref={containerRef} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Ambient warm backdrop */}
          <motion.div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 900px 500px at 15% 0%, rgba(255,204,0,0.18), transparent 60%)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="ff-sans relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto z-10"
            style={{ boxShadow: "0 30px 80px -25px rgba(87,66,30,0.35)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 sm:px-12 pt-6 shrink-0">
              <div className="flex items-center">
                <img src="/images/logo-black.png" alt="Fibrehood" className="h-[120px] w-auto object-contain -my-10 scale-110 origin-left opacity-90" />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-stone-500 hover:text-stone-900 transition-colors p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper */}
            {steps.length > 1 && (
              <div className="px-8 sm:px-12 mt-8 shrink-0">
                <div className="flex items-center">
                  {steps.map((step, i) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <span
                          className={
                            "block w-1.5 h-1.5 rounded-full transition-colors duration-300 " +
                            (i <= current ? "bg-[#FFCC00]" : "bg-stone-400")
                          }
                        />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-px mx-1.5 bg-stone-300 relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-[#FFCC00] transition-all duration-500"
                            style={{ width: i < current ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-between mt-2.5">
                  {steps.map((step, i) => (
                    <span
                      key={step}
                      className={
                        "text-xs transition-colors duration-300 " +
                        (i === current
                          ? "text-[#FFCC00] font-semibold"
                          : i < current
                          ? "text-stone-700 font-medium"
                          : "text-stone-400 font-medium")
                      }
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Body */}
            <div ref={bodyRef} className="px-8 sm:px-12 py-8 sm:py-10 flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-8 sm:px-12 py-6 sm:py-7 border-t border-stone-200 shrink-0 bg-white">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default FlowModal;