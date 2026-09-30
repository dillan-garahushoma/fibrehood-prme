import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroFibreTrails — verbatim recreation of the reference image fibre optic effect.
 *
 * Visual approach (matching the reference):
 * - Open-ended Bezier arcs originating from the laptop, sweeping across the family organically.
 *   They do NOT loop — they taper out to nothing at their endpoints.
 * - Each "line" is 3 stacked SVG paths: wide soft glow halo, medium inner glow, razor-thin white core.
 * - Lines taper at endpoints via SVG mask + linearGradient fade.
 * - Nodes (cyan/gold starbursts) appear only at high-energy arc midpoints, NOT at termination points.
 * - Framer Motion animates "comet" pulses of light travelling along each arc.
 *
 * viewBox="0 0 1376 768" — preserveAspectRatio="xMaxYMid slice"
 * (anchors right-side to match object-right background image)
 *
 * Key anchor points (in 1376×768 space, right half of image):
 *   Laptop hub:   ~(1050, 570)
 *   Mother head:  ~(860, 240)
 *   Father head:  ~(1180, 220)
 */
export function HeroFibreTrails() {
  const reduce = useReducedMotion();

  const arcs = [
    {
      id: "left-wing",
      d: "M 1050 570 C 900 550, 700 420, 760 240 C 800 120, 870 80, 900 40",
      gradId: "grad-left-wing",
      x1: "100%", y1: "0%", x2: "0%", y2: "100%",
      color: "#F6B93B",
      duration: 3.8,
      delay: 0,
    },
    {
      id: "right-upper-wing",
      d: "M 1050 570 C 1150 500, 1280 350, 1250 200 C 1230 100, 1300 40, 1376 0",
      gradId: "grad-right-upper",
      x1: "0%", y1: "100%", x2: "100%", y2: "0%",
      color: "#F6B93B",
      duration: 3.2,
      delay: 0.6,
    },
    {
      id: "right-lower-wing",
      d: "M 1050 570 C 1150 600, 1280 580, 1350 520 C 1400 470, 1420 380, 1376 300",
      gradId: "grad-right-lower",
      x1: "0%", y1: "0%", x2: "100%", y2: "100%",
      color: "#F6B93B",
      duration: 3.5,
      delay: 1.2,
    },
    {
      id: "secondary-left-shallow",
      d: "M 1050 570 C 950 510, 820 380, 830 260 C 840 170, 880 130, 910 80",
      gradId: "grad-sec-left",
      x1: "100%", y1: "0%", x2: "0%", y2: "100%",
      color: "#F6B93B",
      duration: 4.5,
      delay: 0.3,
    },
    {
      id: "secondary-right-shallow",
      d: "M 1050 570 C 1120 510, 1220 400, 1210 260 C 1200 160, 1260 80, 1310 20",
      gradId: "grad-sec-right",
      x1: "0%", y1: "100%", x2: "100%", y2: "0%",
      color: "#F6B93B",
      duration: 4.2,
      delay: 0.9,
    },
  ];

  const nodes = [
    { x: 790, y: 300, color: "#22D3EE", r: 5, glowR: 16, delay: 0 },
    { x: 820, y: 180, color: "#06B6D4", r: 4, glowR: 12, delay: 1.0 },
    { x: 1220, y: 300, color: "#22D3EE", r: 5, glowR: 16, delay: 0.5 },
    { x: 1270, y: 150, color: "#06B6D4", r: 4, glowR: 12, delay: 1.5 },
    { x: 1320, y: 480, color: "#22D3EE", r: 5, glowR: 14, delay: 0.8 },
    { x: 1050, y: 400, color: "#F6B93B", r: 5, glowR: 18, delay: 0.3 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1376 768"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="halo-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="inner-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blurOut" />
            <feComposite in="blurOut" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="hub-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>

          {arcs.map((arc) => (
            <linearGradient
              key={arc.gradId}
              id={arc.gradId}
              x1={arc.x1} y1={arc.y1}
              x2={arc.x2} y2={arc.y2}
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="40%"  stopColor="white" stopOpacity="0.9" />
              <stop offset="75%"  stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          ))}

          <radialGradient id="hub-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%"  stopColor="#FFF9C4" stopOpacity="0.9" />
            <stop offset="55%"  stopColor="#F6B93B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F6B93B" stopOpacity="0" />
          </radialGradient>

          {arcs.map((arc) => (
            <mask id={`mask-${arc.id}`} key={`mask-${arc.id}`}>
              <path
                d={arc.d}
                stroke={`url(#${arc.gradId})`}
                strokeWidth="40"
                strokeLinecap="round"
                fill="none"
              />
            </mask>
          ))}
        </defs>

        {/* Layer 1 — Wide soft halo */}
        <g filter="url(#halo-glow)" opacity="0.45">
          {arcs.map((arc) => (
            <path
              key={`halo-${arc.id}`} d={arc.d}
              stroke={arc.color} strokeWidth="18"
              strokeLinecap="round" fill="none"
              mask={`url(#mask-${arc.id})`}
            />
          ))}
        </g>

        {/* Layer 2 — Medium inner glow */}
        <g filter="url(#inner-glow)" opacity="0.75">
          {arcs.map((arc) => (
            <path
              key={`inner-${arc.id}`} d={arc.d}
              stroke={arc.color} strokeWidth="6"
              strokeLinecap="round" fill="none"
              mask={`url(#mask-${arc.id})`}
            />
          ))}
        </g>

        {/* Layer 3 — White-hot razor core */}
        <g opacity="0.9">
          {arcs.map((arc) => (
            <path
              key={`core-${arc.id}`} d={arc.d}
              stroke="#FFFDE7" strokeWidth="1.5"
              strokeLinecap="round" fill="none"
              mask={`url(#mask-${arc.id})`}
            />
          ))}
        </g>

        {/* Layer 4 — Animated comet pulses */}
        {!reduce && (
          <g filter="url(#inner-glow)">
            {arcs.map((arc) => (
              <React.Fragment key={`comet-${arc.id}`}>
                <motion.path
                  d={arc.d} stroke={arc.color} strokeWidth="8"
                  strokeLinecap="round" fill="none"
                  style={{ pathLength: 0.18 }}
                  initial={{ pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.05, 0.82, 1], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: arc.duration, repeat: Infinity, ease: "easeInOut", delay: arc.delay, times: [0, 0.05, 0.92, 1] }}
                />
                <motion.path
                  d={arc.d} stroke="#FFFFFF" strokeWidth="3.5"
                  strokeLinecap="round" fill="none"
                  style={{ pathLength: 0.1 }}
                  initial={{ pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.05, 0.9, 1], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: arc.duration, repeat: Infinity, ease: "easeInOut", delay: arc.delay, times: [0, 0.05, 0.93, 1] }}
                />
                <motion.path
                  d={arc.d} stroke={arc.color} strokeWidth="6"
                  strokeLinecap="round" fill="none"
                  style={{ pathLength: 0.14 }}
                  initial={{ pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.05, 0.82, 1], opacity: [0, 0.8, 0.8, 0] }}
                  transition={{ duration: arc.duration, repeat: Infinity, ease: "easeInOut", delay: arc.delay + arc.duration * 0.5, times: [0, 0.05, 0.92, 1] }}
                />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* Layer 5 — Laptop hub */}
        <g transform="translate(1050, 570)">
          <circle r="80" fill="url(#hub-flare)" />
          {!reduce && (
            <>
              <motion.circle r="18" fill="none" stroke="#F6B93B" strokeWidth="2"
                initial={{ scale: 0.6, opacity: 1 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle r="18" fill="none" stroke="#FFFDE7" strokeWidth="1.5"
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
              />
            </>
          )}
          <circle r="9" fill="#FFFFFF" filter="url(#hub-glow)" />
          <circle r="4" fill="#FFFFFF" />
        </g>

        {/* Layer 6 — Cyan starburst nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y})`}>
            <motion.circle
              r={node.glowR} fill={node.color} filter="url(#node-glow)"
              animate={reduce ? {} : { opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
            />
            <circle r={node.r + 1} fill={node.color} opacity="0.7" />
            <circle r={node.r - 1.5} fill="#FFFFFF" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default HeroFibreTrails;
