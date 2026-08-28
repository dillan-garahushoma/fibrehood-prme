import React from "react";
import { Wifi, Cable, Router, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";
import { Link } from "react-router-dom";

export function RouterSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image
                src={IMAGES.routerNode}
                alt="Abstract rendering of a glass network node emitting light pulses"
                fittingType="fill"
                className="aspect-[4/3] w-full"
              />
            </div>
            <div className="absolute -right-3 -top-3 grid h-16 w-16 place-items-center rounded-2xl bg-loop text-signal shadow-lift">
              <Router className="h-7 w-7" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <SectionLabel>The in-home experience</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Fibre reaching you is one thing. Wi-Fi inside is another.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              FibreHood brings glass all the way to your premises. But the experience you
              actually feel depends on the router and where it sits. We separate the two so
              you can fix the right problem.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal text-paper">
                  <Cable className="h-5 w-5 text-loop" />
                </span>
                <div>
                  <h3 className="font-semibold text-signal">Fibre to the premises</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    A dedicated glass link from the street to your Optical Network Terminal — fast, stable, and yours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal text-paper">
                  <Wifi className="h-5 w-5 text-loop" />
                </span>
                <div>
                  <h3 className="font-semibold text-signal">Good Wi-Fi inside</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Placement, walls, and mesh all matter. We advise on router positioning and upgrade paths so fibre doesn't bottleneck at the air.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/faq?cat=router-wifi" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:text-loop">
              Troubleshoot Wi-Fi <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default RouterSection;