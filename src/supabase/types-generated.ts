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
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_userId_fkey"
            columns: ["userId"]
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
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_subjectBody_fkey"
            columns: ["subjectBody"]
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
      subscribe: {
        Row: {
          id: number
          subjectBody: string
          userId: string | null
        }
        Insert: {
          id?: number
          subjectBody: string
          userId?: string | null
        }
        Update: {
          id?: number
          subjectBody?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribe_subjectBody_fkey"
            columns: ["subjectBody"]
            referencedRelation: "subjects"
            referencedColumns: ["body"]
          },
          {
            foreignKeyName: "subscribe_userId_fkey"
            columns: ["userId"]
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
