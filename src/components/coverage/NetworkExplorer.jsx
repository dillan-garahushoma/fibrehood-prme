import React from "react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { statusMeta, STATUS_ORDER } from "@/data/coverageStatus";
import { getDeploymentStats, getCoverageUpdatedAt } from "@/lib/coverageService";
import { cn } from "@/lib/utils";

/**
 * Task B — exploring FibreHood's deployment as a hairline ledger, not a card
 * grid. Areas × zones in quiet rows; stats as one inline mono line.
 */
export function NetworkExplorer({ areas, activeAreaId, onSelect }) {
  const { counts, total } = getDeploymentStats();
  const updatedAt = getCoverageUpdatedAt();

  return (
    <section className="container-lattice py-20 md:py-28">
      <div className="max-w-2xl">
        <SectionLabel>Explore the network</SectionLabel>
        <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tighter text-ink sm:text-4xl">
          Where FibreHood is building
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Every deployment area and its current phase. Select an area to locate it on the map above.
        </p>
      </div>

      {/* One inline mono line of figures — not a 4-column block */}
      <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        {STATUS_ORDER.map((s) => {
          const meta = statusMeta(s);
          return (
            <span key={s} className="inline-flex items-center gap-2 text-sm">
              <span className={cn("inline-block h-1.5 w-1.5 rounded-full", meta.dotClass)} />
              <span className="display-mono text-lg font-semibold text-ink">{counts[s] || 0}</span>
              <span className="text-xs uppercase tracking-[0.14em] text-ink-soft">{meta.label}</span>
            </span>
          );
        })}
        <span className="ml-auto text-xs text-ink-soft/80">{total} deployment phases</span>
      </div>

      {/* Ledger — hairline-divided rows */}
      <div className="mt-10 border-t border-line">
        {areas.map((area, i) => {
          const meta = statusMeta(area.status);
          const active = activeAreaId === area.id;
          return (
            <Reveal key={area.id} delay={Math.min(i * 0.04, 0.2)}>
              <button
                type="button"
                onClick={() => onSelect(area)}
                className={cn(
                  "group block w-full border-b border-line px-1 py-6 text-left transition-colors",
                  active ? "bg-fog/60" : "hover:bg-fog/40"
                )}
              >
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] sm:items-center sm:gap-8">
                  <div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-ink">{area.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-soft">{area.metadata.region}</p>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {(area.zones || []).map((z) => {
                      const zMeta = statusMeta(z.status);
                      return (
                        <span key={z.id} className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                          <span className={cn("inline-block h-1.5 w-1.5 rounded-full", zMeta.dotClass)} />
                          {z.name}
                          <span className="text-ink-soft/60">· {zMeta.label}</span>
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                      <span className={cn("inline-block h-1.5 w-1.5 rounded-full", meta.dotClass)} />
                      {meta.label}
                    </span>
                    <span className="hidden text-xs text-ink-soft/70 sm:inline">· {area.updatedAt}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {updatedAt && <p className="mt-8 text-xs text-ink-soft">Deployment information last updated {updatedAt}.</p>}
    </section>
  );
}

export default NetworkExplorer;