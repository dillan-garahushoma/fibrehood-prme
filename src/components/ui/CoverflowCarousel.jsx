import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FIBRE_PRICING } from "@/data/fibrePricing";
import PricingCard from "@/components/pricing/PricingCard";

// FibreHood brand tokens
const NAVY = "#072248";
const PAPER = "#F7F9FB";
const ACCENT = "#FFCC00";

export function CoverFlowCarousel({
  items = FIBRE_PRICING,
  sectionLabel = "FIBREHOOD FIBRE PLANS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(1); // start on featured Smart card
  const [isHovered, setIsHovered] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  const touchStartX = useRef(0);
  const total = items.length;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Responsive stage metrics — card keeps its proportions, offsets scale with viewport.
  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;
  const cardW = isMobile ? Math.min(300, vw - 56) : isTablet ? 310 : 330;
  const cardH = isMobile ? 500 : isTablet ? 510 : 520;
  const near = isMobile ? Math.round(cardW * 0.62) : isTablet ? 230 : 285;
  const far = isMobile ? Math.round(cardW * 1.05) : isTablet ? 410 : 510;

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
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{ backgroundColor: PAPER, color: NAVY, fontFamily: "inherit" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Light premium background with subtle network motif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-grid"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255,204,0,0.08) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F7F9FB 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(7,34,72,0.05) 0%, transparent 65%)",
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
                color: NAVY,
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
          className="relative w-full flex justify-center items-center mb-8"
          style={{ perspective: "1400px", height: `${cardH + 20}px` }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;
            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.85) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = `translateX(${near}px) scale(0.84) rotateY(-24deg)`;
              opacity = isMobile ? 0.55 : 0.92;
              zIndex = 20;
              filter = "blur(3px) brightness(0.97)";
            } else if (offset === 2) {
              transform = `translateX(${far}px) scale(0.68) rotateY(-38deg)`;
              opacity = isMobile ? 0 : 0.7;
              zIndex = 10;
              filter = "blur(7px) brightness(0.94)";
            } else if (offset === total - 1) {
              transform = `translateX(-${near}px) scale(0.84) rotateY(24deg)`;
              opacity = isMobile ? 0.55 : 0.92;
              zIndex = 20;
              filter = "blur(3px) brightness(0.97)";
            } else if (offset === total - 2) {
              transform = `translateX(-${far}px) scale(0.68) rotateY(38deg)`;
              opacity = isMobile ? 0 : 0.7;
              zIndex = 10;
              filter = "blur(7px) brightness(0.94)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 1050ms cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <PricingCard item={item} isCenter={isCenter} onCtaClick={onCtaClick} />
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
            left: isMobile ? "2px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "40px" : "46px",
            height: isMobile ? "40px" : "46px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: `1px solid rgba(7,34,72,0.12)`,
            color: NAVY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(7,34,72,0.12)",
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
            right: isMobile ? "2px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: isMobile ? "40px" : "46px",
            height: isMobile ? "40px" : "46px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: `1px solid rgba(7,34,72,0.12)`,
            color: NAVY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(7,34,72,0.12)",
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
                backgroundColor: idx === currentIndex ? ACCENT : "rgba(7,34,72,0.2)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(255,204,0,0.5)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoverFlowCarousel;