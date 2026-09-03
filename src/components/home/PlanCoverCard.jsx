import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const ACCENT = "#FFCC00";
const ACCENT_DARK = "#E0B400";

/**
 * A single plan card used inside the Flagship Plans coverflow.
 * Pure spec-sheet styling — no photography.
 */
export function PlanCoverCard({ plan, isCenter }) {
  const highlight = plan.featured;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "26px 24px 24px",
        display: "flex",
        flexDirection: "column",
        background: highlight
          ? "linear-gradient(165deg, #14315c 0%, #0b1f3c 55%, #081729 100%)"
          : "linear-gradient(165deg, #102a44 0%, #0b1c36 55%, #081628 100%)",
      }}
    >
      {/* top hairline */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: "2px",
          background: highlight
            ? `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
        }}
      />

      {/* Tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "5px 11px",
            borderRadius: "9999px",
            fontSize: "0.6rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: highlight ? "#0b1b2a" : "rgba(255,255,255,0.8)",
            backgroundColor: highlight ? ACCENT : "rgba(255,255,255,0.09)",
            border: highlight ? "none" : "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {plan.tag}
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {plan.index}
        </span>
      </div>

      {/* Name + speed */}
      <div style={{ marginTop: "26px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "1.32rem",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          {plan.name}
        </h2>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", marginTop: "12px" }}>
          <span
            style={{
              fontSize: "2.6rem",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: ACCENT,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {plan.speed}
          </span>
          <span
            style={{
              paddingBottom: "5px",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Mbps
          </span>
        </div>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {plan.blurb}
        </p>
      </div>

      {/* Features */}
      <ul
        style={{
          listStyle: "none",
          margin: "22px 0 0",
          padding: "20px 0 0",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "9px",
              fontSize: "0.78rem",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <Check size={13} strokeWidth={3} color={ACCENT} style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
          <span
            style={{
              fontSize: "1.9rem",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            US${plan.price}
          </span>
          <span style={{ paddingBottom: "3px", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
            /month
          </span>
        </div>
        <Link
          to="/plans"
          tabIndex={isCenter ? 0 : -1}
          style={{
            marginTop: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            width: "100%",
            padding: "11px 18px",
            borderRadius: "9999px",
            background: highlight
              ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`
              : "rgba(255,255,255,0.07)",
            border: highlight ? "none" : "1px solid rgba(255,255,255,0.28)",
            color: highlight ? "#0b1b2a" : "#ffffff",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          <span>Choose this plan</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

export default PlanCoverCard;