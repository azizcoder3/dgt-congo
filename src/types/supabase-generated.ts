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
          category_id: number | null
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
          category_id?: number | null
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
          category_id?: number | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          imageUrl?: string | null
          publishedAt?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
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
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      chiffres_cles: {
        Row: {
          date_mise_a_jour: string | null
          icone: string | null
          id: number
          label: string
          valeur: string
        }
        Insert: {
          date_mise_a_jour?: string | null
          icone?: string | null
          id?: never
          label: string
          valeur: string
        }
        Update: {
          date_mise_a_jour?: string | null
          icone?: string | null
          id?: never
          label?: string
          valeur?: string
        }
        Relationships: []
      }
      communiques: {
        Row: {
          created_at: string | null
          date: string
          id: string
          resume: string | null
          titre: string
          type: string | null
          url_fichier: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          resume?: string | null
          titre: string
          type?: string | null
          url_fichier?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          resume?: string | null
          titre?: string
          type?: string | null
          url_fichier?: string | null
        }
        Relationships: []
      }
      directorates: {
        Row: {
          created_at: string
          directorMessage: string | null
          directorName: string | null
          id: number
          imagePosition: string | null
          imageUrl: string | null
          missionExcerpt: string | null
          name: string
          services: string[] | null
          slug: string
        }
        Insert: {
          created_at?: string
          directorMessage?: string | null
          directorName?: string | null
          id?: number
          imagePosition?: string | null
          imageUrl?: string | null
          missionExcerpt?: string | null
          name: string
          services?: string[] | null
          slug: string
        }
        Update: {
          created_at?: string
          directorMessage?: string | null
          directorName?: string | null
          id?: number
          imagePosition?: string | null
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
      documentation_titres: {
        Row: {
          categorie: string | null
          created_at: string | null
          date_publication: string
          emission_id: string | null
          id: string
          titre: string
          type_document: string
          url_fichier: string
        }
        Insert: {
          categorie?: string | null
          created_at?: string | null
          date_publication: string
          emission_id?: string | null
          id?: string
          titre: string
          type_document: string
          url_fichier: string
        }
        Update: {
          categorie?: string | null
          created_at?: string | null
          date_publication?: string
          emission_id?: string | null
          id?: string
          titre?: string
          type_document?: string
          url_fichier?: string
        }
        Relationships: []
      }
      emissions: {
        Row: {
          code_emission: string | null
          created_at: string | null
          date_annonce: string | null
          date_annonce_resultats: string | null
          date_echeance: string
          date_reglement: string | null
          date_souscription: string | null
          date_valeur: string | null
          designation: string
          devise: string | null
          forme_des_titres: string | null
          id: string
          isin: string | null
          lieu_souscription: string | null
          remboursement: string | null
          rendement_description: string | null
          statut: string | null
          taux_coupon: number | null
          titre: string
          type: string
          url_fiche_pdf: string | null
          valeur_nominale_unitaire: number | null
          volume_emission_annonce: number | null
        }
        Insert: {
          code_emission?: string | null
          created_at?: string | null
          date_annonce?: string | null
          date_annonce_resultats?: string | null
          date_echeance: string
          date_reglement?: string | null
          date_souscription?: string | null
          date_valeur?: string | null
          designation: string
          devise?: string | null
          forme_des_titres?: string | null
          id?: string
          isin?: string | null
          lieu_souscription?: string | null
          remboursement?: string | null
          rendement_description?: string | null
          statut?: string | null
          taux_coupon?: number | null
          titre: string
          type: string
          url_fiche_pdf?: string | null
          valeur_nominale_unitaire?: number | null
          volume_emission_annonce?: number | null
        }
        Update: {
          code_emission?: string | null
          created_at?: string | null
          date_annonce?: string | null
          date_annonce_resultats?: string | null
          date_echeance?: string
          date_reglement?: string | null
          date_souscription?: string | null
          date_valeur?: string | null
          designation?: string
          devise?: string | null
          forme_des_titres?: string | null
          id?: string
          isin?: string | null
          lieu_souscription?: string | null
          remboursement?: string | null
          rendement_description?: string | null
          statut?: string | null
          taux_coupon?: number | null
          titre?: string
          type?: string
          url_fiche_pdf?: string | null
          valeur_nominale_unitaire?: number | null
          volume_emission_annonce?: number | null
        }
        Relationships: []
      }
      fiches_titres: {
        Row: {
          amortissement: string | null
          arrete_creation: string | null
          caracteristiques_juridiques: string | null
          code_emission: string | null
          coupon: number | null
          created_at: string
          demembrable: boolean | null
          designation: string
          devise: string | null
          echeance: string | null
          id: string
          interets: string | null
          isin: string
          nature: string | null
          premiere_date_jouissance: string | null
          procedure_emission: string | null
          texte_emission: string | null
          type: string
          updated_at: string
          valeur_nominale: number | null
        }
        Insert: {
          amortissement?: string | null
          arrete_creation?: string | null
          caracteristiques_juridiques?: string | null
          code_emission?: string | null
          coupon?: number | null
          created_at?: string
          demembrable?: boolean | null
          designation: string
          devise?: string | null
          echeance?: string | null
          id?: string
          interets?: string | null
          isin: string
          nature?: string | null
          premiere_date_jouissance?: string | null
          procedure_emission?: string | null
          texte_emission?: string | null
          type: string
          updated_at?: string
          valeur_nominale?: number | null
        }
        Update: {
          amortissement?: string | null
          arrete_creation?: string | null
          caracteristiques_juridiques?: string | null
          code_emission?: string | null
          coupon?: number | null
          created_at?: string
          demembrable?: boolean | null
          designation?: string
          devise?: string | null
          echeance?: string | null
          id?: string
          interets?: string | null
          isin?: string
          nature?: string | null
          premiere_date_jouissance?: string | null
          procedure_emission?: string | null
          texte_emission?: string | null
          type?: string
          updated_at?: string
          valeur_nominale?: number | null
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
      historique_encours: {
        Row: {
          created_at: string
          date_operation: string
          fiche_titre_id: string
          id: string
          prix_moyen_pondere: number | null
          taux_moyen_pondere: number | null
          type_operation: string
          volume_total_emis: number | null
        }
        Insert: {
          created_at?: string
          date_operation: string
          fiche_titre_id: string
          id?: string
          prix_moyen_pondere?: number | null
          taux_moyen_pondere?: number | null
          type_operation: string
          volume_total_emis?: number | null
        }
        Update: {
          created_at?: string
          date_operation?: string
          fiche_titre_id?: string
          id?: string
          prix_moyen_pondere?: number | null
          taux_moyen_pondere?: number | null
          type_operation?: string
          volume_total_emis?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "historique_encours_fiche_titre_id_fkey"
            columns: ["fiche_titre_id"]
            isOneToOne: false
            referencedRelation: "fiches_titres"
            referencedColumns: ["id"]
          },
        ]
      }
      organigrammes: {
        Row: {
          created_at: string
          id: number
          imageUrl: string
          isActive: boolean
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          imageUrl: string
          isActive?: boolean
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          imageUrl?: string
          isActive?: boolean
          title?: string
        }
        Relationships: []
      }
      personnel: {
        Row: {
          bio: string | null
          created_at: string
          id: number
          imageUrl: string | null
          name: string
          role: string
          title: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: number
          imageUrl?: string | null
          name: string
          role: string
          title: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: number
          imageUrl?: string | null
          name?: string
          role?: string
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
      reformes: {
        Row: {
          advantages: Json | null
          context: string | null
          created_at: string
          description: string | null
          document_url: string | null
          id: number
          is_active: boolean
          main_image_url: string | null
          subtitle: string | null
          title: string
        }
        Insert: {
          advantages?: Json | null
          context?: string | null
          created_at?: string
          description?: string | null
          document_url?: string | null
          id?: number
          is_active?: boolean
          main_image_url?: string | null
          subtitle?: string | null
          title: string
        }
        Update: {
          advantages?: Json | null
          context?: string | null
          created_at?: string
          description?: string | null
          document_url?: string | null
          id?: number
          is_active?: boolean
          main_image_url?: string | null
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      resultats: {
        Row: {
          created_at: string | null
          emission_id: string
          id: string
          montant_total_servi: number | null
          montant_total_soumissions: number | null
          nombre_svt_reseau: number | null
          nombre_svt_soumissionnaires: number | null
          prix_limite: number | null
          prix_maximum_propose: number | null
          prix_minimum_propose: number | null
          prix_moyen_pondere: number | null
          taux_couverture: number | null
        }
        Insert: {
          created_at?: string | null
          emission_id: string
          id?: string
          montant_total_servi?: number | null
          montant_total_soumissions?: number | null
          nombre_svt_reseau?: number | null
          nombre_svt_soumissionnaires?: number | null
          prix_limite?: number | null
          prix_maximum_propose?: number | null
          prix_minimum_propose?: number | null
          prix_moyen_pondere?: number | null
          taux_couverture?: number | null
        }
        Update: {
          created_at?: string | null
          emission_id?: string
          id?: string
          montant_total_servi?: number | null
          montant_total_soumissions?: number | null
          nombre_svt_reseau?: number | null
          nombre_svt_soumissionnaires?: number | null
          prix_limite?: number | null
          prix_maximum_propose?: number | null
          prix_minimum_propose?: number | null
          prix_moyen_pondere?: number | null
          taux_couverture?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resultats_emission_id_fkey"
            columns: ["emission_id"]
            isOneToOne: false
            referencedRelation: "emissions"
            referencedColumns: ["id"]
          },
        ]
      }
      statistiques_titres: {
        Row: {
          created_at: string | null
          id: string
          periode: string
          type_statistique: string
          unite: string | null
          valeur: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          periode: string
          type_statistique: string
          unite?: string | null
          valeur: number
        }
        Update: {
          created_at?: string | null
          id?: string
          periode?: string
          type_statistique?: string
          unite?: string | null
          valeur?: number
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
