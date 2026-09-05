"use client";

import { useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { categories as allCategories, countries, destinations, type Category } from "@/lib/destinations";
import { cn } from "@/lib/utils";
import { AppStoreProvider, useAppStore } from "./app-store";
import { ThemeProvider } from "./theme-provider";
import { Navbar } from "./navbar";
import { SearchBar } from "./search-bar";
import { HeroCarousel } from "./hero-carousel";
import { CountryRow } from "./country-row";
import { DestinationSection } from "./destination-section";
import { SideDrawer } from "./side-drawer";
import { FavoritesDialog } from "./favorites-dialog";
import { ProfilePanel } from "./profile-panel";
import { NotificationsDialog } from "./notifications-dialog";

function HomeInner() {
  const { profile, favorites } = useAppStore();

  const [query, setQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [menuOpen, setMenuOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      if (activeCountry && d.countryId !== activeCountry) return false;
      if (activeCategory !== "All" && !d.categories.includes(activeCategory as Category)) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [query, activeCountry, activeCategory]);

  const recommended = useMemo(() => {
    return [...filtered]
      .sort((a, b) => {
        const aFav = favorites.includes(a.id) ? 1 : 0;
        const bFav = favorites.includes(b.id) ? 1 : 0;
        if (aFav !== bFav) return bFav - aFav;
        const aHome = a.country === profile.nationality ? 1 : 0;
        const bHome = b.country === profile.nationality ? 1 : 0;
        if (aHome !== bHome) return bHome - aHome;
        return b.rating - a.rating;
      })
      .slice(0, 8);
  }, [filtered, favorites, profile.nationality]);

  const popular = useMemo(() => [...filtered].sort((a, b) => b.popularity - a.popularity), [filtered]);

  const activeCountryName = activeCountry ? countries.find((c) => c.id === activeCountry)?.name : null;
  const hasFilters = Boolean(query || activeCountry || activeCategory !== "All");

  function clearFilters() {
    setQuery("");
    setActiveCountry(null);
    setActiveCategory("All");
  }

  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar
        onOpenMenu={() => setMenuOpen(true)}
        onOpenFavorites={() => setFavOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenNotifications={() => setNotifOpen(true)}
      />

      <main className="flex flex-col gap-14 pb-20">
        <HeroCarousel>
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSelectDestination={(countryId) => {
              setActiveCountry(countryId);
              setActiveCategory("All");
            }}
          />
        </HeroCarousel>

        <CountryRow activeCountry={activeCountry} onSelect={setActiveCountry} />

        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 md:px-8">
          {allCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-sm font-medium text-primary hover:underline"
            >
              Reset all
            </button>
          ) : null}
        </div>

        {activeCountryName || query ? (
          <div className="mx-auto -mt-8 flex w-full max-w-7xl items-center gap-2 px-4 text-sm text-muted-foreground md:px-8">
            <Compass className="size-4 text-primary" />
            Showing results
            {activeCountryName ? <span className="font-medium text-foreground"> in {activeCountryName}</span> : null}
            {query ? <span className="font-medium text-foreground"> for &ldquo;{query}&rdquo;</span> : null}
          </div>
        ) : null}

        <DestinationSection
          id="recommended"
          eyebrow="Handpicked for you"
          title="Recommended destinations"
          description="Curated picks based on ratings, your saved places, and where fellow travelers are headed."
          items={recommended}
        />

        <DestinationSection
          id="popular"
          eyebrow="Trending now"
          title="Popular right now"
          description="The most-visited spots travelers can't stop talking about this season."
          items={popular}
        />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
          <span className="flex items-center gap-2 font-display font-semibold text-foreground">
            <Compass className="size-4 text-primary" /> Wander
          </span>
          <p>Discover the world, one destination at a time.</p>
          <p>&copy; {new Date().getFullYear()} Wander Travel</p>
        </div>
      </footer>

      <SideDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
        onOpenFavorites={() => setFavOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenNotifications={() => setNotifOpen(true)}
      />
      <FavoritesDialog open={favOpen} onOpenChange={setFavOpen} />
      <ProfilePanel open={profileOpen} onOpenChange={setProfileOpen} />
      <NotificationsDialog open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  );
}

export function TravelHome() {
  return (
    <ThemeProvider>
      <AppStoreProvider>
        <HomeInner />
      </AppStoreProvider>
    </ThemeProvider>
  );
}
