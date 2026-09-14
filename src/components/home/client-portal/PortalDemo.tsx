import { useEffect, useMemo, useState, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  WifiIcon,
  PlanIcon,
  BillingIcon,
  SupportIcon,
  IssueIcon,
  InstallIcon,
  ArrowRightIcon,
  CheckIcon,
  HomeIcon,
  RouterIcon,
} from "./icons";

const DURATION = 5200;

type MomentId = "connection" | "plan" | "billing" | "support" | "issue" | "installation";

interface Moment {
  id: MomentId;
  tab: string;
  icon: (props: { className?: string }) => ReactElement;
  headline: string;
  sub: string;
  sidebarActive: "Overview" | "My Fibre" | "Billing" | "Support";
}

const moments: Moment[] = [
  {
    id: "connection",
    tab: "Connection",
    icon: WifiIcon,
    headline: "Know your connection is healthy.",
    sub: "See your FibreHood service status at a glance, the moment you open the portal.",
    sidebarActive: "Overview",
  },
  {
    id: "plan",
    tab: "Plan",
    icon: PlanIcon,
    headline: "Manage your Fibre plan.",
    sub: "View what you're subscribed to and make changes whenever you need to.",
    sidebarActive: "My Fibre",
  },
  {
    id: "billing",
    tab: "Billing",
    icon: BillingIcon,
    headline: "Stay on top of your account.",
    sub: "View your billing details and pay your bill without leaving the portal.",
    sidebarActive: "Billing",
  },
  {
    id: "support",
    tab: "Support",
    icon: SupportIcon,
    headline: "Get help without the back-and-forth.",
    sub: "Talk to FibreHood and track your support request in one place.",
    sidebarActive: "Support",
  },
  {
    id: "issue",
    tab: "Report issue",
    icon: IssueIcon,
    headline: "Report problems quickly.",
    sub: "Tell us what's wrong and follow the progress of your request in real time.",
    sidebarActive: "Support",
  },
  {
    id: "installation",
    tab: "Installation",
    icon: InstallIcon,
    headline: "Know what's happening next.",
    sub: "Track your Fibre installation from request to activation.",
    sidebarActive: "My Fibre",
  },
];

const sidebarItems: { label: Moment["sidebarActive"]; icon: (p: { className?: string }) => ReactElement }[] = [
  { label: "Overview", icon: HomeIcon },
  { label: "My Fibre", icon: WifiIcon },
  { label: "Billing", icon: BillingIcon },
  { label: "Support", icon: SupportIcon },
];

function Avatar({ label, tone }: { label: string; tone: "you" | "fh" | "tech" }) {
  const styles: Record<string, string> = {
    you: "bg-ink/10 text-ink",
    fh: "bg-signal text-paper",
    tech: "bg-emerald-600 text-white",
  };
  return (
    <div
      className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-semibold ${styles[tone]}`}
    >
      {label}
    </div>
  );
}

function TypingReply() {
  const phrase = "Thanks — please keep me posted on the technician's ETA.";
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    setText("");
    const tick = () => {
      if (cancelled) return;
      if (i <= phrase.length) {
        setText(phrase.slice(0, i));
        i += 1;
        setTimeout(tick, 26 + Math.random() * 35);
      }
    };
    const start = setTimeout(tick, 900);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <span className="text-ink">
      {text}
      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-[blink-caret_1s_step-end_infinite] bg-loop align-middle" />
    </span>
  );
}

function PanelBody({ moment }: { moment: MomentId }) {
  switch (moment) {
    case "connection":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">Fibre status</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              Live
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
            <p className="text-[17px] font-semibold text-ink">Your Fibre is working normally</p>
          </div>
          <p className="mt-1.5 pl-6 text-[13px] text-ink-soft">Connected · 100 Mbps</p>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {[
              { label: "Download", value: "97.8", unit: "Mbps" },
              { label: "Upload", value: "38.2", unit: "Mbps" },
              { label: "Ping", value: "9", unit: "ms" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-fog/50 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wide text-ink-soft">{s.label}</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">
                  {s.value}
                  <span className="ml-1 text-[10px] font-normal text-ink-soft">{s.unit}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-end gap-[3px]">
            {[6, 9, 7, 10, 8, 11, 9, 10, 12, 9, 11, 10, 12, 11, 13].map((h, i) => (
              <span
                key={i}
                className="w-[6px] rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/80"
                style={{ height: `${h * 3}px` }}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ink-soft">Signal strength · last 15 minutes</p>
        </div>
      );

    case "plan":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">My plan</span>
            <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] font-medium text-ink-soft">
              Active
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-signal/20 bg-signal/[0.05] p-4">
            <p className="text-[11px] uppercase tracking-wide text-signal/70">Current package</p>
            <p className="mt-1 text-[20px] font-bold text-ink">100 Mbps Unlimited</p>
            <p className="mt-0.5 text-[13px] text-ink-soft">$79 / month · No lock-in contract</p>
          </div>

          <div className="mt-4 space-y-2">
            {["Unlimited data, every month", "Free static IP add-on available", "Wi-Fi 6 router included"].map(
              (f) => (
                <div key={f} className="flex items-center gap-2 text-[13px] text-ink-soft">
                  <CheckIcon className="h-3.5 w-3.5 flex-none text-emerald-500" />
                  {f}
                </div>
              ),
            )}
          </div>

          <div className="mt-auto flex gap-2 pt-5">
            <button className="flex-1 rounded-lg bg-signal px-3 py-2 text-[12.5px] font-semibold text-paper shadow-sm shadow-signal/20">
              Upgrade to 500 Mbps
            </button>
            <button className="rounded-lg border border-line px-3 py-2 text-[12.5px] font-medium text-ink-soft">
              Compare plans
            </button>
          </div>
        </div>
      );

    case "billing":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">Billing</span>
            <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] font-medium text-ink-soft">
              Account #FH-20481
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between rounded-xl border border-line bg-fog/50 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-soft">Next payment</p>
              <p className="mt-1 text-[26px] font-bold text-ink">
                $79<span className="text-[14px] font-medium text-ink-soft">.00</span>
              </p>
              <p className="mt-0.5 text-[12.5px] text-ink-soft">Due 24 Sep · Visa ···· 4471</p>
            </div>
            <button className="flex items-center gap-1 rounded-lg bg-signal px-3.5 py-2 text-[12.5px] font-semibold text-paper shadow-sm shadow-signal/20">
              Pay now
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-5 text-[11px] uppercase tracking-wide text-ink-soft">Recent activity</p>
          <div className="mt-2 space-y-1.5">
            {[
              { label: "Paid · 24 Aug", amount: "$79.00", ok: true },
              { label: "Paid · 24 Jul", amount: "$79.00", ok: true },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[12.5px]"
              >
                <span className="flex items-center gap-2 text-ink-soft">
                  <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                  {r.label}
                </span>
                <span className="text-ink-soft">{r.amount}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "support":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">
              Support <span className="font-normal text-ink-soft">#connection</span>
            </span>
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-600">
              In progress
            </span>
          </div>

          <div className="mt-4 flex-1 space-y-3.5 overflow-hidden">
            <div className="flex gap-2.5">
              <Avatar label="D" tone="you" />
              <div>
                <p className="text-[11.5px]">
                  <b className="font-semibold text-ink">Dillan</b>{" "}
                  <span className="text-ink-soft">9:41 PM</span>
                </p>
                <p className="mt-0.5 max-w-[230px] rounded-lg rounded-tl-sm border border-line bg-fog/60 px-3 py-2 text-[13px] leading-snug text-ink">
                  My connection has been slower tonight.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Avatar label="FH" tone="fh" />
              <div>
                <p className="text-[11.5px]">
                  <b className="font-semibold text-ink">FibreHood</b>{" "}
                  <span className="text-ink-soft">9:42 PM</span>
                </p>
                <p className="mt-0.5 max-w-[230px] rounded-lg rounded-tl-sm border border-signal/20 bg-signal/[0.07] px-3 py-2 text-[13px] leading-snug text-ink">
                  We're checking your line now, one moment.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Avatar label="T" tone="tech" />
              <div>
                <p className="text-[11.5px]">
                  <b className="font-semibold text-ink">Technician</b>{" "}
                  <span className="text-ink-soft">9:44 PM</span>
                </p>
                <p className="mt-0.5 max-w-[230px] rounded-lg rounded-tl-sm border border-line bg-fog/60 px-3 py-2 text-[13px] leading-snug text-ink">
                  Signal levels look normal. We're investigating the area.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 border-t border-line pt-3">
            <div className="min-h-[18px] text-[13px]">
              <TypingReply />
            </div>
            <p className="mt-2 text-[11px] text-ink-soft">Reply to FibreHood…</p>
          </div>
        </div>
      );

    case "issue":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">Report an issue</span>
            <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] font-medium text-ink-soft">
              Ticket #8823
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["No internet", "Slow speeds", "Router issue", "Billing question"].map((chip) => (
              <span
                key={chip}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                  chip === "Slow speeds"
                    ? "bg-signal text-paper shadow-sm shadow-signal/20"
                    : "border border-line text-ink-soft"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-4 rounded-lg border border-line bg-fog/50 p-3 text-[12.5px] leading-relaxed text-ink-soft">
            "Speeds have dropped noticeably after 8pm the last two nights."
          </p>

          <p className="mt-5 text-[11px] uppercase tracking-wide text-ink-soft">Progress</p>
          <div className="mt-3 space-y-0">
            {[
              { label: "Reported", done: true },
              { label: "Investigating", done: true, active: true },
              { label: "Resolved", done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                      step.done ? "bg-emerald-500" : "border border-line bg-transparent"
                    }`}
                  >
                    {step.done && <CheckIcon className="h-2.5 w-2.5 text-white" />}
                  </span>
                  {i < 2 && <span className="my-0.5 h-6 w-[2px] bg-line" />}
                </div>
                <div className="-mt-0.5 pb-3">
                  <p
                    className={`text-[13px] font-medium ${
                      step.active ? "text-amber-600" : step.done ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {step.label}
                    {step.active && <span className="ml-2 text-[11px] font-normal text-ink-soft">Est. 2 hrs</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "installation":
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">Installation</span>
            <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[10px] font-medium text-signal">
              On track
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-fog/50 p-3.5">
            <div className="flex items-center gap-2">
              <RouterIcon className="h-4 w-4 text-signal" />
              <p className="text-[13px] font-medium text-ink">Technician arriving Thu, 14 Aug</p>
            </div>
            <p className="mt-0.5 pl-6 text-[12px] text-ink-soft">Window: 9:00 AM – 12:00 PM</p>
          </div>

          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-signal to-signal/70" />
          </div>

          <div className="mt-4 space-y-3">
            {[
              { label: "Order placed", date: "2 Aug", done: true },
              { label: "Technician scheduled", date: "6 Aug", done: true },
              { label: "Installation in progress", date: "14 Aug", done: true, active: true },
              { label: "Service activated", date: "Pending", done: false },
            ].map((step) => (
              <div key={step.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                      step.done ? "bg-signal" : "border border-line"
                    }`}
                  >
                    {step.done && <CheckIcon className="h-2.5 w-2.5 text-paper" />}
                  </span>
                  <span className={`text-[13px] ${step.active ? "font-semibold text-ink" : "text-ink-soft"}`}>
                    {step.label}
                  </span>
                </div>
                <span className="text-[11.5px] text-ink-soft">{step.date}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function PortalDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = moments[activeIndex];

  useEffect(() => {
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % moments.length);
    }, DURATION);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const sidebarActiveLabel = active.sidebarActive;

  const cards = useMemo(
    () => [
      { title: "Internet status", value: "Online", tint: "text-emerald-600" },
      { title: "Current plan", value: "100 Mbps Unlimited", tint: "text-ink" },
      { title: "Next payment", value: "$79 · due 24 Sep", tint: "text-ink" },
      { title: "Service active since", value: "12 Aug 2023", tint: "text-ink" },
    ],
    [],
  );

  return (
    <div className="w-full">
      {/* Headline that changes with the active moment */}
      <div className="mb-8 h-[74px] text-center sm:h-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold tracking-tight sm:text-[28px]" style={{ color: "#34D399" }}>
              {active.headline}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">{active.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stage: dimmed background dashboard + floating glass panel */}
      <div className="relative mx-auto h-[520px] w-full max-w-[860px] overflow-hidden rounded-2xl border border-line bg-fog shadow-[0_20px_60px_-20px_rgba(7,34,72,0.12)] sm:h-[560px]">
        {/* Background mock portal */}
        <div className="absolute inset-0 flex opacity-[0.55] blur-[2px] saturate-[1.05]">
          {/* sidebar */}
          <div className="flex w-[168px] flex-none flex-col border-r border-line bg-fog/80 p-4">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-signal text-[11px] font-bold text-paper">
                F
              </span>
              <span className="text-[13px] font-semibold text-ink">FibreHood</span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const on = item.label === sidebarActiveLabel;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition-colors ${
                      on ? "bg-signal/10 text-signal font-medium" : "text-ink-soft"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* main */}
          <div className="flex-1 bg-paper p-6">
            <p className="text-[15px] font-semibold text-ink">Good afternoon, Dillan</p>
            <p className="mt-1 text-[12px] text-ink-soft">42 Riverside Lane, Unit 3 · Account #FH-20481</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {cards.map((c) => (
                <div key={c.title} className="rounded-lg border border-line bg-fog/50 p-3.5">
                  <p className="text-[10.5px] uppercase tracking-wide text-ink-soft">{c.title}</p>
                  <p className={`mt-1.5 text-[14px] font-semibold ${c.tint}`}>{c.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line bg-fog/50 p-3.5">
                <p className="text-[10.5px] uppercase tracking-wide text-ink-soft">Pay my bill</p>
                <p className="mt-1.5 text-[12.5px] text-ink-soft">$79 due 24 Sep</p>
              </div>
              <div className="rounded-lg border border-line bg-fog/50 p-3.5">
                <p className="text-[10.5px] uppercase tracking-wide text-ink-soft">Get support</p>
                <p className="mt-1.5 text-[12.5px] text-ink-soft">Open a conversation</p>
              </div>
            </div>
          </div>
        </div>

        {/* gradient wash — subtle fade on light bg */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fog/10 via-transparent to-fog/20" />

        {/* Floating glass panel */}
        <div
          className="absolute left-1/2 top-1/2 flex w-[92%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-line bg-paper/90 p-5 shadow-[0_20px_60px_-16px_rgba(7,34,72,0.18),0_2px_8px_rgba(7,34,72,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:p-6"
          style={{
            height: "420px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 20px), transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 20px), transparent 100%)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              <PanelBody moment={active.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
