import { useState } from "react";
import { ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { submitLead } from "@/lib/leads";
import { ENQUIRY_TYPES } from "@/data/contactContent";

const INITIAL = { name: "", email: "", phone: "", enquiry: "", area: "", customer: "", message: "", consent: false };
const BASE = "h-11 w-full border bg-paper px-3.5 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/15";

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
      <section id="send-message" aria-labelledby="form-heading" className="bg-paper py-24 lg:py-32">
        <div className="container-lattice max-w-2xl text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-signal" aria-hidden="true" strokeWidth={1.5} />
          <h2 id="form-heading" className="ff-serif mt-5 text-3xl font-medium text-ink">Thanks for reaching out.</h2>
          <p className="mt-3 text-base text-ink-soft">Your enquiry has been received by FibreHood. We&rsquo;ll be in touch soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="send-message" aria-labelledby="form-heading" className="bg-paper py-24 lg:py-32">
      <div className="container-lattice max-w-2xl">
        <Reveal><SectionLabel>Send Us a Message</SectionLabel></Reveal>
        <Reveal delay={0.08}>
          <h2 id="form-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">Send us an enquiry.</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-base text-ink-soft">Tell us what you need and we&rsquo;ll route it to the right FibreHood team.</p>
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
            <Field id="phone" label="Mobile number" type="tel" autoComplete="tel" value={data.phone} onChange={update} error={errors.phone} border={border} required />
          </div>
          <Field id="email" label="Email address" type="email" autoComplete="email" value={data.email} onChange={update} error={errors.email} border={border} required />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="enquiry" label="Enquiry type" value={data.enquiry} onChange={update} error={errors.enquiry} options={ENQUIRY_TYPES} border={border} required />
            <Field id="area" label="Area / suburb" autoComplete="address-level2" value={data.area} onChange={update} border={border} />
          </div>
          <SelectField id="customer" label="Are you an existing customer?" value={data.customer} onChange={update}
            options={[{ value: "", label: "Select…" }, { value: "yes", label: "Yes" }, { value: "no", label: "No, I’m new" }]} border={border} />

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message <span className="text-destructive">*</span></label>
            <textarea id="message" name="message" rows={5} value={data.message} onChange={update}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
              className={`${BASE} ${border("message")} resize-y py-3`} placeholder="Tell us how we can help…" />
            {errors.message && <p id="message-err" className="mt-1 text-sm text-destructive">{errors.message}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="consent" checked={data.consent} onChange={update}
                aria-invalid={!!errors.consent} className="mt-1 h-4 w-4 rounded border-line text-signal focus:ring-signal" />
              <span className="text-sm text-ink-soft">I consent to FibreHood contacting me about this enquiry.</span>
            </label>
            {errors.consent && <p className="mt-1 pl-7 text-sm text-destructive">{errors.consent}</p>}
          </div>

          <button type="submit" disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 bg-signal px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:opacity-70 sm:w-auto">
            {status === "submitting" ? "Sending…" : "Send enquiry"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="flex items-center gap-2 text-xs text-ink-soft">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Your information is kept private and used only to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
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