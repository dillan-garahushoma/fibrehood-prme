import React, { Suspense, lazy } from "react";
import { Info, MessageCircle, Phone } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { WA_INTENTS } from "@/data/site";

const CoverageExplorer = lazy(() => import("@/components/coverage/CoverageExplorer"));

export default function Coverage() {
  return (
    <>
      {/* Hero — one job: tell us where you are */}
      <section className="relative overflow-hidden bg-signal text-paper">
        <div className="bg-grid-dark absolute inset-0 opacity-[0.18]" aria-hidden="true" />
        <div className="container-lattice relative pb-24 pt-28 sm:pt-32 lg:pb-28">
          <Reveal className="max-w-2xl">
            <SectionLabel tone="light">Check your coverage</SectionLabel>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter sm:text-5xl lg:text-[3.5rem]">
              Tell us where you are.
              <br />
              <span className="text-loop">We'll tell you what you can do.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/75">
              Search your address, use your current location, or choose your area. We'll confirm FibreHood's status at
              your location and take you straight to the right next step.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Checker + result + map, then network exploration */}
      <Suspense
        fallback={
          <div className="container-lattice -mt-10 sm:-mt-14">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
              <div className="h-[300px] animate-pulse rounded-2xl border border-line bg-paper" />
              <div className="h-[380px] animate-pulse rounded-2xl border border-line bg-fog sm:h-[460px] lg:h-[560px]" />
            </div>
          </div>
        }
      >
        <CoverageExplorer />
      </Suspense>

      {/* Support CTA */}
      <section className="container-lattice pb-8">
        <div className="grid gap-6 rounded-2xl border border-line bg-paper p-7 shadow-signal sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <SectionLabel>Need a hand?</SectionLabel>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tighter text-signal sm:text-3xl">
              Can't find your area? Talk to FibreHood.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
              If your building or street isn't listed, our team can check it manually and tell you exactly where you
              stand.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={WA_INTENTS.support()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-loop px-6 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-6 text-sm font-semibold text-ink transition-colors hover:bg-fog"
            >
              <Phone className="h-4 w-4" /> Contact FibreHood
            </a>
          </div>
        </div>
      </section>

      <section className="container-lattice pb-20 pt-8">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-fog p-5 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
          <p>
            Coverage areas shown here use a development footprint model so the full discovery experience can be
            demonstrated. They are not a guarantee of live service — confirmed availability is provided when you request
            a connection.
          </p>
        </div>
      </section>
    </>
  );
}