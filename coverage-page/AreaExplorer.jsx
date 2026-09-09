import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

export function AreaExplorer({ areas, activeAreaId, onSelect }) {
  return (
    <div className="mt-6">
      <div>
        <SectionLabel>Explore FibreHood Coverage</SectionLabel>
        <h3 className="mt-3 font-heading text-xl font-bold text-signal sm:text-2xl">See where FibreHood is currently available</h3>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {areas.map((a, i) => {
          const active = activeAreaId === a.id;
          return (
            <Reveal key={a.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => onSelect(a)}
                className={cn(
                  "group flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-all",
                  active ? "border-loop bg-signal text-paper shadow-lift" : "border-line bg-paper hover:border-signal/40 hover:shadow-signal"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                      active ? "bg-loop text-signal" : "bg-signal/10 text-signal"
                    )}
                  >
                    <MapPin className="h-5 w-5" />
                  </span>
                  <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-0.5", active ? "text-loop" : "text-ink-soft")} />
                </div>
                <h4 className={cn("mt-4 font-heading text-lg font-bold", active ? "text-paper" : "text-signal")}>{a.name}</h4>
                <p className={cn("mt-1 text-sm", active ? "text-paper/75" : "text-ink-soft")}>
                  FibreHood Fibre Available · {a.metadata.region}
                </p>
                <p className={cn("mt-3 text-xs", active ? "text-paper/60" : "text-ink-soft/80")}>
                  Check your exact address to confirm availability and view connection options.
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default AreaExplorer;