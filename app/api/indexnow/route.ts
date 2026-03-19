import { NextRequest, NextResponse } from 'next/server'
import { submitToIndexNowBatched } from '@/lib/indexnow'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('urls' in body) ||
    !Array.isArray((body as { urls: unknown }).urls)
  ) {
    return NextResponse.json(
      { success: false, error: 'Body must contain a "urls" array' },
      { status: 400 }
    )
  }

  const { urls } = body as { urls: unknown[] }

  if (urls.length === 0) {
    return NextResponse.json({ success: false, error: '"urls" must not be empty' }, { status: 400 })
  }

  if (urls.length > 10_000) {
    return NextResponse.json(
      { success: false, error: '"urls" must contain at most 10,000 entries' },
      { status: 400 }
    )
  }

  if (urls.some((u) => typeof u !== 'string')) {
    return NextResponse.json(
      { success: false, error: 'All entries in "urls" must be strings' },
      { status: 400 }
    )
  }

  await submitToIndexNowBatched(urls as string[])

  return NextResponse.json({ success: true, submitted: urls.length })
}
