import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plug, RefreshCw, Plus, Power, PowerOff, Clock, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useAiTools, useToggleTool, useSyncNow, useSyncState, useSystemConfig, useAddTool } from "@/hooks/useToolData";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

function CooldownTimer({ nextAllowed }: { nextAllowed: string | null }) {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    if (!nextAllowed) return;
    const update = () => {
      const diff = new Date(nextAllowed).getTime() - Date.now();
      if (diff <= 0) { setRemaining(''); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setRemaining(`${h}h ${m}m`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [nextAllowed]);

  if (!remaining) return null;
  return (
    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
      <Clock className="w-3 h-3" /> Next sync in {remaining}
    </span>
  );
}

function SyncStatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    completed: { icon: CheckCircle, color: 'text-accent', label: 'Synced' },
    failed: { icon: XCircle, color: 'text-destructive', label: 'Failed' },
    in_progress: { icon: Loader2, color: 'text-primary', label: 'Syncing...' },
    pending: { icon: AlertTriangle, color: 'text-glow-warning', label: 'Pending' },
  };
  const info = map[status] || map.pending;
  const Icon = info.icon;
  return (
    <span className={cn("flex items-center gap-1 text-[10px] font-mono", info.color)}>
      <Icon className={cn("w-3 h-3", status === 'in_progress' && "animate-spin")} /> {info.label}
    </span>
  );
}

function ToolCard({ tool, integration, index, onToggle, onSync, isSyncing }: any) {
  const { data: syncs } = useSyncState(tool.id);
  const lastSync = syncs?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn("glass-card rounded-xl p-6", tool.enabled && "glass-card-glow")}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            {tool.enabled ? <Power className="w-4 h-4 text-accent" /> : <PowerOff className="w-4 h-4 text-muted-foreground" />}
            {tool.display_name}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{tool.api_base_url || 'No URL configured'}</p>
        </div>
        <Switch checked={tool.enabled} onCheckedChange={onToggle} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-xs text-muted-foreground">API Key</span>
          <span className="text-xs font-mono text-muted-foreground">{integration?.api_key_secret_name || 'Not set'}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-xs text-muted-foreground">Sync Frequency</span>
          <span className="text-xs font-mono text-foreground">{integration?.sync_frequency_minutes ? `Every ${integration.sync_frequency_minutes / 60}h` : 'Daily'}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
          <span className="text-xs text-muted-foreground">Last Sync</span>
          <div className="flex items-center gap-2">
            {lastSync && <SyncStatusBadge status={lastSync.status} />}
            <span className="text-xs font-mono text-foreground">
              {integration?.last_sync_at ? new Date(integration.last_sync_at).toLocaleString() : 'Never'}
            </span>
          </div>
        </div>
        {lastSync?.error_message && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <span className="text-[10px] text-destructive">{lastSync.error_message}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
        <CooldownTimer nextAllowed={integration?.next_sync_allowed_at} />
        <Button
          size="sm"
          variant="outline"
          onClick={onSync}
          disabled={!tool.enabled || isSyncing}
          className="gap-1"
        >
          <RefreshCw className={cn("w-3 h-3", isSyncing && "animate-spin")} />
          Sync Now
        </Button>
      </div>
    </motion.div>
  );
}

function AddToolForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKeySecret, setApiKeySecret] = useState('');
  const addTool = useAddTool();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !displayName) return;
    addTool.mutate({
      name,
      display_name: displayName,
      api_base_url: apiUrl,
      api_key_secret_name: apiKeySecret,
      endpoints: [],
      field_mapping: {},
    }, {
      onSuccess: () => {
        toast({ title: 'Tool added', description: `${displayName} has been registered` });
        onClose();
      },
      onError: (e) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
    });
  };

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card rounded-xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Plus className="w-4 h-4 text-primary" /> Onboard New AI Tool
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs">Tool Name (unique key)</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. kiro" className="h-9 text-xs" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Display Name</Label>
          <Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="e.g. Kiro" className="h-9 text-xs" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">API Base URL</Label>
          <Input value={apiUrl} onChange={e => setApiUrl(e.target.value)} placeholder="https://api.example.com" className="h-9 text-xs" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">API Key Secret Name</Label>
          <Input value={apiKeySecret} onChange={e => setApiKeySecret(e.target.value)} placeholder="e.g. KIRO_API_KEY" className="h-9 text-xs" />
        </div>
        <div className="md:col-span-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" size="sm" disabled={addTool.isPending}>
            {addTool.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
            Register Tool
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

const Integrations = () => {
  const { data: tools, isLoading } = useAiTools();
  const toggleTool = useToggleTool();
  const syncNow = useSyncNow();
  const { data: config } = useSystemConfig();
  const [showAdd, setShowAdd] = useState(false);

  const handleToggle = (toolId: string, currentEnabled: boolean) => {
    toggleTool.mutate({ toolId, enabled: !currentEnabled }, {
      onSuccess: () => toast({ title: `Tool ${currentEnabled ? 'disabled' : 'enabled'}` }),
      onError: (e) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
    });
  };

  const handleSync = (toolId: string) => {
    syncNow.mutate(toolId, {
      onSuccess: (data: any) => toast({ title: 'Sync started', description: `Fetched ${data?.records_fetched || 0} records` }),
      onError: (e: any) => toast({ title: 'Sync failed', description: e?.message || 'Unknown error', variant: 'destructive' }),
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Plug className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
              </div>
              <p className="text-sm text-muted-foreground">Manage AI tool integrations, sync data, and configure API connections</p>
            </div>
            <Button size="sm" onClick={() => setShowAdd(!showAdd)} variant="outline">
              <Plus className="w-4 h-4 mr-1" /> Add Tool
            </Button>
          </div>
        </motion.div>

        {config && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Sync cooldown: <span className="font-mono text-foreground">{config.sync_cooldown_hours || 6}h</span></span>
            <span>Daily sync: <span className="font-mono text-foreground">{config.daily_sync_time || '02:00'} UTC</span></span>
          </div>
        )}

        {showAdd && <AddToolForm onClose={() => setShowAdd(false)} />}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(tools || []).map((tool: any, i: number) => {
              const integration = tool.tool_integrations?.[0];
              return (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  integration={integration}
                  index={i}
                  onToggle={() => handleToggle(tool.id, tool.enabled)}
                  onSync={() => handleSync(tool.id)}
                  isSyncing={syncNow.isPending}
                />
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Integrations;
