import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, GitCompare, ArrowRight, Info } from "lucide-react";
import { PlansHero } from "@/components/plans/PlansHero";
import { ConnectionSelector } from "@/components/plans/ConnectionSelector";
import { PlansConversion } from "@/components/plans/PlansConversion";
import { PlanCard } from "@/components/plans/PlanCard";
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
    heading: "Home Fibre",
    blurb: "Everyday connectivity for households — a progression from light browsing to a fully connected home."
  },
  {
    id: "sme-fibre",
    segment: "business",
    heading: "SME Fibre",
    blurb: "Symmetric connectivity for growing businesses — built for teams, cloud tools and uptime."
  }
];

export default function Plans() {
  const [selected, setSelected] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const toggle = (id) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 3) return cur; // max 3
      return [...cur, id];
    });
  };

  const comparePlans = selected.map((id) => PLANS.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <PlansHero />
      <ConnectionSelector />

      {/* ── Plans (grouped by segment) ─────────────────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="container-lattice">
          <div className="flex items-center gap-2 text-xs text-ink-soft">
            <Info className="h-3.5 w-3.5" /> Select up to 3 plans to compare.
          </div>

          {GROUPS.map((group) => {
            const plans = PLANS
              .filter((p) => p.segment === group.segment)
              .sort((a, b) => a.displayOrder - b.displayOrder);
            return (
              <div key={group.id} id={group.id} className="mt-10 scroll-mt-24">
                <Reveal>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
                    {group.heading}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{group.blurb}</p>
                </Reveal>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {plans.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 4) * 0.05}>
                      <PlanCard plan={p} selected={selected.includes(p.id)} onToggle={toggle} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compare bar — kept with the plans */}
      {comparePlans.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
          <div className="container-lattice flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-ink">
              <GitCompare className="h-5 w-5 text-signal" />
              <span className="font-semibold">{comparePlans.length} selected</span>
              <span className="text-ink-soft">· {comparePlans.map((p) => p.name).join(", ")}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelected([])} className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-fog">
                Clear
              </button>
              <button
                onClick={() => setCompareOpen(true)}
                disabled={comparePlans.length < 2}
                className="inline-flex items-center gap-2 rounded-full bg-loop px-5 py-2.5 text-sm font-semibold text-signal disabled:opacity-50"
              >
                Compare plans <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold text-signal">Plan comparison</DialogTitle>
            <DialogDescription>Side-by-side view of your selected fibre packages.</DialogDescription>
          </DialogHeader>
          <CompareTable plans={comparePlans} />
          <div className="mt-4 flex justify-end">
            <Link to="/coverage" className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-paper hover:bg-signal-deep">
              Check availability <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Transparency / what's included ────────────────────────── */}
      <section className="bg-fog py-16 md:py-20">
        <div className="container-lattice">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
              What's included
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Everything you need to know before you check availability.
            </p>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Included", b: "Router, activation, and support terms are listed per plan. Home activation from US$65; SME activation US$100." },
              { t: "Contracts", b: "All plans run month-to-month with no lock-in. SME plans are symmetric with priority capacity." },
              { t: "Confirm at checkout", b: "Final pricing and installation are confirmed at your coverage check before you commit." }
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-line bg-paper p-5">
                <h3 className="font-semibold text-signal">{x.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{x.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <PlansConversion />
    </>
  );
}

function CompareTable({ plans }) {
  const rows = [
    { label: "Segment", get: (p) => (p.segment === "business" ? "SME" : "Home") },
    { label: "Download", get: (p) => formatSpeed(p.download), mono: true },
    { label: "Upload", get: (p) => formatSpeed(p.upload), mono: true },
    { label: "Price", get: (p) => `$${p.price} / ${p.cycle}`, mono: true },
    { label: "Type", get: (p) => p.type },
    { label: "Contract", get: (p) => p.contract },
    { label: "Installation", get: (p) => p.installation }
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
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