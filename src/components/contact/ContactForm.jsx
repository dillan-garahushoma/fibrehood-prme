import { useState } from "react";
import { ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Clock3, Users, Lock } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { submitLead } from "@/lib/leads";
import { ENQUIRY_TYPES } from "@/data/contactContent";

const INITIAL = { name: "", email: "", phone: "", enquiry: "", area: "", customer: "", message: "", consent: false };
const BASE = "h-11 w-full rounded-xl border bg-paper px-3.5 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/15";

const trustPoints = [
  { icon: Clock3, title: "Quick response", copy: "We aim to respond within 24 hours." },
  { icon: Users, title: "Real people", copy: "Speak to a dedicated team." },
  { icon: Lock, title: "Your information is safe", copy: "We only use your details to respond to your enquiry." }
];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter your mobile number.";
  if (!v.enquiry) e.enquiry = "Please choose an enquiry type.";
  if (!v.message.trim()) e.message = "Please tell us how we can help.";
  if (!v.consent) e.consent = "Please consent to being contacted.";
  return e;
}

export default function ContactForm() {
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(e) {
    const { name, value, type, checked } = e.target;
    setData((d) => ({ ...d, [name]: type === "checkbox" ? checked : value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    try {
      const tag = `[${data.enquiry}]${data.customer ? ` · ${data.customer === "yes" ? "Existing customer" : "New"}` : ""}`;
      await submitLead({
        name: data.name, phone: data.phone, email: data.email, address: data.area,
        message: `${tag} ${data.message}`.trim(), source: "contact", intent: "contact", consent: data.consent
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const border = (f) => (errors[f] ? "border-destructive" : "border-line");

  if (status === "success") {
    return (
      <section id="send-message" aria-labelledby="form-heading" className="fh-contact__form-section">
        <div className="container-lattice">
          <div className="fh-contact__form-grid">
            <div className="fh-contact__form-copy">
              <SectionLabel>SEND US A MESSAGE</SectionLabel>
              <h2 id="form-heading" className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tighter text-signal sm:text-4xl">
                We’re here to{" "}
                <span className="underline decoration-loop decoration-4 underline-offset-[6px]">help.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
                Tell us what you need and we’ll route it to the right FibreHood team.
              </p>
              <TrustPoints tone="ink" />
            </div>

            <div className="fh-contact__form-panel">
              <CheckCircle2 className="h-12 w-12 text-signal" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="fh-contact__form-title mt-4">Thanks for reaching out.</h3>
              <p className="fh-contact__form-lede mt-2">Your enquiry has been received by FibreHood. We’ll be in touch soon.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="send-message" aria-labelledby="form-heading" className="fh-contact__form-section">
      <div className="container-lattice">
        <div className="fh-contact__form-grid">
          <div className="fh-contact__form-copy">
            <SectionLabel>SEND US A MESSAGE</SectionLabel>
            <h2 id="form-heading" className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tighter text-signal sm:text-4xl">
              We’re here to{" "}
              <span className="underline decoration-loop decoration-4 underline-offset-[6px]">help.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Tell us what you need and we’ll route it to the right FibreHood team.
            </p>
            <TrustPoints tone="ink" />
          </div>

          <div className="fh-contact__form-panel">
            <Reveal>
              <h3 className="fh-contact__form-title">Send us an enquiry.</h3>
            </Reveal>

            {Object.keys(errors).length > 0 && (
              <div role="alert" className="mt-8 flex items-start gap-3 border border-destructive bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-none text-destructive" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Please fix the following:</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-ink-soft">
                    {Object.values(errors).map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {status === "error" && (
              <div role="alert" className="mt-8 border border-destructive bg-destructive/5 p-4 text-sm text-destructive">
                Something went wrong sending your enquiry. Please try again, or reach us by phone or WhatsApp.
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" autoComplete="name" value={data.name} onChange={update} error={errors.name} border={border} required />
                <Field id="email" label="Email address" type="email" autoComplete="email" value={data.email} onChange={update} error={errors.email} border={border} required />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message <span className="text-destructive"> *</span></label>
                <textarea id="message" name="message" rows={5} value={data.message} onChange={update}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
                  className={`${BASE} ${border("message")} resize-y py-3`} placeholder="Tell us how we can help…" />
                {errors.message && <p id="message-err" className="mt-1 text-sm text-destructive">{errors.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="phone" label="Mobile number" type="tel" autoComplete="tel" value={data.phone} onChange={update} error={errors.phone} border={border} required />
                <SelectField id="enquiry" label="Enquiry type" value={data.enquiry} onChange={update} error={errors.enquiry} options={ENQUIRY_TYPES} border={border} required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="area" label="Area / suburb" autoComplete="address-level2" value={data.area} onChange={update} border={border} />
                <SelectField id="customer" label="Are you an existing customer?" value={data.customer} onChange={update}
                  options={[{ value: "", label: "Select…" }, { value: "yes", label: "Yes" }, { value: "no", label: "No, I’m new" }]} border={border} />
              </div>

              <div>
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="consent" checked={data.consent} onChange={update}
                    aria-invalid={!!errors.consent} className="mt-1 h-4 w-4 rounded border-line text-signal focus:ring-signal" />
                  <span className="text-sm text-ink-soft">I consent to FibreHood contacting me about this enquiry.</span>
                </label>
                {errors.consent && <p className="mt-1 pl-7 text-sm text-destructive">{errors.consent}</p>}
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal transition-colors hover:bg-loop-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop disabled:opacity-70 sm:w-auto">
                  {status === "submitting" ? "Sending…" : "Send message"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                  We’ll get back to you as soon as possible — usually within 24 hours.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPoints({ tone = "light" }) {
  return (
    <ul className={`fh-contact__benefits${tone === "ink" ? " fh-contact__benefits--ink" : ""}`}>
      {trustPoints.map(({ icon: Icon, title, copy }) => (
        <li key={title} className="fh-contact__benefit">
          <Icon className="fh-contact__benefit-icon" size={18} aria-hidden="true" />
          <div>
            <p className="fh-contact__benefit-title">{title}</p>
            <p className="fh-contact__benefit-body">{copy}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Field({ id, label, type = "text", autoComplete, value, onChange, error, border, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} value={value} onChange={onChange}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${BASE} ${border(id)}`} />
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, error, options, border, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}{required && <span className="text-destructive"> *</span>}</label>
      <select id={id} name={id} value={value} onChange={onChange}
        aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${BASE} ${border(id)}`}>
        {options.map((o) => <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>{typeof o === "string" ? o : o.label}</option>)}
      </select>
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}