import { NavLink as RouterNavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Gamepad2,
  Bot,
  Settings,
  BarChart3,
  Shield,
  Bell,
  Database,
  Users,
  ChevronLeft,
  ChevronRight,
  Zap,
  Plug,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "Core",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
      { to: "/gamification", icon: Gamepad2, label: "Gamification" },
      { to: "/ai-insights", icon: Bot, label: "AI Insights" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/cost-optimization", icon: Database, label: "Cost & Licenses" },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/teams", icon: Users, label: "Teams" },
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/security", icon: Shield, label: "Security" },
      { to: "/integrations", icon: Plug, label: "Integrations" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-foreground tracking-tight">AI Telemetry</h1>
            <p className="text-[10px] text-muted-foreground">Engineering Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </RouterNavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
