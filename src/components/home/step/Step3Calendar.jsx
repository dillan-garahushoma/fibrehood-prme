import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";
import { Calendar, Clock } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["8:00", "10:00", "12:00", "14:00"];

export function Step3Calendar() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line">
      <Image
        src={IMAGES.inHomeJoy}
        alt="A family at home, preparing for fibre installation"
        fittingType="fill"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/80 via-signal-deep/20 to-transparent" />

      <motion.div
        className="absolute bottom-4 left-4 right-4 rounded-2xl border border-paper/15 bg-signal-deep/70 p-4 backdrop-blur-xl"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 text-paper">
          <Calendar className="h-4 w-4 text-loop" strokeWidth={1.6} />
          <span className="text-sm font-semibold">Pick an installation slot</span>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={`rounded-lg px-1 py-2 text-center text-[11px] font-medium transition-colors ${
                i === 2 ? "bg-loop text-signal" : "bg-paper/10 text-paper/70"
              }`}
            >
              {day}
              <span className="mt-0.5 block text-[10px] opacity-60">{15 + i}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {SLOTS.map((slot, i) => (
            <div
              key={slot}
              className={`flex items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-[11px] ${
                i === 1
                  ? "bg-paper/5 text-paper/30 line-through"
                  : "bg-paper/10 text-paper/70"
              }`}
            >
              <Clock className="h-2.5 w-2.5" strokeWidth={2} />
              {slot}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Step3Calendar;