import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import { plansBySegment, formatSpeed } from "@/data/plans";
import { WA_INTENTS } from "@/data/site";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";

export function FeaturedOffer() {
  const plan = plansBySegment("home").find((p) => p.popular) || plansBySegment("home")[1];

  return (
    <section className="bg-fog py-20 md:py-28">
      <div className="container-lattice">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Featured fibre offer</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              The package most homes land on.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Enough speed for a family streaming, working, and gaming at once — with a
              Wi-Fi 6 router and installation included on contract.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/plans" className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-paper hover:bg-signal-deep">
                View all plans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/coverage" className="inline-flex items-center gap-2 rounded-full border border-signal px-5 py-3 text-sm font-semibold text-signal hover:bg-paper">
                Check availability
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-paper shadow-lift">
              <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-loop px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-signal">
                Most popular
              </div>
              <div className="grid gap-8 p-8 sm:grid-cols-2 sm:p-10">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">{plan.type}</span>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-signal">{plan.name}</h3>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="display-mono text-6xl font-bold leading-none text-ink">{formatSpeed(plan.download)}</span>
                    <span className="mb-1 text-sm text-ink-soft">/ download</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                    <span className="display-mono font-semibold text-ink">{formatSpeed(plan.upload)}</span>
                    <span>upload</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-signal">${plan.price}</span>
                      <span className="text-sm text-ink-soft">/ {plan.cycle}</span>
                    </div>
                    {plan.dev && (
                      <p className="mt-1 text-[11px] text-ink-soft/70">Indicative price — confirmed at your coverage check.</p>
                    )}
                    <ul className="mt-5 space-y-2.5">
                      {plan.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={WA_INTENTS.plan(plan.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-loop px-5 py-3 text-sm font-semibold text-signal transition-transform hover:scale-[1.01]"
                  >
                    <MessageCircle className="h-4 w-4" /> Request this connection
                  </a>
                </div>
              </div>
              <div className="border-t border-line bg-fog/50 px-8 py-4 text-xs text-ink-soft sm:px-10">
                Contract: {plan.contract} · {plan.installation}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default FeaturedOffer;