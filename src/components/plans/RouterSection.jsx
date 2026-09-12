import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

const ROUTER_FEATURES = [
  "Wi-Fi router included with every home fibre plan",
  "Reliable coverage for everyday streaming, work and play",
  "Simple setup with support from the FibreHood team",
];

export function RouterSection() {
  return (
    <section className="overflow-hidden bg-paper pt-8 pb-16 md:pt-10 md:pb-24">
      <div className="container-lattice">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Visual column */}
          <Reveal className="relative">
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center sm:aspect-[4/3] lg:max-w-none">

              {/* Soft accent glow — depth without a dark box */}
              <div
                className="absolute h-[65%] w-[65%] rounded-full bg-loop/25 blur-3xl"
                aria-hidden="true"
              />

              {/* Staggered signal rings — not in sync so they feel alive */}
              <div
                className="absolute h-[45%] w-[45%] animate-ping rounded-full border border-loop/40 [animation-duration:3s]"
                aria-hidden="true"
              />
              <div
                className="absolute h-[45%] w-[45%] animate-ping rounded-full border border-loop/30 [animation-delay:1.2s] [animation-duration:3s]"
                aria-hidden="true"
              />

              {/* Ground shadow — reads as sitting in the scene, not floating */}
              <div
                className="absolute bottom-[8%] h-5 w-2/3 rounded-full bg-signal-deep/15 blur-xl"
                aria-hidden="true"
              />

              {/*
                Plain <img> with object-contain:
                The local PNG is not a Wix/Base44 media URL so the responsive
                Image component's transform pipeline won't apply. Using a
                plain <img> makes the contain behaviour explicit and avoids the
                component falling back internally anyway.
              */}
              <img
                src={IMAGES.routerNode}
                alt="FibreHood Wi-Fi router"
                className="relative z-10 w-[78%] object-contain drop-shadow-xl"
              />

              {/* Status LED — signals the unit is powered on */}
              <span
                className="absolute left-[27%] top-[36%] z-10 h-2 w-2 animate-pulse rounded-full bg-loop"
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-3 rounded-2xl bg-loop px-4 py-3 text-sm font-semibold text-signal shadow-lift sm:-right-5"
              aria-hidden="true"
            >
              Wi-Fi included
            </div>
          </Reveal>

          {/* Copy column */}
          <Reveal delay={0.1}>
            <SectionLabel>Included with your plan</SectionLabel>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Your FibreHood router, ready to connect your home.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              Every home fibre plan includes a dependable Wi-Fi router, so you
              have what you need to get online from day one. We keep setup
              straightforward and our team is here if you need a hand.
            </p>

            <ul className="mt-7 space-y-3">
              {ROUTER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-loop/20">
                    <Check className="h-3.5 w-3.5 text-signal" />
                  </span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/coverage"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-paper shadow-signal transition-transform hover:-translate-y-0.5"
            >
              Check availability <ArrowRight className="h-4 w-4 text-loop" />
            </Link>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export default RouterSection;
