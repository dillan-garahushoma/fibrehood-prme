import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MessageCircle, ChevronDown, Phone } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from "@/components/ui/accordion";
import { SUPPORT_CATEGORIES, SUPPORT_ARTICLES, searchArticles } from "@/data/support";
import { SITE, WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") || "all";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = searchArticles(query);
    if (activeCat !== "all") list = list.filter((a) => a.category === activeCat);
    return list;
  }, [query, activeCat]);

  const setCat = (c) => setParams(c === "all" ? {} : { cat: c }, { replace: true });

  return (
    <>
      <PageHero
        eyebrow="Support & self-service"
        title="Find an answer, fast."
        subtitle="Search common issues, browse by category, and escalate to a human when you need to."
      >
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'slow', 'Wi-Fi', 'installation'…"
            aria-label="Search support articles"
            className="h-12 w-full rounded-full border border-paper/25 bg-paper/10 py-3.5 pl-12 pr-4 text-sm text-paper placeholder:text-paper/50 outline-none focus:border-loop"
          />
        </div>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-lattice">
          {/* Category chips */}
          <Reveal className="flex flex-wrap gap-2">
            {[{ id: "all", label: "All" }, ...SUPPORT_CATEGORIES].map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCat === c.id ? "bg-signal text-paper" : "border border-line bg-paper text-ink-soft hover:bg-fog"
                )}
              >
                {c.label}
              </button>
            ))}
          </Reveal>

          {/* Articles */}
          <Reveal className="mt-10 max-w-3xl">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-line bg-fog p-10 text-center">
                <p className="text-ink-soft">No articles match "{query}". Try another term or reach us directly.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-3">
                {filtered.map((a) => (
                  <AccordionItem key={a.id} value={a.id} className="overflow-hidden rounded-2xl border border-line bg-paper">
                    <AccordionTrigger className="px-5 py-4 text-left font-semibold text-signal hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                          {SUPPORT_CATEGORIES.find((c) => c.id === a.category)?.label}
                        </span>
                        <span>{a.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <ol className="space-y-2.5">
                        {a.steps.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                            <span className="display-mono mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-fog text-xs font-bold text-signal">{i + 1}</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                      <p className="mt-4 text-xs text-ink-soft">Updated {a.updated}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Reveal>

          {/* Escalation */}
          <Reveal className="mt-14 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-heading text-lg font-bold text-signal">Still stuck?</h3>
              <p className="mt-2 text-sm text-ink-soft">Speak to a human architect on WhatsApp — the fastest way to get help.</p>
              <a href={WA_INTENTS.support()} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-loop px-5 py-3 text-sm font-semibold text-signal">
                <MessageCircle className="h-4 w-4" /> WhatsApp support
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-heading text-lg font-bold text-signal">Prefer to call?</h3>
              <p className="mt-2 text-sm text-ink-soft">Reach us during support hours, {SITE.hours}.</p>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 rounded-full border border-signal px-5 py-3 text-sm font-semibold text-signal hover:bg-fog">
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}