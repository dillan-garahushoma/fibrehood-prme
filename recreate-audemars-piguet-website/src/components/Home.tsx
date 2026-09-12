type HomeProps = {
  onDiscoverMore: () => void;
};

export default function Home({ onDiscoverMore }: HomeProps) {
  return (
    <main className="bg-white text-black">
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
          <div className="lg:w-1/2 w-full">
            <div className="w-full aspect-[4/5] lg:aspect-auto lg:h-[720px] overflow-hidden bg-neutral-100">
              <img
                src="/images/watchmaker-hero.jpg"
                alt="Watchmaker assembling a timepiece under a loupe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-1/2 w-full flex flex-col justify-center py-4 lg:py-0 lg:pl-8">
            <h1
              className="leading-[1.05] mb-8"
              style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
            >
              <span className="block text-4xl md:text-6xl tracking-wide">EXPLORE OUR</span>
              <span className="block text-4xl md:text-6xl italic mt-1">MASTERCLASSES</span>
            </h1>

            <p className="text-[15px] md:text-base leading-relaxed max-w-md text-neutral-900">
              Decode the secrets of Haute Horlogerie and step into the world of
              Audemars Piguet by joining one of our masterclasses. You will
              have the rare opportunity to experience our craft firsthand by
              practising decorative techniques and assembling components from
              our collections.
              <br className="hidden md:block" />
              Book your place now for one of our upcoming watchmaking
              experiences.
            </p>

            <button
              onClick={onDiscoverMore}
              className="group inline-flex items-center gap-3 mt-10 w-fit"
            >
              <span className="h-px w-8 bg-black transition-all duration-300 group-hover:w-12" />
              <span className="text-[13px] tracking-[0.08em] font-medium">
                Discover more
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
