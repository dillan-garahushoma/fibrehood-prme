// DEVELOPMENT FIXTURES — Fibrehood network & infrastructure narrative.
// Fibrehood operates a direct ISP service model. Nothing here asserts
// verified third-party partnerships, coverage percentages, or network size.

export const NETWORK = {
  model: "Direct ISP",
  statement:
    "Fibrehood runs a direct fibre service — we own the customer relationship from coverage check to connection, support, and billing. Where your address is live on our fibre footprint, we connect you directly.",
  // The path a signal takes through the Fibrehood network.
  path: [
    { id: "home", label: "Your home or business", detail: "Optical Network Terminal at the premises", icon: "home" },
    { id: "drop", label: "Fibre drop", detail: "Glass link from the street to your premises", icon: "cable" },
    { id: "splitter", label: "Neighbourhood splitter", detail: "Passive optical splitter serving your street", icon: "split" },
    { id: "exchange", label: "Fibrehood exchange", detail: "Local aggregation and traffic management", icon: "server" },
    { id: "core", label: "Fibrehood core", detail: "Redundant core routing to the wider internet", icon: "network" },
    { id: "internet", label: "The internet", detail: "Peering and upstream connectivity", icon: "globe" }
  ],
  capabilities: [
    { label: "Fibre to the premises", detail: "Glass run all the way to your building, not copper past the cabinet." },
    { label: "Symmetric business options", detail: "Equal upload and download speeds for workloads that send as much as they receive." },
    { label: "Local support", detail: "A human who knows your connection, not a distant call centre reading a script." }
  ]
};

// Coverage status descriptors used across the coverage experience.
export const COVERAGE_STATES = {
  idle: { key: "idle", label: "Ready to check", tone: "neutral" },
  searching: { key: "searching", label: "Checking the network…", tone: "neutral" },
  covered: { key: "covered", label: "Coverage confirmed", tone: "positive" },
  near: { key: "near", label: "Near coverage", tone: "caution" },
  not_covered: { key: "not_covered", label: "Not yet available", tone: "negative" },
  invalid: { key: "invalid", label: "Check the address", tone: "negative" },
  error: { key: "error", label: "Something went wrong", tone: "negative" }
};

/**
 * DEVELOPMENT coverage lookup. Deterministic but fake — maps address text to
 * a coverage state so the full journey can be demonstrated. Replace with a real
 * footprint query before launch.
 */
export function lookupCoverage(rawAddress) {
  const address = (rawAddress || "").trim();
  if (address.length < 4) {
    return { state: "invalid", address, providers: [], plans: [], note: "Please enter a street address or postal code." };
  }
  const key = address.toLowerCase();
  let state = "not_covered";
  if (/(ave|avenue|road|rd|street|st|close|court|way|drive|park|lane)/.test(key) && address.length >= 6) {
    // Deterministic pseudo-result for demo purposes.
    const seed = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const bucket = seed % 5;
    state = bucket < 3 ? "covered" : bucket === 3 ? "near" : "not_covered";
  }
  const providers = state === "covered"
    ? [{ name: "Fibrehood Fibre Network", status: "Live", tier: "FTTH", note: "Active on the Fibrehood footprint" }]
    : state === "near"
      ? [{ name: "Fibrehood Fibre Network", status: "Build in progress", tier: "FTTH", note: "Infrastructure planned for this area" }]
      : [];
  return {
    state,
    address,
    providers,
    plans: state === "covered" ? ["home-25", "home-50", "home-100", "home-200", "biz-100", "biz-250", "biz-500", "biz-1000"] : [],
    note: noteFor(state),
    lastUpdated: new Date().toISOString().slice(0, 10)
  };
}

function noteFor(state) {
  switch (state) {
    case "covered": return "Your address is on the live Fibrehood fibre footprint. Review compatible plans and request your connection.";
    case "near": return "Fibre infrastructure is planned near your address. Register your interest and we'll confirm as build progresses.";
    case "not_covered": return "Your address isn't on the Fibrehood footprint yet. Register your interest and we'll keep you informed about future rollouts.";
    default: return "";
  }
}