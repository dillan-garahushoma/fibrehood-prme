// DEVELOPMENT FIXTURES — support knowledge base.
// Content is general guidance; replace with verified FibreHood support content.

export const SUPPORT_CATEGORIES = [
  { id: "no-internet", label: "No internet", icon: "wifi-off" },
  { id: "slow", label: "Slow internet", icon: "gauge" },
  { id: "router-wifi", label: "Router & Wi-Fi", icon: "router" },
  { id: "installation", label: "Installation", icon: "wrench" },
  { id: "coverage", label: "Coverage", icon: "map" },
  { id: "billing", label: "Billing & account", icon: "receipt" },
  { id: "contact", label: "Contact", icon: "phone" }
];

export const SUPPORT_ARTICLES = [
  {
    id: "no-internet-1",
    category: "no-internet",
    title: "My connection has dropped completely",
    featured: true,
    updated: "2025-06",
    steps: [
      "Check that the Optical Network Terminal (ONT) at your premises has power and a steady light.",
      "Restart your router — unplug for 30 seconds, then reconnect and wait two minutes for it to re-handshake.",
      "Confirm no outages are listed on your account dashboard or via WhatsApp support.",
      "If lights are off on the ONT, do not force any fibre cables — contact FibreHood support."
    ]
  },
  {
    id: "no-internet-2",
    category: "no-internet",
    title: "Only some devices can't connect",
    featured: false,
    updated: "2025-06",
    steps: [
      "Check whether the affected device works on mobile data — this isolates router vs device.",
      "Forget the Wi-Fi network on that device and rejoin with the correct password.",
      "Restart the specific device's network/Wi-Fi toggle."
    ]
  },
  {
    id: "slow-1",
    category: "slow",
    title: "Speeds are slower than my plan",
    featured: true,
    updated: "2025-07",
    steps: [
      "Run a speed test over a wired (Ethernet) connection if possible — Wi-Fi results are affected by distance and walls.",
      "Disconnect other heavy downloads/streams during the test.",
      "Move the router to an open, central position away from microwaves and large metal objects.",
      "If wired speeds remain well below plan, contact support with the test result."
    ]
  },
  {
    id: "router-1",
    category: "router-wifi",
    title: "Wi-Fi doesn't reach the back rooms",
    featured: true,
    updated: "2025-07",
    steps: [
      "Fibre reaches your premises; Wi-Fi quality depends on placement and walls — these are separate problems.",
      "Elevate the router and keep it clear of cupboards and corners.",
      "Where a single router can't cover the space, ask about mesh or access-point options."
    ]
  },
  {
    id: "router-2",
    category: "router-wifi",
    title: "How do I change my Wi-Fi password?",
    featured: false,
    updated: "2025-05",
    steps: [
      "Sign in to your router's admin interface (details provided with your installation).",
      "Locate the wireless settings section and update the passphrase.",
      "Reconnect each device with the new password."
    ]
  },
  {
    id: "install-1",
    category: "installation",
    title: "What does installation involve?",
    featured: true,
    updated: "2025-06",
    steps: [
      "A technician runs a fibre cable from the street to a chosen point inside your premises.",
      "An Optical Network Terminal is installed and your router is configured.",
      "Typical installs take a few hours; we'll confirm timing when your connection is scheduled."
    ]
  },
  {
    id: "install-2",
    category: "installation",
    title: "Can I choose where the router goes?",
    featured: false,
    updated: "2025-05",
    steps: [
      "Yes — discuss placement with the technician on the day.",
      "A central, elevated spot usually gives the best Wi-Fi coverage."
    ]
  },
  {
    id: "coverage-1",
    category: "coverage",
    title: "Why does my address show 'not yet available'?",
    featured: true,
    updated: "2025-07",
    steps: [
      "Your street isn't on the live FibreHood footprint yet.",
      "Register your interest and we'll flag your address for future build planning.",
      "Near-coverage addresses are prioritised as infrastructure extends."
    ]
  },
  {
    id: "coverage-2",
    category: "coverage",
    title: "Can I request a survey for my area?",
    featured: false,
    updated: "2025-06",
    steps: [
      "Yes — use the WhatsApp handoff from the coverage result to request a survey.",
      "Group interest from neighbours on the same street strengthens the business case."
    ]
  },
  {
    id: "billing-1",
    category: "billing",
    title: "How is billing handled?",
    featured: true,
    updated: "2025-07",
    steps: [
      "Billing is monthly in advance for active services.",
      "Payment options are confirmed when your connection is scheduled — contact support for your account specifics."
    ]
  },
  {
    id: "billing-2",
    category: "billing",
    title: "How do I update my account details?",
    featured: false,
    updated: "2025-05",
    steps: [
      "Contact FibreHood support via WhatsApp or the contact page.",
      "We'll verify your identity before updating account information."
    ]
  },
  {
    id: "contact-1",
    category: "contact",
    title: "How do I reach a human quickly?",
    featured: true,
    updated: "2025-07",
    steps: [
      "WhatsApp is the fastest channel — use the WhatsApp action on any page.",
      "For connection enquiries, the contact form routes to the right team."
    ]
  }
];

export function searchArticles(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return SUPPORT_ARTICLES;
  return SUPPORT_ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q) ||
    a.steps.some((s) => s.toLowerCase().includes(q))
  );
}