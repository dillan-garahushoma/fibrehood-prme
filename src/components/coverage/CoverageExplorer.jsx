import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CoverageMap from "./CoverageMap";
import LocationPanel from "./LocationPanel";
import CoverageResultPanel from "./CoverageResultPanel";
import NetworkExplorer from "./NetworkExplorer";
import SignupFlow from "@/components/signup/SignupFlow";
import InterestFlow from "@/components/signup/InterestFlow";
import { getCoverageAreas, resolveCoverage } from "@/lib/coverageService";
import { DEPLOYMENT_STATUS, RESOLUTION, LEAD_INTENT, statusMeta, STATUS_ORDER } from "@/data/coverageStatus";
import { cn } from "@/lib/utils";

let nonceSeed = 0;

function MapLegend() {
  return (
    <div className="absolute bottom-3 left-3 z-[1000] flex flex-wrap gap-x-4 gap-y-1.5 rounded-lg border border-line bg-paper/85 px-3 py-2 text-[11px] text-ink-soft backdrop-blur-sm">
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

  return (
    <>
      {/* ── Checker zone ──────────────────────────────────────────────
          Idle: a single centred input — no map, because there's nothing to
          show yet. On resolve: result panel + map side by side, so the map
          only ever sits beside a result. */}
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
              <div className="mb-6 text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Check your address
                </span>
                <h2 className="mt-3 font-heading text-2xl font-bold tracking-tighter text-ink sm:text-3xl">
                  Where should we look?
                </h2>
              </div>
              <LocationPanel onResolve={handleResolve} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-5 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-8"
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <CoverageResultPanel checking={checking} result={result} onPrimary={startConversion} onReset={reset} />
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-fog/30">
                <CoverageMap
                  areas={areas}
                  activeAreaId={activeAreaId}
                  flyTarget={flyTarget}
                  marker={marker}
                  onAreaHover={setHoverId}
                  onAreaLeave={() => setHoverId(null)}
                  onAreaClick={selectArea}
                  className="relative h-[360px] w-full overflow-hidden sm:h-[440px] lg:h-[520px]"
                >
                  <MapLegend />
                </CoverageMap>
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