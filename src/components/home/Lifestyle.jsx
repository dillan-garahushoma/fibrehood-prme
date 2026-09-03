import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";
import DomainCollage from "@/components/home/DomainCollage";
import corporateImage from "@/components/collage/1490330fe_generated_image.png";
import healthcareImage from "@/components/collage/e400d5732_generated_image.png";
import coworkingImage from "@/components/collage/ad8018c58_generated_image.png";
import retailImage from "@/components/collage/e9ee6dd60_generated_image.png";
import fibreUnlocksVideo from "@/components/collage/konzept-fotografie-film-hd-auto-.mp4";

export function Lifestyle() {
  return (
    <section className="relative overflow-hidden bg-fog py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 -top-16 opacity-[0.05]">
        <LoopMark className="h-72 w-[32rem]" stroke={2} animated />
      </div>
      <div className="container-lattice relative">
        <Reveal className="mx-auto max-w-3xl text-center">
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
          <div className="relative left-1/2 w-[calc(100vw-2.5rem)] max-w-[1520px] -translate-x-1/2 sm:w-[calc(100vw-4rem)] lg:w-[calc(100vw-10rem)]">
            <DomainCollage
              images={{
                domainCorporate: corporateImage,
                domainHealthcare: healthcareImage,
                domainCoworking: coworkingImage,
                domainRetail: retailImage
              }}
              videoSrc={fibreUnlocksVideo}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Lifestyle;
