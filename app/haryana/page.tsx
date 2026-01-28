import Link from 'next/link'
import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils'
import StateNavigator from '@/components/seo/StateNavigator'
import { getAllCities, slugify } from '@/lib/cityData'

// Static metadata for Haryana
export const metadata: Metadata = generatePageMetadata({
  title: `Bulk Tea Supplier in Haryana | Wholesale Chai | BulkCTC`,
  description: `Leading bulk CTC tea supplier in Haryana. We deliver premium wholesale chai to hotels, offices, and retailers across Haryana. Check our delivery locations.`,
  canonical: '/haryana',
})

// Cities in Haryana
const citiesInState = ['Faridabad', 'Gurugram', 'Panipat']

export default function HaryanaPage() {
  const allData = getAllCities()
  const cityCount = 3

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/available-locations' },
    { name: 'Haryana', item: '/haryana' },
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
          <li className="font-medium text-gray-900 dark:text-gray-100">Haryana</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Bulk Tea Supply in Haryana
        </h1>
        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Gray Cup Enterprises is a premier supplier of bulk CTC tea across <strong>Haryana</strong>
          . We serve {cityCount} major cities in the region, providing consistent quality assurance,
          GST billing, and reliable logistics for businesses.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Supply Network in Haryana
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Our distribution network in Haryana is designed to meet the high-volume demands of
                wholesalers, semi-wholesalers, and institutional buyers. NCR logistics networks
                serve Faridabad.
              </p>
              <p>
                Whether you are running a chain of tea stalls, a large caf\u00e9, or an industrial
                canteen, we ensure timely delivery of fresh stock directly to your doorstep.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Available Cities in Haryana
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {citiesInState.map((city) => {
                const citySlug = slugify(city)
                return (
                  <Link
                    key={city}
                    href={`/haryana/${citySlug}`}
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
              Partner with Us in Haryana
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
