import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Headset, Mail, Megaphone, MessageCircle, Receipt, Shield } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";
import { IMAGES } from "@/data/images";
import { WA_INTENTS } from "@/data/site";

const serviceOptions = [
  "Check fibre coverage",
  "New connection",
  "Existing connection support",
  "Billing question",
  "Business enquiry",
  "Partnership enquiry",
  "Other",
];

const contactDetails = [
  { icon: Building2, label: "FibreHood Business", value: "+263 780 797 695", href: "tel:+263780797695" },
  { icon: Receipt, label: "Billing", value: "+263 780 257 425", href: "tel:+263780257425" },
  { icon: Headset, label: "Customer Support", value: "+263 784 416 605", href: "tel:+263784416605" },
  { icon: Megaphone, label: "Sales & Marketing", value: "+263 780 711 337", href: "tel:+263780711337" },
  { icon: Mail, label: "Support Email", value: "support@fibrehood.co.zw", href: "mailto:support@fibrehood.co.zw" },
  { icon: Mail, label: "Sales Email", value: "sales@fibrehood.co.zw", href: "mailto:sales@fibrehood.co.zw" },
];

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-paper px-3.5 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/15";

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", area: "", service: "", message: "" });

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitStatus("submitting");
    try {
      const leads = JSON.parse(localStorage.getItem("fibrehood_leads") || "[]");
      leads.push({ ...formData, source: "fibrehood-contact", submitted_at: new Date().toISOString() });
      localStorage.setItem("fibrehood_leads", JSON.stringify(leads));
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <>
      <SplitHero
        image={IMAGES.contactHero}
        alt="FibreHood customer support specialist"
        eyebrow="Contact"
        title="Let's get you connected."
        subtitle="Tell us who you are and what you need. We'll route it to the right team — or reach us instantly on WhatsApp."
      />

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-lattice">
          {/* Masthead */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal><SectionLabel>Official channels</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
                We're here to help you get connected.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                Connect with FibreHood directly. Our teams are ready to help with your fibre connection, account, coverage and business needs.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Form */}
            <Reveal>
              <div className="rounded-2xl border border-line bg-card p-7 shadow-signal sm:p-9">
                <h3 className="font-display text-xl font-bold text-ink">Send us an enquiry</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Tell us what you need and we'll route your enquiry to the right FibreHood team.
                </p>

                {submitStatus === "success" ? (
                  <div className="mt-7 rounded-xl border border-loop/40 bg-loop/5 p-6" role="status">
                    <h4 className="font-display text-lg font-bold text-ink">Thanks for reaching out.</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      Your enquiry has been received by FibreHood. We'll be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form name="contact" onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                          Full name
                        </label>
                        <input id="contact-name" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                          Phone number
                        </label>
                        <input id="contact-phone" type="tel" name="phone" autoComplete="tel" required value={formData.phone} onChange={handleChange} className={fieldClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                        Email address
                      </label>
                      <input id="contact-email" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="contact-area" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                        Area or suburb
                      </label>
                      <input id="contact-area" name="area" autoComplete="address-level2" value={formData.area} onChange={handleChange} className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                        How can we help?
                      </label>
                      <select id="contact-service" name="service" value={formData.service} onChange={handleChange} className={`${fieldClass} cursor-pointer`}>
                        <option value="">Select an enquiry type</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-ink-soft">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[140px] w-full resize-y rounded-xl border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/15"
                      />
                    </div>

                    {submitStatus === "error" && (
                      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4" role="alert">
                        <p className="text-sm font-semibold text-destructive">Something went wrong.</p>
                        <p className="mt-1 text-sm text-ink-soft">Please call or email FibreHood directly.</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-paper transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {submitStatus === "submitting" ? "Sending" : "Send enquiry"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Details */}
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3">
                {contactDetails.map(({ icon: Icon, ...detail }) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="group flex items-start gap-4 rounded-xl border border-line bg-card p-4 transition-colors hover:border-signal/40"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-fog text-signal transition-colors group-hover:bg-loop">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">{detail.label}</span>
                      <span className="mt-0.5 block text-base text-ink transition-colors group-hover:text-signal">{detail.value}</span>
                    </span>
                  </a>
                ))}

                <a
                  href={WA_INTENTS.connect()}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center justify-between gap-3 rounded-xl bg-signal p-5 text-paper transition-colors hover:bg-signal-deep"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-loop">Fastest route</span>
                    <span className="mt-0.5 block font-display text-base font-bold">Chat on WhatsApp</span>
                  </span>
                  <MessageCircle className="h-5 w-5 text-loop" />
                </a>

                <div className="mt-2 border-l-2 border-loop/60 bg-fog/60 p-4 text-xs leading-relaxed text-ink-soft">
                  <strong className="block text-sm font-semibold text-ink">Choose the right team</strong>
                  Technical help → Customer Support. Payments → Billing. New connection or coverage → Sales & Marketing.
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-14 flex max-w-lg items-center justify-center gap-2 text-center text-xs leading-relaxed text-ink-soft/70">
              <Shield className="h-4 w-4 flex-shrink-0" />
              Your information is kept private and used only to respond to your enquiry.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-signal-deep py-20 lg:py-28">
        <div className="container-lattice text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.15] text-paper sm:text-4xl">
              Ready to check what fibre reaches you?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/coverage"
                className="inline-flex items-center gap-2 rounded-full bg-loop px-7 py-3 text-sm font-semibold text-signal transition-transform hover:-translate-y-0.5"
              >
                Check your coverage <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/plans"
                className="inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-loop/60 underline-offset-8 transition-colors hover:text-loop"
              >
                View plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}