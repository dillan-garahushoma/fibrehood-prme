import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeftRight,
  MessageCircle,
  Gauge,
  Check,
  Home,
  Building2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatSpeed } from "@/data/plans";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

export function PlanCard({ plan, selected = false, onToggle }) {
  const isBiz = plan.segment === "business";
  const isSymmetric = plan.download === plan.upload;
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-paper transition-all duration-300",
        plan.popular
          ? "border-loop shadow-loop"
          : "border-line hover:border-signal/40 hover:shadow-signal",
        selected && "ring-2 ring-loop"
      )}
    >
      {/* Most Popular — frosted corner pill matching the homepage carousel badge */}
      {plan.popular && (
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
            borderRadius: "0 18px 0 14px",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "7px 14px 7px 12px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,247,210,0.86) 100%)",
              backdropFilter: "blur(10px) saturate(150%)",
              WebkitBackdropFilter: "blur(10px) saturate(150%)",
              color: "#072248",
              fontSize: "0.56rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 16px rgba(255,204,0,0.28)",
              borderLeft: "1px solid rgba(255,204,0,0.33)",
              borderBottom: "1px solid rgba(255,204,0,0.33)",
            }}
          >
            Most popular
            {!reduce && (
              <motion.div
                aria-hidden="true"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: "easeInOut",
                }}
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

      <div className="p-5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            isBiz ? "bg-signal text-paper" : "bg-fog text-ink-soft"
          )}
        >
          {isBiz ? (
            <Building2 className="h-3.5 w-3.5" />
          ) : (
            <Home className="h-3.5 w-3.5" />
          )}
          {isBiz ? "SME" : "Home"}
        </span>

        <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-signal">
          {plan.name}
        </h3>

        {plan.usageLabel && (
          <p className="mt-1 text-sm text-ink-soft">{plan.usageLabel}</p>
        )}

        {/* Speed — symmetric plans show one number + tag; asymmetric show both */}
        {isSymmetric ? (
          <div className="mt-4 flex items-end gap-2">
            <span className="display-mono text-4xl font-bold leading-none text-ink">
              {formatSpeed(plan.download)}
            </span>
            <span className="mb-1 flex items-center gap-1 text-xs text-ink-soft">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              symmetric
            </span>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-end gap-2">
              <span className="display-mono text-4xl font-bold leading-none text-ink">
                {formatSpeed(plan.download)}
              </span>
              <span className="mb-1 text-xs text-ink-soft">down</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-soft">
              <Gauge className="h-4 w-4" />
              <span className="display-mono font-semibold text-ink">
                {formatSpeed(plan.upload)}
              </span>
              <span>upload</span>
            </div>
          </>
        )}

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-signal">
            ${plan.price}
          </span>
          <span className="text-sm text-ink-soft">/ {plan.cycle}</span>
        </div>
      </div>

      <div className="signal-divider mx-6" />

      {/* Plan-differentiating features only — section header covers the shared inclusions */}
      <div className="flex-1 p-5">
        {plan.features?.length > 0 && (
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-ink-soft"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTAs — checkbox compare + single primary action + quiet WhatsApp link */}
      <div className="p-5 pt-1">
        {onToggle && (
          <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(plan.id)}
              className="h-4 w-4 rounded border-line accent-signal"
            />
            Add to comparison
          </label>
        )}

        <Link
          to="/coverage"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep"
        >
          Check availability
          <ArrowRight className="h-4 w-4" />
        </Link>

        <a
          href={WA_INTENTS.plan(plan.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-ink-soft hover:text-signal"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Talk to us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default PlanCard;
