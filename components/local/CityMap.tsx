import { getCityCoordinates } from '@/lib/cityData'

interface CityMapProps {
    city: string
    state: string
}

export default function CityMap({ city, state }: CityMapProps) {
    const { lat, lng } = getCityCoordinates(city)

    // Google Maps embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(city + ', ' + state)}&zoom=12`

    // For now, using a static placeholder - you'll need to add your Google Maps API key
    const placeholderMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.1},${lat - 0.1},${lng + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lng}`

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
            <div className="bg-gray-100 px-4 py-3 dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Our Service Area in {city}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    We deliver across {city} and surrounding areas
                </p>
            </div>

            <div className="relative h-96 w-full bg-gray-200 dark:bg-gray-700">
                <iframe
                    src={placeholderMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${city}, ${state}`}
                    className="h-full w-full"
                />
            </div>

            <div className="bg-gray-50 px-4 py-3 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    📍 Serving all major localities in {city} and nearby areas
                </p>
            </div>
        </div>
    )
}
