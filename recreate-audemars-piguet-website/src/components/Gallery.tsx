import { useState } from "react";

export default function Gallery() {
  const [playing, setPlaying] = useState(true);

  return (
    <main className="bg-black text-white">
      <section className="max-w-[1900px] mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-3 md:gap-4 md:h-[820px]">
          <div className="grid grid-rows-2 gap-3 md:gap-4 order-2 md:order-1">
            <div className="bg-neutral-100 overflow-hidden flex items-center justify-center">
              <img
                src="/images/watch-strap-blue.jpg"
                alt="Rose gold watch with blue strap"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-neutral-900 overflow-hidden flex items-center justify-center">
              <img
                src="/images/watch-repair-pliers.jpg"
                alt="Watchmaker holding a tourbillon movement with pliers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative bg-neutral-200 overflow-hidden order-1 md:order-2 min-h-[320px] md:min-h-0">
            <img
              src="/images/watch-center.jpg"
              alt="Audemars Piguet chronograph on the wrist"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setPlaying((p) => !p)}
              className="absolute bottom-4 right-4 h-8 w-8 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="4" width="5" height="16" />
                  <rect x="14" y="4" width="5" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>
          </div>

          <div className="grid grid-rows-2 gap-3 md:gap-4 order-3">
            <div className="bg-neutral-100 overflow-hidden flex items-center justify-center">
              <img
                src="/images/watch-movement.jpg"
                alt="Macro shot of a watch movement being adjusted"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-neutral-100 overflow-hidden flex items-center justify-center">
              <img
                src="/images/watch-gold.jpg"
                alt="Gold luxury watch"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
