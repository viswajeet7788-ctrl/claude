"use client";

import { useEffect, useState } from "react";
import { Check, Globe, Heart, Mail, MapPin, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { nationalities } from "@/lib/destinations";
import { useAppStore } from "./app-store";

type ProfilePanelProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export function ProfilePanel({ open, onOpenChange }: ProfilePanelProps) {
  const { profile, updateProfile, favorites } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    if (open) {
      setDraft(profile);
      setEditing(false);
    }
  }, [open, profile]);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  function save() {
    updateProfile(draft);
    setEditing(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <div className="relative h-28 bg-gradient-to-br from-primary to-accent-foreground/40">
          <div className="absolute -bottom-9 left-6 flex size-18 items-center justify-center rounded-2xl border-4 border-card bg-accent font-display text-2xl font-bold text-accent-foreground">
            {initials}
          </div>
        </div>

        <DialogHeader className="px-6 pb-2 pt-12 text-left">
          <DialogTitle className="font-display text-xl">{profile.name}</DialogTitle>
          <DialogDescription>Manage your traveler profile and preferences.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 pb-6">
          {editing ? (
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Name
                <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Email
                <Input
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Home city
                <Input value={draft.homeCity} onChange={(e) => setDraft({ ...draft, homeCity: e.target.value })} />
              </label>
              <div className="flex flex-col gap-1 text-sm font-medium">
                Nationality
                <Select value={draft.nationality} onValueChange={(v) => setDraft({ ...draft, nationality: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button
                type="button"
                onClick={save}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Check className="size-4" /> Save changes
              </button>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="size-4.5 shrink-0 text-muted-foreground" />
                  <span className="text-foreground">{profile.email}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4.5 shrink-0 text-muted-foreground" />
                  <span className="text-foreground">{profile.homeCity}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Globe className="size-4.5 shrink-0 text-muted-foreground" />
                  <span className="text-foreground">{profile.nationality}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Heart className="size-4.5 shrink-0 text-muted-foreground" />
                  <span className="text-foreground">
                    {favorites.length} saved {favorites.length === 1 ? "destination" : "destinations"}
                  </span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                <Pencil className="size-4" /> Edit profile
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
