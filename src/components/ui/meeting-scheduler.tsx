import * as React from "react";
import { useState } from "react";
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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const WINDOWS = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface InstallationSchedulerProps {
  className?: string;
  onRequest?: (details: { date: Date; window: string; updates: boolean }) => void;
}

/**
 * A full scheduling surface for the connection journey. It intentionally owns
 * the interaction state: the homepage demonstrates a request flow and does
 * not claim to reserve an installation slot in the backend.
 */
export function MeetingScheduler({ className, onRequest }: InstallationSchedulerProps) {
  const reduce = useReducedMotion();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [installationDate, setInstallationDate] = useState<Date | null>(null);
  const [installationWindow, setInstallationWindow] = useState(WINDOWS[1]);
  const [updates, setUpdates] = useState(true);
  const [requested, setRequested] = useState(false);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
  });

  const chooseDate = (day: Date) => {
    setInstallationDate(day);
    setRequested(false);
  };

  const clearSelection = () => {
    setInstallationDate(null);
    setInstallationWindow(WINDOWS[1]);
    setUpdates(true);
    setRequested(false);
  };

  const requestInstallation = () => {
    if (!installationDate) return;
    setRequested(true);
    onRequest?.({ date: installationDate, window: installationWindow, updates });
  };

  return (
    <section
      className={cn(
        "relative h-full w-full overflow-y-auto bg-paper/78 p-5 text-ink backdrop-blur-2xl sm:p-7",
        className,
      )}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0, black 38px, black calc(100% - 38px), transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 38px, black calc(100% - 38px), transparent 100%)",
      }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex min-h-full max-w-4xl flex-col"
      >
        <header className="flex items-start gap-3 border-b border-line/80 pb-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-loop/15 text-loop">
            <CalendarDays className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <h4 className="font-heading text-lg font-bold tracking-tight text-signal sm:text-xl">Schedule installation</h4>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft sm:text-sm">Choose a day and arrival window that works for your home.</p>
          </div>
        </header>

        <div className="grid flex-1 gap-7 py-6 md:grid-cols-[1.16fr_0.84fr] md:gap-9">
          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <Button type="button" variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} aria-label="Previous month" className="h-11 w-11 rounded-full text-ink-soft hover:bg-signal/5 hover:text-signal">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <AnimatePresence mode="wait">
                <motion.p
                  key={format(currentMonth, "MMMM yyyy")}
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="font-heading text-base font-semibold text-signal"
                >
                  {format(currentMonth, "MMMM yyyy")}
                </motion.p>
              </AnimatePresence>
              <Button type="button" variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} aria-label="Next month" className="h-11 w-11 rounded-full text-ink-soft hover:bg-signal/5 hover:text-signal">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-7 text-center">
              {WEEKDAYS.map((day) => <span key={day} className="py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft/70">{day}</span>)}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-y-1">
              {days.map((day) => {
                const selected = installationDate && isSameDay(day, installationDate);
                const current = isSameDay(day, new Date());
                const inMonth = isSameMonth(day, currentMonth);
                return (
                  <button
                    type="button"
                    key={day.toISOString()}
                    onClick={() => chooseDate(day)}
                    aria-pressed={Boolean(selected)}
                    className={cn(
                      "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop sm:h-10 sm:w-10",
                      !inMonth && "text-ink-soft/30",
                      inMonth && !selected && "text-signal hover:bg-signal/5",
                      current && !selected && "text-loop",
                      selected && "bg-loop font-bold text-signal",
                    )}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col border-t border-line/80 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="space-y-5">
              <div>
                <Label htmlFor="installation-date" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">Installation date</Label>
                <div id="installation-date" className="mt-2 flex min-h-12 items-center justify-between border border-line/80 bg-white/65 px-3.5 text-sm">
                  <span className={installationDate ? "font-semibold text-signal" : "text-ink-soft"}>{installationDate ? format(installationDate, "EEEE, d MMMM") : "Choose a day"}</span>
                  <CalendarDays className="h-4 w-4 text-loop" aria-hidden="true" />
                </div>
              </div>

              <div>
                <Label htmlFor="installation-window" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">Arrival window</Label>
                <div className="relative mt-2">
                  <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-loop" aria-hidden="true" />
                  <select
                    id="installation-window"
                    value={installationWindow}
                    onChange={(event) => { setInstallationWindow(event.target.value); setRequested(false); }}
                    className="h-12 w-full appearance-none border border-line/80 bg-white/65 pl-10 pr-3.5 text-sm font-semibold text-signal outline-none transition-colors focus:border-loop focus:ring-2 focus:ring-loop/20"
                  >
                    {WINDOWS.map((window) => <option key={window} value={window} className="bg-card text-signal">{window}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-y border-line/80 py-4">
                <div>
                  <Label htmlFor="installation-updates" className="text-sm font-semibold text-signal">Keep me updated</Label>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">We’ll send a confirmation and arrival update.</p>
                </div>
                <Switch id="installation-updates" checked={updates} onCheckedChange={(value) => { setUpdates(value); setRequested(false); }} className="data-[state=checked]:bg-loop data-[state=unchecked]:bg-line" />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <p aria-live="polite" className="min-h-10 text-xs leading-relaxed text-ink-soft">
                {requested && installationDate
                  ? `Request received for ${format(installationDate, "d MMMM")} · ${installationWindow}. We’ll confirm availability with you.`
                  : installationDate
                    ? `Installation request: ${format(installationDate, "d MMMM")} · ${installationWindow}.`
                    : "Select an installation day to continue."}
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={clearSelection} className="rounded-none px-3 text-ink-soft hover:bg-signal/5 hover:text-signal">Clear</Button>
                <Button type="button" onClick={requestInstallation} disabled={!installationDate} className="rounded-none bg-loop px-4 font-semibold text-signal hover:bg-loopsoft">Request installation</Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default MeetingScheduler;
