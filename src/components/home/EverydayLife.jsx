import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import LifePhoto from "@/components/home/LifePhoto";

const EASE = [0.16, 1, 0.3, 1];

const USE_CASES = [
  {
    title: "Stream",
    description: "Enjoy your favourite entertainment without worrying about running out of data.",
    detail: "4K streams in ~25 Mbps"
  },
  {
    title: "Work from home",
    description: "Reliable connectivity for meetings, cloud applications and everyday work.",
    detail: "Crystal-clear calls from ~10 Mbps"
  },
  {
    title: "Game",
    description: "A connection built for demanding online experiences.",
    detail: "Latency measured in milliseconds"
  },
  {
    title: "Stay connected",
    description: "Keep your household connected across phones, laptops, TVs and smart devices.",
    detail: "Dozens of devices, one line"
  }
];

export function EverydayLife() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper">
      <div className="mx-auto grid w-full max-w-[1528px] lg:grid-cols-[52%_48%]">
        <LifePhoto reduce={reduce} />

        {/* ── Ledger column ─────────────────────────────────────── */}
        <div className="flex flex-col border-t border-line/70 bg-paper px-5 py-14 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:py-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              <span className="h-px w-7 bg-loop" aria-hidden="true" />
              What your connection is really for
            </span>
            <h2 className="mt-5 max-w-[540px] font-heading text-4xl font-extrabold leading-[1.04] tracking-tightest text-signal sm:text-5xl lg:text-[3.4rem]">
              Internet that keeps up with your life<span className="text-loop">.</span>
            </h2>
          </motion.div>

          <div className="mt-12 flex flex-1 flex-col border-t border-line/50">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                className="grid flex-1 grid-cols-[auto_1fr] items-center gap-x-5 border-b border-line/50 py-6 sm:gap-x-8"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <span className="display-mono self-start text-3xl font-bold leading-none tracking-tight text-signal/20 sm:text-4xl">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
                      {useCase.title}
                    </h3>
                    <p className="display-mono shrink-0 text-right text-[10px] font-semibold uppercase leading-snug tracking-[0.04em] text-loop">
                      {useCase.detail}
                    </p>
                  </div>
                  <p className="mt-2.5 max-w-[500px] text-sm leading-relaxed text-ink-soft">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EverydayLife;