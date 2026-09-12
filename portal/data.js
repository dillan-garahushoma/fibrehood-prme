// ─────────────────────────────────────────────────────────────────────────────
// FibreHood Client Portal — realistic fictional sample data.
//
// Everything here is deliberately shaped like an API payload so it can later
// be replaced 1:1 with real FibreHood customer / account / network endpoints
// without a redesign. Generation is deterministic (seeded) so the dashboard
// is stable across renders and reloads.
// ─────────────────────────────────────────────────────────────────────────────
import { PLANS } from "@/data/plans";
import { mulberry32 } from "./lib";

export { PLANS };

// ── Customer ────────────────────────────────────────────────────────────────
export const CUSTOMER = {
  firstName: "Welly",
  fullName: "Welly Ndlovu",
  initials: "WN",
  email: "welly.ndlovu@example.com",
  phone: "+263 77 123 4567",
  accountNumber: "FH-2847163",
  customerId: "FH-C-009214",
  serviceAddress: "14 Borrowdale Rd, Harare",
  addressDetail: "Unit 2, Borrowdale, Harare, Zimbabwe",
  memberSince: "March 2024",
  serviceSince: "18 Mar 2024",
  communication: {
    email: true,
    sms: true,
    whatsapp: false,
    marketing: false,
  },
};

// ── Plan ────────────────────────────────────────────────────────────────────
export const CURRENT_PLAN_ID = "pro-home-connect";
export const HOME_PLANS = PLANS.filter((p) => p.segment === "home").sort(
  (a, b) => a.displayOrder - b.displayOrder
);
export const PLAN_META = {
  billingCycle: "Monthly · renews on the 1st",
  nextRenewal: "1 Oct 2026",
  contract: "Month-to-month · no lock-in",
  status: "Active",
  router: "FibreHood WiFi 6 Router",
  routerIncluded: true,
  installDate: "18 Mar 2024",
  activationFee: "US$65.00 (paid)",
};

// ── Connection ──────────────────────────────────────────────────────────────
export const CONNECTION = {
  status: "connected", // connected | degraded | down
  label: "CONNECTED",
  headline: "Your fibre connection is running normally.",
  lastChecked: "just now",
  uptime: "99.98%",
  uptimeWindow: "Last 30 days",
  uptimeDuration: "29d 23h since last reset",
  gateway: "Borrowdale Exchange",
  lineType: "Fibre to the Home (FTTH)",
};

// ── Network / service status ────────────────────────────────────────────────
export const NETWORK_STATUS = {
  overall: "operational",
  headline: "All systems operational",
  subline: "Everything is running as expected across your area.",
  services: [
    { id: "internet", label: "Internet service", status: "operational", note: "No issues detected" },
    { id: "fibre", label: "Fibre network", status: "operational", note: "Borrowdale exchange · nominal load" },
    { id: "auth", label: "Authentication", status: "operational", note: "Login & account services healthy" },
    { id: "region", label: "Regional service", status: "operational", note: "Harare North · all clear" },
  ],
  events: [
    {
      date: "14 Sep 2026",
      window: "03:00 – 03:45",
      title: "Planned maintenance",
      detail: "Borrowdale exchange — firmware upgrade. Expect a brief interruption.",
      status: "scheduled",
    },
    {
      date: "27 Aug 2026",
      window: "14:22",
      title: "Brief outage",
      detail: "Local fibre link fault. Restored in 11 minutes.",
      status: "resolved",
    },
    {
      date: "02 Aug 2026",
      window: "03:00",
      title: "Maintenance completed",
      detail: "Network capacity upgrade — no customer impact.",
      status: "resolved",
    },
    {
      date: "18 Jun 2026",
      window: "01:00 – 01:20",
      title: "Scheduled maintenance",
      detail: "Core routing update. Completed ahead of schedule.",
      status: "resolved",
    },
  ],
};

// ── Connection performance series ──────────────────────────────────────────
const hourLabel = (i) => `${String(i).padStart(2, "0")}:00`;
const dayLabel = (i) => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7];
const monthLabel = (i) => `Sep ${i + 1}`;

function buildSeries(count, baseDown, baseUp, baseLat, variance, labelFor, seed) {
  const rand = mulberry32(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const down = Math.round(baseDown * (1 + (rand() - 0.5) * variance) * 10) / 10;
    const up = Math.round(baseUp * (1 + (rand() - 0.5) * variance * 1.25) * 10) / 10;
    const latency = Math.round(baseLat * (1 + (rand() - 0.42) * 0.7));
    const stability = Math.round((99 + rand() * 0.95) * 100) / 100;
    out.push({ label: labelFor(i), download: down, upload: up, latency, stability });
  }
  return out;
}

export const PERF_RANGES = [
  {
    key: "today",
    label: "Today",
    blurb: "Hourly",
    points: 24,
    series: buildSeries(24, 29.4, 13.8, 9, 0.12, hourLabel, 101),
  },
  {
    key: "week",
    label: "7 days",
    blurb: "Daily",
    points: 7,
    series: buildSeries(7, 28.9, 13.6, 9, 0.16, dayLabel, 202),
  },
  {
    key: "month",
    label: "30 days",
    blurb: "Daily",
    points: 30,
    series: buildSeries(30, 28.6, 13.2, 10, 0.2, monthLabel, 303),
  },
];

export const PERF_SUMMARY = {
  avgDownload: "28.7 Mbps",
  avgUpload: "13.4 Mbps",
  avgLatency: "9 ms",
  stability: "99.9%",
  verdict: "Your connection is performing well",
  verdictBody: "Your average performance this week is within the expected range for your plan.",
};

// ── Usage ───────────────────────────────────────────────────────────────────
const cycle = { start: "1 Sep 2026", end: "30 Sep 2026", dayCount: 30 };

function buildDailyUsage() {
  const rand = mulberry32(777);
  const days = [];
  // Last 14 days (28 Aug – 10 Sep) for the daily bar chart.
  const start = new Date(2026, 7, 28); // 28 Aug 2026
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const gb = Math.round((14 + rand() * 26) * 10) / 10; // ~14–40 GB/day
    days.push({
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      short: d.toLocaleDateString("en-GB", { day: "numeric" }),
      value: gb,
    });
  }
  return days;
}

export const USAGE = {
  cycle,
  usedGb: 312,
  guidanceGb: 1000,
  unlimited: true,
  percentUsed: 31,
  comparisonPct: 18,
  comparisonText: "18% more usage than your previous month",
  daily: buildDailyUsage(),
  avgDailyGb: 24,
  peakDay: "8 Sep",
  activity: [
    { label: "Streaming & video", value: 118, pct: 38, color: "#0A2E63" },
    { label: "Downloads", value: 54, pct: 17, color: "#1D6FB8" },
    { label: "Video calls", value: 42, pct: 13, color: "#2E9BD6" },
    { label: "Gaming", value: 36, pct: 12, color: "#7AB8E4" },
    { label: "Browsing & social", value: 34, pct: 11, color: "#FFCC00" },
    { label: "Other devices", value: 28, pct: 9, color: "#D9A700" },
  ],
  devices: [
    { name: "Living Room TV", kind: "TV · Wi-Fi", used: 92, icon: "tv" },
    { name: "Work laptop", kind: "Laptop · Ethernet", used: 76, icon: "laptop" },
    { name: "iPhone 15", kind: "Phone · Wi-Fi", used: 41, icon: "phone" },
    { name: "PlayStation 5", kind: "Console · Wi-Fi", used: 38, icon: "gamepad" },
  ],
};

// ── Billing ─────────────────────────────────────────────────────────────────
export const BILLING = {
  amountDue: 65,
  dueDate: "1 Oct 2026",
  status: "upcoming", // upcoming | paid | overdue
  period: "1 Sep – 30 Sep 2026",
  paymentMethod: { brand: "Visa", last4: "4242", label: "Visa •••• 4242", exp: "09/28" },
  autopay: true,
  autopayNote: "Auto-pay will charge your Visa •••• 4242 on 1 Oct 2026",
  history: [
    { month: "Mar", label: "Mar 2026", amount: 65, status: "paid" },
    { month: "Apr", label: "Apr 2026", amount: 65, status: "paid" },
    { month: "May", label: "May 2026", amount: 75, status: "paid" },
    { month: "Jun", label: "Jun 2026", amount: 65, status: "paid" },
    { month: "Jul", label: "Jul 2026", amount: 65, status: "paid" },
    { month: "Aug", label: "Aug 2026", amount: 65, status: "paid" },
    { month: "Sep", label: "Sep 2026", amount: 65, status: "paid" },
    { month: "Oct", label: "Oct 2026", amount: 65, status: "upcoming" },
  ],
  transactions: [
    { id: "t1", date: "18 Sep 2026", description: "Home Fibre — Pro Home Connect", detail: "1 Sep – 30 Sep 2026", amount: 65, status: "Paid", ref: "INV-2026-09-1042", invoice: "Sept-2026.pdf", method: "Visa •••• 4242" },
    { id: "t2", date: "4 Sep 2026", description: "Payment retry — Home Fibre", detail: "Auto-pay retry after declined card", amount: 65, status: "Paid", ref: "PAY-2026-09-1189", invoice: "Sept-2026.pdf", method: "Visa •••• 4242" },
    { id: "t3", date: "3 Sep 2026", description: "Auto-pay attempt", detail: "Card declined — insufficient funds", amount: 65, status: "Failed", ref: "PAY-2026-09-1177", invoice: "—", method: "Visa •••• 4242" },
    { id: "t4", date: "18 Aug 2026", description: "Home Fibre — Pro Home Connect", detail: "1 Aug – 31 Aug 2026", amount: 65, status: "Paid", ref: "INV-2026-08-0931", invoice: "Aug-2026.pdf", method: "Visa •••• 4242" },
    { id: "t5", date: "27 Aug 2026", description: "Service credit — outage", detail: "Compensation for 27 Aug outage", amount: -5, status: "Refunded", ref: "CRD-2026-08-0210", invoice: "Credit-note.pdf", method: "Visa •••• 4242" },
    { id: "t6", date: "1 Aug 2026", description: "Speed Boost add-on", detail: "One-month trial · August", amount: 10, status: "Paid", ref: "INV-2026-08-0087", invoice: "Aug-2026.pdf", method: "Visa •••• 4242" },
    { id: "t7", date: "18 Jul 2026", description: "Home Fibre — Pro Home Connect", detail: "1 Jul – 31 Jul 2026", amount: 65, status: "Paid", ref: "INV-2026-07-0844", invoice: "Jul-2026.pdf", method: "Visa •••• 4242" },
    { id: "t8", date: "18 Jun 2026", description: "Home Fibre — Pro Home Connect", detail: "1 Jun – 30 Jun 2026", amount: 65, status: "Paid", ref: "INV-2026-06-0771", invoice: "Jun-2026.pdf", method: "Visa •••• 4242" },
    { id: "t9", date: "18 May 2026", description: "Home Fibre — Pro Home Connect", detail: "1 May – 31 May 2026", amount: 65, status: "Paid", ref: "INV-2026-05-0698", invoice: "May-2026.pdf", method: "Visa •••• 4242" },
    { id: "t10", date: "18 Apr 2026", description: "Home Fibre — Pro Home Connect", detail: "1 Apr – 30 Apr 2026", amount: 65, status: "Paid", ref: "INV-2026-04-0622", invoice: "Apr-2026.pdf", method: "Visa •••• 4242" },
    { id: "t11", date: "18 Mar 2026", description: "Pro-rata activation", detail: "18 Mar – 31 Mar 2026", amount: 31.2, status: "Paid", ref: "INV-2026-03-0031", invoice: "Mar-2026.pdf", method: "Visa •••• 4242" },
    { id: "t12", date: "18 Mar 2026", description: "Installation & activation", detail: "Standard FTTH install", amount: 65, status: "Paid", ref: "INV-2026-03-0029", invoice: "Mar-2026.pdf", method: "Visa •••• 4242" },
  ],
};

// ── Support ─────────────────────────────────────────────────────────────────
export const SUPPORT_QUICK_ACTIONS = [
  { id: "down", title: "Internet is down", body: "Run an instant line check and see outage status for your area.", icon: "WifiOff" },
  { id: "slow", title: "Slow connection", body: "Test your speed and get tailored tips for your plan.", icon: "Gauge" },
  { id: "wifi", title: "Wi-Fi problems", body: "Check your router, signal and connected devices.", icon: "Signal" },
  { id: "router", title: "Router issues", body: "Restart remotely or book a replacement.", icon: "Router" },
  { id: "billing", title: "Billing question", body: "Understand your invoice or dispute a charge.", icon: "Receipt" },
  { id: "install", title: "Installation help", body: "Book, reschedule or track an installation.", icon: "Wrench" },
];

export const TICKETS = [
  {
    id: "SUP-2841",
    subject: "Intermittent Wi-Fi on the upper floor",
    status: "open",
    priority: "normal",
    created: "8 Sep 2026",
    updated: "2 hours ago",
    lastMessage: "We've sent a firmware update to your router — please reconnect and let us know how it feels.",
    unread: true,
  },
  {
    id: "SUP-2710",
    subject: "Billing query — pro-rated first month",
    status: "resolved",
    priority: "normal",
    created: "22 Aug 2026",
    updated: "23 Aug 2026",
    lastMessage: "Confirmed: your first month was pro-rated from 18 March. A corrected statement has been emailed.",
    unread: false,
  },
  {
    id: "SUP-2588",
    subject: "Installation appointment confirmation",
    status: "resolved",
    priority: "low",
    created: "12 Jul 2026",
    updated: "12 Jul 2026",
    lastMessage: "Your installation is confirmed for Thursday 18 July, 09:00 – 12:00.",
    unread: false,
  },
];

// ── Notifications ───────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: "n1", type: "payment", title: "Payment successful", body: "Your US$65.00 payment for September was received. Thanks!", time: "2 days ago", unread: false },
  { id: "n2", type: "payment", title: "Upcoming payment", body: "US$65.00 is due on 1 Oct 2026. Auto-pay is enabled.", time: "Yesterday", unread: true },
  { id: "n3", type: "maintenance", title: "Scheduled maintenance", body: "Planned work on the Borrowdale exchange, 14 Sep 03:00 – 03:45.", time: "Yesterday", unread: true },
  { id: "n4", type: "service", title: "Service restored", body: "The brief outage on 27 Aug was resolved. Your service is back to normal.", time: "27 Aug", unread: false },
  { id: "n5", type: "plan", title: "Plan change confirmed", body: "Your Speed Boost trial ended — you're back on Pro Home Connect.", time: "1 Aug", unread: false },
  { id: "n6", type: "support", title: "Support ticket update", body: "SUP-2841: our team replied to your Wi-Fi query.", time: "2 hours ago", unread: true },
];
