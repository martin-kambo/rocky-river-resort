/**
 * lib/supabase/types.ts
 * ─────────────────────────────────────────────────────────
 * Auto-generated Supabase database types.
 *
 * ⚠️  DO NOT HAND-EDIT THIS FILE.
 *
 * REGENERATE whenever you change the database schema:
 *
 *   npx supabase gen types typescript \
 *     --project-id YOUR_PROJECT_ID \
 *     > lib/supabase/types.ts
 *
 * Find YOUR_PROJECT_ID in:
 *   Supabase Dashboard → Project Settings → General → Reference ID
 *
 * ─────────────────────────────────────────────────────────
 * The block below is a STARTER SCHEMA that matches the
 * SQL you ran in Supabase. Once you run the gen command
 * above, this entire file gets replaced automatically.
 * ─────────────────────────────────────────────────────────
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {

      profiles: {
        Row: {
          id:         string
          user_id:    string
          role:       'admin' | 'super_admin'
          full_name:  string | null
          created_at: string
        }
        Insert: {
          id?:        string
          user_id:    string
          role?:      'admin' | 'super_admin'
          full_name?: string | null
          created_at?:string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }

      rooms: {
        Row: {
          id:               string
          slug:             string
          name:             string
          description:      string | null
          price_per_night:  number
          capacity:         number
          bedrooms:         number
          view_type:        string | null
          amenities:        string[]
          images:           string[]
          is_featured:      boolean
          is_available:     boolean
          created_at:       string
          updated_at:       string
        }
        Insert: {
          id?:              string
          slug:             string
          name:             string
          description?:     string | null
          price_per_night:  number
          capacity?:        number
          bedrooms?:        number
          view_type?:       string | null
          amenities?:       string[]
          images?:          string[]
          is_featured?:     boolean
          is_available?:    boolean
          created_at?:      string
          updated_at?:      string
        }
        Update: Partial<Database['public']['Tables']['rooms']['Insert']>
      }

      menu_categories: {
        Row: {
          id:          string
          name:        string
          slug:        string
          description: string | null
          sort_order:  number
          is_active:   boolean
        }
        Insert: {
          id?:          string
          name:         string
          slug:         string
          description?: string | null
          sort_order?:  number
          is_active?:   boolean
        }
        Update: Partial<Database['public']['Tables']['menu_categories']['Insert']>
      }

      menu_items: {
        Row: {
          id:           string
          category_id:  string | null
          name:         string
          description:  string | null
          price:        number
          image_url:    string | null
          tag:          'popular' | 'veg' | 'spicy' | null
          dietary:      string[]
          allergens:    string[]
          is_available: boolean
          is_featured:  boolean
          created_at:   string
        }
        Insert: {
          id?:           string
          category_id?:  string | null
          name:          string
          description?:  string | null
          price:         number
          image_url?:    string | null
          tag?:          'popular' | 'veg' | 'spicy' | null
          dietary?:      string[]
          allergens?:    string[]
          is_available?: boolean
          is_featured?:  boolean
          created_at?:   string
        }
        Update: Partial<Database['public']['Tables']['menu_items']['Insert']>
      }

      gallery: {
        Row: {
          id:           string
          title:        string | null
          image_url:    string
          category:     'rooms' | 'dining' | 'nature' | 'events' | 'general'
          sort_order:   number
          is_published: boolean
          created_at:   string
        }
        Insert: {
          id?:           string
          title?:        string | null
          image_url:     string
          category?:     'rooms' | 'dining' | 'nature' | 'events' | 'general'
          sort_order?:   number
          is_published?: boolean
          created_at?:   string
        }
        Update: Partial<Database['public']['Tables']['gallery']['Insert']>
      }

      testimonials: {
        Row: {
          id:           string
          guest_name:   string
          rating:       number
          content:      string
          stay_date:    string | null
          is_published: boolean
          created_at:   string
        }
        Insert: {
          id?:           string
          guest_name:    string
          rating:        number
          content:       string
          stay_date?:    string | null
          is_published?: boolean
          created_at?:   string
        }
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }

      events: {
        Row: {
          id:           string
          title:        string
          description:  string | null
          image_url:    string | null
          event_date:   string
          location:     string | null
          price:        number | null
          is_published: boolean
          created_at:   string
        }
        Insert: {
          id?:           string
          title:         string
          description?:  string | null
          image_url?:    string | null
          event_date:    string
          location?:     string | null
          price?:        number | null
          is_published?: boolean
          created_at?:   string
        }
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }

      contact_submissions: {
        Row: {
          id:         string
          full_name:  string
          email:      string
          phone:      string | null
          subject:    string | null
          message:    string
          is_read:    boolean
          created_at: string
        }
        Insert: {
          id?:        string
          full_name:  string
          email:      string
          phone?:     string | null
          subject?:   string | null
          message:    string
          is_read?:   boolean
          created_at?:string
        }
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
      }

      orders: {
        Row: {
          id:             string
          customer_name:  string
          customer_phone: string | null
          room_number:    string | null
          items:          Json
          total_amount:   number
          notes:          string | null
          status:         'pending' | 'confirmed' | 'delivered' | 'cancelled'
          created_at:     string
        }
        Insert: {
          id?:             string
          customer_name:   string
          customer_phone?: string | null
          room_number?:    string | null
          items:           Json
          total_amount:    number
          notes?:          string | null
          status?:         'pending' | 'confirmed' | 'delivered' | 'cancelled'
          created_at?:     string
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }

      site_settings: {
        Row: {
          key:        string
          value:      Json
          updated_at: string
        }
        Insert: {
          key:         string
          value:       Json
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }

    }

    Views:   Record<string, never>
    Functions: Record<string, never>
    Enums:   Record<string, never>
  }
}

// ─────────────────────────────────────────────────────────
// CONVENIENCE TYPES — extract row shapes from the schema
// Saves writing Database['public']['Tables']['rooms']['Row'] everywhere
// ─────────────────────────────────────────────────────────

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']