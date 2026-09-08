import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, MapPin, Search, Signal, X } from "lucide-react";
import { COVERAGE_AREAS } from "@/data/coverageAreas";

const MAP_AREAS = {
  southview: { points: "332,310 392,289 431,318 409,365 350,357", label: [338, 385] },
  "tafara-flats": { points: "526,180 592,168 626,208 601,253 537,244", label: [527, 273] },
  norton: { points: "100,321 153,294 208,319 188,366 126,370", label: [94, 391] },
};

const ROADS = [
  "M38 407 C122 356 205 389 282 345 S432 233 510 242 S618 318 704 247",
  "M74 145 C166 176 193 242 271 261 S416 230 500 155 S615 115 684 136",
  "M111 84 C203 111 245 163 338 151 S474 104 553 108 S642 153 704 176",
  "M274 62 C316 142 330 201 355 280 S397 401 425 454",
  "M503 59 C477 137 509 176 556 234 S587 355 576 439",
  "M193 189 C250 222 274 293 330 329 S460 344 537 398",
  "M49 289 C130 260 204 274 278 295 S427 420 665 384",
];

function resolveArea(address) {
  const query = address.toLowerCase();
  if (query.includes("tafara") || query.includes("mabvuku")) return "tafara-flats";
  if (query.includes("norton")) return "norton";
  return "southview";
}

function MapSurface({ selectedArea, onSelectArea }) {
  const reduce = useReducedMotion();
  const areas = useMemo(
    () => COVERAGE_AREAS.map((area) => ({ ...area, ...MAP_AREAS[area.id] })).filter((area) => area.points),
    [],
  );

  return (
    <svg
      viewBox="0 0 720 480"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Illustrated FibreHood coverage map showing active coverage zones around Harare"
    >
      <defs>
        <linearGradient id="road-wash" x1="0" x2="1">
          <stop offset="0" stopColor="#072248" stopOpacity="0.07" />
          <stop offset="0.5" stopColor="#072248" stopOpacity="0.25" />
          <stop offset="1" stopColor="#072248" stopOpacity="0.07" />
        </linearGradient>
        <filter id="map-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <g opacity="0.64">
        {Array.from({ length: 12 }, (_, index) => (
          <path
            key={`block-${index}`}
            d={`M ${34 + index * 62} 54 L ${18 + index * 64} 442`}
            stroke="#072248"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={`cross-${index}`}
            d={`M 35 ${72 + index * 53} C 205 ${48 + index * 56} 468 ${91 + index * 38} 697 ${64 + index * 54}`}
            fill="none"
            stroke="#072248"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        ))}
      </g>

      <g fill="none" stroke="url(#road-wash)" strokeLinecap="round">
        {ROADS.map((road, index) => (
          <path key={road} d={road} strokeWidth={index < 3 ? 3.5 : 2} />
        ))}
      </g>

      <g fontFamily="Inter, sans-serif" fontSize="11" fill="#072248" fillOpacity="0.38" letterSpacing="1.4">
        <text x="313" y="111">HARARE</text>
        <text x="73" y="422">NORTON</text>
        <text x="548" y="146">TAFARA</text>
        <text x="338" y="290">SOUTHVIEW</text>
      </g>

      {areas.map((area) => {
        const active = area.id === selectedArea;
        return (
          <g
            key={area.id}
            role="button"
            tabIndex={0}
            aria-label={`Show ${area.name} coverage`}
            onClick={() => onSelectArea(area.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectArea(area.id);
              }
            }}
            className="cursor-pointer outline-none"
          >
            {active && <polygon points={area.points} fill="#FFCC00" fillOpacity="0.18" filter="url(#map-glow)" />}
            <motion.polygon
              points={area.points}
              fill={active ? "#FFCC00" : "#072248"}
              fillOpacity={active ? 0.34 : 0.11}
              stroke={active ? "#FFCC00" : "#072248"}
              strokeWidth={active ? 2.2 : 1.15}
              initial={reduce ? false : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: active ? 1.04 : 1 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.12 }}
              style={{ transformOrigin: `${area.label[0]}px ${area.label[1]}px` }}
            />
            <circle cx={area.label[0] + 17} cy={area.label[1] - 24} r={active ? 9 : 6} fill="#072248" opacity={active ? 1 : 0.72} />
            {active && (
              <motion.circle
                cx={area.label[0] + 17}
                cy={area.label[1] - 24}
                r="17"
                fill="none"
                stroke="#FFCC00"
                strokeWidth="1.25"
                initial={{ opacity: 0.9, scale: 0.65 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{ duration: 1.8, repeat: reduce ? 0 : Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${area.label[0] + 17}px ${area.label[1] - 24}px` }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function CoverageMapDemo() {
  const reduce = useReducedMotion();
  const [address, setAddress] = useState("14 Mangwende Street, Harare");
  const [selectedArea, setSelectedArea] = useState("southview");
  const [checked, setChecked] = useState(false);
  const activeArea = COVERAGE_AREAS.find((area) => area.id === selectedArea) || COVERAGE_AREAS[0];

  const checkCoverage = (event) => {
    event.preventDefault();
    setSelectedArea(resolveArea(address));
    setChecked(true);
  };

  const selectArea = (areaId) => {
    setSelectedArea(areaId);
    setChecked(true);
  };

  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 92% 86% at 50% 49%, black 36%, transparent 94%)",
          WebkitMaskImage: "radial-gradient(ellipse 92% 86% at 50% 49%, black 36%, transparent 94%)",
        }}
      >
        <MapSurface selectedArea={selectedArea} onSelectArea={selectArea} />
      </div>

      <motion.form
        onSubmit={checkCoverage}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/65 bg-paper/75 p-3 shadow-[0_18px_50px_rgba(7,34,72,0.12)] backdrop-blur-xl sm:inset-x-6 sm:bottom-5 sm:p-4"
      >
        <div className="flex items-center gap-2 rounded-xl border border-line/80 bg-white/70 py-1.5 pl-3 pr-1.5 focus-within:border-signal/50 focus-within:ring-2 focus-within:ring-signal/10">
          <Search className="h-4 w-4 shrink-0 text-ink-soft/70" strokeWidth={1.8} aria-hidden="true" />
          <label className="sr-only" htmlFor="journey-address">Your address</label>
          <input
            id="journey-address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              setChecked(false);
            }}
            className="min-w-0 flex-1 bg-transparent text-sm text-signal outline-none placeholder:text-ink-soft/50"
            placeholder="Enter your address"
          />
          <button
            type="submit"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-signal px-3 text-xs font-semibold text-paper transition-colors hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            <span className="hidden sm:inline">Check</span>
            <Search className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-signal">
              {checked ? <Check className="h-3.5 w-3.5 text-loop" strokeWidth={2.8} /> : <Signal className="h-3.5 w-3.5 text-loop" strokeWidth={2.2} />}
              {checked ? `Fibre available in ${activeArea.name}` : "Check live availability"}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-ink-soft">
              {checked ? "Up to 200 Mbps · installation slots available" : "Select a highlighted area or search an address"}
            </p>
          </div>
          {checked && (
            <button
              type="button"
              onClick={() => setChecked(false)}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-signal/5 hover:text-signal"
              aria-label="Clear coverage result"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </motion.form>

      <div className="pointer-events-none absolute left-[42%] top-[44%] flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal/65" aria-hidden="true">
        <MapPin className="h-3.5 w-3.5 text-loop" /> Active fibre zones
      </div>
    </div>
  );
}

export default CoverageMapDemo;
