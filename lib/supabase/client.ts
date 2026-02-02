import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export type PriceQuote = {
  id: string
  created_at: string
  updated_at: string
  name: string
  email: string
  phone: string | null
  company_name: string | null
  city: string
  state: string
  quantity_kg: number
  estimated_amount: number | null
  message: string | null
  resolved: boolean
  resolved_at: string | null
  resolved_by: string | null
  notes: string | null
  source_page: string | null
  turnstile_token: string | null
}

export type PriceQuoteInsert = Omit<
  PriceQuote,
  'id' | 'created_at' | 'updated_at' | 'resolved' | 'resolved_at' | 'resolved_by' | 'notes'
>
