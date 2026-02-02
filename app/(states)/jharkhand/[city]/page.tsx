import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCityInfoFromSlugs, getCityCoordinates, getRelatedCities, slugify } from '@/lib/cityData'
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo-utils'
import siteMetadata from '@/data/siteMetadata'

import FreightCalculator from '@/components/local/FreightCalculator'
import ContactCTA from '@/components/local/ContactCTA'
import CityMap from '@/components/local/CityMap'
import LocationIntro from '@/components/local/LocationIntro'
import HowBulkSupplyWorks from '@/components/local/HowBulkSupplyWorks'
import LocalContextSection from '@/components/local/LocalContextSection'
import WhyChooseSection from '@/components/local/WhyChooseSection'
import LocationFAQ from '@/components/local/LocationFAQ'

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

// State slug for this folder
const STATE_SLUG = 'jharkhand'
const STATE_NAME = 'Jharkhand'

/* ---------- Static Params ---------- */
export async function generateStaticParams() {
  const { getAllCities, slugify } = await import('@/lib/cityData')
  const allCities = getAllCities()

  const stateData = Object.entries(allCities).find(([state]) => slugify(state) === STATE_SLUG)

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

  const title = `Bulk Tea & Chai Supply in ${cityInfo.city} | BulkChai`
  const description = `Wholesale bulk tea and chai supply for businesses in ${cityInfo.city}, ${cityInfo.state}. GST billing, consistent quality, and reliable delivery for cafés, offices, canteens, and retailers.`

  return generatePageMetadata({
    title,
    description,
    canonical: `/${STATE_SLUG}/${city}`,
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
    { name: STATE_NAME, item: `/${STATE_SLUG}` },
    { name: cityInfo.city, item: `/${STATE_SLUG}/${city}` },
  ])

  const localBusinessSchema = generateLocalBusinessSchema({
    name: `Bulk Chai Supplier in ${cityInfo.city} - BulkChai`,
    description: `Premium wholesale bulk tea and chai supplier serving ${cityInfo.city}, ${cityInfo.state} and surrounding areas like ${cityInfo.nearbyAreas.join(', ')}.`,
    url: `${siteMetadata.siteUrl}/${STATE_SLUG}/${city}`,
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
            <Link href={`/${STATE_SLUG}`} className="hover:text-primary-600">
              {STATE_NAME}
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-gray-900 dark:text-gray-100">{cityInfo.city}</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="mb-6 text-4xl font-bold">
        Bulk Tea & Chai Supply in {cityInfo.city}
      </h1>

      {/* Location Intro */}
      <LocationIntro
        city={cityInfo.city}
        state={cityInfo.state}
        locationDescriptor={cityInfo.locationDescriptor}
        primaryBuyerTypes={cityInfo.primaryBuyerTypes}
        industries={cityInfo.industries}
        nearbyAreas={cityInfo.nearbyAreas}
      />

      {/* How Bulk Supply Works Section */}
      <HowBulkSupplyWorks
        city={cityInfo.city}
        state={cityInfo.state}
        transitDays={cityInfo.transitDays}
        stateLogistics={cityInfo.stateLogistics}
        supplyChain={cityInfo.supplyChain}
      />

      {/* Local Context Section */}
      <LocalContextSection
        city={cityInfo.city}
        localContext={cityInfo.localContext}
        cityContext={cityInfo.cityContext}
        usageFocus={cityInfo.usageFocus}
        educationAngle={cityInfo.educationAngle}
        localNote={cityInfo.localNote}
      />

      {/* Why Businesses Choose BulkChai */}
      <WhyChooseSection
        city={cityInfo.city}
        whyChooseUs={cityInfo.whyChooseUs}
        industries={cityInfo.industries}
        transitDays={cityInfo.transitDays}
      />

      {/* Freight Calculator */}
      <section className="mb-12">
        <FreightCalculator defaultCity={cityInfo.city} defaultState={cityInfo.state} />
      </section>

      {/* FAQ Section with JSON-LD */}
      <LocationFAQ
        city={cityInfo.city}
        state={cityInfo.state}
        faqs={cityInfo.faqs}
        transitDays={cityInfo.transitDays}
      />

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
              href={`/${related.stateSlug}/${related.citySlug}`}
              className="group rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-400"
            >
              <div className="mb-1 font-medium text-gray-900 group-hover:text-green-600 dark:text-gray-100 dark:group-hover:text-green-400">
                {related.city}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{related.state}</div>
            </Link>
          ))}
        </div>

        {/* Internal Link to All Locations */}
        <div className="mt-6 text-center">
          <Link
            href="/available-locations"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            View all delivery locations →
          </Link>
        </div>
      </section>
    </div>
  )
}
