import { useRef, useState } from "react";
import corporateImage from "@/components/collage/1490330fe_generated_image.png";
import healthcareImage from "@/components/collage/e400d5732_generated_image.png";
import coworkingImage from "@/components/collage/ad8018c58_generated_image.png";
import retailImage from "@/components/collage/e9ee6dd60_generated_image.png";
import networkVideo from "@/components/collage/konzept-fotografie-film-hd-auto-.mp4";

export default function PeopleNetworkCollage() {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying((current) => !current);
  };

  return (
    <div className="bg-black text-white">
      <section className="mx-auto max-w-[1900px] px-4 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_2fr_1fr] md:gap-4 md:h-[820px]">
          <div className="order-2 grid grid-rows-2 gap-3 md:order-1 md:gap-4">
            <div className="flex items-center justify-center overflow-hidden bg-neutral-100">
              <img
                src={corporateImage}
                alt="People working together in a connected office"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center overflow-hidden bg-neutral-900">
              <img
                src={healthcareImage}
                alt="Healthcare team supported by a connected network"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative order-1 min-h-[320px] overflow-hidden bg-neutral-200 md:order-2 md:min-h-0">
            <video
              ref={videoRef}
              src={networkVideo}
              className="h-full w-full object-cover"
              autoPlay={playing}
              muted
              loop
              playsInline
            />
            <button
              onClick={togglePlayback}
              className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center text-white/90 transition-colors hover:text-white"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="5" y="4" width="5" height="16" />
                  <rect x="14" y="4" width="5" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>
          </div>

          <div className="order-3 grid grid-rows-2 gap-3 md:gap-4">
            <div className="flex items-center justify-center overflow-hidden bg-neutral-100">
              <img
                src={coworkingImage}
                alt="Creative team collaborating in a studio"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center overflow-hidden bg-neutral-100">
              <img
                src={retailImage}
                alt="Retail team using a connected point-of-sale workspace"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
