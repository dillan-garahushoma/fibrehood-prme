import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CoverageMap from "./CoverageMap";
import CoverageResultPanel from "./CoverageResultPanel";
import WhereFibrehoodIsBuilding from "./WhereFibrehoodIsBuilding";
import SignupFlow from "@/components/signup/SignupFlow";
import InterestFlow from "@/components/signup/InterestFlow";
import { getCoverageAreas, isInstallationReady, resolveCoverage, searchAddresses, getCurrentPosition, reverseGeocode } from "@/lib/coverageService";
import { DEPLOYMENT_STATUS, RESOLUTION, CONFIDENCE, LEAD_INTENT, statusMeta, STATUS_ORDER } from "@/data/coverageStatus";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];
let nonceSeed = 0;

function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-paper/85 px-3 py-2 text-[11px] text-ink-soft shadow-[0_1px_3px_rgba(7,34,72,0.08)] backdrop-blur-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {STATUS_ORDER.map((s) => {
          const meta = statusMeta(s);
          return (
            <div key={s} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-1.5 w-1.5 rounded-full", meta.dotClass)} />
              <span>{meta.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 border-t border-line/70 pt-1.5 text-[10px] text-ink-soft/80">Indicative area footprint; exact availability requires building confirmation.</div>
    </div>
  );
}

export function CoverageExplorer() {
  const areas = getCoverageAreas();
  const reduce = useReducedMotion();
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [marker, setMarker] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [areaFocus, setAreaFocus] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [interest, setInterest] = useState(null);
  const resultZone = useRef(null);

  const activeAreaId = result?.areaId ?? areaFocus?.id ?? hoverId;
  const hasResult = checking || !!result;

  const flyTo = (lat, lng, zoom) => setFlyTarget({ lat, lng, zoom, nonce: ++nonceSeed });

  // Every input method funnels through the one coverage engine.
  const handleResolve = useCallback((input) => {
    setAreaFocus(null);
    setResult(null);
    setChecking(true);
    setMarker({ lat: input.lat, lng: input.lng });
    flyTo(input.lat, input.lng, 14);
    window.setTimeout(() => {
      setResult(resolveCoverage(input));
      setChecking(false);
      // Bring the result + map into view now that there's something to show.
      window.requestAnimationFrame(() => {
        resultZone.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 600);
  }, []);

  const location = useLocation();

  // Resume the coverage flow when arriving from the hero checker.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    const useLoc = params.get("useLocation");
    if (q) {
      const match = searchAddresses(q)[0];
      if (match) {
        handleResolve({
          lat: match.lat,
          lng: match.lng,
          label: match.label,
          townId: match.townId,
          suburbId: match.suburbId,
          mduId: match.mduId,
          method: "address"
        });
      }
    } else if (useLoc) {
      getCurrentPosition()
        .then((pos) => {
          const label = reverseGeocode(pos.lat, pos.lng);
          handleResolve({ lat: pos.lat, lng: pos.lng, accuracy: pos.accuracy, label, method: "device" });
        })
        .catch(() => {});
    }
    if (q || useLoc) {
      window.history.replaceState({}, "", "/coverage");
    }
  }, [location.search, handleResolve]);

  const reset = () => {
    setResult(null);
    setMarker(null);
    setChecking(false);
  };

  const selectArea = (area) => {
    setAreaFocus(area);
    flyTo(area.center[0], area.center[1], 13);
  };

  const startConversion = () => {
    if (!result) return;
    const live = result.status === DEPLOYMENT_STATUS.LIVE && result.resolution === RESOLUTION.EXACT;
    if (live) {
      setSignupOpen(true);
      return;
    }
    const intent =
      result.resolution === RESOLUTION.NEARBY || result.resolution === RESOLUTION.AREA
        ? LEAD_INTENT.REGISTER_INTEREST
        : statusMeta(result.status).intent;
    setInterest(intent);
  };

  const sceneMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.55, ease: EASE }
      };

  const handleOpenArea = (area, town) => {
    const label = `${area.name}, ${town?.name || "Harare"}`;
    const locationData = area.coverageRef
      ? resolveCoverage({ ...area.coordinates && { lat: area.coordinates[0], lng: area.coordinates[1] }, ...area.coverageRef, label, method: "national-rollout" })
      : {
          label,
          status: area.status,
          areaId: area.id,
          townId: town?.id || "harare",
          resolution: RESOLUTION.AREA,
          confidence: CONFIDENCE.MEDIUM,
        };
    setResult(locationData);
    if (isInstallationReady(locationData)) {
      setSignupOpen(true);
    } else {
      setInterest(statusMeta(locationData.status)?.intent || LEAD_INTENT.REGISTER_INTEREST);
    }
  };

  const handleViewOnMap = useCallback((area, town) => {
    if (area.coverageRef) {
      const label = `${area.name}, ${town?.name || "Harare"}`;
      const locationData = resolveCoverage({ ...area.coordinates && { lat: area.coordinates[0], lng: area.coordinates[1] }, ...area.coverageRef, label, method: "national-rollout" });
      const lat = locationData.lat;
      const lng = locationData.lng;
      setMarker({ lat, lng });
      setAreaFocus(locationData.area || null);
      setResult(locationData);
      setChecking(false);
      flyTo(lat, lng, 14);
      window.requestAnimationFrame(() => {
        resultZone.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const areaKey = norm(area.name);
    const matchedArea = areas.find(
      (a) =>
        norm(a.name) === areaKey ||
        norm(a.id) === norm(area.id) ||
        areaKey.includes(norm(a.id)) ||
        norm(a.name).includes(areaKey)
    );

    const fallbackCoords = {
      "southview-park": [-17.893, 31.08],
      "harare-avenues": [-17.81, 31.04],
      "tafara-mabvuka": [-17.851, 31.163],
      "glen-lorne": [-17.738, 31.12],
      "norton-galloway": [-17.886, 30.697],
    };

    const lat = matchedArea ? matchedArea.center[0] : (fallbackCoords[area.id] ? fallbackCoords[area.id][0] : -17.8292);
    const lng = matchedArea ? matchedArea.center[1] : (fallbackCoords[area.id] ? fallbackCoords[area.id][1] : 31.0539);

    const locationData = {
      address: `${area.name}, ${town?.name || "Harare"}`,
      status: matchedArea?.status || area.status,
      areaId: matchedArea?.id || area.id,
      townId: town?.id || "harare",
      resolution: RESOLUTION.AREA,
      confidence: CONFIDENCE.MEDIUM,
      lat,
      lng
    };

    setMarker({ lat, lng });
    setAreaFocus(matchedArea || null);
    setResult(locationData);
    setChecking(false);
    flyTo(lat, lng, 14);

    // Smooth scroll into the map result zone
    window.requestAnimationFrame(() => {
      resultZone.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [areas]);

  return (
    <>
      {/* ── Result zone ──────────────────────────────────────────────
          On resolve: one unified surface holding both the result and the map
          — no separate boxed cards, no seam between them. */}
      {hasResult && (
        <section ref={resultZone} className="container-lattice scroll-mt-24 py-16 md:py-20">
          <AnimatePresence mode="wait">
            <motion.div key="result" {...sceneMotion} className="overflow-hidden rounded-2xl bg-paper">
              <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] lg:items-stretch">
                <div className="relative flex flex-col justify-center border-b border-line/60 px-6 py-9 sm:px-8 lg:border-b-0 lg:py-12">
                  {/* the one seam — a single gold rule instead of two bordered cards */}
                  <span
                    className="pointer-events-none absolute inset-y-[16%] right-0 hidden w-[2px] rounded-full bg-loop lg:block"
                    aria-hidden="true"
                  />
                  <CoverageResultPanel checking={checking} result={result} onPrimary={startConversion} onReset={reset} />
                </div>
                <div className="relative h-[340px] sm:h-[420px] lg:h-auto lg:min-h-[560px]">
                  <CoverageMap
                    areas={areas}
                    activeAreaId={activeAreaId}
                    flyTarget={flyTarget}
                    marker={marker}
                    onAreaHover={setHoverId}
                    onAreaLeave={() => setHoverId(null)}
                    onAreaClick={selectArea}
                    className="absolute inset-0"
                  >
                    <MapLegend />
                  </CoverageMap>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* Where Fibrehood is building — dual-pane network rollout explorer */}
      <WhereFibrehoodIsBuilding onOpenArea={handleOpenArea} onViewOnMap={handleViewOnMap} />

      <SignupFlow open={signupOpen} location={result} onClose={() => setSignupOpen(false)} onChangeAddress={reset} />
      <InterestFlow
        open={!!interest}
        intent={interest || LEAD_INTENT.REGISTER_INTEREST}
        location={result}
        onClose={() => setInterest(null)}
      />
    </>
  );
}

export default CoverageExplorer;