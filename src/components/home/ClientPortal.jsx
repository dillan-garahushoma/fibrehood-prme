import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CreditCard, UserCircle, Headset, Wifi, Activity } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { LoopMark } from "@/components/brand/LoopMark";

/**
 * Section 06 — Client Portal (MVP).
 * A focused, premium dashboard mockup that sells the ongoing digital service.
 * Dark navy "product surface" with a floating glass card, ambient loop glow,
 * a live connection readout, usage meter, billing snapshot and quick tiles.
 */

const CAPABILITIES = [
  {
    icon: UserCircle,
    title: "Manage your account",
    body: "Customer and service details, kept in one place.",
  },
  {
    icon: CreditCard,
    title: "Stay on top of billing",
    body: "Statements, payment status and renewal dates.",
  },
  {
    icon: Headset,
    title: "Get help when you need it",
    body: "Track service issues and reach support directly.",
  },
];

const EASE = [0.16, 1, 0.3, 1];

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-line bg-paper px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</p>
      <p className="mt-1 font-heading text-lg font-bold tracking-tight text-signal">{value}</p>
      {sub && <p className="text-[10px] text-ink-soft/80">{sub}</p>}
    </div>
  );
}

function PortalDashboard() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* ambient loop glow — the card floats on a product surface */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-loop/10 blur-3xl" />
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-signal/10 blur-2xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-2xl border border-paper/15 bg-card/95 shadow-lift backdrop-blur-xl"
      >
        {/* app chrome */}
        <div className="flex items-center justify-between border-b border-line bg-fog/80 px-5 py-3">
          <div className="flex items-center gap-2">
            <LoopMark className="h-4 w-7" />
            <span className="text-xs font-semibold tracking-tight text-signal">Client Portal</span>
          </div>
          <span className="text-[10px] font-medium text-ink-soft">portal.fibrehood.app</span>
        </div>

        {/* body */}
        <div className="space-y-5 p-6">
          {/* greeting */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-soft">Good afternoon,</p>
              <p className="font-heading text-xl font-bold tracking-tight text-signal">Dillan</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-xs font-bold text-paper">
              DM
            </span>
          </div>

          {/* connection status */}
          <div className="flex items-center justify-between rounded-xl border border-line bg-signal/[0.04] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-wide text-ink-soft">Your connection</p>
                <p className="text-sm font-semibold text-signal">Connected</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 text-[11px] font-semibold text-signal">
              <Wifi className="h-3 w-3" strokeWidth={2.2} />
              Fibre 40 Mbps
            </span>
          </div>

          {/* usage meter */}
          <div className="rounded-xl border border-line bg-paper px-4 py-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Data this month</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-soft">
                <Activity className="h-3 w-3 text-loop" strokeWidth={2.2} /> Fair-use, no caps
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-fog">
              <div
                className="h-full rounded-full bg-gradient-to-r from-signal to-loop"
                style={{ width: "62%" }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-soft">
              <span>186 GB used</span>
              <span>unlimited on-net</span>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Account balance" value="US$40.00" sub="Due 01 Oct" />
            <Stat label="Next billing" value="01 Oct" sub="Auto-renew on" />
          </div>

          {/* quick tiles */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CreditCard, label: "Billing" },
              { icon: UserCircle, label: "Account" },
              { icon: Headset, label: "Support" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper px-3 py-4 transition-colors hover:border-signal/30"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal/10 text-signal">
                  <t.icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <span className="text-[11px] font-medium text-ink">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ClientPortal() {
  return (
    <section className="relative overflow-hidden bg-signal py-20 text-paper md:py-28">
      {/* faint grid + glow for a product-surface feel */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-loop/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-loop/10 blur-3xl" />

      <div className="container-lattice relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: narrative + CTA ─────────────────────────────── */}
          <Reveal>
            <span className="eyebrow text-paper/70">
              <span className="h-px w-6 bg-paper/30" />
              Client Portal
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-tighter sm:text-4xl lg:text-[2.75rem]">
              Your FibreHood.
              <br />
              <span className="text-loop">In your hands.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/80 lg:text-lg">
              Stay in control of your connection with the FibreHood Client Portal.
              Manage your account, keep track of your service, access billing
              information and get the support you need — all in one place.
            </p>

            <div className="mt-8">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
              >
                Explore Client Portal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-xs text-paper/60">
                Not a customer?{" "}
                <Link to="/plans" className="font-medium text-loop underline-offset-4 hover:underline">
                  View plans
                </Link>
              </p>
            </div>
          </Reveal>

          {/* ── Right: dashboard mockup ──────────────────────────── */}
          <div className="lg:pl-4">
            <PortalDashboard />
          </div>
        </div>

        {/* ── Capabilities ──────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:mt-16">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-paper/15 bg-paper/5 p-5 backdrop-blur-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-loop/20 text-loop">
                  <c.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-paper">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-paper/70">{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ClientPortal;