import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Public lead submission endpoint. Visitors are not authenticated, so we
// validate strictly and persist via the service role. Inputs are bounded to
// prevent abuse; nothing sensitive is accepted beyond what the contact flow needs.

const ALLOWED_SEGMENTS = new Set(['home', 'business', 'unsure']);
const ALLOWED_SOURCES = new Set(['coverage', 'plans', 'contact', 'direct', 'whatsapp']);
const ALLOWED_COVERAGE = new Set(['covered', 'near', 'not_covered', 'unknown']);

function clean(value, max = 300) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
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
    const address = clean(body.address, 240);
    const segment = ALLOWED_SEGMENTS.has(body.segment) ? body.segment : 'unsure';
    const source = ALLOWED_SOURCES.has(body.source) ? body.source : 'direct';
    const coverageResult = ALLOWED_COVERAGE.has(body.coverage_result) ? body.coverage_result : 'unknown';
    const selectedPlan = clean(body.selected_plan, 40);
    const message = clean(body.message, 2000);
    const consent = body.consent === true;
    const utm = clean(body.utm, 200);

    if (!name || !phone) {
      return Response.json({ error: 'A name and phone number are required.' }, { status: 400 });
    }
    if (!consent) {
      return Response.json({ error: 'Please consent to being contacted.' }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.Lead.create({
      name,
      phone,
      email: email || undefined,
      address: address || undefined,
      segment,
      selected_plan: selectedPlan || undefined,
      coverage_result: coverageResult,
      source,
      message: message || undefined,
      consent: true,
      utm: utm || undefined
    });

    return Response.json({ ok: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message || 'Unable to submit lead.' }, { status: 500 });
  }
}