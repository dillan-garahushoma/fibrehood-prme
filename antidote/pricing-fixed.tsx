"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  /**
   * BUG FIX: this used to be driven by Framer Motion's `whileInView`, which
   * relies on the browser's native IntersectionObserver watching this
   * component's real position in the document. If this section lives inside
   * a scroll-jacked / pinned "stage" (transform-driven step animation, not
   * real document scroll), the element's bounding box barely changes as you
   * scroll, so `whileInView` either never fires, or fires once at the wrong
   * moment and gets stuck mid-transition — which is exactly the half-rendered,
   * "one card with a grey skeleton bar" state you were seeing.
   *
   * Instead, control the reveal explicitly from the parent step/scroll
   * controller and pass it down as a boolean. This makes the animation
   * deterministic and scroll-direction-agnostic (works the same scrolling
   * up or down), instead of guessing at IntersectionObserver behavior.
   */
  active: boolean;
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  active,
  title = "Choose your plan",
  description = "One transparent price, no hidden fees, no surprises at checkout.",
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">{description}</p>
      </div>

      {/*
        BUG FIX: the 3D tilt on the side cards ("rotate-y-[10deg]",
        "-translate-z-[50px]") was applied as a static Tailwind class, while
        Framer Motion applies x/y/scale as an *inline* transform style on the
        same element. Inline style transform always wins over a class-based
        transform — so the tilt classes were dead code, completely
        overwritten every frame. That's why the "3D carousel" look never
        showed up and cards just flatly translated.

        Fix: put rotateY into the *same* motion animate object so Framer
        Motion composes one transform, and give the grid a perspective so
        rotateY actually reads as depth instead of a flat skew.
      */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ perspective: 1400 }}
      >
        {plans.map((plan, index) => {
          const isSide = index === 0 || index === 2;
          return (
            <motion.div
              key={plan.name}
              initial={{ y: 40, opacity: 0 }}
              animate={
                active
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: isDesktop ? (index === 2 ? -24 : index === 0 ? 24 : 0) : 0,
                      scale: isDesktop && isSide ? 0.94 : 1,
                      rotateY: isDesktop ? (index === 0 ? 10 : index === 2 ? -10 : 0) : 0,
                    }
                  : { y: 40, opacity: 0 }
              }
              transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 22,
                delay: active ? index * 0.08 : 0,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className={cn(
                "rounded-2xl border p-6 bg-background text-center flex flex-col relative",
                plan.isPopular ? "border-primary border-2 z-10" : "border-border",
                isSide && "z-0"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span className="text-primary-foreground ml-1 font-semibold text-sm">Popular</span>
                </div>
              )}
              <p className="text-base font-semibold text-muted-foreground">{plan.name}</p>
              <div className="mt-4 flex items-baseline justify-center gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">${plan.price}</span>
                <span className="text-sm font-semibold text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="mt-5 gap-2 flex flex-col text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <hr className="w-full my-4" />
              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full font-semibold",
                  plan.isPopular && "bg-primary text-primary-foreground"
                )}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
