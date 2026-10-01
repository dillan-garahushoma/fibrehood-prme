import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Headphones,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Star,
  MessageCircle,
  Phone,
  X,
  CheckCircle2,
} from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import { Reveal } from "@/components/common/Reveal";
import { SUPPORT_CATEGORIES, SUPPORT_ARTICLES, searchArticles } from "@/data/support";
import { SITE, WA_INTENTS } from "@/data/site";

const NAVY = "#072248";
const GOLD = "#FFCC00";
const BLUE = "#2563EB";

/* ─── Category sidebar row ─────────────────────────────────────────────── */
function CategoryRow({ category, count, isActive, onClick }) {
  const Icon = category.icon;
  const isAll = category.id === "all";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`group flex w-full items-center gap-3.5 border-b border-slate-100/80 px-4 py-3.5 text-left transition-all duration-150 last:border-b-0 ${
        isActive ? "bg-blue-50/70" : "hover:bg-slate-50/80"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-150 ${
          isActive
            ? "bg-[#072248] text-white shadow-xs"
            : isAll
            ? "bg-slate-100 text-[#072248]"
            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/70"
        }`}
      >
        {Icon && (
          <Icon
            className="h-4 w-4"
            strokeWidth={isActive ? 2 : 1.75}
            aria-hidden="true"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[13px] font-medium truncate ${
            isActive ? "text-[#072248]" : "text-slate-700"
          }`}
        >
          {category.name || category.label}
        </span>
        <span className="block text-[11px] text-slate-400">
          {count} {count === 1 ? "solution" : "solutions"}
        </span>
      </span>
      <ChevronRight
        className={`h-3.5 w-3.5 shrink-0 transition-transform ${
          isActive ? "text-[#072248] translate-x-0.5" : "text-slate-300"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

/* ─── Refined Accordion question card ───────────────────────────────────── */
function QuestionCard({ article, isOpen, onToggle, feedback, onFeedback }) {
  const Icon = article.icon;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-xs">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50/50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          {Icon && <Icon className="h-3.5 w-3.5 text-[#072248]" strokeWidth={1.75} aria-hidden="true" />}
        </span>
        <span className="flex-1 text-[14px] font-medium text-[#072248] sm:text-[15px]">
          {article.question || article.title}
        </span>
        {article.popular && (
          <span
            className="hidden sm:inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{ backgroundColor: "#FEF3C7", color: "#072248" }}
          >
            <Star className="h-2.5 w-2.5" style={{ color: GOLD }} fill={GOLD} />
            Common
          </span>
        )}
        <ChevronDown
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3.5">
          {/* Answer text */}
          {article.answer && (
            <p className="text-[13px] leading-relaxed text-slate-600 sm:text-sm">
              {article.answer}
            </p>
          )}

          {/* Numbered diagnostic steps */}
          {article.steps && article.steps.length > 0 && (
            <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3.5">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Action Steps
              </span>
              <ol className="mt-2 space-y-1.5">
                {article.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-700">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#072248] text-[10px] font-medium text-white">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Feedback & WhatsApp help */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">Helpful?</span>
              <button
                type="button"
                onClick={() => onFeedback("yes")}
                aria-label="Mark helpful"
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  feedback === "yes"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
                Yes
              </button>
              <button
                type="button"
                onClick={() => onFeedback("no")}
                aria-label="Mark not helpful"
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  feedback === "no"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
                No
              </button>
              {feedback && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Thanks!
                </span>
              )}
            </div>

            <a
              href={WA_INTENTS.support()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Still stuck? Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [params, setParams] = useSearchParams();
  const urlCat = params.get("cat") || "all";

  // Match category with alias support (e.g. 'slow' -> 'slow-internet')
  const matchedCategory = useMemo(() => {
    return (
      SUPPORT_CATEGORIES.find(
        (c) => c.id === urlCat || (c.alias && c.alias.includes(urlCat))
      ) || SUPPORT_CATEGORIES[0]
    );
  }, [urlCat]);

  const [activeCategoryId, setActiveCategoryId] = useState(matchedCategory.id);
  const [query, setQuery] = useState("");
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [feedback, setFeedback] = useState({});

  const searchInputRef = useRef(null);
  const sidebarRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState(500);

  // Sync state with URL params
  useEffect(() => {
    setActiveCategoryId(matchedCategory.id);
  }, [matchedCategory]);

  // Keep right panel scroll area height synced to left sidebar height on desktop
  useEffect(() => {
    if (!sidebarRef.current) return;
    const updateHeight = () => {
      if (sidebarRef.current && window.innerWidth >= 1024) {
        setSidebarHeight(sidebarRef.current.offsetHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(sidebarRef.current);
    window.addEventListener("resize", updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // ⌘K / Ctrl+K keyboard shortcut focus
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setCat = (id) => {
    setParams(id === "all" ? {} : { cat: id }, { replace: true });
    setOpenQuestionId(null);
    if (window.innerWidth < 1024) {
      const target = document.getElementById("faq-section");
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const categoryCounts = useMemo(() => {
    return SUPPORT_CATEGORIES.map((c) => ({
      ...c,
      count:
        c.id === "all"
          ? SUPPORT_ARTICLES.length
          : SUPPORT_ARTICLES.filter(
              (a) =>
                a.categoryId === c.id ||
                a.category === c.id ||
                (c.alias && (c.alias.includes(a.categoryId) || c.alias.includes(a.category)))
            ).length,
    }));
  }, []);

  const activeCategory =
    categoryCounts.find((c) => c.id === activeCategoryId) ?? categoryCounts[0];

  const normalizedQuery = query.trim().toLowerCase();

  const visibleQuestions = useMemo(() => {
    let list = searchArticles(query);
    if (activeCategoryId !== "all") {
      list = list.filter(
        (a) =>
          a.categoryId === activeCategoryId ||
          a.category === activeCategoryId ||
          (activeCategory.alias &&
            (activeCategory.alias.includes(a.categoryId) ||
              activeCategory.alias.includes(a.category)))
      );
    }
    if (!normalizedQuery && showOnlyPopular) {
      list = list.filter((q) => q.popular || q.featured);
    }
    return list;
  }, [query, activeCategoryId, activeCategory, normalizedQuery, showOnlyPopular]);

  const heading = normalizedQuery
    ? `Results for "${query.trim()}"`
    : showOnlyPopular
    ? activeCategoryId === "all"
      ? "Common questions"
      : `Common in ${activeCategory?.name || activeCategory?.label}`
    : activeCategoryId === "all"
    ? "All solutions"
    : `${activeCategory?.name || activeCategory?.label}`;

  return (
    <>
      {/* ── Split Hero without Search Bar & with Homepage-styled Pills ── */}
      <SplitHero
        image={IMAGES.supportHero}
        alt="Fibrehood customer support specialist assisting a client"
        fullBleed
        imageClassName="object-cover object-[72%_center]"
        eyebrow="SUPPORT & SELF-SERVICE"
        title="Find an answer, fast"
        subtitle="Search common issues, browse by category, and escalate to a human when you need to."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("faq-section");
              if (target) {
                const y = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-loop px-6 py-3 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop"
          >
            Frequently Asked Questions <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={WA_INTENTS.support()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            Contact Support <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </SplitHero>

      {/* ── Main Support Section ── */}
      <section id="faq-section" className="bg-slate-50/60 py-12 md:py-16">
        <div className="container-lattice">
          {/* Header Bar */}
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="h-0.5 w-6 shrink-0" style={{ backgroundColor: GOLD }} aria-hidden="true" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Knowledge Base
                  </span>
                </div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#072248] sm:text-3xl">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Still need help banner */}
              <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-xs">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <Headphones className="h-4.5 w-4.5 text-[#072248]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="pr-1 text-left">
                  <p className="text-xs font-medium text-[#072248]">Still need help?</p>
                  <p className="text-[11px] text-slate-400">Our engineers are standing by</p>
                </div>
                <a
                  href={WA_INTENTS.support()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-[#072248] transition-all hover:brightness-95"
                  style={{ backgroundColor: GOLD }}
                >
                  Contact Support
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── 2-Column Balanced Layout ── */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
            {/* Left Sidebar: Categories list */}
            <Reveal>
              <div
                ref={sidebarRef}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs"
              >
                <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Browse Topics
                  </span>
                </div>
                {categoryCounts.map((c) => (
                  <CategoryRow
                    key={c.id}
                    category={c}
                    count={c.count}
                    isActive={c.id === activeCategoryId}
                    onClick={() => setCat(c.id)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Right Panel: Questions with boundary blend */}
            <Reveal delay={0.05} className="flex flex-col">
              {/* In-page Knowledge Base Search */}
              <div className="relative mb-3">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search articles e.g. "Wi-Fi", "billing", "installation"...'
                  aria-label="Search support articles"
                  className="h-10 w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-10 pr-16 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-[#072248] focus:ring-1 focus:ring-[#072248]"
                />
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="rounded-full p-0.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <kbd className="pointer-events-none hidden sm:inline-block rounded border border-slate-200 bg-slate-50 px-1 py-0.5 text-[10px] font-medium text-slate-400">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Question list header bar */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[#072248]">
                    {heading}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {visibleQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!normalizedQuery && (
                    <button
                      type="button"
                      onClick={() => setShowOnlyPopular((v) => !v)}
                      aria-pressed={showOnlyPopular}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        showOnlyPopular
                          ? "bg-amber-100/70 text-[#072248] border border-amber-300/80"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Star
                        className="h-3 w-3"
                        style={{ color: showOnlyPopular ? GOLD : "#94A3B8" }}
                        fill={showOnlyPopular ? GOLD : "none"}
                        aria-hidden="true"
                      />
                      Most common
                    </button>
                  )}
                  {showOnlyPopular && (
                    <button
                      type="button"
                      onClick={() => setShowOnlyPopular(false)}
                      className="text-xs font-medium text-slate-400 hover:text-slate-600 underline"
                    >
                      Show all
                    </button>
                  )}
                </div>
              </div>

              {/* Questions Container with Horizontal Boundary Blend */}
              {visibleQuestions.length > 0 ? (
                <div
                  className="relative overflow-y-auto pr-1.5 space-y-2.5 py-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                  style={{
                    maxHeight: `${Math.max(sidebarHeight - 52, 440)}px`,
                    maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)",
                  }}
                >
                  {visibleQuestions.map((a) => (
                    <QuestionCard
                      key={a.id}
                      article={a}
                      isOpen={openQuestionId === a.id}
                      onToggle={() =>
                        setOpenQuestionId((prev) => (prev === a.id ? null : a.id))
                      }
                      feedback={feedback[a.id]}
                      onFeedback={(value) =>
                        setFeedback((prev) => ({ ...prev, [a.id]: value }))
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-xs">
                  <Search className="mx-auto mb-3 h-7 w-7 text-slate-300" aria-hidden="true" />
                  <p className="text-sm font-medium text-[#072248]">
                    No matching questions found
                  </p>
                  <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
                    Try different keywords, clear your search, or message our team directly.
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        Clear search
                      </button>
                    )}
                    <a
                      href={WA_INTENTS.support()}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[#072248]"
                      style={{ backgroundColor: GOLD }}
                    >
                      WhatsApp Support
                    </a>
                  </div>
                </div>
              )}
            </Reveal>
          </div>

          {/* ── Escalation Cards ── */}
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <MessageCircle className="h-4.5 w-4.5" />
                </span>
                <h4 className="mt-3 font-heading text-base font-semibold text-[#072248]">
                  WhatsApp Support
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Direct connection to our network architects — fastest response for diagnostics.
                </p>
              </div>
              <a
                href={WA_INTENTS.support()}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-[#072248] transition-all hover:brightness-95"
                style={{ backgroundColor: GOLD }}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Message WhatsApp
              </a>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                <h4 className="mt-3 font-heading text-base font-semibold text-[#072248]">
                  Call Help Desk
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Direct voice support during working hours: {SITE.hours}.
                </p>
              </div>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-[#072248] transition-colors hover:bg-slate-50"
              >
                <Phone className="h-3.5 w-3.5" />
                {SITE.phone}
              </a>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs sm:col-span-2 lg:col-span-1">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Headphones className="h-4.5 w-4.5" />
                </span>
                <h4 className="mt-3 font-heading text-base font-semibold text-[#072248]">
                  Submit an Enquiry
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Need on-site assistance, custom enterprise solutions, or billing changes?
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-[#072248] transition-colors hover:bg-slate-100"
              >
                Open Contact Form
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}