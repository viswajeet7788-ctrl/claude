"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/destinations";

type CountryRowProps = {
  readonly activeCountry: string | null;
  readonly onSelect: (id: string | null) => void;
};

export function CountryRow({ activeCountry, onSelect }: CountryRowProps) {
  return (
    <section aria-label="Browse by country" className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-xl font-semibold md:text-2xl">Explore by country</h2>
        {activeCountry ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {countries.map((country) => {
          const active = activeCountry === country.id;
          return (
            <button
              key={country.id}
              type="button"
              onClick={() => onSelect(active ? null : country.id)}
              aria-pressed={active}
              className="flex shrink-0 flex-col items-center gap-2 focus:outline-none"
            >
              <span
                className={cn(
                  "relative flex size-18 items-center justify-center overflow-hidden rounded-full p-0.5 ring-2 transition-all md:size-20",
                  active ? "ring-primary" : "ring-transparent hover:ring-border",
                )}
              >
                <Image
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  width={80}
                  height={80}
                  className="size-full rounded-full object-cover"
                />
              </span>
              <span
                className={cn(
                  "text-xs font-medium transition-colors md:text-sm",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {country.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
