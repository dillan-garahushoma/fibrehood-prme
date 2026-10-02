import React, { useId } from "react";
import { useReducedMotion } from "framer-motion";
import {
  FIBRE_LINES,
  FIBRE_NODES,
  FIBRE_OCCLUSION_PATHS,
  FIBRE_TONES,
  HERO_PHOTO,
} from "./fibreLineConfig";

function LineGradient({ id, line, tone, halo }) {
  const [start, end] = line.range;
  const depthOpacity = { background: 0.68, midground: 0.84, foreground: 0.94 }[line.depth] ?? 0.84;
  const opacity = halo ? line.haloOpacity : depthOpacity;
  const startColor = halo ? tone.glow : tone.core;
  const middleColor = halo ? tone.core : tone.bright;

  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={start} y1="0" x2={end} y2="0">
      <stop offset="0%" stopColor={startColor} stopOpacity="0" />
      <stop offset="8%" stopColor={startColor} stopOpacity={opacity * 0.68} />
      <stop offset="52%" stopColor={middleColor} stopOpacity={opacity} />
      <stop offset="84%" stopColor={startColor} stopOpacity={opacity * 0.55} />
      <stop offset="100%" stopColor={startColor} stopOpacity="0" />
    </linearGradient>
  );
}

function FibreLine({ line, uid, reduceMotion }) {
  const tone = FIBRE_TONES[line.tone];
  const coreGradient = uid(`${line.id}-core-gradient`);
  const haloGradient = uid(`${line.id}-halo-gradient`);
  const pathId = uid(`${line.id}-path`);

  return (
    <g
      className="fibre-art__strand"
      style={{ "--fibre-delay": `${line.delay}s` }}
      data-fibre-line={line.id}
      data-fibre-group={line.group}
      data-fibre-depth={line.depth}
    >
      <LineGradient id={coreGradient} line={line} tone={tone} halo={false} />
      <LineGradient id={haloGradient} line={line} tone={tone} halo />
      <path
        className="fibre-art__stroke fibre-art__halo"
        d={line.path}
        pathLength="1"
        stroke={`url(#${haloGradient})`}
        strokeWidth={line.haloWidth}
        filter={`url(#${uid("soft-glow")})`}
      />
      <path
        id={pathId}
        className="fibre-art__stroke fibre-art__core"
        d={line.path}
        pathLength="1"
        stroke={`url(#${coreGradient})`}
        strokeWidth={line.coreWidth}
        filter={`url(#${uid("core-glow")})`}
      />
      {!reduceMotion && line.packet && (
        <path
          className="fibre-art__packet"
          d={line.path}
          pathLength="1"
          stroke={tone.packet}
          strokeWidth={line.coreWidth + 0.55}
          filter={`url(#${uid("core-glow")})`}
          style={{
            "--packet-delay": `${1.45 + line.packet.phase}s`,
            "--packet-duration": `${line.packet.duration}s`,
          }}
        />
      )}
    </g>
  );
}

function FibreNode({ node, uid, reduceMotion }) {
  const tone = FIBRE_TONES[node.tone];
  return (
    <g
      className="fibre-art__node"
      data-fibre-node={node.id}
      style={{ "--node-delay": `${node.delay ?? 0}s` }}
    >
      <circle cx={node.x} cy={node.y} r={node.radius * 3.6} fill={tone.glow} opacity="0.2" filter={`url(#${uid("soft-glow")})`} />
      <circle cx={node.x} cy={node.y} r={node.radius} fill={tone.core}>
        {!reduceMotion && <animate attributeName="opacity" values=".6;1;.6" dur="5.2s" begin={`${node.radius}s`} repeatCount="indefinite" />}
      </circle>
      <circle cx={node.x} cy={node.y} r={node.radius * 0.38} fill="#fff" />
    </g>
  );
}

/**
 * The mask belongs exclusively to the fibre groups. No duplicate image, cutout,
 * circle, or visible matte is rendered: the paths simply disappear behind the
 * hand-traced subject silhouettes and re-emerge in the background pockets.
 */
export function HeroFibreWaves() {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const uid = (name) => `${id}-${name}`;

  return (
    <svg
      className={`fibre-art pointer-events-none absolute inset-0 z-10 h-full w-full ${reduceMotion ? "fibre-art--static" : ""}`}
      viewBox={`0 0 ${HERO_PHOTO.width} ${HERO_PHOTO.height}`}
      preserveAspectRatio="xMaxYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-testid="hero-fibre-lines"
    >
      <defs>
        <filter id={uid("soft-glow")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={uid("core-glow")} x="-18%" y="-18%" width="136%" height="136%">
          <feGaussianBlur stdDeviation="0.48" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={uid("occlusion-soft")} x="-4%" y="-4%" width="108%" height="108%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
        <mask id={uid("fibre-occlusion")} maskUnits="userSpaceOnUse" x="0" y="0" width={HERO_PHOTO.width} height={HERO_PHOTO.height}>
          <rect width={HERO_PHOTO.width} height={HERO_PHOTO.height} fill="white" />
          {FIBRE_OCCLUSION_PATHS.map((path) => <path key={path} d={path} fill="black" filter={`url(#${uid("occlusion-soft")})`} />)}
        </mask>
      </defs>

      <g mask={`url(#${uid("fibre-occlusion")})`} data-fibre-layer="masked-fibre-only" style={{ mixBlendMode: "screen" }}>
        {FIBRE_LINES.map((line) => <FibreLine key={line.id} line={line} uid={uid} reduceMotion={reduceMotion} />)}
        {FIBRE_NODES.map((node) => <FibreNode key={node.id} node={node} uid={uid} reduceMotion={reduceMotion} />)}
      </g>
    </svg>
  );
}

export default HeroFibreWaves;
