import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  CircleCheck,
  Router,
  Sparkles,
  Wrench,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import { HOME_PLANS, PLAN_META } from "../data";
import { fmtMoney } from "../lib";
import { Button, Card, Modal, Pill, StatusPill } from "../ui";
import { cn } from "@/lib/utils";

function SpeedLine({ down, up }) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm">
      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
        <ArrowDown className="h-4 w-4 text-emerald-500" /> {down} Mbps
      </span>
      <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
        <ArrowUp className="h-4 w-4 text-sky-500" /> {up} Mbps
      </span>
    </div>
  );
}

function CurrentPlanHero({ onExplore }) {
  const { currentPlan } = usePortal();
  const [open, setOpen] = useState(false);
  return (
    <Card className="relative overflow-hidden border-0 bg-signal text-paper shadow-lift">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-loop/15 blur-[90px]" />
      <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <Pill tone="gold" dot="gold">Your current plan</Pill>
            <StatusPill status={PLAN_META.status} label="Active" />
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
            {currentPlan.name}
          </h2>
          <p className="mt-1.5 text-sm text-paper/70">
            {currentPlan.type} · {currentPlan.contract}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Download</p>
              <p className="font-heading text-3xl font-extrabold tracking-tight">{currentPlan.download}<span className="ml-1 text-base font-semibold text-paper/60">Mbps</span></p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Upload</p>
              <p className="font-heading text-3xl font-extrabold tracking-tight">{currentPlan.upload}<span className="ml-1 text-base font-semibold text-paper/60">Mbps</span></p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Monthly</p>
              <p className="font-heading text-3xl font-extrabold tracking-tight">{fmtMoney(currentPlan.price, { decimals: 0 })}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[260px]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm">
            <div className="flex items-center gap-2 text-paper/80">
              <Router className="h-4 w-4 text-loop" />
              <span className="font-semibold">{PLAN_META.router}</span>
            </div>
            <p className="mt-1 text-xs text-paper/55">Included with your plan</p>
            <div className="mt-2 flex items-center gap-2 text-paper/80">
              <Wrench className="h-4 w-4 text-loop" />
              <span className="text-xs">Installed {PLAN_META.installDate} · {PLAN_META.activationFee}</span>
            </div>
          </div>
          <Button variant="primary" onClick={onExplore}>
            Explore upgrades <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="text-paper/80 hover:bg-white/10 hover:text-paper"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide plan details" : "View plan details"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </Button>
        </div>
      </div>

      {open && (
        <div className="relative border-t border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">What's included</p>
              <ul className="mt-3 space-y-2">
                {currentPlan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-paper/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-loop" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Best for</p>
              <ul className="mt-3 space-y-2">
                {currentPlan.bestFor.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-paper/85">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-loop" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Package details</p>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ["Billing", PLAN_META.billingCycle],
                  ["Next renewal", PLAN_META.nextRenewal],
                  ["Contract", PLAN_META.contract],
                  ["Connection", currentPlan.type],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-paper/50">{k}</dt>
                    <dd className="text-right font-medium text-paper/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function SwitchModal({ plan, onClose }) {
  const { currentPlan, switchPlan } = usePortal();
  const [loading, setLoading] = useState(false);
  if (!plan) return null;

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      switchPlan(plan.id);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      open={!!plan}
      onClose={onClose}
      title={`Switch to ${plan.name}?`}
      sub="A profile change — no visit or new equipment needed."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Keep current plan</Button>
          <Button variant="primary" onClick={confirm} disabled={loading}>
            {loading ? "Updating…" : "Confirm switch"}
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold text-muted-foreground">Current</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{currentPlan.name}</p>
            <SpeedLine down={currentPlan.download} up={currentPlan.upload} />
            <p className="mt-1.5 font-mono text-lg font-bold text-foreground">{fmtMoney(currentPlan.price, { decimals: 0 })}<span className="text-xs font-medium text-muted-foreground">/mo</span></p>
          </div>
          <div className="rounded-2xl border-2 border-loop bg-loop/[0.06] p-4">
            <p className="text-xs font-semibold text-muted-foreground">New</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{plan.name}</p>
            <SpeedLine down={plan.download} up={plan.upload} />
            <p className="mt-1.5 font-mono text-lg font-bold text-foreground">{fmtMoney(plan.price, { decimals: 0 })}<span className="text-xs font-medium text-muted-foreground">/mo</span></p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl bg-muted/50 p-3.5 text-[13px] text-muted-foreground">
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          Changes take effect on your next billing date, 1 Oct 2026. You can switch again anytime — no lock-in.
        </div>
      </div>
    </Modal>
  );
}

function PlanCard({ plan, isCurrent, onSwitch }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col p-5 transition-shadow hover:shadow-lift sm:p-6",
        isCurrent && "border-2 border-loop"
      )}
    >
      {isCurrent && (
        <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-loop px-3 py-1 text-[11px] font-bold text-signal shadow-sm">
          <Check className="h-3 w-3" /> Current plan
        </span>
      )}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {plan.usageLabel}
      </p>
      <h3 className="mt-1 font-heading text-lg font-bold tracking-tight text-foreground">{plan.name}</h3>

      <div className="mt-4 space-y-1.5">
        <SpeedLine down={plan.download} up={plan.upload} />
      </div>

      <p className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground">
        {fmtMoney(plan.price, { decimals: 0 })}
        <span className="ml-1 text-sm font-semibold text-muted-foreground">/month</span>
      </p>

      <ul className="mt-4 flex-1 space-y-2">
        {plan.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-muted-foreground">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-loop" /> {f}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {isCurrent ? (
          <Button variant="outline" className="w-full" disabled>
            You're on this plan
          </Button>
        ) : (
          <Button variant={plan.popular ? "primary" : "outline"} className="w-full" onClick={() => onSwitch(plan)}>
            Switch to this plan
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function Plan() {
  const { currentPlan } = usePortal();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const comparisonRef = React.useRef(null);

  const explore = () => comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">My Plan</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Your package, what's included, and how to upgrade when you're ready.
          </p>
        </div>
        <Pill tone="navy">{PLAN_META.contract}</Pill>
      </div>

      <CurrentPlanHero onExplore={explore} />

      <div ref={comparisonRef} className="scroll-mt-24">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
              Available Fibrehood packages
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Every home plan includes unlimited data and a Wi-Fi router. Upgrade anytime.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {HOME_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={plan.id === currentPlan.id}
              onSwitch={setSelected}
            />
          ))}
        </div>
      </div>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-loop/15 text-amber-700 dark:text-loop">
            <Wrench className="h-5 w-5" />
          </span>
          <div>
            <p className="font-heading text-base font-bold text-foreground">Thinking about a change?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Our team can recommend the right plan for your household — no pressure, no obligation.
            </p>
          </div>
        </div>
        <Button variant="navy" className="shrink-0" onClick={() => navigate("/portal/support")}>Talk to Fibrehood</Button>
      </Card>

      <SwitchModal plan={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
