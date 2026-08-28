import React from "react";
import { LoopMark } from "@/components/brand/LoopMark";
import { SectionLabel } from "@/components/common/SectionLabel";
import { cn } from "@/lib/utils";

export function PageHero({ eyebrow, title, subtitle, tone = "dark", children, align = "left" }) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-signal text-paper" : "bg-paper text-ink")}>
      {dark && <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />}
      <div className="pointer-events-none absolute -right-16 -top-10 opacity-[0.07]">
        <LoopMark className="h-56 w-[26rem]" stroke={2} animated />
      </div>
      <div className="container-lattice relative pt-28 pb-14 md:pt-36 md:pb-20">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          <SectionLabel tone={dark ? "light" : "ink"} className={align === "center" ? "justify-center" : ""}>
            {eyebrow}
          </SectionLabel>
          <h1 className={cn(
            "mt-5 font-heading text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl",
            dark ? "text-paper" : "text-signal"
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-paper/75" : "text-ink-soft")}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHero;