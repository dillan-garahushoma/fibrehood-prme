import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export const DOMAINS = [
  {
    id: "corporate",
    label: "Corporate offices",
    image: null, // injected by Lifestyle via IMAGES
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
  },
  {
    id: "industrial",
    label: "Industrial",
    title: "Industrial",
    body: "Real-time machine telemetry, automated production lines, sensor and camera networks across the floor, and large data transfers off-site without contention or downtime.",
    points: ["Machine telemetry", "Sensor networks", "Bulk data transfer"]
  }
];

const AUTO_MS = 5500;

export function DomainSwitcher({ images, className }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timerRef = useRef(null);

  const go = useCallback((i) => setActive((i + DOMAINS.length) % DOMAINS.length), []);

  // Auto-advance, pauses on hover/tap
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % DOMAINS.length);
    }, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const domain = DOMAINS[active];
  const img = images?.[domain.id];

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image stage with crossfade */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={domain.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {img ? (
                <Image
                  src={img}
                  alt={domain.title}
                  fittingType="fill"
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full bg-signal" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Tone + legibility wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/85 via-signal/25 to-transparent" />

          {/* Text overlay — changes with the domain */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={domain.id}
                className="max-w-xl"
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-heading text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                  {domain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/85 sm:text-base">
                  {domain.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {domain.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-loop/40 bg-loop/15 px-3 py-1 text-xs font-semibold text-loop"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
        {DOMAINS.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setPaused(true);
                go(i);
                // resume auto-advance after a short pause
                setTimeout(() => setPaused(false), AUTO_MS * 1.5);
              }}
              className={cn(
                "glass-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all sm:text-sm",
                isActive
                  ? "border-signal bg-signal text-paper shadow-signal"
                  : "border-line bg-paper/70 text-ink-soft hover:border-signal/40 hover:text-signal"
              )}
            >
              {d.label}
              {isActive && (
                <motion.span
                  layoutId="domain-dot"
                  className="h-1.5 w-1.5 rounded-full bg-loop"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DomainSwitcher;