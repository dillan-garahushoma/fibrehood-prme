import React, { useState, useRef } from "react";
import { ArrowRight, ArrowLeft, Info, MapPin } from "lucide-react";
import { NATIONAL_ROLLOUT_REGIONS } from "@/data/coverageAreas";
import { DEPLOYMENT_STATUS } from "@/data/coverageStatus";
import { cn } from "@/lib/utils";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const NAVY = "#072248";
const GOLD = "#FFCC00";
const LIVE_GREEN = "#16A34A";
const BLUE = "#2563EB";
const ORANGE = "#F97316";
const SLATE = "#9CA3AF";

// ─── Canonical Status Styling (Single Source of Truth) ─────────────────────────
const STATUS = {
  [DEPLOYMENT_STATUS.LIVE]: {
    key: DEPLOYMENT_STATUS.LIVE,
    label: "Live",
    description: "Service available",
    dot: LIVE_GREEN,
    badgeBg: LIVE_GREEN,
    badgeText: "#FFFFFF",
  },
  [DEPLOYMENT_STATUS.IN_PROGRESS]: {
    key: DEPLOYMENT_STATUS.IN_PROGRESS,
    label: "In progress",
    description: "Network under construction",
    dot: ORANGE,
    badgeBg: ORANGE,
    badgeText: "#FFFFFF",
  },
  [DEPLOYMENT_STATUS.PLANNED]: {
    key: DEPLOYMENT_STATUS.PLANNED,
    label: "Planned",
    description: "In planning / design",
    dot: BLUE,
    badgeBg: BLUE,
    badgeText: "#FFFFFF",
  },
  [DEPLOYMENT_STATUS.NOT_STARTED]: {
    key: DEPLOYMENT_STATUS.NOT_STARTED,
    label: "Not started",
    description: "Coming soon",
    dot: SLATE,
    badgeBg: SLATE,
    badgeText: "#FFFFFF",
  },
};

// Normalize any status representation
function resolveStatus(rawStatus) {
  if (!rawStatus) return STATUS[DEPLOYMENT_STATUS.NOT_STARTED];
  const s = String(rawStatus).toUpperCase().replace(/[-\s]/g, "_");
  if (s === "LIVE") return STATUS[DEPLOYMENT_STATUS.LIVE];
  if (s === "IN_PROGRESS" || s === "INPROGRESS") return STATUS[DEPLOYMENT_STATUS.IN_PROGRESS];
  if (s === "PLANNED") return STATUS[DEPLOYMENT_STATUS.PLANNED];
  if (s === "NOT_STARTED" || s === "NOTSTARTED") return STATUS[DEPLOYMENT_STATUS.NOT_STARTED];
  return STATUS[DEPLOYMENT_STATUS.NOT_STARTED];
}

const STATUS_ORDER = [
  DEPLOYMENT_STATUS.LIVE,
  DEPLOYMENT_STATUS.IN_PROGRESS,
  DEPLOYMENT_STATUS.PLANNED,
  DEPLOYMENT_STATUS.NOT_STARTED,
];

// ─── Photographic Project Thumbnail with Resilient Fallback ───────────────────
function ProjectImage({ src, alt, className = "" }) {
  const [error, setError] = useState(false);
  const fallbackSrc = "/images/coverage-aerial.png";

  if (error || !src) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || "Fibrehood network rollout"}
        className={cn("h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", className)}
        onError={() => {}}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Fibrehood project"}
      onError={() => setError(true)}
      className={cn("h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", className)}
      loading="lazy"
    />
  );
}

// ─── Status Legend ─────────────────────────────────────────────────────────────
function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {STATUS_ORDER.map((key) => {
        const s = STATUS[key];
        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full shadow-xs"
              style={{ backgroundColor: s.dot }}
              aria-hidden="true"
            />
            <span className="text-sm font-bold leading-snug" style={{ color: NAVY }}>
              {s.label}
            </span>
            <span className="text-xs text-slate-500 sm:text-sm">
              — {s.description}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Left Column: Town Location Row ───────────────────────────────────────────
function LocationRow({ name, status, onClick, isActive = false }) {
  const s = resolveStatus(status);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "group flex w-full items-center justify-between py-2.5 px-3 rounded-r-lg text-left transition-all duration-150 border-l-[3px]",
        isActive
          ? "font-bold border-[#FFCC00] bg-[#FFCC00]/10"
          : "font-medium text-slate-700 border-transparent hover:bg-slate-50 hover:text-[#072248]"
      )}
    >
      <span className={cn("text-sm transition-colors", isActive ? "text-[#072248]" : "text-slate-700 group-hover:text-[#072248]")}>
        {name}
      </span>
      <span className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: s.dot }}
            aria-hidden="true"
          />
          {s.label}
        </span>
        <ArrowRight
          className={cn(
            "h-3.5 w-3.5 transition-all duration-150",
            isActive
              ? "text-[#072248] translate-x-0.5"
              : "text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5"
          )}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

// ─── Right Column: Project Card (Refined Content Row) ─────────────────────────
function ProjectCard({ area, town, onClick, onViewOnMap }) {
  const s = resolveStatus(area.status);
  const isLive = s.key === DEPLOYMENT_STATUS.LIVE;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group flex w-full cursor-pointer items-start sm:items-center gap-3.5 sm:gap-5 rounded-xl border border-slate-200/70 bg-white p-3.5 sm:p-4 text-left transition-all duration-150 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs"
    >
      {/* Consistent Dimension Thumbnail */}
      <div className="relative h-20 w-24 sm:h-22 sm:w-36 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <ProjectImage src={area.imageSrc} alt={area.name} />
      </div>

      {/* Main Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-base font-bold leading-snug sm:text-lg" style={{ color: NAVY }}>
            {area.name}
          </h4>
          <span
            className="sm:hidden rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap shadow-xs"
            style={{ backgroundColor: s.badgeBg, color: s.badgeText }}
          >
            {s.label}
          </span>
        </div>
        <p className="mt-0.5 text-xs font-medium text-slate-400">
          {town.name}
        </p>
        <p className="mt-1 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-500">
          {area.description}
        </p>

        {/* Live project quick map action */}
        {isLive && onViewOnMap && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewOnMap(area, town);
            }}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] transition-colors hover:underline"
          >
            <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
            View coverage on map
          </button>
        )}
      </div>

      {/* Status Pill Badge + Arrow (Desktop) */}
      <div className="hidden sm:flex shrink-0 items-center gap-3 sm:gap-4 pl-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap shadow-xs"
          style={{ backgroundColor: s.badgeBg, color: s.badgeText }}
        >
          {s.label}
        </span>
        <ArrowRight
          className="h-4 w-4 text-slate-300 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-slate-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ─── Right Column: Area Detail View (Drilldown) ────────────────────────────────
function AreaDetail({ area, town, onBack, onOpenArea, onViewOnMap }) {
  const s = resolveStatus(area.status);
  const isLive = s.key === DEPLOYMENT_STATUS.LIVE;
  const hasHomeStats = Boolean(area.homesInScope || area.homesConnected);
  const pct =
    area.homesConnected && area.homesInScope
      ? Math.min(100, Math.round((area.homesConnected / area.homesInScope) * 100))
      : null;

  return (
    <div className="animate-fade-up">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
        style={{ color: BLUE }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Projects in {town.name}
      </button>

      {/* Project Image Banner with map overlay for Live projects */}
      <div className="relative mb-6 h-52 w-full overflow-hidden rounded-xl bg-slate-100 shadow-xs sm:h-64">
        <ProjectImage src={area.imageSrc} alt={area.name} />

        {isLive && onViewOnMap && (
          <button
            type="button"
            onClick={() => onViewOnMap(area, town)}
            className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#072248] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#2563EB] hover:scale-105 active:scale-95"
          >
            <MapPin className="h-4 w-4 text-[#2563EB]" />
            View on interactive map
          </button>
        )}
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: NAVY }}>
          {area.name}
        </h3>
        <span
          className="rounded-full px-3 py-0.5 text-xs font-bold shadow-xs"
          style={{ backgroundColor: s.badgeBg, color: s.badgeText }}
        >
          {s.label}
        </span>
      </div>

      <p className="mb-4 text-xs font-medium text-slate-400 sm:text-sm">
        {town.name} • {s.description}
      </p>

      <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
        {area.description}
      </p>

      {/* Rollout Metrics */}
      {hasHomeStats && (
        <div className="mb-7 rounded-xl border border-slate-200/70 bg-slate-50/60 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-6">
            {area.homesInScope && (
              <div>
                <p className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: NAVY }}>
                  {area.homesInScope.toLocaleString()}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">Homes in scope</p>
              </div>
            )}
            {area.homesConnected && (
              <div>
                <p className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: NAVY }}>
                  {area.homesConnected.toLocaleString()}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">Homes connected</p>
              </div>
            )}
          </div>

          {pct !== null && (
            <div className="mt-5 border-t border-slate-200/70 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Rollout deployment progress</span>
                <span className="text-xs font-extrabold" style={{ color: NAVY }}>
                  {pct}% Connected
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%`, backgroundColor: GOLD }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Call to action buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onOpenArea?.(area, town)}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xs transition-all hover:scale-[1.02] hover:brightness-95 active:scale-95"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          {isLive ? "Get connected in " : "Register interest for "}
          {area.name}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        {isLive && onViewOnMap && (
          <button
            type="button"
            onClick={() => onViewOnMap(area, town)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2563EB]/20 bg-blue-50/50 px-6 py-2.5 text-sm font-bold text-[#2563EB] shadow-xs transition-all hover:border-[#2563EB] hover:bg-blue-100/50 active:scale-95"
          >
            <MapPin className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
            View coverage on map
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Right Column: Empty Area Notice (For Towns without published areas) ───────
function TownEmptyNotice({ town, onOpenArea }) {
  const s = resolveStatus(town.status);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-16">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-xs">
        <MapPin className="h-6 w-6" style={{ color: BLUE }} aria-hidden="true" />
      </div>
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-lg font-bold sm:text-xl" style={{ color: NAVY }}>
          {town.name}
        </h4>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold"
          style={{ backgroundColor: s.badgeBg, color: s.badgeText }}
        >
          {s.label}
        </span>
      </div>
      <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
        {town.description || `Area-level detail for ${town.name} is coming soon. Network planning is underway in accordance with our national fibre licence.`}
      </p>

      <button
        type="button"
        onClick={() => onOpenArea?.({ id: town.id, name: town.name, status: town.status }, town)}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold shadow-xs transition-transform hover:scale-[1.02] active:scale-95"
        style={{ backgroundColor: GOLD, color: NAVY }}
      >
        Register interest for {town.name}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── Main Explorer Component ──────────────────────────────────────────────────
export function WhereFibrehoodIsBuilding({
  regions = NATIONAL_ROLLOUT_REGIONS,
  onOpenArea,
  onViewOnMap,
}) {
  const [selectedTownId, setSelectedTownId] = useState("harare");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [showAllProjectsView, setShowAllProjectsView] = useState(false);
  const projectsRef = useRef(null);

  const selectedTown = regions.find((r) => r.id === selectedTownId) || regions[0] || null;
  const selectedArea = selectedTown?.areas?.find((a) => a.id === selectedAreaId) || null;

  function scrollToProjects() {
    window.requestAnimationFrame(() => {
      projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function selectTown(id) {
    setSelectedTownId(id || null);
    setSelectedAreaId(null);
    setShowAllProjectsView(false);
    scrollToProjects();
  }

  function selectArea(id) {
    setSelectedAreaId(id);
    setShowAllProjectsView(false);
    scrollToProjects();
  }

  function backToTownOverview() {
    setSelectedAreaId(null);
    scrollToProjects();
  }

  // Collect all projects across all regions for the "View all projects" mode
  const allProjects = regions.flatMap((r) =>
    (r.areas || []).map((area) => ({ ...area, town: r }))
  );

  return (
    <section className="px-6 py-20 sm:py-24 lg:py-32" aria-label="Network Rollout">
      <div className="mx-auto max-w-7xl">

        {/* ── 1. Top Section Header with Generous Whitespace ── */}
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            National Coverage
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold leading-[1.08] tracking-tighter sm:text-4xl lg:text-[2.6rem]" style={{ color: NAVY }}>
            Explore network rollout
          </h2>
          <p className="mt-3.5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-500">
            Select a town or city to explore indicative rollout status and projects across Zimbabwe. Exact availability is confirmed at building or address level.
          </p>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
            Rollout areas show where deployment is planned or underway; they do not mean every property in the area can connect.
          </p>
        </div>

        {/* ── 2. Status Legend Row aligned with City Selector & more visible top/bottom lines ── */}
        <div className="mb-12 sm:mb-16 flex flex-col gap-6 border-y border-slate-200 py-5 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <StatusLegend />
        </div>

        {/* ── 3. Unified Two-Column System with Vertical Gold Divider (No enclosing cards!) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_auto_1fr] xl:grid-cols-[320px_auto_1fr] gap-10 lg:gap-14 xl:gap-16 items-start">

          {/* LEFT COLUMN: Network rollout Navigation */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
                Network rollout
              </h3>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {regions.length} towns and cities across Zimbabwe
              </p>
            </div>

            {/* Clean navigation list */}
            <div className="space-y-0.5 max-h-[580px] overflow-y-auto pr-1">
              {regions.map((r) => (
                <LocationRow
                  key={r.id}
                  name={r.name}
                  status={r.status}
                  isActive={!showAllProjectsView && r.id === selectedTownId}
                  onClick={() => selectTown(r.id)}
                />
              ))}
            </div>

            {/* Bottom link */}
            <div className="mt-5 pt-3.5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowAllProjectsView(true);
                  setSelectedAreaId(null);
                  scrollToProjects();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:underline"
                style={{ color: BLUE }}
              >
                View all national projects <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ── 4. Vertical Fibrehood Gold Divider (Desktop) ── */}
          <div
            className="hidden lg:block w-[2.5px] bg-[#FFCC00] self-stretch min-h-[460px] rounded-full my-1 opacity-90"
            aria-hidden="true"
          />

          {/* Mobile Horizontal Gold Divider */}
          <div
            className="block lg:hidden h-[2px] w-24 bg-[#FFCC00] my-2 rounded-full opacity-90"
            aria-hidden="true"
          />

          {/* RIGHT COLUMN: Projects (Dynamic City Heading & Refined Content Rows) */}
          <div ref={projectsRef} id="rollout-projects" className="flex flex-col min-w-0 scroll-mt-24 sm:scroll-mt-28">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h3 className="text-lg font-bold tracking-tight" style={{ color: NAVY }}>
                {showAllProjectsView
                  ? "All Projects Across Zimbabwe"
                  : selectedArea
                  ? `Project Details`
                  : `Projects in ${selectedTown?.name || "Bulawayo"}`}
              </h3>

              {!selectedArea && (
                <button
                  type="button"
                  onClick={() => {
                    setShowAllProjectsView(!showAllProjectsView);
                    setSelectedAreaId(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: BLUE }}
                >
                  {showAllProjectsView ? `Show ${selectedTown?.name || "Town"} projects` : "View all projects"}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Content Area: Projects List or Area Drilldown */}
            <div>
              {selectedArea && selectedTown ? (
                <AreaDetail
                  area={selectedArea}
                  town={selectedTown}
                  onBack={backToTownOverview}
                  onOpenArea={onOpenArea}
                  onViewOnMap={onViewOnMap}
                />
              ) : showAllProjectsView ? (
                <div className="space-y-3.5">
                  {allProjects.map((item) => (
                    <ProjectCard
                      key={item.id}
                      area={item}
                      town={item.town}
                      onViewOnMap={onViewOnMap}
                      onClick={() => {
                        setSelectedTownId(item.town.id);
                        selectArea(item.id);
                      }}
                    />
                  ))}
                </div>
              ) : selectedTown && selectedTown.areas && selectedTown.areas.length > 0 ? (
                <div className="space-y-3.5">
                  {selectedTown.areas.map((area) => (
                    <ProjectCard
                      key={area.id}
                      area={area}
                      town={selectedTown}
                      onViewOnMap={onViewOnMap}
                      onClick={() => selectArea(area.id)}
                    />
                  ))}
                </div>
              ) : selectedTown ? (
                <TownEmptyNotice town={selectedTown} onOpenArea={onOpenArea} />
              ) : null}
            </div>

            {/* Bottom Info Banner */}
            <div
              className="mt-10 flex items-start gap-3.5 rounded-xl border border-blue-100/70 p-4 sm:p-5 transition-colors"
              style={{ backgroundColor: "#EFF6FF" }}
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                <Info className="h-3.5 w-3.5" style={{ color: BLUE }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold sm:text-sm" style={{ color: NAVY }}>
                  More locations coming soon
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                  We are expanding our network to more towns and cities across Zimbabwe in line with
                  our national licence and underserved area obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhereFibrehoodIsBuilding;



