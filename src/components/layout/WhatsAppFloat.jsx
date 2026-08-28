import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { WA_INTENTS } from "@/data/site";

/**
 * Floating WhatsApp action. Appears after a short scroll. Includes a subtle
 * pulse and a dismissible hint. Hidden when reduced-motion is requested.
 */
export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  if (reduce) {
    return (
      <a
        href={WA_INTENTS.connect()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with FibreHood on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-loop text-signal shadow-lift"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3"
        >
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative hidden items-center gap-2 rounded-full bg-signal px-4 py-2.5 text-sm font-medium text-paper shadow-lift sm:flex"
              >
                Speak to a human architect now
                <button
                  onClick={() => setHint(false)}
                  aria-label="Dismiss"
                  className="text-paper/60 hover:text-paper"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={WA_INTENTS.connect()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with FibreHood on WhatsApp"
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-loop text-signal shadow-lift transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-loop/60 animate-signal-pulse" />
            <MessageCircle className="relative h-6 w-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppFloat;