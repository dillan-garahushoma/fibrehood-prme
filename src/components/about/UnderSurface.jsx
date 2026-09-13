import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Network, Construction, Server, Building2, Home, UserCheck } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

const FLOW = [
  { label: "Street network", icon: Network, copy: "High-capacity fibre runs through the streets of your neighbourhood." },
  { label: "Access build", icon: Construction, copy: "We bring the fibre from the street right to your building." },
  { label: "Distribution point", icon: Server, copy: "A central point distributes the signal cleanly within the building." },
  { label: "Building", icon: Building2, copy: "Your building is connected to the wider FibreHood network." },
  { label: "Individual unit", icon: Home, copy: "Fibre reaches your door — your unit is ready to go live." },
  { label: "Customer", icon: UserCheck, copy: "You're connected. Pick a plan and get online in minutes." },
];

const SUPPORT = [
  ["Built for today", "Fast fibre connectivity."],
  ["Designed for tomorrow", "Infrastructure capable of supporting future ICT services."],
  ["Made to scale", "A shared network designed to support multiple services and providers."],
];

const EASE = [0.16, 1, 0.3, 1];

/**
 * "Under the Surface" — an interactive horizontal stepper. One large stage
 * panel advances through the six FLOW stages (click the nodes), each with a
 * micro-illustration and label, joined by an animated fibre progress line.
 * Replaces the previous static flat step + supporting cards.
 */
export function UnderSurface() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stage = FLOW[active];
  const Icon = stage.icon;
  const progress = FLOW.length > 1 ? (active / (FLOW.length - 1)) * 100 : 0;

  return (
    <section id="network" className="relative overflow-hidden bg-signal-deep py-28 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#FFCC00_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
            <span className="h-px w-8 bg-loop" /> Under The Surface
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display max-w-2xl text-3xl leading-[1.15] text-paper sm:text-5xl">
            A lot goes into making &ldquo;connected&rdquo; feel effortless.
          </h2>
        </Reveal>

        {/* Stage panel */}
        <Reveal delay={0.15} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-paper/10 bg-gradient-to-br from-signal/50 to-signal-deep/30 p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-loop/30 bg-signal-deep/60">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Icon className="h-10 w-10 text-loop" strokeWidth={1.5} />
                  </motion.span>
                </AnimatePresence>
              </div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-loop/80">
                      Stage {String(active + 1).padStart(2, "0")} / {String(FLOW.length).padStart(2, "0")}
                    </p>
                    <h4 className="mt-2 font-display text-3xl font-semibold text-paper sm:text-4xl">{stage.label}</h4>
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-paper/70">{stage.copy}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Progress stepper */}
        <div className="mt-12">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper/10" />
            <div
              className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-loop transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="relative flex items-center justify-between">
              {FLOW.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center"
                  aria-label={s.label}
                  aria-current={i === active}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300",
                      i <= active
                        ? "border-loop bg-loop"
                        : "border-paper/30 bg-signal-deep group-hover:border-paper/60"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-start justify-between gap-2 overflow-x-auto scrollbar-none">
            {FLOW.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className={cn(
                  "min-w-[80px] flex-1 text-center text-[11px] font-medium uppercase tracking-wider transition-colors",
                  i === active ? "text-loop" : "text-paper/40 hover:text-paper/70"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary strip */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {SUPPORT.map(([title, copy], i) => (
            <Reveal key={title} delay={0.1 + i * 0.1}>
              <div className="h-full rounded-2xl border border-loop/20 bg-gradient-to-b from-signal/50 to-signal-deep/30 p-7">
                <h4 className="font-display mb-3 text-lg text-loop">{title}</h4>
                <p className="text-sm leading-relaxed text-paper/75">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UnderSurface;