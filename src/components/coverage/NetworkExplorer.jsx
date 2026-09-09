import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { statusMeta, STATUS_ORDER } from "@/data/coverageStatus";
import { getDeploymentStats, getCoverageUpdatedAt } from "@/lib/coverageService";
import { cn } from "@/lib/utils";

/**
 * Task B — exploring FibreHood's deployment. Secondary to the coverage check:
 * area selection, zone phases, and statistics derived from the zone records.
 */
export function NetworkExplorer({ areas, activeAreaId, onSelect }) {
  const { counts, total } = getDeploymentStats();
  const updatedAt = getCoverageUpdatedAt();

  return (
    <section className="container-lattice py-16 md:py-24">
      <div className="max-w-2xl">
        <SectionLabel>Explore the network</SectionLabel>
        <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tighter text-signal sm:text-4xl">
          Where FibreHood is building
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Every deployment area and its current phase status. Select an area to locate it on the map above.
        </p>
      </div>

      {/* Derived statistics — counted from zone records, never hardcoded */}
      <div className="mt-10 grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {STATUS_ORDER.map((status, i) => {
          const meta = statusMeta(status);
          return (
            <div
              key={status}
              className={cn(
                "px-5 py-6",
                i < STATUS_ORDER.length - 1 ? "border-b border-line lg:border-b-0 lg:border-r" : "",
                i % 2 === 0 ? "border-r border-line lg:border-r" : ""
              )}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                <span className={cn("h-1.5 w-1.5 rounded-full", meta.dotClass)} />
                {meta.label}
              </span>
              <div className="display-mono mt-2 text-3xl font-semibold text-signal">{counts[status] || 0}</div>
              <div className="mt-1 text-xs text-ink-soft/80">of {total} deployment phases</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, i) => {
          const meta = statusMeta(area.status);
          const active = activeAreaId === area.id;
          return (
            <Reveal key={area.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => onSelect(area)}
                className={cn(
                  "group flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-all",
                  active ? "border-loop bg-signal text-paper shadow-lift" : "border-line bg-paper hover:border-signal/40 hover:shadow-signal"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                      active ? "bg-loop text-signal" : meta.chipClass
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-signal" : meta.dotClass)} />
                    {meta.label}
                  </span>
                  <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5", active ? "text-loop" : "text-ink-soft")} />
                </div>

                <h3 className={cn("mt-4 font-heading text-lg font-bold", active ? "text-paper" : "text-signal")}>{area.name}</h3>
                <p className={cn("mt-0.5 text-xs", active ? "text-paper/65" : "text-ink-soft")}>{area.metadata.region}</p>

                <div className={cn("mt-4 space-y-1.5 border-t pt-3", active ? "border-paper/15" : "border-line")}>
                  {(area.zones || []).map((z) => {
                    const zMeta = statusMeta(z.status);
                    return (
                      <div key={z.id} className="flex items-center justify-between gap-3 text-xs">
                        <span className={active ? "text-paper/75" : "text-ink-soft"}>{z.name}</span>
                        <span className={cn("inline-flex items-center gap-1.5 font-medium", active ? "text-paper" : "text-signal")}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", zMeta.dotClass)} />
                          {zMeta.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className={cn("mt-3 text-[11px]", active ? "text-paper/55" : "text-ink-soft/75")}>
                  Updated {area.updatedAt}
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>

      {updatedAt && (
        <p className="mt-8 text-xs text-ink-soft">Deployment information last updated {updatedAt}.</p>
      )}
    </section>
  );
}

export default NetworkExplorer;