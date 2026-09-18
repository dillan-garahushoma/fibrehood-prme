import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Gauge,
  LifeBuoy,
  MapPin,
  Package,
  RefreshCw,
  Receipt,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import {
  CONNECTION,
  CUSTOMER,
  NETWORK_STATUS,
  PERF_RANGES,
  USAGE,
} from "../data";
import { fmtBytes, fmtMoney } from "../lib";
import {
  Button,
  Card,
  CardHeader,
  DetailRow,
  Donut,
  IconBox,
  Pill,
  Stat,
  StatusDot,
  StatusPill,
} from "../ui";
import { CHART } from "../charts";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function ConnectionHero() {
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState("just now");
  const { notify } = usePortal();

  useEffect(() => {
    const t = setInterval(() => setLastChecked("just now"), 30_000);
    return () => clearInterval(t);
  }, []);

  const runCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setLastChecked("just now");
      notify({
        type: "success",
        title: "Line check complete",
        description: "Your fibre connection is healthy — no issues found.",
      });
    }, 1400);
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-signal p-6 text-paper shadow-lift sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-loop/15 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-64 w-64 rounded-full bg-sky-400/10 blur-[70px]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
            <span className="font-heading text-sm font-extrabold uppercase tracking-[0.28em] text-paper/90">
              Connected
            </span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.9rem]">
            {CONNECTION.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-paper/70">
            Your {CONNECTION.lineType} link via the {CONNECTION.gateway} is stable,
            with no known issues in your area.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-loop" />
              Last checked {lastChecked}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-loop" />
              Uptime {CONNECTION.uptime} · {CONNECTION.uptimeWindow}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Live signal graphic */}
          <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
            <div className="relative grid h-36 w-36 place-items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute rounded-full border border-loop/40"
                  style={{
                    width: `${44 + i * 40}px`,
                    height: `${44 + i * 40}px`,
                    animation: `fhPulse 2.6s ease-out ${i * 0.55}s infinite`,
                  }}
                />
              ))}
              <span className="grid h-11 w-11 place-items-center rounded-full bg-loop text-signal">
                <Wifi className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">Uptime</p>
              <p className="mt-1 font-heading text-3xl font-extrabold tracking-tight">{CONNECTION.uptime}</p>
              <p className="mt-0.5 text-xs text-paper/60">last 30 days</p>
            </div>
            <Button
              variant="primary"
              onClick={runCheck}
              disabled={checking}
              className="w-full"
            >
              {checking ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Checking…
                </>
              ) : (
                <>
                  Run a line check <Zap className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SummaryCards() {
  const { currentPlan, billPaid } = usePortal();
  const [lastChecked] = useState("just now");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Connection */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <IconBox tone="green">
            <Wifi className="h-5 w-5" />
          </IconBox>
          <StatusPill status="connected" label="Connected" />
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Connection</p>
        <p className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">Running normally</p>
        <div className="mt-3 space-y-1.5 text-[13px]">
          <DetailRow label="Network status" value={<span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">Operational</span>} />
          <DetailRow label="Last checked" value={lastChecked} />
          <DetailRow label="Uptime (30d)" value={CONNECTION.uptime} mono />
        </div>
      </Card>

      {/* Current plan */}
      <Card className="flex flex-col p-5">
        <div className="flex items-center justify-between">
          <IconBox tone="navySoft">
            <Package className="h-5 w-5" />
          </IconBox>
          <Pill tone="navy" className="text-[11px]">{currentPlan.contract === "Month-to-month" ? "No lock-in" : "Contract"}</Pill>
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Current plan</p>
        <p className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">{currentPlan.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {currentPlan.download} Mbps down · {currentPlan.upload} Mbps up
        </p>
        <div className="mt-3 space-y-1.5 text-[13px]">
          <DetailRow label="Monthly price" value={fmtMoney(currentPlan.price, { decimals: 0 })} mono />
          <DetailRow label="Billing cycle" value="Monthly · 1st" />
        </div>
        <Link to="/portal/plan" className="mt-auto pt-4">
          <Button variant="outline" size="sm" className="w-full">
            Manage plan <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </Card>

      {/* Usage */}
      <Card className="flex flex-col p-5">
        <div className="flex items-center justify-between">
          <IconBox tone="goldSoft">
            <Gauge className="h-5 w-5" />
          </IconBox>
          <Pill tone="gold">Unlimited</Pill>
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Usage</p>
        <div className="mt-1 flex items-center gap-4">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight text-foreground">
              {fmtBytes(USAGE.usedGb)}
            </p>
            <p className="text-sm text-muted-foreground">used this cycle</p>
          </div>
          <Donut value={USAGE.percentUsed} size={64} stroke={8} color={CHART.gold}>
            <span className="text-xs font-bold text-foreground">{USAGE.percentUsed}%</span>
          </Donut>
        </div>
        <div className="mt-3 text-[13px]">
          <DetailRow label="Cycle" value="1 – 30 Sep" />
        </div>
        <Link to="/portal/internet" className="mt-auto pt-4">
          <Button variant="outline" size="sm" className="w-full">
            View usage <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </Card>

      {/* Next bill */}
      <Card className="flex flex-col p-5">
        <div className="flex items-center justify-between">
          <IconBox tone="navy">
            <Receipt className="h-5 w-5" />
          </IconBox>
          {billPaid ? <StatusPill status="paid" label="Paid" /> : <StatusPill status="upcoming" label="Upcoming" />}
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">Next bill</p>
        <p className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-foreground">
          {fmtMoney(billPaid ? 0 : currentPlan.price)}
        </p>
        <p className="text-sm text-muted-foreground">{billPaid ? "Nothing due — you're all set" : `Due ${billPaid ? "—" : "1 Oct 2026"}`}</p>
        <div className="mt-3 space-y-1.5 text-[13px]">
          <DetailRow label="Period" value="1 – 30 Sep" />
          <DetailRow label="Auto-pay" value={<span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><Check className="h-3.5 w-3.5" /> On</span>} />
        </div>
        <Link to="/portal/billing" className="mt-auto pt-4">
          <Button variant="primary" size="sm" className="w-full" disabled={billPaid}>
            {billPaid ? "Paid" : "Pay now"} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Card>
    </div>
  );
}

function NetworkStatusCard() {
  const [showTimeline, setShowTimeline] = useState(false);
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="relative mt-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Fibrehood Network
            </p>
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
              {NETWORK_STATUS.headline}
            </h3>
            <p className="text-sm text-muted-foreground">{NETWORK_STATUS.subline}</p>
          </div>
        </div>
        <button
          onClick={() => setShowTimeline((v) => !v)}
          className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-signal transition-colors hover:text-signal/80 dark:text-loop"
        >
          {showTimeline ? "Hide timeline" : "View maintenance timeline"}
          <ChevronRight className={`h-4 w-4 transition-transform ${showTimeline ? "rotate-90" : ""}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
        {NETWORK_STATUS.services.map((s, i) => (
          <div key={s.id} className={`p-5 ${i > 0 ? "sm:border-l sm:border-border" : ""} ${i >= 2 ? "max-sm:border-t" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                {s.id === "internet" && <Wifi className="h-4 w-4 text-muted-foreground" />}
                {s.id === "fibre" && <Zap className="h-4 w-4 text-muted-foreground" />}
                {s.id === "auth" && <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                {s.id === "region" && <MapPin className="h-4 w-4 text-muted-foreground" />}
                {s.label}
              </span>
              <StatusDot tone="green" />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      {showTimeline && (
        <div className="border-t border-border bg-muted/30 px-5 py-5 sm:px-6">
          <ol className="relative ml-2 space-y-5 border-l border-border pl-6">
            {NETWORK_STATUS.events.map((e) => (
              <li key={e.title + e.date} className="relative">
                <span
                  className={`absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-card ${
                    e.status === "scheduled" ? "bg-loop" : "bg-slate-400"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-foreground">{e.title}</p>
                  <StatusPill status={e.status} label={e.status === "scheduled" ? "Scheduled" : "Resolved"} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {e.date} · {e.window}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{e.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Card>
  );
}

function PerformanceSnapshot() {
  const data = PERF_RANGES.find((r) => r.key === "week").series;
  const { currentPlan } = usePortal();
  return (
    <Card className="flex flex-col p-5 sm:p-6">
      <CardHeader
        eyebrow="This week"
        title="Performance snapshot"
        sub={`Average ${currentPlan.download} Mbps plan · within expected range`}
        icon={<Activity className="h-4 w-4" />}
      />
      <div className="mt-4 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="snap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART.gold} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART.gold} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="download" stroke={CHART.gold} strokeWidth={2.5} fill="url(#snap)" isAnimationActive />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
        <Stat label="Avg download" value="28.7 Mbps" />
        <Stat label="Avg upload" value="13.4 Mbps" />
        <Stat label="Latency" value="9 ms" />
      </div>
      <Link to="/portal/internet" className="mt-4">
        <Button variant="ghost" size="sm" className="w-full">
          Open My Internet <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </Card>
  );
}

function HelpCard() {
  return (
    <Card className="flex flex-col p-5 sm:p-6">
      <CardHeader
        eyebrow="Need a hand?"
        title="We're here 7 days a week"
        sub="Live chat, self-service checks and ticket tracking."
        icon={<LifeBuoy className="h-4 w-4" />}
      />
      <div className="mt-5 flex-1 space-y-2.5">
        {["Run a line check", "Open a support ticket", "Track an existing ticket"].map((t) => (
          <div key={t} className="flex items-center gap-2.5 text-sm text-foreground">
            <Check className="h-4 w-4 text-loop" />
            {t}
          </div>
        ))}
      </div>
      <Link to="/portal/support" className="mt-5">
        <Button variant="navy" className="w-full">
          Get help <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </Card>
  );
}

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {greeting()}, {CUSTOMER.firstName}
          </p>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Here's how your Fibrehood connection is doing.
          </p>
        </div>
        <Pill tone="green" dot="green">
          All systems operational
        </Pill>
      </div>

      <ConnectionHero />
      <SummaryCards />
      <NetworkStatusCard />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PerformanceSnapshot />
        <HelpCard />
      </div>
    </div>
  );
}
