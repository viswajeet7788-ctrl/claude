"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Profile = {
  name: string;
  email: string;
  nationality: string;
  homeCity: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  read: boolean;
};

const defaultProfile: Profile = {
  name: "Alex Rivera",
  email: "alex.rivera@wander.travel",
  nationality: "United States",
  homeCity: "San Francisco",
};

const defaultNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Price drop on Amalfi Coast",
    body: "Stays near Positano are 18% off this week.",
    read: false,
  },
  {
    id: "n2",
    title: "New guides for Japan",
    body: "Cherry blossom season itineraries just landed.",
    read: false,
  },
  {
    id: "n3",
    title: "Your saved trip to Banff",
    body: "3 travelers viewed Moraine Lake tours today.",
    read: true,
  },
];

type AppStoreValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => void;
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
};

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { readonly children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [notifications, setNotifications] = useState<AppNotification[]>(defaultNotifications);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("wander-favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      const savedProfile = localStorage.getItem("wander-profile");
      if (savedProfile) setProfile((p) => ({ ...p, ...JSON.parse(savedProfile) }));
    } catch {
      /* ignore */
    }
  }, []);

  const persistFavorites = useCallback((next: string[]) => {
    try {
      localStorage.setItem("wander-favorites", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem("wander-profile", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      profile,
      updateProfile,
      notifications,
      unreadCount,
      markAllRead,
    }),
    [favorites, isFavorite, toggleFavorite, profile, updateProfile, notifications, unreadCount, markAllRead],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
