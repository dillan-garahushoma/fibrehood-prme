import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WA_INTENTS } from "@/data/site";

/**
 * Floating WhatsApp action — single consolidated entry point.
 * Mobile: round yellow bubble. Desktop: navy pill with icon + text.
 * "Speak to an advisor" replaces the old "architect" language.
 */
export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

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
        aria-label="Speak to a Fibrehood advisor on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-loop text-signal shadow-lift"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WA_INTENTS.connect()}
          target="_blank"
          rel="noreferrer"
          aria-label="Speak to a Fibrehood advisor on WhatsApp"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center rounded-full sm:gap-2 sm:bg-signal sm:py-2.5 sm:pl-2.5 sm:pr-5 sm:shadow-lift"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-loop text-signal shadow-lift sm:h-8 sm:w-8 sm:shadow-none">
            <span className="absolute inset-0 rounded-full bg-loop/60 animate-signal-pulse" />
            <MessageCircle className="relative h-6 w-5 sm:h-5 sm:w-5" />
          </span>
          <span className="hidden text-sm font-medium text-paper sm:inline">
            Speak to an advisor
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppFloat;