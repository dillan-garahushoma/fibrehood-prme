import { NAVY, GOLD, useInView, Reveal } from "./aboutHooks";

export default function MoreThanInternet({
  imageSrc = "/images/about/connectivity-banner.jpg",
  imageAlt = "A boy drawing at sunset outside his home",
}) {
  const [ref, isInView] = useInView(0.3);
  const resolvedSrc = imageSrc || "/images/about/connectivity-banner.jpg";

  return (
    <section className="bg-white pt-16 overflow-hidden">
      {/* Heading — left-aligned, site-scale sizing */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2
            className="mb-8 font-heading text-3xl font-bold leading-[1.15] tracking-tighter text-signal sm:text-4xl lg:text-[2.5rem]"
            style={{ color: NAVY }}
          >
            Connectivity is what makes possible
          </h2>
        </Reveal>
      </div>

      {/* Full-bleed image with bottom-left text overlay */}
      <div ref={ref} className="relative h-[60vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={resolvedSrc}
          alt={imageAlt}
          onError={(e) => {
            if (e.currentTarget.src.indexOf("kid1.jpg") === -1) {
              e.currentTarget.src = "/images/kid1.jpg";
            }
          }}
          className="h-full w-full object-cover"
          style={{
            animation: isInView ? "fh-slow-zoom 18s ease-in-out infinite alternate" : "none",
          }}
        />

        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Text pinned bottom-left */}
        <div className="absolute bottom-10 left-6 sm:bottom-16 sm:left-12 max-w-lg">
          <p
            className={`text-lg font-medium leading-relaxed text-white sm:text-xl transition-all duration-700 ease-out ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            It&apos;s never been about megabits.<br className="hidden sm:block" />
            It&apos;s about what people do with them &mdash;<br className="hidden sm:block" />
            and the doors that open when a neighbourhood comes online.
          </p>
          <span
            className="mt-5 block h-1 w-10 rounded-full"
            style={{ backgroundColor: GOLD }}
            aria-hidden="true"
          />
        </div>
      </div>

      <style>{`
        @keyframes fh-slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}

export { MoreThanInternet, MoreThanInternet as ConnectivityBanner };