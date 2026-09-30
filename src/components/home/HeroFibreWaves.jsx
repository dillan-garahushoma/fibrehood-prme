import React, { useId } from "react";
import { useReducedMotion } from "framer-motion";

const WAVES = [
  {
    id: "mainGold",
    color: "#ffe9ad",
    halo: "goldHalo",
    core: "goldCore",
    widthHalo: 7,
    widthCore: 1.6,
    opacityHalo: 0.6,
    opacityCore: 0.9,
    anchors: [[971, 616], [1154, 463], [847, 335], [745, 428], [860, 622]],
    controls: [
      [[1225, 640], [1157, 444]],
      [[1219, 365], [1044, 299]],
      [[702, 401], [970, 400]],
      [[591, 473], [422, 609]]
    ]
  },
  {
    id: "knotLoop1",
    color: "#ffe9ad",
    halo: "goldHalo",
    core: "goldCore",
    widthHalo: 5,
    widthCore: 1.2,
    opacityHalo: 0.5,
    opacityCore: 0.85,
    anchors: [[1071, 567], [1147, 465], [1067, 584]],
    controls: [[[1073, 515], [1188, 553]], [[1181, 502], [1210, 531]]]
  },
  {
    id: "tealAccent",
    color: "#d3fffa",
    halo: "tealHalo",
    core: "tealCore",
    widthHalo: 2.5,
    widthCore: 0.8,
    opacityHalo: 0.5,
    opacityCore: 0.8,
    anchors: [[644, 490], [884, 620]],
    controls: [[[539, 587], [798, 546]]]
  }
];

const FADE_ZONES = [
  { zone: "mom", cx: 612, cy: 410, r: 140 },
  { zone: "girl", cx: 798, cy: 389, r: 80 },
  { zone: "dad", cx: 1147, cy: 460, r: 70 },
  { zone: "boy", cx: 1023, cy: 329, r: 80 }
];

function pathFor(wave) {
  let path = `M ${wave.anchors[0][0]} ${wave.anchors[0][1]}`;
  wave.controls.forEach(([first, second], index) => {
    const [x, y] = wave.anchors[index + 1];
    path += ` C ${first[0]} ${first[1]}, ${second[0]} ${second[1]}, ${x} ${y}`;
  });
  return path;
}

export function HeroFibreWaves() {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const uid = (name) => `${id}-${name}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 1200 896"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={uid("goldHalo")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffb200" stopOpacity="0" />
          <stop offset="12%" stopColor="#ffb200" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#ffd873" stopOpacity="0.6" />
          <stop offset="88%" stopColor="#ffb200" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffb200" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("goldCore")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffd873" stopOpacity="0" />
          <stop offset="12%" stopColor="#ffe9ad" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#fff6df" stopOpacity="1" />
          <stop offset="88%" stopColor="#ffe9ad" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffd873" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("tealHalo")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c9d6" stopOpacity="0" />
          <stop offset="15%" stopColor="#22c9d6" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#7cf0ea" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#22c9d6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22c9d6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("tealCore")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bafcf7" stopOpacity="0" />
          <stop offset="15%" stopColor="#d3fffa" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#f2fffd" stopOpacity="1" />
          <stop offset="85%" stopColor="#d3fffa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#bafcf7" stopOpacity="0" />
        </linearGradient>
        <filter id={uid("glowSoft")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={uid("glowTight")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={uid("fadeHole")}>
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="55%" stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <mask id={uid("fadeMask")} maskUnits="userSpaceOnUse" x="-128" y="-128" width="1456" height="1152">
          <rect x="-128" y="-128" width="1456" height="1152" fill="white" />
          {FADE_ZONES.map((zone) => (
            <circle
              key={zone.zone}
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill={`url(#${uid("fadeHole")})`}
            />
          ))}
        </mask>
      </defs>

      <g mask={`url(#${uid("fadeMask")})`}>
        {WAVES.map((wave) => (
          <g key={wave.id}>
            <path
              d={pathFor(wave)}
              stroke={`url(#${uid(wave.halo)})`}
              strokeWidth={wave.widthHalo}
              strokeLinecap="round"
              opacity={wave.opacityHalo}
              filter={`url(#${uid("glowSoft")})`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              id={uid(`${wave.id}-core`)}
              d={pathFor(wave)}
              stroke={`url(#${uid(wave.core)})`}
              strokeWidth={wave.widthCore}
              strokeLinecap="round"
              opacity={wave.opacityCore}
              filter={`url(#${uid("glowTight")})`}
              vectorEffect="non-scaling-stroke"
            />
            {!reduceMotion && [0, 1, 2].map((index) => (
              <circle
                key={`${wave.id}-glint-${index}`}
                r="2.6"
                fill={wave.color}
                filter={`url(#${uid("glowTight")})`}
              >
                <animateMotion
                  dur={`${Math.max(3, WAVES.length * 4 + 6)}s`}
                  begin={`${-index * 2}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref={`#${uid(`${wave.id}-core`)}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

export default HeroFibreWaves;
