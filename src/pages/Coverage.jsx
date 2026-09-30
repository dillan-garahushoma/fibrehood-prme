import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { CoverageChecker } from "@/components/coverage/CoverageChecker";
import { IMAGES } from "@/data/images";
import { WA_INTENTS } from "@/data/site";

const CoverageExplorer = lazy(() => import("@/components/coverage/CoverageExplorer"));

export default function Coverage() {
  const [checkerExpanded, setCheckerExpanded] = useState(false);

  return (
    <>
      {/* Hero — full bleed layout with panoramic city background */}
      <SplitHero
        image={IMAGES.coverageAerial}
        alt="Fibrehood fibre network coverage across the city"
        eyebrow="Check your coverage"
        title="Is your neighbourhood a Fibrehood?"
        subtitle="We are building FTTH (Fibre-To-The-Home networks throughout all locations for the country. Find out if your area is connected and register your interest."
        fullBleed={true}
        imageClassName="object-cover object-[50%_center] sm:object-[65%_center]"
        bottomContentExpanded={checkerExpanded}
        bottomContent={
          <div className="mx-auto w-full max-w-3xl">
            <div className="relative rounded-2xl border border-paper/10 bg-signal-deep/50 p-1 backdrop-blur-md">
              <CoverageChecker
                variant="hero"
                source="coverage-hero"
                onExpandedChange={setCheckerExpanded}
              />
            </div>
          </div>
        }
      />

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
              Can't find your area? Talk to Fibrehood.
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 text-sm font-semibold text-signal transition-colors hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:bg-fog"
            >
              Contact Fibrehood <ArrowRight className="h-4 w-4" />
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