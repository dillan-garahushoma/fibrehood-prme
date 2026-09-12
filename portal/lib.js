// Small formatting + helper utilities for the FibreHood Client Portal.
// Kept intentionally framework-free so sample data can later be swapped for
// real API payloads without touching these.

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

/** 312 -> "312 GB", 1.24 -> "1.2 TB" */
export function fmtBytes(gb, opts = {}) {
  const { decimals = 0, unit = true } = opts;
  if (gb >= 1024) {
    const tb = gb / 1024;
    return `${tb.toFixed(tb >= 100 ? 0 : 1)}${unit ? " TB" : ""}`;
  }
  return `${gb.toFixed(decimals)}${unit ? " GB" : ""}`;
}

/** 65 -> "US$65.00" */
export function fmtMoney(n, { decimals = 2, symbol = "US$" } = {}) {
  const sign = n < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(n).toFixed(decimals)}`;
}

export function fmtDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function fmtDateShort(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

/** "1 Oct 2026" */
export function fmtDayMonth(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/** Deterministic pseudo-random generator (mulberry32). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
