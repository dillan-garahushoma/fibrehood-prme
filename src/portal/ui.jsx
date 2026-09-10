// ─────────────────────────────────────────────────────────────────────────────
// FibreHood Client Portal — shared UI primitives.
// Designed to feel like a premium telecom product: rounded, calm, restrained.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Card ────────────────────────────────────────────────────────────────────
export function Card({ className, children, as: Comp = "div", ...props }) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border border-border bg-card shadow-signal",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({ className, title, sub, icon, action, eyebrow }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex items-start gap-3">
        {icon && <IconBox tone="navy">{icon}</IconBox>}
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
            {title}
          </h3>
          {sub && <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ── Button ──────────────────────────────────────────────────────────────────
const BUTTON_VARIANTS = {
  primary:
    "bg-loop text-signal hover:bg-loopsoft focus-visible:ring-loop/60 shadow-[0_1px_2px_rgba(7,34,72,0.12)]",
  navy: "bg-signal text-paper hover:bg-signal-deep focus-visible:ring-signal/40",
  outline:
    "border border-border bg-card text-foreground hover:bg-muted focus-visible:ring-border",
  ghost:
    "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-border",
  soft: "bg-loop/12 text-amber-700 dark:text-loop hover:bg-loop/20 focus-visible:ring-loop/40",
  danger: "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20",
};
const BUTTON_SIZES = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2.5",
  icon: "h-9 w-9",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex select-none items-center justify-center rounded-xl font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ── IconBox ─────────────────────────────────────────────────────────────────
export function IconBox({ children, tone = "navy", className, size = "md" }) {
  const tones = {
    navy: "bg-signal text-paper",
    navySoft: "bg-signal/[0.06] text-signal dark:bg-signal/20 dark:text-paper",
    gold: "bg-loop text-signal",
    goldSoft: "bg-loop/15 text-amber-700 dark:text-loop",
    neutral: "bg-muted text-muted-foreground",
    green: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
    red: "bg-red-500/12 text-red-600 dark:text-red-400",
  };
  const sizes = { sm: "h-8 w-8 rounded-lg", md: "h-10 w-10 rounded-xl", lg: "h-12 w-12 rounded-2xl" };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizes[size],
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

// ── Badge / pill ────────────────────────────────────────────────────────────
const PILL_TONES = {
  neutral: "bg-muted text-muted-foreground",
  gold: "bg-loop/15 text-amber-700 dark:text-loop",
  green: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  red: "bg-red-500/12 text-red-600 dark:text-red-400",
  blue: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
  navy: "bg-signal text-paper",
  outline: "border border-border text-muted-foreground",
};
export function Pill({ children, tone = "neutral", className, dot }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        PILL_TONES[tone],
        className
      )}
    >
      {dot !== undefined && <StatusDot tone={dot} />}
      {children}
    </span>
  );
}

export const DOT_TONES = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  gold: "bg-loop",
  slate: "bg-slate-400",
  sky: "bg-sky-500",
};
export function StatusDot({ tone = "green", pulse, className }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            DOT_TONES[tone]
          )}
        />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", DOT_TONES[tone])} />
    </span>
  );
}

// ── Status pill (semantic word → tone) ──────────────────────────────────────
const STATUS_TONE = {
  operational: "green",
  connected: "green",
  paid: "green",
  resolved: "green",
  active: "green",
  open: "gold",
  upcoming: "gold",
  pending: "gold",
  scheduled: "gold",
  overdue: "red",
  down: "red",
  failed: "red",
  degraded: "amber",
  refunded: "blue",
  declined: "red",
};
export function StatusPill({ status, label }) {
  const tone = STATUS_TONE[String(status).toLowerCase()] || "neutral";
  const dotTone = { green: "green", gold: "gold", red: "red", amber: "amber", blue: "sky", neutral: "slate" }[tone];
  return (
    <Pill tone={tone} dot={dotTone}>
      {label || status}
    </Pill>
  );
}

// ── Donut (SVG progress ring) ───────────────────────────────────────────────
export function Donut({
  value = 0,
  size = 168,
  stroke = 14,
  color = "#FFCC00",
  track = "var(--donut-track, hsl(var(--muted)))",
  className,
  children,
  rounded = true,
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = c - (clamped / 100) * c;
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap={rounded ? "round" : "butt"}
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

// ── Progress bar ────────────────────────────────────────────────────────────
export function Progress({ value = 0, className, barClassName, color = "bg-loop" }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", color, barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// ── Segmented control ───────────────────────────────────────────────────────
export function Segmented({ options, value, onChange, className, size = "md" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl border border-border bg-muted/60 p-1",
        className
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-lg font-semibold transition-colors",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${options.map((o) => o.value).join("-")}`}
                className="absolute inset-0 rounded-lg bg-card shadow-[0_1px_3px_rgba(7,34,72,0.14)]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Stat block ──────────────────────────────────────────────────────────────
export function Stat({ label, value, sub, icon, className }) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {icon && <IconBox tone="navySoft" size="sm">{icon}</IconBox>}
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate font-heading text-lg font-bold tracking-tight text-foreground">
          {value}
        </p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

// ── Skeleton (loading state) ────────────────────────────────────────────────
export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />;
}

// ── Empty state ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, body, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-12 text-center", className)}>
      {icon && <IconBox tone="neutral" size="lg">{icon}</IconBox>}
      <div>
        <p className="font-heading text-base font-bold text-foreground">{title}</p>
        {body && <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Field (form) ────────────────────────────────────────────────────────────
export function Field({ label, hint, children, className }) {
  return (
    <label className={cn("block", className)}>
      {label && <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>}
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-60";

// ── Switch ──────────────────────────────────────────────────────────────────
export function Switch({ checked, onChange, label, description, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "group flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors",
        disabled && "opacity-60"
      )}
    >
      <span>
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </span>
      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-loop" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

// ── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, sub, children, footer, width = "max-w-md" }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-signal/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lift",
              width
            )}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">{title}</h3>
                {sub && <p className="mt-0.5 text-sm text-muted-foreground">{sub}</p>}
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && <div className="flex justify-end gap-3 border-t border-border bg-muted/40 px-6 py-4">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Section heading ─────────────────────────────────────────────────────────
export function PageHeading({ eyebrow, title, sub, actions, className }) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {sub && <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// ── Key/value row (used for account / plan detail lists) ────────────────────
export function DetailRow({ label, value, className, mono }) {
  return (
    <div className={cn("flex items-center justify-between gap-4 py-2.5", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-right text-sm font-semibold text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  );
}
