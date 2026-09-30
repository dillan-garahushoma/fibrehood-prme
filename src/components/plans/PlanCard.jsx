import React from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  MessageCircle,
  Check,
  Home,
  Building2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatSpeed } from "@/data/plans";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

export function PlanCard({ plan, selected = false, onToggle, onSelectPackage }) {
  const isBiz = plan.segment === "business";
  const isSymmetric = plan.download === plan.upload;
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-white/80 shadow-[0_18px_46px_-24px_rgba(7,34,72,0.3),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-all duration-300",
        plan.popular
          ? "border-loop/70 shadow-[0_20px_52px_-24px_rgba(7,34,72,0.32),0_0_24px_-16px_rgba(255,204,0,0.4),inset_0_1px_0_rgba(255,255,255,0.9)]"
          : "border-white/90 hover:border-signal/20 hover:shadow-[0_24px_54px_-24px_rgba(7,34,72,0.34),inset_0_1px_0_rgba(255,255,255,0.9)]",
        selected && "ring-2 ring-loop ring-offset-2 ring-offset-paper",
        !reduce && "hover:-translate-y-1"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(255,204,0,0.28)_0%,rgba(255,204,0,0.12)_46%,transparent_78%)]"
      />
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

      <div className="relative z-10 p-5 pb-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
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

        <h3 className="mt-3 min-h-[2.75rem] font-heading text-xl font-bold leading-tight tracking-tight text-signal">
          {plan.name}
        </h3>

        {/* Speed — symmetric plans show one number + tag; asymmetric show both */}
        <div className="mt-3 grid min-h-[76px] grid-cols-2 gap-3 rounded-2xl bg-fog/75 p-3">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft">Download</span>
            <span className="display-mono mt-1 block whitespace-nowrap text-xl font-bold leading-none text-ink lg:text-lg 2xl:text-xl">{formatSpeed(plan.download)}</span>
          </div>
          <div className="border-l border-line pl-3">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft">Upload</span>
            <span className="display-mono mt-1 block whitespace-nowrap text-xl font-bold leading-none text-ink lg:text-lg 2xl:text-xl">{formatSpeed(plan.upload)}</span>
            {isSymmetric && (
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-signal">
                <ArrowLeftRight aria-hidden="true" className="h-3 w-3" /> Symmetric
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-signal">
            {plan.currency === "USD" ? "US$" : "$"}{plan.price}
          </span>
          <span className="text-sm text-ink-soft">/ {plan.cycle}</span>
        </div>
      </div>

      {/* Plan-differentiating features only — section header covers the shared inclusions */}
      <div className="relative z-10 flex-1 p-5 pt-4">
        {plan.features?.length > 0 && (
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-snug text-ink-soft"
              >
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTAs — checkbox compare + single primary action + quiet WhatsApp link */}
      <div className="relative z-10 mt-auto p-5 pt-1">
        {onToggle && (
          <label className="mb-3 flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-1 text-sm text-ink-soft hover:text-signal">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(plan.id)}
              className="h-4 w-4 shrink-0 rounded border-line accent-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
            />
            {selected ? "Added to comparison" : "Add to comparison"}
          </label>
        )}

        <button
          type="button"
          onClick={() => onSelectPackage?.(plan.id)}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-loop px-4 py-3 text-sm font-bold text-signal transition-colors hover:bg-loop-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
        >
          Choose this plan
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>

        <a
          href={WA_INTENTS.plan(plan.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex min-h-11 w-full items-center justify-center gap-1.5 text-xs font-medium text-ink-soft hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
        >
          <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
          Talk to us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default PlanCard;
