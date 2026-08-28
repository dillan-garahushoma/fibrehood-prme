import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PLANS } from "@/data/plans";
import { PlanCard } from "@/components/plans/PlanCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

export function PlanPreview() {
  const featured = PLANS.filter((p) => ["home-50", "home-100", "biz-100", "biz-250"].includes(p.id));
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <SectionLabel>Fibre plan discovery</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              Which package is right for you?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Scan by speed and price, home or business. Packages shown here are indicative —
              your coverage check confirms what's available at your address.
            </p>
          </div>
          <Link to="/plans" className="inline-flex items-center gap-2 rounded-full border border-signal px-5 py-3 text-sm font-semibold text-signal hover:bg-fog">
            Compare all plans <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <PlanCard plan={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlanPreview;