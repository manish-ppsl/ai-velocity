import { AppLayout } from "@/components/AppLayout";
import { mockToolUsage } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Database, DollarSign, AlertTriangle } from "lucide-react";

const CostOptimization = () => {
  const totalCost = mockToolUsage.reduce((s, t) => s + t.cost, 0);
  const totalLicenses = mockToolUsage.reduce((s, t) => s + t.licenses, 0);
  const totalActive = mockToolUsage.reduce((s, t) => s + t.active, 0);
  const totalIdle = mockToolUsage.reduce((s, t) => s + t.idle, 0);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Database className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Cost & Licenses</h1>
          </div>
          <p className="text-sm text-muted-foreground">Tool-level cost tracking, license utilization, and ROI analysis</p>
        </motion.div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Monthly Cost', value: `$${(totalCost).toLocaleString()}`, icon: DollarSign, color: 'text-primary' },
            { label: 'Total Licenses', value: totalLicenses, icon: Database, color: 'text-foreground' },
            { label: 'Active Licenses', value: totalActive, icon: Database, color: 'text-accent' },
            { label: 'Idle Licenses', value: totalIdle, icon: AlertTriangle, color: 'text-glow-warning' },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className={cn("w-4 h-4", kpi.color)} />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              </div>
              <div className={cn("font-mono text-2xl font-bold", kpi.color)}>{kpi.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Tool breakdown table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Tool-Level Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {['Tool', 'Licenses', 'Active', 'Idle', 'Monthly Cost', 'Cost/PR', 'Tokens Used', 'ROI'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockToolUsage.map((tool, i) => (
                  <tr key={tool.tool} className={cn("border-b border-border/30 hover:bg-secondary/30 transition-colors", i === 0 && "bg-primary/5")}>
                    <td className="py-3 px-4 font-semibold text-foreground">{tool.tool}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{tool.licenses}</td>
                    <td className="py-3 px-4 font-mono text-accent">{tool.active}</td>
                    <td className="py-3 px-4 font-mono text-glow-warning">{tool.idle}</td>
                    <td className="py-3 px-4 font-mono text-foreground">${tool.cost.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">${(tool.cost / tool.prs).toFixed(2)}</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">{(tool.tokens / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-4"><span className={cn("font-mono font-semibold", tool.roi >= 3 ? "text-accent" : tool.roi >= 2 ? "text-foreground" : "text-destructive")}>{tool.roi}x</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Idle license alerts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-glow-warning" /> Idle License Alerts</h3>
          <div className="space-y-2">
            {mockToolUsage.filter(t => t.idle > 10).map(tool => (
              <div key={tool.tool} className="flex items-center justify-between p-3 rounded-lg bg-glow-warning/5 border border-glow-warning/20">
                <div>
                  <div className="text-xs font-medium text-foreground">{tool.idle} idle {tool.tool} licenses</div>
                  <div className="text-[10px] text-muted-foreground">Estimated waste: ${(tool.idle * (tool.cost / tool.licenses)).toFixed(0)}/month</div>
                </div>
                <button className="text-[10px] font-medium text-primary hover:text-primary/80 transition-colors">Reallocate →</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default CostOptimization;
