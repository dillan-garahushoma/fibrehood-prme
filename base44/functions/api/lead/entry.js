// Cloudflare Pages Function — public lead capture endpoint.
// Validates the payload and persists each lead to the LEADS KV namespace
// (bound in wrangler.jsonc). Served at /api/lead.
//
// Ported from the former Base44 submitLead function — same validation rules,
// same bounded inputs, no sensitive data accepted.

const ALLOWED_SEGMENTS = new Set(['home', 'business', 'unsure']);
const ALLOWED_SOURCES = new Set(['coverage', 'plans', 'contact', 'direct', 'whatsapp']);
const ALLOWED_INTENTS = new Set(['install_request', 'notify_when_live', 'register_interest', 'contact']);
const ALLOWED_STATUS = new Set(['LIVE', 'IN_PROGRESS', 'PLANNED', 'NOT_STARTED']);
const ALLOWED_RESOLUTION = new Set(['EXACT', 'AREA', 'NEARBY', 'NOT_FOUND']);
const ALLOWED_CONFIDENCE = new Set(['HIGH', 'MEDIUM', 'LOW']);
const ALLOWED_ORDER_TYPES = new Set(['new_installation', 'migration']);

function clean(value, max = 300) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function coord(value, limit) {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num) || Math.abs(num) > limit) return undefined;
  return num;
}

function pick(set, value) {
  return typeof value === 'string' && set.has(value) ? value : undefined;
}

function makeRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `FH-${out}`;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const consent = body.consent === true;

    if (!name || !phone) {
      return json({ error: 'A name and phone number are required.' }, 400);
    }
    if (!consent) {
      return json({ error: 'Please consent to being contacted.' }, 400);
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Please enter a valid email address.' }, 400);
    }

    const reference = clean(body.reference, 24) || makeRef();
    const submittedAt = new Date().toISOString();

    const record = {
      name,
      phone,
      alt_phone: clean(body.alt_phone, 40) || undefined,
      email: email || undefined,
      address: clean(body.address, 240) || undefined,
      segment: ALLOWED_SEGMENTS.has(body.segment) ? body.segment : 'unsure',
      intent: pick(ALLOWED_INTENTS, body.intent) || 'register_interest',
      reference,
      selected_plan: clean(body.selected_plan, 60) || undefined,
      coverage_status: pick(ALLOWED_STATUS, body.coverage_status),
      resolution: pick(ALLOWED_RESOLUTION, body.resolution),
      confidence: pick(ALLOWED_CONFIDENCE, body.confidence),
      latitude: coord(body.latitude, 90),
      longitude: coord(body.longitude, 180),
      town_id: clean(body.town_id, 60) || undefined,
      suburb_id: clean(body.suburb_id, 60) || undefined,
      area_id: clean(body.area_id, 60) || undefined,
      mdu_id: clean(body.mdu_id, 60) || undefined,
      order_type: pick(ALLOWED_ORDER_TYPES, body.order_type),
      location_type: clean(body.location_type, 60) || undefined,
      street_number: clean(body.street_number, 30) || undefined,
      street_name: clean(body.street_name, 120) || undefined,
      custom_address_name: clean(body.custom_address_name, 80) || undefined,
      source: ALLOWED_SOURCES.has(body.source) ? body.source : 'coverage',
      message: clean(body.message, 2000) || undefined,
      consent: true,
      utm: clean(body.utm, 200) || undefined,
      submitted_at: submittedAt
    };

    // Drop undefined keys for a clean stored record.
    Object.keys(record).forEach((k) => record[k] === undefined && delete record[k]);

    // Persist to KV when a binding is present (production / wrangler dev).
    // Without a binding (plain static preview) we still return success.
    if (env && env.LEADS && typeof env.LEADS.put === 'function') {
      await env.LEADS.put(`lead:${reference}`, JSON.stringify(record), {
        metadata: {
          reference,
          phone,
          segment: record.segment,
          intent: record.intent,
          submitted_at: submittedAt
        }
      });
    }

    return json({ ok: true, reference });
  } catch (error) {
    return json({ error: error.message || 'Unable to submit lead.' }, 500);
  }
}