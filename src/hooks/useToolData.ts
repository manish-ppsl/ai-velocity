import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Period = '7d' | '30d' | '90d';

function periodToDate(period: Period): string {
  const d = new Date();
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function useAiTools() {
  return useQuery({
    queryKey: ['ai-tools'],
    queryFn: async () => {
      const { data, error } = await supabase.from('ai_tools').select('*, tool_integrations(*)');
      if (error) throw error;
      return data;
    },
  });
}

export function useProductivityData(toolId: string | null, period: Period = '30d') {
  return useQuery({
    queryKey: ['productivity-data', toolId, period],
    queryFn: async () => {
      let query = supabase.from('productivity_data').select('*').gte('date', periodToDate(period)).order('date', { ascending: true });
      if (toolId) query = query.eq('tool_id', toolId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useUsageData(toolId: string | null, period: Period = '30d') {
  return useQuery({
    queryKey: ['usage-data', toolId, period],
    queryFn: async () => {
      let query = supabase.from('usage_data').select('*').gte('date', periodToDate(period)).order('date', { ascending: true });
      if (toolId) query = query.eq('tool_id', toolId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useSpendData(toolId: string | null, period: Period = '30d') {
  return useQuery({
    queryKey: ['spend-data', toolId, period],
    queryFn: async () => {
      let query = supabase.from('spend_data').select('*').gte('date', periodToDate(period)).order('date', { ascending: true });
      if (toolId) query = query.eq('tool_id', toolId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useSyncState(toolId: string | null) {
  return useQuery({
    queryKey: ['sync-state', toolId],
    queryFn: async () => {
      let query = supabase.from('sync_state').select('*').order('started_at', { ascending: false }).limit(5);
      if (toolId) query = query.eq('tool_id', toolId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    refetchInterval: 10000, // poll every 10s during sync
  });
}

export function useSystemConfig() {
  return useQuery({
    queryKey: ['system-config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('system_config').select('*');
      if (error) throw error;
      return Object.fromEntries((data || []).map(c => [c.key, c.value]));
    },
  });
}

export function useSyncNow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (toolId: string) => {
      const { data, error } = await supabase.functions.invoke('sync-tool-data', {
        body: { tool_id: toolId, triggered_by: 'manual' },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sync-state'] });
      queryClient.invalidateQueries({ queryKey: ['productivity-data'] });
      queryClient.invalidateQueries({ queryKey: ['usage-data'] });
      queryClient.invalidateQueries({ queryKey: ['spend-data'] });
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
    },
  });
}

export function useToggleTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ toolId, enabled }: { toolId: string; enabled: boolean }) => {
      const { error: toolError } = await supabase.from('ai_tools').update({ enabled }).eq('id', toolId);
      if (toolError) throw toolError;
      const { error: intError } = await supabase.from('tool_integrations').update({ enabled }).eq('tool_id', toolId);
      if (intError) throw intError;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai-tools'] }),
  });
}

export function useAddTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: {
      name: string;
      display_name: string;
      api_base_url: string;
      api_key_secret_name: string;
      endpoints: any[];
      field_mapping: Record<string, any>;
    }) => {
      const { data: newTool, error: toolError } = await supabase.from('ai_tools').insert({
        name: tool.name.toLowerCase().replace(/\s+/g, '_'),
        display_name: tool.display_name,
        api_base_url: tool.api_base_url,
        enabled: false,
        tool_type: 'ai_coding',
      }).select().single();
      if (toolError) throw toolError;

      const { error: intError } = await supabase.from('tool_integrations').insert({
        tool_id: newTool.id,
        api_key_secret_name: tool.api_key_secret_name,
        endpoints: tool.endpoints,
        field_mapping: tool.field_mapping,
        enabled: false,
      });
      if (intError) throw intError;
      return newTool;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai-tools'] }),
  });
}
