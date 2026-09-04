import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Gauge, Wifi } from "lucide-react";
import { ACCENTS } from "@/data/fibrePricing";

// FibreHood brand tokens
const NAVY = "#072248";
const NAVY_SOFT = "#5A6B82";
const NAVY_FAINT = "#8A98AD";
const GOLD = "#FFCC00";
const GOLD_DEEP = "#E0B400";
const WHITE = "#FFFFFF";

/**
 * FibreHood "network tile" pricing card.
 * Hierarchy: icon → UP TO → speed (anchor) → plan name → divider → price → inclusions → CTA.
 * Content stays visible on every card; the carousel's depth-of-field blur handles focus.
 */
export function PricingCard({ item, isCenter, onCtaClick }) {
  const accent = ACCENTS[item.accent] || ACCENTS.gold;
  const featured = !!item.featured;
  const isHome = item.category === "home";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "26px",
        overflow: "hidden",
        backgroundColor: WHITE,
        border: featured
          ? `1.5px solid ${GOLD}`
          : `1px solid ${accent.hex}22`,
        boxShadow: featured
          ? `0 0 0 1px ${GOLD}55, 0 26px 60px rgba(7,34,72,0.20), 0 0 30px ${GOLD}40`
          : "0 18px 44px rgba(7,34,72,0.13)",
      }}
    >
      {/* Tier accent edge — extremely subtle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "4px",
          background: `linear-gradient(180deg, ${accent.hex}, ${accent.hex}11)`,
          opacity: featured ? 0.9 : 0.5,
        }}
      />

      {/* Faint radial gold glow behind the speed (featured only) */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD}22 0%, transparent 68%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Subtle fibre/network topology texture near the bottom */}
      <svg
        viewBox="0 0 330 120"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "110px",
          opacity: featured ? 0.5 : 0.32,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`fibre-${item.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accent.hex} stopOpacity="0" />
            <stop offset="50%" stopColor={accent.hex} stopOpacity="0.45" />
            <stop offset="100%" stopColor={accent.hex} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* flowing fibre strands */}
        <path d="M-10,95 C60,60 120,110 180,70 C240,35 300,90 350,55"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="1.2" />
        <path d="M-10,80 C70,110 140,55 210,95 C270,128 320,70 350,90"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="1" />
        <path d="M-10,105 C80,75 150,120 220,85 C280,56 310,100 350,80"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="0.8" />
        {/* nodes */}
        {[[60,82],[130,96],[200,72],[270,98]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={accent.hex} opacity="0.5" />
        ))}
      </svg>

      {/* MOST POPULAR gold tab (featured only) */}
      {item.badge && featured && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 6,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "0 0 10px 10px",
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
              color: NAVY,
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 14px rgba(255,204,0,0.35)",
            }}
          >
            {item.badge}
          </span>
        </div>
      )}

      {/* Content — always visible */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: featured ? "40px 26px 24px" : "30px 26px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 4,
          pointerEvents: isCenter ? "auto" : "none",
        }}
      >
        {/* Speedometer / network icon */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: `${accent.hex}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
            flexShrink: 0,
          }}
        >
          {isHome ? (
            <Gauge size={21} strokeWidth={2.2} color={accent.hex} />
          ) : (
            <Wifi size={21} strokeWidth={2.2} color={accent.hex} />
          )}
        </div>

        {/* UP TO eyebrow */}
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: NAVY_FAINT,
          }}
        >
          Up to
        </span>

        {/* Speed — the primary visual anchor */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "5px",
            marginTop: "2px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(2.8rem, 10vw, 3.5rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
            }}
          >
            {item.speed}
          </span>
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: NAVY_SOFT,
            }}
          >
            {item.speedUnit}
          </span>
        </div>

        {/* Plan name lockup — smaller, scannable */}
        <div style={{ marginTop: "10px", lineHeight: 1.1 }}>
          <div
            style={{
              fontSize: "0.92rem",
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {item.planName}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 500,
              color: NAVY_SOFT,
              marginTop: "2px",
            }}
          >
            {item.planSubtitle}
          </div>
        </div>

        {/* Hairline divider */}
        <div
          style={{
            width: "38px",
            height: "2px",
            background: featured ? GOLD : accent.hex,
            borderRadius: "2px",
            margin: "13px 0 11px",
            opacity: featured ? 0.9 : 0.55,
          }}
        />

        {/* Price — clearly separated */}
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
              fontSize: "0.7rem",
              fontWeight: 700,
              color: NAVY_SOFT,
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
              fontSize: "0.68rem",
              fontWeight: 600,
              color: NAVY_SOFT,
            }}
          >
            /{item.billingPeriod}
          </span>
        </div>

        {/* Inclusions — the 4 FibreHood benefits */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
            width: "100%",
            margin: "16px 0 14px",
          }}
        >
          {item.features.map((feat) => (
            <div
              key={feat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  background: `${accent.hex}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={9} strokeWidth={3.5} color={accent.hex} />
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

        {/* CTA — full width */}
        <div style={{ marginTop: "auto", width: "100%" }}>
          <CtaButton item={item} featured={featured} onCtaClick={onCtaClick} />
        </div>
      </div>
    </div>
  );
}

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
    padding: "11px 18px",
    borderRadius: "12px",
    background: featured
      ? `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`
      : NAVY,
    color: featured ? NAVY : WHITE,
    fontSize: "0.68rem",
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    boxShadow: featured
      ? "0 6px 18px rgba(255,204,0,0.38)"
      : "0 6px 16px rgba(7,34,72,0.22)",
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

export default PricingCard;