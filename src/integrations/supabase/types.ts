export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_tools: {
        Row: {
          api_base_url: string | null
          created_at: string
          display_name: string
          enabled: boolean
          icon_name: string | null
          id: string
          name: string
          tool_type: string
          updated_at: string
        }
        Insert: {
          api_base_url?: string | null
          created_at?: string
          display_name: string
          enabled?: boolean
          icon_name?: string | null
          id?: string
          name: string
          tool_type?: string
          updated_at?: string
        }
        Update: {
          api_base_url?: string | null
          created_at?: string
          display_name?: string
          enabled?: boolean
          icon_name?: string | null
          id?: string
          name?: string
          tool_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      notification_log: {
        Row: {
          id: string
          message: string
          read: boolean
          recipient_email: string
          sent_at: string
          title: string
          tool_id: string | null
          type: string
        }
        Insert: {
          id?: string
          message: string
          read?: boolean
          recipient_email: string
          sent_at?: string
          title: string
          tool_id?: string | null
          type: string
        }
        Update: {
          id?: string
          message?: string
          read?: boolean
          recipient_email?: string
          sent_at?: string
          title?: string
          tool_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      productivity_data: {
        Row: {
          active_users_dau: number | null
          active_users_mau: number | null
          active_users_wau: number | null
          ai_attributed_commits: number | null
          ai_attributed_deletions: number | null
          ai_attributed_insertions: number | null
          chat_requests: number | null
          composer_requests: number | null
          created_at: string
          date: string
          id: string
          lines_added: number | null
          lines_deleted: number | null
          model_usage_breakdown: Json | null
          suggestion_acceptance_rate: number | null
          tab_completions: number | null
          team_name: string | null
          tool_id: string
          user_external_id: string | null
          user_name: string | null
        }
        Insert: {
          active_users_dau?: number | null
          active_users_mau?: number | null
          active_users_wau?: number | null
          ai_attributed_commits?: number | null
          ai_attributed_deletions?: number | null
          ai_attributed_insertions?: number | null
          chat_requests?: number | null
          composer_requests?: number | null
          created_at?: string
          date: string
          id?: string
          lines_added?: number | null
          lines_deleted?: number | null
          model_usage_breakdown?: Json | null
          suggestion_acceptance_rate?: number | null
          tab_completions?: number | null
          team_name?: string | null
          tool_id: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Update: {
          active_users_dau?: number | null
          active_users_mau?: number | null
          active_users_wau?: number | null
          ai_attributed_commits?: number | null
          ai_attributed_deletions?: number | null
          ai_attributed_insertions?: number | null
          chat_requests?: number | null
          composer_requests?: number | null
          created_at?: string
          date?: string
          id?: string
          lines_added?: number | null
          lines_deleted?: number | null
          model_usage_breakdown?: Json | null
          suggestion_acceptance_rate?: number | null
          tab_completions?: number | null
          team_name?: string | null
          tool_id?: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "productivity_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_api_data: {
        Row: {
          endpoint: string
          fetched_at: string
          id: string
          response_json: Json
          tool_id: string
        }
        Insert: {
          endpoint: string
          fetched_at?: string
          id?: string
          response_json: Json
          tool_id: string
        }
        Update: {
          endpoint?: string
          fetched_at?: string
          id?: string
          response_json?: Json
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raw_api_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      spend_data: {
        Row: {
          created_at: string
          currency: string | null
          date: string
          id: string
          model_id: string | null
          premium_requests_count: number | null
          spend_cents: number | null
          team_name: string | null
          tool_id: string
          user_external_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          date: string
          id?: string
          model_id?: string | null
          premium_requests_count?: number | null
          spend_cents?: number | null
          team_name?: string | null
          tool_id: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          model_id?: string | null
          premium_requests_count?: number | null
          spend_cents?: number | null
          team_name?: string | null
          tool_id?: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spend_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_state: {
        Row: {
          completed_at: string | null
          error_message: string | null
          id: string
          records_fetched: number | null
          started_at: string
          status: string
          tool_id: string
          triggered_by: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          records_fetched?: number | null
          started_at?: string
          status?: string
          tool_id: string
          triggered_by?: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          id?: string
          records_fetched?: number | null
          started_at?: string
          status?: string
          tool_id?: string
          triggered_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_state_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      system_config: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      tool_integrations: {
        Row: {
          api_key_secret_name: string | null
          created_at: string
          enabled: boolean
          endpoints: Json | null
          field_mapping: Json | null
          id: string
          last_sync_at: string | null
          next_sync_allowed_at: string | null
          sync_frequency_minutes: number
          tool_id: string
          updated_at: string
        }
        Insert: {
          api_key_secret_name?: string | null
          created_at?: string
          enabled?: boolean
          endpoints?: Json | null
          field_mapping?: Json | null
          id?: string
          last_sync_at?: string | null
          next_sync_allowed_at?: string | null
          sync_frequency_minutes?: number
          tool_id: string
          updated_at?: string
        }
        Update: {
          api_key_secret_name?: string | null
          created_at?: string
          enabled?: boolean
          endpoints?: Json | null
          field_mapping?: Json | null
          id?: string
          last_sync_at?: string | null
          next_sync_allowed_at?: string | null
          sync_frequency_minutes?: number
          tool_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_integrations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: true
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_data: {
        Row: {
          cache_read_tokens: number | null
          cache_write_tokens: number | null
          created_at: string
          date: string
          id: string
          input_tokens: number | null
          model_id: string | null
          output_tokens: number | null
          request_count: number | null
          team_name: string | null
          tool_id: string
          user_external_id: string | null
          user_name: string | null
        }
        Insert: {
          cache_read_tokens?: number | null
          cache_write_tokens?: number | null
          created_at?: string
          date: string
          id?: string
          input_tokens?: number | null
          model_id?: string | null
          output_tokens?: number | null
          request_count?: number | null
          team_name?: string | null
          tool_id: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Update: {
          cache_read_tokens?: number | null
          cache_write_tokens?: number | null
          created_at?: string
          date?: string
          id?: string
          input_tokens?: number | null
          model_id?: string | null
          output_tokens?: number | null
          request_count?: number | null
          team_name?: string | null
          tool_id?: string
          user_external_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
