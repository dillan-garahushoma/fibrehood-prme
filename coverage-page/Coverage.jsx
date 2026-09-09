import React, { Suspense, lazy } from "react";
import { Info } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { CoverageSteps } from "@/components/coverage/CoverageSteps";
import { RegisterInterest } from "@/components/coverage/RegisterInterest";

const CoverageExplorer = lazy(() => import("@/components/coverage/CoverageExplorer"));

export default function Coverage() {
  return (
    <>
      {/* Premium coverage hero — transitions directly into the interactive map */}
      <section className="relative overflow-hidden bg-signal text-paper">
        <div className="bg-grid-dark absolute inset-0 opacity-[0.18]" aria-hidden="true" />
        <div className="container-lattice relative pt-28 pb-8 sm:pt-32">
          <Reveal>
            <SectionLabel tone="light">Check your coverage</SectionLabel>
            <h1 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
              Is FibreHood available at your home?
            </h1>
            <p className="mt-4 max-w-xl text-paper/75">
              Enter your address or use your current location to see whether FibreHood fibre is available in your area.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Interactive coverage discovery — the centrepiece */}
      <section className="container-lattice mt-8 sm:mt-10">
        <Suspense
          fallback={<div className="h-[520px] w-full animate-pulse rounded-3xl border border-line bg-fog sm:h-[600px] lg:h-[680px]" />}
        >
          <CoverageExplorer />
        </Suspense>
      </section>

      <CoverageSteps />
      <RegisterInterest />

      <section className="container-lattice pb-20">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-fog p-5 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
          <p>
            Coverage areas shown here use a development footprint model so the full discovery experience can be
            demonstrated. They are not a guarantee of live service — confirmed availability is provided when you
            request a connection.
          </p>
        </div>
      </section>
    </>
  );
}