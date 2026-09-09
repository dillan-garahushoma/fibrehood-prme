import React, { useCallback, useState } from "react";
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

function Legend() {
  return (
    <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1.5 rounded-xl border border-paper/15 bg-signal/75 px-3 py-2.5 text-[11px] text-paper backdrop-blur-md">
      {STATUS_ORDER.map((s) => {
        const meta = statusMeta(s);
        return (
          <div key={s} className="flex items-center gap-2">
            <span className={cn("inline-block h-2 w-2 rounded-full", meta.dotClass)} />
            <span className="text-paper/85">{meta.label}</span>
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

  const activeAreaId = result?.areaId ?? areaFocus?.id ?? hoverId;

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
    }, 650);
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
      <section className="container-lattice -mt-10 sm:-mt-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-6">
          {/* Task A — check my coverage */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {checking || result ? (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CoverageResultPanel checking={checking} result={result} onPrimary={startConversion} onReset={reset} />
                </motion.div>
              ) : (
                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LocationPanel onResolve={handleResolve} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* The map is visual confirmation, not the hero */}
          <div className="isolate overflow-hidden rounded-2xl border border-line bg-paper shadow-signal">
            <CoverageMap
              areas={areas}
              activeAreaId={activeAreaId}
              flyTarget={flyTarget}
              marker={marker}
              onAreaHover={setHoverId}
              onAreaLeave={() => setHoverId(null)}
              onAreaClick={selectArea}
              className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[560px]"
            >
              <Legend />
            </CoverageMap>
          </div>
        </div>
      </section>

      <NetworkExplorer areas={areas} activeAreaId={activeAreaId} onSelect={selectArea} />

      <SignupFlow
        open={signupOpen}
        location={result}
        onClose={() => setSignupOpen(false)}
        onChangeAddress={reset}
      />
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