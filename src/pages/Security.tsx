import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, CheckCircle, Lock, Eye } from "lucide-react";

const securityItems = [
  { label: 'RBAC Enforcement', status: 'active', description: 'Role-based access control active across all entities', icon: Lock },
  { label: 'API Key Rotation', status: 'warning', description: '3 API keys older than 90 days — rotation recommended', icon: AlertTriangle },
  { label: 'Audit Logging', status: 'active', description: 'All data access and modifications logged', icon: Eye },
  { label: 'Sensitive Module Guard', status: 'active', description: 'AI changes to sensitive repos require manual approval', icon: Shield },
  { label: 'Data Purge Controls', status: 'active', description: 'Soft delete enabled, hard delete requires Super Admin', icon: Lock },
  { label: 'Entity Isolation', status: 'active', description: 'Cross-entity data access blocked at API layer', icon: Shield },
];

const recentAudit = [
  { action: 'Data Export', user: 'Sarah Chen', entity: 'Paytm', time: '2h ago', risk: 'low' },
  { action: 'API Key Regenerated', user: 'Admin', entity: 'PPSL', time: '5h ago', risk: 'medium' },
  { action: 'Bulk Purge (30d)', user: 'Super Admin', entity: 'PML', time: '1d ago', risk: 'high' },
  { action: 'Role Changed', user: 'Admin', entity: 'OCL', time: '2d ago', risk: 'medium' },
  { action: 'New Entity Onboarded', user: 'Super Admin', entity: 'PayPay', time: '3d ago', risk: 'low' },
];

const Security = () => (
  <AppLayout>
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Security</h1>
        </div>
        <p className="text-sm text-muted-foreground">RBAC, audit logs, data governance, and access controls</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityItems.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <item.icon className={cn("w-5 h-5", item.status === 'active' ? "text-accent" : "text-glow-warning")} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                <span className={cn("text-[10px] font-mono", item.status === 'active' ? "text-accent" : "text-glow-warning")}>{item.status}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Audit Log</h3>
        <div className="space-y-2">
          {recentAudit.map((entry, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">{entry.action}</div>
                <div className="text-[10px] text-muted-foreground">{entry.user} · {entry.entity}</div>
              </div>
              <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full",
                entry.risk === 'low' ? "bg-accent/15 text-accent" : entry.risk === 'medium' ? "bg-glow-warning/15 text-glow-warning" : "bg-destructive/15 text-destructive")}>{entry.risk}</span>
              <span className="text-[10px] text-muted-foreground">{entry.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </AppLayout>
);

export default Security;
