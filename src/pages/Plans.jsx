import React, { useState } from "react";
import { 
  Check, GitCompare, ArrowRight,
  Infinity as InfinityIcon, Wifi, Zap, Ban, Headphones, ArrowLeftRight, TrendingUp 
} from "lucide-react";
import { PlansHero } from "@/components/plans/PlansHero";
import { PlansConversion } from "@/components/plans/PlansConversion";
import { PlanCard } from "@/components/plans/PlanCard";
import { Wave } from "@/components/plans/Wave";
import { EveryPlanIncludes } from "@/components/plans/EveryPlanIncludes";
import { WhatYouGet } from "@/components/plans/WhatYouGet";
import { RouterSection } from "@/components/plans/RouterSection";
import EnterpriseConnectivity from "@/components/plans/EnterpriseConnectivity";
import WhyChooseFibrehood from "@/components/plans/WhyChooseFibrehood";
import { IMAGES } from "@/data/images";
import { WA_INTENTS } from "@/data/site";
import SignupFlow from "@/components/signup/SignupFlow";
import { PLANS, formatSpeed } from "@/data/plans";
import { Reveal } from "@/components/common/Reveal";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const GROUPS = [
  {
    id: "home-fibre",
    segment: "home",
    heading: "Residential Fibre",
    blurb: "Everyday connectivity for households — a progression from light browsing to a fully connected home.",
    includes: [
      { icon: InfinityIcon, label: "Unlimited data" },
      { icon: Wifi, label: "Wi-Fi router included" },
      { icon: Zap, label: "Activation from US$65" },
      { icon: Ban, label: "No lock-in" },
      { icon: Headphones, label: "Local support" },
    ],
  },
  {
    id: "sme-fibre",
    segment: "business",
    heading: "SME Business Fibre",
    blurb: "Symmetric connectivity for growing businesses — built for teams, cloud tools and uptime.",
    includes: [
      { icon: ArrowLeftRight, label: "Symmetric speeds" },
      { icon: Headphones, label: "Business-grade support" },
      { icon: Zap, label: "US$100 activation fee" },
      { icon: Ban, label: "No lock-in" },
      { icon: TrendingUp, label: "Contention priority" },
    ],
  },
];

export default function Plans() {
  const [selected, setSelected] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupPlanId, setSignupPlanId] = useState(null);

  const startSignup = (planId = "smart-home-connect") => {
    setSignupPlanId(planId);
    setSignupOpen(true);
  };

  const toggle = (id) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 3) return cur; // max 3
      return [...cur, id];
    });
  };

  const comparePlans = selected.map((id) => PLANS.find((p) => p.id === id)).filter(Boolean);

  const homeGroup = GROUPS[0];
  const smeGroup = GROUPS[1];

  const homePlans = PLANS
    .filter((p) => p.segment === homeGroup.segment)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const smePlans = PLANS
    .filter((p) => p.segment === smeGroup.segment)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <PlansHero />

      {/* ── Residential Plans ─────────────────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="container-lattice">
          <div id={homeGroup.id} className="scroll-mt-24 mt-10">
            <Reveal>
              <span className="eyebrow"><span className="h-px w-6 bg-loop" />Home connections</span>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
                {homeGroup.heading}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{homeGroup.blurb}</p>
              <EveryPlanIncludes items={homeGroup.includes} />
            </Reveal>

            <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {homePlans.map((p, i) => (
                <Reveal key={p.id} className="h-full" delay={(i % 4) * 0.05}>
                  <PlanCard
                    plan={p}
                    selected={selected.includes(p.id)}
                    onToggle={toggle}
                    onSelectPackage={startSignup}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SME Business Plans (with organic wave separator) ── */}
      <section className="relative overflow-hidden bg-fog pb-16 md:pb-24 pt-20 md:pt-28">
        <Wave fill="hsl(var(--paper))" flip />
        <div className="container-lattice relative">
          <div id={smeGroup.id} className="scroll-mt-24">
            <Reveal>
              <span className="eyebrow"><span className="h-px w-6 bg-loop" />For growing teams</span>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
                {smeGroup.heading}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{smeGroup.blurb}</p>
              <EveryPlanIncludes items={smeGroup.includes} />
            </Reveal>

            {/* Centre 3 SME cards evenly */}
            <div className="mt-8 flex flex-wrap items-stretch justify-center gap-6">
              {smePlans.map((p, i) => (
                <Reveal key={p.id} className="h-full w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:max-w-xs" delay={i * 0.05}>
                  <PlanCard
                    plan={p}
                    selected={selected.includes(p.id)}
                    onToggle={toggle}
                    onSelectPackage={startSignup}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keep the mobile compare controls in the page flow so they never cover plan details. */}
      {comparePlans.length > 0 && (
        <div className="relative z-40 border-y border-line bg-paper/95 py-4 backdrop-blur sm:fixed sm:inset-x-0 sm:bottom-0 sm:border-t sm:pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pt-0">
          <div className="container-lattice flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-4 sm:py-4">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink">
              <GitCompare aria-hidden="true" className="h-5 w-5 shrink-0 text-signal" />
              <span aria-live="polite" aria-atomic="true" className="font-semibold">{comparePlans.length} selected</span>
              <span className="break-words text-xs text-ink-soft sm:max-w-[28rem] sm:truncate sm:text-sm">· {comparePlans.map((p) => p.name).join(", ")}</span>
              <span id="compare-helper" className="w-full text-xs text-ink-soft sm:w-auto">Select 2–3 plans to compare.</span>
            </div>
            <div className="flex shrink-0 justify-end gap-2">
              <button type="button" onClick={() => setSelected([])} className="min-h-11 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-fog focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 sm:px-4">
                Clear
              </button>
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                disabled={comparePlans.length < 2}
                aria-describedby="compare-helper"
                className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-loop px-3 py-2.5 text-sm font-semibold text-signal transition-colors hover:bg-loop-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
              >
                Compare plans <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <EnterpriseConnectivity imageSrc={IMAGES.enterpriseCampus} ctaHref={WA_INTENTS.enterprise()} />
      <WhyChooseFibrehood />

      {/* ── What You Get ────────────────────────── */}
      <WhatYouGet />

      {/* ── Router section ──────────────────────── */}
      <RouterSection onSelectPackage={() => startSignup()} />

      <SignupFlow
        open={signupOpen}
        location={null}
        initialPlanId={signupPlanId}
        onClose={() => setSignupOpen(false)}
      />

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold text-signal">Plan comparison</DialogTitle>
            <DialogDescription>Side-by-side view of your selected fibre packages.</DialogDescription>
          </DialogHeader>
          <CompareTable plans={comparePlans} />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => startSignup(comparePlans[0]?.id)}
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-paper hover:bg-signal-deep"
            >
              Select Package <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Contract & billing ────────────────────────── */}
      <section className="bg-fog py-16 md:py-20">
        <div className="container-lattice">
          <Reveal>
            <span className="eyebrow"><span className="h-px w-6 bg-ink-soft/30" />Terms & transparency</span>
            <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
              Contract & billing
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Simple, transparent terms with no lock-in and zero surprises.
            </p>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { 
                t: "Month-to-month contracts", 
                b: "All plans run month-to-month with no lock-in contracts. Change or cancel your plan whenever your needs evolve." 
              },
              { 
                t: "Clear activation terms", 
                b: "One-time activation fee covers full on-site installation and line testing (from US$65 for Home, US$100 for SME)." 
              },
              { 
                t: "Verified at coverage check", 
                b: "Final pricing, service availability, and installation scheduling are verified at your exact address before you commit." 
              }
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-line bg-paper p-6">
                <h3 className="font-semibold text-signal">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{x.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <PlansConversion onSelectPackage={() => startSignup()} />
      {comparePlans.length > 0 && <div aria-hidden="true" className="hidden h-28 sm:block" />}
    </>
  );
}

function CompareTable({ plans }) {
  const rows = [
    { label: "Segment", get: (p) => (p.segment === "business" ? "SME" : "Home") },
    { label: "Download", get: (p) => formatSpeed(p.download), mono: true },
    { label: "Upload", get: (p) => formatSpeed(p.upload), mono: true },
    { label: "Price", get: (p) => `${p.currency === "USD" ? "US$" : "$"}${p.price} / ${p.cycle}`, mono: true },
    { label: "Type", get: (p) => p.type },
    { label: "Contract", get: (p) => p.contract },
    { label: "Installation", get: (p) => p.installation }
  ];
  return (
    <div
      className="min-w-0 max-w-full overflow-x-auto overscroll-x-contain"
      role="region"
      aria-label="Plan comparison details"
      tabIndex={0}
    >
      <p className="mb-2 text-xs text-ink-soft sm:hidden">Swipe horizontally to compare plans.</p>
      <table className="w-full min-w-[38rem] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-32 border-b border-line p-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft">Plan</th>
            {plans.map((p) => (
              <th key={p.id} className="border-b border-line p-3 text-left">
                <span className="font-heading text-lg font-bold text-signal">{p.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line/60">
              <td className="p-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">{r.label}</td>
              {plans.map((p) => (
                <td key={p.id} className={cn("p-3 text-ink", r.mono && "display-mono font-semibold")}>
                  {r.get(p)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">Features</td>
            {plans.map((p) => (
              <td key={p.id} className="p-3">
                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-ink">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}