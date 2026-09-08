import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

/**
 * Section 05 — "Why FibreHood?"
 * Calm editorial split: frameless photo left, narrative right with generous
 * whitespace, then proof points as a vertically-divided column grid below —
 * each column a small label, a heading, and a short body line.
 */

const PROOF = [
  {
    label: "Network",
    title: "Reliable infrastructure",
    body: "Fibre engineered for dependable, everyday uptime — built to stay up.",
  },
  {
    label: "Support",
    title: "Local, on the ground",
    body: "Help from people who know your network and your neighbourhood.",
  },
  {
    label: "Speed",
    title: "Keeps up with everyone",
    body: "Bandwidth that holds when the whole household is online at once.",
  },
  {
    label: "Future",
    title: "Built to grow",
    body: "A network designed to scale with demand — not just to sell today.",
  },
];

export function ValueProp() {
  return (
    <section className="relative bg-paper py-24 md:py-36">
      <div className="container-lattice">
        {/* ── Editorial split: photo + narrative ─────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative">
            <Image
              src={IMAGES.fibreInstallation}
              alt="A FibreHood technician splicing fibre at a street-side distribution box"
              fittingType="fill"
              className="aspect-[4/5] w-full lg:aspect-[5/6]"
              focalPointX={0.5}
              focalPointY={0.42}
            />
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center">
            <SectionLabel>Why FibreHood</SectionLabel>

            <h2 className="mt-8 font-heading text-4xl font-bold leading-[1.06] tracking-tighter text-signal sm:text-5xl lg:text-[3.25rem]">
              Built for today.
              <br />
              <span className="text-loop">Ready for tomorrow.</span>
            </h2>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              Reliable connectivity starts with the network behind it. FibreHood
              builds fibre infrastructure around the communities we serve —
              delivering dependable connectivity today while expanding to reach
              more homes tomorrow.
            </p>

            <div className="mt-10">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-base font-semibold text-signal transition-colors hover:text-ink"
              >
                Discover FibreHood
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Proof points: vertically-divided column grid ───────────── */}
        <Reveal delay={0.1} className="mt-24 lg:mt-32">
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((p, i) => (
              <div
                key={p.label}
                className={[
                  "px-0 py-8 sm:px-8 lg:py-10",
                  i === 0 ? "sm:pl-0" : "",
                  i === PROOF.length - 1 ? "sm:pr-0" : "",
                  "border-line",
                  i > 0 ? "sm:border-l" : "",
                ].join(" ")}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft/70">
                  {p.label}
                </p>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-signal">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ValueProp;