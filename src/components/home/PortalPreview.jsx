import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { BarChart3, CreditCard, Headset, Check, Send } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const TABS = [
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "support", label: "Support", icon: Headset },
];

const USAGE_DATA = [
  { hour: "00", mbps: 8 },
  { hour: "03", mbps: 5 },
  { hour: "06", mbps: 15 },
  { hour: "09", mbps: 32 },
  { hour: "12", mbps: 41 },
  { hour: "15", mbps: 38 },
  { hour: "18", mbps: 45 },
  { hour: "21", mbps: 28 },
];

const EASE = [0.16, 1, 0.3, 1];

function UsagePanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-soft">This month</p>
          <p className="font-heading text-2xl font-bold text-signal">187 GB</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-soft">Current speed</p>
          <p className="font-heading text-lg font-bold text-signal">48 Mbps</p>
        </div>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={USAGE_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(215 83% 15%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(215 83% 15%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="mbps"
              stroke="hsl(215 83% 15%)"
              strokeWidth={2}
              fill="url(#usageGrad)"
            />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: "hsl(210 18% 40%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid hsl(215 25% 88%)",
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(210 18% 40%)" }}
              formatter={(v) => [`${v} Mbps`, "Speed"]}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-fog p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-soft">Amount due</span>
          <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[10px] font-semibold text-signal">Due Sep 15</span>
        </div>
        <p className="mt-2 font-heading text-3xl font-bold text-signal">$60.00</p>
        <p className="mt-1 text-xs text-ink-soft">Home 50 · 24-month plan</p>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
      >
        <CreditCard className="h-4 w-4" strokeWidth={1.6} />
        Pay now
      </button>
      <div className="flex items-center gap-2 text-xs text-ink-soft">
        <Check className="h-3.5 w-3.5 text-signal/60" strokeWidth={2.5} />
        Auto-pay available
      </div>
    </div>
  );
}

function SupportPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal text-[10px] font-bold text-paper">FH</div>
        <div className="rounded-2xl rounded-tl-sm bg-fog px-3.5 py-2.5 text-sm text-ink">
          Hi! How can we help with your connection today?
        </div>
      </div>
      <div className="flex items-start justify-end gap-2.5">
        <div className="rounded-2xl rounded-tr-sm bg-signal px-3.5 py-2.5 text-sm text-paper">
          My internet has been slow since yesterday.
        </div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-loop text-[10px] font-bold text-signal">You</div>
      </div>
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal text-[10px] font-bold text-paper">FH</div>
        <div className="rounded-2xl rounded-tl-sm bg-fog px-3.5 py-2.5 text-sm text-ink">
          I can see a signal check running on your line — it should resolve in a few minutes. I'll stay with you until it's sorted.
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5">
        <input
          type="text"
          placeholder="Type a message…"
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/50"
          readOnly
        />
        <Send className="h-4 w-4 text-signal/40" strokeWidth={1.6} />
      </div>
    </div>
  );
}

export function PortalPreview() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState("usage");

  return (
    <Reveal>
      <div className="mb-8 max-w-[600px]">
        <span className="eyebrow">
          <span className="h-px w-6 bg-ink-soft/30" />
          Your daily dashboard
        </span>
        <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-signal sm:text-3xl">
          Manage everything online.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          After installation, manage your account, pay bills, track usage and get support — all in one place.
        </p>
      </div>

      {/* Browser window mockup */}
      <div className="overflow-hidden rounded-2xl border border-line shadow-lift">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-fog px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <div className="ml-4 flex-1 rounded-md bg-paper px-3 py-1 text-xs text-ink-soft/60">
            portal.fibrehood.app
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-line bg-paper">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-signal text-signal"
                    : "border-transparent text-ink-soft hover:text-signal"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="min-h-[280px] bg-paper p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {activeTab === "usage" && <UsagePanel />}
              {activeTab === "billing" && <BillingPanel />}
              {activeTab === "support" && <SupportPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

export default PortalPreview;