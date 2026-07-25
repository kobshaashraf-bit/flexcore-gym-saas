import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  CircleAlert,
  CircleCheck,
  Info,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/hooks/useNotifications";
import { relativeTime, cn } from "@/lib/utils";
import type { NotificationItem } from "@/types";

const iconMap: Record<NotificationItem["type"], typeof Info> = {
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
  error: CircleAlert,
};

const colorMap: Record<NotificationItem["type"], string> = {
  info: "text-blue-500 bg-blue-500/10",
  warning: "text-amber-500 bg-amber-500/10",
  success: "text-emerald-500 bg-emerald-500/10",
  error: "text-red-500 bg-red-500/10",
};

type FilterTab = "all" | "unread" | "info" | "warning" | "success" | "error";

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, remove } = useNotifications();
  const [tab, setTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return notifications;
    if (tab === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === tab);
  }, [notifications, tab]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`}
        actions={
          <Button variant="outline" className="gap-2" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4" /> Mark all as read
          </Button>
        }
      />

      <Card className="surface-card">
        <div className="border-b border-border p-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="warning">Warning</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
              <TabsTrigger value="error">Error</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">You're all caught up — nothing to see here.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((notification, i) => {
                const Icon = iconMap[notification.type];
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={cn(
                      "group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-surface-hover",
                      !notification.read && "bg-primary-50/60 dark:bg-primary-500/[0.06]"
                    )}
                  >
                    <div className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full", colorMap[notification.type])}>
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-foreground">{notification.title}</p>
                        {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{notification.description}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground/70">{relativeTime(notification.timestamp)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Mark "${notification.title}" as read`}
                          title="Mark as read"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete "${notification.title}"`}
                        title="Delete"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => remove(notification.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
