import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CoverageMap from "./CoverageMap";
import AddressSearch from "./AddressSearch";
import CoverageResultCard from "./CoverageResultCard";
import AreaExplorer from "./AreaExplorer";
import {
  getCoverageAreas,
  searchAddresses,
  getCurrentPosition,
  reverseGeocode,
  checkCoverage
} from "@/lib/coverageService";

let nonceSeed = 0;

function Legend() {
  const Item = ({ dot, ring, label }) => (
    <div className="flex items-center gap-2">
      <span
        className={
          ring
            ? "inline-block h-2.5 w-2.5 rounded-full border border-paper/60"
            : `inline-block h-2.5 w-2.5 rounded-full ${dot}`
        }
      />
      <span className="text-paper/85">{label}</span>
    </div>
  );
  return (
    <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1.5 rounded-xl border border-paper/15 bg-signal/70 px-3 py-2.5 text-[11px] text-paper backdrop-blur-md">
      <Item dot="bg-loop" label="FibreHood Available" />
      <Item dot="bg-amber-400" label="Coverage Expanding" />
      <Item ring label="Not Currently Available" />
    </div>
  );
}

export function CoverageExplorer() {
  const areas = getCoverageAreas();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [locating, setLocating] = useState(false);
  const [checking, setChecking] = useState(false);
  const [marker, setMarker] = useState(null);
  const [result, setResult] = useState(null);
  const [areaFocus, setAreaFocus] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const [error, setError] = useState("");
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const activeAreaId = result?.areaId ?? areaFocus?.id ?? hoverId;

  const flyTo = (lat, lng, zoom) => setFlyTarget({ lat, lng, zoom, nonce: ++nonceSeed });

  const runCheck = useCallback((lat, lng, label) => {
    setShowSuggest(false);
    setAreaFocus(null);
    setMarker({ lat, lng });
    flyTo(lat, lng, 15);
    setChecking(true);
    setResult(null);
    setError("");
    // Simulate the coverage engine for a meaningful loading state.
    setTimeout(() => {
      const res = checkCoverage(lat, lng);
      setResult({ ...res, address: label });
      setChecking(false);
    }, 700);
  }, []);

  const onQueryChange = (val) => {
    setQuery(val);
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSuggestions(searchAddresses(val));
      setShowSuggest(true);
    }, 180);
  };

  const selectSuggestion = (s) => {
    setQuery(s.label);
    setShowSuggest(false);
    runCheck(s.lat, s.lng, s.label);
  };

  const useMyLocation = () => {
    setError("");
    setLocating(true);
    getCurrentPosition()
      .then((pos) => {
        const label = reverseGeocode(pos.lat, pos.lng);
        runCheck(pos.lat, pos.lng, label);
      })
      .catch((err) => setError(err.message || "We couldn't determine your location. Try entering your address manually."))
      .finally(() => setLocating(false));
  };

  const selectArea = (area) => {
    setResult(null);
    setAreaFocus(area);
    flyTo(area.center[0], area.center[1], 14);
  };

  const focusSearch = () => {
    setAreaFocus(null);
    setQuery("");
    setSuggestions([]);
    setTimeout(() => searchRef.current?.focus(), 60);
  };

  const exploreCoveredAreas = () => selectArea(areas[0]);

  const showCard = checking || !!result || !!areaFocus;

  return (
    <div>
      <div className="isolate overflow-hidden rounded-3xl border border-line bg-paper shadow-lift">
        <CoverageMap
          areas={areas}
          activeAreaId={activeAreaId}
          flyTarget={flyTarget}
          marker={marker}
          onAreaHover={setHoverId}
          onAreaLeave={() => setHoverId(null)}
          onAreaClick={selectArea}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1100] h-20 bg-gradient-to-b from-signal/30 to-transparent" aria-hidden="true" />
          <AddressSearch
            inputRef={searchRef}
            query={query}
            onQueryChange={onQueryChange}
            suggestions={suggestions}
            showSuggest={showSuggest}
            onFocusInput={() => query.trim().length >= 2 && setShowSuggest(true)}
            onSelect={selectSuggestion}
            onUseLocation={useMyLocation}
            locating={locating}
            error={error}
          />
          <Legend />
          <AnimatePresence>
            {showCard && (
              <CoverageResultCard
                checking={checking}
                result={result}
                areaFocus={areaFocus}
                onCheckAddress={focusSearch}
                onExploreAreas={exploreCoveredAreas}
              />
            )}
          </AnimatePresence>
        </CoverageMap>
      </div>

      <div className="mt-10">
        <AreaExplorer areas={areas} activeAreaId={activeAreaId} onSelect={selectArea} />
      </div>
    </div>
  );
}

export default CoverageExplorer;