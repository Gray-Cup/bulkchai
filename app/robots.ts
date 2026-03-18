import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
Host: ${siteMetadata.siteUrl}

# AI / LLM crawlers
LLMs-txt: ${siteMetadata.siteUrl}/llms.txt
`
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
