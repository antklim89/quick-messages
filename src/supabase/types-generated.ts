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
      favorite: {
        Row: {
          id: number
          user: string
          message: number | null
        }
        Insert: {
          id?: number
          user: string
          message?: number | null
        }
        Update: {
          id?: number
          user?: string
          message?: number | null
        }
      }
      likes: {
        Row: {
          id: number
          user: string | null
          message: number | null
        }
        Insert: {
          id?: number
          user?: string | null
          message?: number | null
        }
        Update: {
          id?: number
          user?: string | null
          message?: number | null
        }
      }
      messages: {
        Row: {
          id: number
          createdAt: string | null
          body: string | null
          author: string
          answerTo: number | null
        }
        Insert: {
          id?: number
          createdAt?: string | null
          body?: string | null
          author: string
          answerTo?: number | null
        }
        Update: {
          id?: number
          createdAt?: string | null
          body?: string | null
          author?: string
          answerTo?: number | null
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
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
  }
}

