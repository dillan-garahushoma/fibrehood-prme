import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  Gamepad2,
  Gauge,
  Laptop,
  MonitorPlay,
  RefreshCw,
  Smartphone,
  Timer,
  TrendingUp,
  Tv,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import { CONNECTION, PERF_RANGES, PERF_SUMMARY, USAGE } from "../data";
import { fmtBytes } from "../lib";
import { Button, Card, CardHeader, Donut, Pill, Segmented, Stat } from "../ui";
import { axisLine, axisTickStyle, ChartFrame, ChartTooltip, CHART, gridStroke } from "../charts";
import { cn } from "@/lib/utils";

const RANGE_OPTIONS = PERF_RANGES.map((r) => ({ value: r.key, label: r.label }));
const METRIC_OPTIONS = [
  { value: "speed", label: "Speed" },
  { value: "latency", label: "Latency" },
  { value: "stability", label: "Stability" },
];

function PerformanceChart() {
  const { theme } = usePortal();
  const dark = theme === "dark";
  const [range, setRange] = useState("week");
  const [metric, setMetric] = useState("speed");
  const activeRange = PERF_RANGES.find((r) => r.key === range);
  const data = activeRange.series;

  const formatter = {
    download: (v) => `${v} Mbps`,
    upload: (v) => `${v} Mbps`,
    latency: (v) => `${v} ms`,
    stability: (v) => `${v}%`,
  };

  const interval = data.length > 20 ? Math.ceil(data.length / 8) : 0;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <CardHeader
          eyebrow="Connection performance"
          title={metric === "speed" ? "Download & upload speed" : metric === "latency" ? "Latency over time" : "Connection stability"}
          sub={`${activeRange.label} · ${activeRange.blurb}`}
          icon={<Activity className="h-4 w-4" />}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Segmented options={RANGE_OPTIONS} value={range} onChange={setRange} size="sm" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Segmented options={METRIC_OPTIONS} value={metric} onChange={setMetric} size="sm" />
        <span className="ml-auto hidden items-center gap-4 text-xs font-medium text-muted-foreground sm:flex">
          {metric === "speed" && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: CHART.gold }} /> Download
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: CHART.blue }} /> Upload
              </span>
            </>
          )}
          {metric === "latency" && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: CHART.sky }} /> Latency
            </span>
          )}
          {metric === "stability" && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#10b981" }} /> Stability
            </span>
          )}
        </span>
      </div>

      <ChartFrame height={280} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {metric === "speed" ? (
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.gold} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={CHART.gold} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ulGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.blue} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={CHART.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridStroke(dark)} strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="label" tick={axisTickStyle(dark)} axisLine={{ stroke: axisLine(dark) }} tickLine={false} interval={interval} />
              <YAxis tick={axisTickStyle(dark)} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => `${v}`} />
              <Tooltip content={<ChartTooltip formatter={formatter} />} cursor={{ stroke: CHART.gold, strokeDasharray: "3 3" }} />
              <Area type="monotone" dataKey="download" name="Download" stroke={CHART.gold} strokeWidth={2.5} fill="url(#dlGrad)" animationDuration={700} />
              <Area type="monotone" dataKey="upload" name="Upload" stroke={CHART.blue} strokeWidth={2.5} fill="url(#ulGrad)" animationDuration={700} />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={gridStroke(dark)} strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="label" tick={axisTickStyle(dark)} axisLine={{ stroke: axisLine(dark) }} tickLine={false} interval={interval} />
              <YAxis
                domain={metric === "stability" ? [96, 100.5] : ["auto", "auto"]}
                tick={axisTickStyle(dark)}
                axisLine={false}
                tickLine={false}
                width={52}
                tickFormatter={(v) => (metric === "stability" ? `${v}%` : `${v}`)}
              />
              <Tooltip content={<ChartTooltip formatter={formatter} />} cursor={{ stroke: CHART.gold, strokeDasharray: "3 3" }} />
              <Line
                type="monotone"
                dataKey={metric}
                name={metric === "latency" ? "Latency" : "Stability"}
                stroke={metric === "stability" ? "#10b981" : CHART.sky}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
                animationDuration={700}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </ChartFrame>

      {/* Summary stats */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
        <Stat label="Avg download" value={PERF_SUMMARY.avgDownload} icon={<ArrowDown className="h-4 w-4" />} />
        <Stat label="Avg upload" value={PERF_SUMMARY.avgUpload} icon={<ArrowUp className="h-4 w-4" />} />
        <Stat label="Avg latency" value={PERF_SUMMARY.avgLatency} icon={<Timer className="h-4 w-4" />} />
        <Stat label="Stability" value={PERF_SUMMARY.stability} icon={<Zap className="h-4 w-4" />} />
      </div>
    </Card>
  );
}

function PerformanceVerdict() {
  return (
    <Card className="flex flex-col gap-3 border-l-4 border-l-loop p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div>
          <p className="font-heading text-base font-bold tracking-tight text-foreground">{PERF_SUMMARY.verdict}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{PERF_SUMMARY.verdictBody}</p>
        </div>
      </div>
      <Pill tone="green" dot="green">
        Healthy
      </Pill>
    </Card>
  );
}

// ── Speed test ──────────────────────────────────────────────────────────────
function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, start, end) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

const GAUGE_MAX = 50; // Mbps scale for the dial
const GAUGE_START = 150;
const GAUGE_SWEEP = 240;

function SpeedGauge({ value, unit, label, sub }) {
  const frac = Math.min(1, value / GAUGE_MAX);
  const size = 230;
  const cx = size / 2;
  const cy = size / 2;
  const r = 88;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-0">
        <path d={arcPath(cx, cy, r, GAUGE_START, GAUGE_START + GAUGE_SWEEP)} fill="none" stroke="var(--gauge-track, hsl(var(--muted)))" strokeWidth={16} strokeLinecap="round" />
        <path
          d={arcPath(cx, cy, r, GAUGE_START, GAUGE_START + frac * GAUGE_SWEEP)}
          fill="none"
          stroke={CHART.gold}
          strokeWidth={16}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
        {/* tick labels */}
        <text x={cx - r - 8} y={cy + 14} textAnchor="middle" fontSize="11" fill="hsl(210 18% 45%)" fontWeight={600}>0</text>
        <text x={cx + r + 8} y={cy + 14} textAnchor="middle" fontSize="11" fill="hsl(210 18% 45%)" fontWeight={600}>50</text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
        <p className="font-heading text-5xl font-extrabold tracking-tighter text-foreground">
          {value.toFixed(value < 10 && value > 0 ? 1 : 0)}
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{unit}</p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">{label}</p>
        {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

const STAGES = [
  { key: "ping", label: "Measuring latency", dur: 900 },
  { key: "download", label: "Testing download speed", dur: 2000 },
  { key: "upload", label: "Testing upload speed", dur: 1500 },
];

function SpeedTest() {
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [stage, setStage] = useState(null);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState(null);
  const rafRef = useRef(null);
  const timersRef = useRef([]);

  const clearAll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  useEffect(() => clearAll, []);

  const animateTo = (target, from = 0, dur = 1000) => {
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const run = () => {
    clearAll();
    setPhase("running");
    setResults(null);
    setValue(0);

    const targets = { ping: 8, download: 28.7, upload: 13.9 };
    let acc = 0;
    STAGES.forEach((s) => {
      acc += s.dur;
      timersRef.current.push(
        setTimeout(() => {
          setStage(s);
          if (s.key === "ping") animateTo(targets.ping, 0, 500);
          else if (s.key === "download") animateTo(targets.download, targets.ping, s.dur - 400);
          else animateTo(targets.upload, targets.download, s.dur - 300);
        }, acc - s.dur)
      );
    });
    timersRef.current.push(
      setTimeout(() => {
        setPhase("done");
        setStage(null);
        setResults({ ping: 8, download: 28.7, upload: 13.9, jitter: 1.2 });
      }, acc + 250)
    );
  };

  const cancel = () => {
    clearAll();
    setPhase("idle");
    setStage(null);
    setValue(0);
    setResults(null);
  };

  const metric = phase === "running" && stage ? stage.key : phase === "done" ? "download" : "download";
  const unit = metric === "ping" ? "ms" : "Mbps";
  const label = phase === "running" && stage ? stage.label : phase === "done" ? "Download speed" : "Ready when you are";
  const sub =
    phase === "running"
      ? STAGES.findIndex((s) => s.key === stage?.key) >= 0
        ? `Step ${STAGES.findIndex((s) => s.key === stage?.key) + 1} of ${STAGES.length}`
        : ""
      : phase === "done"
      ? `Ping ${results?.ping} ms · Jitter ${results?.jitter} ms`
      : "Measure your live speeds on your current plan";

  return (
    <Card className="p-5 sm:p-6">
      <CardHeader
        eyebrow="Speed test"
        title="How fast is your connection?"
        sub="Run a quick test on the device you're using now."
        icon={<Gauge className="h-4 w-4" />}
      />

      <div className="mt-6">
        <SpeedGauge value={value} unit={unit} label={label} sub={sub} />

        {phase === "done" && (
          <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-2">
            {[
              { k: "Download", v: `${results.download} Mbps`, tone: "text-foreground" },
              { k: "Upload", v: `${results.upload} Mbps`, tone: "text-foreground" },
              { k: "Ping", v: `${results.ping} ms`, tone: "text-foreground" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-muted/60 px-3 py-2.5 text-center">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{s.k}</p>
                <p className={cn("mt-0.5 font-mono text-sm font-bold", s.tone)}>{s.v}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {phase !== "running" ? (
            <Button variant="primary" size="lg" onClick={run}>
              <Zap className="h-4 w-4" />
              {phase === "done" ? "Run again" : "Run speed test"}
            </Button>
          ) : (
            <Button variant="outline" size="lg" onClick={cancel}>
              <X className="h-4 w-4" /> Cancel
            </Button>
          )}
        </div>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          {phase === "running" ? (
            <><RefreshCw className="h-3.5 w-3.5 animate-spin" /> Testing on a simulated line — no data leaves this device.</>
          ) : (
            <>Results are indicative and may vary with Wi-Fi conditions.</>
          )}
        </p>
      </div>
    </Card>
  );
}

const DEVICE_ICONS = { tv: Tv, laptop: Laptop, phone: Smartphone, gamepad: Gamepad2 };

function UsageSection() {
  const { theme } = usePortal();
  const dark = theme === "dark";
  return (
    <div id="usage" className="space-y-4 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Data usage</p>
          <h2 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">This billing cycle</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {USAGE.cycle.start} – {USAGE.cycle.end} · {USAGE.cycle.dayCount} days
          </p>
        </div>
        <Pill tone="gold" dot="gold">Unlimited plan</Pill>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Current usage donut */}
        <Card className="flex flex-col items-center p-6">
          <Donut value={USAGE.percentUsed} size={204} stroke={18} color={CHART.gold}>
            <div className="text-center">
              <p className="font-heading text-4xl font-extrabold tracking-tighter text-foreground">{fmtBytes(USAGE.usedGb)}</p>
              <p className="text-xs font-medium text-muted-foreground">used so far</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{USAGE.percentUsed}% of guidance</p>
            </div>
          </Donut>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Your plan has <span className="font-semibold text-foreground">unlimited data</span> — this is for
            visibility only, not a limit.
          </p>

          <div className="mt-4 flex w-full items-center gap-2 rounded-xl bg-muted/50 px-3.5 py-2.5">
            <TrendingUp className="h-4 w-4 shrink-0 text-loop" />
            <p className="text-xs font-semibold text-foreground">{USAGE.comparisonText}</p>
          </div>

          <div className="mt-4 grid w-full grid-cols-2 gap-3 border-t border-border pt-4">
            <Stat label="Fair-use guidance" value={fmtBytes(USAGE.guidanceGb)} />
            <Stat label="Avg daily use" value={`${USAGE.avgDailyGb} GB`} />
          </div>
        </Card>

        {/* Daily usage bar chart */}
        <Card className="p-5 sm:p-6 lg:col-span-2">
          <CardHeader
            eyebrow="Daily usage"
            title="Usage by day"
            sub="Last 14 days · dotted line shows your daily average"
            icon={<CalendarDays className="h-4 w-4" />}
          />
          <ChartFrame height={260} className="mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USAGE.daily} margin={{ top: 12, right: 8, left: -18, bottom: 0 }} barCategoryGap="28%">
                <CartesianGrid stroke={gridStroke(dark)} strokeDasharray="3 6" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={axisTickStyle(dark)}
                  axisLine={{ stroke: axisLine(dark) }}
                  tickLine={false}
                  interval={1}
                  tickFormatter={(l) => l.split(" ")[0]}
                />
                <YAxis tick={axisTickStyle(dark)} axisLine={false} tickLine={false} width={46} tickFormatter={(v) => `${v}`} />
                <Tooltip
                  content={<ChartTooltip formatter={{ value: (v) => `${v} GB` }} />}
                  cursor={{ fill: dark ? "hsl(215 40% 20%)" : "hsl(218 24% 94%)" }}
                />
                <ReferenceLine
                  y={USAGE.avgDailyGb}
                  stroke={CHART.gold}
                  strokeDasharray="5 5"
                  label={{ value: "Daily avg", position: "insideTopRight", fill: CHART.gold, fontSize: 11, fontWeight: 600 }}
                />
                <Bar dataKey="value" name="Usage" radius={[6, 6, 0, 0]} fill={CHART.navy} animationDuration={700} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Activity breakdown */}
        <Card className="p-5 sm:p-6 lg:col-span-3">
          <CardHeader
            eyebrow="Network activity"
            title="Where your data goes"
            sub={`${fmtBytes(USAGE.usedGb)} across all your connected devices this cycle`}
            icon={<MonitorPlay className="h-4 w-4" />}
          />
          <ul className="mt-5 space-y-4">
            {USAGE.activity.map((a) => (
              <li key={a.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{a.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {a.value} GB · {a.pct}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${a.pct}%`, background: a.color }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Top devices */}
        <Card className="p-5 sm:p-6 lg:col-span-2">
          <CardHeader eyebrow="Devices" title="Top devices" sub="Most active on your network this cycle" icon={<Wifi className="h-4 w-4" />} />
          <ul className="mt-4 divide-y divide-border">
            {USAGE.devices.map((d) => {
              const Icon = DEVICE_ICONS[d.icon] || Tv;
              return (
                <li key={d.name} className="flex items-center gap-3.5 py-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.kind}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-foreground">{d.used} GB</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default function Internet() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          My Internet
        </h1>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Understand how your connection is performing, right now and over time.
        </p>
      </div>

      <PerformanceVerdict />
      <PerformanceChart />
      <UsageSection />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SpeedTest />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-5 sm:p-6">
            <CardHeader eyebrow="Your line" title="Service details" icon={<Wifi className="h-4 w-4" />} />
            <div className="mt-4 divide-y divide-border">
              {[
                ["Line type", CONNECTION.lineType],
                ["Gateway", CONNECTION.gateway],
                ["Uptime (30 days)", CONNECTION.uptime],
                ["Since", CONNECTION.uptimeDuration],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <span className="text-sm font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-signal p-5 text-paper sm:p-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">Live status</p>
            </div>
            <p className="mt-3 font-heading text-xl font-extrabold tracking-tight">{CONNECTION.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-paper/70">
              No packet loss or instability detected on your line in the last 24 hours.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
