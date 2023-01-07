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
      favorites: {
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
          user: string
          message: number
        }
        Insert: {
          id?: number
          user: string
          message: number
        }
        Update: {
          id?: number
          user?: string
          message?: number
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
      has_liked:
        | {
            Args: { user_id: string }
            Returns: number
          }
        | {
            Args: { user_id: string }
            Returns: number
          }
        | {
            Args: { user_id: number }
            Returns: number
          }
      has_liked2: {
        Args: { user_id: number }
        Returns: boolean
      }
      is_liked:
        | {
            Args: { user_id: number }
            Returns: boolean
          }
        | {
            Args: { user_id: string }
            Returns: boolean
          }
      xxx: {
        Args: { user_id: number }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

