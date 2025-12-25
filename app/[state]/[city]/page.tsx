import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllCityPages, getCityInfoFromSlugs } from '../../../lib/cityData'

import FreightCalculator from '@/components/local/FreightCalculator'
import ContactCTA from '@/components/local/ContactCTA'
import CityMap from '@/components/local/CityMap'

interface CityPageProps {
  params: {
    state: string
    city: string
  }
}

/* ---------- Static Params ---------- */
export async function generateStaticParams() {
  return getAllCityPages()
}

/* ---------- Metadata ---------- */
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { state, city } = params
  const cityInfo = getCityInfoFromSlugs(state, city)

  if (!cityInfo) {
    return { title: 'City Not Found' }
  }

  const title = `Bulk CTC Tea Supplier in ${cityInfo.city}, ${cityInfo.state} | BulkCTC`
  const description = `Wholesale bulk CTC tea supply for businesses in ${cityInfo.city}, ${cityInfo.state}. GST billing, consistent quality, and reliable delivery across nearby areas.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${state}/${city}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

/* ---------- Page ---------- */
export default async function CityPage({ params }: CityPageProps) {
  const { state, city } = params
  const cityInfo = getCityInfoFromSlugs(state, city)

  if (!cityInfo) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl">
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
          daily operations across cafés, offices, and retail outlets. We serve major localities such
          as {cityInfo.nearbyAreas.slice(0, 3).join(', ')} and surrounding regions.
        </p>

        <p>
          Orders are fulfilled with GST billing, quality checks, and a minimum order quantity of{' '}
          <strong>50 kg</strong>, ensuring stable supply for growing businesses across{' '}
          {cityInfo.state}.
        </p>
      </div>

      {/* ✅ Anti-spam local context (IMPORTANT) */}
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
    </div>
  )
}
