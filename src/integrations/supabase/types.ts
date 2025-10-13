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
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      collection_products: {
        Row: {
          collection_id: string | null
          created_at: string | null
          display_order: number | null
          id: string
          product_id: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          product_id?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          release_date: string | null
          season: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          release_date?: string | null
          season?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          release_date?: string | null
          season?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      custom_design_requests: {
        Row: {
          admin_notes: string | null
          budget_range: string | null
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          deadline: string | null
          description: string
          id: string
          measurements: Json | null
          quotation: number | null
          reference_images: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          budget_range?: string | null
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          deadline?: string | null
          description: string
          id?: string
          measurements?: Json | null
          quotation?: number | null
          reference_images?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          budget_range?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string
          id?: string
          measurements?: Json | null
          quotation?: number | null
          reference_images?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          image_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          image_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lookbook_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          lookbook_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          lookbook_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          lookbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lookbook_images_lookbook_id_fkey"
            columns: ["lookbook_id"]
            isOneToOne: false
            referencedRelation: "lookbooks"
            referencedColumns: ["id"]
          },
        ]
      }
      lookbooks: {
        Row: {
          behind_story: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          publish_date: string | null
          season: string | null
          status: string | null
          title: string
          updated_at: string | null
          video_url: string | null
          year: number | null
        }
        Insert: {
          behind_story?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          publish_date?: string | null
          season?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          year?: number | null
        }
        Update: {
          behind_story?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          publish_date?: string | null
          season?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          order_id: string
          price: number
          product_id: string | null
          product_name: string
          product_sku: string
          quantity: number
          size: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id: string
          price: number
          product_id?: string | null
          product_name: string
          product_sku: string
          quantity: number
          size?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id?: string
          price?: number
          product_id?: string | null
          product_name?: string
          product_sku?: string
          quantity?: number
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_id: string | null
          customer_name: string
          id: string
          notes: string | null
          order_number: string
          payment_status: string | null
          shipping_address: Json | null
          status: string | null
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_id?: string | null
          customer_name: string
          id?: string
          notes?: string | null
          order_number: string
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          id?: string
          notes?: string | null
          order_number?: string
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          colors: string[] | null
          created_at: string | null
          description: string | null
          discount_price: number | null
          fabric_type: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          name: string
          price: number
          sizes: string[] | null
          sku: string
          status: string | null
          stock_quantity: number | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          fabric_type?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          name: string
          price: number
          sizes?: string[] | null
          sku: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          fabric_type?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          name?: string
          price?: number
          sizes?: string[] | null
          sku?: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
