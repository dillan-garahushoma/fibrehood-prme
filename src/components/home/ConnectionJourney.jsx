import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Package, Calendar, Wifi, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    icon: MapPin,
    title: "Check coverage",
    question: "Can I get FibreHood?",
    body: "Enter your address to see if our fibre network is live at your home.",
    to: "/coverage"
  },
  {
    num: "02",
    icon: Package,
    title: "Choose your plan",
    question: "Which package is right for me?",
    body: "Pick the speed that fits your household — from everyday essentials to power homes.",
    to: "/plans"
  },
  {
    num: "03",
    icon: Calendar,
    title: "Schedule installation",
    question: "What's going to happen at my house?",
    body: "Book a visit. Our team runs the fibre and sets up your router at a time that suits you."
  },
  {
    num: "04",
    icon: Wifi,
    title: "Get connected",
    question: "When will I actually be online?",
    body: "We install and activate your line — you're live the moment we're done."
  }
];

const PORTAL_TOOLS = [
  "View your account",
  "Pay your bill",
  "Monitor your service",
  "Get support"
];

const EASE = [0.16, 1, 0.3, 1];

export function ConnectionJourney() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-20 md:py-28">
      <div className="container-lattice">
        <Reveal className="max-w-2xl">
          <SectionLabel>Connection journey</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            Here's exactly how it works.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Getting FibreHood shouldn't feel complicated. Four predictable steps
            take you from checking your address to being online.
          </p>
        </Reveal>

        {/* ── Continuous four-step journey ────────────────────────────── */}
        <div className="relative mt-14 lg:mt-20">
          {/* desktop connecting line */}
          <div
            className="absolute left-0 right-0 top-9 hidden lg:block"
            aria-hidden="true"
          >
            <div className="mx-[12.5%] h-px bg-gradient-to-r from-transparent via-line to-transparent" />
            <div className="absolute inset-x-0 top-9 -mt-px h-[2px] overflow-hidden">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-loop via-loop to-loop/0"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal
                  key={step.num}
                  delay={i * 0.12}
                  className="relative flex flex-col items-start"
                >
                  {/* mobile vertical connector */}
                  {i < STEPS.length - 1 && (
                    <span
                      className="absolute left-[1.4375rem] top-[3.75rem] hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-line to-transparent sm:hidden lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                  {/* node */}
                  <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-line bg-paper shadow-signal">
                    <span className="display-mono text-sm font-bold text-signal">
                      {step.num}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className={cn(
                          "absolute inline-flex h-[4.5rem] w-[4.5rem] rounded-full",
                          i === 0
                            ? "bg-loop/20"
                            : i === STEPS.length - 1
                            ? "bg-loop/10"
                            : "bg-transparent"
                        )}
                        animate={
                          reduce
                            ? undefined
                            : i === 0
                            ? { scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }
                            : undefined
                        }
                        transition={{ duration: 2.6, repeat: Infinity, ease: EASE }}
                      />
                    </span>
                    <Icon className="relative h-5 w-5 text-ink-soft" />
                  </div>

                  <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-loop">
                    {step.question}
                  </span>
                  <h3 className="mt-1.5 font-heading text-lg font-bold tracking-tight text-signal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>

                  {step.to && (
                    <Link
                      to={step.to}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors hover:text-loop"
                    >
                      {step.title === "Check coverage" ? "Check now" : "View plans"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── Client Portal strip ─────────────────────────────────────── */}
        <Reveal className="mt-16 lg:mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-signal/15 bg-signal px-6 py-10 sm:px-10 lg:px-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-grid-dark" />
            </div>
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <SectionLabel tone="light">After you're connected</SectionLabel>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                  Manage everything online.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/70">
                  FibreHood isn't connect-and-goodbye. Your Client Portal keeps the
                  whole relationship in one place — long after the install.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-transform hover:scale-[1.01]"
                >
                  Open Client Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                {PORTAL_TOOLS.map((tool) => (
                  <li
                    key={tool}
                    className="flex items-center gap-2.5 text-sm font-medium text-paper/90"
                  >
                    <span className="flex h-1.5 w-1.5 rounded-full bg-loop" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ConnectionJourney;