"use client";

import { Bell, Compass, Heart, Menu, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "./app-store";
import { useTheme } from "./theme-provider";

type NavbarProps = {
  readonly onOpenMenu: () => void;
  readonly onOpenFavorites: () => void;
  readonly onOpenProfile: () => void;
  readonly onOpenNotifications: () => void;
};

export function Navbar({ onOpenMenu, onOpenFavorites, onOpenProfile, onOpenNotifications }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { favorites, unreadCount, profile } = useAppStore();

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <Menu className="size-5" />
          </button>
          <a href="#top" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Compass className="size-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">Wander</span>
          </a>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <a href="#recommended" className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Recommended
          </a>
          <a href="#popular" className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Popular
          </a>
          <button
            type="button"
            onClick={onOpenMenu}
            className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            More
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <Bell className="size-5" />
            {unreadCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={onOpenFavorites}
            aria-label={`Favorites${favorites.length ? `, ${favorites.length} saved` : ""}`}
            className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <Heart className={cn("size-5", favorites.length > 0 && "fill-primary text-primary")} />
            {favorites.length > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Open profile"
            className="ml-1 flex size-10 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            {initials}
          </button>
        </div>
      </nav>
    </header>
  );
}
