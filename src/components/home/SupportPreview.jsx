import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { SUPPORT_CATEGORIES, SUPPORT_ARTICLES } from "@/data/support";
import { WA_INTENTS } from "@/data/site";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

const ICONS = {
  "wifi-off": "WifiOff", slow: "Gauge", "router-wifi": "Router", installation: "Wrench",
  coverage: "MapPin", billing: "Receipt", contact: "Phone"
};

export function SupportPreview() {
  const featured = SUPPORT_ARTICLES.filter((a) => a.featured).slice(0, 4);
  return (
    <section className="py-20 md:py-28">
      <div className="container-lattice">
        <div className="max-w-xl">
          <SectionLabel>Support preview</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
            Find an answer, fast.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Self-serve the common issues, or escalate to a human on WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <Link
                to={`/faq?cat=${a.category}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-signal"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                  {SUPPORT_CATEGORIES.find((c) => c.id === a.category)?.label}
                </span>
                <h3 className="mt-2 font-semibold text-signal">{a.title}</h3>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-signal group-hover:text-loop">
                  Find an answer <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-signal p-6 text-paper sm:flex-row sm:p-8">
          <div>
            <h3 className="font-heading text-xl font-bold">Didn't find it?</h3>
            <p className="mt-1 text-sm text-paper/70">Search the knowledge base or speak to a human.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/faq" className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-signal hover:bg-paper/90">
              <Search className="h-4 w-4" /> Search support
            </Link>
            <a href={WA_INTENTS.support()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-5 py-3 text-sm font-semibold text-signal hover:scale-[1.01]">
              <MessageCircle className="h-4 w-4" /> WhatsApp support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportPreview;