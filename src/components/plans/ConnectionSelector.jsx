import React from "react";
import { Home, Building2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    target: "#home-fibre",
    blurb: "Everyday connectivity for households.",
    activation: "Activation from US$65"
  },
  {
    id: "business",
    label: "SME",
    icon: Building2,
    target: "#sme-fibre",
    blurb: "Symmetric connectivity for growing businesses.",
    activation: "US$100 activation fee"
  }
];

export function ConnectionSelector() {
  return (
    <section className="bg-paper">
      <div className="container-lattice py-14 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-ink-soft/30" />
            Choose your connection
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            What kind of connection do you need?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Pick where you're connecting and we'll show you the right fibre
            packages — then check availability at your address.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <a
                key={opt.id}
                href={opt.target}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-line bg-paper p-6 transition-all",
                  "hover:border-signal/40 hover:shadow-signal"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fog text-signal">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-heading text-xl font-bold text-signal">{opt.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-ink-soft/40 transition-transform group-hover:translate-x-1 group-hover:text-signal" />
                </div>
                <p className="mt-4 text-sm text-ink-soft">{opt.blurb}</p>
                <p className="mt-2 text-xs font-medium text-signal/80">{opt.activation}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ConnectionSelector;