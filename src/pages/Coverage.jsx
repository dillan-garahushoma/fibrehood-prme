import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import { WA_INTENTS } from "@/data/site";

const CoverageExplorer = lazy(() => import("@/components/coverage/CoverageExplorer"));

export default function Coverage() {
  return (
    <>
      <SplitHero
        image={IMAGES.coverageAerial}
        alt="FibreHood fibre network coverage"
        eyebrow="Check your coverage"
        title={
          <>
            Tell us where you are.
            <br />
            We'll tell you what you can do<span className="text-loop">.</span>
          </>
        }
        subtitle="Search your address, use your current location, or choose your area. We'll confirm FibreHood's status at your location and take you straight to the right next step."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#checker"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
          >
            Check your address <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/plans"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            View plans
          </Link>
        </div>
      </SplitHero>

      {/* Checker + result + network ledger */}
      <div id="checker">
        <Suspense
          fallback={
            <div className="container-lattice py-16">
              <div className="mx-auto h-[320px] max-w-xl animate-pulse rounded-xl border border-line bg-fog/40" />
            </div>
          }
        >
          <CoverageExplorer />
        </Suspense>
      </div>

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