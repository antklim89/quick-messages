/* eslint-disable */
// @ts-nocheck

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
        Relationships: [
          {
            foreignKeyName: "favorites_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "likes_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          answerToId: number | null
          authorId: string
          body: string
          createdAt: string
          id: number
          subjectBody: string
          updatedAt: string
        }
        Insert: {
          answerToId?: number | null
          authorId: string
          body: string
          createdAt?: string
          id?: number
          subjectBody: string
          updatedAt: string
        }
        Update: {
          answerToId?: number | null
          authorId?: string
          body?: string
          createdAt?: string
          id?: number
          subjectBody?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_answerToId_fkey"
            columns: ["answerToId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_subjectBody_fkey"
            columns: ["subjectBody"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["body"]
          }
        ]
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "reports_messageId_fkey"
            columns: ["messageId"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          body: string
          createdAt: string
        }
        Insert: {
          body: string
          createdAt?: string
        }
        Update: {
          body?: string
          createdAt?: string
        }
        Relationships: []
      }
      subscription: {
        Row: {
          id: number
          subjectBody: string
          userId: string
        }
        Insert: {
          id?: number
          subjectBody: string
          userId: string
        }
        Update: {
          id?: number
          subjectBody?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_subjectBody_fkey"
            columns: ["subjectBody"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["body"]
          },
          {
            foreignKeyName: "subscription_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
