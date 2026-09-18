// Lead capture — submits to the local /api/lead endpoint, served by a
// Cloudflare Pages Function (functions/api/lead.js) that persists to KV.
// Uses the local /api/lead endpoint.

/** Customer-facing reference for a submitted request. */
export function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `FH-${out}`;
}

/**
 * Flatten a resolved coverage result into the lead context fields, so every
 * lead retains the location + coverage state that produced it.
 */
export function coverageContext(result) {
  if (!result) return {};
  return {
    address: result.label,
    coverage_status: result.status,
    resolution: result.resolution,
    confidence: result.confidence,
    latitude: result.lat,
    longitude: result.lng,
    town_id: result.townId,
    suburb_id: result.suburbId,
    area_id: result.areaId,
    mdu_id: result.mduId
  };
}

/** Persist a lead through the local /api/lead endpoint. */
export async function submitLead(payload) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "We couldn't submit your request. Please try again.");
  }
  return data;
}