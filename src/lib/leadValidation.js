const ALLOWED_SEGMENTS = new Set(["home", "business", "unsure"]);
const ALLOWED_SOURCES = new Set(["coverage", "plans", "contact", "direct", "whatsapp"]);
const ALLOWED_INTENTS = new Set(["install_request", "notify_when_live", "register_interest", "contact"]);
const ALLOWED_STATUS = new Set(["LIVE", "IN_PROGRESS", "PLANNED", "NOT_STARTED"]);
const ALLOWED_RESOLUTION = new Set(["EXACT", "AREA", "NEARBY", "NOT_FOUND"]);
const ALLOWED_CONFIDENCE = new Set(["HIGH", "MEDIUM", "LOW"]);
const ALLOWED_ORDER_TYPES = new Set(["new_installation", "migration"]);

export function clean(value, max = 300) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function coord(value, limit) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num) || Math.abs(num) > limit) return undefined;
  return num;
}

export function pick(set, value) {
  return typeof value === "string" && set.has(value) ? value : undefined;
}

export function makeRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `FH-${out}`;
}

export function processLead(body) {
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);

  if (!name || !phone) {
    return { ok: false, error: "A name and phone number are required.", status: 400 };
  }
  if (body.consent !== true) {
    return { ok: false, error: "Please consent to being contacted.", status: 400 };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", status: 400 };
  }

  const reference = clean(body.reference, 24) || makeRef();
  const submittedAt = new Date().toISOString();
  const record = {
    name,
    phone,
    alt_phone: clean(body.alt_phone, 40) || undefined,
    email: email || undefined,
    address: clean(body.address, 240) || undefined,
    segment: ALLOWED_SEGMENTS.has(body.segment) ? body.segment : "unsure",
    intent: pick(ALLOWED_INTENTS, body.intent) || "register_interest",
    reference,
    selected_plan: clean(body.selected_plan, 60) || undefined,
    coverage_status: pick(ALLOWED_STATUS, body.coverage_status),
    resolution: pick(ALLOWED_RESOLUTION, body.resolution),
    confidence: pick(ALLOWED_CONFIDENCE, body.confidence),
    latitude: coord(body.latitude, 90),
    longitude: coord(body.longitude, 180),
    location_accuracy: coord(body.location_accuracy, 100000),
    location_method: clean(body.location_method, 20) || undefined,
    town_id: clean(body.town_id, 60) || undefined,
    suburb_id: clean(body.suburb_id, 60) || undefined,
    area_id: clean(body.area_id, 60) || undefined,
    mdu_id: clean(body.mdu_id, 60) || undefined,
    order_type: pick(ALLOWED_ORDER_TYPES, body.order_type),
    location_type: clean(body.location_type, 60) || undefined,
    street_number: clean(body.street_number, 30) || undefined,
    street_name: clean(body.street_name, 120) || undefined,
    custom_address_name: clean(body.custom_address_name, 80) || undefined,
    source: ALLOWED_SOURCES.has(body.source) ? body.source : "coverage",
    message: clean(body.message, 2000) || undefined,
    consent: true,
    utm: clean(body.utm, 200) || undefined,
    submitted_at: submittedAt
  };

  Object.keys(record).forEach((key) => record[key] === undefined && delete record[key]);
  return { ok: true, record, reference, submittedAt };
}
