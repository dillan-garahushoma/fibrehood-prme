import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { StepProgressRail } from "@/components/home/StepProgressRail";
import { Step1Coverage } from "@/components/home/step/Step1Coverage";
import { Step2Plans } from "@/components/home/step/Step2Plans";
import { Step3Calendar } from "@/components/home/step/Step3Calendar";
import { Step4Connected } from "@/components/home/step/Step4Connected";
import { PortalPreview } from "@/components/home/PortalPreview";

const STEPS = [
  { num: "01", title: "Check coverage", body: "Enter your address to see if FibreHood is available in your area." },
  { num: "02", title: "Choose your plan", body: "Pick the fibre plan that best fits your home and lifestyle." },
  { num: "03", title: "Schedule installation", body: "Select a convenient time and our team will take care of the rest." },
  { num: "04", title: "Get connected", body: "We install, set up and get you online — fast. It's that easy!" },
];

const EASE = [0.16, 1, 0.3, 1];

function renderStepVisual(index) {
  switch (index) {
    case 0: return <Step1Coverage />;
    case 1: return <Step2Plans />;
    case 2: return <Step3Calendar />;
    case 3: return <Step4Connected />;
    default: return null;
  }
}

export function ConnectionJourney() {
  const reduce = useReducedMotion();
  const stepperRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(3, Math.max(0, Math.floor(latest * 4)));
    setActiveStep(step);
  });

  return (
    <section className="relative bg-paper">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="container-lattice pt-20 pb-12 md:pt-28 md:pb-16">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <span className="eyebrow">
            <span className="h-px w-6 bg-ink-soft/30" />
            From coverage to connection
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            Getting connected is <span className="text-loop">simple.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            From checking coverage to getting online, we make the process
            quick, easy and hassle-free.
          </p>
        </Reveal>
      </div>

      {/* ── Reduced motion: stacked steps ────────────────────────── */}
      {reduce ? (
        <div className="container-lattice space-y-8 pb-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal font-heading text-sm font-bold text-paper">
                  {step.num}
                </span>
                <h3 className="font-heading text-lg font-bold text-signal">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
              <div className="h-[300px] overflow-hidden rounded-2xl border border-line">
                {renderStepVisual(i)}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        /* ── Scroll-driven stepper — all viewports ─────────────── */
        <div ref={stepperRef} className="relative h-[360vh]">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden lg:top-20 lg:h-[calc(100vh-5rem)]">
            <div className="container-lattice flex h-full flex-col justify-center gap-6 lg:grid lg:grid-cols-[260px_1fr] lg:items-center lg:gap-12">
              {/* Rail — horizontal on mobile, vertical on desktop */}
              <StepProgressRail variant="horizontal" activeStep={activeStep} className="lg:hidden" />
              <StepProgressRail variant="vertical" activeStep={activeStep} className="hidden lg:block" />

              {/* Content panel */}
              <div className="flex flex-col gap-5 lg:gap-8">
                <div className="relative h-[260px] sm:h-[300px] lg:h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="h-full"
                    >
                      {renderStepVisual(activeStep)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-signal sm:text-xl">
                    {STEPS[activeStep].title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                    {STEPS[activeStep].body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Portal Preview ─────────────────────────────────────────── */}
      <div className="container-lattice pb-20 md:pb-28">
        <PortalPreview />
      </div>
    </section>
  );
}

export default ConnectionJourney;