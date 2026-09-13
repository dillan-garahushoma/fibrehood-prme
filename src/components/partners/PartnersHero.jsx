import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { entranceContainer, entranceItem } from "@/components/common/Reveal";
import { whatsappLink } from "@/data/site";

const WA_PARTNER = whatsappLink(
  "Hi FibreHood, I'd like to explore a partnership — bringing fibre to my estate / development / community."
);

export function PartnersHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-signal-deep text-paper">
      {/* Background: our clean fibre-field photography (no competitor branding) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]" aria-hidden="true">
        <img
          src="/images/partners-hero.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-signal-deep/65 lg:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-signal-deep via-signal-deep/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/70 via-transparent to-signal-deep/30" />
      </div>


      <motion.div
        className="container-lattice relative flex min-h-[80svh] flex-col justify-center py-28 md:py-36"
        variants={entranceContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <div className="max-w-2xl">
          <motion.span
            variants={entranceItem}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-loop"
          >
            <span className="h-px w-6 bg-loop/70" aria-hidden="true" />
            Partnership programme
          </motion.span>

          <motion.h1
            variants={entranceItem}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.04] tracking-tighter text-paper sm:text-5xl lg:text-[3.6rem]"
          >
            Better connections.
            <br />
            <span className="text-loop">Stronger communities.</span>
          </motion.h1>

          <motion.p
            variants={entranceItem}
            className="mt-6 max-w-xl text-base leading-[1.86] text-paper/75 lg:text-lg"
          >
            FibreHood partners with community associations, property developers,
            and estate bodies to deliver future-ready fibre infrastructure —
            unlocking opportunity and growing lasting value for every resident.
          </motion.p>

          <motion.div
            variants={entranceItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={WA_PARTNER}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
            >
              <MessageCircle className="h-4 w-4" /> Partner With Us
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              Talk to Our Team <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default PartnersHero;
