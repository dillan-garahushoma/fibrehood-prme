import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SELF_SERVICE } from "@/data/contactContent";

export default function BeforeContact() {
  return (
    <section aria-labelledby="before-heading" className="bg-fog py-24 lg:py-32">
      <div className="container-lattice max-w-3xl">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>Before You Contact Us</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="before-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              You may be looking for&hellip;
            </h2>
          </Reveal>
        </div>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {SELF_SERVICE.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <li>
                <Link to={s.to} className="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal">
                  <div>
                    <p className="text-base font-semibold text-ink">{s.label}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{s.copy}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-none text-signal transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}