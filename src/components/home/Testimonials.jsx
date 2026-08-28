import React from "react";
import { Star, Info } from "lucide-react";
import { DEV_TESTIMONIALS, TRUST_BADGES } from "@/data/testimonials";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { cn } from "@/lib/utils";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < rating ? "fill-loop text-loop" : "text-line")}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <SectionLabel>Customer proof</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              What connections feel like in practice.
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full bg-fog px-3 py-1.5 text-xs text-ink-soft">
            <Info className="h-3.5 w-3.5" /> Sample testimonials — development content.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEV_TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-signal">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
                  "{t.review}"
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-signal">{t.name}</span>
                    <span className="text-xs text-ink-soft">{t.date}</span>
                  </div>
                  <span className="text-xs text-ink-soft">{t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="rounded-2xl bg-fog p-5">
              <h3 className="text-sm font-semibold text-signal">{b.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;