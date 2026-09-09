import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Public lead submission endpoint. Visitors are not authenticated, so we
// validate strictly and persist via the service role. Inputs are bounded to
// prevent abuse; nothing sensitive is accepted beyond what the flow needs.
//
// Every lead retains the location + coverage context that produced it, so the
// business can later map where demand is coming from.

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

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    let body = {};
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const consent = body.consent === true;

    if (!name || !phone) {
      return Response.json({ error: 'A name and phone number are required.' }, { status: 400 });
    }
    if (!consent) {
      return Response.json({ error: 'Please consent to being contacted.' }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const record = {
      name,
      phone,
      alt_phone: clean(body.alt_phone, 40) || undefined,
      email: email || undefined,
      address: clean(body.address, 240) || undefined,
      segment: ALLOWED_SEGMENTS.has(body.segment) ? body.segment : 'unsure',
      intent: pick(ALLOWED_INTENTS, body.intent) || 'register_interest',
      reference: clean(body.reference, 24) || undefined,
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
      utm: clean(body.utm, 200) || undefined
    };

    const lead = await base44.asServiceRole.entities.Lead.create(record);

    return Response.json({ ok: true, id: lead.id, reference: record.reference || null });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to submit lead.' }, { status: 500 });
  }
}