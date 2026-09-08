import React, { useState } from "react";
import { MapPin } from "lucide-react";

// ┌──────────────────────────────────────────────────────────────┐
// │  SWAP THIS: drop your generated coverage screenshot at       │
// │  /public/assets/coverage-demo.png (or replace this URL).     │
// └──────────────────────────────────────────────────────────────┘
const COVERAGE_DEMO = "/assets/coverage-demo.png";

export function CoverageDemo() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="glass-panel relative h-full w-full overflow-hidden rounded-2xl">
      {!failed ? (
        <img
          src={COVERAGE_DEMO}
          alt="Coverage checker demo — enter your address to see FibreHood availability on the map"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        // Branded fallback so the slot reads as part of the system pre-swap
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-grid">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-loop shadow-lift">
            <MapPin className="h-7 w-7 text-signal" strokeWidth={1.8} />
          </div>
          <p className="text-sm font-semibold text-signal">Coverage map preview</p>
          <p className="max-w-[220px] text-center text-xs text-ink-soft">
            Drop your generated coverage screenshot at{" "}
            <code className="rounded bg-fog px-1 py-0.5 font-mono text-[10px] text-signal">
              /assets/coverage-demo.png
            </code>
          </p>
        </div>
      )}

      {/* Floating glass result chip — consistent across all four demos */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl border border-signal/10 bg-paper/80 px-3 py-2 backdrop-blur-md">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal/10">
          <MapPin className="h-3.5 w-3.5 text-signal" strokeWidth={2} />
        </span>
        <span className="text-xs font-semibold text-signal">FibreHood is available here</span>
        <span className="ml-auto text-[10px] text-ink-soft">Up to 200 Mbps</span>
      </div>
    </div>
  );
}

export default CoverageDemo;