import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const DOMAINS = [
  {
    id: "corporate",
    label: "Corporate offices",
    index: "01",
    title: "Corporate offices",
    body: "Symmetric uploads for big file transfers, crystal-clear video calls, cloud apps that never stall, and hosted voice for the whole office team — fibre keeps the work moving in every direction at once.",
    points: ["Symmetric uploads", "Cloud & VoIP", "No-call-drop video"]
  },
  {
    id: "retail",
    label: "Retail & POS",
    index: "02",
    title: "Retail & POS",
    body: "Always-on card payments, live inventory synced across every branch, in-store Wi-Fi that keeps shoppers happy, and digital signage that updates the moment a promotion changes.",
    points: ["Always-on payments", "Branch inventory sync", "Digital signage"]
  },
  {
    id: "hospitality",
    label: "Hospitality",
    index: "03",
    title: "Hospitality",
    body: "Guest Wi-Fi that simply works, in-room streaming and casting, table-side payments and online bookings, and a connected kitchen that never bottlenecks at peak service.",
    points: ["Guest Wi-Fi", "Table-side POS", "In-room streaming"]
  }
];

const AUTO_MS = 6000;

export function DomainCollage({ images }) {
  const [focus, setFocus] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  const order = DOMAINS.map((_, i) => i).sort((a, b) => {
    if (a === focus) return -1;
    if (b === focus) return 1;
    return a - b;
  });
  const focusDomain = DOMAINS[focus];
  const focusImg = images?.[focusDomain.id];

  // Auto-advance with progress
  useEffect(() => {
    if (paused) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(1, elapsed / AUTO_MS);
      setProgress(pct);
      if (pct >= 1) {
        setFocus((p) => (p + 1) % DOMAINS.length);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [paused, focus]);

  const onTap = useCallback((i) => {
    setPaused(true);
    setFocus(i);
    setProgress(0);
    const t = setTimeout(() => setPaused(false), AUTO_MS * 2.5);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ============================================================
          DESKTOP / LAPTOP — editorial magazine collage
         ============================================================ */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-6">
          {/* Left rail: focus panel (dominant) */}
          <div className="col-span-7">
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <div className="relative aspect-[5/4] w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={focusDomain.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

              {/* Top-left signal tag */}
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-signal/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-loop" />
                Now showing
              </span>

              {/* Bottom gradient + index */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-signal/70 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-end gap-3">
                <span className="display-mono font-heading text-5xl font-bold leading-none text-loop">
                  {focusDomain.index}
                </span>
                <div className="pb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/70">
                    Domain
                  </p>
                  <p className="font-heading text-lg font-bold text-paper">
                    {focusDomain.label}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/20">
                <div
                  className="h-full bg-loop transition-[width] duration-75 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right rail: description + two stacked panels */}
          <div className="col-span-5 flex flex-col gap-6">
            {/* Description card */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focusDomain.id}
                initial={{ opacity: 0, x: reduce ? 0 : 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-1 rounded-2xl border border-line bg-paper p-6 shadow-signal"
              >
                {/* Accent corner */}
                <span className="absolute right-5 top-5 h-10 w-10 rounded-full bg-loop/15" />
                <span className="absolute right-5 top-5 h-10 w-10 rounded-full bg-loop/15 animate-signal-pulse" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  What fibre unlocks
                </p>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-signal">
                  {focusDomain.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {focusDomain.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {focusDomain.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-signal/15 bg-signal/5 px-3 py-1 text-xs font-semibold text-signal"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Two smaller stacked panels */}
            <div className="grid grid-cols-2 gap-5">
              {order.slice(1).map((idx) => {
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
                    aria-label={`Promote ${d.label} to focus`}
                  >
                    <div className="relative aspect-[4/5] w-full">
                      {img && (
                        <Image
                          src={img}
                          alt={d.title}
                          fittingType="fill"
                          className="h-full w-full"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/70 via-signal/10 to-transparent" />
                      <span className="absolute left-3 top-3 display-mono text-[11px] font-bold text-paper/80">
                        {d.index}
                      </span>
                      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                        <span className="font-heading text-sm font-bold text-paper">
                          {d.label}
                        </span>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-loop text-signal opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110">
                          <PromoteIcon />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Domain selector rail beneath */}
        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {DOMAINS.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onTap(i)}
                className={cn(
                  "group relative overflow-hidden rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  i === focus
                    ? "bg-signal text-paper"
                    : "border border-line bg-paper text-ink-soft hover:border-signal/40 hover:text-signal"
                )}
              >
                <span className="display-mono mr-2 text-[10px] opacity-60">{d.index}</span>
                {d.label}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft xl:flex">
            <span className={cn("h-1.5 w-1.5 rounded-full", paused ? "bg-loop" : "bg-signal/40")} />
            {paused ? "Paused" : "Auto-playing"}
          </div>
        </div>
      </div>

      {/* ============================================================
          TABLET (sm–lg) — focus + stacked side panels
         ============================================================ */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-5 lg:hidden">
        <motion.div
          layout
          className="group relative col-span-3 overflow-hidden rounded-[1.5rem] border border-line shadow-lift"
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-signal/70 to-transparent" />
          <span className="absolute bottom-4 left-4 display-mono font-heading text-3xl font-bold text-loop">
            {focusDomain.index}
          </span>
        </motion.div>

        <div className="col-span-2 grid grid-rows-2 gap-5">
          {order.slice(1).map((idx) => {
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
                aria-label={`Promote ${d.label} to focus`}
              >
                <div className="relative h-full w-full">
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

      {/* ============================================================
          MOBILE — focus panel + thumbnail row
         ============================================================ */}
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-signal/70 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-end gap-2">
            <span className="display-mono font-heading text-3xl font-bold leading-none text-loop">
              {focusDomain.index}
            </span>
            <span className="pb-1 font-heading text-sm font-bold text-paper">
              {focusDomain.label}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/20">
            <div
              className="h-full bg-loop transition-[width] duration-75 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
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

      {/* ============================================================
          Description — tablet & mobile (below collage)
         ============================================================ */}
      <div className="mt-7 lg:hidden">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default DomainCollage;