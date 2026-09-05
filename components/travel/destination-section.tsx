"use client";

import { Compass } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import { DestinationCard } from "./destination-card";

type DestinationSectionProps = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: Destination[];
};

export function DestinationSection({ id, eyebrow, title, description, items }: DestinationSectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 md:px-8">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</span>
        <h2 className="font-display text-2xl font-bold md:text-3xl text-balance">{title}</h2>
        <p className="max-w-2xl text-muted-foreground text-pretty">{description}</p>
      </div>

      {items.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Compass className="size-6" />
          </span>
          <p className="font-medium">No destinations match your search</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different country, category, or clear your filters to see everything.
          </p>
        </div>
      )}
    </section>
  );
}
