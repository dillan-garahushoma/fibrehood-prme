import React from "react";
import { Link } from "react-router-dom";
import { Check, Clock, MapPin, ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { CoverageChecker } from "@/components/coverage/CoverageChecker";
import { LoopMark } from "@/components/brand/LoopMark";
import { Reveal } from "@/components/common/Reveal";

const OUTCOMES = [
  { state: "Covered", Icon: Check, tone: "text-loop", body: "Your address is live on the FibreHood footprint. See compatible plans and request a connection." },
  { state: "Near coverage", Icon: Clock, tone: "text-amber-400", body: "Infrastructure is planned nearby. Register your interest and we'll confirm as build progresses." },
  { state: "Not yet available", Icon: MapPin, tone: "text-paper/70", body: "Your street isn't on the footprint yet. Register interest and we'll keep you informed about rollouts." }
];

export default function Coverage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Coverage discovery"
        title="Check what fibre reaches your address."
        subtitle="Enter your street address or postal code. We'll show you what's available — honestly — and the next step from there."
      />

      <section className="relative -mt-10 pb-20">
        <div className="container-lattice">
          <Reveal className="rounded-2xl border border-line bg-paper p-4 shadow-lift sm:p-6">
            <CoverageChecker variant="page" source="coverage" />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.state} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-fog p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-signal text-paper">
                    <o.Icon className={`h-5 w-5 ${o.tone}`} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-signal">{o.state}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-paper p-5 text-sm text-ink-soft">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
            <p>
              Coverage results shown here use a development footprint model so the full journey
              can be demonstrated. They are not a guarantee of live service — confirmed
              availability is provided when you request a connection.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <LoopMark className="h-7 w-12" animated />
            <p className="text-sm text-ink-soft">Ready to choose?</p>
            <Link to="/plans" className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper hover:bg-signal-deep">
              Explore fibre plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}