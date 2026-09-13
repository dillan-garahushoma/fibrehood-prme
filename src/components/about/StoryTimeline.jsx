import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";

const STORY_STEPS = [
  { tag: "IDEA", title: "01 — The idea", copy: "Connectivity should give people options, not limitations.", image: IMAGES.lightTrails },
  { tag: "BUILD", title: "02 — The infrastructure", copy: "Build once. Build properly. Build for the long term.", image: IMAGES.fibreInstallation },
  { tag: "CONNECT", title: "03 — The community", copy: "Bring fibre closer to the people and places that depend on it.", image: IMAGES.networkOrb },
  { tag: "EXPAND", title: "04 — The future", copy: "Create infrastructure capable of supporting the technologies that come next.", image: IMAGES.fibreConstellation },
  { tag: "WHAT'S NEXT", title: "05 — Still building", copy: "The story isn't finished. Every neighbourhood we reach adds to it.", image: IMAGES.lifeEvening },
];

/**
 * "Our Story" — an editorial alternating timeline. Five full-width milestone
 * rows alternate image/copy sides, joined by a continuous vertical fibre line
 * with a node per milestone. Replaces the previous flat 5-card grid.
 */
export function StoryTimeline() {
  return (
    <section id="story" className="relative bg-signal-deep py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
            <span className="h-px w-8 bg-loop" /> Our Story
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display max-w-3xl text-3xl leading-[1.15] text-paper sm:text-5xl">
            Built around one simple idea: better infrastructure creates better choices.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-paper/75">
            <p>
              FibreHood was built around a different approach to connectivity. Instead of tying the network to a single service provider, FibreHood builds the infrastructure as an open platform &mdash; allowing service providers to compete over a shared network while the infrastructure remains in place.
            </p>
            <p className="text-loop/90">The result is a simpler idea with a powerful effect: more choice, more flexibility and a network built for the long term.</p>
          </div>
        </Reveal>
      </div>

      {/* Editorial alternating timeline */}
      <div className="relative mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <div
          className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-loop/60 via-paper/15 to-transparent lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        />
        <div className="space-y-20 lg:space-y-28">
          {STORY_STEPS.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={step.tag} delay={0.05} className="relative pl-14 lg:pl-0">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                  <div className={cn("relative", flip ? "lg:order-2" : "lg:order-1")}>
                    <div
                      className={cn(
                        "lg:max-w-md",
                        flip ? "lg:pl-16 lg:text-left" : "lg:ml-auto lg:pr-16 lg:text-right"
                      )}
                    >
                      <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-loop">{step.tag}</span>
                      <h4 className="mt-3 font-display text-2xl font-semibold text-paper sm:text-3xl">{step.title}</h4>
                      <p className="mt-4 text-base leading-relaxed text-paper/70">{step.copy}</p>
                    </div>
                  </div>
                  <div className={cn("relative aspect-[4/3] overflow-hidden", flip ? "lg:order-1" : "lg:order-2")}>
                    <Image src={step.image} alt={step.title} fittingType="fill" className="h-full w-full" />
                    <div className="absolute inset-0 bg-signal-deep/25" />
                  </div>
                </div>
                <span
                  className="absolute left-6 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-loop bg-signal-deep lg:left-1/2"
                  aria-hidden="true"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StoryTimeline;