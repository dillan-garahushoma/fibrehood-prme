import { useEffect, useRef, useState } from "react";
import { Users, Award } from "lucide-react";
import { NAVY, GOLD, Reveal } from "./aboutHooks";
import PeopleNetworkCollage from "./PeopleNetworkCollage";

export default function OurPeople({
  imageSrc = "/images/about/our-people.jpg",
  imageAlt = "The Fibrehood team standing together in front of their service vehicles",
  medalImageSrc,
}) {
  const [showCollage, setShowCollage] = useState(false);
  const collageRef = useRef(null);
  const resolvedSrc = imageSrc || "/images/about/our-people.jpg";

  useEffect(() => {
    if (!showCollage) return undefined;

    const frame = requestAnimationFrame(() => {
      collageRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [showCollage]);

  return (
    <section className="px-6 py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-8" style={{ backgroundColor: GOLD }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Our People</span>
          </div>
          <h2 className="mb-4 font-heading text-3xl font-bold leading-[1.15] tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            A team that builds possibilities
          </h2>
          <p className="mb-12 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-500">
            Our people are the driving force behind Fibrehood — engineers, technicians,
            customer champions and business enablers working together to connect
            communities and change lives.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          {/* Sized-down, well-proportioned image */}
          <Reveal delay={0.08} className="overflow-hidden rounded-2xl shadow-md">
            <button
              type="button"
              onClick={() => setShowCollage((visible) => !visible)}
              aria-expanded={showCollage}
              aria-controls={showCollage ? "our-people-collage" : undefined}
              aria-label={showCollage ? "Hide the Fibrehood team collage" : "Show the Fibrehood team collage"}
              className="group relative block h-full min-h-[300px] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#FFCC00]"
            >
              <img
                src={resolvedSrc}
                alt={imageAlt}
                onError={(e) => {
                  if (e.currentTarget.src.indexOf("collage-community-team.png") === -1) {
                    e.currentTarget.src = "/images/collage-community-team.png";
                  }
                }}
                className="h-full max-h-[480px] min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12 text-sm font-semibold text-white">
                {showCollage ? "Hide team collage" : "View team collage"}
              </span>
            </button>
          </Reveal>

          {/* Sized-up cards */}
          <div className="flex flex-col justify-between gap-6">
            <Reveal
              delay={0.12}
              className="flex-1 rounded-2xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: "#EFF3FA" }}
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: GOLD }}>
                <Users className="h-6 w-6" style={{ color: NAVY }} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="mb-1.5 text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
                +100 Years
              </p>
              <p className="mb-2.5 text-base sm:text-lg font-bold" style={{ color: NAVY }}>
                combined fibre network build expertise
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                A proven team with deep experience in planning, building and
                operating fibre networks across Zimbabwe and beyond.
              </p>
            </Reveal>

            <Reveal
              delay={0.18}
              className="flex-1 rounded-2xl p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: "#FFF8E1" }}
            >
              <div className="flex items-start gap-4">
                {medalImageSrc ? (
                  <img src={medalImageSrc} alt="ZITF Gold Medal 2024" className="h-16 w-16 shrink-0 object-contain" />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: GOLD }}>
                    <Award className="h-6 w-6" style={{ color: NAVY }} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                )}
                <div>
                  <p className="mb-2 text-xl sm:text-2xl font-extrabold" style={{ color: NAVY }}>
                    Gold Medal Award
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    Recognised for innovation and excellence in telecommunications at
                    the Zimbabwe International Trade Fair (ZITF) 2024.
                  </p>
                </div>
              </div>
              <span className="mt-5 block h-1 w-12 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden="true" />
            </Reveal>
          </div>
        </div>

        {showCollage && (
          <div
            id="our-people-collage"
            ref={collageRef}
            className="mt-10 scroll-mt-8 overflow-hidden rounded-2xl"
          >
            <PeopleNetworkCollage />
          </div>
        )}
      </div>
    </section>
  );
}

export { OurPeople };
