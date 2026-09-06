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
import {
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS,
  type AppNotification,
  type Expense,
  type ExpenseCategory,
} from "@/lib/os-data";

export type Profile = {
  name: string;
  age: number;
  nationality: string;
  homeCity: string;
  preferences: string[];
};

export type Trip = {
  destination: string;
  city: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
};

export type MapPinKind = "planned" | "visited" | "favorite" | "booked" | "recommended";

export type MapPin = {
  id: string;
  label: string;
  type: string; // Hotel / Restaurant / Temple ...
  kind: MapPinKind;
  x: number; // 0-100 percentage on the stylized map
  y: number;
};

export type JourneyEntry = {
  id: string;
  label: string;
  type: string;
  time?: string;
};

const STORAGE_KEY = "odyssey-state-v1";

type PersistShape = {
  profile: Profile;
  trip: Trip;
  favorites: string[];
  expenses: Expense[];
  budgetTotal: number;
  pins: MapPin[];
  journey: JourneyEntry[];
  readNotifications: string[];
};

const DEFAULT_PROFILE: Profile = {
  name: "Alex Rivera",
  age: 28,
  nationality: "India",
  homeCity: "Mumbai",
  preferences: ["Culture", "Food", "Nature"],
};

const DEFAULT_TRIP: Trip = {
  destination: "Japan",
  city: "Kyoto",
  startDate: isoOffset(-4),
  endDate: isoOffset(8),
};

const DEFAULT_PINS: MapPin[] = [
  { id: "mp1", label: "Sakura Ryokan", type: "Hotel", kind: "booked", x: 42, y: 58 },
  { id: "mp2", label: "Fushimi Inari", type: "Temple", kind: "planned", x: 68, y: 34 },
  { id: "mp3", label: "Kaiseki Hana", type: "Restaurant", kind: "visited", x: 30, y: 40 },
  { id: "mp4", label: "Bamboo Grove", type: "Place", kind: "recommended", x: 78, y: 66 },
];

const DEFAULT_JOURNEY: JourneyEntry[] = [
  { id: "j1", label: "Arrived in Kyoto", type: "Travel", time: "Day 1" },
  { id: "j2", label: "Kaiseki Hana dinner", type: "Food", time: "Day 1" },
  { id: "j3", label: "Fushimi Inari sunrise", type: "Temple", time: "Day 2" },
  { id: "j4", label: "Bamboo Grove walk", type: "Place", time: "Day 3" },
];

function isoOffset(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86_400_000);
}

type StoreValue = {
  hydrated: boolean;
  profile: Profile;
  setProfile: (p: Profile) => void;
  trip: Trip;
  setTrip: (t: Trip) => void;
  daysLeft: number;
  tripLength: number;

  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  expenses: Expense[];
  addExpense: (label: string, category: ExpenseCategory, amount: number) => void;
  removeExpense: (id: string) => void;
  budgetTotal: number;
  setBudgetTotal: (n: number) => void;
  spent: number;
  remaining: number;

  pins: MapPin[];
  addPin: (pin: Omit<MapPin, "id" | "x" | "y"> & { x?: number; y?: number }) => void;
  updatePinKind: (id: string, kind: MapPinKind) => void;
  removePin: (id: string) => void;

  journey: JourneyEntry[];
  addJourney: (entry: Omit<JourneyEntry, "id">) => void;

  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { readonly children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);
  const [trip, setTripState] = useState<Trip>(DEFAULT_TRIP);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [budgetTotal, setBudgetTotalState] = useState<number>(150000);
  const [pins, setPins] = useState<MapPin[]>(DEFAULT_PINS);
  const [journey, setJourney] = useState<JourneyEntry[]>(DEFAULT_JOURNEY);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as Partial<PersistShape>;
        if (p.profile) setProfileState(p.profile);
        if (p.trip) setTripState(p.trip);
        if (p.favorites) setFavorites(new Set(p.favorites));
        if (p.expenses) setExpenses(p.expenses);
        if (typeof p.budgetTotal === "number") setBudgetTotalState(p.budgetTotal);
        if (p.pins) setPins(p.pins);
        if (p.journey) setJourney(p.journey);
        if (p.readNotifications) setReadNotifications(new Set(p.readNotifications));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistShape = {
      profile,
      trip,
      favorites: [...favorites],
      expenses,
      budgetTotal,
      pins,
      journey,
      readNotifications: [...readNotifications],
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore */
    }
  }, [hydrated, profile, trip, favorites, expenses, budgetTotal, pins, journey, readNotifications]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addExpense = useCallback((label: string, category: ExpenseCategory, amount: number) => {
    setExpenses((prev) => [{ id: `x-${Date.now()}`, label, category, amount }, ...prev]);
  }, []);

  const removeExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addPin = useCallback<StoreValue["addPin"]>((pin) => {
    setPins((prev) => [
      ...prev,
      {
        id: `mp-${Date.now()}`,
        label: pin.label,
        type: pin.type,
        kind: pin.kind,
        x: pin.x ?? 20 + Math.random() * 60,
        y: pin.y ?? 20 + Math.random() * 60,
      },
    ]);
  }, []);

  const updatePinKind = useCallback((id: string, kind: MapPinKind) => {
    setPins((prev) => prev.map((p) => (p.id === id ? { ...p, kind } : p)));
  }, []);

  const removePin = useCallback((id: string) => {
    setPins((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addJourney = useCallback<StoreValue["addJourney"]>((entry) => {
    setJourney((prev) => [{ id: `j-${Date.now()}`, ...entry }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setReadNotifications(new Set(INITIAL_NOTIFICATIONS.map((n) => n.id)));
  }, []);

  const markRead = useCallback((id: string) => {
    setReadNotifications((prev) => new Set(prev).add(id));
  }, []);

  const spent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const remaining = budgetTotal - spent;
  const daysLeft = Math.max(0, daysBetween(isoOffset(0), trip.endDate));
  const tripLength = Math.max(1, daysBetween(trip.startDate, trip.endDate));
  const unreadCount = INITIAL_NOTIFICATIONS.filter((n) => !readNotifications.has(n.id)).length;

  const value: StoreValue = {
    hydrated,
    profile,
    setProfile: setProfileState,
    trip,
    setTrip: setTripState,
    daysLeft,
    tripLength,
    favorites,
    toggleFavorite,
    isFavorite: (id) => favorites.has(id),
    expenses,
    addExpense,
    removeExpense,
    budgetTotal,
    setBudgetTotal: setBudgetTotalState,
    spent,
    remaining,
    pins,
    addPin,
    updatePinKind,
    removePin,
    journey,
    addJourney,
    notifications: INITIAL_NOTIFICATIONS,
    unreadCount,
    markAllRead,
    markRead,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
