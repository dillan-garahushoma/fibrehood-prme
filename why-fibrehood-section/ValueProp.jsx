import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

/**
 * Section 05 — "Why FibreHood?"
 * The trust bridge: after plans + how-it-works, this introduces the company
 * behind the connection. Editorial, brand-oriented — not another feature grid.
 * The four former pillars (reliable network, local support, high speed,
 * future ready) become compact proof points beneath the narrative, and the
 * section exits into About.
 */

const PROOF = [
  {
    title: "Reliable network",
    body: "Fibre infrastructure engineered for dependable, everyday uptime.",
  },
  {
    title: "Local support",
    body: "Help from people who know your network and your neighbourhood.",
  },
  {
    title: "High-speed connectivity",
    body: "Speeds that keep up with the whole household, all at once.",
  },
  {
    title: "Future ready",
    body: "A network built to grow with demand — not just to sell today.",
  },
];

export function ValueProp() {
  return (
    <section className="relative bg-paper py-20 md:py-28">
      <div className="container-lattice">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ── Left: visual ─────────────────────────────────────────── */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image
                src={IMAGES.fibreInstallation}
                alt="A FibreHood technician splicing fibre at a street-side distribution box"
                fittingType="fill"
                className="aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]"
                focalPointX={0.5}
                focalPointY={0.42}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/70 via-signal/10 to-transparent" />
              {/* navy caption strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-signal-deep/85 px-5 py-4 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-loop" />
                <p className="text-xs font-medium leading-snug text-paper/90">
                  The network is ours. So is the crew that keeps it running.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Right: narrative ────────────────────────────────────── */}
          <Reveal delay={0.08} className="flex flex-col justify-center">
            <SectionLabel>Why FibreHood</SectionLabel>

            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
              Built for today.
              <br />
              <span className="text-loop">Ready for tomorrow.</span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft lg:text-lg">
              Reliable connectivity starts with the network behind it. FibreHood is
              building fibre infrastructure designed around the communities we serve —
              delivering dependable connectivity today while expanding to reach more
              homes tomorrow.
            </p>

            {/* compact proof points — 2 × 2 */}
            <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {PROOF.map((p) => (
                <div key={p.title} className="border-l border-line pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-signal">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>

            {/* exit into About */}
            <div className="mt-9">
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
      </div>
    </section>
  );
}

export default ValueProp;