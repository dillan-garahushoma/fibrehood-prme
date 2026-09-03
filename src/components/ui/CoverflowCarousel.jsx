import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/images";

// Brand palette (inline-styled component)
const BG = "#071a33";        // deep signal navy
const CARD_BG = "#0f2240";   // card surface
const ACCENT = "#FFCC00";    // loop yellow
const ACCENT_DARK = "#E0B400";

export const FLAGSHIP_PLANS = [
  {
    tag: "#Entry-level",
    titleLine1: "STARTER HOME CONNECT",
    titleLine2: "UP TO 5 MBPS FIBRE",
    desc: "US$40/month — everyday connectivity for price-conscious homes.",
    img: IMAGES.fibreGlass,
    ctaText: "See plans",
    ctaUrl: "/plans",
  },
  {
    tag: "#Most popular",
    titleLine1: "SMART HOME CONNECT",
    titleLine2: "UP TO 15 MBPS FIBRE",
    desc: "US$50/month — the package most homes land on.",
    img: IMAGES.lightTrails,
    ctaText: "See plans",
    ctaUrl: "/plans",
  },
  {
    tag: "#Higher-performance",
    titleLine1: "PRO HOME CONNECT",
    titleLine2: "UP TO 30 MBPS FIBRE",
    desc: "US$65/month — built for higher-performance households.",
    img: IMAGES.fibreConstellation,
    ctaText: "See plans",
    ctaUrl: "/plans",
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

  const isInternal = (url) => url?.startsWith("/");

  const CtaButton = ({ item }) => {
    const inner = (
      <>
        <span>{item.ctaText || "See plans"}</span>
        <ArrowRight size={13} strokeWidth={2.5} />
      </>
    );
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "7px 18px",
      borderRadius: "9999px",
      background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
      color: "#0b1b2a",
      fontSize: "0.72rem",
      fontWeight: 800,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      textDecoration: "none",
      boxShadow: "0 4px 14px rgba(0,0,0,0.4), 0 0 15px rgba(255,204,0,0.3)",
      cursor: "pointer",
      transition: "transform 200ms ease, box-shadow 200ms ease",
    };
    if (isInternal(item.ctaUrl) && !onCtaClick) {
      return (
        <Link to={item.ctaUrl} style={baseStyle}>
          {inner}
        </Link>
      );
    }
    return (
      <a
        href={item.ctaUrl || "#"}
        onClick={(e) => {
          if (onCtaClick) {
            e.preventDefault();
            onCtaClick(item);
          }
        }}
        style={baseStyle}
      >
        {inner}
      </a>
    );
  };

  return (
    <section
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{ backgroundColor: BG, color: "#ffffff", fontFamily: "inherit" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={items[currentIndex]?.img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.22) blur(32px)",
            transform: "scale(1.15)",
            transition: "opacity 1000ms ease, filter 1000ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(7,26,51,0.3) 0%, rgba(7,26,51,0.92) 100%)`,
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
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;
            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === total - 1) {
              transform = "translateX(-285px) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = "translateX(-510px) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === 1) {
              transform = "translateX(285px) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = "translateX(510px) scale(0.68) rotateY(-38deg)";
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
                  width: "330px",
                  height: "500px",
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
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "20px 18px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.9)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      marginTop: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.65rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                        textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                      }}
                    >
                      {item.titleLine1}
                    </h2>
                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#f3f0ea",
                          lineHeight: 1.2,
                          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}
                    <div
                      style={{
                        width: "34px",
                        height: "2px",
                        backgroundColor: ACCENT,
                        borderRadius: "2px",
                        margin: "5px auto 4px",
                        boxShadow: "0 0 8px rgba(255,204,0,0.7)",
                      }}
                    />
                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: "0 0 10px",
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                    <CtaButton item={item} />
                  </div>
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