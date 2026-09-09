// CoverageService — the single abstraction the UI talks to for everything
// coverage-related. Today it reads dev fixtures; tomorrow it can be swapped for
// a real GIS / serviceability backend without changing any UI code.
//
// Contract:
//   searchAddresses(query)        -> suggestion[]         (autocomplete)
//   geocode(suggestion)            -> { lat, lng, label }  (resolve a selection)
//   getCurrentPosition()            -> Promise<{lat,lng}>   (browser geolocation)
//   reverseGeocode(lat, lng)        -> string               (coords -> readable address)
//   getCoverageAreas()              -> CoverageArea[]        (polygon boundaries)
//   checkCoverage(lat, lng)         -> { status, area, areaId, distance }
//
// Coverage statuses: "COVERED" | "NEARBY" | "NOT_COVERED"

import { COVERAGE_AREAS, ADDRESS_LOCALITIES } from "@/data/coverageAreas";

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

/** Debounced-friendly address autocomplete over the local locality dataset. */
export function searchAddresses(query) {
  const q = (query || "").trim().toLowerCase();
  if (q.length < 2) return [];
  return ADDRESS_LOCALITIES.filter(
    (l) => l.name.toLowerCase().includes(q) || l.region.toLowerCase().includes(q)
  )
    .slice(0, 6)
    .map((l) => ({ id: l.id, label: `${l.name}, ${l.region}`, lat: l.lat, lng: l.lng }));
}

export function geocode(suggestion) {
  return { lat: suggestion.lat, lng: suggestion.lng, label: suggestion.label };
}

/** Request browser geolocation. Rejects with { code, message } on failure. */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      return reject({ code: "unsupported", message: "Location services are unavailable on this device. Try entering your address manually." });
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => {
        if (err.code === 1) return reject({ code: "denied", message: "Location permission was denied. Try entering your address manually." });
        if (err.code === 3) return reject({ code: "unavailable", message: "We couldn't determine your location. Try entering your address manually." });
        reject({ code: "error", message: "We couldn't determine your location. Try entering your address manually." });
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
  if (bestD < 3000) return `${best.name}, ${best.region}`;
  return `Near ${best.name}, ${best.region}`;
}

export function getCoverageAreas() {
  return COVERAGE_AREAS;
}

/**
 * Evaluate a coordinate against FibreHood coverage data.
 * Returns { status, area, areaId, distance }.
 */
export function checkCoverage(lat, lng) {
  for (const area of COVERAGE_AREAS) {
    if (pointInPolygon([lat, lng], area.polygon)) {
      return { status: "COVERED", area, areaId: area.id, distance: 0 };
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
    return { status: "NEARBY", area: nearest, areaId: nearest.id, distance: Math.round(nd) };
  }
  return { status: "NOT_COVERED", area: null, areaId: null, distance: nd === Infinity ? null : Math.round(nd) };
}