import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

// Actual FibreHood residential packages featured on the homepage.
const FLAGSHIP_PLANS = [
  {
    id: "starter-home-connect",
    name: "Starter Home Connect",
    speed: 5,
    price: 40,
    role: "Entry-level / price-conscious"
  },
  {
    id: "smart-home-connect",
    name: "Smart Home Connect",
    speed: 15,
    price: 50,
    role: "Most popular",
    popular: true
  },
  {
    id: "pro-home-connect",
    name: "Pro Home Connect",
    speed: 30,
    price: 65,
    role: "Higher-performance household"
  }
];

export function FlagshipPlans() {
  return (
    <section className="bg-fog py-20 md:py-28">
      <div className="container-lattice">
        <Reveal className="max-w-2xl">
          <SectionLabel>Flagship plans</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            Home fibre, plainly priced.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Three straightforward residential packages — from everyday essentials
            to higher-performance households.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {FLAGSHIP_PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-7 sm:p-8",
                  plan.popular
                    ? "border-signal bg-signal text-paper shadow-lift"
                    : "border-line bg-paper text-ink shadow-signal transition-shadow hover:shadow-lift"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-loop px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-signal">
                    Most popular
                  </span>
                )}
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.18em]",
                    plan.popular ? "text-paper/60" : "text-ink-soft"
                  )}
                >
                  {plan.role}
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold tracking-tight sm:text-2xl">
                  {plan.name}
                </h3>

                <div className="mt-10">
                  <span
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-[0.18em]",
                      plan.popular ? "text-paper/60" : "text-ink-soft"
                    )}
                  >
                    Speed
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span
                      className={cn(
                        "display-mono text-5xl font-bold leading-none",
                        plan.popular ? "text-loop" : "text-ink"
                      )}
                    >
                      {plan.speed}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        plan.popular ? "text-paper/80" : "text-ink-soft"
                      )}
                    >
                      Mbps
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex items-baseline gap-1.5 pt-10">
                  <span className="font-heading text-3xl font-extrabold tracking-tight">
                    US${plan.price}
                  </span>
                  <span className={cn("text-sm", plan.popular ? "text-paper/70" : "text-ink-soft")}>
                    /month
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 lg:mt-16">
          <div className="rounded-2xl border border-line bg-paper px-6 py-8 text-center shadow-signal sm:px-10">
            <p className="text-sm font-medium text-ink-soft">Need more speed?</p>
            <p className="mt-1 font-heading text-xl font-bold tracking-tight text-signal sm:text-2xl">
              Explore our 100 Mbps Ultra-Home plan.
            </p>
            <Link
              to="/plans"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
            >
              View All Fibre Plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FlagshipPlans;