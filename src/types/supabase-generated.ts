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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          content: string | null
          created_at: string
          excerpt: string | null
          id: number
          imageUrl: string | null
          publishedAt: string | null
          slug: string
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          imageUrl?: string | null
          publishedAt?: string | null
          slug: string
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          imageUrl?: string | null
          publishedAt?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      auction_results: {
        Row: {
          amountawarded: number | null
          created_at: string
          date: string | null
          id: number
          interestrate: string | null
          slug: string | null
          type: string | null
        }
        Insert: {
          amountawarded?: number | null
          created_at?: string
          date?: string | null
          id?: number
          interestrate?: string | null
          slug?: string | null
          type?: string | null
        }
        Update: {
          amountawarded?: number | null
          created_at?: string
          date?: string | null
          id?: number
          interestrate?: string | null
          slug?: string | null
          type?: string | null
        }
        Relationships: []
      }
      directorates: {
        Row: {
          created_at: string
          directorName: string | null
          id: number
          imageUrl: string | null
          missionExcerpt: string | null
          name: string
          services: string[] | null
          slug: string
        }
        Insert: {
          created_at?: string
          directorName?: string | null
          id?: number
          imageUrl?: string | null
          missionExcerpt?: string | null
          name: string
          services?: string[] | null
          slug: string
        }
        Update: {
          created_at?: string
          directorName?: string | null
          id?: number
          imageUrl?: string | null
          missionExcerpt?: string | null
          name?: string
          services?: string[] | null
          slug?: string
        }
        Relationships: []
      }
      discovery_cards: {
        Row: {
          created_at: string
          id: number
          imageUrl: string
          link: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          imageUrl: string
          link: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          imageUrl?: string
          link?: string
          title?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          buttonLink: string | null
          buttonText: string | null
          created_at: string
          date: string | null
          id: number
          imageUrl: string
          title: string
        }
        Insert: {
          buttonLink?: string | null
          buttonText?: string | null
          created_at?: string
          date?: string | null
          id?: number
          imageUrl: string
          title: string
        }
        Update: {
          buttonLink?: string | null
          buttonText?: string | null
          created_at?: string
          date?: string | null
          id?: number
          imageUrl?: string
          title?: string
        }
        Relationships: []
      }
      rapports: {
        Row: {
          category: string | null
          coverImageUrl: string | null
          created_at: string
          description: string | null
          fileUrl: string
          id: number
          publishedDate: string
          title: string
        }
        Insert: {
          category?: string | null
          coverImageUrl?: string | null
          created_at?: string
          description?: string | null
          fileUrl: string
          id?: number
          publishedDate: string
          title: string
        }
        Update: {
          category?: string | null
          coverImageUrl?: string | null
          created_at?: string
          description?: string | null
          fileUrl?: string
          id?: number
          publishedDate?: string
          title?: string
        }
        Relationships: []
      }
      statistiques_marche: {
        Row: {
          id: number
          libelle_statistique: string | null
          nom_statistique: string
          valeur_statistique: string | null
        }
        Insert: {
          id?: number
          libelle_statistique?: string | null
          nom_statistique: string
          valeur_statistique?: string | null
        }
        Update: {
          id?: number
          libelle_statistique?: string | null
          nom_statistique?: string
          valeur_statistique?: string | null
        }
        Relationships: []
      }
      upcoming_auctions: {
        Row: {
          amountmillions: number | null
          created_at: string
          date: string | null
          id: number
          status: string | null
          type: string | null
        }
        Insert: {
          amountmillions?: number | null
          created_at?: string
          date?: string | null
          id?: number
          status?: string | null
          type?: string | null
        }
        Update: {
          amountmillions?: number | null
          created_at?: string
          date?: string | null
          id?: number
          status?: string | null
          type?: string | null
        }
        Relationships: []
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
