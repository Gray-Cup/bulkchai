import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllCities, slugify } from '@/lib/cityData'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo-utils'
import StateNavigator from '@/components/seo/StateNavigator'
import siteMetadata from '@/data/siteMetadata'

interface StatePageProps {
  params: {
    state: string
  }
}

export async function generateStaticParams() {
  const cities = getAllCities()
  return Object.keys(cities).map((state) => ({
    state: slugify(state),
  }))
}

export async function generateMetadata({ params }: StatePageProps) {
  const { state: stateSlug } = await params
  const cities = getAllCities()

  // Find matching state (case insensitive search via slug)
  const stateName = Object.keys(cities).find((s) => slugify(s) === stateSlug)

  if (!stateName) return { title: 'State Not Found' }

  return generatePageMetadata({
    title: `Bulk Tea Supplier in ${stateName} | Wholesale Chai | BulkCTC`,
    description: `Leading bulk CTC tea supplier in ${stateName}. We deliver premium wholesale chai to hotels, offices, and retailers across ${stateName}. Check our delivery locations.`,
    canonical: `/${stateSlug}`,
  })
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params
  const allData = getAllCities()

  // Find state data
  const stateName = Object.keys(allData).find((s) => slugify(s) === stateSlug)

  if (!stateName) {
    notFound()
  }

  const citiesInState = allData[stateName]
  const cityCount = Object.keys(citiesInState).length

  // Collect a logistics overview from the first city if available, or generic
  const firstCityKey = Object.keys(citiesInState)[0]
  const logisticsInfo =
    citiesInState[firstCityKey]?.stateLogistics ||
    `We have distinctive logistics networks covering all major districts in ${stateName}.`

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Locations', item: '/available-locations' },
    { name: stateName, item: `/${stateSlug}` },
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
          <li className="font-medium text-gray-900 dark:text-gray-100">{stateName}</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Bulk Tea Supply in {stateName}
        </h1>
        <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Gray Cup Enterprises is a premier supplier of bulk CTC tea across{' '}
          <strong>{stateName}</strong>. We serve {cityCount} major cities in the region, providing
          consistent quality assurance, GST billing, and reliable logistics for businesses.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Supply Network in {stateName}
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Our distribution network in {stateName} is designed to meet the high-volume demands
                of wholesalers, semi-wholesalers, and institutional buyers.
                {logisticsInfo}
              </p>
              <p>
                Whether you are running a chain of tea stalls, a large café, or an industrial
                canteen, we ensure timely delivery of fresh stock directly to your doorstep.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Available Cities in {stateName}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.keys(citiesInState).map((city) => {
                const citySlug = slugify(city)
                return (
                  <Link
                    key={city}
                    href={`/${stateSlug}/${citySlug}`}
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
              Partner with Us in {stateName}
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
