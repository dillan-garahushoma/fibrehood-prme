import React from "react";
import { Home, Cable, GitFork, Server, Network, Globe } from "lucide-react";
import { NETWORK } from "@/data/network";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

const ICONS = { home: Home, cable: Cable, split: GitFork, server: Server, network: Network, globe: Globe };

export function NetworkVisual() {
  return (
    <section className="relative overflow-hidden bg-signal py-20 text-paper md:py-28">
      <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-lattice relative">
        <div className="max-w-2xl">
          <SectionLabel tone="light">The network, made legible</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
            Home → Fibre → Local Network → FibreHood → Internet
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/70">
            {NETWORK.statement}
          </p>
        </div>

        {/* Animated horizontal path (desktop) / vertical (mobile) */}
        <div className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-signal-deep/40 p-6 md:p-8">
            <svg className="absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 md:block" aria-hidden="true" preserveAspectRatio="none">
              <line x1="0" y1="12" x2="100%" y2="12" stroke="rgba(255,204,0,0.25)" strokeWidth="1.5" strokeDasharray="8 10" className="animate-dash-flow" />
            </svg>
            <ol className="relative grid gap-6 md:grid-cols-6 md:gap-3">
              {NETWORK.path.map((node, i) => {
                const Icon = ICONS[node.icon] || Server;
                return (
                  <Reveal key={node.id} delay={i * 0.08} className="flex flex-col items-center text-center">
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-paper/10 ring-1 ring-paper/15">
                      <Icon className="h-6 w-6 text-loop" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-paper">{node.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-paper/60">{node.detail}</p>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {NETWORK.capabilities.map((c) => (
              <div key={c.label} className="rounded-xl border border-paper/15 bg-paper/5 p-5">
                <h3 className="text-sm font-semibold text-loop">{c.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NetworkVisual;