import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { WA_INTENTS } from "@/data/site";

export default function Portal() {
  return (
    <>
      <PageHero
        eyebrow="Client portal"
        title="Your connection, one login away."
        subtitle="The FibreHood client portal is on its way — one place for your plan, usage, billing, and support. For now, sign in below or reach us directly."
      />

      <section className="py-16 md:py-24">
        <Reveal className="container-lattice">
          <div className="mx-auto max-w-xl rounded-3xl border border-line bg-paper p-8 text-center shadow-lift sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-signal">Already a FibreHood client?</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Sign in to manage your connection. Portal features are rolling out step by step —
              anything you can't do here yet, our team handles with you directly.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
            >
              Sign in to the portal <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Need a hand right now?</p>
              <a
                href={WA_INTENTS.support()}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-loop px-5 py-2.5 text-sm font-semibold text-signal"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp support
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}