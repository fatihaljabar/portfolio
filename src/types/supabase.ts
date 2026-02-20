/**
 * Supabase Database Types
 * Auto-generated types from Supabase schema
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
      Project: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image_url: string | null;
          is_featured: boolean;
          github_url: string | null;
          demo_url: string | null;
          tech_stack: string[];
          category: string | null;
          published_at: Date;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          image_url?: string | null;
          is_featured?: boolean;
          github_url?: string | null;
          demo_url?: string | null;
          tech_stack: string[];
          category?: string | null;
          published_at?: Date;
          created_at?: Date;
          updated_at?: Date;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          content?: string;
          image_url?: string | null;
          is_featured?: boolean;
          github_url?: string | null;
          demo_url?: string | null;
          tech_stack?: string[];
          category?: string | null;
          published_at?: Date;
          created_at?: Date;
          updated_at?: Date;
        };
      };
      Achievement: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          issuer: string;
          certificate_number: string | null;
          credential_url: string | null;
          image_url: string | null;
          issued_date: Date;
          type: 'PROFESSIONAL' | 'ACADEMIC' | 'COURSE' | 'BOOTCAMP' | 'CERTIFICATION';
          category: string | null;
          published_at: Date;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          issuer: string;
          certificate_number?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          issued_date: Date;
          type: 'PROFESSIONAL' | 'ACADEMIC' | 'COURSE' | 'BOOTCAMP' | 'CERTIFICATION';
          category?: string | null;
          published_at?: Date;
          created_at?: Date;
          updated_at?: Date;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          issuer?: string;
          certificate_number?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          issued_date?: Date;
          type?: 'PROFESSIONAL' | 'ACADEMIC' | 'COURSE' | 'BOOTCAMP' | 'CERTIFICATION';
          category?: string | null;
          published_at?: Date;
          created_at?: Date;
          updated_at?: Date;
        };
      };
      Message: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          is_read: boolean;
          created_at: Date;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          is_read?: boolean;
          created_at?: Date;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          is_read?: boolean;
          created_at?: Date;
        };
      };
      Love: {
        Row: {
          id: string;
          ip_address: string;
          user_agent: string | null;
          is_active: boolean;
          created_at: Date;
          updated_at: Date;
        };
        Insert: {
          id?: string;
          ip_address: string;
          user_agent?: string | null;
          is_active?: boolean;
          created_at?: Date;
          updated_at?: Date;
        };
        Update: {
          id?: string;
          ip_address?: string;
          user_agent?: string | null;
          is_active?: boolean;
          created_at?: Date;
          updated_at?: Date;
        };
      };
      LoveAnalytics: {
        Row: {
          id: string;
          ip_address: string;
          user_agent: string | null;
          referrer: string | null;
          created_at: Date;
        };
        Insert: {
          id?: string;
          ip_address: string;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: Date;
        };
        Update: {
          id?: string;
          ip_address?: string;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: Date;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
