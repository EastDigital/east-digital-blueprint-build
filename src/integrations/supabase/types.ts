export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          color: string
          created_at: string
          custom_color: string | null
          custom_icon_url: string | null
          description: string | null
          display_order: number
          icon_name: string
          id: string
          images: string[] | null
          is_active: boolean
          metric: string | null
          metric_display_label: string | null
          metric_label: string | null
          metric_label_display_label: string | null
          projects_count: string | null
          projects_count_label: string | null
          show_metric: boolean | null
          show_metric_label: boolean | null
          show_projects_count: boolean | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          custom_color?: string | null
          custom_icon_url?: string | null
          description?: string | null
          display_order?: number
          icon_name: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          metric?: string | null
          metric_display_label?: string | null
          metric_label?: string | null
          metric_label_display_label?: string | null
          projects_count?: string | null
          projects_count_label?: string | null
          show_metric?: boolean | null
          show_metric_label?: boolean | null
          show_projects_count?: boolean | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          custom_color?: string | null
          custom_icon_url?: string | null
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          metric?: string | null
          metric_display_label?: string | null
          metric_label?: string | null
          metric_label_display_label?: string | null
          projects_count?: string | null
          projects_count_label?: string | null
          show_metric?: boolean | null
          show_metric_label?: boolean | null
          show_projects_count?: boolean | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          admin_user_id: string
          created_at: string
          expires_at: string
          id: string
          is_used: boolean
          otp_hash: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          expires_at: string
          id?: string
          is_used?: boolean
          otp_hash: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          otp_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "otp_verifications_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string | null
          challenge: string | null
          client: string | null
          conversion_result: string | null
          created_at: string
          description: string | null
          duration: string | null
          engagement_result: string | null
          featured_image: string | null
          featured_image_alt: string | null
          featured_video: string | null
          gallery_image_alts: string[] | null
          gallery_images: string[] | null
          gallery_videos: string[] | null
          hero_image: string | null
          hero_image_alt: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          leads_result: string | null
          location: string | null
          name: string
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          show_in_carousel: boolean
          slug: string | null
          solution: string | null
          status: string | null
          subtitle: string | null
          tags: string[] | null
          team_size: string | null
          timeline_result: string | null
          updated_at: string
          video_thumbnail: string | null
        }
        Insert: {
          category?: string | null
          challenge?: string | null
          client?: string | null
          conversion_result?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          engagement_result?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          featured_video?: string | null
          gallery_image_alts?: string[] | null
          gallery_images?: string[] | null
          gallery_videos?: string[] | null
          hero_image?: string | null
          hero_image_alt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          leads_result?: string | null
          location?: string | null
          name: string
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_in_carousel?: boolean
          slug?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          team_size?: string | null
          timeline_result?: string | null
          updated_at?: string
          video_thumbnail?: string | null
        }
        Update: {
          category?: string | null
          challenge?: string | null
          client?: string | null
          conversion_result?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          engagement_result?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          featured_video?: string | null
          gallery_image_alts?: string[] | null
          gallery_images?: string[] | null
          gallery_videos?: string[] | null
          hero_image?: string | null
          hero_image_alt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          leads_result?: string | null
          location?: string | null
          name?: string
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_in_carousel?: boolean
          slug?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          team_size?: string | null
          timeline_result?: string | null
          updated_at?: string
          video_thumbnail?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      trusted_devices: {
        Row: {
          admin_user_id: string
          created_at: string
          device_fingerprint: string
          device_name: string | null
          id: string
          is_active: boolean
          last_used_at: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          device_fingerprint: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          device_fingerprint?: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trusted_devices_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_project_slug: {
        Args: { title: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
