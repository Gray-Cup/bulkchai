import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCities, slugify } from '@/lib/cityData'

export const metadata: Metadata = {
    title: 'Available Locations - Bulk CTC Tea Supplier Across India | BulkCTC',
    description:
        'Find bulk CTC tea suppliers in your city. We deliver premium wholesale tea across 70+ cities in India. View all locations and get competitive quotes.',
    openGraph: {
        title: 'Available Locations - Bulk CTC Tea Supplier Across India',
        description: 'Premium bulk CTC tea delivery across major Indian cities with wholesale pricing.',
        type: 'website',
    },
}

export default function AvailableLocationsPage() {
    const cities = getAllCities()
    const stateEntries = Object.entries(cities).sort((a, b) => a[0].localeCompare(b[0]))

    return (
        <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
                    Available Delivery Locations
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                    We supply premium bulk CTC tea to businesses across India. Select your state and city to
                    view detailed delivery information, pricing, and estimated transit times.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-12 grid gap-6 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-4xl font-bold text-primary-600 dark:text-primary-400">
                        {stateEntries.length}+
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">States Covered</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-4xl font-bold text-primary-600 dark:text-primary-400">
                        {Object.values(cities).flat().length}+
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cities Served</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-4xl font-bold text-primary-600 dark:text-primary-400">50 kg</p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Minimum Order</p>
                </div>
            </div>

            {/* States & Cities Grid */}
            <div className="space-y-8">
                {stateEntries.map(([state, cityList]) => {
                    const stateSlug = slugify(state)
                    const sortedCities = [...cityList].sort((a, b) => a.localeCompare(b))

                    return (
                        <div
                            key={state}
                            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
                        >
                            {/* State Header */}
                            <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{state}</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {cityList.length} {cityList.length === 1 ? 'city' : 'cities'} available
                                </p>
                            </div>

                            {/* Cities Grid */}
                            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {sortedCities.map((city) => {
                                    const citySlug = slugify(city)
                                    const cityUrl = `/${stateSlug}/${citySlug}`

                                    return (
                                        <Link
                                            key={city}
                                            href={cityUrl}
                                            className="group flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-3 transition-all hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400 dark:hover:bg-gray-700"
                                        >
                                            <span className="font-medium text-gray-900 dark:text-gray-100">{city}</span>
                                            <svg
                                                className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* CTA Section */}
            <div className="mt-12 rounded-lg border border-gray-200 bg-gradient-to-br from-primary-50 to-primary-100 p-8 text-center dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Don't See Your City?
                </h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    We're constantly expanding our delivery network. Contact us to check if we can deliver to
                    your location.
                </p>
                <a
                    href="https://wa.me/919876543210?text=Hi, I want to check if you deliver to my city"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                    Contact Us on WhatsApp
                </a>
            </div>

            {/* SEO Content */}
            <div className="prose prose-lg mt-12 dark:prose-invert">
                <h2>Bulk CTC Tea Delivery Across India</h2>
                <p>
                    BulkCTC is your trusted partner for wholesale CTC tea supply across major commercial and
                    industrial hubs in India. We serve cafés, restaurants, corporate offices, hotels, and
                    distributors with premium quality tea at competitive wholesale rates.
                </p>
                <p>
                    Our delivery network covers all major metro cities and tier-2 commercial centers,
                    ensuring reliable supply chains for your business. Every order comes with proper GST
                    invoicing, quality assurance, and flexible payment terms for established buyers.
                </p>
                <h3>Why Choose BulkCTC?</h3>
                <ul>
                    <li>
                        <strong>Wide Coverage:</strong> Serving 70+ cities across 23 states
                    </li>
                    <li>
                        <strong>Fast Delivery:</strong> 1-5 business days depending on location
                    </li>
                    <li>
                        <strong>Low MOQ:</strong> Minimum order starting from just 50 kg
                    </li>
                    <li>
                        <strong>Competitive Pricing:</strong> Best wholesale rates with transparent pricing
                    </li>
                    <li>
                        <strong>Quality Assured:</strong> Premium CTC tea from trusted sources
                    </li>
                    <li>
                        <strong>GST Invoicing:</strong> Complete tax compliance for your business
                    </li>
                </ul>
            </div>
        </div>
    )
}
