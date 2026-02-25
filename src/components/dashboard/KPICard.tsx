import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  variant?: "default" | "primary" | "accent" | "warning";
}

const variantStyles = {
  default: "border-border/50",
  primary: "border-primary/30 glass-card-glow",
  accent: "border-accent/30",
  warning: "border-glow-warning/30",
};

const iconVariants = {
  default: "bg-secondary text-muted-foreground",
  primary: "bg-primary/15 text-primary",
  accent: "bg-accent/15 text-accent",
  warning: "bg-glow-warning/15 text-glow-warning",
};

export function KPICard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("glass-card rounded-xl p-5", variantStyles[variant])}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconVariants[variant])}>
          <Icon className="w-4 h-4" />
        </div>
        {trend !== undefined && (
          <span className={cn(
            "text-xs font-mono font-medium px-2 py-0.5 rounded-full",
            trend > 0 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div className="font-mono text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{title}</div>
      {subtitle && <div className="text-[10px] text-muted-foreground/60 mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}
