"use client";

import Image from "next/image";
import { Heart, MapPin, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { destinations } from "@/lib/destinations";
import { useAppStore } from "./app-store";

type FavoritesDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export function FavoritesDialog({ open, onOpenChange }: FavoritesDialogProps) {
  const { favorites, toggleFavorite } = useAppStore();
  const saved = destinations.filter((d) => favorites.includes(d.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border p-6">
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Heart className="size-5 fill-primary text-primary" /> Your Favorites
          </DialogTitle>
          <DialogDescription>
            {saved.length > 0
              ? `${saved.length} ${saved.length === 1 ? "place" : "places"} saved to your wishlist.`
              : "Tap the heart on any destination to build your wishlist."}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {saved.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {saved.map((d) => (
                <li key={d.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                  <Image
                    src={d.image || "/placeholder.svg"}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{d.name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {d.city}, {d.country}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-primary text-primary" /> {d.rating} · from ${d.priceFrom}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(d.id)}
                    aria-label={`Remove ${d.name} from favorites`}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-primary hover:bg-muted"
                  >
                    <Heart className="size-5 fill-primary" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Heart className="size-7" />
              </span>
              <p className="font-medium">No favorites yet</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Explore destinations and tap the heart to save the ones you love.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
