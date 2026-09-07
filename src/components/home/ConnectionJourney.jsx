import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, User, CreditCard, BarChart3, Headset } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { IMAGES } from "@/data/images";

const STEPS = [
  {
    num: "01",
    icon: IMAGES.stepIcon01,
    alt: "Map pin icon — check if FibreHood fibre is available at your address",
    title: "Check coverage",
    body: "Enter your address to see if FibreHood is available in your area.",
    time: "~2 min",
    to: "/coverage",
    cta: "Check now"
  },
  {
    num: "02",
    icon: IMAGES.stepIcon02,
    alt: "Clipboard with checklist icon — compare and select a fibre plan",
    title: "Choose your plan",
    body: "Pick the fibre plan that best fits your home and lifestyle.",
    time: "~2 min",
    to: "/plans",
    cta: "View plans"
  },
  {
    num: "03",
    icon: IMAGES.stepIcon03,
    alt: "Calendar with checkmark icon — book a convenient installation time",
    title: "Schedule installation",
    body: "Select a convenient time and our team will take care of the rest.",
    time: "Pick a slot"
  },
  {
    num: "04",
    icon: IMAGES.stepIcon04,
    alt: "House with wifi icon — technician installs and activates your connection",
    title: "Get connected",
    body: "We install, set up and get you online — fast. It's that easy!",
    time: "Same day"
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
        <Reveal className="mx-auto max-w-[600px] text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-loop">
            <span className="h-px w-6 bg-loop/70" />
            How it works
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            Getting connected is <span className="text-loop">simple.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            From checking coverage to getting online, we make the process
            quick, easy and hassle-free.
          </p>
        </Reveal>

        {/* ── Four-step journey ──────────────────────────────────────── */}
        <div className="relative mt-16 lg:mt-24">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex flex-col"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                {/* desktop horizontal connector */}
                {i < STEPS.length - 1 && (
                  <motion.div
                    className="absolute top-6 -right-8 z-0 hidden w-8 items-center lg:flex"
                    initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
                    style={{ transformOrigin: "left center" }}
                    aria-hidden="true"
                  >
                    <span className="h-px flex-1 border-t border-dashed border-line" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-loop shadow-loop" />
                    <span className="h-px flex-1 border-t border-dashed border-line" />
                  </motion.div>
                )}

                {/* number badge — sits above the card */}
                <div className="mb-5 flex justify-center lg:mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal font-heading text-sm font-bold tracking-tight text-paper shadow-signal">
                    {step.num}
                  </span>
                </div>

                {/* card */}
                <div className="flex flex-1 flex-col items-center rounded-2xl border border-line bg-card p-7 text-center shadow-signal transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
                  {/* icon */}
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-fog">
                    <img
                      src={step.icon}
                      alt={step.alt}
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  {/* title */}
                  <h3 className="mt-6 font-heading text-lg font-bold tracking-tight text-signal">
                    {step.title}
                  </h3>

                  {/* amber underline */}
                  <span className="mt-3 h-0.5 w-10 rounded-full bg-loop" />

                  {/* description */}
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>

                  {/* time pill */}
                  <span className="mt-5 inline-flex items-center rounded-full bg-loop/10 px-3 py-1 text-xs font-semibold text-signal">
                    {step.time}
                  </span>

                  {/* CTA */}
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
                    className="mx-auto my-3 flex flex-col items-center sm:hidden"
                    aria-hidden="true"
                  >
                    <span className="h-8 w-px border-l border-dashed border-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-loop" />
                  </div>
                )}
              </motion.div>
            ))}
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
                  After installation, manage your account, pay bills, track usage
                  and get support in one place.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-x-10">
              {PORTAL_TOOLS.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={tool.label}
                    className="flex flex-col items-center gap-1.5 text-center transition-transform duration-200 hover:scale-110"
                  >
                    <ToolIcon className="h-5 w-5 text-signal transition-colors hover:text-loop" strokeWidth={1.6} />
                    <span className="text-xs font-medium text-ink-soft">
                      {tool.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-all duration-200 hover:scale-[1.03] hover:shadow-lift"
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