import { mockToolUsage } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const toolColors: Record<string, string> = {
  Cursor: "bg-primary",
  Kiro: "bg-accent",
  Antigravity: "bg-glow-purple",
  Others: "bg-muted-foreground",
};

export function ToolBreakdown() {
  const total = mockToolUsage.reduce((s, t) => s + t.usage, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">AI Tool Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Usage distribution & ROI per tool</p>
      </div>

      {/* Bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5">
        {mockToolUsage.map((t) => (
          <div
            key={t.tool}
            className={cn("transition-all", toolColors[t.tool])}
            style={{ width: `${(t.usage / total) * 100}%` }}
          />
        ))}
      </div>

      {/* Details */}
      <div className="space-y-3">
        {mockToolUsage.map((t, i) => (
          <motion.div
            key={t.tool}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className={cn("w-2.5 h-2.5 rounded-full", toolColors[t.tool])} />
              <span className="text-xs text-foreground">{t.tool}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{t.usage}%</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
              <span>{t.prs.toLocaleString()} PRs</span>
              <span className={cn(
                "px-1.5 py-0.5 rounded",
                t.roi >= 3 ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"
              )}>
                {t.roi}x ROI
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
