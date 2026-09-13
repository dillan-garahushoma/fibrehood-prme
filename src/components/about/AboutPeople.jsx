import React from "react";
import { UserRound } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { LoopMark } from "@/components/brand/LoopMark";

/**
 * The People Behind FibreHood — the human side of the company. Roles are
 * described honestly; team profiles are clearly replaceable placeholders
 * rather than invented names, titles or awards.
 */
export function AboutPeople() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="container-lattice">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Copy ────────────────────────────────────────────────── */}
          <div className="lg:pt-4">
            <Reveal>
              <SectionLabel>The People Behind FibreHood</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[16ch] font-heading text-3xl font-extrabold leading-[1.05] tracking-tightest text-signal sm:text-5xl">
                Real people. Real support. Real accountability<span className="text-loop">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-lg space-y-5 text-base leading-[1.8] text-ink-soft">
                <p>
                  FibreHood isn&rsquo;t a faceless platform. It&rsquo;s the planner who maps your
                  street, the technician who gets the light levels right, and the person who
                  replies when you message us.
                </p>
                <p>
                  The people who build the network are the people who stand behind it. When
                  something needs fixing, you talk to someone who can actually fix it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
                <LoopMark className="h-6 w-11 shrink-0" animated />
                <p className="text-sm italic leading-relaxed text-ink-soft">
                  A neighbourhood network, run by people from the neighbourhood it serves.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Team profile placeholders ────────────────────────────── */}
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Reveal key={i} delay={0.08 * i} amount={0.3}>
                  <div className="flex h-full flex-col items-start rounded-xl border border-dashed border-line bg-fog/50 p-6 sm:p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fog text-ink-soft/50">
                      <UserRound className="h-6 w-6" />
                    </span>
                    <p className="mt-5 font-heading text-base font-bold tracking-tight text-ink-soft/70">
                      Team member
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft/60">
                      Name, role and photo
                    </p>
                    <p className="display-mono mt-4 text-[10px] uppercase tracking-[0.18em] text-ink-soft/40">
                      Profile coming soon
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.35}>
              <p className="mt-6 text-xs leading-relaxed text-ink-soft/50">
                Team profiles will be added here as FibreHood introduces the people behind the
                network.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPeople;
