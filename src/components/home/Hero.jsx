import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { LoopMark } from "@/components/brand/LoopMark";
import { CoverageChecker } from "@/components/coverage/CoverageChecker";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";
import { motion, useReducedMotion } from "framer-motion";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-signal text-paper">
      {/* Slightly blurred fibre field — eye focuses on the crisp headline + checker */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGES.fibreConstellation}
          alt=""
          fittingType="fill"
          className="h-full w-full scale-105 blur-lg"
        />
        <div className="absolute inset-0 bg-signal/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 95% at 50% 32%, rgba(7,34,72,0.35) 0%, rgba(7,34,72,0.62) 55%, rgba(4,18,40,0.96) 100%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute -right-24 top-20 opacity-[0.07]">
        <LoopMark className="h-72 w-[32rem]" stroke={2} animated />
      </div>

      <motion.div
        className="container-lattice relative pt-28 pb-20 md:pt-36 md:pb-28"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.div variants={entranceItem} className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="light" className="justify-center">
            Fibre connectivity, coverage-first
          </SectionLabel>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper [text-shadow:0_2px_30px_rgba(4,18,40,0.55)] sm:text-5xl md:text-6xl">
            Bridging the
            <span className="relative mx-2 inline-block">
              <span className="text-loop">access gap</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-loop/70" />
            </span>
            with fibre that reaches you.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/80 [text-shadow:0_1px_20px_rgba(4,18,40,0.6)] sm:text-lg">
            Check your address, see exactly what fibre is available, and choose a plan
            that fits your home or business — then get connected with a single request.
          </p>
        </motion.div>

        <motion.div variants={entranceItem} className="mx-auto mt-10 max-w-2xl">
          <CoverageChecker variant="hero" source="coverage" />
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              View plans <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-paper/60">
              <MapPin className="mr-1 inline h-3.5 w-3.5 text-loop" />
              Coverage-first — we tell you what's actually available.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;