import { Reveal } from "@/components/common/Reveal";
import { CONTACT_DETAILS } from "@/data/contactContent";
import { whatsappLink } from "@/data/site";

export default function ContactDetails() {
  return (
    <section aria-labelledby="details-heading" className="bg-fog py-24 lg:py-32">
      <div className="container-lattice">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="h-full bg-signal p-9 text-paper lg:p-14">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-loop">
                <span className="h-px w-8 bg-loop" aria-hidden="true" /> Contact Details
              </p>
              <h2 id="details-heading" className="ff-serif text-3xl font-medium leading-tight text-paper sm:text-4xl">
                Reach the right team, directly.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">
                Choose the route best suited to your need &mdash; each team and channel is listed so your enquiry lands with the people who can help.
              </p>
              <a
                href={whatsappLink("Hi FibreHood, I'd like to get connected.")}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-loop underline decoration-loop/50 underline-offset-8 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full bg-paper p-9 lg:p-14">
              <ul className="divide-y divide-line">
                {CONTACT_DETAILS.map((d) => (
                  <li key={d.label} className="flex items-start gap-4 py-5">
                    <d.icon className="mt-0.5 h-5 w-5 flex-none text-signal" aria-hidden="true" strokeWidth={1.6} />
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">{d.label}</span>
                      <a href={d.href} className="text-base font-medium text-ink transition-colors hover:text-signal">{d.value}</a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-loop pl-4 text-xs leading-relaxed text-ink-soft">
                Choose the support route best suited to your need. We respond as quickly as we can &mdash; your patience is appreciated.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}