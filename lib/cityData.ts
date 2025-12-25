import citiesData from '../cities.json'

// Types
export interface CityData {
  nearbyAreas: string[]
  industries: string[]
  transitDays: string
  stateLogistics: string
  cityContext: string
  usageFocus: string
  educationAngle: string
  localNote: string
}

export interface StateData {
  [state: string]: {
    [city: string]: CityData
  }
}

export interface CityInfo {
  city: string
  state: string
  citySlug: string
  stateSlug: string

  nearbyAreas: string[]
  industries: string[]
  transitDays: string
  stateLogistics: string

  // ✅ Anti-spam / local context fields
  cityContext: string
  usageFocus: string
  educationAngle: string
  localNote: string
}

// Convert string to URL-safe slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w-]+/g, '')
}

// Get all cities organized by state
export function getAllCities(): StateData {
  return citiesData as StateData
}

// Get all state slugs
export function getAllStatesSlugs(): string[] {
  const cities = getAllCities()
  return Object.keys(cities).map(slugify)
}

// Get all city pages as [stateSlug, citySlug] pairs for generateStaticParams
export function getAllCityPages(): Array<{ state: string; city: string }> {
  const cities = getAllCities()
  const pages: Array<{ state: string; city: string }> = []

  Object.entries(cities).forEach(([state, cityData]) => {
    const stateSlug = slugify(state)
    Object.keys(cityData).forEach((city) => {
      pages.push({
        state: stateSlug,
        city: slugify(city),
      })
    })
  })

  return pages
}

// Find state and city names from slugs
export function getCityInfoFromSlugs(stateSlug: string, citySlug: string): CityInfo | null {
  const cities = getAllCities()

  for (const [state, cityData] of Object.entries(cities)) {
    if (slugify(state) === stateSlug) {
      for (const [city, data] of Object.entries(cityData)) {
        if (slugify(city) === citySlug) {
          return {
            city,
            state,
            citySlug,
            stateSlug,
            nearbyAreas: data.nearbyAreas,
            industries: data.industries,
            transitDays: data.transitDays,
            stateLogistics: data.stateLogistics,
            cityContext: data.cityContext,
            usageFocus: data.usageFocus,
            educationAngle: data.educationAngle,
            localNote: data.localNote,
          }
        }
      }
    }
  }

  return null
}

// Business contact details
export const contactInfo = {
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'bulk@bulkctc.com',
  businessHours: 'Mon-Sat: 9:00 AM - 6:00 PM',
  moq: '50 kg',
}

// Get city coordinates for map embed (approximate city centers)
export function getCityCoordinates(city: string): { lat: number; lng: number } {
  const coordMap: { [key: string]: { lat: number; lng: number } } = {
    // Maharashtra
    Mumbai: { lat: 19.076, lng: 72.8777 },
    Pune: { lat: 18.5204, lng: 73.8567 },
    Nagpur: { lat: 21.1458, lng: 79.0882 },
    Nashik: { lat: 19.9975, lng: 73.7898 },
    Thane: { lat: 19.2183, lng: 72.9781 },

    // Karnataka
    Bengaluru: { lat: 12.9716, lng: 77.5946 },
    Mysuru: { lat: 12.2958, lng: 76.6394 },

    // Tamil Nadu
    Chennai: { lat: 13.0827, lng: 80.2707 },
    Coimbatore: { lat: 11.0168, lng: 76.9558 },

    // Telangana
    Hyderabad: { lat: 17.385, lng: 78.4867 },

    // Gujarat
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Surat: { lat: 21.1702, lng: 72.8311 },

    // Uttar Pradesh
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Kanpur: { lat: 26.4499, lng: 80.3319 },

    // West Bengal
    Kolkata: { lat: 22.5726, lng: 88.3639 },

    // Add more as needed
  }

  // Default fallback
  return coordMap[city] || { lat: 20.5937, lng: 78.9629 } // India center
}
