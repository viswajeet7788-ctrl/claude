"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { destinations } from "@/lib/destinations";

type SearchBarProps = {
  readonly query: string;
  readonly onQueryChange: (value: string) => void;
  readonly onSelectDestination: (countryId: string) => void;
};

export function SearchBar({ query, onQueryChange, onSelectDestination }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(query);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const suggestions = useMemo(() => {
    const q = draft.trim().toLowerCase();
    if (!q) return [];
    return destinations
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.categories.some((c) => c.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [draft]);

  function commit(value: string) {
    onQueryChange(value);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commit(draft);
        }}
        className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-lg shadow-black/5 focus-within:ring-2 focus-within:ring-ring"
      >
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              commit(draft);
            }
          }}
          placeholder="Search destinations, cities, or experiences..."
          aria-label="Search destinations"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base"
        />
        {draft ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setDraft("");
              commit("");
            }}
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        ) : null}
        <button
          type="submit"
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:block"
        >
          Search
        </button>
      </form>

      {open && suggestions.length > 0 ? (
        <ul className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-xl">
          {suggestions.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => {
                  onSelectDestination(d.countryId);
                  commit("");
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-muted",
                )}
              >
                <Image
                  src={d.image || "/placeholder.svg"}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">{d.name}</span>
                  <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {d.city}, {d.country}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
