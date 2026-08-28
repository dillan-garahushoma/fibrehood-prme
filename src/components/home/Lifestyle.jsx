import React from "react";
import { Briefcase, Clapperboard, Gamepad2, Home, Building2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

const USE_CASES = [
  { icon: Briefcase, title: "Work", body: "Stable video calls and cloud apps without the whole household sharing a bottleneck." },
  { icon: Clapperboard, title: "Entertainment", body: "4K streams on multiple rooms at once — buffer-free evenings." },
  { icon: Gamepad2, title: "Gaming", body: "Lower latency and big downloads that don't tie up the line for hours." },
  { icon: Home, title: "Home", body: "Every phone, laptop, and smart device pulling from one reliable pipe." },
  { icon: Building2, title: "Business", body: "Symmetric uploads for file transfers, hosted voice, and production teams." }
];

export function Lifestyle() {
  return (
    <section className="bg-fog py-20 md:py-28">
      <div className="container-lattice">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
          <Image
            src={IMAGES.lightTrails}
            alt="Abstract rendering of light-speed trails through glass"
            fittingType="fill"
            className="h-64 w-full sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-signal/85 via-signal/45 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg p-8 sm:p-12">
              <SectionLabel tone="light">What fibre unlocks</SectionLabel>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-paper sm:text-4xl">
                Reliable fibre changes how a place works.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-paper/80">
                It's not about a faster number on a speed test. It's about every connected
                thing in your home or business just working — at the same time.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-signal">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal text-paper transition-transform group-hover:scale-105">
                  <u.icon className="h-5 w-5 text-loop" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-signal">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lifestyle;