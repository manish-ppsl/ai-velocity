

# Phase 1: Cursor API Integration Framework

## Prerequisites
You need to connect either **Supabase** or **Lovable Cloud** as a backend before this can be implemented. This phase requires:
- A database for storing API data, tool configurations, and sync state
- Edge functions for scheduled jobs and API proxying
- Secrets management for API keys

**Action needed**: Please connect Supabase or enable Lovable Cloud first, then we can proceed with implementation.

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────┐
│                   FRONTEND                          │
│  ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │Dashboard │ │Analytics │ │Admin: Tool Mgmt   │   │
│  │(duration │ │(duration │ │- Onboard tool     │   │
│  │ filter)  │ │ filter)  │ │- Enable/Disable   │   │
│  └────┬─────┘ └────┬─────┘ │- Sync Now button  │   │
│       │             │       │- Config cooldown   │   │
│       └──────┬──────┘       └────────┬──────────┘   │
│              │                       │              │
│         React Query              React Query        │
└──────────────┼───────────────────────┼──────────────┘
               │                       │
┌──────────────┼───────────────────────┼──────────────┐
│              ▼     SUPABASE          ▼              │
│  ┌─────────────────────────────────────────────┐    │
│  │              Edge Functions                  │    │
│  │  sync-tool-data  │  send-notification-email │    │
│  └────────┬─────────┴──────────┬───────────────┘    │
│           │                    │                    │
│  ┌────────▼────────────────────▼───────────────┐    │
│  │              Database Tables                 │    │
│  │  ai_tools         │ tool_integrations       │    │
│  │  sync_state       │ raw_api_data            │    │
│  │  productivity_data│ usage_data              │    │
│  │  spend_data       │ system_config           │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  pg_cron: daily job → calls sync edge function      │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### 1. Database Schema (Supabase migrations)

**Tables to create:**

- **`ai_tools`** — tool registry (name, type, enabled, api_base_url, created_at)
- **`tool_integrations`** — per-tool config (tool_id, api_key_secret_name, sync_frequency, enabled, last_sync_at, next_sync_allowed_at)
- **`sync_state`** — tracks sync runs (tool_id, status, started_at, completed_at, records_fetched, error_message, triggered_by)
- **`system_config`** — key-value config store (e.g. `sync_cooldown_hours` = 6)
- **`raw_api_data`** — stores raw JSON responses (tool_id, endpoint, response_json, fetched_at)
- **`productivity_data`** — normalized: tool_id, user_id, date, lines_added, lines_deleted, tab_completions, composer_requests, chat_requests, suggestion_acceptance_rate, ai_attributed_commits, ai_attributed_insertions, ai_attributed_deletions
- **`usage_data`** — normalized: tool_id, user_id, date, model_id, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, request_count
- **`spend_data`** — normalized: tool_id, user_id, date, model_id, spend_cents, premium_requests_count, currency
- **`notification_log`** — id, type, title, message, recipient_email, sent_at, read

All tables with RLS enabled.

### 2. Edge Function: `sync-tool-data`

- Accepts `tool_id` and `triggered_by` (scheduled | manual)
- Checks `sync_state` + `tool_integrations.next_sync_allowed_at` to enforce cooldown (race condition: use `SELECT ... FOR UPDATE` or a DB advisory lock)
- Fetches Cursor API endpoints: `/productivity/summary`, `/usage/tokens`, `/usage/spend`, `/benefits/summary`
- Stores raw response in `raw_api_data`
- Parses and upserts into `productivity_data`, `usage_data`, `spend_data` (delta: uses last_sync timestamp to fetch only new data)
- Updates `sync_state` and `next_sync_allowed_at`
- On failure: logs error in `sync_state`, retries handled by caller

### 3. Edge Function: `send-notification-email`

- Triggered by sync completion or alert conditions
- Sends email to team leads for: high revert alerts, idle license alerts, sensitive module changes
- Uses Supabase built-in email or a configured SMTP service

### 4. Scheduled Job (pg_cron)

- Daily cron job calls `sync-tool-data` for each enabled tool
- Runs at configurable time (stored in `system_config`)

### 5. Frontend: Admin Tool Management Page

- New route `/admin/integrations` (or extend Settings page)
- **Tool Onboarding Form**: name, API base URL, API key (stored as Supabase secret), predefined field mapping
- **Tool List**: shows all registered tools with enable/disable toggle
- **Sync Now Button**: calls edge function, disabled if within cooldown window; shows countdown timer
- **Sync Status**: last sync time, health indicator, records fetched

### 6. Frontend: Duration Filter (all dashboards)

- Add a shared `DurationFilter` component with options: 7d, 30d, 90d, custom range
- Integrate into Dashboard, Analytics, Cost & Licenses, Leaderboard pages
- All data queries pass the selected period as parameter

### 7. Frontend: Replace Mock Data with DB Queries

- Create React Query hooks: `useProductivityData(toolId, period)`, `useUsageData(toolId, period)`, `useSpendData(toolId, period)`, `useSyncState(toolId)`
- Update Dashboard KPIs, CorrelationChart, ToolBreakdown, CostOptimization to use these hooks
- Fallback to current mock data when no DB data exists

### 8. Integration Framework Design

- The `ai_tools` table defines the contract: every tool must provide data that maps to the same normalized schema (`productivity_data`, `usage_data`, `spend_data`)
- The edge function uses a strategy pattern: tool-specific adapters parse each tool's API response into the common schema
- Adding a new tool = inserting a row in `ai_tools` + writing an adapter function
- Frontend remains tool-agnostic; it reads from the normalized tables

---

## Standardized Data Fields (all tools produce these)

| Category | Fields |
|----------|--------|
| Productivity | lines_added, lines_deleted, suggestion_acceptance_rate, tab_completions, composer_requests, chat_requests, active_users, ai_attributed_commits |
| Usage | input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, request_count, model_id |
| Spend | spend_cents, currency, premium_requests_count |
| Benefits (derived) | ai_attributed_lines_pct, adoption_rate, spend_per_active_user, cost_per_1000_lines |

---

## Sync Cooldown Logic

1. On "Sync Now": check `tool_integrations.next_sync_allowed_at > NOW()`
2. If within cooldown → reject with remaining time
3. If allowed → set `next_sync_allowed_at = NOW() + interval from system_config.sync_cooldown_hours`
4. Use DB-level locking to prevent race conditions from concurrent clicks

