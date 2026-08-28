import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, MapPin, Headset, Zap, Eye } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";
import { Image } from "@/components/ui/image";
import { NETWORK } from "@/data/network";
import { IMAGES } from "@/data/images";

const VALUES = [
  { icon: Eye, title: "Honesty first", body: "If fibre isn't at your door yet, we say so. We don't sell against coverage we can't deliver." },
  { icon: Zap, title: "Coverage-led", body: "Decisions start with what's actually live — not a flashy plan you can't get." },
  { icon: Headset, title: "Local support", body: "People who know your network and your area, not a distant script." },
  { icon: ShieldCheck, title: "Direct service", body: "One provider owns your connection end to end — fibre, router, support, billing." }
];

export default function About() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="About FibreHood"
        title="We exist to bridge the access gap."
        subtitle="FibreHood is a direct fibre connectivity platform — built so people can find out what fibre really reaches them, choose with clarity, and get connected without the runaround."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container-lattice grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>The story</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Connectivity decisions shouldn't start with a sales pitch.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>FibreHood began with a simple observation: most people don't know what fibre is actually available at their address until they're already being sold something.</p>
              <p>We flipped that. Our experience starts with a coverage check — honest, fast, and clear about what's live, what's planned, and what isn't there yet. Only then do we show you plans that fit, and only the ones that make sense for your home or business.</p>
              <p>As a direct ISP, we own the whole relationship: the fibre, the router, the support, and the billing. When something goes wrong, you talk to the people who know your connection.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
              <Image src={IMAGES.fibreGlass} alt="Light travelling through a glass fibre optic cable" fittingType="fill" className="aspect-[4/3] w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-signal/50 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-line bg-paper p-5 shadow-lift sm:block">
              <LoopMark className="h-6 w-10" animated />
              <p className="mt-2 text-sm font-semibold text-signal">Connection → loop → neighbourhood</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-fog py-20 md:py-28">
        <div className="container-lattice">
          <div className="max-w-2xl">
            <SectionLabel>The philosophy</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              The loop is the brand.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              The FibreHood loop isn't decoration. It's our operating idea: connection, network,
              loop, flow, neighbourhood. Fibre connects a home to a network, and the network loops
              back to support the people it serves. Every part of the experience is built to keep
              that loop unbroken.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-paper p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal text-paper"><v.icon className="h-5 w-5 text-loop" /></span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-signal">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Network narrative */}
      <section className="py-20 md:py-28">
        <div className="container-lattice max-w-4xl">
          <SectionLabel>How we think about the network</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            A direct model, end to end.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{NETWORK.statement}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {NETWORK.path.map((node, i) => (
              <Reveal key={node.id} delay={i * 0.04}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-paper p-4">
                  <span className="display-mono grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-fog text-sm font-bold text-signal">{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-signal">{node.label}</h3>
                    <p className="text-xs text-ink-soft">{node.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest trust */}
      <section className="bg-signal py-16 text-paper md:py-20">
        <div className="container-lattice flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-loop"><MapPin className="h-3.5 w-3.5" /> Trust, earned honestly</span>
            <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">No invented numbers.</h2>
            <p className="mt-3 text-paper/70">We don't fabricate coverage stats, customer counts, or uptime claims we can't back. Where figures matter, we confirm them — and we mark development data clearly until it's real.</p>
          </div>
          <Link to="/coverage" className="inline-flex items-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal">Check coverage <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}