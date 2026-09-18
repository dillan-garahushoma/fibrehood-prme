import React from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Gauge,
  Home,
  MapPin,
  Router,
  Signal,
  Wifi,
} from "lucide-react";
import { PLANS } from "@/data/plans";

const HOME_PLANS = PLANS.filter((plan) => plan.segment === "home").slice(0, 3);

const STEPS = [
  {
    number: "01",
    kicker: "ADDRESS",
    title: "Check coverage",
    body: "Enter your address to see if Fibrehood is available in your area.",
    meta: "~2 min",
  },
  {
    number: "02",
    kicker: "FIT",
    title: "Choose your plan",
    body: "Pick the fibre plan that best fits your home and lifestyle.",
    meta: "Compare clearly",
  },
  {
    number: "03",
    kicker: "TIME",
    title: "Schedule installation",
    body: "Select a convenient time and our team will take care of the rest.",
    meta: "Pick a slot",
  },
  {
    number: "04",
    kicker: "LIVE",
    title: "Get connected",
    body: "We install, set up and get you online — fast. It's that easy!",
    meta: "Same day",
  },
];

function MockupFrame({ label, width, children }) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        <span>{label}</span>
        <span className="font-mono text-[10px] tracking-normal text-ink-soft/60">{width}px artboard</span>
      </figcaption>
      <div className="overflow-x-auto rounded-[24px] border border-line bg-fog p-3 shadow-signal">
        <div style={{ width }} className="overflow-hidden rounded-[16px] bg-paper">
          {children}
        </div>
      </div>
    </figure>
  );
}

function MockupHeader({ eyebrow = "FROM COVERAGE TO CONNECTION", title = "Getting connected is simple.", detail }) {
  return (
    <div className="flex items-end justify-between gap-10 border-b border-line px-10 pb-8 pt-10">
      <div className="max-w-[540px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-heading text-[34px] font-bold leading-none tracking-[-0.04em] text-signal">
          {title.split("simple.")[0]}
          {title.includes("simple.") && <span className="text-loop">simple.</span>}
        </h3>
        <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-ink-soft">
          From checking coverage to getting online, we make the process quick, easy and hassle-free.
        </p>
      </div>
      {detail && (
        <div className="hidden shrink-0 border-l border-line pl-5 text-right text-xs leading-relaxed text-ink-soft lg:block">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal/55">{detail.label}</span>
          <strong className="mt-1 block text-sm font-semibold text-signal">{detail.value}</strong>
        </div>
      )}
    </div>
  );
}

function StationHeading({ step, editorial = false }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-signal/55">
          {editorial ? step.number : `${step.number} / ${step.kicker}`}
        </p>
        <h4 className="mt-2 font-heading text-lg font-bold tracking-tight text-signal">{step.title}</h4>
      </div>
      {!editorial && <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-loop" strokeWidth={2.2} aria-hidden="true" />}
    </div>
  );
}

function CoverageProof({ editorial = false }) {
  return (
    <div className={`relative overflow-hidden border ${editorial ? "rounded-[12px] border-signal/10 bg-[#eef2f6]" : "rounded-[14px] border-line bg-[#eef2f6]"}`}>
      <div className="flex items-center justify-between border-b border-signal/10 bg-white/70 px-3 py-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-signal">
          <MapPin className="h-3 w-3 text-loop" strokeWidth={2.2} aria-hidden="true" />
          14 Mangwende Street, Harare
        </span>
        <span className="rounded-full bg-signal px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-paper">Covered</span>
      </div>
      <svg viewBox="0 0 320 180" className="block h-[150px] w-full" role="img" aria-label="Styled coverage map showing Southview, Tafara Flats and Norton">
        <title>Fibrehood coverage footprint</title>
        <rect width="320" height="180" fill="#eef2f6" />
        <g stroke="#c7d0dc" strokeWidth="1">
          <path d="M-10 42 L340 90 M-20 98 L350 35 M30 -10 L100 200 M188 -10 L150 200 M286 -10 L240 200" />
          <path d="M-5 154 L325 128 M88 -10 L250 200" />
        </g>
        <path d="M22 116 C48 80, 76 66, 116 70 C149 73, 162 99, 192 102 C222 105, 251 84, 295 98 L300 154 L26 158 Z" fill="#0f1e3c" fillOpacity=".12" stroke="#0f1e3c" strokeWidth="2" />
        <path d="M24 117 C56 87, 73 84, 112 88 C143 91, 168 115, 195 115 C230 115, 257 101, 295 110" fill="none" stroke="#ffcc00" strokeWidth="3" strokeDasharray="7 6" />
        <circle cx="145" cy="92" r="7" fill="#ffcc00" stroke="#0f1e3c" strokeWidth="2" />
        <circle cx="145" cy="92" r="16" fill="none" stroke="#ffcc00" strokeOpacity=".5" />
        <text x="22" y="28" fill="#0f1e3c" fontSize="10" fontWeight="700">Southview</text>
        <text x="209" y="60" fill="#0f1e3c" fontSize="10" fontWeight="700">Tafara Flats</text>
        <text x="34" y="145" fill="#5c6b7f" fontSize="9">Fibrehood live area</text>
        <text x="249" y="158" fill="#5c6b7f" fontSize="9">Norton</text>
      </svg>
      <div className="flex items-center justify-between border-t border-signal/10 bg-white/70 px-3 py-2 text-[10px] text-ink-soft">
        <span>Fibrehood Fibre Available</span>
        <span className="font-semibold text-signal">Up to 200 Mbps</span>
      </div>
    </div>
  );
}

function PlanProof({ editorial = false }) {
  return (
    <div className={`space-y-2 ${editorial ? "rounded-[12px] border border-signal/10 bg-white p-3" : "rounded-[14px] border border-line bg-white p-3"}`}>
      {HOME_PLANS.map((plan) => (
        <div key={plan.id} className={`flex items-center justify-between gap-3 rounded-[10px] border px-3 py-2.5 ${plan.popular ? "border-loop bg-[#fff9d6]" : "border-line bg-paper"}`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-[11px] font-bold text-signal">{plan.name}</span>
              {plan.popular && <span className="rounded-full bg-loop px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-signal">Popular</span>}
            </div>
            <span className="text-[10px] text-ink-soft">{plan.download} Mbps down · {plan.bestFor[0]}</span>
          </div>
          <span className="shrink-0 font-heading text-sm font-bold text-signal">US$ {plan.price}<small className="ml-0.5 text-[9px] font-medium text-ink-soft">/mo</small></span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 px-1 pt-1 text-[10px] font-medium text-ink-soft">
        <Check className="h-3 w-3 text-signal" strokeWidth={2.4} aria-hidden="true" />
        Free installation · Wi-Fi router included
      </div>
    </div>
  );
}

function InstallProof({ editorial = false }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div className={`rounded-[14px] border p-3 ${editorial ? "border-signal/10 bg-white" : "border-line bg-signal"}`}>
      <div className={`flex items-center justify-between text-[10px] ${editorial ? "text-ink-soft" : "text-paper/70"}`}>
        <span className="flex items-center gap-1.5 font-semibold">
          <CalendarDays className="h-3.5 w-3.5 text-loop" strokeWidth={2} aria-hidden="true" />
          Installation slots
        </span>
        <span className={editorial ? "text-signal" : "text-loop"}>September 2026</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map((day, index) => (
          <div key={day} className={`rounded-[9px] px-1 py-2 text-center ${index === 2 ? "bg-loop text-signal" : editorial ? "bg-fog text-ink-soft" : "bg-paper/10 text-paper/70"}`}>
            <span className="block text-[10px] font-semibold">{day}</span>
            <span className="mt-1 block font-mono text-[11px] font-bold">{15 + index}</span>
          </div>
        ))}
      </div>
      <div className={`mt-3 flex items-center justify-between border-t pt-3 text-[10px] ${editorial ? "border-line text-ink-soft" : "border-paper/15 text-paper/70"}`}>
        <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-loop" strokeWidth={2} aria-hidden="true" /> Morning window</span>
        <span className={`font-semibold ${editorial ? "text-signal" : "text-paper"}`}>10:00–12:00</span>
      </div>
    </div>
  );
}

function ConnectedProof({ editorial = false }) {
  return (
    <div className={`rounded-[14px] border p-4 ${editorial ? "border-signal/10 bg-white" : "border-signal/15 bg-[#eef2f6]"}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[11px] font-bold text-signal"><span className="h-2 w-2 rounded-full bg-[#2e9b6f]" /> Connection active</span>
        <Wifi className="h-4 w-4 text-signal" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-signal text-paper"><Home className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" /></div>
          <span className="text-[9px] font-medium text-ink-soft">Your home</span>
        </div>
        <div className="h-px flex-1 bg-loop" />
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-signal/15 bg-paper text-signal"><Router className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" /></div>
          <span className="text-[9px] font-medium text-ink-soft">Wi-Fi router</span>
        </div>
        <div className="h-px flex-1 bg-loop" />
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-loop text-signal"><Signal className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" /></div>
          <span className="text-[9px] font-medium text-ink-soft">Internet</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[10px] bg-paper p-2.5"><span className="flex items-center gap-1 text-[9px] text-ink-soft"><ArrowDown className="h-3 w-3" strokeWidth={2} aria-hidden="true" /> Download</span><strong className="mt-1 block font-heading text-base text-signal">48 Mbps</strong></div>
        <div className="rounded-[10px] bg-paper p-2.5"><span className="flex items-center gap-1 text-[9px] text-ink-soft"><Gauge className="h-3 w-3" strokeWidth={2} aria-hidden="true" /> Latency</span><strong className="mt-1 block font-heading text-base text-signal">8 ms</strong></div>
      </div>
    </div>
  );
}

function AftercarePanel({ blueprint = false }) {
  return (
    <div className={`mt-8 grid grid-cols-[1.3fr_repeat(3,1fr)] gap-4 border-t pt-6 ${blueprint ? "border-signal/15" : "border-line"}`}>
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-signal/55">YOUR DAILY DASHBOARD</p>
        <h4 className="mt-2 font-heading text-xl font-bold tracking-tight text-signal">Manage everything online.</h4>
        <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-ink-soft">After installation, manage your account, pay bills, track usage and get support — all in one place.</p>
      </div>
      <div className="rounded-[12px] border border-line bg-white p-3"><span className="text-[10px] text-ink-soft">This month</span><strong className="mt-2 block font-heading text-lg text-signal">187 GB</strong><span className="mt-1 block text-[10px] text-ink-soft">Usage</span></div>
      <div className="rounded-[12px] border border-line bg-white p-3"><span className="text-[10px] text-ink-soft">Amount due</span><strong className="mt-2 block font-heading text-lg text-signal">US$ 60</strong><span className="mt-1 block text-[10px] text-ink-soft">Billing</span></div>
      <div className="rounded-[12px] border border-line bg-white p-3"><span className="text-[10px] text-ink-soft">Need a hand?</span><strong className="mt-2 block font-heading text-lg text-signal">Support</strong><span className="mt-1 block text-[10px] text-ink-soft">Local help</span></div>
    </div>
  );
}

function DirectionOneArtboard({ viewport }) {
  const isDesktop = viewport === "desktop";
  const gridClass = isDesktop ? "grid-cols-4" : "grid-cols-2";

  return (
    <div className="bg-paper">
      <MockupHeader detail={{ label: "THE PROMISE", value: "One line to live service" }} />
      <div className="relative px-10 pb-10 pt-8">
        {isDesktop && <div className="absolute left-[11%] right-[11%] top-[58px] h-[3px] bg-loop" aria-hidden="true" />}
        <div className={`relative grid gap-5 ${gridClass}`}>
          <article className="relative rounded-[16px] border border-line bg-white p-4 shadow-signal">
            <div className="mb-4 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-loop font-mono text-[10px] font-bold text-signal">01</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal/55">ADDRESS</span></div>
            <CoverageProof />
            <h4 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">Check coverage</h4>
            <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-ink-soft">{STEPS[0].body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3"><span className="rounded-full bg-fog px-2.5 py-1 text-[10px] font-semibold text-signal">~2 min</span><span className="text-[10px] font-medium text-ink-soft">Start with your address</span></div>
          </article>
          <article className="relative rounded-[16px] border border-line bg-white p-4 shadow-signal">
            <div className="mb-4 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-loop font-mono text-[10px] font-bold text-signal">02</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal/55">FIT</span></div>
            <PlanProof />
            <h4 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">Choose your plan</h4>
            <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-ink-soft">{STEPS[1].body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3"><span className="rounded-full bg-fog px-2.5 py-1 text-[10px] font-semibold text-signal">Clear pricing</span><span className="text-[10px] font-medium text-ink-soft">Home 25 → 200</span></div>
          </article>
          <article className="relative rounded-[16px] border border-line bg-white p-4 shadow-signal">
            <div className="mb-4 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-loop font-mono text-[10px] font-bold text-signal">03</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal/55">TIME</span></div>
            <InstallProof />
            <h4 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">Schedule installation</h4>
            <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-ink-soft">{STEPS[2].body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3"><span className="rounded-full bg-fog px-2.5 py-1 text-[10px] font-semibold text-signal">Pick a slot</span><span className="text-[10px] font-medium text-ink-soft">Morning window</span></div>
          </article>
          <article className="relative rounded-[16px] border border-line bg-white p-4 shadow-signal">
            <div className="mb-4 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-loop font-mono text-[10px] font-bold text-signal">04</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal/55">LIVE</span></div>
            <ConnectedProof />
            <h4 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">Get connected</h4>
            <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-ink-soft">{STEPS[3].body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3"><span className="rounded-full bg-loop px-2.5 py-1 text-[10px] font-semibold text-signal">Same day</span><span className="text-[10px] font-medium text-ink-soft">Connection active</span></div>
          </article>
        </div>
        <AftercarePanel />
      </div>
    </div>
  );
}

function BlueprintCell({ number, title, body, meta, children }) {
  return (
    <article className="border-l-2 border-signal/15 pl-4">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[24px] font-bold leading-none tracking-[-0.08em] text-loop">{number}</span>
        <ArrowRight className="mt-1 h-4 w-4 text-signal/35" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h4 className="mt-4 font-heading text-lg font-bold tracking-tight text-signal">{title}</h4>
      <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-ink-soft">{body}</p>
      <div className="mt-4">{children}</div>
      <div className="mt-4 flex items-center gap-2 border-t border-signal/10 pt-3"><span className="rounded-full bg-loop px-2.5 py-1 text-[10px] font-semibold text-signal">{meta}</span><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-signal/45">Confirmed next</span></div>
    </article>
  );
}

function DirectionTwoArtboard({ viewport }) {
  const isDesktop = viewport === "desktop";
  const gridClass = isDesktop ? "grid-cols-4" : "grid-cols-2";

  return (
    <div className="bg-[#edf1f5]">
      <div className="border-b border-signal/10 bg-signal px-10 pb-9 pt-10 text-paper">
        <div className="flex items-end justify-between gap-10">
          <div className="max-w-[560px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-loop">SERVICE BLUEPRINT / FIBREHOOD</p>
            <h3 className="mt-3 font-heading text-[34px] font-bold leading-none tracking-[-0.04em]">Getting connected is <span className="text-loop">simple.</span></h3>
            <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-paper/70">A clear route from what reaches your address to a connection you can count on.</p>
          </div>
          <div className="hidden text-right text-xs leading-relaxed text-paper/60 lg:block"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-loop">DIRECT SERVICE MODEL</span><strong className="mt-1 block text-sm font-semibold text-paper">One provider, end to end.</strong></div>
        </div>
      </div>
      <div className="bg-[linear-gradient(to_right,rgba(15,30,60,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,30,60,.06)_1px,transparent_1px)] bg-[size:28px_28px] px-10 py-9">
        <div className={`grid gap-x-7 gap-y-10 ${gridClass}`}>
          <BlueprintCell number="01" title="Check coverage" body={STEPS[0].body} meta="~2 min"><CoverageProof editorial /></BlueprintCell>
          <BlueprintCell number="02" title="Choose your plan" body={STEPS[1].body} meta="Compare clearly"><PlanProof editorial /></BlueprintCell>
          <BlueprintCell number="03" title="Schedule installation" body={STEPS[2].body} meta="Pick a slot"><InstallProof editorial /></BlueprintCell>
          <BlueprintCell number="04" title="Get connected" body={STEPS[3].body} meta="Same day"><ConnectedProof editorial /></BlueprintCell>
        </div>
        <AftercarePanel blueprint />
      </div>
    </div>
  );
}

function DirectionSection({ number, title, description, children }) {
  return (
    <section className="mt-14 first:mt-0">
      <div className="mb-6 max-w-[720px]">
        <p className="eyebrow"><span className="h-px w-6 bg-ink-soft/30" />Direction {number}</p>
        <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-signal">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

export default function HowItWorksMockup() {
  return (
    <main className="min-h-screen bg-paper pb-20 pt-12">
      <div className="container-lattice">
        <div className="max-w-[720px]">
          <p className="eyebrow"><span className="h-px w-6 bg-ink-soft/30" />Static layout comparison</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] text-signal sm:text-5xl">How it works, before motion.</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">Two static treatments for “Getting connected is simple.” Both replace the generic stepper, stock photography and browser chrome with real Fibrehood proof. Desktop and tablet artboards are shown at their intended widths.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-ink-soft"><span className="rounded-full bg-fog px-3 py-1.5">No interaction</span><span className="rounded-full bg-fog px-3 py-1.5">No animation</span><span className="rounded-full bg-fog px-3 py-1.5">Real copy + plan data</span></div>
        </div>

        <DirectionSection number="1" title="Fibre Line Journey" description="A continuous route turns the four steps into one physical connection: address → plan → install → live service.">
          <MockupFrame label="Desktop / four-station fibre line" width={1120}><DirectionOneArtboard viewport="desktop" /></MockupFrame>
          <MockupFrame label="Tablet / two-by-two fibre line" width={768}><DirectionOneArtboard viewport="tablet" /></MockupFrame>
        </DirectionSection>

        <DirectionSection number="2" title="Connection Blueprint" description="A flatter, more editorial service blueprint. Large verbs and proof blocks make the process feel honest, legible and operational.">
          <MockupFrame label="Desktop / four-column blueprint" width={1120}><DirectionTwoArtboard viewport="desktop" /></MockupFrame>
          <MockupFrame label="Tablet / two-column blueprint" width={768}><DirectionTwoArtboard viewport="tablet" /></MockupFrame>
        </DirectionSection>
      </div>
    </main>
  );
}
