import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Loader2,
  Receipt,
  Search,
  ShieldCheck,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import { BILLING, CUSTOMER } from "../data";
import { fmtMoney } from "../lib";
import { Button, Card, CardHeader, EmptyState, Modal, Pill, StatusPill } from "../ui";
import { axisLine, axisTickStyle, ChartFrame, ChartTooltip, CHART, gridStroke } from "../charts";
import { cn } from "@/lib/utils";

function PayModal({ open, onClose }) {
  const { currentPlan, payNow } = usePortal();
  const [state, setState] = useState("confirm"); // confirm | processing | success
  const amount = fmtMoney(currentPlan.price);

  const close = () => {
    setState("confirm");
    onClose();
  };

  const start = () => {
    setState("processing");
    setTimeout(() => {
      setState("success");
      payNow();
      setTimeout(close, 1400);
    }, 1300);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={state === "success" ? "Payment successful" : `Pay ${amount} now`}
      sub={state === "success" ? "Thanks — your service continues without interruption." : `Due ${BILLING.dueDate} · ${BILLING.period}`}
      footer={
        state === "confirm" ? (
          <>
            <Button variant="outline" onClick={close}>Not now</Button>
            <Button variant="primary" onClick={start}>
              <CreditCard className="h-4 w-4" /> Pay {amount}
            </Button>
          </>
        ) : undefined
      }
    >
      {state === "confirm" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/40 p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Amount due</p>
              <p className="text-xs text-muted-foreground">{BILLING.period}</p>
            </div>
            <p className="font-heading text-2xl font-extrabold tracking-tight text-foreground">{amount}</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{BILLING.paymentMethod.label}</p>
              <p className="text-xs text-muted-foreground">Expires {BILLING.paymentMethod.exp}</p>
            </div>
            <Pill tone="green" dot="green">Default</Pill>
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            Payments are processed securely. A receipt will be emailed to {CUSTOMER.email}.
          </div>
        </div>
      )}
      {state === "processing" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <Loader2 className="h-9 w-9 animate-spin text-loop" />
          <p className="text-sm font-medium text-muted-foreground">Processing your payment…</p>
        </div>
      )}
      {state === "success" && (
        <div className="flex flex-col items-center gap-3 py-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <p className="font-heading text-lg font-bold text-foreground">{amount} paid</p>
          <p className="text-center text-sm text-muted-foreground">Your receipt has been emailed to you.</p>
        </div>
      )}
    </Modal>
  );
}

const SORT_LABELS = { date: "Date", description: "Description", amount: "Amount", status: "Status" };

function TransactionsTable() {
  const { billPaid, notify, currentPlan } = usePortal();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const rows = useMemo(() => {
    const base = [...BILLING.transactions];
    if (billPaid) {
      base.unshift({
        id: "t-now",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        description: `Home Fibre — ${currentPlan.name}`,
        detail: BILLING.period,
        amount: currentPlan.price,
        status: "Paid",
        ref: "PAY-2026-09-NEW",
        invoice: "Receipt.pdf",
        method: BILLING.paymentMethod.label,
      });
    }
    const q = query.trim().toLowerCase();
    let list = base;
    if (q) {
      list = base.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.status.toLowerCase().includes(q) ||
          t.ref.toLowerCase().includes(q) ||
          t.detail.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      let av, bv;
      if (sortKey === "date") {
        av = new Date(a.date).getTime();
        bv = new Date(b.date).getTime();
      } else if (sortKey === "amount") {
        av = a.amount;
        bv = b.amount;
      } else {
        av = String(a[sortKey] || "").toLowerCase();
        bv = String(b[sortKey] || "").toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [billPaid, currentPlan, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "amount" || key === "date" ? "desc" : "asc");
    }
  };

  const download = (row) => {
    notify({
      type: "success",
      title: "Document ready",
      description: `${row.invoice || "Invoice"} for ${row.ref} was downloaded.`,
    });
  };

  const SortIcon = ({ col }) =>
    sortKey !== col ? (
      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
    ) : sortDir === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-signal dark:text-loop" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-signal dark:text-loop" />
    );

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <CardHeader eyebrow="Recent transactions" title="Billing history" icon={<Receipt className="h-4 w-4" />} />
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions…"
            className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <th key={key} className="px-5 py-3 font-semibold">
                  <button onClick={() => toggleSort(key)} className="inline-flex items-center gap-1.5 hover:text-foreground">
                    {label} <SortIcon col={key} />
                  </button>
                </th>
              ))}
              <th className="px-5 py-3 font-semibold">Reference</th>
              <th className="px-5 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40">
                <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">{t.date}</td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.detail}</p>
                </td>
                <td className={cn("whitespace-nowrap px-5 py-3.5 font-mono font-semibold", t.amount < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                  {t.amount < 0 ? `−${fmtMoney(Math.abs(t.amount))}` : fmtMoney(t.amount)}
                </td>
                <td className="px-5 py-3.5"><StatusPill status={t.status} /></td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-muted-foreground">{t.ref}</td>
                <td className="px-5 py-3.5 text-right">
                  <Button variant="ghost" size="sm" onClick={() => download(t)}>
                    <Download className="h-4 w-4" /> <span className="hidden xl:inline">Download</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <EmptyState
            icon={<FileText className="h-5 w-5" />}
            title="No transactions found"
            body={`Nothing matches "${query}". Try a different search.`}
            action={
              <Button variant="outline" size="sm" onClick={() => setQuery("")}>Clear search</Button>
            }
          />
        )}
      </div>
    </Card>
  );
}

function BillingHistoryChart() {
  const { theme } = usePortal();
  const dark = theme === "dark";
  const formatter = { amount: (v) => fmtMoney(v) };
  return (
    <Card className="p-5 sm:p-6">
      <CardHeader
        eyebrow="Last 8 months"
        title="Billing history"
        sub="Monthly invoice totals, including the upcoming cycle."
        icon={<CalendarClock className="h-4 w-4" />}
      />
      <ChartFrame height={240} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BILLING.history} margin={{ top: 8, right: 8, left: -14, bottom: 0 }} barCategoryGap="32%">
            <CartesianGrid stroke={gridStroke(dark)} strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="month" tick={axisTickStyle(dark)} axisLine={{ stroke: axisLine(dark) }} tickLine={false} />
            <YAxis tick={axisTickStyle(dark)} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => `$${v}`} />
            <Tooltip content={<ChartTooltip formatter={formatter} title={undefined} />} cursor={{ fill: dark ? "hsl(215 40% 20%)" : "hsl(218 24% 94%)" }} />
            <Bar dataKey="amount" name="Amount" radius={[6, 6, 0, 0]} animationDuration={700}>
              {BILLING.history.map((h) => (
                <Cell key={h.month} fill={h.status === "upcoming" ? CHART.gold : CHART.navy} fillOpacity={h.status === "upcoming" ? 0.85 : 0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      <div className="mt-3 flex items-center justify-center gap-5 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: CHART.navy }} /> Paid
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: CHART.gold }} /> Upcoming
        </span>
      </div>
    </Card>
  );
}

export default function Billing() {
  const { currentPlan, billPaid } = usePortal();
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Billing &amp; Payments
        </h1>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Your balance, payment method and full transaction history.
        </p>
      </div>

      {/* Balance hero */}
      <Card className="relative overflow-hidden border-0 bg-signal p-6 text-paper shadow-lift sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-loop/15 blur-[80px]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/60">Amount due</p>
              {billPaid ? <StatusPill status="paid" label="Paid" /> : <StatusPill status="upcoming" label="Upcoming" />}
            </div>
            <p className="mt-2 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              {fmtMoney(billPaid ? 0 : currentPlan.price)}
            </p>
            <p className="mt-2 text-sm text-paper/70">
              {billPaid
                ? "You're all settled for this cycle. Next payment due 1 Oct 2026."
                : `Due ${BILLING.dueDate} · ${BILLING.period}`}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-paper/80">
              <ShieldCheck className="h-4 w-4 text-loop" />
              {BILLING.autopayNote}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:min-w-[240px]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/50">Payment method</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="grid h-9 w-12 place-items-center rounded-lg bg-paper/10 text-[11px] font-bold tracking-wide">
                  {BILLING.paymentMethod.brand.toUpperCase()}
                </span>
                <span className="text-sm font-semibold">{BILLING.paymentMethod.label}</span>
              </div>
            </div>
            <Button variant="primary" size="lg" disabled={billPaid} onClick={() => setPayOpen(true)}>
              <CreditCard className="h-4 w-4" />
              {billPaid ? "Paid — thank you" : `Pay ${fmtMoney(currentPlan.price)} now`}
            </Button>
          </div>
        </div>
      </Card>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Payment status", value: billPaid ? "Paid" : "Upcoming", sub: billPaid ? "This cycle settled" : `Due ${BILLING.dueDate}` },
          { label: "Next payment date", value: "1 Oct 2026", sub: "Monthly · 1st" },
          { label: "Current billing period", value: "1 – 30 Sep 2026", sub: "30 days" },
          { label: "Payment method", value: BILLING.paymentMethod.label, sub: `Expires ${BILLING.paymentMethod.exp}` },
        ].map((c) => (
          <Card key={c.label} className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.label}</p>
            <p className="mt-1.5 font-heading text-lg font-bold tracking-tight text-foreground">{c.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{c.sub}</p>
          </Card>
        ))}
      </div>

      <BillingHistoryChart />
      <TransactionsTable />

      <PayModal open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}
