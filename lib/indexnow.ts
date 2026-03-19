const HOST = 'www.bulkchai.com'
const INDEXNOW_API = 'https://api.indexnow.org/indexnow'

export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    console.error('[IndexNow] INDEXNOW_KEY environment variable is not set')
    return
  }

  try {
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${key}.txt`,
        urlList: urls,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[IndexNow] Non-200 response: ${res.status} ${res.statusText}`, text)
    }
  } catch (err) {
    console.error('[IndexNow] Failed to submit URLs:', err)
  }
}

/** Split URLs into chunks and submit sequentially. */
export async function submitToIndexNowBatched(urls: string[], chunkSize = 50): Promise<void> {
  for (let i = 0; i < urls.length; i += chunkSize) {
    await submitToIndexNow(urls.slice(i, i + chunkSize))
  }
}
