import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  ClipboardList,
  CalendarCheck,
  Wifi,
  ArrowRight,
  User,
  CreditCard,
  BarChart3,
  Headset
} from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";

const STEPS = [
  {
    num: "01",
    icon: MapPin,
    title: "Check coverage",
    body: "Enter your address to see if FibreHood is available in your area.",
    to: "/coverage",
    cta: "Check now"
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Choose your plan",
    body: "Pick the fibre plan that best fits your home and lifestyle.",
    to: "/plans",
    cta: "View plans"
  },
  {
    num: "03",
    icon: CalendarCheck,
    title: "Schedule installation",
    body: "Select a convenient time and our team will take care of the rest."
  },
  {
    num: "04",
    icon: Wifi,
    title: "Get connected",
    body: "We install, set up and get you online — fast. It's that easy!"
  }
];

const PORTAL_TOOLS = [
  { icon: User, label: "View your account" },
  { icon: CreditCard, label: "Pay your bill" },
  { icon: BarChart3, label: "Monitor your service" },
  { icon: Headset, label: "Get support" }
];

const EASE = [0.16, 1, 0.3, 1];

export function ConnectionJourney() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-20 md:py-28">
      <div className="container-lattice">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <Reveal className="max-w-2xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            Getting connected is simple.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            From checking coverage to getting online, we make the process quick,
            easy and hassle-free.
          </p>
        </Reveal>

        {/* ── Four-step journey ──────────────────────────────────────── */}
        <div className="relative mt-14 lg:mt-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal
                  key={step.num}
                  delay={i * 0.12}
                  className="relative flex flex-col"
                >
                  {/* desktop horizontal connector between cards */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute top-12 -right-6 z-20 hidden w-6 items-center lg:flex"
                      aria-hidden="true"
                    >
                      <span className="h-2 w-2 rounded-full bg-loop shadow-loop" />
                      <span className="h-px flex-1 border-t border-dashed border-line" />
                      <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    </div>
                  )}

                  {/* card */}
                  <div className="flex flex-1 flex-col rounded-2xl border border-line bg-card p-7 shadow-signal transition-transform duration-300 hover:-translate-y-1">
                    {/* step number */}
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-4xl font-extrabold leading-none tracking-tighter text-signal">
                        {step.num}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fog text-signal">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </div>

                    {/* loop underline accent */}
                    <span className="mt-5 h-0.5 w-10 rounded-full bg-loop" />

                    <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {step.body}
                    </p>

                    {step.to && (
                      <Link
                        to={step.to}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
                      >
                        {step.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>

                  {/* mobile vertical connector */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="mx-auto my-2 flex flex-col items-center sm:hidden"
                      aria-hidden="true"
                    >
                      <span className="h-2 w-2 rounded-full bg-loop" />
                      <span className="h-6 w-px border-l border-dashed border-line" />
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── Client Portal strip ────────────────────────────────────── */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-fog px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-signal shadow-signal">
                <User className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-signal">
                  Manage everything online.
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Your Client Portal — long after the install.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-x-10">
              {PORTAL_TOOLS.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={tool.label}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <ToolIcon className="h-5 w-5 text-signal" strokeWidth={1.6} />
                    <span className="text-xs font-medium text-ink-soft">
                      {tool.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
            >
              Go to Client Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ConnectionJourney;