import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}

async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
    return true
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  })

  if (remoteip) {
    body.append('remoteip', remoteip)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const data = await response.json()
  return data.success === true
}

export async function POST(request: NextRequest) {
  try {
    const client = getSupabaseClient()

    if (!client) {
      return NextResponse.json(
        { error: 'Database not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()

    const {
      name,
      email,
      phone,
      company_name,
      city,
      state,
      quantity_kg,
      estimated_amount,
      message,
      source_page,
      turnstile_token,
    } = body

    // Validate required fields
    if (!name || !email || !city || !state || !quantity_kg) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate quantity
    if (quantity_kg < 50) {
      return NextResponse.json({ error: 'Minimum quantity is 50kg' }, { status: 400 })
    }

    // Verify Turnstile token
    if (turnstile_token) {
      // Extract client IP from headers (works with Vercel, Cloudflare, and most proxies)
      const forwardedFor = request.headers.get('x-forwarded-for')
      const realIp = request.headers.get('x-real-ip')
      const cfConnectingIp = request.headers.get('cf-connecting-ip')
      const remoteip = cfConnectingIp || realIp || forwardedFor?.split(',')[0]?.trim()

      const isValid = await verifyTurnstile(turnstile_token, remoteip || undefined)
      if (!isValid) {
        return NextResponse.json({ error: 'Bot verification failed' }, { status: 400 })
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      return NextResponse.json({ error: 'Bot verification required' }, { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await client
      .from('bulk_chai_price_quotes')
      .insert({
        name,
        email,
        phone: phone || null,
        company_name: company_name || null,
        city,
        state,
        quantity_kg,
        estimated_amount: estimated_amount || null,
        message: message || null,
        source_page: source_page || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Quote submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
