import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Heart, Send, Play, ThumbsUp } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";
import { IMAGES } from "@/data/images";

// Floating social-app glyphs that reinforce the "apps coming out of her phone" idea.
const FLOATING_APPS = [
  { Icon: Heart, className: "left-[6%] top-[18%]", delay: "0s", dur: "5.4s" },
  { Icon: MessageCircle, className: "left-[20%] top-[8%]", delay: "0.6s", dur: "6.2s" },
  { Icon: Send, className: "right-[14%] top-[12%]", delay: "0.3s", dur: "5.8s" },
  { Icon: Play, className: "right-[4%] top-[30%]", delay: "0.9s", dur: "6.6s" },
  { Icon: ThumbsUp, className: "left-[12%] bottom-[20%]", delay: "0.45s", dur: "5.2s" }
];

export function RouterSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-fog/40 to-paper" aria-hidden="true" />
      <div className="container-lattice relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image with floating app glyphs */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
              <Image
                src={IMAGES.inHomeJoy}
                alt="A smiling young African woman with a full afro using her phone while social-media app icons float out of the screen"
                fittingType="fill"
                className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]"
              />
              {/* warm gradient wash for tone + text legibility of floating glyphs */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/30 via-transparent to-transparent" />
            </div>

            {/* Floating social app chips */}
            {FLOATING_APPS.map(({ Icon, className, delay, dur }) => (
              <div
                key={className}
                aria-hidden="true"
                className={`pointer-events-none absolute ${className} grid h-11 w-11 place-items-center rounded-2xl bg-paper/85 text-signal shadow-lift ring-1 ring-line backdrop-blur-md`}
                style={{ animation: `float-slow ${dur} ease-in-out ${delay} infinite` }}
              >
                <Icon className="h-5 w-5 text-loop" />
              </div>
            ))}

            {/* LoopMark accent */}
            <div className="absolute -right-3 -top-3 grid h-16 w-16 place-items-center rounded-2xl bg-loop text-signal shadow-lift">
              <LoopMark className="h-8 w-12" stroke={3.4} />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <SectionLabel>The in-home experience</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Everyone online, all at once — and not a single buffer in sight.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              One fibre line in, and the whole home comes alive. The series streaming in 4K in the lounge,
              the video call that never drops, the group chat buzzing, the downloads finishing before you've
              made tea. Fibrehood brings glass to your door so the people inside it can just live online — together.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-ink-soft">
              {[
                "Stream, scroll, game and call — all at the same time, in every room",
                "Symmetric speeds that keep uploads as fast as downloads",
                "A reliable pipe built for a household of connected people"
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-loop/20 text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-loop" />
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/coverage"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-paper shadow-signal transition-transform hover:-translate-y-0.5"
              >
                Check what's available at your home
                <ArrowRight className="h-4 w-4 text-loop" />
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
              >
                See what's included in each plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default RouterSection;