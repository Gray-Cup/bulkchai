/**
 * State Pages Generator
 *
 * This script reads cities.json and generates individual TSX pages for each state.
 * Each state gets its own folder with a page.tsx and a [city]/page.tsx
 *
 * Run with: node scripts/generate-state-pages.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read cities.json
const citiesPath = path.join(__dirname, '../cities.json')
const citiesData = JSON.parse(fs.readFileSync(citiesPath, 'utf-8'))

// Slugify function (same as in cityData.ts)
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]+/g, '')
}

// Template for state page
function generateStatePageTemplate(stateName, cities, stateSlug) {
  const cityList = Object.keys(cities)
  const cityCount = cityList.length
  const firstCityData = cities[cityList[0]]
  const logisticsInfo = firstCityData?.stateLogistics || `We have distinctive logistics networks covering all major districts in ${stateName}.`

  return `import Link from 'next/link'
import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils'
import StateNavigator from '@/components/seo/StateNavigator'
import { getAllCities, slugify } from '@/lib/cityData'

// Static metadata for ${stateName}
export const metadata: Metadata = generatePageMetadata({
  title: \`Bulk Tea Supplier in ${stateName} | Wholesale Chai | BulkCTC\`,
  description: \`Leading bulk CTC tea supplier in ${stateName}. We deliver premium wholesale chai to hotels, offices, and retailers across ${stateName}. Check our delivery locations.\`,
  canonical: '/${stateSlug}',
})

// Cities in ${stateName}
const citiesInState = ${JSON.stringify(cityList, null, 2)}

export default function ${stateName.replace(/[^a-zA-Z]/g, '')}Page() {
  const allData = getAllCities()
  const cityCount = ${cityCount}

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/available-locations' },
    { name: '${stateName}', item: '/${stateSlug}' },
  ])

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/available-locations" className="hover:text-primary-600">
              Locations
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-gray-900 dark:text-gray-100">${stateName}</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Bulk Tea Supply in ${stateName}
        </h1>
        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Gray Cup Enterprises is a premier supplier of bulk CTC tea across{' '}
          <strong>${stateName}</strong>. We serve {cityCount} major cities in the region, providing
          consistent quality assurance, GST billing, and reliable logistics for businesses.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Supply Network in ${stateName}
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Our distribution network in ${stateName} is designed to meet the high-volume demands
                of wholesalers, semi-wholesalers, and institutional buyers.
                ${logisticsInfo.replace(/"/g, '\\"')}
              </p>
              <p>
                Whether you are running a chain of tea stalls, a large caf\\u00e9, or an industrial
                canteen, we ensure timely delivery of fresh stock directly to your doorstep.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Available Cities in ${stateName}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {citiesInState.map((city) => {
                const citySlug = slugify(city)
                return (
                  <Link
                    key={city}
                    href={\`/${stateSlug}/\${citySlug}\`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 transition-colors hover:border-green-500 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">{city}</span>
                    <span className="text-sm text-gray-500">View Details →</span>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="rounded-xl bg-green-50 p-6 dark:bg-green-900/10">
            <h3 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-400">
              Partner with Us in ${stateName}
            </h3>
            <p className="mb-4 text-green-700 dark:text-green-300">
              Looking for a reliable long-term tea partner? We offer sample testing and custom
              blending options for large orders.
            </p>
            <Link
              href="/contact-us"
              className="inline-block rounded-md bg-green-600 px-6 py-2 font-medium text-white transition-colors hover:bg-green-700"
            >
              Request Samples
            </Link>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24">
            <StateNavigator states={allData} />

            <div className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h4 className="mb-2 font-bold text-gray-900 dark:text-gray-100">Quick Facts</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex justify-between">
                  <span>Cities Covered:</span>
                  <span className="font-medium">{cityCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Min Order:</span>
                  <span className="font-medium">50 kg</span>
                </li>
                <li className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-medium">3-7 Days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
`
}

// Template for city page
function generateCityPageTemplate(stateName, stateSlug) {
  return `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCityInfoFromSlugs,
  getCityCoordinates,
  getRelatedCities,
  slugify,
} from '@/lib/cityData'
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo-utils'
import siteMetadata from '@/data/siteMetadata'

import FreightCalculator from '@/components/local/FreightCalculator'
import ContactCTA from '@/components/local/ContactCTA'
import CityMap from '@/components/local/CityMap'

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

// State slug for this folder
const STATE_SLUG = '${stateSlug}'
const STATE_NAME = '${stateName}'

/* ---------- Static Params ---------- */
export async function generateStaticParams() {
  const { getAllCities, slugify } = await import('@/lib/cityData')
  const allCities = getAllCities()

  const stateData = Object.entries(allCities).find(
    ([state]) => slugify(state) === STATE_SLUG
  )

  if (!stateData) return []

  const [, cities] = stateData
  return Object.keys(cities).map((city) => ({
    city: slugify(city),
  }))
}

/* ---------- Metadata ---------- */
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params
  const cityInfo = getCityInfoFromSlugs(STATE_SLUG, city)

  if (!cityInfo) {
    return { title: 'City Not Found' }
  }

  const title = \`Bulk CTC Tea Supplier in \${cityInfo.city}, \${cityInfo.state} | BulkCTC\`
  const description = \`Wholesale bulk CTC tea supply for businesses in \${cityInfo.city}, \${cityInfo.state}. GST billing, consistent quality, and reliable delivery across nearby areas.\`

  return generatePageMetadata({
    title,
    description,
    canonical: \`/\${STATE_SLUG}/\${city}\`,
  })
}

/* ---------- Page ---------- */
export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params
  const cityInfo = getCityInfoFromSlugs(STATE_SLUG, city)

  if (!cityInfo) {
    notFound()
  }

  const relatedCities = getRelatedCities(cityInfo.citySlug)
  const cityCoords = getCityCoordinates(cityInfo.city)

  // Schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/available-locations' },
    { name: STATE_NAME, item: \`/\${STATE_SLUG}\` },
    { name: cityInfo.city, item: \`/\${STATE_SLUG}/\${city}\` },
  ])

  const localBusinessSchema = generateLocalBusinessSchema({
    name: \`Bulk Chai Supplier in \${cityInfo.city} - BulkCTC\`,
    description: \`Premium wholesale bulk CTC tea supplier serving \${cityInfo.city}, \${cityInfo.state} and surrounding areas like \${cityInfo.nearbyAreas.join(', ')}.\`,
    url: \`\${siteMetadata.siteUrl}/\${STATE_SLUG}/\${city}\`,
    address: {
      addressLocality: cityInfo.city,
      addressRegion: cityInfo.state,
      addressCountry: 'IN',
    },
    geo: {
      latitude: cityCoords.lat,
      longitude: cityCoords.lng,
    },
    telephone: siteMetadata.contactPoint.telephone,
    priceRange: '₹₹',
  })

  return (
    <div className="mx-auto max-w-4xl">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/available-locations" className="hover:text-primary-600">
              Locations
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={\`/\${STATE_SLUG}\`} className="hover:text-primary-600">
              {STATE_NAME}
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-gray-900 dark:text-gray-100">{cityInfo.city}</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="mb-6 text-4xl font-bold">
        Bulk CTC Tea Supplier in {cityInfo.city}, {cityInfo.state}
      </h1>

      {/* Intro */}
      <div className="prose prose-lg dark:prose-invert mb-10">
        <p>
          Businesses in <strong>{cityInfo.city}</strong> rely on consistent bulk CTC tea supply for
          daily operations across cafes, offices, and retail outlets. We serve major localities such
          as {cityInfo.nearbyAreas.slice(0, 3).join(', ')} and surrounding regions.
        </p>

        <p>
          Orders are fulfilled with GST billing, quality checks, and a minimum order quantity of{' '}
          <strong>50 kg</strong>, ensuring stable supply for growing businesses across{' '}
          {cityInfo.state}.
        </p>
      </div>

      {/* Anti-spam local context */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Bulk Chai Preferences in {cityInfo.city}</h2>
        <div className="prose dark:prose-invert">
          <p>{cityInfo.cityContext}</p>
          <p>{cityInfo.usageFocus}</p>
          <p>{cityInfo.educationAngle}</p>
          <p className="text-sm text-gray-600">{cityInfo.localNote}</p>
        </div>
      </section>

      {/* Logistics */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Delivery & Logistics in {cityInfo.state}</h2>
        <div className="rounded-lg border bg-gray-50 p-6 dark:bg-gray-800">
          <p>{cityInfo.stateLogistics}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded bg-white p-4 dark:bg-gray-900">
              <p className="text-sm">Estimated Delivery</p>
              <p className="text-lg font-semibold">{cityInfo.transitDays}</p>
            </div>
            <div className="rounded bg-white p-4 dark:bg-gray-900">
              <p className="text-sm">Minimum Order</p>
              <p className="text-lg font-semibold">50 kg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Freight Calculator */}
      <section className="mb-12">
        <FreightCalculator defaultCity={cityInfo.city} defaultState={cityInfo.state} />
      </section>

      {/* CTA */}
      <section className="mb-12">
        <ContactCTA />
      </section>

      {/* Map */}
      <section className="mb-12">
        <CityMap city={cityInfo.city} state={cityInfo.state} />
      </section>

      {/* Related Cities & Internal Linking */}
      <section className="mb-16 border-t border-gray-200 pt-10 dark:border-gray-700">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Nearby Delivery Locations
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {relatedCities.map((related) => (
            <Link
              key={related.citySlug}
              href={\`/\${related.stateSlug}/\${related.citySlug}\`}
              className="group rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-400"
            >
              <div className="mb-1 font-medium text-gray-900 group-hover:text-green-600 dark:text-gray-100 dark:group-hover:text-green-400">
                {related.city}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{related.state}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
`
}

// Main generation function
async function generatePages() {
  const appDir = path.join(__dirname, '../app')

  console.log('Starting state page generation...\n')

  let statesCreated = 0
  let citiesCreated = 0

  for (const [stateName, cities] of Object.entries(citiesData)) {
    const stateSlug = slugify(stateName)
    const stateDir = path.join(appDir, stateSlug)
    const cityDir = path.join(stateDir, '[city]')

    // Create state folder
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true })
    }

    // Create [city] folder
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true })
    }

    // Generate state page
    const statePageContent = generateStatePageTemplate(stateName, cities, stateSlug)
    const statePagePath = path.join(stateDir, 'page.tsx')
    fs.writeFileSync(statePagePath, statePageContent)
    console.log(`Created: app/${stateSlug}/page.tsx`)
    statesCreated++

    // Generate city page template for this state
    const cityPageContent = generateCityPageTemplate(stateName, stateSlug)
    const cityPagePath = path.join(cityDir, 'page.tsx')
    fs.writeFileSync(cityPagePath, cityPageContent)
    console.log(`Created: app/${stateSlug}/[city]/page.tsx`)
    citiesCreated++
  }

  console.log(`\n✅ Generation complete!`)
  console.log(`   - ${statesCreated} state pages created`)
  console.log(`   - ${citiesCreated} city page templates created`)
  console.log(`\nYou can now customize each state page individually in app/<state-slug>/page.tsx`)
  console.log(`\nNote: You may want to delete the old app/[state] folder after verifying the new pages work.`)
}

generatePages().catch(console.error)
