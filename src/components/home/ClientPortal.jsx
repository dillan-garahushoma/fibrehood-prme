import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CreditCard, UserCircle, Headset } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { LoopMark } from "@/components/brand/LoopMark";

/**
 * Section 06 — Client Portal.
 * Shifts the page from "FibreHood sells you internet" to "FibreHood gives you
 * an ongoing digital service." A focused dashboard mockup (not the full
 * portal) sells the experience; three concise capabilities + a CTA into the
 * portal login close it out.
 */

const CAPABILITIES = [
  {
    icon: UserCircle,
    title: "Manage your account",
    body: "Keep your customer and service details in one place.",
  },
  {
    icon: CreditCard,
    title: "Stay on top of billing",
    body: "Access statements, billing information and payment status.",
  },
  {
    icon: Headset,
    title: "Get help when you need it",
    body: "Find support resources and keep track of service issues.",
  },
];

const EASE = [0.16, 1, 0.3, 1];

function PortalDashboard() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* ambient glow so the card reads as a product surface */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-signal/5 blur-2xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="overflow-hidden rounded-2xl border border-line bg-card shadow-lift"
      >
        {/* app chrome */}
        <div className="flex items-center justify-between border-b border-line bg-fog px-5 py-3">
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
          <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3">
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
            <span className="rounded-full bg-signal/10 px-2.5 py-1 text-[11px] font-semibold text-signal">
              Fibre 40 Mbps
            </span>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-paper px-4 py-3">
              <p className="text-[10px] uppercase tracking-wide text-ink-soft">Account balance</p>
              <p className="mt-0.5 font-heading text-lg font-bold text-signal">US$40.00</p>
            </div>
            <div className="rounded-xl border border-line bg-paper px-4 py-3">
              <p className="text-[10px] uppercase tracking-wide text-ink-soft">Next billing date</p>
              <p className="mt-0.5 font-heading text-lg font-bold text-signal">01 Oct</p>
            </div>
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
                className="flex flex-col items-center gap-2 rounded-xl border border-line bg-paper px-3 py-4"
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
      {/* faint grid for a product-surface feel */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-loop/15 blur-3xl" />

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