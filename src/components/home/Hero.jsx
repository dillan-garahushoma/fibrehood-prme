import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { LoopMark } from "@/components/brand/LoopMark";
import { CoverageChecker } from "@/components/coverage/CoverageChecker";
import { SectionLabel } from "@/components/common/SectionLabel";
import { IMAGES } from "@/data/images";

/** Animated SVG network backdrop for the hero. */
function NetworkBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lineg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#FFCC00" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFCC00" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <g className="bg-grid-dark" />
      <g stroke="rgba(255,204,0,0.25)" strokeWidth="1.2" fill="none">
        <path d="M-50,320 C 260,260 360,420 640,360 S 1040,300 1500,420" />
        <path d="M-50,460 C 320,520 480,360 720,440 S 1080,520 1500,360" />
        <path d="M-50,560 C 360,500 560,620 820,520 S 1120,460 1500,560" />
      </g>
      <g fill="#FFCC00">
        {[[180,330],[420,380],[660,360],[900,420],[1140,360]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3.5" className="animate-signal-pulse" style={{ animationDelay: `${i*0.4}s` }} />
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-signal text-paper">
      {/* Blurred fibre-light backdrop, tinted navy so text stays crisp */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGES.lightTrails}
          alt=""
          fittingType="fill"
          className="h-full w-full scale-110 opacity-40 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-signal/90 via-signal/80 to-signal-deep/95" />
      </div>
      <div className="bg-grid-dark absolute inset-0 opacity-20" aria-hidden="true" />
      <NetworkBackdrop />
      <div className="pointer-events-none absolute -right-24 top-24 opacity-[0.08]">
        <LoopMark className="h-64 w-[28rem]" stroke={2} animated />
      </div>

      <div className="container-lattice relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel tone="light" className="justify-center">
            Fibre connectivity, coverage-first
          </SectionLabel>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tighter text-paper sm:text-5xl md:text-6xl">
            Bridging the
            <span className="relative mx-2 inline-block">
              <span className="text-loop">access gap</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-loop/70" />
            </span>
            with fibre that reaches you.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Check your address, see exactly what fibre is available, and choose a plan
            that fits your home or business — then get connected with a single request.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <CoverageChecker variant="hero" source="coverage" />
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Explore fibre plans <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-paper/60">
              <MapPin className="mr-1 inline h-3.5 w-3.5 text-loop" />
              Coverage-first — we tell you what's actually available.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;