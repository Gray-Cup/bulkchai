import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllCityPages, getCityInfoFromSlugs } from '../../../lib/cityData'
import FreightCalculator from '@/components/local/FreightCalculator'
import ContactCTA from '@/components/local/ContactCTA'
import CityMap from '@/components/local/CityMap'

interface CityPageProps {
    params: Promise<{
        state: string
        city: string
    }>
}

// Generate static params for all city pages at build time
export async function generateStaticParams() {
    const allPages = getAllCityPages()
    return allPages
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { state, city } = await params
    const cityInfo = getCityInfoFromSlugs(state, city)

    if (!cityInfo) {
        return {
            title: 'City Not Found',
        }
    }

    const title = `Bulk CTC Tea Supplier in ${cityInfo.city}, ${cityInfo.state} | BulkCTC`
    const description = `Premium bulk CTC tea supplier serving ${cityInfo.city} and nearby areas in ${cityInfo.state}. Wholesale rates, GST billing, MOQ ${cityInfo.transitDays} delivery. Contact for quotes.`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
        alternates: {
            canonical: `/${state}/${city}`,
        },
    }
}

export default async function CityPage({ params }: CityPageProps) {
    const { state, city } = await params
    const cityInfo = getCityInfoFromSlugs(state, city)

    if (!cityInfo) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                            Home
                        </a>
                    </li>
                    <li>/</li>
                    <li>
                        <a
                            href="/available-locations"
                            className="hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            Locations
                        </a>
                    </li>
                    <li>/</li>
                    <li className="font-medium text-gray-900 dark:text-gray-100">{cityInfo.city}</li>
                </ol>
            </nav>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
                Bulk CTC Tea Supplier in {cityInfo.city}, {cityInfo.state}
            </h1>

            {/* City-specific Introduction */}
            <div className="prose prose-lg mb-8 dark:prose-invert">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Looking for a reliable <strong>bulk CTC tea supplier in {cityInfo.city}</strong>? We
                    provide premium wholesale tea to businesses across {cityInfo.city} and surrounding areas
                    including {cityInfo.nearbyAreas.slice(0, 3).join(', ')}, and other major localities. Our
                    service caters to {cityInfo.industries.join(', ')}, and wholesale distributors throughout{' '}
                    {cityInfo.state}.
                </p>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    We offer competitive wholesale rates with full <strong>GST billing</strong>, quality
                    assurance, and flexible minimum order quantities starting from <strong>50 kg</strong>.
                    Whether you're running a café chain, supplying corporate canteens, or managing a
                    distribution business in {cityInfo.city}, we ensure consistent supply of premium CTC tea
                    at wholesale prices.
                </p>
            </div>

            {/* State-specific Logistics */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Delivery & Logistics for {cityInfo.state}
                </h2>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                        {cityInfo.stateLogistics}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-md bg-white p-4 dark:bg-gray-900">
                            <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Estimated Delivery
                            </p>
                            <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                {cityInfo.transitDays}
                            </p>
                        </div>
                        <div className="rounded-md bg-white p-4 dark:bg-gray-900">
                            <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Minimum Order
                            </p>
                            <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">50 kg</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas Served */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Areas We Serve in {cityInfo.city}
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        We provide bulk CTC tea delivery across all major localities in {cityInfo.city},
                        including:
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {cityInfo.nearbyAreas.map((area) => (
                            <div
                                key={area}
                                className="rounded-md bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                                {area}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Don't see your area? We deliver across {cityInfo.city} and neighboring regions. Contact
                        us to confirm delivery availability.
                    </p>
                </div>
            </section>

            {/* Freight Calculator */}
            <section className="mb-12">
                <FreightCalculator defaultCity={cityInfo.city} defaultState={cityInfo.state} />
            </section>

            {/* Local Use Cases */}
            <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Who We Serve in {cityInfo.city}
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                            <svg
                                className="h-6 w-6 text-primary-600 dark:text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Cafés & Restaurants
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Consistent supply for cafés, restaurants, and QSR chains across {cityInfo.city}.
                            Perfect for high-volume tea service.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                            <svg
                                className="h-6 w-6 text-primary-600 dark:text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Corporate Offices
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Bulk tea supply for office canteens, corporate pantries, and employee refreshment
                            areas in {cityInfo.city}.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                            <svg
                                className="h-6 w-6 text-primary-600 dark:text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Distributors & Traders
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Wholesale CTC tea for distributors, retailers, and traders looking to supply the{' '}
                            {cityInfo.city} market.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="mb-12">
                <ContactCTA />
            </section>

            {/* City Map */}
            <section className="mb-12">
                <CityMap city={cityInfo.city} state={cityInfo.state} />
            </section>

            {/* Why Choose Us */}
            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Why Choose BulkCTC for {cityInfo.city}?
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                                Premium Quality CTC Tea
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sourced from the finest tea gardens, ensuring rich flavor and aroma for your
                                customers.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                                Competitive Wholesale Pricing
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Best rates for bulk orders with transparent pricing and GST invoicing.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                                Reliable Delivery Network
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Timely delivery across {cityInfo.city} with {cityInfo.transitDays} estimated
                                turnaround.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                                Flexible MOQ & Payment Terms
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Low minimum order of 50 kg with flexible payment options for established buyers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section for SEO */}
            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    <details className="group rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
                            What is the minimum order quantity for {cityInfo.city}?
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Our minimum order quantity is 50 kg for bulk CTC tea delivery in {cityInfo.city}.
                            This ensures cost-effective freight and wholesale pricing.
                        </p>
                    </details>

                    <details className="group rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
                            How long does delivery take to {cityInfo.city}?
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Typical delivery time to {cityInfo.city} is {cityInfo.transitDays} from order
                            confirmation. Exact timelines may vary based on quantity and delivery location within
                            the city.
                        </p>
                    </details>

                    <details className="group rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
                            Do you provide GST invoices?
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Yes, we provide complete GST invoicing for all bulk orders. This makes it easy for
                            businesses to claim input tax credit.
                        </p>
                    </details>

                    <details className="group rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
                            Can I get samples before placing a bulk order?
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Yes, we offer samples for quality verification. Contact us via WhatsApp or call to
                            request samples for {cityInfo.city} delivery.
                        </p>
                    </details>
                </div>
            </section>
        </div>
    )
}
