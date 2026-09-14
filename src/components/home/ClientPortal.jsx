import PortalDemo from "./client-portal/PortalDemo";
import {
  BillingIcon,
  InstallIcon,
  IssueIcon,
  PlanIcon,
  SupportIcon,
  WifiIcon,
} from "./client-portal/icons";
import AnimatedGoldLine from "@/components/home/AnimatedGoldLine";

const highlights = [
  { icon: WifiIcon, label: "Live connection status" },
  { icon: PlanIcon, label: "Plan management" },
  { icon: BillingIcon, label: "Billing & payments" },
  { icon: SupportIcon, label: "Real-time support" },
  { icon: IssueIcon, label: "Issue reporting" },
  { icon: InstallIcon, label: "Installation tracking" },
];

export default function ClientPortal() {
  return (
    <section id="client-portal" className="relative overflow-hidden bg-paper">
      {/* Soft warm ambient glow — reads on light bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-loop/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[360px] w-[360px] rounded-full bg-signal/[0.04] blur-[100px]" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 sm:pb-10 sm:pt-24">

          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              <span className="h-px w-7 bg-loop" aria-hidden="true" />
              Client portal
            </span>
            <h2 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
              Your Fibre account,{" "}
              <br className="hidden sm:block" />
              all in one place.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
              Check your connection, manage your plan, pay your bill, and talk to support —
              without ever picking up the phone.
            </p>
          </div>

          {/* Animated portal demo */}
          <div className="mt-16">
            <PortalDemo />
          </div>

          {/* Feature strip */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-fog/60 px-4 py-3 text-[13px] font-medium text-ink-soft"
              >
                <h.icon className="h-4 w-4 flex-none text-signal" />
                {h.label}
              </div>
            ))}
          </div>

          {/* Animated gold hairline separating the portal and testimonials */}
          <div className="mt-12 sm:mt-16">
            <AnimatedGoldLine />
          </div>

        </div>
      </div>
    </section>
  );
}
