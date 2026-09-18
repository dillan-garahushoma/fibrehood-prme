import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

/**
 * "Our Story" — a single editorial narrative. One strong headline, condensed
 * body copy, and one full-bleed hero image. Replaces the long alternating
 * timeline.
 */
export function StoryTimeline() {
  return (
    <section id="story" className="relative bg-signal-deep py-28 lg:py-36">
      <div className="container-lattice">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
              <span className="h-px w-8 bg-loop" /> Our Story
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-paper sm:text-5xl">
              Built around one idea: better infrastructure creates better choices.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-paper/75">
              <p>
                Fibrehood takes a different approach to connectivity. Instead of tying the network to a single service
                provider, we build the infrastructure as an open platform &mdash; allowing providers to compete over a shared
                network while the infrastructure stays in place.
              </p>
              <p className="text-loop/90">
                The result is a simpler idea with a powerful effect: more choice, more flexibility, and a network built for
                the long term.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15} className="mt-16 lg:mt-20">
        <div className="relative h-[340px] w-full overflow-hidden sm:h-[460px] lg:h-[560px]">
          <Image
            src={IMAGES.fibreInstallation}
            alt="Fibrehood technicians deploying fibre infrastructure"
            fittingType="fill"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-signal-deep via-signal-deep/20 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}

export default StoryTimeline;