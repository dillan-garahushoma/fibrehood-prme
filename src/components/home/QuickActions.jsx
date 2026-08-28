import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ListChecks, Plug, LifeBuoy, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const ACTIONS = [
  { icon: MapPin, label: "Check Coverage", to: "/coverage", detail: "See what's live at your address" },
  { icon: ListChecks, label: "View Fibre Plans", to: "/plans", detail: "Compare home & business speeds" },
  { icon: Plug, label: "Get Connected", to: "/contact", detail: "Request your connection" },
  { icon: LifeBuoy, label: "Need Help?", to: "/faq", detail: "Find answers fast" }
];

export function QuickActions() {
  return (
    <section className="relative z-10 -mt-10">
      <div className="container-lattice">
        <Reveal className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-paper p-3 shadow-lift md:grid-cols-4 md:gap-4 md:p-4">
          {ACTIONS.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-fog md:p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-signal text-paper transition-transform group-hover:scale-105">
                <a.icon className="h-5 w-5 text-loop" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-sm font-semibold text-signal">
                  {a.label}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </span>
                <span className="block text-xs text-ink-soft">{a.detail}</span>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default QuickActions;