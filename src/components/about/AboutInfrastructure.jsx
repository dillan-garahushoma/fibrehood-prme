import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

const WORK = [
  { src: "/images/team-plans.jpg", alt: "Engineers reviewing network rollout plans", caption: "Planning the rollout" },
  { src: "/images/engineer-field.jpg", alt: "Technician splicing fibre cables in the field", caption: "Splicing in the field" },
  { src: "/images/installation-closeup.jpg", alt: "Close-up of fibre optic strands", caption: "Fibre, up close" },
  { src: IMAGES.fibreGlass, alt: "Glass fibre core that carries the light", caption: "The glass that carries it" },
];

const CAPABILITIES = ["Route planning", "Civil works", "Splicing & installation", "Network monitoring", "Support & maintenance"];

/**
 * Built Behind the Scenes — the infrastructure and operational capability
 * behind the customer experience. Tangible, credible, not a spec sheet.
 */
export function AboutInfrastructure() {
  return (
    <section className="relative overflow-hidden bg-signal-deep py-24 text-paper lg:py-36">
      <div className="container-lattice">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Copy ────────────────────────────────────────────────── */}
          <div className="lg:pt-4">
            <Reveal>
              <SectionLabel tone="light">Built Behind The Scenes</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[16ch] font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl">
                The quiet machinery behind a simple promise<span className="text-loop">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-lg space-y-5 text-base leading-[1.8] text-paper/70">
                <p>
                  Every &ldquo;you&rsquo;re live&rdquo; moment sits on months of quiet work:
                  routes planned street by street, ducts and trenches laid, fibre spliced with
                  real precision, and equipment commissioned properly before a customer ever
                  sees it.
                </p>
                <p>
                  And the work doesn&rsquo;t end at installation. The network is monitored and
                  maintained after the teams have left your street — because the promise is the
                  connection, not the handover.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-x-3 gap-y-2 border-t border-paper/10 pt-8">
                {CAPABILITIES.map((c, i) => (
                  <span key={c} className="flex items-center gap-3 text-[13px] font-medium text-paper/60">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-loop/70" aria-hidden="true" />}
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Work grid ────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {WORK.map((w, i) => (
              <Reveal key={w.caption} delay={0.08 * i} amount={0.2}>
                <figure className={i % 2 === 1 ? "sm:mt-8" : ""}>
                  <div className="overflow-hidden rounded-lg border border-paper/10">
                    <div className="aspect-[4/3.6]">
                      <Image src={w.src} alt={w.alt} fittingType="fill" className="h-full w-full" />
                    </div>
                  </div>
                  <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-paper/50">
                    {w.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutInfrastructure;
