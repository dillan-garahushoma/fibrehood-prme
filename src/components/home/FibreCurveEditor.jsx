import React, { useState, useRef, useEffect } from "react";

const INITIAL_WAVES = [
  {
    id: "mainGold",
    name: "Main Gold Wave",
    color: "#ffc72c",
    points: [
      { x: 997, y: 694, type: "anchor" },
      { x: 1277, y: 567, type: "cp" },
      { x: 1148, y: 280, type: "cp" },
      { x: 943, y: 316, type: "anchor" },
      { x: 1111, y: 171, type: "cp" },
      { x: 526, y: 300, type: "cp" },
      { x: 436, y: 275, type: "anchor" },
      { x: 339, y: 283, type: "cp" },
      { x: 254, y: 298, type: "cp" },
      { x: 172, y: 363, type: "anchor" },
      { x: 102, y: 406, type: "cp" },
      { x: -49, y: 715, type: "cp" },
      { x: 659, y: 736, type: "anchor" },
    ],
  },
  {
    id: "knotLoop1",
    name: "Knot Loop 1",
    color: "#ffc72c",
    points: [
      { x: 995, y: 668, type: "anchor" },
      { x: 1090, y: 462, type: "cp" },
      { x: 1101, y: 676, type: "cp" },
      { x: 1189, y: 497, type: "anchor" },
      { x: 1212, y: 532, type: "cp" },
      { x: 1078, y: 745, type: "cp" },
      { x: 1021, y: 698, type: "anchor" },
    ],
  },
  {
    id: "tealAccent",
    name: "Teal Accent Wave",
    color: "#37e2df",
    points: [
      { x: 256, y: 549, type: "anchor" },
      { x: 332, y: 724, type: "cp" },
      { x: 670, y: 692, type: "cp" },
      { x: 655, y: 719, type: "anchor" },
    ],
  },
];

const INITIAL_FADE_ZONES = [
  { id: "zone-mom", zone: "mom", label: "Mom", cx: 686, cy: 278, r: 140 },
  { id: "zone-girl", zone: "girl", label: "Girl", cx: 506, cy: 262, r: 80 },
  { id: "zone-dad", zone: "dad", label: "Dad", cx: 789, cy: 238, r: 70 },
  { id: "zone-boy", zone: "boy", label: "Boy", cx: 939, cy: 318, r: 80 },
];

function buildCubicPath(points) {
  if (!points || points.length < 4) return "";
  let d = `M ${Math.round(points[0].x)} ${Math.round(points[0].y)}`;
  for (let i = 1; i + 2 < points.length; i += 3) {
    const cp1 = points[i];
    const cp2 = points[i + 1];
    const end = points[i + 2];
    d += ` C ${Math.round(cp1.x)} ${Math.round(cp1.y)}, ${Math.round(cp2.x)} ${Math.round(cp2.y)}, ${Math.round(end.x)} ${Math.round(end.y)}`;
  }
  return d;
}

export function FibreCurveEditor() {
  const [waves, setWaves] = useState(INITIAL_WAVES);
  const [fadeZones, setFadeZones] = useState(INITIAL_FADE_ZONES);
  const [activeWaveId, setActiveWaveId] = useState("mainGold");
  const [showHandles, setShowHandles] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showReadout, setShowReadout] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [activeDrag, setActiveDrag] = useState(null);
  const [viewBoxMode, setViewBoxMode] = useState("1200x896"); // "1200x896" or "1376x768"

  const svgRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const getSvgCoordinates = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX || (e.touches && e.touches[0].clientX);
    pt.y = e.clientY || (e.touches && e.touches[0].clientY);
    const cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return {
      x: Math.round(cursorPt.x),
      y: Math.round(cursorPt.y),
    };
  };

  const handlePointerDown = (type, targetId, pointIndex, e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDrag({ type, targetId, pointIndex });
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!activeDrag) return;
      const { x, y } = getSvgCoordinates(e);

      if (activeDrag.type === "wavePoint") {
        setWaves((prev) =>
          prev.map((w) => {
            if (w.id !== activeDrag.targetId) return w;
            const newPts = [...w.points];
            newPts[activeDrag.pointIndex] = {
              ...newPts[activeDrag.pointIndex],
              x,
              y,
            };
            return { ...w, points: newPts };
          })
        );
      } else if (activeDrag.type === "zone") {
        setFadeZones((prev) =>
          prev.map((z) => (z.id === activeDrag.targetId ? { ...z, cx: x, cy: y } : z))
        );
      }
    };

    const handlePointerUp = () => {
      if (activeDrag) setActiveDrag(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [activeDrag]);

  // Formats back into the exact schema provided by user
  const exportSchema = () => {
    const waveData = {};
    waves.forEach((w) => {
      const anchors = [];
      const controls = [];
      const pts = w.points;
      if (pts.length > 0) {
        anchors.push([Math.round(pts[0].x), Math.round(pts[0].y)]);
        for (let i = 1; i + 2 < pts.length; i += 3) {
          controls.push([
            [Math.round(pts[i].x), Math.round(pts[i].y)],
            [Math.round(pts[i + 1].x), Math.round(pts[i + 1].y)],
          ]);
          anchors.push([Math.round(pts[i + 2].x), Math.round(pts[i + 2].y)]);
        }
      }
      waveData[w.id] = { anchors, controls };
    });

    return {
      fadeZones: fadeZones.map((z) => ({
        zone: z.zone,
        cx: Math.round(z.cx),
        cy: Math.round(z.cy),
        r: Math.round(z.r),
      })),
      waves: waveData,
    };
  };

  const copyCoordinates = () => {
    const json = JSON.stringify(exportSchema(), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      showToast("Coordinates copied to clipboard!");
    });
  };

  const copySvgPathsOnly = () => {
    const text = waves.map((w) => `// ${w.name}\nd: "${buildCubicPath(w.points)}"`).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      showToast("SVG Paths copied to clipboard!");
    });
  };

  const resetToUserCoordinates = () => {
    setWaves(INITIAL_WAVES);
    setFadeZones(INITIAL_FADE_ZONES);
    showToast("Reset to provided coordinates!");
  };

  const currentViewBox = viewBoxMode === "1200x896" ? "0 0 1200 896" : "0 0 1376 768";

  return (
    <>
      {/* SVG Canvas Overlay */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full pointer-events-auto z-30"
        viewBox={currentViewBox}
        preserveAspectRatio="xMaxYMid slice"
        style={{ userSelect: "none" }}
      >
        <defs>
          <filter id="editor-gold-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="14" result="blurWide" />
            <feGaussianBlur stdDeviation="4" result="blurTight" />
            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="blurTight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="editor-cyan-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="blurWide" />
            <feGaussianBlur stdDeviation="3" result="blurTight" />
            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="blurTight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fade Zones (Dashed Circles like reference editor) */}
        {showZones &&
          fadeZones.map((z) => (
            <g key={z.id} className="cursor-move" onPointerDown={(e) => handlePointerDown("zone", z.id, 0, e)}>
              <circle
                cx={z.cx}
                cy={z.cy}
                r={z.r}
                fill="rgba(255,255,255,0.06)"
                stroke="#ffffff"
                strokeWidth={1.5}
                strokeDasharray="6 5"
                strokeOpacity={0.8}
              />
              <circle cx={z.cx} cy={z.cy} r={4} fill="#ffffff" />
              <text
                x={z.cx}
                y={z.cy - z.r - 8}
                fill="#ffffff"
                fontSize={13}
                fontWeight={600}
                textAnchor="middle"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
              >
                {z.label} ({z.cx}, {z.cy})
              </text>
            </g>
          ))}

        {/* Render Fibre Waves (Glow layers) */}
        {waves.map((wave) => {
          const pathData = buildCubicPath(wave.points);
          const isSelected = wave.id === activeWaveId;
          const isTeal = wave.color === "#37e2df";

          return (
            <g key={wave.id}>
              {/* Soft Wide Halo */}
              <path
                d={pathData}
                stroke={wave.color}
                strokeWidth={isSelected ? 16 : 10}
                strokeLinecap="round"
                fill="none"
                opacity={0.4}
                filter={isTeal ? "url(#editor-cyan-bloom)" : "url(#editor-gold-bloom)"}
              />
              {/* Inner Radiant Stroke */}
              <path
                d={pathData}
                stroke={wave.color}
                strokeWidth={isSelected ? 5.5 : 3.5}
                strokeLinecap="round"
                fill="none"
                opacity={0.85}
              />
              {/* Hot White Razor Core */}
              <path
                d={pathData}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 2.2 : 1.5}
                strokeLinecap="round"
                fill="none"
                opacity={0.95}
              />
            </g>
          );
        })}

        {/* Interactive Editor Handles (Anchors & Bezier Controls) */}
        {showHandles &&
          waves.map((wave) => {
            const isSelected = wave.id === activeWaveId;
            const pts = wave.points;

            return (
              <g key={`handles-${wave.id}`} opacity={isSelected ? 1 : 0.45}>
                {/* Guide Lines between anchors and control points */}
                {pts.map((pt, i) => {
                  if (pt.type === "anchor") return null;
                  const prevAnchor = i % 3 === 1 ? pts[i - 1] : pts[i + 1];
                  if (!prevAnchor) return null;
                  return (
                    <line
                      key={`guide-${i}`}
                      x1={pt.x}
                      y1={pt.y}
                      x2={prevAnchor.x}
                      y2={prevAnchor.y}
                      stroke="#7fd8ff"
                      strokeWidth={1.2}
                      strokeDasharray="4 4"
                      opacity={0.75}
                    />
                  );
                })}

                {/* Handle Points */}
                {pts.map((pt, i) => {
                  const isAnchor = pt.type === "anchor";
                  return (
                    <g key={`pt-${i}`} className="cursor-grab active:cursor-grabbing">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isAnchor ? 8.5 : 6}
                        fill={isAnchor ? "#ff5c8a" : "#7fd8ff"}
                        stroke="#0b1730"
                        strokeWidth={2}
                        onPointerDown={(e) => handlePointerDown("wavePoint", wave.id, i, e)}
                      />
                      {isSelected && (
                        <text
                          x={pt.x + 10}
                          y={pt.y + 4}
                          fill="#ffffff"
                          fontSize={11}
                          fontWeight="bold"
                          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.95))"
                        >
                          {isAnchor ? `A${Math.floor(i / 3)}` : `C${i}`} ({Math.round(pt.x)}, {Math.round(pt.y)})
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
      </svg>

      {/* Floating Toolbar & Control Panel */}
      <div className="absolute top-20 right-4 z-40 max-w-sm rounded-xl border border-[#243456] bg-[#0b1730]/95 p-3.5 shadow-2xl backdrop-blur-md text-xs text-[#eef2ff]">
        <div className="flex items-center justify-between border-b border-[#243456] pb-2 mb-2.5">
          <div className="font-bold text-[#ffc72c] uppercase tracking-wider text-[11px]">
            ⚡ Fibre Curve Editor
          </div>
          <button
            onClick={() => setViewBoxMode(viewBoxMode === "1200x896" ? "1376x768" : "1200x896")}
            className="text-[10px] text-[#37e2df] underline hover:text-white"
          >
            viewBox: {viewBoxMode}
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-[11px] text-[#9aa7c7] mb-1">Select Wave to Edit:</label>
          <select
            value={activeWaveId}
            onChange={(e) => setActiveWaveId(e.target.value)}
            className="w-full rounded bg-[#101c36] border border-[#243456] p-1.5 text-xs text-[#eef2ff] outline-none"
          >
            {waves.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <button
            onClick={() => setShowHandles(!showHandles)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
              showHandles ? "bg-[#ffc72c] text-[#0b1730]" : "bg-[#1a2a4d] text-[#eef2ff]"
            }`}
          >
            {showHandles ? "Hide Handles" : "Show Handles"}
          </button>
          <button
            onClick={() => setShowZones(!showZones)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
              showZones ? "bg-[#37e2df] text-[#0b1730]" : "bg-[#1a2a4d] text-[#eef2ff]"
            }`}
          >
            {showZones ? "Hide Zones" : "Show Zones"}
          </button>
          <button
            onClick={() => setShowReadout(!showReadout)}
            className="px-2.5 py-1 rounded bg-[#1a2a4d] text-[#eef2ff] hover:bg-[#233a68] text-[11px] font-semibold"
          >
            {showReadout ? "Hide Data" : "View Data"}
          </button>
          <button
            onClick={resetToUserCoordinates}
            className="px-2 py-1 rounded bg-[#1a2a4d] text-[#eef2ff] hover:bg-rose-900/60 text-[11px]"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={copyCoordinates}
            className="flex items-center justify-center gap-1 rounded bg-[#ffc72c] px-3 py-1.5 text-xs font-bold text-[#1a1200] shadow hover:bg-[#ffc72c]/90 transition"
          >
            📋 Copy JSON
          </button>
          <button
            onClick={copySvgPathsOnly}
            className="flex items-center justify-center gap-1 rounded bg-[#37e2df] px-3 py-1.5 text-xs font-bold text-[#0b1730] shadow hover:bg-[#37e2df]/90 transition"
          >
            📋 Copy Paths
          </button>
        </div>

        {/* Quick Legend */}
        <div className="mt-2.5 pt-2 border-t border-[#243456] text-[10px] text-[#9aa7c7] flex justify-between">
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff5c8a] mr-1" />
            Anchor (Pink)
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#7fd8ff] mr-1" />
            Control (Blue)
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full border border-dashed border-white mr-1" />
            Zone Circle
          </span>
        </div>

        {/* Readout box */}
        {showReadout && (
          <div className="mt-2.5 max-h-44 overflow-y-auto rounded bg-[#050a16] p-2 font-mono text-[10px] text-[#9aa7c7] select-all border border-[#243456]">
            <pre>{JSON.stringify(exportSchema(), null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#ffc72c] px-4 py-2 text-xs font-extrabold text-[#1a1200] shadow-xl animate-bounce">
          {toastMsg}
        </div>
      )}
    </>
  );
}

export default FibreCurveEditor;
