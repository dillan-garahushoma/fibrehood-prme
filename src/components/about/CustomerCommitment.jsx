import { Reveal } from "@/components/common/Reveal";
import { COMMITMENTS } from "@/data/aboutContent";

export default function CustomerCommitment() {
  return (
    <section aria-labelledby="commitment-heading" className="bg-signal py-24 text-paper lg:py-32">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-loop">
              <span className="h-px w-8 bg-loop" aria-hidden="true" /> Our Commitment to Customers
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="commitment-heading" className="ff-serif text-3xl font-medium leading-tight text-paper sm:text-4xl lg:text-5xl">
              What you can expect from us &mdash; every time.
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 divide-y divide-paper/10 border-y border-paper/10">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="grid gap-2 py-7 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
                <span className="font-mono text-sm text-loop/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-paper">{c.title}</h3>
                <p className="text-sm leading-relaxed text-paper/70">{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}