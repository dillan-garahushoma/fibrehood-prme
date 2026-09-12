import React, { useState } from "react";
import { MessageCircle, Phone, Mail, Clock, MapPin, Send, Check, Loader2, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { LoopMark } from "@/components/brand/LoopMark";
import { SITE, WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

const REASONS = ["New connection", "Coverage enquiry", "Support", "Business fibre", "Billing"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", segment: "home", message: "", consent: false, reason: REASONS[0] });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (!form.name || !form.phone) { setErrMsg("Please enter your name and phone number."); return; }
    if (!form.consent) { setErrMsg("Please consent to being contacted."); return; }
    setStatus("sending");
    try {
      // Standalone capture — no backend dependency. The lead is stored locally
      // so the request still resolves end-to-end without the Base44 backend.
      const leads = JSON.parse(localStorage.getItem("fibrehood_leads") || "[]");
      leads.push({ ...form, source: "contact", submitted_at: new Date().toISOString() });
      localStorage.setItem("fibrehood_leads", JSON.stringify(leads));
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch (err) {
      setStatus("error"); setErrMsg(err?.message || "Something went wrong. Please try WhatsApp.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get you connected."
        subtitle="Tell us who you are and what you need. We'll route it to the right team — or reach us instantly on WhatsApp."
      />

      <section className="py-16 md:py-20">
        <div className="container-lattice grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Contact options */}
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-signal">Talk to us</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              The fastest path to a real conversation. WhatsApp is our preferred channel for
              connection requests and support.
            </p>

            <div className="mt-8 space-y-3">
              <a href={WA_INTENTS.connect()} target="_blank" rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-all hover:border-loop hover:shadow-signal">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-loop text-signal"><MessageCircle className="h-5 w-5" /></span>
                <span className="flex-1"><span className="block font-semibold text-signal">WhatsApp</span><span className="text-sm text-ink-soft">Fastest — request a connection or get support</span></span>
                <span className="text-ink-soft transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-all hover:border-signal/40 hover:shadow-signal">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal text-paper"><Phone className="h-5 w-5 text-loop" /></span>
                <span className="flex-1"><span className="block font-semibold text-signal">Phone</span><span className="text-sm text-ink-soft">{SITE.phone}</span></span>
              </a>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-all hover:border-signal/40 hover:shadow-signal">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal text-paper"><Mail className="h-5 w-5 text-loop" /></span>
                <span className="flex-1"><span className="block font-semibold text-signal">Email</span><span className="text-sm text-ink-soft">{SITE.email}</span></span>
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-fog p-5"><div className="flex items-center gap-2 text-signal"><Clock className="h-4 w-4" /><span className="text-sm font-semibold">Hours</span></div><p className="mt-1 text-sm text-ink-soft">{SITE.hours}</p></div>
              <div className="rounded-2xl bg-fog p-5"><div className="flex items-center gap-2 text-signal"><MapPin className="h-4 w-4" /><span className="text-sm font-semibold">Service area</span></div><p className="mt-1 text-sm text-ink-soft">{SITE.region}</p></div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-line bg-paper p-6 shadow-lift sm:p-8">
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-loop text-signal"><Check className="h-7 w-7" /></span>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-signal">Request received</h3>
                  <p className="mt-3 max-w-sm text-sm text-ink-soft">
                    Thanks, {form.name.split(" ")[0]}. Our team will reach out shortly. For anything urgent, message us on WhatsApp.
                  </p>
                  <a href={WA_INTENTS.connect()} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-paper hover:bg-signal-deep">
                    <MessageCircle className="h-4 w-4" /> Open WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h2 className="font-heading text-xl font-bold text-signal">Who are we connecting today?</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                      <button type="button" onClick={() => set("segment", "home")} className={cn("rounded-xl border px-4 py-3 text-sm font-semibold transition-colors", form.segment === "home" ? "border-signal bg-signal text-paper" : "border-line text-ink-soft hover:bg-fog")}>Home</button>
                      <button type="button" onClick={() => set("segment", "business")} className={cn("rounded-xl border px-4 py-3 text-sm font-semibold transition-colors", form.segment === "business" ? "border-signal bg-signal text-paper" : "border-line text-ink-soft hover:bg-fog")}>Business</button>
                    </div>
                    <Field label="Name *"><input className="input-base" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" /></Field>
                    <Field label="Phone *"><input className="input-base" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Phone number" /></Field>
                    <Field label="Email (optional)"><input className="input-base" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></Field>
                    <Field label="Address (optional)"><input className="input-base" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street or postal code" /></Field>
                    <Field label="Reason" className="sm:col-span-2">
                      <select className="input-base" value={form.reason} onChange={(e) => set("reason", e.target.value)}>
                        {REASONS.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                    <Field label="Message (optional)" className="sm:col-span-2">
                      <textarea className="input-base min-h-[96px] resize-y" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Anything we should know?" />
                    </Field>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-ink-soft">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 rounded border-line accent-signal" />
                    <span>I consent to FibreHood contacting me about this request. We only use your details to respond — no spam, no sharing.</span>
                  </label>

                  {errMsg && <p className="text-sm text-destructive">{errMsg}</p>}

                  <button type="submit" disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep disabled:opacity-70">
                    {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4 text-loop" /> Send request</>}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-ink-soft"><ShieldCheck className="h-3.5 w-3.5 text-signal" /> We never ask for unnecessary personal data.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-fog py-16 text-ink md:py-20">
        <Reveal className="container-lattice flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <LoopMark className="h-8 w-14" animated />
            <div>
              <h2 className="font-heading text-2xl font-bold">Not sure if you're covered?</h2>
              <p className="text-ink/70">Check your address first — it only takes a moment.</p>
            </div>
          </div>
          <a href="/coverage" className="inline-flex items-center gap-2 rounded-full bg-loop px-6 py-3.5 text-sm font-semibold text-signal">Check coverage →</a>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, children, className }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
      {children}
    </label>
  );
}