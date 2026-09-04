import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Check, Gauge, Wifi } from "lucide-react";
import { FIBRE_PRICING, ACCENTS } from "@/data/fibrePricing";

// FibreHood brand tokens
const NAVY = "#072248";
const NAVY_SOFT = "#3A5A85";
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

  const CtaButton = ({ item, featured }) => {
    const inner = (
      <>
        <span>{item.ctaText || "Check availability"}</span>
        <ArrowRight size={13} strokeWidth={2.5} />
      </>
    );
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "9px 20px",
      borderRadius: "9999px",
      background: featured
        ? `linear-gradient(135deg, ${ACCENT} 0%, #E0B400 100%)`
        : NAVY,
      color: featured ? NAVY : "#ffffff",
      fontSize: "0.7rem",
      fontWeight: 800,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      textDecoration: "none",
      boxShadow: featured
        ? "0 6px 18px rgba(255,204,0,0.4)"
        : "0 6px 16px rgba(7,34,72,0.22)",
      cursor: "pointer",
      transition: "transform 200ms ease, box-shadow 200ms ease",
      width: "100%",
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

  const PricingCard = ({ item, isCenter }) => {
    const accent = ACCENTS[item.accent] || ACCENTS.gold;
    const featured = !!item.featured;

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: featured
            ? `1.5px solid ${ACCENT}`
            : `1px solid rgba(7,34,72,0.10)`,
          boxShadow: featured
            ? `0 24px 60px rgba(7,34,72,0.18), 0 0 28px ${accent.glow}`
            : "0 16px 40px rgba(7,34,72,0.12)",
        }}
      >
        {/* Subtle accent top band */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: `linear-gradient(90deg, ${accent.hex}, ${featured ? ACCENT : accent.hex})`,
          }}
        />

        {/* Faint network motif */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent.soft} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Badge */}
        {item.badge && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: "9999px",
                background: `linear-gradient(135deg, ${ACCENT} 0%, #E0B400 100%)`,
                color: NAVY,
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                boxShadow: "0 4px 12px rgba(255,204,0,0.35)",
              }}
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding: item.badge ? "44px 22px 22px" : "28px 22px 22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 4,
            opacity: isCenter ? 1 : 0,
            transform: isCenter ? "translateY(0px)" : "translateY(14px)",
            transition: "opacity 500ms ease, transform 500ms ease",
            pointerEvents: isCenter ? "auto" : "none",
          }}
        >
          {/* Speed icon */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: accent.soft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            {item.category === "home" ? (
              <Gauge size={22} strokeWidth={2.2} color={accent.hex} />
            ) : (
              <Wifi size={22} strokeWidth={2.2} color={accent.hex} />
            )}
          </div>

          {/* UP TO label */}
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: NAVY_SOFT,
              marginBottom: "2px",
            }}
          >
            Up to
          </span>

          {/* Speed — the hero */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: "5px",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontSize: "3.6rem",
                fontWeight: 900,
                color: NAVY,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              {item.speed}
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: NAVY_SOFT,
                letterSpacing: "0.02em",
              }}
            >
              {item.speedUnit}
            </span>
          </div>

          {/* Plan name */}
          <div style={{ marginTop: "8px" }}>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: NAVY,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {item.planName}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: NAVY_SOFT,
                letterSpacing: "0.02em",
                marginTop: "1px",
              }}
            >
              {item.planSubtitle}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "40px",
              height: "2px",
              background: accent.hex,
              borderRadius: "2px",
              margin: "12px 0 10px",
              opacity: 0.7,
            }}
          />

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: NAVY_SOFT,
                letterSpacing: "0.04em",
              }}
            >
              {item.currency}
            </span>
            <span
              style={{
                fontSize: "1.85rem",
                fontWeight: 900,
                color: NAVY,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {item.price}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: NAVY_SOFT,
              }}
            >
              /{item.billingPeriod}
            </span>
          </div>

          {/* Description */}
          {item.description && (
            <p
              style={{
                fontSize: "0.7rem",
                color: NAVY_SOFT,
                lineHeight: 1.35,
                maxWidth: "250px",
                margin: "8px 0 10px",
                fontStyle: "normal",
              }}
            >
              {item.description}
            </p>
          )}

          {/* Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-start",
              width: "100%",
              marginBottom: "14px",
              marginTop: "2px",
            }}
          >
            {item.features.map((feat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: accent.soft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={10} strokeWidth={3} color={accent.hex} />
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: NAVY,
                    textAlign: "left",
                    lineHeight: 1.2,
                  }}
                >
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "auto", width: "100%" }}>
            <CtaButton item={item} featured={featured} />
          </div>
        </div>
      </div>
    );
  };

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
          className="relative w-full h-[540px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
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
              transform = "translateX(285px) scale(0.84) rotateY(-24deg)";
              opacity = 0.7;
              zIndex = 20;
              filter = "brightness(0.96)";
            } else if (offset === 2) {
              transform = "translateX(510px) scale(0.68) rotateY(-38deg)";
              opacity = 0.4;
              zIndex = 10;
              filter = "brightness(0.92) blur(1px)";
            } else if (offset === total - 1) {
              transform = "translateX(-285px) scale(0.84) rotateY(24deg)";
              opacity = 0.7;
              zIndex = 20;
              filter = "brightness(0.96)";
            } else if (offset === total - 2) {
              transform = "translateX(-510px) scale(0.68) rotateY(38deg)";
              opacity = 0.4;
              zIndex = 10;
              filter = "brightness(0.92) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "520px",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <PricingCard item={item} isCenter={isCenter} />
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
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
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