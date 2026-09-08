import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { CoverageMapDemo } from "@/components/home/step/CoverageMapDemo";
import { Step2Plans } from "@/components/home/step/Step2Plans";
import { Step3Calendar } from "@/components/home/step/Step3Calendar";
import { Step4Connected } from "@/components/home/step/Step4Connected";
import { PortalPreview } from "@/components/home/PortalPreview";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Check coverage", body: "It starts with a simple check. Enter your address to instantly see if FibreHood's blazing-fast network is available in your neighborhood." },
  { title: "Choose your plan", body: "Once you're in the zone, choose a fibre plan tailored to your lifestyle—whether you're streaming in 4K, working from home, or gaming without lag." },
  { title: "Schedule installation", body: "Next, you pick a time that works for you. Our expert technicians handle the entire installation quickly and cleanly, with zero hassle." },
  { title: "Get connected", body: "That's it. We take care of the setup so you can start enjoying seamless, ultra-reliable internet from day one." }
];

// Deliberate, buttery-smooth ease (Apple-style)
const EASE = [0.22, 1, 0.36, 1];
const TRANSITION = { duration: 0.6, ease: EASE };

function renderStepVisual(index) {
  switch (index) {
    case 0: return <CoverageMapDemo />;
    case 1: return <Step2Plans />;
    case 2: return <Step3Calendar />;
    case 3: return <Step4Connected />;
    default: return null;
  }
}

export function ConnectionJourney() {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative bg-paper">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="container-lattice pt-20 pb-6 md:pt-28 md:pb-8">
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
        <div className="container-lattice space-y-16 pb-12">
          {STEPS.map((step, i) => (
            <Reveal key={i} className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-24">
              <div className="flex flex-col">
                <h3 className="font-heading text-2xl font-bold tracking-tight text-signal lg:text-4xl mb-3 lg:mb-5">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-soft lg:text-lg">{step.body}</p>
              </div>
              <div className="h-[300px] w-full overflow-hidden rounded-2xl border border-line sm:h-[400px] lg:h-[550px]">
                {renderStepVisual(i)}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        /* ── Native Scrollytelling Stepper — all viewports ─────────────── */
        <div className="relative">
          
          {/* Mobile Layout */}
          <div className="lg:hidden relative">
            <div className="sticky top-20 z-20 bg-paper/95 backdrop-blur-md pt-4 pb-4">
              <div className="container-lattice">
                <div className="relative h-[280px] sm:h-[400px] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={TRANSITION}
                      className={cn(
                        "absolute inset-0 h-full w-full",
                        activeStep === 0
                          ? "overflow-visible"
                          : "overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
                      )}
                    >
                      {renderStepVisual(activeStep)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="container-lattice relative z-10 pb-[10vh]">
              {STEPS.map((step, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col",
                    i === 0 ? "pt-8 pb-[15vh]" : "justify-center h-[50vh]"
                  )}
                >
                  <motion.div
                    onViewportEnter={() => setActiveStep(i)}
                    initial={{ opacity: i === 0 ? 1 : 0.2 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ 
                      margin: i === 0 ? "-40% 0px 0px 0px" : "-40% 0px -15% 0px", 
                      amount: "some" 
                    }}
                    transition={TRANSITION}
                  >
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-signal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block relative pb-[20vh]">
            <div className="container-lattice flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-24">
              
              {/* Left: Native scrolling text */}
              <div className="w-full">
                {STEPS.map((step, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col",
                      i === 0 ? "pt-[150px] pb-[25vh]" : "justify-center h-[60vh]"
                    )}
                  >
                    <motion.div
                      onViewportEnter={() => setActiveStep(i)}
                      initial={{ opacity: i === 0 ? 1 : 0.2 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ 
                        margin: i === 0 ? "-20% 0px 0px 0px" : "-20% 0px -20% 0px", 
                        amount: "some" 
                      }}
                      transition={TRANSITION}
                      className="max-w-md"
                    >
                      <h3 className="font-heading text-2xl font-bold tracking-tight text-signal lg:text-4xl mb-3 lg:mb-5">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-ink-soft lg:text-lg">
                        {step.body}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Right: Sticky Content panel */}
              <div className="relative w-full h-full">
                <div className="sticky top-[calc(50vh-275px)] h-[550px] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={TRANSITION}
                      className={cn(
                        "absolute inset-0 h-full w-full",
                        activeStep === 0
                          ? "overflow-visible"
                          : "overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
                      )}
                    >
                      {renderStepVisual(activeStep)}
                    </motion.div>
                  </AnimatePresence>
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