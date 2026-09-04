import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
 * Hierarchy: plan name (header) → ideal-for → speed (anchor) → divider → price → inclusions → CTA.
 * Featured (Smart) card uses a warm glass-gradient surface + corner "Most Popular" pill.
 */
export function PricingCard({ item, isCenter, onCtaClick }) {
  const accent = ACCENTS[item.accent] || ACCENTS.gold;
  const featured = !!item.featured;
  const reduce = useReducedMotion();

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
          ? `1.5px solid ${GOLD}88`
          : `1px solid rgba(7,34,72,0.10)`,
        boxShadow: featured
          ? `0 0 0 1px ${GOLD}44, 0 26px 60px rgba(7,34,72,0.20), 0 0 30px ${GOLD}33`
          : "0 18px 44px rgba(7,34,72,0.13)",
      }}
    >
      {/* Featured warm glass-gradient surface */}
      {featured && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(165deg, #FFFFFF 0%, #FFFDF6 38%, #FFF7DE 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Faint radial gold glow behind the speed (featured only) */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: "30%",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD}1F 0%, transparent 68%)`,
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
          opacity: featured ? 0.5 : 0.3,
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
        <path d="M-10,95 C60,60 120,110 180,70 C240,35 300,90 350,55"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="1.2" />
        <path d="M-10,80 C70,110 140,55 210,95 C270,128 320,70 350,90"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="1" />
        <path d="M-10,105 C80,75 150,120 220,85 C280,56 310,100 350,80"
          fill="none" stroke={`url(#fibre-${item.id})`} strokeWidth="0.8" />
        {[[60,82],[130,96],[200,72],[270,98]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={accent.hex} opacity="0.5" />
        ))}
      </svg>

      {/* MOST POPULAR — frosted corner pill (featured only) */}
      {item.badge && featured && (
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 14, y: -6 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 6,
            overflow: "hidden",
            borderRadius: "0 24px 0 14px",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "8px 16px 8px 14px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,247,210,0.86) 100%)",
              backdropFilter: "blur(10px) saturate(150%)",
              WebkitBackdropFilter: "blur(10px) saturate(150%)",
              color: NAVY,
              fontSize: "0.56rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 16px rgba(255,204,0,0.28)",
              borderLeft: `1px solid ${GOLD}55`,
              borderBottom: `1px solid ${GOLD}55`,
            }}
          >
            {item.badge}
            {/* shimmer sheen */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Content — always visible, left-aligned editorial */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          padding: featured ? "26px 24px 22px" : "26px 24px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          zIndex: 4,
          pointerEvents: isCenter ? "auto" : "none",
        }}
      >
        {/* Plan name header lockup */}
        <div style={{ lineHeight: 1.1, width: "100%" }}>
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
              fontSize: "0.7rem",
              fontWeight: 500,
              color: NAVY_SOFT,
              marginTop: "3px",
              letterSpacing: "0.04em",
            }}
          >
            {item.planSubtitle}
          </div>
        </div>

        {/* UP TO eyebrow */}
        <span
          style={{
            marginTop: "18px",
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
            gap: "5px",
            marginTop: "2px",
          }}
        >
          <span
            style={{
              fontSize: "clamp(2.8rem, 13vw, 3.6rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
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

        {/* Ideal-for ladder */}
        {item.idealFor && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: NAVY_SOFT,
              lineHeight: 1.3,
            }}
          >
            {item.idealFor}
          </div>
        )}

        {/* Hairline divider */}
        <div
          style={{
            width: "38px",
            height: "2px",
            background: featured ? GOLD : accent.hex,
            borderRadius: "2px",
            margin: "14px 0 12px",
            opacity: featured ? 0.9 : 0.5,
          }}
        />

        {/* Price — clearly separated */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
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

        {/* Inclusions — the FibreHood benefits */}
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
    fontSize: "0.66rem",
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