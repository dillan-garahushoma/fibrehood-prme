import React, { useEffect, useRef, useState } from "react";
import { Search, LocateFixed, Loader2, X, ArrowRight, AlertCircle } from "lucide-react";
import { searchAddresses, getCurrentPosition, reverseGeocode, getTowns, getSuburbs, getMdus } from "@/lib/coverageService";
import { statusMeta } from "@/data/coverageStatus";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "address", label: "Search an address" },
  { id: "guided", label: "Choose your area" }
];

const fieldClass =
  "h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink-soft/50 focus:border-loop focus:ring-2 focus:ring-loop/25";

// Real places from the coverage dataset — cycled in the address field so the
// idle state demonstrates the exact thing it's for, instead of decorating it.
const LIVE_EXAMPLES = ["10 Mbovu Road, Southview", "Tafara Flats, Harare", "Norton, Mashonaland West"];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Types out real example addresses when the field is empty and untouched. Freezes on the first example for prefers-reduced-motion. */
function useLiveAddressHint(active) {
  const [text, setText] = useState("");
  const reduceMotion = useRef(
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!active) {
      setText("");
      return;
    }
    if (reduceMotion.current) {
      setText(LIVE_EXAMPLES[0]);
      return;
    }
    let cancelled = false;
    let phraseIndex = 0;

    async function loop() {
      while (!cancelled) {
        const phrase = LIVE_EXAMPLES[phraseIndex % LIVE_EXAMPLES.length];
        setText("");
        await wait(450);
        for (let i = 0; i <= phrase.length; i += 1) {
          if (cancelled) return;
          setText(phrase.slice(0, i));
          await wait(26 + Math.random() * 30);
        }
        await wait(1500);
        phraseIndex += 1;
      }
    }
    loop();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return text;
}

/** A quiet echo marker — same ring-pulse + glowing dot as the real map's location icon. */
function EchoMarker({ className, delay = "0s" }) {
  return (
    <span className={cn("absolute h-4 w-4", className)} aria-hidden="true">
      <span
        className="absolute inset-0 rounded-full bg-loop/40"
        style={{ animation: "fhPulseEcho 2.4s ease-out infinite", animationDelay: delay }}
      />
      <span
        className="absolute left-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-loop"
        style={{ boxShadow: "0 0 8px rgba(255,204,0,0.65)" }}
      />
    </span>
  );
}

/**
 * A blurred, low-opacity echo of the real coverage shapes and live markers —
 * the depth layer the panel floats over. Never interactive, never literal:
 * it previews the shape of the real result without pretending to be data.
 */
function DepthLayer() {
  return (
    <div className="pointer-events-none absolute -inset-8 -z-10 overflow-hidden sm:-inset-12" aria-hidden="true">
      <style>{`
        @keyframes fhPulseEcho {
          0% { transform: scale(0.6); opacity: 0.9; }
          70% { transform: scale(2.1); opacity: 0; }
          100% { transform: scale(2.1); opacity: 0; }
        }
      `}</style>
      <div className="absolute left-[6%] top-[6%] h-36 w-40 rounded-[46%_54%_61%_39%/52%_44%_56%_48%] bg-signal/[0.055] blur-2xl" />
      <div className="absolute right-[8%] top-[22%] h-32 w-44 rounded-[55%_45%_38%_62%/45%_58%_42%_55%] bg-loop/[0.09] blur-3xl" />
      <div className="absolute bottom-[8%] left-[22%] h-28 w-32 rounded-[40%_60%_55%_45%/58%_40%_60%_42%] bg-signal/[0.05] blur-2xl" />
      <EchoMarker className="left-[16%] top-[20%]" />
      <EchoMarker className="right-[20%] top-[48%]" delay="0.8s" />
      <EchoMarker className="left-[38%] bottom-[16%]" delay="1.5s" />
    </div>
  );
}

/**
 * The one place a customer tells us where they are — address search, device
 * location, or guided Town → Suburb → MDU. All three hand the same shape to the
 * single coverage engine.
 */
export function LocationPanel({ onResolve }) {
  const [tab, setTab] = useState("address");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ambiguous, setAmbiguous] = useState([]);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [townId, setTownId] = useState("");
  const [suburbId, setSuburbId] = useState("");
  const [mduId, setMduId] = useState("");
  const debounce = useRef(null);

  const suburbs = townId ? getSuburbs(townId) : [];
  const mdus = townId && suburbId ? getMdus(townId, suburbId) : [];

  const liveHint = useLiveAddressHint(tab === "address" && !query && !focused);

  const onQueryChange = (val) => {
    setQuery(val);
    setError("");
    setAmbiguous([]);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => setSuggestions(searchAddresses(val)), 160);
  };

  const pick = (s) => {
    setQuery(s.label);
    setSuggestions([]);
    setAmbiguous([]);
    onResolve({
      lat: s.lat,
      lng: s.lng,
      label: s.label,
      townId: s.townId,
      suburbId: s.suburbId,
      mduId: s.mduId,
      method: "address"
    });
  };

  const checkAddress = () => {
    const matches = searchAddresses(query);
    if (matches.length === 0) {
      setError("We couldn't match that address to a known Fibrehood location. Include the suburb or town, use your location, or choose your area.");
      return;
    }
    if (matches.length > 1) {
      setAmbiguous(matches);
      return;
    }
    pick(matches[0]);
  };

  const useMyLocation = () => {
    setError("");
    setAmbiguous([]);
    setLocating(true);
    getCurrentPosition()
      .then((pos) => {
        const label = reverseGeocode(pos.lat, pos.lng);
        setQuery(label);
        onResolve({ lat: pos.lat, lng: pos.lng, accuracy: pos.accuracy, label, method: "device" });
      })
      .catch((err) => setError(err.message || "We couldn't determine your location. Enter your address instead."))
      .finally(() => setLocating(false));
  };

  const checkGuided = () => {
    const suburb = suburbs.find((s) => s.id === suburbId);
    if (!suburb) {
      setError("Please choose your town and suburb.");
      return;
    }
    const town = getTowns().find((t) => t.id === townId);
    const mdu = mdus.find((m) => m.id === mduId);
    onResolve({
      lat: mdu?.lat ?? suburb.lat,
      lng: mdu?.lng ?? suburb.lng,
      label: [mdu?.name || suburb.name, town?.name].filter(Boolean).join(", "),
      townId,
      suburbId,
      mduId: mdu?.id,
      method: "guided"
    });
  };

  return (
    <div className="relative">
      <DepthLayer />

      <div
        className="relative rounded-2xl bg-paper/95 px-5 pb-7 pt-7 backdrop-blur-xl sm:px-7"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)"
        }}
      >
        {/* Quiet underline tabs — no boxed pill, no shadow chip */}
        <div className="flex gap-6 border-b border-line/70">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setError("");
                setAmbiguous([]);
              }}
              className={cn(
                "relative pb-3 text-sm font-semibold transition-colors",
                tab === t.id ? "text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-loop" />}
            </button>
          ))}
        </div>

        {tab === "address" ? (
          <div className="mt-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && checkAddress()}
                placeholder=""
                aria-label="Your address"
                className={`${fieldClass} h-12 pl-10 pr-9`}
              />
              {!query && liveHint && (
                <span
                  className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 truncate text-sm text-ink-soft/55"
                  aria-hidden="true"
                >
                  {liveHint}
                  <span className="ml-px inline-block h-[13px] w-px translate-y-[2px] animate-pulse bg-loop align-middle" />
                </span>
              )}
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {suggestions.length > 0 && query && (
              <ul className="mt-2 overflow-hidden rounded-lg border border-line">
                {suggestions.map((s) => (
                  <li key={s.id} className="border-b border-line last:border-b-0">
                    <button
                      type="button"
                      onClick={() => pick(s)}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-ink transition-colors hover:bg-fog"
                    >
                      <Search className="h-3.5 w-3.5 shrink-0 text-ink-soft" />
                      <span>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={checkAddress}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-signal px-6 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
              >
                Check coverage <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={useMyLocation}
                disabled={locating}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:bg-fog disabled:opacity-70"
              >
                {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4 text-loop" />}
                Use my location
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <Select
              label="Town"
              value={townId}
              onChange={(v) => {
                setTownId(v);
                setSuburbId("");
                setMduId("");
                setError("");
              }}
              placeholder="Select your town"
              options={getTowns().map((t) => ({ value: t.id, label: t.name }))}
            />
            <Select
              label="Suburb"
              value={suburbId}
              disabled={!townId}
              onChange={(v) => {
                setSuburbId(v);
                setMduId("");
                setError("");
              }}
              placeholder={townId ? "Select your suburb" : "Choose a town first"}
              options={suburbs.map((s) => ({ value: s.id, label: s.name }))}
            />
            {mdus.length > 0 && (
              <Select
                label="Building or complex"
                value={mduId}
                onChange={setMduId}
                placeholder="Optional — skip if not listed"
                options={mdus.map((m) => ({ value: m.id, label: `${m.name} · ${statusMeta(m.status).label}` }))}
              />
            )}
            <button
              type="button"
              onClick={checkGuided}
              disabled={!suburbId}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-signal px-6 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep disabled:opacity-50"
            >
              Check coverage <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {ambiguous.length > 0 && (
          <div className="mt-4 rounded-lg border border-line bg-fog/60 p-3.5">
            <p className="text-sm font-semibold text-ink">We found a few matching locations</p>
            <p className="mt-0.5 text-xs text-ink-soft">Choose the right one so we can check the correct area.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ambiguous.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pick(s)}
                  className="rounded-md border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-loop"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-destructive/25 bg-destructive/5 px-3.5 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-ink-soft/80">
          Your location is only used to check Fibrehood coverage.
        </p>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder, disabled }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <select className={fieldClass} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LocationPanel;