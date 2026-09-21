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
    doneBody: "We'll let you know as soon as Fibrehood goes live at your location."
  },
  [LEAD_INTENT.REGISTER_INTEREST]: {
    title: "Register your interest",
    intro: "Interest in an area helps us decide where to build next. Tell us where you'd like Fibrehood.",
    doneTitle: "Thanks — your interest is registered",
    doneBody: "We'll keep you updated as Fibrehood expansion reaches your area."
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [done, setDone] = useState(null);

  const copy = COPY[intent] || COPY[LEAD_INTENT.REGISTER_INTEREST];
  const meta = statusMeta(location?.status);
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[k];
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    setForm({ ...EMPTY, area: location?.label || "" });
    setConsent(false);
    setError("");
    setFieldErrors({});
    setDone(null);
  }, [open, location?.label]);

  const submit = async () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your name.";
    if (form.phone.trim().length < 6) next.phone = "Enter a phone number we can reach you on.";
    if (!form.area.trim()) next.area = "Enter the area or address.";
    if (!consent) next.consent = "Consent is required.";
    setFieldErrors(next);
    if (Object.keys(next).length) return setError("Please fix the highlighted fields.");

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
          <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] font-semibold tracking-tight">
            {copy.title}
          </h1>
          <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
            {copy.intro}
          </p>

          {location?.label && (
            <div className="mt-8 pt-7 border-t border-stone-200 flex items-start gap-3">
              <MapPin size={18} className="text-[#FFCC00] mt-0.5 shrink-0" />
              <div>
                <div className="text-[#031630] font-semibold">{location.label}</div>
                <div className="text-stone-500 font-medium text-sm mt-0.5">Status: {meta.label}</div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-7 border-t border-stone-200 grid gap-x-6 gap-y-8 sm:grid-cols-2">
              <FlowField label="Full name" required error={fieldErrors.name}>
              <TextInput invalid={!!fieldErrors.name} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tendai Moyo" />
            </FlowField>
              <FlowField label="Phone number" required error={fieldErrors.phone}>
              <TextInput invalid={!!fieldErrors.phone} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="077 000 0000" />
            </FlowField>
            <FlowField label="Email address">
              <TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </FlowField>
            <FlowField label="Area or address" required error={fieldErrors.area}>
              <TextInput invalid={!!fieldErrors.area} value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="Your suburb or street" />
            </FlowField>
          </div>

          <div className="mt-8 pt-7 border-t border-stone-200">
            <FlowField label="Anything else?" hint="Optional — let us know about any special access or timing requirements.">
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={2}
                className="w-full bg-transparent border-0 border-b border-stone-400 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FFCC00] transition-colors duration-300 resize-none text-sm"
                placeholder="Optional"
              />
            </FlowField>
          </div>

          <div className="mt-8 pt-7 border-t border-stone-200">
            <label className="flex cursor-pointer items-start gap-3">
                  <input
                type="checkbox"
                checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setFieldErrors((current) => ({ ...current, consent: undefined }));
                    }}
                    aria-invalid={!!fieldErrors.consent}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-400 accent-[#FFCC00] text-[#FFCC00] focus:ring-[#FFCC00]"
              />
              <span className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                I'd like Fibrehood to contact me about coverage and service availability at this location.
              </span>
            </label>
            {fieldErrors.consent && <p className="mt-1 pl-7 text-xs font-medium text-red-700">{fieldErrors.consent}</p>}
          </div>
        </div>
      )}
    </FlowModal>
  );
}

export default InterestFlow;