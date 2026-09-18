import { NAVY, GOLD, Reveal } from "./aboutHooks";

export const BELIEF_ITEMS = [
  "students",
  "entrepreneurs",
  "families",
  "communities",
  "new ideas",
  "a brighter tomorrow",
];

export default function OurBelief({
  imageSrc = "/images/about/our-belief.jpg",
  imageAlt = "A young boy studying and writing with a laptop in an outdoor community setting",
}) {
  const resolvedSrc = imageSrc || "/images/about/our-belief.jpg";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-slate-100/80 shadow-sm lg:grid-cols-2">
          {/* Left: Hero photo filling full column height with modern hover zoom */}
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
            <img
              src={resolvedSrc}
              alt={imageAlt}
              onError={(e) => {
                if (e.currentTarget.src.indexOf("kid2.jpg") === -1) {
                  e.currentTarget.src = "/images/kid2.jpg";
                }
              }}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right: belief copy */}
          <div className="flex flex-col justify-center bg-white px-8 py-12 lg:px-14">
            {/* Eyebrow */}
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Our Belief
                </span>
                <span className="h-0.5 w-8" style={{ backgroundColor: GOLD }} aria-hidden="true" />
              </div>
            </Reveal>

            {/* Main heading */}
            <Reveal delay={0.08}>
              <h2
                className="mb-6 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
                style={{ color: NAVY }}
              >
                Access is more than a connection.{" "}
                <span style={{ color: GOLD }}>It is possibility</span>
              </h2>
            </Reveal>

            {/* For list */}
            <ul className="mb-8 space-y-2">
              {BELIEF_ITEMS.map((item, i) => (
                <Reveal as="li" key={item} delay={0.12 + i * 0.04} className="flex items-baseline gap-1.5 text-base text-slate-500">
                  <span className="font-normal">For</span>
                  <span className="font-bold" style={{ color: NAVY }}>{item}</span>
                </Reveal>
              ))}
            </ul>

            {/* Gold rule */}
            <Reveal delay={0.3}>
              <span
                className="mb-6 block h-1 w-10 rounded-full"
                style={{ backgroundColor: GOLD }}
                aria-hidden="true"
              />
            </Reveal>

            {/* Footer line */}
            <Reveal delay={0.35}>
              <p className="text-xl font-extrabold leading-snug sm:text-2xl" style={{ color: NAVY }}>
                Infrastructure changes<br />
                what people can do
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export { OurBelief };
