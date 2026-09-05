"use client";

import Image from "next/image";
import { Heart, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Destination } from "@/lib/destinations";
import { useAppStore } from "./app-store";

export function DestinationCard({ destination }: { readonly destination: Destination }) {
  const { isFavorite, toggleFavorite } = useAppStore();
  const favorited = isFavorite(destination.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={`${destination.name} in ${destination.country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <Badge className="absolute left-3 top-3 border-0 bg-background/85 text-foreground backdrop-blur-sm">
          {destination.categories[0]}
        </Badge>
        <button
          type="button"
          onClick={() => toggleFavorite(destination.id)}
          aria-pressed={favorited}
          aria-label={favorited ? `Remove ${destination.name} from favorites` : `Save ${destination.name} to favorites`}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "size-4.5 transition-colors",
              favorited ? "fill-primary text-primary" : "text-foreground",
            )}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          <Star className="size-3.5 fill-primary text-primary" />
          {destination.rating}
          <span className="text-muted-foreground">({destination.reviews.toLocaleString()})</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-balance">{destination.name}</h3>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {destination.city}, {destination.country}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{destination.blurb}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            from <span className="text-base font-semibold text-foreground">${destination.priceFrom}</span>
          </p>
          <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
            Explore &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
