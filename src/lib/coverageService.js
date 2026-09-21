// CoverageService — the single abstraction the UI talks to for everything
// coverage-related. Today it reads dev fixtures; tomorrow it can be swapped for
// a real GIS / serviceability backend without changing any UI code.
//
// Two separate concepts, deliberately not merged into one enum:
//   • resolution  — how precisely we located the customer (EXACT/AREA/NEARBY/NOT_FOUND)
//   • status      — Fibrehood's deployment state there (LIVE/IN_PROGRESS/PLANNED/NOT_STARTED)
//
// Every input method (address, device location, guided selection) funnels into
// resolveCoverage() — there is only one coverage engine.

import { COVERAGE_AREAS, ADDRESS_LOCALITIES, TOWNS } from "@/data/coverageAreas";
import { DEPLOYMENT_STATUS, RESOLUTION, CONFIDENCE, STATUS_ORDER } from "@/data/coverageStatus";

const NEARBY_RADIUS_M = 6000;

function toRad(d) {
  return (d * Math.PI) / 180;
}

/** Haversine distance in metres between two [lat, lng] points. */
export function haversine(a, b) {
  const R = 6371000;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const sLat = Math.sin(dLat / 2);
  const sLng = Math.sin(dLng / 2);
  const h = sLat * sLat + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * sLng * sLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Ray-casting point-in-polygon. polygon: array of [lat, lng] positions. */
export function pointInPolygon(point, polygon) {
  const x = point[1];
  const y = point[0];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1];
    const yi = polygon[i][0];
    const xj = polygon[j][1];
    const yj = polygon[j][0];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/* ── Location discovery ─────────────────────────────────────────────── */

/** Debounced-friendly address autocomplete over the local locality dataset. */
export function searchAddresses(query) {
  const q = (query || "").trim().toLowerCase();
  if (q.length < 2) return [];
  return ADDRESS_LOCALITIES.filter(
    (l) => l.name.toLowerCase().includes(q) || l.region.toLowerCase().includes(q)
  )
    .slice(0, 6)
    .map((l) => ({
      id: l.id,
      label: `${l.name}, ${l.region}`,
      lat: l.lat,
      lng: l.lng,
      townId: l.townId,
      suburbId: l.suburbId,
      mduId: l.mduId
    }));
}

/** Request browser geolocation. Rejects with { code, message } on failure. */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      return reject({ code: "unsupported", message: "Location services are unavailable on this device. Enter your address instead." });
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => {
        if (err.code === 1) return reject({ code: "denied", message: "Location permission was denied. Enter your address instead." });
        reject({ code: "unavailable", message: "We couldn't determine your location. Enter your address instead." });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
}

/** Reverse geocode using the nearest known locality (no external API required). */
export function reverseGeocode(lat, lng) {
  let best = null;
  let bestD = Infinity;
  for (const l of ADDRESS_LOCALITIES) {
    const d = haversine([lat, lng], [l.lat, l.lng]);
    if (d < bestD) {
      bestD = d;
      best = l;
    }
  }
  if (!best) return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  return bestD < 3000 ? `${best.name}, ${best.region}` : `Near ${best.name}, ${best.region}`;
}

/* ── Guided location hierarchy ───────────────────────────────────────── */

export function getTowns() {
  return TOWNS;
}

export function getSuburbs(townId) {
  return TOWNS.find((t) => t.id === townId)?.suburbs || [];
}

export function getMdus(townId, suburbId) {
  return getSuburbs(townId).find((s) => s.id === suburbId)?.mdus || [];
}

/* ── Coverage areas & derived statistics ─────────────────────────────── */

export function getCoverageAreas() {
  return COVERAGE_AREAS;
}

export function getArea(areaId) {
  return COVERAGE_AREAS.find((a) => a.id === areaId) || null;
}

/** Zone counts grouped by status — derived from records, never hardcoded in UI. */
export function getDeploymentStats() {
  const zones = COVERAGE_AREAS.flatMap((a) => a.zones || []);
  const counts = STATUS_ORDER.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
  for (const z of zones) counts[z.status] = (counts[z.status] || 0) + 1;
  return { counts, total: zones.length };
}

/** Most recent update timestamp across all coverage records. */
export function getCoverageUpdatedAt() {
  const stamps = COVERAGE_AREAS.flatMap((a) => [a.updatedAt, ...(a.zones || []).map((z) => z.updatedAt)]).filter(Boolean);
  return stamps.sort().slice(-1)[0] || null;
}

/** Only an exact, live result is safe to present as ready for installation. */
export function isInstallationReady(result) {
  return result?.status === DEPLOYMENT_STATUS.LIVE && result?.resolution === RESOLUTION.EXACT;
}

/* ── The coverage engine ─────────────────────────────────────────────── */

/**
 * Resolve a location and determine Fibrehood's deployment status there.
 *
 * input: { lat, lng, label, townId?, suburbId?, mduId?, method, accuracy? }
 * returns a normalized CoverageResult.
 */
export function resolveCoverage(input) {
  const { lat, lng, label, townId, suburbId, mduId, method = "address", accuracy } = input;

  const base = {
    label,
    lat,
    lng,
    townId,
    suburbId,
    mduId,
    method,
    accuracy: typeof accuracy === "number" ? Math.round(accuracy) : null,
    zone: null,
    mdu: null,
    distance: null
  };

  // A tracked MDU carries its own readiness — the most precise answer we have.
  if (mduId && townId && suburbId) {
    const mdu = getMdus(townId, suburbId).find((m) => m.id === mduId);
    if (mdu) {
      const suburb = getSuburbs(townId).find((s) => s.id === suburbId);
      const area = suburb?.areaId ? getArea(suburb.areaId) : null;
      return {
        ...base,
        lat: lat ?? mdu.lat,
        lng: lng ?? mdu.lng,
        status: mdu.status,
        resolution: RESOLUTION.EXACT,
        confidence: CONFIDENCE.HIGH,
        area,
        areaId: area?.id || null,
        mdu,
        updatedAt: mdu.updatedAt
      };
    }
  }

  if (typeof lat !== "number" || typeof lng !== "number") {
    return {
      ...base,
      status: DEPLOYMENT_STATUS.NOT_STARTED,
      resolution: RESOLUTION.NOT_FOUND,
      confidence: CONFIDENCE.LOW,
      area: null,
      areaId: null,
      updatedAt: null
    };
  }

  for (const area of COVERAGE_AREAS) {
    if (pointInPolygon([lat, lng], area.polygon)) {
      return {
        ...base,
        status: area.status,
        resolution: RESOLUTION.AREA,
        confidence: CONFIDENCE.MEDIUM,
        area,
        areaId: area.id,
        distance: 0,
        updatedAt: area.updatedAt
      };
    }
  }

  let nearest = null;
  let nd = Infinity;
  for (const area of COVERAGE_AREAS) {
    const d = haversine([lat, lng], area.center);
    if (d < nd) {
      nd = d;
      nearest = area;
    }
  }

  if (nearest && nd <= NEARBY_RADIUS_M) {
    return {
      ...base,
      status: nearest.status,
      resolution: RESOLUTION.NEARBY,
      confidence: CONFIDENCE.LOW,
      area: nearest,
      areaId: nearest.id,
      distance: Math.round(nd),
      updatedAt: nearest.updatedAt
    };
  }

  return {
    ...base,
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    resolution: RESOLUTION.NOT_FOUND,
    confidence: CONFIDENCE.LOW,
    area: null,
    areaId: null,
    distance: nd === Infinity ? null : Math.round(nd),
    updatedAt: null
  };
}