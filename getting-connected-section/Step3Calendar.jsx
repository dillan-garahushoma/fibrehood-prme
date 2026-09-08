import React, { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const WINDOWS = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00"];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function Step3Calendar({ active = true }) {
  const reduce = useReducedMotion();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [installationDate, setInstallationDate] = useState(null);
  const [installationWindow, setInstallationWindow] = useState(WINDOWS[1]);
  const [updates, setUpdates] = useState(true);
  const [requested, setRequested] = useState(false);

  const days = useMemo(
    () => eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
    }),
    [currentMonth],
  );

  const selectDate = (day) => {
    setInstallationDate(day);
    setRequested(false);
  };

  const clearSelection = () => {
    setInstallationDate(null);
    setInstallationWindow(WINDOWS[1]);
    setUpdates(true);
    setRequested(false);
  };

  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at 65% 25%, rgba(255,204,0,0.22), transparent 24%), radial-gradient(circle at 20% 80%, rgba(7,34,72,0.12), transparent 33%)",
          maskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 35%, transparent 94%)",
          WebkitMaskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 35%, transparent 94%)",
        }}
      />

      <motion.section
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-3 top-3 bottom-3 flex flex-col rounded-2xl border border-white/70 bg-paper/75 p-3.5 shadow-[0_20px_58px_rgba(7,34,72,0.12)] backdrop-blur-xl sm:inset-x-5 sm:top-5 sm:bottom-5 sm:p-5"
      >
        <header className="flex items-center gap-3 border-b border-line/70 pb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-loop/20 text-signal">
            <CalendarDays className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h4 className="font-heading text-sm font-bold tracking-tight text-signal sm:text-base">Schedule installation</h4>
            <p className="truncate text-[10px] text-ink-soft sm:text-xs">Pick a day and arrival window that works for you.</p>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_118px] gap-3 py-3 sm:grid-cols-[minmax(0,1fr)_150px] sm:gap-5 sm:py-4">
          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentMonth((month) => subMonths(month, 1))}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-signal/5 hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop sm:h-8 sm:w-8"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <p className="font-heading text-xs font-semibold text-signal sm:text-sm">{format(currentMonth, "MMMM yyyy")}</p>
              <button
                type="button"
                onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-signal/5 hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop sm:h-8 sm:w-8"
                aria-label="Next month"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-7 text-center">
              {WEEKDAYS.map((weekday, index) => (
                <span key={`${weekday}-${index}`} className="text-[8px] font-semibold text-ink-soft/60 sm:text-[9px]">{weekday}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-0.5">
              {days.map((day) => {
                const selected = installationDate && isSameDay(day, installationDate);
                const today = isSameDay(day, new Date());
                const inMonth = isSameMonth(day, currentMonth);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => selectDate(day)}
                    aria-pressed={Boolean(selected)}
                    className={cn(
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-loop sm:h-8 sm:w-8 sm:text-xs",
                      !inMonth && "text-ink-soft/25",
                      inMonth && !selected && "text-signal hover:bg-signal/5",
                      today && !selected && "text-loop",
                      selected && "bg-loop font-bold text-signal",
                    )}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col border-l border-line/70 pl-3 sm:pl-5">
            <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-ink-soft">Installation date</p>
            <p className="mt-1.5 min-h-8 text-[10px] font-semibold leading-tight text-signal sm:text-xs">
              {installationDate ? format(installationDate, "EEE, d MMM") : "Choose a day"}
            </p>

            <label htmlFor="journey-arrival-window" className="mt-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-ink-soft">Arrival window</label>
            <div className="relative mt-1.5">
              <Clock className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-loop" aria-hidden="true" />
              <select
                id="journey-arrival-window"
                value={installationWindow}
                onChange={(event) => {
                  setInstallationWindow(event.target.value);
                  setRequested(false);
                }}
                className="h-7 w-full appearance-none border border-line/80 bg-white/60 pl-6 pr-1 text-[9px] font-semibold text-signal outline-none focus:border-loop focus:ring-1 focus:ring-loop/30 sm:h-8 sm:text-[10px]"
              >
                {WINDOWS.map((window) => <option key={window} value={window}>{window}</option>)}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setUpdates((value) => !value);
                setRequested(false);
              }}
              className="mt-3 flex items-center justify-between gap-1 text-left text-[9px] font-semibold text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
              aria-pressed={updates}
            >
              <span className="inline-flex items-center gap-1"><Bell className="h-3 w-3 text-loop" aria-hidden="true" /> Updates</span>
              <span className={`relative h-4 w-7 rounded-full transition-colors ${updates ? "bg-loop" : "bg-line"}`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${updates ? "translate-x-3.5" : "translate-x-0.5"}`} />
              </span>
            </button>
          </div>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-line/70 pt-3">
          <p aria-live="polite" className="min-w-0 truncate text-[9px] text-ink-soft sm:text-[10px]">
            {requested && installationDate
              ? `Request sent for ${format(installationDate, "d MMM")} · ${installationWindow}`
              : installationDate
                ? `Ready for ${format(installationDate, "d MMM")}`
                : "Select an installation day"}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={clearSelection} className="text-[10px] font-semibold text-ink-soft transition-colors hover:text-signal">Clear</button>
            <button
              type="button"
              disabled={!installationDate}
              onClick={() => setRequested(true)}
              className="inline-flex h-7 items-center gap-1 rounded-lg bg-loop px-2.5 text-[10px] font-bold text-signal transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45 sm:h-8 sm:px-3"
            >
              <Check className="h-3 w-3" strokeWidth={2.8} aria-hidden="true" /> Request
            </button>
          </div>
        </footer>
      </motion.section>
    </div>
  );
}

export default Step3Calendar;
