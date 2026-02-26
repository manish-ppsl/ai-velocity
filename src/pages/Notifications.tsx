import { AppLayout } from "@/components/AppLayout";
import { mockNotifications, Notification } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bell, AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

const iconMap = { alert: AlertCircle, info: Info, warning: AlertTriangle, success: CheckCircle };
const colorMap = { alert: "text-destructive", info: "text-primary", warning: "text-glow-warning", success: "text-accent" };

const Notifications = () => {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? mockNotifications : filter === 'unread' ? mockNotifications.filter(n => !n.read) : mockNotifications.filter(n => n.type === filter);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <span className="px-2 py-0.5 rounded-full bg-destructive/15 text-destructive text-[10px] font-mono">{mockNotifications.filter(n => !n.read).length} unread</span>
          </div>
          <p className="text-sm text-muted-foreground">Alerts, updates, and system notifications</p>
        </motion.div>

        <div className="flex gap-1 flex-wrap">
          {['all', 'unread', 'alert', 'warning', 'success', 'info'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-3 py-1.5 text-[10px] font-medium rounded-full transition-all capitalize",
                filter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground bg-secondary/50")}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((n, i) => {
            const Icon = iconMap[n.type];
            return (
              <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className={cn("flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-secondary/30",
                  !n.read && "glass-card-glow")}>
                <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", colorMap[n.type])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{n.title}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
