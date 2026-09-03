import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import PlanCoverCard from "@/components/home/PlanCoverCard";

// Brand palette (inline-styled component)
const BG = "#071a33";        // deep signal navy
const CARD_BG = "#0f2240";   // card surface
const ACCENT = "#FFCC00";    // loop yellow
const ACCENT_DARK = "#E0B400";

export const FLAGSHIP_PLANS = [
  {
    index: "01",
    tag: "Entry-level",
    name: "Starter Home Connect",
    speed: "5",
    price: 40,
    blurb: "Everything a smaller household needs, at a price that stays predictable.",
    features: [
      "Unlimited data, no fair-use throttling",
      "HD streaming plus everyday browsing",
      "Comfortable for 3–5 connected devices",
      "Wi-Fi router included on install",
    ],
  },
  {
    index: "02",
    tag: "Most popular",
    featured: true,
    name: "Smart Home Connect",
    speed: "15",
    price: 50,
    blurb: "The balance most homes settle on — enough headroom for the whole family at once.",
    features: [
      "Unlimited data, no fair-use throttling",
      "Multi-room streaming and video calls together",
      "Comfortable for 8–12 connected devices",
      "Wi-Fi router included plus priority support",
    ],
  },
  {
    index: "03",
    tag: "Higher performance",
    name: "Pro Home Connect",
    speed: "30",
    price: 65,
    blurb: "For busy, device-heavy homes where working, gaming and 4K all happen at once.",
    features: [
      "Unlimited data, no fair-use throttling",
      "4K streaming and low-latency gaming",
      "Comfortable for 15+ connected devices",
      "Wi-Fi router included plus priority support",
    ],
  },
];

export function CoverFlowCarousel({
  items = FLAGSHIP_PLANS,
  sectionLabel = "FLAGSHIP PLANS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => setCurrentIndex(idx % total);

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative w-full min-h-[860px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{ backgroundColor: BG, color: "#ffffff", fontFamily: "inherit" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 35%, rgba(20,49,92,0.9) 0%, rgba(7,26,51,0.96) 60%, rgba(5,18,36,1) 100%)`,
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: `linear-gradient(90deg, transparent, ${ACCENT})` }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
          </div>
        )}

        {/* 3D Coverflow stage */}
        <div
          className="relative w-full h-[580px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            // signed distance from the centre card, wrapped to the shortest way round
            let rel = (idx - currentIndex + total) % total;
            if (rel > total / 2) rel -= total;

            const dist = Math.abs(rel);
            const dir = rel > 0 ? 1 : -1;
            const isCenter = rel === 0;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";

            if (isCenter) {
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (dist === 1) {
              transform = `translateX(${dir * 285}px) scale(0.84) rotateY(${-dir * 24}deg)`;
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (dist === 2) {
              transform = `translateX(${dir * 510}px) scale(0.68) rotateY(${-dir * 38}deg)`;
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "340px",
                  height: "540px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: CARD_BG,
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? `0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(255,204,0,0.25)`
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <PlanCoverCard plan={item} isCenter={isCenter} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        {/* Pagination dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? ACCENT : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(255,204,0,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>

        {/* Ultra-Home upsell */}
        <div
          className="flex flex-col items-center gap-4 text-center"
          style={{ marginTop: "40px", zIndex: 30 }}
        >
          <div>
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>
              Need more speed?
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "1.15rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#ffffff",
              }}
            >
              Explore our 100 Mbps Ultra-Home plan.
            </p>
          </div>
          <Link
            to="/plans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 26px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 200ms ease",
            }}
          >
            <span>View All Fibre Plans</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CoverFlowCarousel;