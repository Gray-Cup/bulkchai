import { getAllCityPages } from '@/lib/cityData'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = siteMetadata.siteUrl
  const cityPages = getAllCityPages()

  // Group cities by state for readability
  const byState: Record<string, string[]> = {}
  for (const { state, city } of cityPages) {
    if (!byState[state]) byState[state] = []
    byState[state].push(city)
  }

  const stateLines = Object.entries(byState)
    .map(([state, cities]) => {
      const cityLinks = cities
        .map((city) => `  - [${city}](${siteUrl}/${state}/${city})`)
        .join('\n')
      return `- [${state}](${siteUrl}/${state})\n${cityLinks}`
    })
    .join('\n')

  const content = `# BulkChai — Bulk Tea & Chai Supplier in India

> Wholesale CTC tea supply for businesses across India. Serving cafes, offices, canteens, hotels, and retailers with GST-compliant invoicing, consistent quality, and pan-India logistics.

## About

BulkChai is operated by Gray Cup Enterprises Pvt. Ltd. We supply bulk CTC tea (minimum 50 kg per order) to institutional and commercial buyers across India. Orders include GST billing, quality checks, and direct dispatch to your location.

- Minimum order: 50 kg
- Packaging: 25 kg sealed bags, 50 kg bulk packs
- Payment: 100% advance with GST invoice
- Delivery: 3–7 business days depending on location

## Key Pages

- [Home](${siteUrl}/)
- [Available Locations](${siteUrl}/available-locations)
- [Blog](${siteUrl}/blog)
- [About](${siteUrl}/about)
- [Contact](${siteUrl}/contact-us)
- [Products](${siteUrl}/products)
- [Sitemap](${siteUrl}/sitemap.xml)

## Delivery Locations by State

${stateLines}

## Contact

- WhatsApp: +91 85279 14317
- Email: bulk@graycup.in
- Website: ${siteUrl}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
