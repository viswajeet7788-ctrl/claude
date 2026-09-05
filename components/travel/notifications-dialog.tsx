"use client";

import { useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAppStore } from "./app-store";

type NotificationsDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  const { notifications, markAllRead, unreadCount } = useAppStore();

  useEffect(() => {
    if (open && unreadCount > 0) {
      const t = setTimeout(markAllRead, 900);
      return () => clearTimeout(t);
    }
  }, [open, unreadCount, markAllRead]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="border-b border-border p-6">
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Bell className="size-5 text-primary" /> Notifications
          </DialogTitle>
          <DialogDescription>Trip alerts, price drops, and travel updates.</DialogDescription>
        </DialogHeader>
        <ul className="flex max-h-[60vh] flex-col overflow-y-auto p-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={cn(
                "flex gap-3 rounded-2xl p-3 transition-colors",
                !n.read && "bg-accent/60",
              )}
            >
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  n.read ? "bg-transparent" : "bg-primary",
                )}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
