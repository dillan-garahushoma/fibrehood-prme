import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";

export function LegalLayout({ title, updated, intro, children }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={intro} minHeight="auto" />
      <section className="py-16 md:py-20">
        <Reveal className="container-lattice max-w-3xl">
          {updated && <p className="text-sm text-ink-soft">Last updated: {updated}</p>}
          <div className="legal-content mt-8 space-y-8 text-base leading-relaxed text-ink">
            {children}
          </div>
        </Reveal>
      </section>
    </>
  );
}

export function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-signal">{title}</h2>
      <div className="mt-3 space-y-3 text-ink-soft">{children}</div>
    </div>
  );
}

export default LegalLayout;