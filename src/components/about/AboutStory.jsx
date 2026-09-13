import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

/**
 * The FibreHood Story — editorial narrative with a supporting image and a
 * gold fact card overlapping the frame. No invented history: the copy stays
 * on the access-gap problem FibreHood was built to solve.
 */
export function AboutStory() {
  return (
    <section className="relative bg-paper py-24 lg:py-36">
      <div className="container-lattice">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Narrative ───────────────────────────────────────────── */}
          <div className="lg:pt-4">
            <Reveal>
              <SectionLabel>Our Story</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[16ch] font-heading text-3xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
                Fibre shouldn&rsquo;t be a guessing game<span className="text-loop">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-lg space-y-5 text-base leading-[1.8] text-ink-soft">
                <p>
                  For too many Zimbabweans, getting fibre has meant guesswork — calls that go
                  unanswered, salespeople who overpromise, installations that drift from week
                  to week.
                </p>
                <p>
                  FibreHood exists to close that access gap. We build and run fibre
                  infrastructure, and we deal with you directly: find out exactly what fibre
                  reaches your address, choose a plan with clarity, and get connected without
                  the runaround.
                </p>
                <p>
                  Street by street and suburb by suburb, we&rsquo;re building the network our
                  neighbourhoods actually need — and backing it with people who answer.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                to="/coverage"
                className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-signal"
              >
                See where we&rsquo;ve reached
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* ── Image with overlapping fact card ────────────────────── */}
          <div className="relative">
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-xl">
                <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4.4]">
                  <Image
                    src={IMAGES.lightTrails}
                    alt="Light trails through a Zimbabwean street at night"
                    fittingType="fill"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3} className="relative z-10 mx-6 -mt-16 sm:mx-10 lg:-mt-20 lg:mx-12">
              <div className="max-w-sm rounded-lg bg-loop p-7 shadow-lift sm:p-8">
                <p className="font-heading text-xl font-extrabold leading-snug tracking-tight text-signal sm:text-2xl">
                  The coverage checker.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-signal/80">
                  Type your address on this site and get a straight answer in seconds — live,
                  in progress, or not yet reached.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
