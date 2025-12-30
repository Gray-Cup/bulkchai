import Link from 'next/link'
import { getAllCities, slugify } from '@/lib/cityData'

export default function FooterLocations() {
  const cities = getAllCities()
  const states = Object.keys(cities).sort()

  // Select top states for footer (first 10 sorted alphabetically for now, or could be manual)
  const keyStates = states.slice(0, 10)

  // Select popular cities (just taking first 2 from first 6 states for variety)
  const popularCities: { name: string; slug: string; stateSlug: string }[] = []

  for (const state of states.slice(0, 6)) {
    const stateCities = Object.keys(cities[state])
    for (const city of stateCities.slice(0, 2)) {
      popularCities.push({
        name: city,
        slug: slugify(city),
        stateSlug: slugify(state),
      })
    }
  }

  return (
    <div className="w-full border-t border-gray-200 bg-gray-50 pt-10 pb-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
              Popular Delivery Locations
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
              {popularCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.stateSlug}/${city.slug}`}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  >
                    Bulk Tea in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-gray-100">
              Browse by State
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
              {keyStates.map((state) => (
                <li key={state}>
                  <Link
                    href={`/${slugify(state)}`}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                  >
                    {state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/available-locations"
                  className="font-medium text-green-600 hover:text-green-700 dark:text-green-400"
                >
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
