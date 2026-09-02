import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";
import DomainCollage from "@/components/home/DomainCollage";
import { IMAGES } from "@/data/images";

export function Lifestyle() {
  return (
    <section className="relative overflow-hidden bg-fog py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 -top-16 opacity-[0.05]">
        <LoopMark className="h-72 w-[32rem]" stroke={2} animated />
      </div>
      <div className="container-lattice relative">
        <Reveal className="mx-auto max-w-3xl text-center md:hidden">
          <SectionLabel tone="ink" className="justify-center">What fibre unlocks</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            For the places that run on being connected.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Reliable fibre isn't a faster number on a speed test for a business — it's payments that never
            miss, calls that never drop, and teams that stay in sync. Here's what fibre unlocks where
            professionals and businesses work.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <DomainCollage
            images={{
              corporate: IMAGES.domainCorporate,
              retail: IMAGES.domainRetail,
              hospitality: IMAGES.domainHospitality
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default Lifestyle;