import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { CoverageMapDemo } from "@/components/home/step/CoverageMapDemo";
import { Step2Plans } from "@/components/home/step/Step2Plans";
import { Step3Calendar } from "@/components/home/step/Step3Calendar";
import { Step4Connected } from "@/components/home/step/Step4Connected";
import { cn } from "@/lib/utils";

const JOURNEY_BG_IMAGE = "/images/img-hero-6.jpg";

const STEPS = [
  {
    title: "Check coverage",
    body: "Type your address. In seconds, you'll know exactly what speeds are live at your door — no sales calls, no waiting on hold. Most homes qualify on the spot.",
  },
  {
    title: "Choose your plan",
    body: "Pick the speed that fits your life. One transparent price, no hidden fees, no surprises at checkout. Upgrade or downgrade anytime you change your mind.",
  },
  {
    title: "Schedule installation",
    body: "Grab a slot that suits you. Our certified crew arrives on time, runs the fibre cleanly, and leaves your space exactly as they found it — usually in under two hours.",
  },
  {
    title: "Get connected",
    body: "You're live. Stream, work, game, and run the whole house on a connection built to stay up — backed by real local support the rare day it doesn't.",
  },
];

const SCROLL_STEPS = STEPS.map((_, index) => ({
  key: index,
  from: index / STEPS.length,
  to: (index + 1) / STEPS.length,
}));

const EASE = [0.22, 1, 0.36, 1];
const TRANSITION = { duration: 0.5, ease: EASE };

function renderStepVisual(index) {
  switch (index) {
    case 0:
      return <CoverageMapDemo />;
    case 1:
      return <Step2Plans active />;
    case 2:
      return <Step3Calendar active />;
    case 3:
      return <Step4Connected />;
    default:
      return null;
  }
}

function useScrollStage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const current = SCROLL_STEPS.find(
      (step) => progress >= step.from - 0.012 && progress < step.to + 0.012,
    );

    if (current) {
      setActiveStep((previous) => (previous === current.key ? previous : current.key));
    }
  });

  return { ref, activeStep };
}

function StepProgress({ activeStep }) {
  return (
    <div className="mb-3 flex items-center gap-2" aria-label={`Step ${activeStep + 1} of ${STEPS.length}`}>
      {STEPS.map((step, index) => (
        <span
          key={step.title}
          className={cn(
            "h-1 rounded-full transition-[width,background-color] duration-300",
            index === activeStep ? "w-8 bg-signal" : "w-2 bg-signal/15",
          )}
        />
      ))}
    </div>
  );
}

function StepCopy({ activeStep }) {
  const step = STEPS[activeStep];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.title}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 18 }}
        transition={TRANSITION}
        className="max-w-md"
      >
        <StepProgress activeStep={activeStep} />
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Step {activeStep + 1} of {STEPS.length}
        </p>
        <h3 className="font-heading text-3xl font-bold tracking-tight text-signal lg:text-4xl">
          {step.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ink-soft lg:text-lg">{step.body}</p>
      </motion.div>
    </AnimatePresence>
  );
}

function JourneyVisual({ activeStep }) {
  return (
    // BUG FIX: ".journey-stage" is defined in CSS I don't have visibility
    // into. Rather than guess at its rules, this inline background:transparent
    // wins over any class-based background unconditionally (inline style
    // always beats a class), so this wrapper is guaranteed to let the
    // section-level photo/wash show through instead of a possible opaque
    // fill from that class creating the "separated panel" look.
    <div className="journey-stage relative h-full w-full" style={{ background: "transparent" }}>
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-35"
        aria-hidden="true"
        style={{
          maskImage: "radial-gradient(ellipse 84% 78% at 52% 50%, black 12%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 84% 78% at 52% 50%, black 12%, transparent 82%)",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-loop/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-signal/10 blur-3xl" aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={STEPS[activeStep].title}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={TRANSITION}
          className="absolute inset-0"
        >
          {renderStepVisual(activeStep)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StaticJourney() {
  return (
    <div className="container-lattice relative z-10 space-y-16 pb-20">
      {STEPS.map((step, index) => (
        <Reveal
          key={step.title}
          className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-16"
        >
          <div className="max-w-md">
            <StepProgress activeStep={index} />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Step {index + 1} of {STEPS.length}
            </p>
            <h3 className="font-heading text-3xl font-bold tracking-tight text-signal lg:text-4xl">{step.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-soft lg:text-lg">{step.body}</p>
          </div>
          <div className="h-[420px] w-full sm:h-[500px] lg:h-[540px]">
            <JourneyVisual activeStep={index} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ConnectionJourney() {
  const reduce = useReducedMotion();
  const { ref, activeStep } = useScrollStage();

  return (
    <section className="relative isolate overflow-clip bg-paper">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/*
          BUG FIX: the seam you're seeing between the two columns is almost
          certainly this photo's own natural left-warm/right-cool tone
          (sunset sky vs. ocean) showing through at a scale where it reads
          as "two different backgrounds" rather than "one textured wash."
          grayscale + a higher overlay opacity neutralizes the photo's own
          color so it contributes texture/depth only -- the warmth now comes
          entirely from bg-paper, uniformly, on both sides.
        */}
        <img
          src={JOURNEY_BG_IMAGE}
          alt=""
          className="h-full w-full scale-105 object-cover object-center opacity-[0.10] blur-md grayscale"
        />
        <div className="absolute inset-0 bg-paper/92" />
      </div>

      <div className="container-lattice relative z-10 pb-8 pt-20 md:pb-10 md:pt-28">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <span className="eyebrow">
            <span className="h-px w-6 bg-ink-soft/30" />
            From coverage to connection
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            Getting connected is <span className="text-loop">simple.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            From checking coverage to getting online, we make the process quick, easy and hassle-free.
          </p>
        </Reveal>
      </div>

      {reduce ? (
        <StaticJourney />
      ) : (
        <div ref={ref} className="relative z-10 h-[400vh]">
          <div className="sticky top-16 h-[calc(100svh-4rem)] lg:top-20 lg:h-[calc(100svh-5rem)]">
            <div className="container-lattice grid h-full min-h-0 grid-rows-[minmax(330px,0.9fr)_auto] content-center gap-5 py-5 sm:grid-rows-[minmax(390px,0.95fr)_auto] sm:gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:grid-rows-1 lg:items-center lg:gap-16 lg:py-8">
              <div className="order-2 lg:order-1">
                <StepCopy activeStep={activeStep} />
              </div>
              <div className="order-1 h-full min-h-0 lg:order-2 lg:h-[min(62vh,560px)]">
                <JourneyVisual activeStep={activeStep} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ConnectionJourney;
