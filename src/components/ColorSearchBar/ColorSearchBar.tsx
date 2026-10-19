"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";

import { useColorStore } from "@/store/useColorStore";
import { cn } from "@/lib/cn";

export function ColorSearchBar() {
  const setFromSearch = useColorStore((s) => s.setFromSearch);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const ok = setFromSearch(trimmed);
    if (ok) {
      setError(false);
      return;
    }

    setError(true);
    setTimeout(() => setError(false), 2000);
  }, [query, setFromSearch]);

  return (
    <form
      role="search"
      aria-label="Search color code"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex min-w-0 flex-1 md:max-w-lg"
    >
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-xl border bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm transition-colors",
          error
            ? "border-red-300 ring-2 ring-red-100"
            : "border-neutral-200/80 focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-200/80"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Search #287D8A, rgb, hsl…"
          aria-label="Color code search"
          aria-invalid={error}
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          spellCheck={false}
        />
      </div>
      {error && (
        <span className="sr-only" role="alert">
          Invalid color code
        </span>
      )}
    </form>
  );
}
