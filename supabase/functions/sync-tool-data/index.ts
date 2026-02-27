import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { tool_id, triggered_by = 'manual' } = await req.json();

    if (!tool_id) {
      return new Response(JSON.stringify({ error: 'tool_id required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Get tool and integration info
    const { data: tool } = await supabase.from('ai_tools').select('*').eq('id', tool_id).single();
    if (!tool || !tool.enabled) {
      return new Response(JSON.stringify({ error: 'Tool not found or disabled' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { data: integration } = await supabase.from('tool_integrations').select('*').eq('tool_id', tool_id).single();
    if (!integration || !integration.enabled) {
      return new Response(JSON.stringify({ error: 'Integration not configured or disabled' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Check cooldown for manual syncs
    if (triggered_by === 'manual' && integration.next_sync_allowed_at) {
      const nextAllowed = new Date(integration.next_sync_allowed_at);
      if (nextAllowed > new Date()) {
        const remainingMs = nextAllowed.getTime() - Date.now();
        const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
        return new Response(JSON.stringify({
          error: 'Sync cooldown active',
          next_sync_allowed_at: integration.next_sync_allowed_at,
          remaining_hours: remainingHours
        }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // Check for in-progress syncs (race condition prevention)
    const { data: activeSyncs } = await supabase
      .from('sync_state')
      .select('id')
      .eq('tool_id', tool_id)
      .eq('status', 'in_progress')
      .limit(1);

    if (activeSyncs && activeSyncs.length > 0) {
      return new Response(JSON.stringify({ error: 'Sync already in progress' }), { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Create sync state record
    const { data: syncRecord } = await supabase
      .from('sync_state')
      .insert({ tool_id, status: 'in_progress', triggered_by })
      .select()
      .single();

    // Get cooldown hours from config
    const { data: cooldownConfig } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', 'sync_cooldown_hours')
      .single();
    const cooldownHours = parseInt(cooldownConfig?.value || '6');

    let totalRecords = 0;

    try {
      // Get API key from secrets
      const apiKeySecretName = integration.api_key_secret_name;
      const apiKey = apiKeySecretName ? Deno.env.get(apiKeySecretName) : null;

      if (!apiKey) {
        throw new Error(`API key not configured: ${apiKeySecretName}`);
      }

      const endpoints = (integration.endpoints as any[]) || [];
      const fieldMapping = (integration.field_mapping as Record<string, Record<string, string>>) || {};
      const baseUrl = tool.api_base_url || '';

      // Determine period based on last sync
      const period = integration.last_sync_at ? '7d' : '30d';
      const today = new Date().toISOString().split('T')[0];

      for (const endpoint of endpoints) {
        const url = new URL(endpoint.path, baseUrl);
        const params = { ...endpoint.params, period };
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v as string));

        const response = await fetch(url.toString(), {
          method: endpoint.method || 'GET',
          headers: {
            'Authorization': `Basic ${btoa(apiKey + ':')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`API error for ${endpoint.path}: ${response.status}`);
          const errorText = await response.text();
          console.error(`Response body: ${errorText}`);
          continue;
        }

        const data = await response.json();

        // Store raw response
        await supabase.from('raw_api_data').insert({
          tool_id,
          endpoint: endpoint.path,
          response_json: data,
        });

        // Parse and normalize based on endpoint type
        if (endpoint.path.includes('productivity')) {
          const mapping = fieldMapping.productivity || {};
          const record = {
            tool_id,
            date: today,
            user_external_id: null,
            lines_added: data[mapping.lines_added || 'lines_added_total'] || 0,
            lines_deleted: data[mapping.lines_deleted || 'lines_deleted_total'] || 0,
            tab_completions: data[mapping.tab_completions || 'tab_completions_total'] || 0,
            composer_requests: data[mapping.composer_requests || 'composer_requests_total'] || 0,
            chat_requests: data[mapping.chat_requests || 'chat_requests_total'] || 0,
            suggestion_acceptance_rate: data[mapping.suggestion_acceptance_rate || 'suggestion_acceptance_rate'] || null,
            ai_attributed_commits: data[mapping.ai_attributed_commits || 'ai_attributed_commits_count'] || 0,
            ai_attributed_insertions: data[mapping.ai_attributed_insertions || 'ai_attributed_insertions'] || 0,
            ai_attributed_deletions: data[mapping.ai_attributed_deletions || 'ai_attributed_deletions'] || 0,
            active_users_dau: data[mapping.active_users_dau || 'active_users_dau'] || 0,
            active_users_wau: data[mapping.active_users_wau || 'active_users_wau'] || 0,
            active_users_mau: data[mapping.active_users_mau || 'active_users_mau'] || 0,
            model_usage_breakdown: data.model_usage_breakdown || [],
          };

          await supabase.from('productivity_data').upsert(record, {
            onConflict: 'tool_id,user_external_id,date',
          });
          totalRecords++;
        }

        if (endpoint.path.includes('usage/tokens')) {
          const byModel = data.by_model || [];
          for (const model of byModel) {
            await supabase.from('usage_data').upsert({
              tool_id,
              date: today,
              user_external_id: null,
              model_id: model.model_id,
              input_tokens: model.input_tokens || 0,
              output_tokens: model.output_tokens || 0,
              cache_read_tokens: model.cache_read || 0,
              cache_write_tokens: model.cache_write || 0,
              request_count: model.request_count || 0,
            }, { onConflict: 'tool_id,user_external_id,date,model_id' });
            totalRecords++;
          }

          // Also store aggregate if no model breakdown
          if (byModel.length === 0) {
            const mapping = fieldMapping.usage || {};
            await supabase.from('usage_data').upsert({
              tool_id,
              date: today,
              user_external_id: null,
              model_id: 'aggregate',
              input_tokens: data[mapping.input_tokens || 'total_input_tokens'] || 0,
              output_tokens: data[mapping.output_tokens || 'total_output_tokens'] || 0,
              cache_read_tokens: data[mapping.cache_read_tokens || 'total_cache_read_tokens'] || 0,
              cache_write_tokens: data[mapping.cache_write_tokens || 'total_cache_write_tokens'] || 0,
            }, { onConflict: 'tool_id,user_external_id,date,model_id' });
            totalRecords++;
          }
        }

        if (endpoint.path.includes('usage/spend')) {
          const mapping = fieldMapping.spend || {};
          const byModel = data.by_model || [];
          for (const model of byModel) {
            await supabase.from('spend_data').upsert({
              tool_id,
              date: today,
              user_external_id: null,
              model_id: model.model_id,
              spend_cents: model.spend_cents || 0,
              premium_requests_count: model.premium_requests_count || 0,
              currency: data[mapping.currency || 'currency'] || 'USD',
            }, { onConflict: 'tool_id,user_external_id,date,model_id' });
            totalRecords++;
          }

          if (byModel.length === 0) {
            await supabase.from('spend_data').upsert({
              tool_id,
              date: today,
              user_external_id: null,
              model_id: 'aggregate',
              spend_cents: data[mapping.spend_cents || 'total_spend_cents'] || 0,
              currency: data[mapping.currency || 'currency'] || 'USD',
            }, { onConflict: 'tool_id,user_external_id,date,model_id' });
            totalRecords++;
          }
        }
      }

      // Update sync state to completed
      await supabase.from('sync_state').update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        records_fetched: totalRecords,
      }).eq('id', syncRecord!.id);

      // Update next_sync_allowed_at
      const nextAllowed = new Date(Date.now() + cooldownHours * 60 * 60 * 1000).toISOString();
      await supabase.from('tool_integrations').update({
        last_sync_at: new Date().toISOString(),
        next_sync_allowed_at: nextAllowed,
      }).eq('tool_id', tool_id);

      return new Response(JSON.stringify({
        success: true,
        records_fetched: totalRecords,
        next_sync_allowed_at: nextAllowed,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (syncError) {
      // Update sync state to failed
      await supabase.from('sync_state').update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: syncError.message,
      }).eq('id', syncRecord!.id);

      return new Response(JSON.stringify({ error: syncError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
