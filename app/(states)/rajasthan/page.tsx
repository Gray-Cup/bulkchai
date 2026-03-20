import Link from 'next/link'
import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils'
import StateNavigator from '@/components/seo/StateNavigator'
import { getAllCities, slugify } from '@/lib/cityData'

// Static metadata for Rajasthan
export const metadata: Metadata = generatePageMetadata({
  title: `Bulk Chai Supplier in Rajasthan | Wholesale Tea for Hotels & Businesses | BulkChai`,
  description: `Leading bulk chai and CTC tea supplier in Rajasthan. We deliver wholesale tea to heritage hotels, offices, chai stalls, and retailers across Jaipur, Jodhpur, Udaipur, Bikaner and all of Rajasthan. GST billing, 50kg minimum order.`,
  canonical: '/rajasthan',
})

// Cities in Rajasthan
const citiesInState = ['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner']

export default function RajasthanPage() {
  const allData = getAllCities()
  const cityCount = 4

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/available-locations' },
    { name: 'Rajasthan', item: '/rajasthan' },
  ])

  return (
    <div className="px-0 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="my-5 text-sm text-gray-600 dark:text-gray-400">
        <ol className="flex items-center space-x-2 py-2">
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
          <li className="font-medium text-gray-900 dark:text-gray-100">Rajasthan</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Bulk Chai Supplier in Rajasthan
        </h1>
        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Gray Cup Enterprises is a trusted <strong>bulk chai supplier in Rajasthan</strong>,
          delivering wholesale CTC tea to hotels, restaurants, offices, and chai stalls across{' '}
          <strong>{cityCount} major cities</strong> — Jaipur, Jodhpur, Udaipur, and Bikaner. GST
          billing, consistent quality, and 50kg minimum order.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bulk Chai Delivery Across Rajasthan
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Our distribution network covers all major cities in Rajasthan.{' '}
                <strong>Jaipur</strong> is served through central Rajasthan routes with 4–5 day
                delivery. <strong>Jodhpur</strong>, <strong>Udaipur</strong>, and{' '}
                <strong>Bikaner</strong> are reached via western Rajasthan freight lanes in 5–6
                days.
              </p>
              <p>
                Whether you run a heritage hotel in Jaipur, a restaurant in Udaipur, a chai stall in
                Jodhpur, or an office canteen in Bikaner — we supply bulk CTC tea and wholesale chai
                with GST invoices and no hidden charges.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Available Cities in Rajasthan
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {citiesInState.map((city) => {
                const citySlug = slugify(city)
                return (
                  <Link
                    key={city}
                    href={`/rajasthan/${citySlug}`}
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
              Partner with Us in Rajasthan
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
