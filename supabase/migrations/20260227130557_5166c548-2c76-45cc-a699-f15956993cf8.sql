
-- =====================================================
-- AI Tool Integration Framework - Complete Schema
-- =====================================================

-- 1. Timestamp trigger function (reusable)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 2. ai_tools - Tool registry
CREATE TABLE public.ai_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  tool_type TEXT NOT NULL DEFAULT 'ai_coding', -- ai_coding, ai_review, etc.
  api_base_url TEXT,
  enabled BOOLEAN NOT NULL DEFAULT false,
  icon_name TEXT, -- lucide icon name for UI
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_tools_read_all" ON public.ai_tools FOR SELECT USING (true);
CREATE POLICY "ai_tools_write_authenticated" ON public.ai_tools FOR ALL USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_ai_tools_updated_at BEFORE UPDATE ON public.ai_tools
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. tool_integrations - Per-tool config
CREATE TABLE public.tool_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  api_key_secret_name TEXT, -- references Supabase vault secret name
  sync_frequency_minutes INT NOT NULL DEFAULT 1440, -- default daily
  enabled BOOLEAN NOT NULL DEFAULT false,
  last_sync_at TIMESTAMPTZ,
  next_sync_allowed_at TIMESTAMPTZ DEFAULT now(),
  endpoints JSONB DEFAULT '[]'::jsonb, -- list of API endpoints to fetch
  field_mapping JSONB DEFAULT '{}'::jsonb, -- maps tool-specific fields to standard fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tool_id)
);

ALTER TABLE public.tool_integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tool_integrations_read_all" ON public.tool_integrations FOR SELECT USING (true);
CREATE POLICY "tool_integrations_write_auth" ON public.tool_integrations FOR ALL USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_tool_integrations_updated_at BEFORE UPDATE ON public.tool_integrations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. sync_state - Tracks sync runs
CREATE TABLE public.sync_state (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  records_fetched INT DEFAULT 0,
  error_message TEXT,
  triggered_by TEXT NOT NULL DEFAULT 'scheduled' CHECK (triggered_by IN ('scheduled', 'manual'))
);

ALTER TABLE public.sync_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sync_state_read_all" ON public.sync_state FOR SELECT USING (true);
CREATE POLICY "sync_state_write_auth" ON public.sync_state FOR ALL USING (auth.uid() IS NOT NULL);

-- 5. system_config - Key-value config store
CREATE TABLE public.system_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "system_config_read_all" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "system_config_write_auth" ON public.system_config FOR ALL USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON public.system_config
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. raw_api_data - Raw JSON responses
CREATE TABLE public.raw_api_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  response_json JSONB NOT NULL,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.raw_api_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "raw_api_data_read_all" ON public.raw_api_data FOR SELECT USING (true);
CREATE POLICY "raw_api_data_insert_auth" ON public.raw_api_data FOR INSERT WITH CHECK (true);

CREATE INDEX idx_raw_api_data_tool_endpoint ON public.raw_api_data(tool_id, endpoint, fetched_at DESC);

-- 7. productivity_data - Normalized productivity metrics
CREATE TABLE public.productivity_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  user_external_id TEXT, -- user ID from the tool (not our auth user)
  user_name TEXT,
  team_name TEXT,
  date DATE NOT NULL,
  lines_added INT DEFAULT 0,
  lines_deleted INT DEFAULT 0,
  tab_completions INT DEFAULT 0,
  composer_requests INT DEFAULT 0,
  chat_requests INT DEFAULT 0,
  suggestion_acceptance_rate NUMERIC(5,2),
  ai_attributed_commits INT DEFAULT 0,
  ai_attributed_insertions INT DEFAULT 0,
  ai_attributed_deletions INT DEFAULT 0,
  active_users_dau INT DEFAULT 0,
  active_users_wau INT DEFAULT 0,
  active_users_mau INT DEFAULT 0,
  model_usage_breakdown JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tool_id, user_external_id, date)
);

ALTER TABLE public.productivity_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "productivity_data_read_all" ON public.productivity_data FOR SELECT USING (true);
CREATE POLICY "productivity_data_insert" ON public.productivity_data FOR INSERT WITH CHECK (true);
CREATE POLICY "productivity_data_update" ON public.productivity_data FOR UPDATE USING (true);

CREATE INDEX idx_productivity_data_tool_date ON public.productivity_data(tool_id, date DESC);

-- 8. usage_data - Token consumption
CREATE TABLE public.usage_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  user_external_id TEXT,
  user_name TEXT,
  team_name TEXT,
  date DATE NOT NULL,
  model_id TEXT,
  input_tokens BIGINT DEFAULT 0,
  output_tokens BIGINT DEFAULT 0,
  cache_read_tokens BIGINT DEFAULT 0,
  cache_write_tokens BIGINT DEFAULT 0,
  request_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tool_id, user_external_id, date, model_id)
);

ALTER TABLE public.usage_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usage_data_read_all" ON public.usage_data FOR SELECT USING (true);
CREATE POLICY "usage_data_insert" ON public.usage_data FOR INSERT WITH CHECK (true);
CREATE POLICY "usage_data_update" ON public.usage_data FOR UPDATE USING (true);

CREATE INDEX idx_usage_data_tool_date ON public.usage_data(tool_id, date DESC);

-- 9. spend_data - Cost tracking
CREATE TABLE public.spend_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  user_external_id TEXT,
  user_name TEXT,
  team_name TEXT,
  date DATE NOT NULL,
  model_id TEXT,
  spend_cents INT DEFAULT 0,
  premium_requests_count INT DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tool_id, user_external_id, date, model_id)
);

ALTER TABLE public.spend_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "spend_data_read_all" ON public.spend_data FOR SELECT USING (true);
CREATE POLICY "spend_data_insert" ON public.spend_data FOR INSERT WITH CHECK (true);
CREATE POLICY "spend_data_update" ON public.spend_data FOR UPDATE USING (true);

CREATE INDEX idx_spend_data_tool_date ON public.spend_data(tool_id, date DESC);

-- 10. notification_log - Email/notification tracking
CREATE TABLE public.notification_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.ai_tools(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- 'high_revert', 'idle_license', 'low_adoption', etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notification_log_read_all" ON public.notification_log FOR SELECT USING (true);
CREATE POLICY "notification_log_insert" ON public.notification_log FOR INSERT WITH CHECK (true);
CREATE POLICY "notification_log_update" ON public.notification_log FOR UPDATE USING (true);

-- 11. Seed system_config defaults
INSERT INTO public.system_config (key, value, description) VALUES
  ('sync_cooldown_hours', '6', 'Minimum hours between manual syncs for a tool'),
  ('daily_sync_time', '02:00', 'Time of day (UTC) for scheduled daily sync'),
  ('default_sync_frequency_minutes', '1440', 'Default sync frequency for new tools in minutes');

-- 12. Seed Cursor as default tool
INSERT INTO public.ai_tools (name, display_name, tool_type, api_base_url, enabled, icon_name) VALUES
  ('cursor', 'Cursor', 'ai_coding', 'https://api.cursor.com', false, 'MousePointer2');

INSERT INTO public.tool_integrations (tool_id, api_key_secret_name, endpoints, field_mapping)
SELECT id, 'CURSOR_API_KEY',
  '[
    {"path": "/productivity/summary", "method": "GET", "params": {"scope": "team"}},
    {"path": "/usage/tokens", "method": "GET", "params": {"scope": "team"}},
    {"path": "/usage/spend", "method": "GET", "params": {"scope": "team"}},
    {"path": "/benefits/summary", "method": "GET", "params": {}}
  ]'::jsonb,
  '{
    "productivity": {
      "lines_added": "lines_added_total",
      "lines_deleted": "lines_deleted_total",
      "suggestion_acceptance_rate": "suggestion_acceptance_rate",
      "tab_completions": "tab_completions_total",
      "composer_requests": "composer_requests_total",
      "chat_requests": "chat_requests_total",
      "ai_attributed_commits": "ai_attributed_commits_count",
      "ai_attributed_insertions": "ai_attributed_insertions",
      "ai_attributed_deletions": "ai_attributed_deletions",
      "active_users_dau": "active_users_dau",
      "active_users_wau": "active_users_wau",
      "active_users_mau": "active_users_mau"
    },
    "usage": {
      "input_tokens": "total_input_tokens",
      "output_tokens": "total_output_tokens",
      "cache_read_tokens": "total_cache_read_tokens",
      "cache_write_tokens": "total_cache_write_tokens"
    },
    "spend": {
      "spend_cents": "total_spend_cents",
      "currency": "currency"
    }
  }'::jsonb
FROM public.ai_tools WHERE name = 'cursor';
