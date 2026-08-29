import React from "react";
import { MapPin, Activity, ListChecks, MessageCircle, Rocket } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";

const STEPS = [
  { n: "01", icon: MapPin, title: "Check your coverage", body: "Enter your address. We tell you honestly whether fibre is live, planned, or not yet available — before you commit to anything.", tag: "Coverage tool" },
  { n: "02", icon: Activity, title: "See available network", body: "Where you're covered, you'll see the FibreHood fibre footprint and what it actually means for your connection.", tag: "Live footprint" },
  { n: "03", icon: ListChecks, title: "Choose your fibre plan", body: "Compare home and business packages by speed, price, and what's included — no smoke and mirrors.", tag: "Plan library" },
  { n: "04", icon: MessageCircle, title: "Request your connection", body: "One request via WhatsApp or our contact form. A real person picks it up and walks you through what's next.", tag: "WhatsApp / form" },
  { n: "05", icon: Rocket, title: "Get connected", body: "Fibre runs to your premises, your router is configured, and you're online — with local support afterwards.", tag: "Installation" }
];

function StepCard({ s }) {
  return (
    <div className="group h-full rounded-2xl border border-line bg-paper p-5 shadow-signal transition-all duration-300 hover:-translate-y-1 hover:border-loop/50 hover:shadow-lift">
      <div className="flex items-center gap-2">
        <span className="display-mono text-xs font-semibold tracking-widest text-loop">{s.n}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{s.tag}</span>
      </div>
      <h3 className="mt-3 font-heading text-base font-bold text-signal">{s.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
    </div>
  );
}

function StepNode({ s, i, size = "lg" }) {
  const dim = size === "lg" ? "h-16 w-16" : "h-14 w-14";
  const badge = size === "lg" ? "h-6 w-6 text-[11px]" : "h-5 w-5 text-[10px]";
  return (
    <div className={`relative z-10 grid ${dim} place-items-center rounded-2xl bg-signal text-paper shadow-lift ring-8 ring-fog/40`}>
      <s.icon className="h-6 w-6 text-loop" />
      <span className={`display-mono absolute -right-2 -top-2 grid ${badge} place-items-center rounded-full bg-loop font-bold text-signal ring-4 ring-fog/70`}>
        {i + 1}
      </span>
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
        <div className="max-w-2xl">
          <SectionLabel>The connection journey</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            From address to online in five clear steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No maze of resellers. One provider, one journey — built around what's actually available at your door.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink-soft shadow-signal">
            <LoopMark className="h-4 w-7" />
            Five steps · One provider · Zero resellers
          </div>
        </div>

        {/* Desktop: horizontal signal path */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute inset-x-0 top-8 h-px bg-line" aria-hidden="true" />
          <svg className="absolute inset-x-0 top-8 h-2 w-full -translate-y-1/2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--loop))" strokeWidth="2" strokeDasharray="6 12" opacity="0.7" className="animate-dash-flow" />
          </svg>

          <div className="grid grid-cols-5 gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="flex flex-col items-center">
                  <StepNode s={s} i={i} size="lg" />
                  <div className="mt-7 w-full">
                    <StepCard s={s} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-7 top-3 bottom-3 w-px bg-line" aria-hidden="true" />
          <svg className="absolute left-7 top-3 bottom-3 h-[calc(100%-1.5rem)] w-2 -translate-x-1/2 overflow-visible" preserveAspectRatio="none" aria-hidden="true">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(var(--loop))" strokeWidth="2" strokeDasharray="6 10" opacity="0.6" className="animate-dash-flow" />
          </svg>

          <ol className="relative space-y-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="relative flex items-start gap-5">
                  <StepNode s={s} i={i} size="sm" />
                  <div className="flex-1 pt-0.5">
                    <StepCard s={s} />
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;