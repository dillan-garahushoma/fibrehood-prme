import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, Check, CreditCard, Headset, UserCircle } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { LoopMark } from "@/components/brand/LoopMark";
import { cn } from "@/lib/utils";

/**
 * Section 06 — Client Portal.
 * "Your FibreHood. In your hands."
 * An interactive, tabbed showcase demonstrating the core pillars of the Client Portal:
 * 1. Manage account
 * 2. Stay on top of billing
 * 3. Support / instant messaging
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
    body: "Statements, balances and payment status, whenever you need them.",
  },
  {
    icon: Headset,
    title: "Get help when you need it",
    body: "Message the team that actually knows your line — no call queue.",
  },
];

const CYCLE_INTERVAL_MS = 3600;

function AccountState() {
  return (
    <motion.div
      key="state-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-paper/50">Good afternoon,</p>
          <p className="font-heading text-xl font-extrabold tracking-tight text-paper">Morlean</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-loop text-xs font-bold text-signal shadow-sm">
          DM
        </div>
      </div>

      {/* Connection status */}
      <div className="flex items-center justify-between rounded-xl border border-paper/10 bg-paper/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-paper/50">Your connection</p>
            <p className="text-sm font-semibold text-paper">Connected · Fibre 40 Mbps</p>
          </div>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-paper/10 bg-paper/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-paper/50">Service address</p>
          <p className="mt-0.5 text-sm font-semibold text-paper">14 Borrowdale Rd</p>
        </div>
        <div className="rounded-xl border border-paper/10 bg-paper/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-paper/50">Plan</p>
          <p className="mt-0.5 text-sm font-semibold text-paper">Home 40</p>
        </div>
      </div>
    </motion.div>
  );
}

function BillingState() {
  return (
    <motion.div
      key="state-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      <div className="rounded-xl border border-paper/10 bg-paper/10 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-paper/50">Amount due</span>
          <span className="rounded-full bg-loop/20 px-2.5 py-0.5 text-[10px] font-semibold text-loop">
            Due 01 Oct
          </span>
        </div>
        <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-paper">US$40.00</p>
        <p className="mt-1 text-xs text-paper/50">Home 40 · 24-month plan</p>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-loop py-3 text-sm font-bold text-signal transition-all hover:bg-loopsoft active:scale-[0.99]"
      >
        <CreditCard className="h-4 w-4" strokeWidth={2} />
        Pay now
      </button>

      <div className="flex items-center gap-2 text-xs text-paper/50">
        <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.5} />
        Auto-pay is on for this account
      </div>
    </motion.div>
  );
}

function SupportState() {
  const [typedText, setTypedText] = useState("");
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const phrase = "My internet's been slow since last night";
    setTypedText("");
    setShowReply(false);

    const timer = setTimeout(async () => {
      for (let i = 0; i <= phrase.length; i++) {
        if (cancelled) return;
        setTypedText(phrase.slice(0, i));
        await new Promise((r) => setTimeout(r, 28 + Math.random() * 20));
      }
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 350));
      if (cancelled) return;
      setShowReply(true);
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      key="state-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-3.5"
    >
      <div className="flex items-start gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-loop text-[9px] font-bold text-signal">
          FH
        </span>
        <div className="rounded-2xl rounded-tl-sm border border-paper/10 bg-paper/10 px-3.5 py-2.5 text-[13.5px] text-paper/90">
          Hi — what can we help with today?
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-xl border border-paper/15 bg-paper/5 px-3.5 py-2.5">
        <span className="min-h-[20px] text-[13.5px] text-paper">
          {typedText}
        </span>
        <span className="inline-block h-3.5 w-0.5 -translate-y-0.5 bg-loop animate-pulse" />
      </div>

      {showReply && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2.5"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-loop text-[9px] font-bold text-signal">
            FH
          </span>
          <div className="rounded-2xl rounded-tl-sm border border-paper/10 bg-paper/10 px-3.5 py-2.5 text-[13.5px] text-paper/90">
            Running a line check now — I'll stay on until it's sorted.
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ClientPortal() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  const isInView = useInView(stageRef, { amount: 0.3 });
  const timerRef = useRef(null);

  // Auto-rotation when in view
  useEffect(() => {
    if (reduce || !isInView) return undefined;

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % CAPABILITIES.length);
    }, CYCLE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, reduce, active]);

  const handleSelect = (index) => {
    setActive(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <section className="relative overflow-hidden bg-signal-deep py-20 text-paper md:py-28">
      {/* Clean homepage hero background with subtle warm glow */}
      <div className="pointer-events-none absolute -right-24 top-[30%] h-80 w-80 rounded-full bg-loop/10 blur-[90px]" />

      <div className="container-lattice relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: narrative + interactive capabilities + CTA ── */}
          <Reveal>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">
              <span className="h-px w-6 bg-paper/30" />
              Client Portal
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-[1.08] tracking-tight text-paper sm:text-4xl lg:text-[2.75rem]">
              Your FibreHood.
              <br />
              <span className="text-loop">In your hands.</span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/80 lg:text-lg">
              Stay in control of your connection from the FibreHood Client Portal — manage your account, keep track of billing and reach support, all in one place.
            </p>

            {/* Interactive capabilities buttons */}
            <div className="mt-7 flex flex-col gap-3">
              {CAPABILITIES.map((cap, index) => {
                const isSelected = active === index;
                const IconComponent = cap.icon;
                return (
                  <button
                    key={cap.title}
                    type="button"
                    onClick={() => handleSelect(index)}
                    className={cn(
                      "group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                      isSelected
                        ? "border-loop/40 bg-paper/10 shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
                        : "border-paper/10 bg-transparent hover:border-paper/20 hover:bg-paper/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                        isSelected
                          ? "bg-loop text-signal"
                          : "bg-paper/10 text-loop group-hover:bg-paper/15"
                      )}
                    >
                      <IconComponent className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-paper">{cap.title}</span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-paper/60">{cap.body}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                to="/portal"
                className="group inline-flex items-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-colors duration-200 hover:bg-loopsoft"
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

          {/* ── Right: Stage & Interactive Glass Panel ── */}
          <div ref={stageRef} className="relative">
            {/* Depth blocks in background */}
            <div
              className="pointer-events-none absolute -inset-6 z-0 grid grid-cols-3 gap-3 p-6 opacity-40 blur-[2.5px]"
              aria-hidden="true"
            >
              <div className="flex flex-col gap-3">
                <div className="h-14 rounded-xl bg-paper/10" />
                <div className="h-24 rounded-xl bg-paper/10" />
                <div className="h-10 rounded-xl bg-paper/10" />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <div className="h-10 rounded-xl bg-paper/10" />
                <div className="h-28 rounded-xl bg-paper/10" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-20 rounded-xl bg-paper/10" />
                <div className="h-14 rounded-xl bg-paper/10" />
                <div className="h-10 rounded-xl bg-paper/10" />
              </div>
            </div>

            {/* Main frosted glass panel */}
            <div
              className="relative z-10 overflow-hidden rounded-[28px] border border-paper/15 bg-signal-deep/85 p-6 pt-9 backdrop-blur-2xl shadow-2xl sm:p-8 sm:pt-10"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 36px, #000 calc(100% - 24px), transparent 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0, #000 36px, #000 calc(100% - 24px), transparent 100%)",
              }}
            >
              {/* Panel head */}
              <div className="flex items-center gap-2.5 border-b border-paper/10 pb-4">
                <LoopMark className="h-3.5 w-6 text-loop" />
                <span className="text-xs font-semibold text-paper/80">Client Portal</span>
                <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-paper/50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-loop opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-loop" />
                  </span>
                  Live
                </span>
              </div>

              {/* Panel body with animated state changes */}
              <div className="min-h-[230px] pt-4">
                <AnimatePresence mode="wait">
                  {active === 0 && <AccountState key="state-0" />}
                  {active === 1 && <BillingState key="state-1" />}
                  {active === 2 && <SupportState key="state-2" />}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientPortal;