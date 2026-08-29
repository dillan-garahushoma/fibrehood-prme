import React from "react";
import { Check, ShieldCheck, Headset, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { LoopMark } from "@/components/brand/LoopMark";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

const POINTS = [
  { icon: MapPin, title: "Coverage-first decisions", body: "We tell you what's live before you choose a plan — not after you've signed up." },
  { icon: ShieldCheck, title: "Direct service model", body: "One provider owns your connection end to end: fibre, router, support, billing." },
  { icon: Headset, title: "Local, human support", body: "People who know your network and your area — not a distant call-centre script." }
];

export function ValueProp() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>Why FibreHood exists</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Internet should be honest about what's available at your door.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              FibreHood was built around a simple frustration: you can't make a good
              connectivity decision without knowing what fibre actually reaches your
              premises. So we start with coverage, then make the rest straightforward.
            </p>

            <div className="mt-8 space-y-5">
              {POINTS.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fog text-signal">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-signal">{p.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image
                src={IMAGES.routerNode}
                alt="Abstract rendering of a FibreHood network router node"
                fittingType="fill"
                className="aspect-[4/3] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-signal/55 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 hidden max-w-[15rem] -translate-x-1/2 rounded-2xl border border-line bg-paper p-5 shadow-lift sm:block">
              <LoopMark className="h-6 w-10" animated />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">The loop</p>
              <p className="mt-1 text-sm leading-relaxed text-ink">Connection → network → loop → flow → neighbourhood.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ValueProp;