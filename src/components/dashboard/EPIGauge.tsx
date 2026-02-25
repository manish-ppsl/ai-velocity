import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EPIGaugeProps {
  value: number;
}

export function EPIGauge({ value }: EPIGaugeProps) {
  const percentage = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-xl p-6 flex flex-col items-center"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1">Engineering Productivity Index</h3>
      <p className="text-xs text-muted-foreground mb-6">Composite strategic KPI</p>

      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(222, 30%, 14%)" strokeWidth="8" />
          <motion.circle
            cx="70" cy="70" r="60" fill="none"
            stroke="url(#epiGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="epiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(189, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(165, 80%, 45%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold gradient-text">{value}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 w-full text-center">
        {[
          { label: "Velocity", value: "92" },
          { label: "Quality", value: "94" },
          { label: "Adoption", value: "76" },
        ].map((m) => (
          <div key={m.label}>
            <div className="text-sm font-mono font-semibold text-foreground">{m.value}</div>
            <div className="text-[10px] text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
