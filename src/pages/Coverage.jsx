import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { WA_INTENTS } from "@/data/site";

const CoverageExplorer = lazy(() => import("@/components/coverage/CoverageExplorer"));

export default function Coverage() {
  return (
    <>
      {/* Hero — paper-led, one quiet kicker, yellow only as a period */}
      <section className="relative overflow-hidden bg-paper">
        <div className="bg-grid absolute inset-0 opacity-[0.5]" aria-hidden="true" />
        <div className="container-lattice relative pb-16 pt-28 sm:pt-32 lg:pb-20">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-px w-7 bg-loop" aria-hidden="true" />
              Check your coverage
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-[3.5rem]">
              Tell us where you are.
              <br />
              We'll tell you what you can do<span className="text-loop">.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
              Search your address, use your current location, or choose your area. We'll confirm FibreHood's status at
              your location and take you straight to the right next step.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Checker + result + quiet map, then network ledger */}
      <Suspense
        fallback={
          <div className="container-lattice">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
              <div className="h-[320px] animate-pulse rounded-xl border border-line bg-fog/40" />
              <div className="h-[380px] animate-pulse rounded-xl border border-line bg-fog/40 sm:h-[460px] lg:h-[520px]" />
            </div>
          </div>
        }
      >
        <CoverageExplorer />
      </Suspense>

      {/* Support — a quiet ledger row, not a heavy card */}
      <section className="container-lattice pb-20 pt-4">
        <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">Need a hand?</span>
            <p className="mt-3 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Can't find your area? Talk to FibreHood.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              If your building or street isn't listed, our team can check it manually and tell you exactly where you stand.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
            <a
              href={WA_INTENTS.support()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-signal"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:bg-fog"
            >
              Contact FibreHood <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-ink-soft/80">
          Coverage areas shown here use a development footprint model so the full discovery experience can be
          demonstrated. They are not a guarantee of live service — confirmed availability is provided when you request a
          connection.
        </p>
      </section>
    </>
  );
}