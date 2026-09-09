import React from "react";
import { Search, LocateFixed, Loader2, X } from "lucide-react";

export function AddressSearch({
  inputRef,
  query,
  onQueryChange,
  suggestions,
  showSuggest,
  onFocusInput,
  onSelect,
  onUseLocation,
  locating,
  error
}) {
  return (
    <div className="absolute left-1/2 top-4 z-[1200] w-[calc(100%-1.5rem)] max-w-[560px] -translate-x-1/2">
      <div className="overflow-hidden rounded-2xl border-2 border-paper/25 bg-signal/45 shadow-lift backdrop-blur-2xl">
        <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/50" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={onFocusInput}
              placeholder="Search your home address"
              aria-label="Search your home address"
              className="h-11 w-full rounded-xl border border-paper/10 bg-paper/10 pl-9 pr-9 text-sm text-paper outline-none placeholder:text-paper/50 focus:border-loop"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-paper/50 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onUseLocation}
            disabled={locating}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-loop px-4 text-sm font-semibold text-signal transition-colors hover:bg-loopsoft disabled:opacity-70"
          >
            {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
            Use My Location
          </button>
        </div>
        {error ? (
          <div className="border-t border-paper/10 px-3 py-2 text-xs text-loop">{error}</div>
        ) : (
          <div className="border-t border-paper/10 px-3 py-1.5 text-[11px] text-paper/55">
            Your location is only used to check FibreHood coverage.
          </div>
        )}
      </div>

      {showSuggest && suggestions.length > 0 && (
        <ul className="mt-1 overflow-hidden rounded-xl border border-line bg-paper shadow-lift">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(s);
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-ink hover:bg-fog"
              >
                <Search className="h-4 w-4 shrink-0 text-ink-soft" />
                <span className="flex-1">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddressSearch;