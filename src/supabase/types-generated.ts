export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      favorites: {
        Row: {
          messageId: number
          userId: string
        }
        Insert: {
          messageId: number
          userId: string
        }
        Update: {
          messageId?: number
          userId?: string
        }
      }
      likes: {
        Row: {
          messageId: number
          userId: string
        }
        Insert: {
          messageId: number
          userId: string
        }
        Update: {
          messageId?: number
          userId?: string
        }
      }
      messages: {
        Row: {
          answerToId: number | null
          authorId: string
          body: string
          createdAt: string
          id: number
          updatedAt: string
        }
        Insert: {
          answerToId?: number | null
          authorId: string
          body: string
          createdAt?: string
          id?: number
          updatedAt: string
        }
        Update: {
          answerToId?: number | null
          authorId?: string
          body?: string
          createdAt?: string
          id?: number
          updatedAt?: string
        }
      }
      profiles: {
        Row: {
          bio: string
          id: string
          name: string
        }
        Insert: {
          bio?: string
          id: string
          name?: string
        }
        Update: {
          bio?: string
          id?: string
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
