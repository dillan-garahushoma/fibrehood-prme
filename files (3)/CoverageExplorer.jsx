import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CoverageMap from "./CoverageMap";
import LocationPanel from "./LocationPanel";
import CoverageResultPanel from "./CoverageResultPanel";
import NetworkExplorer from "./NetworkExplorer";
import SignupFlow from "@/components/signup/SignupFlow";
import InterestFlow from "@/components/signup/InterestFlow";
import { getCoverageAreas, resolveCoverage } from "@/lib/coverageService";
import { DEPLOYMENT_STATUS, RESOLUTION, LEAD_INTENT, statusMeta, STATUS_ORDER } from "@/data/coverageStatus";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];
let nonceSeed = 0;

function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] flex flex-wrap gap-x-4 gap-y-1.5 rounded-lg bg-paper/85 px-3 py-2 text-[11px] text-ink-soft shadow-[0_1px_3px_rgba(7,34,72,0.08)] backdrop-blur-sm">
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
    const live = result.status === DEPLOYMENT_STATUS.LIVE && result.resolution !== RESOLUTION.NEARBY;
    if (live) {
      setSignupOpen(true);
      return;
    }
    const intent =
      result.resolution === RESOLUTION.NEARBY ? LEAD_INTENT.REGISTER_INTEREST : statusMeta(result.status).intent;
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

  return (
    <>
      {/* ── Checker zone ──────────────────────────────────────────────
          Idle: a single centred input — no map, because there's nothing to
          show yet. On resolve: one unified surface holding both the result
          and the map — no separate boxed cards, no seam between them. */}
      <section ref={resultZone} className="container-lattice scroll-mt-24 py-16 md:py-20">
        <AnimatePresence mode="wait">
          {!hasResult ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-xl"
            >
              <div className="mb-7 text-center">
                <h2 className="font-heading text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                  Where should we look?
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Search an address, use your location, or pick your area — we'll tell you what's live.
                </p>
              </div>
              <LocationPanel onResolve={handleResolve} />
            </motion.div>
          ) : (
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
          )}
        </AnimatePresence>
      </section>

      <NetworkExplorer areas={areas} activeAreaId={activeAreaId} onSelect={selectArea} />

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
