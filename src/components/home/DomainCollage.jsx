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

const AUTO_MS = 5500;

export function DomainCollage({ images }) {
  const [focus, setFocus] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timerRef = useRef(null);

  const onTap = useCallback((i) => {
    setPaused(true);
    setFocus(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), AUTO_MS * 2);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setFocus((p) => (p + 1) % DOMAINS.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const focusDomain = DOMAINS[focus];
  const focusImg = images?.[focusDomain.id];
  const quiet = DOMAINS.map((d, i) => ({ d, i })).filter(({ i }) => i !== focus);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ───────── MOBILE (unchanged stack) ───────── */}
      <div className="md:hidden">
        {/* Large focus image with crossfade */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focusDomain.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
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

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/55 via-signal/5 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
              <div className="flex items-center gap-3 text-paper">
                <span className="font-mono text-xs font-semibold tracking-widest opacity-80">
                  {focusDomain.index}
                </span>
                <span className="h-px w-8 bg-paper/40" />
                <span className="font-heading text-lg font-semibold sm:text-xl">
                  {focusDomain.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-4 grid grid-cols-3 gap-3 sm:mt-5 sm:gap-4">
          {DOMAINS.map((d, i) => {
            const img = images?.[d.id];
            const isActive = i === focus;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onTap(i)}
                aria-label={d.label}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-fog text-left transition-all",
                  isActive
                    ? "border-loop ring-2 ring-loop/50 shadow-loop"
                    : "border-line opacity-75 hover:opacity-100"
                )}
              >
                <div className="relative aspect-[4/3] w-full">
                  {img && (
                    <Image
                      src={img}
                      alt={d.label}
                      fittingType="fill"
                      className="h-full w-full"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/55 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-2.5 sm:p-3.5">
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-paper/80 sm:text-xs">
                      {d.index}
                    </span>
                    <span className="font-heading text-xs font-semibold leading-tight text-paper sm:text-sm">
                      {d.label}
                    </span>
                  </div>
                  {isActive && !reduce && (
                    <motion.span
                      key={`${focus}-${paused ? "p" : "r"}`}
                      className="absolute bottom-0 left-0 h-[3px] bg-loop"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "0%" : "100%" }}
                      transition={{
                        duration: paused ? 0.3 : AUTO_MS / 1000,
                        ease: "linear"
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Description */}
        <div className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={focusDomain.id}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
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
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-signal sm:text-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ───────── DESKTOP — Asymmetric Frame Split ───────── */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2.05fr)] md:gap-8 md:rounded-[1.75rem] md:border md:border-line md:bg-paper md:p-9 md:shadow-lift lg:gap-12 lg:p-12 md:overflow-hidden">
        {/* Editorial column */}
        <aside className="relative flex flex-col justify-between py-1 pl-6 md:pl-8">
          <span className="absolute left-0 top-0 h-full w-2 bg-loop" />
          <div>
            <div className="flex items-center gap-3 font-mono text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-px w-8 bg-loop" />
              What fibre unlocks
            </div>
            <h2 className="mt-7 max-w-[340px] font-serif text-[2.6rem] leading-[1.04] tracking-[-0.045em] text-signal lg:text-[3.05rem]">
              For the places that run on being connected.
            </h2>
            <p className="mt-7 max-w-[330px] text-[15px] leading-relaxed text-ink-soft lg:text-base">
              Reliable fibre isn't a faster number on a speed test for a business — it's
              payments that never miss, calls that never drop, and teams that stay in sync.
              Here's what fibre unlocks where professionals and businesses work.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs font-semibold tracking-[0.12em] text-ink-soft">
            <span className="block h-px w-12 bg-loop" />
            01 — 03
          </div>
        </aside>

        {/* Mosaic */}
        <div>
          {/* Image row */}
          <div className="grid grid-cols-12 gap-5">
            {/* Focus frame */}
            <button
              type="button"
              onClick={() => onTap(focus)}
              aria-label={focusDomain.label}
              className="group relative col-span-7 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-fog text-left shadow-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-loop focus-visible:outline-offset-2"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={focusDomain.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/70 via-signal/5 to-transparent" />
              {/* Loop Yellow laser trace */}
              {!reduce && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-loop"
                  style={{ originX: 0 }}
                  animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
                />
              )}
              <div className="absolute inset-x-6 bottom-5 flex items-center gap-3 text-paper">
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-paper/80">
                  {focusDomain.index}
                </span>
                <span className="font-serif text-[28px] font-semibold leading-tight">
                  {focusDomain.label}
                </span>
              </div>
            </button>

            {/* Quiet offset cards */}
            <div className="col-span-5 grid grid-rows-2 gap-5">
              {quiet.map(({ d, i }) => {
                const img = images?.[d.id];
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onTap(i)}
                    aria-label={d.label}
                    className="group relative h-full overflow-hidden rounded-2xl border border-line bg-fog text-left opacity-85 shadow-signal transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-loop focus-visible:outline-offset-2"
                  >
                    <div className="absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025] group-hover:[filter:saturate(1.08)]">
                      {img && (
                        <Image
                          src={img}
                          alt={d.label}
                          fittingType="fill"
                          className="h-full w-full"
                        />
                      )}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/70 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 text-paper">
                      <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-paper/80">
                        {d.index}
                      </span>
                      <span className="font-serif text-[17px] font-semibold leading-tight">
                        {d.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details panel */}
          <div className="mt-5 rounded-2xl border border-line bg-card p-6 shadow-signal lg:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focusDomain.id}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-serif text-2xl font-medium text-signal lg:text-3xl">
                  {focusDomain.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft lg:text-base">
                  {focusDomain.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {focusDomain.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-signal"
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
    </div>
  );
}

export default DomainCollage;