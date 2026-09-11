import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import PeopleNetworkCollage from "@/components/about/PeopleNetworkCollage";

const STORY_STEPS = [
  ["IDEA", "01 — The idea", "Connectivity should give people options, not limitations."],
  ["BUILD", "02 — The infrastructure", "Build once. Build properly. Build for the long term."],
  ["CONNECT", "03 — The community", "Bring fibre closer to the people and places that depend on it."],
  ["EXPAND", "04 — The future", "Create infrastructure capable of supporting the technologies that come next."],
  ["WHAT'S NEXT", "05 — Still building", "The story isn't finished. Every neighbourhood we reach adds to it."]
];

const FLOW = ["Street network", "Access build", "Distribution point", "Building", "Individual unit", "Customer"];

const STATS = [
  { value: 10, suffix: "+", label: "Years of fibre network experience" },
  { value: 5000, suffix: "+", label: "Homes & businesses connected" },
  { value: 100, suffix: "%", label: "Built around fibre infrastructure" }
];

const SIGNALS = [
  ["5G", "top-[8%] left-[12%]"],
  ["IoT", "top-[18%] right-[15%]"],
  ["Smart Homes", "top-[48%] left-[4%]"],
  ["Cloud", "top-[55%] right-[6%]"],
  ["AI", "bottom-[14%] left-[20%]"],
  ["Digital Workplaces", "bottom-[8%] right-[18%]"]
];

const DOTS = [
  ["22%", "30%"],
  ["40%", "58%"],
  ["60%", "22%"],
  ["70%", "68%"],
  ["35%", "80%"],
  ["50%", "45%"]
];

function OpeningStatement() {
  return (
    <section className="relative overflow-hidden bg-bone-50 py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            <span className="h-px w-8 bg-amber-600" /> More Than Fibre
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display max-w-3xl text-3xl leading-[1.15] text-navy-950 sm:text-5xl">
            The internet is only as good as the network behind it.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-navy-700/90">
            <p>Every connection begins somewhere.</p>
            <p>Behind every video call, stream, download, business meeting and late-night scroll is an infrastructure layer most people never see.</p>
            <p>That is where FibreHood comes in.</p>
            <p>We design, deploy and operate fibre infrastructure that gives communities a stronger foundation for everything digital today &mdash; and everything coming next.</p>
          </div>
        </Reveal>
      </div>
      <div className="relative mt-20 select-none overflow-hidden">
        <div className="relative mx-auto w-full">
          <h3 className="font-display whitespace-nowrap text-center text-[16vw] font-medium leading-none text-navy-950/[0.06] lg:text-[13vw]">CONNECTION</h3>
          <motion.div
            className="absolute top-1/2 h-[3px] w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            initial={{ left: "-10%" }}
            whileInView={{ left: "110%" }}
            viewport={{ once: true }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

function StoryTimeline() {
  return (
    <section id="story" className="relative bg-navy-950 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal><p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400"><span className="h-px w-8 bg-amber-500" /> Our Story</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display max-w-3xl text-3xl leading-[1.15] text-bone-50 sm:text-5xl">Built around one simple idea: better infrastructure creates better choices.</h2></Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-bone-100/75">
            <p>FibreHood was built around a different approach to connectivity. Instead of tying the network to a single service provider, FibreHood builds the infrastructure as an open platform &mdash; allowing service providers to compete over a shared network while the infrastructure remains in place.</p>
            <p className="text-amber-400/90">The result is a simpler idea with a powerful effect: more choice, more flexibility and a network built for the long term.</p>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-10">
        <div className="scrollbar-none -mx-6 flex gap-6 overflow-x-auto px-6 pb-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
          {STORY_STEPS.map(([tag, title, copy], i) => (
            <Reveal key={tag} delay={i * 0.08} className="min-w-[240px] flex-1 lg:min-w-0">
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800/50 p-6 transition-colors hover:border-amber-500/40">
                <div className="mb-6 flex items-center justify-between"><span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">{tag}</span><span className="h-2 w-2 rounded-full bg-amber-500/70 transition-transform group-hover:scale-150" /></div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-bone-50">{title}</h4>
                <p className="text-sm leading-relaxed text-bone-100/70">{copy}</p>
                {i < STORY_STEPS.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-amber-500/60 to-transparent lg:block" />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="difference" className="relative bg-bone-50 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal><p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600"><span className="h-px w-8 bg-amber-600" /> The FibreHood Difference</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display max-w-lg text-3xl leading-[1.15] text-navy-950 sm:text-5xl">We build the road. The best service gets to use it.</h2></Reveal>
            <Reveal delay={0.2}><div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-navy-700/90"><p>FibreHood separates the network from the service.</p><p>Our infrastructure is designed to allow multiple service providers to access the same network, giving customers greater freedom to choose the service that works for them.</p><p>It also means the physical network does not need to be repeatedly rebuilt every time a service changes.</p></div></Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-navy-950/10 bg-white p-8 shadow-xl shadow-navy-950/5 sm:p-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <Model title="Traditional model"><Node label="Provider" /><Connector /><Node label="Infrastructure" /><Connector /><Node label="Customer" filled /></Model>
                <Model title="FibreHood model" amber><Node label="FibreHood Infrastructure" amber /><svg width="100%" height="34" viewBox="0 0 200 34" className="my-1"><path d="M100,0 L30,34" stroke="#eda23a" strokeWidth="1.5" fill="none" /><path d="M100,0 L100,34" stroke="#eda23a" strokeWidth="1.5" fill="none" /><path d="M100,0 L170,34" stroke="#eda23a" strokeWidth="1.5" fill="none" /></svg><div className="grid w-full grid-cols-3 gap-2"><Node label="Provider A" small /><Node label="Provider B" small /><Node label="Provider C" small /></div><svg width="100%" height="24" viewBox="0 0 200 24" className="my-1"><path d="M30,0 L100,24" stroke="#0f1626" strokeWidth="1" fill="none" opacity="0.3" /><path d="M100,0 L100,24" stroke="#0f1626" strokeWidth="1" fill="none" opacity="0.3" /><path d="M170,0 L100,24" stroke="#0f1626" strokeWidth="1" fill="none" opacity="0.3" /></svg><Node label="Customer" filled /></Model>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Model({ title, amber, children }) {
  return <div><p className={`mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] ${amber ? "text-amber-600" : "text-navy-500"}`}>{title}</p><div className="flex flex-col items-center">{children}</div></div>;
}

function Node({ label, filled, amber, small }) {
  return <div className={`w-full rounded-lg border text-center font-medium ${small ? "px-1.5 py-2 text-[10px]" : "px-4 py-3 text-xs"} ${amber ? "border-amber-500 bg-amber-500 text-navy-950" : filled ? "border-navy-950 bg-navy-950 text-bone-50" : "border-navy-950/20 bg-bone-50 text-navy-800"}`}>{label}</div>;
}

function Connector() {
  return <div className="h-6 w-px bg-navy-950/20" />;
}

function NetworkSection() {
  const cards = [["Built for today", "Fast fibre connectivity."], ["Designed for tomorrow", "Infrastructure capable of supporting future ICT services."], ["Made to scale", "A shared network designed to support multiple services and providers."]];
  return (
    <section id="network" className="relative overflow-hidden bg-navy-950 py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#f3b45c_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal><p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400"><span className="h-px w-8 bg-amber-500" /> Under The Surface</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display max-w-2xl text-3xl leading-[1.15] text-bone-50 sm:text-5xl">A lot goes into making “connected” feel effortless.</h2></Reveal>
        <div className="mt-20 scrollbar-none -mx-6 flex items-stretch gap-3 overflow-x-auto px-6 pb-4 lg:mx-0 lg:justify-between lg:gap-2 lg:overflow-visible lg:px-0">
          {FLOW.map((step, i) => <Reveal key={step} delay={i * 0.08} className="flex min-w-[150px] flex-1 items-center gap-2 lg:min-w-0"><div className="flex h-32 flex-1 flex-col justify-between rounded-xl border border-white/10 bg-navy-800/60 p-4"><span className="font-display text-lg text-amber-400/80">0{i + 1}</span><span className="text-sm font-medium text-bone-50">{step}</span></div>{i < FLOW.length - 1 && <svg width="28" height="2" className="hidden shrink-0 lg:block"><line x1="0" y1="1" x2="28" y2="1" stroke="#f3b45c" strokeWidth="1.5" className="fibre-line" /></svg>}</Reveal>)}
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">{cards.map(([title, copy], i) => <Reveal key={title} delay={0.1 + i * 0.1}><div className="h-full rounded-2xl border border-amber-500/20 bg-gradient-to-b from-navy-800/80 to-navy-900/40 p-7 shadow-lg shadow-navy-950/40"><h4 className="font-display mb-3 text-lg text-amber-400">{title}</h4><p className="text-sm leading-relaxed text-bone-100/75">{copy}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}

function PeopleSection() {
  const [showPeopleNetwork, setShowPeopleNetwork] = useState(false);

  return (
    <section id="people" className="relative bg-bone-50 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal><p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600"><span className="h-px w-8 bg-amber-600" /> People Make The Network</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display max-w-lg text-3xl leading-[1.15] text-navy-950 sm:text-5xl">Great infrastructure doesn&rsquo;t happen by accident.</h2></Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-navy-700/90">
                <p>It takes planners, engineers, technicians, project teams and people who care about getting the details right.</p>
                <p>From network design and deployment to commissioning, operation and maintenance, FibreHood brings together the expertise required to turn a plan into infrastructure people can rely on.</p>
                <button
                  onClick={() => setShowPeopleNetwork((visible) => !visible)}
                  className="group mt-6 inline-flex items-center gap-3 text-navy-950"
                  aria-expanded={showPeopleNetwork}
                  aria-controls="people-network-collage"
                >
                  <span className="h-px w-8 bg-black transition-all duration-300 group-hover:w-12" />
                  <span className="text-[13px] font-medium tracking-[0.08em]">Discover more</span>
                </button>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4"><Reveal delay={0.15} className="col-span-2"><ImageTile src="/images/engineer-field.jpg" alt="Technician splicing fibre cables in the field at night" className="h-64 sm:h-72" /></Reveal><Reveal delay={0.25}><ImageTile src="/images/installation-closeup.jpg" alt="Close-up of fibre optic cable strands" className="h-44" /></Reveal><Reveal delay={0.35}><ImageTile src="/images/team-plans.jpg" alt="Engineers reviewing network infrastructure plans" className="h-44" /></Reveal></div>
        </div>
        {showPeopleNetwork && <div id="people-network-collage" className="mt-14"><PeopleNetworkCollage /></div>}
      </div>
    </section>
  );
}

function ImageTile({ src, alt, className }) {
  return <div className="group relative overflow-hidden rounded-2xl"><img src={src} alt={alt} className={`w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${className}`} /><div className="absolute inset-0 bg-navy-950/10 mix-blend-multiply" /></div>;
}

function NumbersSection() {
  return <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36"><div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" /><div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" /><div className="relative mx-auto max-w-6xl px-6 lg:px-10"><div className="grid gap-14 sm:grid-cols-3 sm:gap-8">{STATS.map((s, i) => <Reveal key={s.label} delay={i * 0.12} className="text-center sm:text-left"><div className="font-display text-6xl text-amber-400 sm:text-7xl"><CountUp to={s.value} suffix={s.suffix} /></div><p className="mt-4 text-sm uppercase tracking-wide text-bone-100/70">{s.label}</p></Reveal>)}</div><Reveal delay={0.4}><p className="mt-16 text-center text-xs text-bone-100/40">* Figures reflect FibreHood&rsquo;s published company material at time of writing.</p></Reveal></div></section>;
}

function CountUp({ to, suffix = "" }) {
  return <span>{to.toLocaleString()}{suffix}</span>;
}

function BeliefSection() {
  return <section className="relative overflow-hidden bg-bone-50 py-28 lg:py-40"><div className="mx-auto max-w-4xl px-6 text-center lg:px-10"><Reveal><span className="font-display text-6xl text-amber-500/50">&ldquo;</span></Reveal><Reveal delay={0.1}><blockquote className="font-display text-2xl leading-[1.3] text-navy-950 sm:text-4xl">Inclusive and affordable access enables ordinary people to achieve extraordinary things.</blockquote></Reveal><Reveal delay={0.25}><p className="mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">That is why we build.</p></Reveal><Reveal delay={0.35}><div className="mt-8 space-y-2 text-lg text-navy-700/90"><p>Not just for faster downloads.</p><p>Not just for another connection.</p><p>But for the student learning from home.</p><p>The entrepreneur building a business.</p><p>The family staying connected.</p><p>The team working across borders.</p><p>The next idea that hasn&rsquo;t been imagined yet.</p></div></Reveal><Reveal delay={0.45}><p className="font-display mt-10 text-xl text-navy-950 sm:text-2xl">Infrastructure changes what people can do.</p></Reveal></div></section>;
}

function TodaySection() {
  return <section className="relative bg-navy-950 py-28 lg:py-36"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16"><div><Reveal><p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400"><span className="h-px w-8 bg-amber-500" /> Today</p></Reveal><Reveal delay={0.1}><h2 className="font-display max-w-lg text-3xl leading-[1.15] text-bone-50 sm:text-5xl">The network keeps growing. So does the opportunity.</h2></Reveal><Reveal delay={0.2}><div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-bone-100/75"><p>As communities become increasingly connected, the infrastructure beneath them matters more than ever.</p><p>FibreHood continues to build networks designed around accessibility, flexibility and long-term value &mdash; creating stronger digital foundations for the places people live and work.</p></div></Reveal></div><Reveal delay={0.15}><div className="relative overflow-hidden rounded-2xl border border-white/10"><img src="/images/community-coverage.jpg" alt="Aerial view of a connected neighbourhood at dusk" className="h-80 w-full object-cover sm:h-96" /><div className="absolute inset-0">{DOTS.map(([top, left], i) => <span key={i} className="pulse-glow absolute h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_4px_rgba(243,180,92,0.6)]" style={{ top, left, animationDelay: `${i * 0.4}s` }} />)}</div><div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" /></div></Reveal></div></div></section>;
}

function FutureSection() {
  return <section id="future" className="relative overflow-hidden bg-navy-950 py-28 lg:py-40"><div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(ellipse_at_center,rgba(243,180,92,0.15),transparent_60%)]" /><div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"><Reveal><p className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400"><span className="h-px w-8 bg-amber-500" /> What&rsquo;s Next</p></Reveal><Reveal delay={0.1}><h2 className="font-display text-3xl leading-[1.2] text-bone-50 sm:text-5xl">We&rsquo;re not building for the next connection. We&rsquo;re building for everything after it.</h2></Reveal><Reveal delay={0.2}><p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-bone-100/70">Technology changes quickly. The infrastructure beneath it shouldn&rsquo;t have to. That&rsquo;s why FibreHood builds with the future in mind &mdash; creating networks capable of supporting the evolving ways people live, work, communicate and connect.</p></Reveal></div><div className="relative mx-auto mt-24 h-[340px] max-w-4xl px-6 sm:h-[380px]"><div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 pulse-glow shadow-[0_0_30px_10px_rgba(243,180,92,0.35)]" /><div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/20 sm:h-56 sm:w-56" /><div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/10 sm:h-80 sm:w-80" />{SIGNALS.map(([label, pos], i) => <motion.div key={label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className={`absolute ${pos}`}><motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} className="inline-block rounded-full border border-amber-500/40 bg-navy-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm">{label}</motion.span></motion.div>)}</div><Reveal delay={0.3}><p className="relative mx-auto mt-8 max-w-md px-6 text-center text-xs text-bone-100/40">Examples of the kinds of technology that resilient infrastructure can enable &mdash; not a list of current FibreHood services.</p></Reveal></section>;
}

function FinalCTA() {
  return <section id="final" className="relative overflow-hidden bg-navy-950 py-32 lg:py-44"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(243,180,92,0.18),transparent_55%)]" /><div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10"><Reveal><h2 className="font-display text-3xl leading-[1.2] text-bone-50 sm:text-5xl">Wherever connection takes you, it starts with the network.</h2></Reveal><Reveal delay={0.15}><p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Discover FibreHood.</p></Reveal><Reveal delay={0.25}><div className="mt-10 flex flex-wrap items-center justify-center gap-5"><Link to="/coverage" className="rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy-950 transition-transform hover:-translate-y-0.5 hover:bg-amber-400">Check your coverage →</Link><Link to="/plans" className="text-sm font-semibold uppercase tracking-wider text-bone-50 underline decoration-amber-500/60 underline-offset-8 transition-colors hover:text-amber-400">Explore our services →</Link></div></Reveal></div></section>;
}

export function AboutDevelopmentSections() {
  return <><OpeningStatement /><StoryTimeline /><DifferenceSection /><NetworkSection /><PeopleSection /><NumbersSection /><BeliefSection /><TodaySection /><FutureSection /><FinalCTA /></>;
}

export default AboutDevelopmentSections;
