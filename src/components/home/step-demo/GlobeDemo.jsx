import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function jitter() {
  return (Math.random() - 0.5) * 4;
}

export function GlobeDemo() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const [size, setSize] = useState(0);
  const [down, setDown] = useState(48);
  const [up, setUp] = useState(22);

  // Measure the square canvas container
  useEffect(() => {
    const el = canvasRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setSize(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // cobe globe — ambient, brand-colored
  useEffect(() => {
    if (!canvasRef.current || !size) return;
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      width: size * 2,
      height: size * 2,
      onRender: (state) => {
        state.width = size * 2;
        state.height = size * 2;
        state.phi = phi;
        phi += reduce ? 0.0015 : 0.0055;
      },
      devicePixelRatio: 2,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 14000,
      mapBrightness: 6,
      baseColor: [0.027, 0.133, 0.282], // Signal Navy #072248
      markerColor: [1.0, 0.8, 0.0],      // Loop Yellow #FFCC00
      glowColor: [0.04, 0.08, 0.16],
      markers: [{ location: [-17.83, 31.05], size: 0.07 }], // Harare
    });
    return () => globe.destroy();
  }, [size, reduce]);

  // Live-updating throughput numbers
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setDown((d) => clamp(Math.round(d + jitter()), 42, 58));
      setUp((u) => clamp(Math.round(u + jitter()), 17, 27));
    }, 2000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="glass-panel-dark relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl p-5">
      {/* Globe */}
      <div className="relative" style={{ width: "min(62%, 220px)", aspectRatio: "1 / 1" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", cursor: "grab" }}
          aria-label="Animated dotted globe showing FibreHood network coverage"
        />
      </div>

      {/* Floating badge — status */}
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="text-xs font-semibold text-paper">Connected</span>
      </div>

      {/* Floating badge — live throughput */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
          <ArrowDown className="h-3.5 w-3.5 text-loop" strokeWidth={2} />
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-paper/50">Down</p>
            <p className="font-heading text-lg font-bold leading-none text-paper">
              {down}
              <span className="ml-0.5 text-[10px] font-normal text-paper/50">Mbps</span>
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
          <ArrowUp className="h-3.5 w-3.5 text-loop" strokeWidth={2} />
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-paper/50">Up</p>
            <p className="font-heading text-lg font-bold leading-none text-paper">
              {up}
              <span className="ml-0.5 text-[10px] font-normal text-paper/50">Mbps</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobeDemo;