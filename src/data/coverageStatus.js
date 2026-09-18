// Canonical Fibrehood deployment status vocabulary — the single source of truth
// for how each status is labelled, coloured and converted throughout the app.
//
// Deployment status  — what Fibrehood's state is at a location.
// Resolution         — how precisely we located the customer (separate concept).

export const DEPLOYMENT_STATUS = {
  LIVE: "LIVE",
  IN_PROGRESS: "IN_PROGRESS",
  PLANNED: "PLANNED",
  NOT_STARTED: "NOT_STARTED"
};

export const RESOLUTION = {
  EXACT: "EXACT",
  AREA: "AREA",
  NEARBY: "NEARBY",
  NOT_FOUND: "NOT_FOUND"
};

export const CONFIDENCE = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW"
};

export const LEAD_INTENT = {
  INSTALL_REQUEST: "install_request",
  NOTIFY_WHEN_LIVE: "notify_when_live",
  REGISTER_INTEREST: "register_interest"
};

/**
 * Customer-facing presentation + conversion path for each canonical status.
 * UI components read this rather than defining coverage facts themselves.
 */
export const STATUS_META = {
  LIVE: {
    label: "Live",
    headline: "Fibrehood is available here",
    body: "Your location is ready for connection.",
    cta: "Get connected",
    intent: LEAD_INTENT.INSTALL_REQUEST,
    mapColor: "#FFCC00",
    dotClass: "bg-loop",
    chipClass: "bg-loop text-signal"
  },
  IN_PROGRESS: {
    label: "In progress",
    headline: "Fibre is coming to your area",
    body: "We're currently deploying fibre here.",
    cta: "Notify me when it's ready",
    intent: LEAD_INTENT.NOTIFY_WHEN_LIVE,
    mapColor: "#F59E0B",
    dotClass: "bg-amber-500",
    chipClass: "bg-amber-100 text-amber-800"
  },
  PLANNED: {
    label: "Planned",
    headline: "Fibre is planned for your area",
    body: "Fibrehood is planning deployment here.",
    cta: "Register interest",
    intent: LEAD_INTENT.REGISTER_INTEREST,
    mapColor: "#3B82F6",
    dotClass: "bg-blue-500",
    chipClass: "bg-blue-100 text-blue-800"
  },
  NOT_STARTED: {
    label: "Not started",
    headline: "Fibre isn't available here yet",
    body: "We're not currently deploying in this location.",
    cta: "Register interest",
    intent: LEAD_INTENT.REGISTER_INTEREST,
    mapColor: "#94A3B8",
    dotClass: "bg-slate-400",
    chipClass: "bg-fog text-ink-soft"
  }
};

export const STATUS_ORDER = ["LIVE", "IN_PROGRESS", "PLANNED", "NOT_STARTED"];

export function statusMeta(status) {
  return STATUS_META[status] || STATUS_META.NOT_STARTED;
}