import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";

const COMMITMENTS = [
  {
    title: "Straightforward plans",
    copy: "The price you see is the price you pay. Speeds and terms in plain language.",
  },
  {
    title: "Connectivity you can rely on",
    copy: "A network built to stay up — and honest about the rare times it doesn't.",
  },
  {
    title: "Support that actually responds",
    copy: "Message us and a person replies — with answers, not a ticket number.",
  },
  {
    title: "Honest communication",
    copy: "If we don't cover you yet, we say so. If something breaks, you hear it from us first.",
  },
  {
    title: "A network that keeps improving",
    copy: "We keep investing in the infrastructure — upgrades and expansion, not just repairs.",
  },
];

/**
 * Our Commitment to Customers — a pledge-style trust section: a signed
 * statement on the left, the commitments as a hairline ledger on the right.
 */
export function AboutCommitment() {
  return (
    <section className="bg-fog py-24 lg:py-36">
      <div className="container-lattice">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── The pledge ──────────────────────────────────────────── */}
          <div className="lg:pt-4">
            <Reveal>
              <SectionLabel>Our Commitment To Customers</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[15ch] font-heading text-3xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
                What you can hold us to<span className="text-loop">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-[1.8] text-ink-soft">
                Trust isn&rsquo;t claimed, it&rsquo;s committed to — in writing, in plain
                language, and in the way we run the network every day. This is what every
                FibreHood customer is entitled to expect.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-end gap-5 border-t border-line pt-8">
                <LoopMark className="h-7 w-12 shrink-0 pb-0.5" animated />
                <div>
                  <p className="font-heading text-sm font-bold tracking-tight text-ink">FibreHood</p>
                  <p className="text-xs text-ink-soft/60">Signed by the people who run the network</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Commitment ledger ────────────────────────────────────── */}
          <div>
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={0.06 * i} amount={0.4}>
                <div className="border-t border-line py-7 first:border-t-0 first:pt-0 lg:py-8">
                  <div className="flex items-baseline gap-4">
                    <span className="display-mono text-[11px] text-amber-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold tracking-tight text-ink">{c.title}</h3>
                      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">{c.copy}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCommitment;
