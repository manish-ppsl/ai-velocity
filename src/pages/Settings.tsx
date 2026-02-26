import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Key, GitBranch, Tag, Bell, Database, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const settingSections = [
  {
    title: 'Bitbucket Integration', icon: GitBranch, items: [
      { label: 'Workspace', value: 'paytm-engineering', type: 'text' },
      { label: 'Sync Frequency', value: 'Every 15 minutes', type: 'select' },
      { label: 'Last Sync', value: '4 minutes ago', type: 'status' },
    ]
  },
  {
    title: 'AI Tool Configuration', icon: Key, items: [
      { label: 'Cursor API Key', value: '••••••••sk-cur-8f2a', type: 'secret' },
      { label: 'Kiro API Key', value: '••••••••kr-9b3c', type: 'secret' },
      { label: 'Antigravity API Key', value: '••••••••ag-4d1e', type: 'secret' },
    ]
  },
  {
    title: 'Commit Tagging Rules', icon: Tag, items: [
      { label: 'AI Full (Cursor)', value: '[AI-FULL-CURSOR]', type: 'tag' },
      { label: 'AI Full (Kiro)', value: '[AI-KIRO]', type: 'tag' },
      { label: 'AI Partial', value: '[AI-PARTIAL]', type: 'tag' },
      { label: 'AI Antigravity', value: '[AI-ANTIGRAVITY]', type: 'tag' },
    ]
  },
  {
    title: 'Notification Preferences', icon: Bell, items: [
      { label: 'Email Alerts', value: 'Enabled', type: 'toggle' },
      { label: 'Weekly Digest', value: 'Enabled', type: 'toggle' },
      { label: 'Low Adoption Alert', value: 'Enabled', type: 'toggle' },
      { label: 'High Revert Alert', value: 'Enabled', type: 'toggle' },
    ]
  },
  {
    title: 'Data Governance', icon: Database, items: [
      { label: 'Soft Delete', value: 'Enabled', type: 'toggle' },
      { label: 'Retention Period', value: '365 days', type: 'select' },
      { label: 'Purge Access', value: 'Super Admin Only', type: 'text' },
    ]
  },
  {
    title: 'RBAC Configuration', icon: Users, items: [
      { label: 'Roles', value: 'Super Admin, Entity Admin, Team Lead, Developer, Viewer', type: 'text' },
      { label: 'Scoped Data', value: 'Enabled', type: 'toggle' },
    ]
  },
];

const Settings = () => (
  <AppLayout>
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
        <p className="text-sm text-muted-foreground">Platform configuration, integrations, and policies</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingSections.map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.05 }}
            className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <section.icon className="w-4 h-4 text-primary" /> {section.title}
            </h3>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={cn("text-xs font-mono",
                    item.type === 'secret' ? "text-muted-foreground" :
                    item.type === 'tag' ? "text-primary" :
                    item.type === 'status' ? "text-accent" :
                    item.value === 'Enabled' ? "text-accent" : "text-foreground")}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default Settings;
