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
    <section className="relative z-20 -mt-12 md:-mt-16">
      <div className="container-lattice">
        <Reveal className="relative overflow-hidden rounded-2xl border border-paper/15 bg-signal-deep/40 p-3 shadow-lift backdrop-blur-xl md:p-4">
          {/* loop accent hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-loop/60 to-transparent" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-paper/10 md:p-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-paper/15 bg-paper/5 text-loop transition-transform duration-300 group-hover:scale-105">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-semibold text-paper">
                    {a.label}
                    <ArrowRight className="h-3.5 w-3.5 text-loop opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="block text-xs text-paper/65">{a.detail}</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default QuickActions;