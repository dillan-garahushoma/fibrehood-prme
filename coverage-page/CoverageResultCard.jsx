import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock, MapPinOff, Loader2, ArrowRight, MessageCircle, Search as SearchIcon } from "lucide-react";
import { WA_INTENTS } from "@/data/site";

const btnPrimary = "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-signal px-4 text-sm font-semibold text-paper transition-colors hover:bg-signal-deep";
const btnSecondary = "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-4 text-sm font-semibold text-ink transition-colors hover:bg-fog";
const btnLoop = "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-loop px-4 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft";

export function CoverageResultCard({ checking, result, areaFocus, onCheckAddress, onExploreAreas }) {
  let content = null;

  if (checking) {
    content = (
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-signal" />
        <div>
          <div className="font-heading text-base font-bold text-signal">Checking coverage…</div>
          <div className="text-xs text-ink-soft">Comparing your location with FibreHood's active areas.</div>
        </div>
      </div>
    );
  } else if (areaFocus) {
    content = (
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-loop text-signal">
            <Check className="h-4 w-4" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Coverage area</span>
        </div>
        <h3 className="mt-2 font-heading text-lg font-bold text-signal">{areaFocus.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          FibreHood Fibre Available. Check your exact address to confirm availability and view connection options.
        </p>
        <button type="button" onClick={onCheckAddress} className={`${btnPrimary} mt-4 w-full`}>
          <SearchIcon className="h-4 w-4" /> Check an Address Here
        </button>
      </div>
    );
  } else if (result) {
    if (result.status === "COVERED") {
      content = (
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-loop text-signal">
              <Check className="h-4 w-4" />
            </span>
            <h3 className="font-heading text-base font-bold text-signal">FibreHood is available here</h3>
          </div>
          <p className="mt-2 text-sm text-ink-soft">Your location is within the FibreHood coverage area.</p>
          <div className="mt-2 rounded-lg bg-fog px-3 py-2 text-sm font-medium text-ink">{result.address}</div>
          <p className="mt-2 text-xs text-ink-soft">High-speed fibre is available at this location.</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/plans" className={`${btnPrimary} w-full`}>
              View Fibre Packages <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={WA_INTENTS.coverage(result.address)} target="_blank" rel="noreferrer" className={`${btnLoop} w-full`}>
              <MessageCircle className="h-4 w-4" /> Get Connected
            </a>
          </div>
        </div>
      );
    } else if (result.status === "NEARBY") {
      content = (
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-signal">
              <Clock className="h-4 w-4" />
            </span>
            <h3 className="font-heading text-base font-bold text-signal">FibreHood may be available near you</h3>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            FibreHood coverage is available close to your location, but we are still confirming availability at this exact address.
          </p>
          <div className="mt-2 rounded-lg bg-fog px-3 py-2 text-sm font-medium text-ink">{result.address}</div>
          <div className="mt-4 flex flex-col gap-2">
            <a href={WA_INTENTS.nearCoverage(result.address)} target="_blank" rel="noreferrer" className={`${btnPrimary} w-full`}>
              <MessageCircle className="h-4 w-4" /> Check Availability
            </a>
            <a href="#register-interest" className={`${btnSecondary} w-full`}>
              Register Interest <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-fog text-ink-soft">
              <MapPinOff className="h-4 w-4" />
            </span>
            <h3 className="font-heading text-base font-bold text-signal">FibreHood is not available here yet</h3>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Your address is currently outside our active coverage areas. We're continuously expanding our network.
          </p>
          <div className="mt-2 rounded-lg bg-fog px-3 py-2 text-sm font-medium text-ink">{result.address}</div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="#register-interest" className={`${btnPrimary} w-full`}>
              Register Interest <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={onExploreAreas} className={`${btnSecondary} w-full`}>
              Explore Covered Areas
            </button>
          </div>
        </div>
      );
    }
  }

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-3 left-3 right-3 z-[1100] sm:left-auto sm:w-[330px]"
    >
      <div className="rounded-2xl border border-signal/10 bg-paper/85 p-4 shadow-lift backdrop-blur-xl">{content}</div>
    </motion.div>
  );
}

export default CoverageResultCard;