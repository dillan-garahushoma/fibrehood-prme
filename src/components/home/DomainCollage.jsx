import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const DOMAINS = [
  {
    id: "corporate",
    label: "Corporate offices",
    image: null, // injected via props
    title: "Corporate offices",
    body: "Symmetric uploads for big file transfers, crystal-clear video calls, cloud apps that never stall, and hosted voice for the whole office team — fibre keeps the work moving in every direction at once.",
    points: ["Symmetric uploads", "Cloud & VoIP", "No-call-drop video"]
  },
  {
    id: "retail",
    label: "Retail & POS",
    title: "Retail & POS",
    body: "Always-on card payments, live inventory synced across every branch, in-store Wi-Fi that keeps shoppers happy, and digital signage that updates the moment a promotion changes.",
    points: ["Always-on payments", "Branch inventory sync", "Digital signage"]
  },
  {
    id: "hospitality",
    label: "Hospitality",
    title: "Hospitality",
    body: "Guest Wi-Fi that simply works, in-room streaming and casting, table-side payments and online bookings, and a connected kitchen that never bottlenecks at peak service.",
    points: ["Guest Wi-Fi", "Table-side POS", "In-room streaming"]
  }
];

const AUTO_MS = 5500;

export function DomainCollage({ images }) {
  const [focus, setFocus] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timerRef = useRef(null);

  const promote = useCallback((i) => setFocus(i), []);

  // Auto-advance, pausing on hover/tap
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setFocus((p) => (p + 1) % DOMAINS.length);
    }, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const onTap = (i) => {
    setPaused(true);
    promote(i);
    // resume auto-advance after a generous pause
    setTimeout(() => setPaused(false), AUTO_MS * 2);
  };

  // Order panels: focused first, then the rest in stable order
  const order = DOMAINS.map((_, i) => i).sort((a, b) => {
    if (a === focus) return -1;
    if (b === focus) return 1;
    return a - b;
  });
  const focusDomain = DOMAINS[focus];
  const focusImg = images?.[focusDomain.id];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop / tablet: large focus panel + two stacked smaller panels */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-5">
        {/* Focus panel */}
        <motion.button
          type="button"
          layout
          onClick={() => onTap(focus)}
          className="group relative col-span-3 overflow-hidden rounded-[1.75rem] border border-line shadow-lift"
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focusDomain.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {focusImg && (
                  <Image
                    src={focusImg}
                    alt={focusDomain.title}
                    fittingType="fill"
                    className="h-full w-full"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-signal/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-loop" />
            Focus
          </span>
        </motion.button>

        {/* Two smaller stacked panels */}
        <div className="col-span-2 grid grid-rows-2 gap-5">
          {order.slice(1).map((idx, slot) => {
            const d = DOMAINS[idx];
            const img = images?.[d.id];
            return (
              <motion.button
                key={d.id}
                type="button"
                layout
                onClick={() => onTap(idx)}
                className="group relative overflow-hidden rounded-2xl border border-line shadow-signal"
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-full">
                  {img && (
                    <Image
                      src={img}
                      alt={d.title}
                      fittingType="fill"
                      className="h-full w-full"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/55 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-1 text-[11px] font-semibold text-signal backdrop-blur">
                    {d.label}
                  </span>
                  <span className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-loop text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    <PromoteIcon />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile: single focus panel + thumbnail row */}
      <div className="sm:hidden">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line shadow-lift">
          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focusDomain.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {focusImg && (
                  <Image
                    src={focusImg}
                    alt={focusDomain.title}
                    fittingType="fill"
                    className="h-full w-full"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          {DOMAINS.map((d, i) => {
            const img = images?.[d.id];
            const isActive = i === focus;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onTap(i)}
                className={cn(
                  "relative h-16 flex-1 overflow-hidden rounded-xl border transition-all",
                  isActive ? "border-loop ring-2 ring-loop/50" : "border-line opacity-70"
                )}
              >
                {img && (
                  <Image src={img} alt={d.label} fittingType="fill" className="h-full w-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description — floats beside the focus panel, never overlaid on images */}
      <div className="mt-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={focusDomain.id}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h3 className="font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
              {focusDomain.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
              {focusDomain.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {focusDomain.points.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-signal"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PromoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default DomainCollage;