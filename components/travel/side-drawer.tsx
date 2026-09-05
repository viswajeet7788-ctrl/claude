"use client";

import { useEffect } from "react";
import { Bell, Compass, Heart, Sparkles, TrendingUp, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/destinations";

type SideDrawerProps = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly activeCategory: string;
  readonly onCategory: (c: string) => void;
  readonly onOpenFavorites: () => void;
  readonly onOpenProfile: () => void;
  readonly onOpenNotifications: () => void;
};

export function SideDrawer({
  open,
  onClose,
  activeCategory,
  onCategory,
  onOpenFavorites,
  onOpenProfile,
  onOpenNotifications,
}: SideDrawerProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[300px] max-w-[85vw] flex-col bg-card shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <span className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Compass className="size-5" />
            </span>
            <span className="font-display text-xl font-bold">Wander</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Discover</p>
          <div className="mt-2 flex flex-col gap-1">
            <a href="#recommended" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <Sparkles className="size-4.5 text-primary" /> Recommended
            </a>
            <a href="#popular" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <TrendingUp className="size-4.5 text-primary" /> Popular
            </a>
          </div>

          <p className="mt-6 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categories</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onCategory(c);
                  onClose();
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="mt-6 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</p>
          <div className="mt-2 flex flex-col gap-1">
            <button type="button" onClick={() => { onOpenProfile(); onClose(); }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium hover:bg-muted">
              <User className="size-4.5" /> Profile
            </button>
            <button type="button" onClick={() => { onOpenFavorites(); onClose(); }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium hover:bg-muted">
              <Heart className="size-4.5" /> Favorites
            </button>
            <button type="button" onClick={() => { onOpenNotifications(); onClose(); }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium hover:bg-muted">
              <Bell className="size-4.5" /> Notifications
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
