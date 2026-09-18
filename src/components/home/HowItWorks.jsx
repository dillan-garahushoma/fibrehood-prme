import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ClipboardCheck, IdCard, Router, ArrowRight } from "lucide-react";

const NAVY = "#072146";
const GOLD = "#FFCC00";

const STEPS = [
  {
    label: "Step 1",
    icon: MapPin,
    title: "Check Coverage",
    description: "Confirm availability for your area, building or community.",
  },
  {
    label: "Step 2",
    icon: ClipboardCheck,
    title: "Choose Your Plan",
    description: "Pick the fibre package that best suits your needs.",
  },
  {
    label: "Step 3",
    icon: IdCard,
    title: "Sign Up",
    description: "Share your details and complete the simple registration steps.",
  },
  {
    label: "Step 4",
    icon: Router,
    title: "Get Connected",
    description: "Fibrehood schedules installation and activates your service.",
  },
];

function StepCard({ step }) {
  const Icon = step.icon;

  return (
    <div className="relative h-full rounded-2xl border-[1.5px] border-slate-200/90 bg-white px-6 pb-8 pt-10 shadow-[0_12px_36px_rgba(7,34,72,0.12),0_2px_8px_rgba(7,34,72,0.05)] transition-all hover:shadow-[0_20px_44px_rgba(7,34,72,0.16)]">
      <span
        className="absolute -top-5 left-6 inline-flex h-10 items-center rounded-full border-2 bg-white px-4 text-sm font-bold shadow-sm"
        style={{ borderColor: GOLD, color: NAVY }}
      >
        {step.label}
      </span>

      <div className="mb-5 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200/60 bg-slate-100">
          <Icon className="h-8 w-8 text-signal" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <h3 className="mb-2 text-center font-heading text-lg font-bold text-signal">
        {step.title}
      </h3>

      <p className="mx-auto max-w-[220px] text-center text-sm leading-relaxed text-slate-500">
        {step.description}
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div
      className="hidden shrink-0 items-center justify-center px-2 text-slate-300 lg:flex"
      aria-hidden="true"
    >
      <span className="text-lg tracking-[4px]">···</span>
      <ArrowRight className="-ml-1 h-4 w-4" strokeWidth={2.5} />
    </div>
  );
}

export function HowItWorks({
  ctaHref = "/coverage",
  onCheckCoverage,
  ctaLabel = "Check Coverage",
}) {
  const isButton = Boolean(onCheckCoverage);
  const ctaClassName =
    "mt-12 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-semibold text-white shadow-[0_6px_16px_rgba(7,34,72,0.2)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(255,204,0,0.28),0_0_24px_rgba(255,204,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#072146]";

  return (
    <section className="bg-white py-20">
      <div className="container-lattice">
        <div className="eyebrow mb-4">
          <span className="h-px w-7 bg-loop" aria-hidden="true" />
          Get Connected
        </div>

        <h2 className="mb-14 max-w-2xl font-heading text-3xl font-extrabold leading-[1.08] tracking-tighter text-signal sm:text-4xl lg:text-[2.6rem]">
          Four simple steps to get connected
        </h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex flex-col lg:flex-row lg:items-stretch lg:flex-1">
              <div className="lg:flex-1">
                <StepCard step={step} />
              </div>
              {index < STEPS.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        {isButton ? (
          <button
            type="button"
            onClick={onCheckCoverage}
            className={ctaClassName}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <Link
            to={ctaHref}
            className={ctaClassName}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

export default HowItWorks;
