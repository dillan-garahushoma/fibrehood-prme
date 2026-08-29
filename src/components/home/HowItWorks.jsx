import React from "react";
import { MapPin, Activity, ListChecks, MessageCircle, Rocket } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

const STEPS = [
  { n: "01", icon: MapPin, title: "Check your coverage", body: "Enter your address. We tell you honestly whether fibre is live, planned, or not yet available." },
  { n: "02", icon: Activity, title: "See available network", body: "Where you're covered, you'll see the FibreHood fibre footprint and what it means for your connection." },
  { n: "03", icon: ListChecks, title: "Choose your fibre plan", body: "Compare home and business packages by speed, price, and what's included — no smoke and mirrors." },
  { n: "04", icon: MessageCircle, title: "Request your connection", body: "One request via WhatsApp or our contact form. A human picks it up and walks you through installation." },
  { n: "05", icon: Rocket, title: "Get connected", body: "Fibre runs to your premises, your router is configured, and you're online — with local support after." }
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-fog/40" aria-hidden="true" />
      <div className="container-lattice relative">
        <div className="max-w-2xl">
          <SectionLabel>The connection journey</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            From address to online in five clear steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No maze of resellers. One provider, one journey — built around what's actually available at your door.
          </p>
        </div>

        <div className="relative mt-14">
          {/* connecting line on wide screens */}
          <div className="absolute inset-x-0 top-7 hidden h-px bg-line lg:block" aria-hidden="true" />
          <div className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-loop/60 to-transparent lg:block" aria-hidden="true" />

          <ol className="grid gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="relative flex flex-col items-start lg:items-center lg:text-center">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-signal text-paper shadow-signal ring-8 ring-paper">
                    <s.icon className="h-6 w-6" />
                    <span className="display-mono absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-loop text-[10px] font-bold text-signal">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-5 lg:px-1">
                    <span className="display-mono text-xs font-semibold tracking-widest text-loop">{s.n}</span>
                    <h3 className="mt-1 font-heading text-base font-bold text-signal">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.body}</p>
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