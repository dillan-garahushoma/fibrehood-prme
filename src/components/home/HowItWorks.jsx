import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { LoopMark } from "@/components/brand/LoopMark";

const STEPS = [
  { n: "01", title: "Check your coverage", body: "Enter your address. We tell you honestly whether fibre is live, planned, or not yet available." },
  { n: "02", title: "See available network", body: "Where you're covered, you'll see the FibreHood fibre footprint and what it means for your connection." },
  { n: "03", title: "Choose your fibre plan", body: "Compare home and business packages by speed, price, and what's included — no smoke and mirrors." },
  { n: "04", title: "Request your connection", body: "One request via WhatsApp or our contact form. A human picks it up and walks you through installation." },
  { n: "05", title: "Get connected", body: "Fibre runs to your premises, your router is configured, and you're online — with local support after." }
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <span className="eyebrow"><span className="h-px w-6 bg-signal/40" /> The connection journey</span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            From address to online in five clear steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No maze of resellers. One provider, one journey — built around what's actually available at your door.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-line md:left-1/2 md:block" />
          <ol className="space-y-4 md:space-y-0">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="relative md:grid md:grid-cols-2 md:gap-12 md:py-5">
                  <div className={`flex items-start gap-4 ${i % 2 === 1 ? "md:col-start-2 md:flex-row" : "md:flex-row-reverse md:text-right"}`}>
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-signal text-paper shadow-signal">
                      <LoopMark className="h-6 w-9" animated={i === 0} />
                      <span className="display-mono absolute -bottom-2 -right-2 rounded-md bg-loop px-1.5 py-0.5 text-[10px] font-bold text-signal">{s.n}</span>
                    </span>
                    <div className="pt-1">
                      <h3 className="font-heading text-lg font-bold text-signal">{s.title}</h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
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