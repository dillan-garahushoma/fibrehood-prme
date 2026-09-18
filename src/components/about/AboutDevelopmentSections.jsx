import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import PeopleNetworkCollage from "@/components/about/PeopleNetworkCollage";
import UnderSurface from "@/components/about/UnderSurface";

const SIGNALS = [
  ["5G", "top-[8%] left-[12%]"],
  ["IoT", "top-[18%] right-[15%]"],
  ["Smart Homes", "top-[48%] left-[4%]"],
  ["Cloud", "top-[55%] right-[6%]"],
  ["AI", "bottom-[14%] left-[20%]"],
  ["Digital Workplaces", "bottom-[8%] right-[18%]"],
];

const DOTS = [
  ["22%", "30%"],
  ["40%", "58%"],
  ["60%", "22%"],
  ["70%", "68%"],
  ["35%", "80%"],
  ["50%", "45%"],
];

function OpeningStatement() {
  return (
    <section className="relative overflow-hidden bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
            <span className="h-px w-8 bg-loop" /> More Than Fibre
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            The internet is only as good as the network behind it.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft">
            <p>Every connection begins somewhere.</p>
            <p>
              Behind every video call, stream, download, business meeting and late-night scroll is an infrastructure layer
              most people never see.
            </p>
            <p>That is where Fibrehood comes in.</p>
            <p>
              We design, deploy and operate fibre infrastructure that gives communities a stronger foundation for everything
              digital today &mdash; and everything coming next.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16 lg:mt-20">
        <div className="mx-auto max-w-2xl">
          <svg viewBox="0 0 720 240" className="h-auto w-full" role="img" aria-labelledby="layer-diagram-title">
            <title id="layer-diagram-title">Everyday digital activity above ground, connected down to the fibre layer beneath it</title>
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/70">
              <rect x="106" y="34" width="38" height="30" rx="5" />
              <circle cx="136" cy="41" r="2.4" fill="currentColor" stroke="none" />
              <rect x="341" y="30" width="52" height="34" rx="4" />
              <path d="M359 40L359 54L378 47Z" fill="currentColor" stroke="none" />
              <path d="M596 32V54M586 45L596 57L606 45M580 64H612" />
            </g>
            <g fill="currentColor" className="text-ink-soft" style={{ fontSize: 9, letterSpacing: "0.15em" }}>
              <text x="125" y="80" textAnchor="middle">VIDEO CALL</text>
              <text x="367" y="80" textAnchor="middle">STREAMING</text>
              <text x="596" y="80" textAnchor="middle">DOWNLOAD</text>
            </g>
            <g stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 4" className="text-ink/25">
              <line x1="125" y1="64" x2="125" y2="118" />
              <line x1="367" y1="64" x2="367" y2="118" />
              <line x1="596" y1="64" x2="596" y2="118" />
            </g>
            <line x1="30" y1="118" x2="690" y2="118" stroke="currentColor" strokeWidth="1.5" className="text-ink/40" />
            <text x="30" y="106" fill="currentColor" className="text-ink-soft" style={{ fontSize: 10, letterSpacing: "0.15em" }}>STREET LEVEL</text>
            <g stroke="currentColor" strokeWidth="1.3" className="text-loop/70">
              <line x1="125" y1="118" x2="125" y2="168" />
              <line x1="367" y1="118" x2="367" y2="168" />
              <line x1="596" y1="118" x2="596" y2="168" />
            </g>
            <line x1="30" y1="168" x2="690" y2="168" stroke="currentColor" strokeWidth="2" className="text-loop" />
            <circle cx="367" cy="168" r="5.5" className="fill-loop" />
            <circle cx="367" cy="168" r="10.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-loop/35" />
            <text x="30" y="194" fill="currentColor" className="text-ink-soft" style={{ fontSize: 10, letterSpacing: "0.15em" }}>THE FIBREHOOD LAYER</text>
          </svg>
        </div>
      </Reveal>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="difference" className="relative bg-fog py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                <span className="h-px w-8 bg-loop" /> The Fibrehood Difference
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display max-w-lg text-3xl font-bold leading-[1.15] text-ink sm:text-5xl">
                We build the road. The best service gets to use it.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-ink-soft">
                <p>Fibrehood separates the network from the service.</p>
                <p>
                  Our infrastructure is designed to allow multiple service providers to access the same network, giving
                  customers greater freedom to choose the service that works for them.
                </p>
                <p>It also means the physical network does not need to be repeatedly rebuilt every time a service changes.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-ink/10 bg-paper p-8 shadow-signal sm:p-10">
              <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
                <Model title="Traditional model">
                  <Node label="Provider" />
                  <Connector />
                  <Node label="Infrastructure" />
                  <Connector />
                  <Node label="Customer" filled />
                </Model>
                <Model title="Fibrehood model" amber>
                  <Node label="Fibrehood Infrastructure" amber />
                  <svg width="100%" height="34" viewBox="0 0 200 34" className="my-1">
                    <path d="M100,0 L30,34" stroke="#FFCC00" strokeWidth="1.5" fill="none" />
                    <path d="M100,0 L100,34" stroke="#FFCC00" strokeWidth="1.5" fill="none" />
                    <path d="M100,0 L170,34" stroke="#FFCC00" strokeWidth="1.5" fill="none" />
                  </svg>
                  <div className="grid w-full grid-cols-3 gap-2">
                    <Node label="Provider A" small />
                    <Node label="Provider B" small />
                    <Node label="Provider C" small />
                  </div>
                  <svg width="100%" height="24" viewBox="0 0 200 24" className="my-1">
                    <path d="M30,0 L100,24" stroke="#0B1B2A" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M100,0 L100,24" stroke="#0B1B2A" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M170,0 L100,24" stroke="#0B1B2A" strokeWidth="1" fill="none" opacity="0.3" />
                  </svg>
                  <Node label="Customer" filled />
                </Model>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Model({ title, children }) {
  return (
    <div>
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{title}</p>
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

function Node({ label, filled, amber, small }) {
  return (
    <div
      className={`w-full rounded-lg border text-center font-medium ${
        small ? "px-1.5 py-2 text-[10px]" : "px-4 py-3 text-xs"
      } ${amber ? "border-loop bg-loop text-ink" : filled ? "border-ink bg-ink text-paper" : "border-ink/15 bg-fog text-ink"}`}
    >
      {label}
    </div>
  );
}

function Connector() {
  return <div className="h-6 w-px bg-ink/15" />;
}

function PeopleSection() {
  const [showPeopleNetwork, setShowPeopleNetwork] = useState(false);
  const collageRef = useRef(null);

  const handleDiscover = () => {
    setShowPeopleNetwork(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        collageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
  };

  return (
    <section id="people" className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                <span className="h-px w-8 bg-loop" /> People Make The Network
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display max-w-lg text-3xl font-bold leading-[1.15] text-ink sm:text-5xl">
                Great infrastructure doesn&rsquo;t happen by accident.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-ink-soft">
                <p>It takes planners, engineers, technicians, project teams and people who care about getting the details right.</p>
                <p>
                  From network design and deployment to commissioning, operation and maintenance, Fibrehood brings together
                  the expertise required to turn a plan into infrastructure people can rely on.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <button
                onClick={handleDiscover}
                className="group mt-auto inline-flex items-center gap-3 pt-12 text-ink-soft"
                aria-expanded={showPeopleNetwork}
                aria-controls="people-network-collage"
              >
                <span className="h-px w-8 bg-ink-soft/40 transition-all duration-300 group-hover:w-12" />
                <span className="text-[13px] font-medium tracking-[0.08em]">Discover more</span>
              </button>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.15} className="col-span-2">
              <ImageTile src="/images/engineer-field.jpg" alt="Technician splicing fibre cables in the field at night" className="h-64 sm:h-72" />
            </Reveal>
            <Reveal delay={0.25}>
              <ImageTile src="/images/installation-closeup.jpg" alt="Close-up of fibre optic cable strands" className="h-44" />
            </Reveal>
            <Reveal delay={0.35}>
              <ImageTile src="/images/team-plans.jpg" alt="Engineers reviewing network infrastructure plans" className="h-44" />
            </Reveal>
          </div>
        </div>

        {showPeopleNetwork && (
          <div id="people-network-collage" ref={collageRef} className="mt-16 scroll-mt-24">
            <PeopleNetworkCollage />
          </div>
        )}
      </div>
    </section>
  );
}

function ImageTile({ src, alt, className }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${className}`}
      />
      <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
    </div>
  );
}

function BeliefSection() {
  return (
    <section className="relative overflow-hidden bg-bone-50 py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <span className="font-display text-6xl text-amber-500/50">&ldquo;</span>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-display text-2xl leading-[1.3] text-navy-950 sm:text-4xl">
            Inclusive and affordable access enables ordinary people to achieve extraordinary things.
          </blockquote>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">That is why we build.</p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-8 space-y-2 text-lg text-navy-700/90">
            <p>Not just for faster downloads.</p>
            <p>Not just for another connection.</p>
            <p>But for the student learning from home.</p>
            <p>The entrepreneur building a business.</p>
            <p>The family staying connected.</p>
            <p>The team working across borders.</p>
            <p>The next idea that hasn&rsquo;t been imagined yet.</p>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="font-display mt-10 text-xl text-navy-950 sm:text-2xl">Infrastructure changes what people can do.</p>
        </Reveal>
      </div>
    </section>
  );
}

function TodaySection() {
  return (
    <section className="relative bg-signal-deep py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
                <span className="h-px w-8 bg-loop" /> Today
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display max-w-lg text-3xl font-bold leading-[1.15] text-paper sm:text-5xl">
                The network keeps growing. So does the opportunity.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-paper/75">
                <p>As communities become increasingly connected, the infrastructure beneath them matters more than ever.</p>
                <p>
                  Fibrehood continues to build networks designed around accessibility, flexibility and long-term value
                  &mdash; creating stronger digital foundations for the places people live and work.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-paper/10">
              <img src="/images/community-coverage.jpg" alt="Aerial view of a connected neighbourhood at dusk" className="h-80 w-full object-cover sm:h-96" />
              <div className="absolute inset-0">
                {DOTS.map(([top, left], i) => (
                  <span
                    key={i}
                    className="pulse-glow absolute h-2.5 w-2.5 rounded-full bg-loop shadow-[0_0_12px_4px_rgba(255,204,0,0.6)]"
                    style={{ top, left, animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FutureSection() {
  return (
    <section id="future" className="relative overflow-hidden bg-signal-deep py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_center,rgba(255,204,0,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
            <span className="h-px w-8 bg-loop" /> What&rsquo;s Next
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-bold leading-[1.2] text-paper sm:text-5xl">
            We&rsquo;re not building for the next connection. We&rsquo;re building for everything after it.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-paper/70">
            Technology changes quickly. The infrastructure beneath it shouldn&rsquo;t have to. That&rsquo;s why Fibrehood
            builds with the future in mind &mdash; creating networks capable of supporting the evolving ways people live,
            work, communicate and connect.
          </p>
        </Reveal>
      </div>
      <div className="relative mx-auto mt-16 h-[320px] max-w-4xl px-6 sm:h-[360px]">
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-loop pulse-glow shadow-[0_0_30px_10px_rgba(255,204,0,0.35)]" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-loop/20 sm:h-56 sm:w-56" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-loop/10 sm:h-80 sm:w-80" />
        {SIGNALS.map(([label, pos], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`absolute ${pos}`}
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block rounded-full border border-loop/40 bg-signal-deep/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-loop backdrop-blur-sm"
            >
              {label}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="relative mx-auto mt-6 max-w-md px-6 text-center text-xs text-paper/40">
          Examples of the kinds of technology that resilient infrastructure can enable &mdash; not a list of current
          Fibrehood services.
        </p>
      </Reveal>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="final" className="relative overflow-hidden bg-signal-deep py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,204,0,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-loop">
            <span className="h-px w-8 bg-loop" /> Discover Fibrehood
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.2] text-paper sm:text-5xl">
            Wherever connection takes you, it starts with the network.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/coverage"
              className="inline-flex items-center gap-2 rounded-full bg-loop px-7 py-3 text-sm font-semibold text-signal transition-transform hover:-translate-y-0.5"
            >
              Check your coverage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-sm font-semibold text-paper underline decoration-loop/60 underline-offset-8 transition-colors hover:text-loop"
            >
              Explore our services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutDevelopmentSections() {
  return (
    <>
      <OpeningStatement />
      <DifferenceSection />
      <UnderSurface />
      <PeopleSection />
      <BeliefSection />
      <TodaySection />
      <FutureSection />
      <FinalCTA />
    </>
  );
}

export default AboutDevelopmentSections;
