import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

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
        {/* ── Photo panel — anchored to the section's full height ── */}
        <div className="relative overflow-hidden lg:h-full">
          <motion.div
            className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[680px] lg:h-full"
            initial={reduce ? false : { opacity: 0.7, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <Image
              src={IMAGES.lifeEvening}
              alt="A household at ease in the evening — TV glowing, laptop open, a video call in the background."
              fittingType="fill"
              className="h-full w-full"
            />
          </motion.div>

          {/* Caption strip over the photo — ties both columns together */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-signal/90 via-signal/45 to-transparent pt-28">
            <div className="flex flex-col gap-3 px-6 pb-10 sm:px-10 lg:gap-4 lg:px-14 lg:pb-14">
              <span className="h-0.5 w-10 bg-loop" aria-hidden="true" />
              <p className="font-heading text-base font-semibold tracking-tight text-paper lg:text-lg">
                One connection. Everything on it.
              </p>
              <p className="flex items-center gap-2.5 text-sm leading-snug text-paper/85 lg:text-[15px]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-loop" aria-hidden="true" />
                Whatever your household runs on, it runs on fibre.
              </p>
            </div>
          </div>
        </div>

        {/* ── Ledger column ─────────────────────────────────────── */}
        <div className="flex flex-col border-t border-line bg-paper px-5 py-14 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:py-20">
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

          <div className="mt-10 flex flex-1 flex-col lg:mt-12">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                className="relative grid flex-1 grid-cols-[48px_1fr] items-center gap-x-4 border-b border-line py-5 first:border-t sm:gap-x-5 sm:py-6"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                {/* hairline drawing in above each row */}
                <motion.span
                  className="absolute inset-x-0 top-0 h-px origin-left bg-signal"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
                  aria-hidden="true"
                />
                <span className="display-mono pt-1 self-start text-sm font-bold tracking-tight text-signal">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight text-signal sm:text-2xl">
                      {useCase.title}
                    </h3>
                    <p className="display-mono shrink-0 text-right text-[10px] font-semibold uppercase leading-snug tracking-[0.04em] text-ink-soft">
                      {useCase.detail}
                    </p>
                  </div>
                  <p className="mt-2 max-w-[500px] text-sm leading-relaxed text-ink-soft">
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