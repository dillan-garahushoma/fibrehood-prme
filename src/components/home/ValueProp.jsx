import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

/**
 * Section 05 — "Why FibreHood?"
 * Ported from a Dominus "Why" section: editorial two-column head (copy + framed
 * photo with overlaid caption) over a hairline-divided column ledger of proof
 * points. Typography and colour adapted to FibreHood tokens.
 */

const PROOF = [
  {
    label: "Reliable network",
    title: "Connectivity that holds",
    summary:
      "Fibre infrastructure engineered for dependable, everyday uptime — built to stay up when it matters most.",
  },
  {
    label: "Local support",
    title: "Help that knows you",
    summary:
      "Support from people who know your network and your neighbourhood — not a distant call centre reading a script.",
  },
  {
    label: "High-speed connectivity",
    title: "Built for the whole house",
    summary:
      "Speeds that keep up with every stream, call, and device in the home — all running at once, without compromise.",
  },
  {
    label: "Future ready",
    title: "Designed to grow",
    summary:
      "A network built to scale with demand and expand to more homes — not just sold to meet today's numbers.",
  },
];

export function ValueProp() {
  return (
    <section className="relative bg-paper py-24 md:py-36">
      <div className="container-lattice">
        {/* ── Head: copy + framed photo ─────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.74fr)] lg:items-center lg:gap-16 xl:gap-24">
          <Reveal className="max-w-[650px]">
            <SectionLabel>Why FibreHood</SectionLabel>
            <h2 className="mt-8 font-heading text-4xl font-bold leading-[1.04] tracking-tighter text-signal sm:text-5xl lg:text-[4.25rem]">
              Built for today.
              <br />
              <em className="font-medium italic text-loop">Ready for tomorrow.</em>
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.86] text-ink-soft lg:text-lg">
              Reliable connectivity starts with the network behind it. FibreHood
              builds fibre infrastructure around the communities we serve —
              delivering dependable connectivity today while expanding to reach
              more homes tomorrow.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <figure className="relative min-h-[320px] overflow-hidden rounded-lg lg:min-h-[430px]">
              <Image
                src={IMAGES.fibreInstallation}
                alt="A FibreHood technician splicing fibre at a street-side distribution box"
                fittingType="fill"
                className="h-full w-full"
                focalPointX={0.5}
                focalPointY={0.42}
              />
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,34,72,0.02), rgba(7,34,72,0.34))",
                  backdropFilter: "saturate(0.7) contrast(1.04)",
                }}
              />
              <figcaption className="absolute bottom-4 left-4 z-[2] text-[0.66rem] font-medium uppercase tracking-wide text-paper/90">
                Connectivity engineered for everyday uptime
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ── Proof ledger: hairline-divided columns ────────────────── */}
        <Reveal delay={0.12} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((item, i) => (
              <article
                key={item.label}
                className={[
                  "p-8 md:p-10",
                  i < PROOF.length - 1 ? "border-b border-line sm:border-b-0 sm:border-r" : "",
                ].join(" ")}
              >
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.22em] text-loop">
                  {item.label}
                </span>
                <h3 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-signal">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.78] text-ink-soft">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ── Exit into About ────────────────────────────────────────── */}
        <Reveal delay={0.14} className="mt-12 lg:mt-16">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-base font-semibold text-signal transition-colors hover:text-ink"
          >
            Discover FibreHood
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default ValueProp;