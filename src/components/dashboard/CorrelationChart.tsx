import { mockCorrelationData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

export function CorrelationChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Contribution Correlation</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Bitbucket PRs vs AI-Generated Lines</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" /> PRs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" /> AI Lines
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={mockCorrelationData}>
          <defs>
            <linearGradient id="gradientPRs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientAI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(165, 80%, 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(165, 80%, 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 41%, 10%)',
              border: '1px solid hsl(222, 30%, 18%)',
              borderRadius: '8px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono',
            }}
            labelStyle={{ color: 'hsl(210, 40%, 92%)' }}
          />
          <Area yAxisId="left" type="monotone" dataKey="bitbucketPRs" stroke="hsl(189, 100%, 50%)" fill="url(#gradientPRs)" strokeWidth={2} />
          <Area yAxisId="right" type="monotone" dataKey="aiLines" stroke="hsl(165, 80%, 45%)" fill="url(#gradientAI)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
