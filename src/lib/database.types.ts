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
            appointments: {
                Row: {
                    created_at: string | null
                    duration: string | null
                    id: number
                    patient: string
                    procedure: string | null
                    status: string | null
                    time: string | null
                }
                Insert: {
                    created_at?: string | null
                    duration?: string | null
                    id?: never
                    patient: string
                    procedure?: string | null
                    status?: string | null
                    time?: string | null
                }
                Update: {
                    created_at?: string | null
                    duration?: string | null
                    id?: never
                    patient?: string
                    procedure?: string | null
                    status?: string | null
                    time?: string | null
                }
                Relationships: []
            }
            campaigns: {
                Row: {
                    appointments: number | null
                    created_at: string | null
                    id: number
                    leads: number | null
                    name: string
                    service: string | null
                    spend: string | null
                    status: string | null
                }
                Insert: {
                    appointments?: number | null
                    created_at?: string | null
                    id?: never
                    leads?: number | null
                    name: string
                    service?: string | null
                    spend?: string | null
                    status?: string | null
                }
                Update: {
                    appointments?: number | null
                    created_at?: string | null
                    id?: never
                    leads?: number | null
                    name?: string
                    service?: string | null
                    spend?: string | null
                    status?: string | null
                }
                Relationships: []
            }
            leads: {
                Row: {
                    attempts: number | null
                    created_at: string | null
                    id: number
                    name: string
                    phone: string | null
                    service: string | null
                    source: string | null
                    status: string | null
                    time: string | null
                }
                Insert: {
                    attempts?: number | null
                    created_at?: string | null
                    id?: never
                    name: string
                    phone?: string | null
                    service?: string | null
                    source?: string | null
                    status?: string | null
                    time?: string | null
                }
                Update: {
                    attempts?: number | null
                    created_at?: string | null
                    id?: never
                    name?: string
                    phone?: string | null
                    service?: string | null
                    source?: string | null
                    status?: string | null
                    time?: string | null
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
