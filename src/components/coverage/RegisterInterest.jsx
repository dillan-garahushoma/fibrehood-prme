import React, { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/Reveal";

export function RegisterInterest() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.area.trim()) return;
    setStatus("sending");
    setTimeout(() => {
      try {
        const key = "fibrehood_leads";
        const arr = JSON.parse(localStorage.getItem(key) || "[]");
        arr.push({ ...form, source: "coverage-register", created_date: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (_) {
        /* standalone mode — best effort */
      }
      setStatus("success");
    }, 700);
  };

  if (status === "success") {
    return (
      <section id="register-interest" className="container-lattice py-16">
        <Reveal className="mx-auto max-w-xl rounded-2xl border border-loop bg-signal p-8 text-center text-paper">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-loop text-signal">
            <Check className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-heading text-2xl font-bold">Thanks — we've noted your interest</h2>
          <p className="mt-2 text-paper/75">
            As FibreHood expands into your area, we'll keep you informed about availability and connection options.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", phone: "", email: "", area: "", message: "" });
              setStatus("idle");
            }}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-loop px-5 text-sm font-semibold text-signal hover:bg-loopsoft"
          >
            Submit another area
          </button>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="register-interest" className="container-lattice py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionLabel>Network expansion</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-signal sm:text-4xl">Don't see FibreHood in your area?</h2>
          <p className="mt-4 max-w-md text-ink-soft">
            We're expanding our network. Tell us where you want FibreHood next and we'll reach out as coverage reaches you.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <form onSubmit={submit} className="rounded-2xl border border-line bg-paper p-6 shadow-signal">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" required>
                <input className="input-base" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tendai Moyo" required />
              </Field>
              <Field label="Phone Number" required>
                <input className="input-base" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="077 000 0000" required />
              </Field>
              <Field label="Email Address">
                <input type="email" className="input-base" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </Field>
              <Field label="Address or Area" required>
                <input className="input-base" value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="Your suburb or town" required />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Optional Message">
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Anything else we should know?"
                  className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/15 min-h-[88px]"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-signal px-6 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Bring FibreHood to My Area
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

export default RegisterInterest;