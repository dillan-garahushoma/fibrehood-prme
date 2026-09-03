import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

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
    <section className="relative bg-paper py-16 sm:py-20 lg:py-28">
      <div className="container-lattice grid items-start gap-10 lg:grid-cols-[55%_45%] lg:gap-16">
        {/* ── Photo ─────────────────────────────────────────────── */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="aspect-[4/3] w-full sm:aspect-[16/10]"
            initial={reduce ? false : { scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={IMAGES.lifeEvening}
              alt="A household at ease in the evening — TV glowing, laptop open, a video call in the background."
              fittingType="fill"
              className="h-full w-full"
            />
          </motion.div>
          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-ink-soft">
            <span className="h-px w-5 bg-signal/40" />
            One connection. Everything on it.
          </p>
        </motion.div>

        {/* ── Editorial column ──────────────────────────────────── */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>What your connection is really for</SectionLabel>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-extrabold leading-[1.08] tracking-tighter text-ink sm:text-4xl lg:text-[2.75rem]">
              Internet that keeps up with your life<span className="text-signal">.</span>
            </h2>
          </motion.div>

          <div className="mt-8">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                className="flex gap-5 border-t border-line py-5 first:border-t-0 sm:py-6"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="display-mono pt-1 text-sm font-semibold text-signal/35">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-ink">
                    {useCase.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-soft">
                    {useCase.description}
                  </p>
                  <p className="display-mono mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft/70">
                    {useCase.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-6 max-w-sm text-sm font-medium text-ink"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Whatever your household runs on, it runs on fibre.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default EverydayLife;