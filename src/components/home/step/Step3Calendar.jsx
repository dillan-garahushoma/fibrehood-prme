import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  format,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["08:00", "10:00", "12:00", "14:00"];

/**
 * Installation scheduler — Linear-style "blended" visual.
 * A crisp, elevated calendar card floats in focus (bottom-left) while a dimmed
 * periphery (a ghosted time-slot panel + soft grid) dissolves into the section,
 * mirroring the focus-vs-periphery treatment of CoverageMapDemo and Step2Plans.
 */
export function Step3Calendar() {
  const reduce = useReducedMotion();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [startDate, setStartDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 }),
  });

  const handleDateClick = (day) => {
    if (!startDate || isBefore(day, startDate)) {
      setStartDate(day);
    } else if (isSameDay(day, startDate)) {
      setStartDate(null);
    } else {
      setStartDate(day);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── Periphery: faint grid + ghosted time-slot panel, dissolved at edges ── */}
      <div
        className="absolute inset-0 bg-grid opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 85%)",
        }}
      />
      {/* Ghosted time-slot panel peeking from the right */}
      <div className="absolute -right-8 top-6 w-[42%] rotate-[4deg] rounded-2xl border border-line bg-card/40 p-4 opacity-40 blur-[1px]">
        <div className="mb-3 h-3 w-20 rounded-full bg-ink-soft/20" />
        <div className="space-y-2">
          {SLOTS.map((s) => (
            <div key={s} className="flex items-center gap-2 rounded-lg border border-line/60 bg-paper/40 px-2.5 py-2">
              <Clock className="h-3 w-3 text-ink-soft/40" strokeWidth={2} />
              <span className="text-[11px] text-ink-soft/50">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-tr from-paper via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* ── Focus: crisp installation scheduler card ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-3 -left-3 w-[94%] max-w-md rounded-2xl border border-line bg-card p-5 shadow-lift sm:w-[88%] sm:p-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/10">
            <Calendar className="h-4 w-4 text-signal" strokeWidth={1.8} />
          </span>
          <div>
            <h4 className="font-heading text-sm font-bold text-signal sm:text-base">Pick a day</h4>
            <p className="text-[11px] text-ink-soft">Installation windows, next available</p>
          </div>
        </div>

        {/* Month nav */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-fog"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <motion.span
            key={format(currentMonth, "MMMM yyyy")}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-heading text-xs font-semibold text-signal"
          >
            {format(currentMonth, "MMMM yyyy")}
          </motion.span>
          <button
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-fog"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="mt-3 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-[9px] font-semibold uppercase tracking-wide text-ink-soft/50">
              {d.slice(0, 1)}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="mt-1 grid grid-cols-7 gap-1">
          {days.map((day) => {
            const isSelected = startDate && isSameDay(day, startDate);
            const isToday = isSameDay(day, new Date());
            const inMonth = isSameMonth(day, currentMonth);

            return (
              <motion.button
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium transition-colors sm:h-8 sm:w-8 ${
                  !inMonth ? "text-ink-soft/30" : "text-ink-soft"
                } ${isToday && !isSelected ? "text-signal font-bold" : ""} ${
                  isSelected ? "bg-signal text-paper font-bold" : "hover:bg-fog"
                }`}
              >
                {format(day, "d")}
              </motion.button>
            );
          })}
        </div>

        {/* Time slots */}
        <div className="mt-4 border-t border-line pt-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-soft">
            <Clock className="h-3 w-3" strokeWidth={2} />
            Available times
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {SLOTS.map((slot, i) => {
              const isTaken = i === 1;
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  disabled={isTaken}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center justify-center gap-1 rounded-lg border px-1 py-2 text-[11px] font-medium transition-colors ${
                    isTaken
                      ? "cursor-not-allowed border-line/40 bg-paper/50 text-ink-soft/30 line-through"
                      : isSelected
                        ? "border-signal bg-signal text-paper"
                        : "border-line bg-paper text-ink-soft hover:border-signal/40 hover:text-signal"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        {startDate && selectedSlot && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-signal/5 px-3.5 py-2.5">
            <span className="text-[11px] font-medium text-ink-soft">
              {format(startDate, "EEE, MMM d")} · {selectedSlot}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-signal px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-paper">
              Confirmed
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Step3Calendar;