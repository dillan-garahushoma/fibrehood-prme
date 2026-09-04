import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Gauge, Wifi } from "lucide-react";
import { ACCENTS } from "@/data/fibrePricing";

// FibreHood brand tokens
const NAVY = "#072248";
const NAVY_SOFT = "#3A5A85";
const GOLD = "#FFCC00";

function CtaButton({ item, featured, onCtaClick }) {
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
    padding: "11px 20px",
    borderRadius: "9999px",
    background: featured ? `linear-gradient(135deg, ${GOLD} 0%, #E0B400 100%)` : NAVY,
    color: featured ? NAVY : "#ffffff",
    fontSize: "0.7rem",
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    boxShadow: featured ? "0 6px 18px rgba(255,204,0,0.4)" : "0 6px 16px rgba(7,34,72,0.22)",
    cursor: "pointer",
    transition: "transform 200ms ease, box-shadow 200ms ease",
    width: "100%",
  };

  if (item.ctaUrl?.startsWith("/") && !onCtaClick) {
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
}

/**
 * Premium FibreHood pricing card.
 * Hierarchy: badge → speed icon → UP TO → speed → plan name → price → features → CTA.
 */
export function PricingCard({ item, isCenter, onCtaClick }) {
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
        border: featured ? `1.5px solid ${GOLD}` : "1px solid rgba(7,34,72,0.10)",
        boxShadow: featured
          ? `0 24px 60px rgba(7,34,72,0.18), 0 0 28px ${accent.glow}`
          : "0 16px 40px rgba(7,34,72,0.12)",
      }}
    >
      {/* Accent top band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: `linear-gradient(90deg, ${accent.hex}, ${featured ? GOLD : accent.hex})`,
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
        <div style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: "9999px",
              background: `linear-gradient(135deg, ${GOLD} 0%, #E0B400 100%)`,
              color: NAVY,
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
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
          padding: item.badge ? "46px 22px 22px" : "30px 22px 22px",
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
        {/* Speed / network icon */}
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
            flexShrink: 0,
          }}
        >
          {item.category === "home" ? (
            <Gauge size={22} strokeWidth={2.2} color={accent.hex} />
          ) : (
            <Wifi size={22} strokeWidth={2.2} color={accent.hex} />
          )}
        </div>

        {/* UP TO */}
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: NAVY_SOFT,
          }}
        >
          Up to
        </span>

        {/* Speed — the hero element */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "5px" }}>
          <span
            style={{
              fontSize: "clamp(3rem, 11vw, 3.6rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {item.speed}
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: NAVY_SOFT }}>{item.speedUnit}</span>
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
              whiteSpace: "nowrap",
            }}
          >
            {item.planName}
          </div>
          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: NAVY_SOFT, marginTop: "1px" }}>
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
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: NAVY_SOFT }}>{item.currency}</span>
          <span
            style={{
              fontSize: "1.9rem",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {item.price}
          </span>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: NAVY_SOFT }}>/{item.billingPeriod}</span>
        </div>

        {/* Description — secondary */}
        {item.description && (
          <p
            style={{
              fontSize: "0.7rem",
              color: NAVY_SOFT,
              lineHeight: 1.35,
              maxWidth: "250px",
              margin: "8px 0 10px",
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
          }}
        >
          {item.features.map((feat) => (
            <div key={feat} style={{ display: "flex", alignItems: "center", gap: "7px", width: "100%" }}>
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
          <CtaButton item={item} featured={featured} onCtaClick={onCtaClick} />
        </div>
      </div>
    </div>
  );
}

export default PricingCard;