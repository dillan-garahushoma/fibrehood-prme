import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Loader2, Check, Clock, AlertCircle, ArrowRight, MessageCircle, Zap } from "lucide-react";
import { LoopMark } from "@/components/brand/LoopMark";
import { lookupCoverage, COVERAGE_STATES } from "@/data/network";
import { getPlan, formatSpeed } from "@/data/plans";
import { WA_INTENTS } from "@/data/site";
import { cn } from "@/lib/utils";

const TONES = {
  covered: { ring: "ring-loop", text: "text-signal", chip: "bg-loop text-signal", Icon: Check },
  near: { ring: "ring-amber-400", text: "text-amber-600", chip: "bg-amber-400 text-signal", Icon: Clock },
  not_covered: { ring: "ring-line", text: "text-ink-soft", chip: "bg-fog text-ink-soft", Icon: AlertCircle },
  invalid: { ring: "ring-destructive", text: "text-destructive", chip: "bg-destructive/10 text-destructive", Icon: AlertCircle },
  error: { ring: "ring-destructive", text: "text-destructive", chip: "bg-destructive/10 text-destructive", Icon: AlertCircle }
};

export function CoverageChecker({ variant = "page", onResult, source = "coverage" }) {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    setError("");
    const value = address.trim();
    if (value.length < 4) {
      setState("invalid");
      setResult({ state: "invalid", address: value, note: "Please enter a street address or postal code." });
      onResult?.({ state: "invalid" });
      return;
    }
    setState("searching");
    // Simulated lookup against the development footprint model.
    window.setTimeout(() => {
      const res = lookupCoverage(value);
      setResult(res);
      setState(res.state);
      onResult?.(res);
    }, 1500);
  };

  const reset = () => {
    setState("idle");
    setResult(null);
    setError("");
  };

  const tone = result ? TONES[result.state] : null;
  const isPage = variant === "page";

  return (
    <div className={cn("w-full", isPage ? "mx-auto max-w-3xl" : "")}>
      {/* ── Input bar ────────────────────────────────────────────── */}
      <form onSubmit={submit} className="relative">
        <div
          className={cn(
            "flex flex-col gap-2 rounded-2xl border bg-paper p-2 shadow-signal transition-all sm:flex-row sm:items-center",
            state === "searching" ? "border-loop" : "border-line"
          )}
        >
          <div className="flex flex-1 items-center gap-3 px-3">
            <Search className="h-5 w-5 shrink-0 text-ink-soft" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street address or postal code"
              aria-label="Your address"
              className="h-12 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/60"
            />
          </div>
          <button
            type="submit"
            disabled={state === "searching"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-signal px-6 text-sm font-semibold text-paper transition-all hover:bg-signal-deep disabled:opacity-70"
          >
            {state === "searching" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Checking…
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-loop" /> Check coverage
              </>
            )}
          </button>
        </div>
      </form>

      {/* ── Result panel ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {state !== "idle" && state !== "searching" && result && (
          <motion.div
            key={result.state}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper shadow-lift"
          >
            <ResultHeader result={result} tone={tone} />
            <ResultBody result={result} tone={tone} source={source} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultHeader({ result, tone }) {
  const meta = COVERAGE_STATES[result.state] || COVERAGE_STATES.idle;
  const Icon = tone?.Icon || Check;
  return (
    <div className="flex items-center gap-4 border-b border-line bg-fog/50 px-5 py-4">
      <div className={cn("relative grid h-12 w-12 place-items-center rounded-full ring-2", tone?.ring)}>
        <LoopMark className={cn("h-6 w-9", result.state === "not_covered" && "opacity-40")} animated={result.state === "near"} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tone?.chip)}>
            <Icon className="h-3.5 w-3.5" /> {meta.label}
          </span>
          <span className="text-xs text-ink-soft">{result.address}</span>
        </div>
      </div>
    </div>
  );
}

function ResultBody({ result, tone, source, onReset }) {
  if (result.state === "covered") {
    return (
      <div className="px-5 py-5">
        <p className="text-sm leading-relaxed text-ink-soft">{result.note}</p>
        {result.providers?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {result.providers.map((p) => (
              <span key={p.name} className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-loop" />
                <span className="font-medium text-signal">{p.name}</span>
                <span className="text-ink-soft">·</span>
                <span className="text-ink-soft">{p.status}</span>
              </span>
            ))}
          </div>
        )}
        {result.plans?.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Compatible plans</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {result.plans.slice(0, 4).map((id) => {
                const p = getPlan(id);
                if (!p) return null;
                return (
                  <div key={id} className="rounded-lg border border-line bg-paper px-3 py-2.5">
                    <div className="text-xs font-semibold text-signal">{p.name}</div>
                    <div className="display-mono text-sm text-ink">{formatSpeed(p.download)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link to="/plans" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep">
            See compatible plans <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={WA_INTENTS.coverage(result.address)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-loop px-5 py-3 text-sm font-semibold text-signal transition-transform hover:scale-[1.01]"
          >
            <MessageCircle className="h-4 w-4" /> Request connection
          </a>
        </div>
      </div>
    );
  }

  if (result.state === "near") {
    return (
      <div className="px-5 py-5">
        <p className="text-sm leading-relaxed text-ink-soft">{result.note}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <a
            href={WA_INTENTS.nearCoverage(result.address)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-paper hover:bg-signal-deep"
          >
            <MessageCircle className="h-4 w-4" /> Request a survey
          </a>
          <button onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink-soft hover:bg-fog">
            Check another address
          </button>
        </div>
      </div>
    );
  }

  // not_covered / invalid / error
  return (
    <div className="px-5 py-5">
      <p className="text-sm leading-relaxed text-ink-soft">{result.note}</p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={WA_INTENTS.notCovered(result.address)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-paper hover:bg-signal-deep"
        >
          <MessageCircle className="h-4 w-4" /> Register my interest
        </a>
        <button onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink-soft hover:bg-fog">
          Try another address
        </button>
      </div>
    </div>
  );
}

export default CoverageChecker;