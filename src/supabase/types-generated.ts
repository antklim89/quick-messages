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
          subjectId: number
          updatedAt: string
        }
        Insert: {
          answerToId?: number | null
          authorId: string
          body: string
          createdAt?: string
          id?: number
          subjectId: number
          updatedAt: string
        }
        Update: {
          answerToId?: number | null
          authorId?: string
          body?: string
          createdAt?: string
          id?: number
          subjectId?: number
          updatedAt?: string
        }
      }
      profiles: {
        Row: {
          avatarUrl: string | null
          bio: string
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          avatarUrl?: string | null
          bio?: string
          createdAt?: string
          id: string
          name?: string
        }
        Update: {
          avatarUrl?: string | null
          bio?: string
          createdAt?: string
          id?: string
          name?: string
        }
      }
      reports: {
        Row: {
          body: string
          createdAt: string
          id: number
          messageId: number
        }
        Insert: {
          body: string
          createdAt?: string
          id?: number
          messageId: number
        }
        Update: {
          body?: string
          createdAt?: string
          id?: number
          messageId?: number
        }
      }
      subjects: {
        Row: {
          body: string
          createdAt: string
          id: number
        }
        Insert: {
          body: string
          createdAt?: string
          id?: number
        }
        Update: {
          body?: string
          createdAt?: string
          id?: number
        }
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
