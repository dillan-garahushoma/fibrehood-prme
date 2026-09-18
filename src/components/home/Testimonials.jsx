import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Info } from "lucide-react";
import { DEV_TESTIMONIALS, TRUST_BADGES } from "@/data/testimonials";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < rating ? "fill-loop text-loop" : "fill-line text-line")}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <li className="w-full max-w-xs cursor-default select-none rounded-3xl border border-line bg-paper p-6 shadow-signal transition-all duration-300 hover:-translate-y-1 hover:border-loop/40 hover:shadow-lift">
      <Stars rating={t.rating} />
      <blockquote className="mt-4 text-sm leading-relaxed text-ink">"{t.review}"</blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <img
          src={t.avatar}
          alt={`Avatar of ${t.name}`}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover ring-2 ring-fog"
        />
        <div className="flex flex-col">
          <cite className="text-sm font-semibold not-italic text-signal">{t.name}</cite>
          <span className="text-xs text-ink-soft">{t.role} · {t.location}</span>
        </div>
      </footer>
    </li>
  );
}

function TestimonialsColumn({ items, duration = 18, className }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      <motion.ul
        animate={reduce ? undefined : { y: "-50%" }}
        transition={reduce ? undefined : { duration, repeat: Infinity, ease: "linear" }}
        className="m-0 flex list-none flex-col gap-6 p-0 pb-6"
      >
        {[0, 1].map((dup) =>
          items.map((t) => <TestimonialCard key={`${dup}-${t.id}`} t={t} />)
        )}
      </motion.ul>
    </div>
  );
}

export function Testimonials() {
  const cols = [
    DEV_TESTIMONIALS.slice(0, 3),
    DEV_TESTIMONIALS.slice(3, 6),
    DEV_TESTIMONIALS.slice(6, 9),
  ];

  return (
    <section className="relative overflow-hidden pb-20 pt-6 md:pb-28 md:pt-10">
      <div className="container-lattice">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            What connections feel like in practice.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Honest notes from homes and businesses on the Fibrehood network.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <Info className="h-3.5 w-3.5" /> Sample testimonials — development content.
          </p>
        </Reveal>

        <div className="mt-14 flex max-h-[680px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <TestimonialsColumn items={cols[0]} duration={18} />
          <TestimonialsColumn items={cols[1]} duration={22} className="hidden md:block" />
          <TestimonialsColumn items={cols[2]} duration={20} className="hidden lg:block" />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
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