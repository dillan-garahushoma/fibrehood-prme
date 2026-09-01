import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ListChecks, Rocket, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";
import { cn } from "@/lib/utils";

// Three acts — Discover → Choose → Connect.
// "Discover" collapses the old "check coverage" + "see network" steps into one beat.
const ACTS = [
  {
    n: "01",
    icon: MapPin,
    title: "Discover",
    body: "Enter your address. We tell you honestly whether fibre is live, planned, or not yet available.",
    cta: { label: "Check coverage", to: "/coverage" }
  },
  {
    n: "02",
    icon: ListChecks,
    title: "Choose",
    body: "Compare home and business packages by speed, price, and what's included — no smoke and mirrors.",
    cta: { label: "Explore plans", to: "/plans" }
  },
  {
    n: "03",
    icon: Rocket,
    title: "Connect",
    body: "One request via WhatsApp or our form. A real person walks you through to installation and local support.",
    cta: { label: "Request connection", to: "/contact" }
  }
];

function Milestone({ act, i, isLast }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Node */}
      <div className="relative z-10 grid h-20 w-20 place-items-center rounded-2xl bg-signal text-paper shadow-lift ring-8 ring-paper/60 md:h-24 md:w-24">
        <act.icon className="h-7 w-7 text-loop md:h-8 md:w-8" />
        <span className="display-mono absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-loop text-[11px] font-bold text-signal ring-4 ring-paper">
          {i + 1}
        </span>
      </div>

      {/* Label */}
      <h3 className="mt-6 font-heading text-xl font-bold tracking-tight text-signal md:text-2xl">
        {act.title}
      </h3>
      <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-soft md:text-base">
        {act.body}
      </p>

      {act.cta && (
        <Link
          to={act.cta.to}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
        >
          {act.cta.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-fog/30" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-20 opacity-[0.05]">
        <LoopMark className="h-80 w-[36rem]" stroke={2} animated />
      </div>

      <div className="container-lattice relative">
        {/* Header */}
        <Reveal className="max-w-2xl">
          <SectionLabel>The connection journey</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            From address to online in three clear acts.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No maze of resellers. One provider, one journey — built around what's actually available at your door.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink-soft shadow-signal">
            <LoopMark className="h-4 w-7" />
            Three acts · One provider · Zero resellers
          </div>
        </Reveal>

        {/* Desktop: horizontal flow with lit endpoint */}
        <Reveal className="relative mt-20 hidden lg:block" delay={0.1}>
          {/* Flowing signal line */}
          <div className="absolute inset-x-0 top-12 h-px bg-line" aria-hidden="true" />
          <svg
            className="absolute inset-x-0 top-12 h-2 w-full -translate-y-1/2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="hsl(var(--loop))"
              strokeWidth="2"
              strokeDasharray="6 12"
              opacity="0.7"
              className="animate-dash-flow"
            />
          </svg>

          <div className="relative grid grid-cols-3 items-start gap-6">
            {ACTS.map((act, i) => (
              <div key={act.n} className="relative">
                <Milestone act={act} i={i} />
                {/* Lit endpoint mark after the final act */}
                {i === ACTS.length - 1 && (
                  <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-[40%]">
                    <div className="grid h-6 w-10 place-items-center">
                      <LoopMark className="h-5 w-9 animate-signal-pulse" stroke={3.4} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Endpoint label */}
          <div className="mt-10 flex justify-end pr-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-xs font-semibold uppercase tracking-wider text-paper">
              <LoopMark className="h-3.5 w-6" />
              You're online
            </span>
          </div>
        </Reveal>

        {/* Mobile / tablet: vertical spine with lit endpoint */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-10 top-3 bottom-3 w-px bg-line" aria-hidden="true" />
          <svg
            className="absolute left-10 top-3 bottom-3 h-[calc(100%-1.5rem)] w-2 -translate-x-1/2 overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="hsl(var(--loop))"
              strokeWidth="2"
              strokeDasharray="6 10"
              opacity="0.6"
              className="animate-dash-flow"
            />
          </svg>

          <ol className="relative space-y-8">
            {ACTS.map((act, i) => (
              <Reveal key={act.n} delay={i * 0.08}>
                <li className="relative flex items-start gap-5">
                  <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-signal text-paper shadow-lift ring-8 ring-fog/40">
                    <act.icon className="h-6 w-6 text-loop" />
                    <span className="display-mono absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-loop text-[11px] font-bold text-signal ring-4 ring-fog/70">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-signal">
                      {act.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {act.body}
                    </p>
                    {act.cta && (
                      <Link
                        to={act.cta.to}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
                      >
                        {act.cta.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
            {/* Lit endpoint */}
            <Reveal delay={ACTS.length * 0.08}>
              <li className="relative flex items-center gap-5">
                <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-loop/15 ring-8 ring-fog/40">
                  <LoopMark className="h-7 w-12 animate-signal-pulse" stroke={3.4} />
                </div>
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-signal">
                    You're online
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    Connected, configured, and backed by local support.
                  </p>
                </div>
              </li>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;