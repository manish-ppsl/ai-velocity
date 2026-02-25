import { mockHeatmapData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function getHeatColor(value: number): string {
  if (value >= 85) return "bg-primary/80";
  if (value >= 70) return "bg-primary/50";
  if (value >= 55) return "bg-primary/30";
  if (value >= 40) return "bg-primary/15";
  return "bg-primary/5";
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function AIAdoptionHeatmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground">AI Adoption Heatmap</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Entity-level AI usage intensity by day</p>
      </div>

      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-20" />
          {days.map((d) => (
            <div key={d} className="flex-1 text-center text-[10px] font-mono text-muted-foreground">
              {d}
            </div>
          ))}
        </div>

        {/* Rows */}
        {mockHeatmapData.map((row, i) => (
          <motion.div
            key={row.entity}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-2"
          >
            <div className="w-20 text-xs text-muted-foreground truncate">{row.entity}</div>
            {[row.mon, row.tue, row.wed, row.thu, row.fri].map((val, j) => (
              <div
                key={j}
                className={cn("flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-mono transition-all hover:scale-105 cursor-default", getHeatColor(val))}
                title={`${val}%`}
              >
                {val}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-4">
        <span className="text-[10px] text-muted-foreground mr-1">Low</span>
        {[5, 15, 30, 50, 80].map((opacity) => (
          <div key={opacity} className={`w-4 h-3 rounded-sm bg-primary/${opacity}`} />
        ))}
        <span className="text-[10px] text-muted-foreground ml-1">High</span>
      </div>
    </motion.div>
  );
}
