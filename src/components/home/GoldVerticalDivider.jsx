import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * GoldVerticalDivider
 * Elegant vertical gold line with ambient gentle glow and a flowing vertical beam animation,
 * providing a polished transition between sections.
 */
export function GoldVerticalDivider({ className = "" }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative flex flex-col items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Top Anchor: Subtle horizontal hairline & diamond pip */}
      <div className="flex items-center justify-center">
        <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-amber-400/30 to-amber-400/60" />
        <div className="mx-1 h-1.5 w-1.5 rotate-45 rounded-[1px] border border-amber-400/70 bg-amber-400/25 shadow-[0_0_8px_rgba(255,204,0,0.5)]" />
        <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-amber-400/30 to-amber-400/60" />
      </div>

      {/* Vertical Line Track Container */}
      <div className="relative my-0.5 flex h-20 sm:h-24 w-8 items-center justify-center">
        {/* Soft Ambient Golden Glow Aura */}
        <motion.div
          className="absolute inset-x-0 h-full w-full rounded-full bg-gradient-to-b from-amber-400/20 via-yellow-400/30 to-amber-500/20 blur-md"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.4, 0.75, 0.4],
                  scaleX: [0.85, 1.15, 0.85],
                  scaleY: [0.95, 1.05, 0.95],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />

        {/* Secondary Wider Subtle Ambient Glow */}
        <div className="absolute inset-0 h-full w-full rounded-full bg-amber-400/10 blur-xl" />

        {/* Base Static Gold Line Track */}
        <div className="relative h-full w-[2px] overflow-hidden rounded-full bg-gradient-to-b from-amber-400/30 via-amber-400/50 to-amber-400/30 shadow-[0_0_6px_rgba(255,204,0,0.3)]">
          {/* Vertically Animating Light Beam (Fibre-optic stream) */}
          <motion.div
            className="absolute left-0 right-0 w-full rounded-full"
            style={{
              height: "45%",
              background:
                "linear-gradient(to bottom, transparent, #FFE066 35%, #FFCC00 65%, #F59E0B 95%, transparent)",
              filter:
                "drop-shadow(0 0 6px rgba(255, 204, 0, 0.9)) drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))",
            }}
            animate={
              reduce
                ? undefined
                : {
                    top: ["-45%", "105%"],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.25, 1],
                  }
            }
          />

          {/* Leading Luminous Photon Core */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white"
            style={{
              boxShadow:
                "0 0 6px 1.5px rgba(255, 224, 102, 1), 0 0 14px 3px rgba(245, 158, 11, 0.8)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    top: ["-10%", "98%"],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.25, 1],
                  }
            }
          />
        </div>
      </div>

      {/* Bottom Anchor: Subtle horizontal hairline & diamond pip */}
      <div className="flex items-center justify-center">
        <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-amber-400/30 to-amber-400/60" />
        <div className="mx-1 h-1.5 w-1.5 rotate-45 rounded-[1px] border border-amber-400/70 bg-amber-400/25 shadow-[0_0_8px_rgba(255,204,0,0.5)]" />
        <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-amber-400/30 to-amber-400/60" />
      </div>
    </div>
  );
}

export default GoldVerticalDivider;
