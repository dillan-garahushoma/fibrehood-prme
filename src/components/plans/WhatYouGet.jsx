import React from "react";
import { Wrench, Zap, Wifi } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const STEPS = [
  { icon: Wrench, label: "FREE Installation", note: "For everyhome in your community." },
  { icon: Zap, label: "Activation Fee", note: "Once-Off fee starting from US$65 (Home) / US$75 (SME Business) / POA (Enterprise)" },
  { icon: Wifi, label: "Free-to-Use Router", note: "Included with every plan, at no extra cost." },
];

export function WhatYouGet() {
  return (
    <section className="bg-paper pt-16 pb-6 md:pt-20 md:pb-8">
      <div className="container-lattice">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center"><span className="h-px w-6 bg-ink-soft/30" />What you get</span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            Everything that comes with your connection
          </h2>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fog text-signal">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-semibold text-signal">{s.label}</p>
                <p className="text-xs text-ink-soft">{s.note}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default WhatYouGet;
