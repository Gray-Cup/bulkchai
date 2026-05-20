import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  supabase = createClient(url, key)
  return supabase
}

async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification')
    return true
  }
  const body = new URLSearchParams({ secret: secretKey, response: token })
  if (remoteip) body.append('remoteip', remoteip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const data = await res.json()
  return data.success === true
}

export async function POST(request: NextRequest) {
  try {
    const cashfreeClientId = process.env.CASHFREE_CLIENT_ID
    const cashfreeClientSecret = process.env.CASHFREE_CLIENT_SECRET

    if (!cashfreeClientId || !cashfreeClientSecret) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 })
    }

    const body = await request.json()
    const {
      name,
      phone,
      email,
      address,
      state,
      pincode,
      gstOrTaxId,
      businessType,
      customerType,
      products,
      tiers,
      totalAmount,
      turnstile_token,
    } = body

    if (!name || !phone || !email || !address || !pincode || !products?.length) {
      return NextResponse.json(
        {
          error:
            'Name, phone, email, address, pincode and at least one product are required',
        },
        { status: 400 }
      )
    }

    // Verify Turnstile
    if (turnstile_token) {
      const forwardedFor = request.headers.get('x-forwarded-for')
      const realIp = request.headers.get('x-real-ip')
      const cfIp = request.headers.get('cf-connecting-ip')
      const remoteip = cfIp || realIp || forwardedFor?.split(',')[0]?.trim()
      const valid = await verifyTurnstile(turnstile_token, remoteip || undefined)
      if (!valid) {
        return NextResponse.json({ error: 'Bot verification failed' }, { status: 400 })
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      return NextResponse.json({ error: 'Bot verification required' }, { status: 400 })
    }

    // Normalise phone
    const phoneDigits = String(phone).replace(/\D/g, '').slice(-12)
    const phoneForCashfree = String(phone).replace(/\D/g, '').slice(-10)

    // Determine dominant tier
    const tierCounts: Record<string, number> = {}
    ;(tiers as { slug: string; tier: string }[]).forEach(({ tier }) => {
      tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
    })
    const dominantTier =
      Object.entries(tierCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '3kg'

    // Generate unique link ID
    const linkId = `bc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    const expiry = new Date(Date.now() + 30 * 60 * 1000).toISOString()

    const productLabel = (products as string[]).slice(0, 3).join(', ')
    const purpose = `Bulk Chai — ${dominantTier} bags (${productLabel})`

    // Save to Supabase (non-blocking on failure)
    const client = getSupabaseClient()
    if (client) {
      const { error: dbError } = await client.from('chai_sample_orders').insert({
        name,
        phone: phoneDigits,
        email: email || null,
        address,
        state: state || null,
        pincode,
        gst_or_tax_id: gstOrTaxId || null,
        business_type: businessType || null,
        customer_type: customerType || 'individual',
        products: JSON.stringify(products),
        tiers: JSON.stringify(tiers),
        quantity_tier: dominantTier,
        total_amount: totalAmount,
        link_id: linkId,
        payment_status: 'pending',
      })
      if (dbError) {
        console.error('Supabase insert error:', dbError)
      }
    }

    // Create Cashfree payment link
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bulkchai.com'
    const cashfreeRes = await fetch('https://api.cashfree.com/pg/links', {
      method: 'POST',
      headers: {
        'x-client-id': cashfreeClientId,
        'x-client-secret': cashfreeClientSecret,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link_id: linkId,
        link_amount: totalAmount,
        link_currency: 'INR',
        link_purpose: purpose,
        customer_details: {
          customer_name: name,
          customer_phone: phoneForCashfree,
          customer_email: email,
        },
        link_meta: {
          return_url: `${siteUrl}/buy-chai/success?link_id=${linkId}`,
        },
        link_notify: {
          send_sms: true,
          send_email: !!email,
        },
        link_expiry_time: expiry,
      }),
    })

    const cashfreeData = await cashfreeRes.json()

    if (!cashfreeRes.ok) {
      return NextResponse.json(
        { error: cashfreeData.message || 'Payment gateway error' },
        { status: cashfreeRes.status }
      )
    }

    return NextResponse.json({ success: true, paymentLink: cashfreeData.link_url, linkId })
  } catch (err) {
    console.error('create-chai-order error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
