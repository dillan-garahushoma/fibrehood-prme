import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { FlowModal } from "./FlowModal";
import { FlowFooter } from "./FlowButtons";
import { FlowField, TextInput, FlowError } from "./FlowField";
import { FlowDone } from "./FlowDone";
import { LEAD_INTENT, statusMeta } from "@/data/coverageStatus";
import { submitLead, coverageContext, makeReference } from "@/lib/leads";
import { WA_INTENTS } from "@/data/site";

const EMPTY = { name: "", phone: "", email: "", area: "", message: "" };

const COPY = {
  [LEAD_INTENT.NOTIFY_WHEN_LIVE]: {
    title: "Notify me when it's ready",
    intro: "We're deploying fibre here now. Leave your details and we'll tell you the moment your line can be ordered.",
    doneTitle: "You're on the list",
    doneBody: "We'll let you know as soon as FibreHood goes live at your location."
  },
  [LEAD_INTENT.REGISTER_INTEREST]: {
    title: "Register your interest",
    intro: "Interest in an area helps us decide where to build next. Tell us where you'd like FibreHood.",
    doneTitle: "Thanks — your interest is registered",
    doneBody: "We'll keep you updated as FibreHood expansion reaches your area."
  }
};

/**
 * Short lead capture for every non-LIVE outcome. The resolved location and
 * coverage status travel with the lead so demand can be mapped later.
 */
export function InterestFlow({ open, intent = LEAD_INTENT.REGISTER_INTEREST, location, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  const copy = COPY[intent] || COPY[LEAD_INTENT.REGISTER_INTEREST];
  const meta = statusMeta(location?.status);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!open) return;
    setForm({ ...EMPTY, area: location?.label || "" });
    setConsent(false);
    setError("");
    setDone(null);
  }, [open, location?.label]);

  const submit = async () => {
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (form.phone.trim().length < 6) return setError("Please enter a phone number we can reach you on.");
    if (!form.area.trim()) return setError("Please tell us the area you'd like FibreHood in.");
    if (!consent) return setError("Please confirm you're happy for us to contact you.");

    setBusy(true);
    setError("");
    const reference = makeReference();
    try {
      await submitLead({
        ...coverageContext(location),
        address: form.area.trim() || location?.label,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        intent,
        reference,
        message: form.message.trim(),
        source: "coverage",
        consent: true
      });
      setDone({ reference });
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "We couldn't submit that. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <FlowModal
      open={open}
      title={done ? "Received" : copy.title}
      onClose={onClose}
      footer={done ? null : <FlowFooter onNext={submit} nextLabel="Submit interest" busy={busy} note="No spam — coverage updates only." />}
    >
      <FlowError>{error}</FlowError>

      {done ? (
        <FlowDone
          title={copy.doneTitle}
          body={copy.doneBody}
          reference={done.reference}
          onClose={onClose}
          waHref={WA_INTENTS.nearCoverage(form.area || location?.label || "")}
        />
      ) : (
        <div>
          <h1 className="ff-serif text-3xl sm:text-[2rem] leading-tight text-stone-900">
            {copy.title}
          </h1>
          <p className="text-stone-500 mt-3 text-[15px] leading-relaxed max-w-md">
            {copy.intro}
          </p>

          {location?.label && (
            <div className="mt-8 pt-7 border-t border-stone-200 flex items-start gap-3">
              <MapPin size={18} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-stone-900 font-medium">{location.label}</div>
                <div className="text-stone-400 text-sm mt-0.5">Status: {meta.label}</div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-7 border-t border-stone-200 grid gap-x-6 gap-y-8 sm:grid-cols-2">
            <FlowField label="Full name" required>
              <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tendai Moyo" />
            </FlowField>
            <FlowField label="Phone number" required>
              <TextInput value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="077 000 0000" />
            </FlowField>
            <FlowField label="Email address">
              <TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </FlowField>
            <FlowField label="Area or address" required>
              <TextInput value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="Your suburb or street" />
            </FlowField>
          </div>

          <div className="mt-8 pt-7 border-t border-stone-200">
            <FlowField label="Anything else?" hint="Optional — let us know about any special access or timing requirements.">
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={2}
                className="w-full bg-transparent border-0 border-b border-stone-300 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors duration-300 resize-none text-sm"
                placeholder="Optional"
              />
            </FlowField>
          </div>

          <div className="mt-8 pt-7 border-t border-stone-200">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 accent-amber-500 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                I'd like FibreHood to contact me about coverage and service availability at this location.
              </span>
            </label>
          </div>
        </div>
      )}
    </FlowModal>
  );
}

export default InterestFlow;