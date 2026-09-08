import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

function buildDays() {
  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => addDays(today, i));
}

const SLOTS = [
  { time: "08:00", available: true },
  { time: "10:00", available: false },
  { time: "12:00", available: true },
  { time: "14:00", available: true },
  { time: "16:00", available: true },
];

export function SchedulerDemo() {
  const reduce = useReducedMotion();
  const days = buildDays();
  const [selectedDay, setSelectedDay] = useState(days[2]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlot = (slot) => {
    if (!slot.available) return;
    // Clicking the reserved slot again clears it; picking another swaps
    setSelectedSlot((prev) => (prev && prev.time === slot.time ? null : slot));
  };

  return (
    <div className="glass-panel flex h-full w-full flex-col rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/10">
          <Calendar className="h-4 w-4 text-signal" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-sm font-bold text-signal">Pick an installation slot</p>
          <p className="text-[11px] text-ink-soft">Same-week appointments available</p>
        </div>
      </div>

      {/* Day picker */}
      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {days.map((day) => {
          const selected = isSameDay(day, selectedDay);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => {
                setSelectedDay(day);
                setSelectedSlot(null);
              }}
              className={cn(
                "focus-ring rounded-lg px-1 py-2 text-center transition-colors",
                selected
                  ? "bg-signal text-paper shadow-signal"
                  : "bg-signal/5 text-ink-soft hover:bg-signal/10"
              )}
            >
              <span className="block text-[10px] font-semibold uppercase">
                {format(day, "EEE")}
              </span>
              <span className="mt-0.5 block text-sm font-bold">{format(day, "d")}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        {SLOTS.map((slot) => {
          const selected = selectedSlot?.time === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => handleSlot(slot)}
              className={cn(
                "focus-ring flex items-center justify-center gap-1 rounded-lg px-1 py-2 text-[11px] font-medium transition-colors",
                !slot.available && "cursor-not-allowed bg-signal/5 text-ink-soft/30 line-through",
                slot.available && !selected && "bg-signal/5 text-ink-soft hover:bg-signal/10",
                selected && "bg-loop text-signal shadow-loop"
              )}
            >
              <Clock className="h-3 w-3" strokeWidth={2} />
              {slot.time}
            </button>
          );
        })}
      </div>

      {/* Confirmation state — mirrors a real "type and get a response" pattern */}
      <div className="mt-3 min-h-[28px]">
        <AnimatePresence mode="wait">
          {selectedSlot ? (
            <motion.div
              key="reserved"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-2 rounded-lg border border-loop/30 bg-loop/10 px-3 py-2"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-loop">
                <Check className="h-3 w-3 text-signal" strokeWidth={3} />
              </span>
              <span className="text-xs font-semibold text-signal">Slot reserved</span>
              <span className="text-[11px] text-ink-soft">
                {format(selectedDay, "EEE d")} · {selectedSlot.time}
              </span>
              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                className="focus-ring ml-auto text-[10px] font-medium text-ink-soft underline-offset-2 hover:underline"
              >
                Change
              </button>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-1 text-[11px] text-ink-soft"
            >
              Select a time slot to reserve your installation.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SchedulerDemo;