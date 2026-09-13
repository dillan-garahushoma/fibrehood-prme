import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PATHWAYS } from "@/data/contactContent";

function Pathway({ p }) {
  const cls = "group flex h-full items-start gap-4 bg-paper p-7 transition-colors hover:bg-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";
  const inner = (
    <>
      <p.icon className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" strokeWidth={1.6} />
      <div>
        <h3 className="text-base font-semibold text-ink">{p.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.copy}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
          {p.action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </>
  );
  return p.to
    ? <Link to={p.to} className={cls}>{inner}</Link>
    : <a href={p.href} className={cls}>{inner}</a>;
}

export default function ChooseHelp() {
  return (
    <section aria-labelledby="choose-help-heading" className="bg-paper py-24 lg:py-32">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>Choose How We Can Help</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="choose-help-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Tell us what you need &mdash; we&rsquo;ll point you to the right team.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
              Every enquiry is different. Start here and we&rsquo;ll get you to the fastest route &mdash; a coverage check, a support channel, or a quick message.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {PATHWAYS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="h-full">
              <Pathway p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}