import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CircleCheck,
  ShieldCheck,
  Home,
  Building2,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";
import { makeReference, submitLead } from "@/lib/leads";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  suburb: "",
  message: "",
  consent: false
};

const INTEREST_OPTIONS = [
  {
    id: "home",
    title: "Home Fibre",
    description: "Fast, reliable fibre for families & streaming",
    Icon: Home
  },
  {
    id: "sme",
    title: "SME Fibre",
    description: "High-speed connectivity for businesses & offices",
    Icon: Building2
  },
  {
    id: "unsure",
    title: "Not sure yet",
    description: "Help me pick the best option for my needs",
    Icon: HelpCircle
  }
];

const CONTACT_METHODS = [
  { id: "whatsapp", label: "WhatsApp", Icon: MessageSquare },
  { id: "phone", label: "Phone call", Icon: Phone },
  { id: "email", label: "Email", Icon: Mail }
];

const INPUT_CLASS =
  "mt-1.5 block min-h-11 w-full rounded-xl border border-line bg-white/90 px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-soft/45 hover:border-ink-soft/40 focus:border-signal focus:ring-4 focus:ring-signal/10";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialPlanParam = searchParams.get("plan");

  const [interest, setInterest] = useState(() => {
    if (initialPlanParam?.includes("sme")) return "sme";
    return "home";
  });

  const [preferredContact, setPreferredContact] = useState("whatsapp");
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [requestError, setRequestError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const errorSummaryRef = useRef(null);

  useEffect(() => {
    if (initialPlanParam?.includes("sme")) {
      setInterest("sme");
    }
  }, [initialPlanParam]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setRequestError("");
  };

  const validate = () => {
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) errors.lastName = "Please enter your surname.";
    if (!form.phone.trim()) {
      errors.phone = "A mobile or WhatsApp number is required.";
    } else if (form.phone.trim().replace(/\D/g, "").length < 7) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!form.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.suburb.trim()) {
      errors.suburb = "Please specify your suburb or area.";
    }
    if (!form.consent) {
      errors.consent = "Please agree to being contacted regarding your enquiry.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestError("");

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitAttempt((a) => a + 1);
      errorSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setBusy(true);
    const reference = makeReference();

    // Behind-the-scenes lead metadata
    const metadata = {
      source: searchParams.get("source") || "homepage signup",
      page: "/signup",
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "direct",
      utm_source: searchParams.get("utm_source") || null,
      utm_medium: searchParams.get("utm_medium") || null,
      utm_campaign: searchParams.get("utm_campaign") || null,
      selected_interest: interest
    };

    const selectedOption = INTEREST_OPTIONS.find((o) => o.id === interest);

    try {
      await submitLead({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.suburb.trim(),
        segment: interest === "sme" ? "business" : interest === "home" ? "home" : "unsure",
        intent: "register_interest",
        reference,
        source: "signup",
        message: [
          `Interest: ${selectedOption?.title || interest}`,
          `Preferred Contact: ${preferredContact}`,
          form.message.trim() ? `User Note: ${form.message.trim()}` : null,
          `Source: ${metadata.source}`,
          `Referrer: ${metadata.referrer}`,
          `Timestamp: ${metadata.timestamp}`
        ]
          .filter(Boolean)
          .join(" | "),
        utm: [
          metadata.utm_source && `source=${metadata.utm_source}`,
          metadata.utm_medium && `medium=${metadata.utm_medium}`,
          metadata.utm_campaign && `campaign=${metadata.utm_campaign}`
        ]
          .filter(Boolean)
          .join("&") || undefined,
        consent: true
      });

      setResult({
        reference,
        firstName: form.firstName.trim(),
        interestTitle: selectedOption?.title || "Fibre",
        preferredContact: CONTACT_METHODS.find((m) => m.id === preferredContact)?.label || preferredContact
      });
    } catch (err) {
      setRequestError(err?.message || "We couldn't submit your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-3rem)] overflow-hidden bg-[#0A1628] pb-16 pt-12 sm:pt-14 lg:pb-24">
      {/* ── Layer 1: Base background image (clear and vibrant around the outer edges) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/signup-hero.png"
          alt=""
          className="h-full w-full scale-[1.02] object-cover object-center"
        />
      </div>

      {/* ── Layer 2: Selective soft blur (12px) behind the central content, fading to clear at outer edges ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, rgba(0,0,0,0.5) 60%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, rgba(0,0,0,0.5) 60%, transparent 92%)"
        }}
      />

      {/* ── Layer 3: Translucent navy/blue tint at ~15–25% for depth and brand cohesion ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(7,34,72,0.18) 0%, rgba(11,27,51,0.25) 100%)"
        }}
      />

      {/* ── Layer 4: Very subtle white gradient behind the text & form for crisp contrast ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 80%)"
        }}
      />

      <div className="container-lattice relative z-10">
        {/* Brand logo — no navy background box */}
        <div className="mx-auto mb-8 flex max-w-6xl justify-center lg:mb-10">
          <Link
            to="/"
            aria-label="Fibrehood home"
            className="inline-block transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <img
              src="/white1.png"
              alt="Fibrehood"
              className="h-40 w-auto object-contain drop-shadow-md sm:h-48"
            />
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-14">
          {/* Left Column: Headline and Key Benefits — High Readability White/Yellow */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-loop drop-shadow-sm">
              GET STARTED
            </span>
            <h1 className="mt-3 max-w-xl font-heading text-[2.125rem] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-md sm:text-[2.8rem] lg:text-[3.4rem]">
              A better <span className="text-loop">connection</span> starts here.
            </h1>
            <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-white/90 drop-shadow-sm sm:text-lg">
              Tell us a little about yourself and what you're looking for. A Fibrehood team member will be in touch to help with the next step.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Straightforward month-to-month plans",
                "A team member to guide your connection",
                "No payment details needed to get started"
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-white drop-shadow-sm sm:text-base"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-loop text-signal shadow-sm">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 hidden max-w-sm items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white/90 shadow-sm backdrop-blur-md sm:flex">
              <ShieldCheck className="h-5 w-5 shrink-0 text-loop" aria-hidden="true" />
              <p>Your details are only used to follow up on your Fibrehood enquiry.</p>
            </div>
          </div>

          {/* Right Column: Form Container Card */}
          <div className="rounded-[1.75rem] border border-white/90 bg-white/85 p-6 shadow-[0_24px_80px_-25px_rgba(7,34,72,0.35)] backdrop-blur-xl sm:p-8 lg:p-9">
            {result ? (
              <div className="py-8 text-center sm:py-12">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">
                  <CircleCheck className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                  Request received
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-signal sm:text-4xl">
                  You're on your way!
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                  Thanks, <strong className="font-semibold text-ink">{result.firstName}</strong>! We’ve received your enquiry for{" "}
                  <strong className="font-semibold text-ink">{result.interestTitle}</strong>. A Fibrehood team member will be in touch via{" "}
                  <strong className="font-semibold text-ink">{result.preferredContact}</strong> to help with the next step.
                </p>
                <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl border border-line bg-white px-7 py-4 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Your reference
                  </span>
                  <span className="mt-1 font-mono text-xl font-bold tracking-wider text-signal">
                    {result.reference}
                  </span>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-paper transition-all hover:bg-signal/90"
                  >
                    Return to Home
                  </Link>
                  <Link
                    to="/plans"
                    className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-fog/60"
                  >
                    Explore Fibre Plans
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Form Heading */}
                <div className="border-b border-line/70 pb-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-signal/70">
                    GET STARTED
                  </span>
                  <h2 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-signal sm:text-3xl">
                    Let's get to know you
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    Tell us a little about yourself and what you're looking for. A Fibrehood team member will be in touch to help with the next step.
                  </p>
                </div>

                {requestError && (
                  <div
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{requestError}</span>
                  </div>
                )}

                {/* 1. ABOUT YOU */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-signal">
                    1. About you
                  </h3>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="signup-firstName" className="block text-xs font-semibold text-ink">
                        First name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        className={INPUT_CLASS}
                        aria-invalid={!!fieldErrors.firstName}
                      />
                      {fieldErrors.firstName && (
                        <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="signup-lastName" className="block text-xs font-semibold text-ink">
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-lastName"
                        type="text"
                        placeholder="Enter your surname"
                        value={form.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        className={INPUT_CLASS}
                        aria-invalid={!!fieldErrors.lastName}
                      />
                      {fieldErrors.lastName && (
                        <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="signup-phone" className="block text-xs font-semibold text-ink">
                        Mobile / WhatsApp number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-phone"
                        type="tel"
                        placeholder="+263 ..."
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={INPUT_CLASS}
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="signup-email" className="block text-xs font-semibold text-ink">
                        Email address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={INPUT_CLASS}
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. WHAT ARE YOU INTERESTED IN? — Selectable Cards */}
                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-signal">
                      2. What are you interested in?
                    </h3>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      Choose the connection category that best fits your needs.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Connection interest">
                    {INTEREST_OPTIONS.map(({ id, title, description, Icon }) => {
                      const isSelected = interest === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setInterest(id)}
                          className={`relative flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                            isSelected
                              ? "border-signal bg-signal/[0.04] ring-2 ring-signal/20 shadow-sm"
                              : "border-line bg-white/80 hover:border-ink-soft/35 hover:bg-white"
                          }`}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span
                              className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${
                                isSelected ? "bg-signal text-loop" : "bg-fog text-signal"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span
                              className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-signal bg-signal" : "border-line"
                              }`}
                            >
                              {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <div className="mt-3">
                            <p className="font-heading text-sm font-bold text-ink">{title}</p>
                            <p className="mt-1 text-[11px] leading-snug text-ink-soft">{description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. WHERE ARE YOU BASED? */}
                <div className="space-y-2 pt-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-signal">
                      3. Where are you based?
                    </h3>
                  </div>
                  <div>
                    <label htmlFor="signup-suburb" className="block text-xs font-semibold text-ink">
                      Suburb / Area <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="signup-suburb"
                      type="text"
                      placeholder="e.g. Avondale"
                      value={form.suburb}
                      onChange={(e) => updateField("suburb", e.target.value)}
                      className={INPUT_CLASS}
                      aria-invalid={!!fieldErrors.suburb}
                    />
                    {fieldErrors.suburb && (
                      <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors.suburb}</p>
                    )}
                  </div>
                </div>

                {/* 4. HOW SHOULD WE REACH YOU? — Pill Selector */}
                <div className="space-y-2 pt-1">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-signal">
                      4. How should we reach you?
                    </h3>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      Preferred contact method
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {CONTACT_METHODS.map(({ id, label, Icon }) => {
                      const isSelected = preferredContact === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPreferredContact(id)}
                          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                            isSelected
                              ? "border-signal bg-signal text-white shadow-sm"
                              : "border-line bg-white/80 text-ink hover:border-ink-soft/40 hover:bg-white"
                          }`}
                        >
                          <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-loop" : "text-ink-soft"}`} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. ANYTHING WE CAN HELP WITH? (Optional) */}
                <div className="space-y-2 pt-1">
                  <label htmlFor="signup-message" className="block text-xs font-semibold text-ink">
                    Anything we can help with?{" "}
                    <span className="font-normal text-ink-soft">(Optional)</span>
                  </label>
                  <textarea
                    id="signup-message"
                    rows={3}
                    placeholder="e.g. I'm looking for a plan for my family..."
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="block w-full resize-none rounded-xl border border-line bg-white/90 px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-ink-soft/45 hover:border-ink-soft/40 focus:border-signal focus:ring-4 focus:ring-signal/10"
                  />
                </div>

                {/* Consent & CTA */}
                <div className="space-y-4 pt-2">
                  <label className="flex cursor-pointer select-none items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField("consent", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-line text-signal focus:ring-signal"
                    />
                    <span className="text-xs leading-relaxed text-ink-soft">
                      I agree that Fibrehood may contact me regarding my enquiry and understand that my information will be handled according to the{" "}
                      <Link to="/privacy" className="font-medium text-signal underline hover:text-signal/80">
                        Privacy Policy
                      </Link>
                      . <span className="text-red-600">*</span>
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <p className="text-xs font-medium text-red-600">{fieldErrors.consent}</p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-loop py-3.5 text-sm font-bold text-signal shadow-md transition-all hover:bg-loop/90 hover:shadow-loop focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy ? (
                      "Sending..."
                    ) : (
                      <>
                        <span>Get started</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs font-medium text-ink-soft">
                    No payment required. We'll be in touch to help you with the next step.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
