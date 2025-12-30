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

  // SEO fields
  population?: string // e.g. "1.5 Million"
  industrySize?: string // e.g. "High"
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

// Get related/nearby cities for internal linking
export function getRelatedCities(currentCitySlug: string, count: number = 6): CityInfo[] {
  const allCities = getAllCities()
  const flatCities: CityInfo[] = []

  // Flatten structure
  for (const [state, cityData] of Object.entries(allCities)) {
    const stateSlug = slugify(state)
    for (const [city, data] of Object.entries(cityData)) {
      flatCities.push({
        city,
        state,
        citySlug: slugify(city),
        stateSlug,
        nearbyAreas: data.nearbyAreas,
        industries: data.industries,
        transitDays: data.transitDays,
        stateLogistics: data.stateLogistics,
        cityContext: data.cityContext,
        usageFocus: data.usageFocus,
        educationAngle: data.educationAngle,
        localNote: data.localNote,
      })
    }
  }

  // Filter out current city
  const otherCities = flatCities.filter((c) => c.citySlug !== currentCitySlug)

  // 1. Prioritize same state
  const currentCity = flatCities.find((c) => c.citySlug === currentCitySlug)
  if (!currentCity) return otherCities.slice(0, count)

  const sameState = otherCities.filter((c) => c.stateSlug === currentCity.stateSlug)
  const diffState = otherCities.filter((c) => c.stateSlug !== currentCity.stateSlug)

  // Shuffle arrays to give variety (simple shuffle)
  const shuffledSameState = sameState.sort(() => 0.5 - Math.random())
  const shuffledDiffState = diffState.sort(() => 0.5 - Math.random())

  return [...shuffledSameState, ...shuffledDiffState].slice(0, count)
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
    Aurangabad: { lat: 19.8762, lng: 75.3433 },
    Solapur: { lat: 17.6599, lng: 75.9064 },
    Kolhapur: { lat: 16.705, lng: 74.2433 },
    Amravati: { lat: 20.932, lng: 77.7523 },
    Jalgaon: { lat: 21.0077, lng: 75.5626 },

    // Karnataka
    Bengaluru: { lat: 12.9716, lng: 77.5946 },
    Mysuru: { lat: 12.2958, lng: 76.6394 },
    'Hubli Dharwad': { lat: 15.3647, lng: 75.124 },
    Belagavi: { lat: 15.8497, lng: 74.4977 },
    Mangalore: { lat: 12.9141, lng: 74.856 },
    Ballari: { lat: 15.1394, lng: 76.9214 },

    // Tamil Nadu
    Chennai: { lat: 13.0827, lng: 80.2707 },
    Coimbatore: { lat: 11.0168, lng: 76.9558 },
    Tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
    Salem: { lat: 11.6643, lng: 78.146 },
    Tiruppur: { lat: 11.1085, lng: 77.3411 },
    Thoothukudi: { lat: 8.7642, lng: 78.1348 },

    // Telangana
    Hyderabad: { lat: 17.385, lng: 78.4867 },
    Warangal: { lat: 17.9689, lng: 79.5941 },
    Karimnagar: { lat: 18.4386, lng: 79.1288 },

    // Gujarat
    Ahmedabad: { lat: 23.0225, lng: 72.5714 },
    Surat: { lat: 21.1702, lng: 72.8311 },
    Vadodara: { lat: 22.3072, lng: 73.1812 },
    Rajkot: { lat: 22.3039, lng: 70.8022 },
    Bhavnagar: { lat: 21.7645, lng: 72.1519 },
    Anand: { lat: 22.5645, lng: 72.9289 },

    // Uttar Pradesh
    Lucknow: { lat: 26.8467, lng: 80.9462 },
    Kanpur: { lat: 26.4499, lng: 80.3319 },
    Agra: { lat: 27.1767, lng: 78.0081 },
    Varanasi: { lat: 25.3176, lng: 82.9739 },
    Ghaziabad: { lat: 28.6692, lng: 77.4538 },
    Meerut: { lat: 28.9845, lng: 77.7064 },

    // West Bengal
    Kolkata: { lat: 22.5726, lng: 88.3639 },
    Howrah: { lat: 22.5958, lng: 88.2636 },
    Siliguri: { lat: 26.7271, lng: 88.3953 },

    // Rajasthan
    Jaipur: { lat: 26.9124, lng: 75.7873 },
    Jodhpur: { lat: 26.2389, lng: 73.0243 },
    Udaipur: { lat: 24.5854, lng: 73.7125 },
    Bikaner: { lat: 28.0229, lng: 73.3119 },

    // Andhra Pradesh
    Visakhapatnam: { lat: 17.6868, lng: 83.2185 },
    Vijayawada: { lat: 16.5062, lng: 80.648 },
    Guntur: { lat: 16.3067, lng: 80.4365 },
    Nellore: { lat: 14.4426, lng: 79.9865 },
    Kakinada: { lat: 16.9891, lng: 82.2475 },

    // Madhya Pradesh
    Indore: { lat: 22.7196, lng: 75.8577 },
    Bhopal: { lat: 23.2599, lng: 77.4126 },
    Jabalpur: { lat: 23.1815, lng: 79.9864 },
    Gwalior: { lat: 26.2183, lng: 78.1828 },
    Ujjain: { lat: 23.1765, lng: 75.7819 },

    // Punjab
    Ludhiana: { lat: 30.901, lng: 75.8573 },
    Jalandhar: { lat: 31.326, lng: 75.5762 },
    Amritsar: { lat: 31.634, lng: 74.8723 },

    // Kerala
    Kochi: { lat: 9.9312, lng: 76.2673 },
    Thiruvananthapuram: { lat: 8.5241, lng: 76.9366 },
    Kozhikode: { lat: 11.2588, lng: 75.7804 },
    Kollam: { lat: 8.8932, lng: 76.6141 },

    // Haryana
    Faridabad: { lat: 28.4089, lng: 77.3178 },
    Gurugram: { lat: 28.4595, lng: 77.0266 },
    Panipat: { lat: 29.3909, lng: 76.9635 },

    // Bihar
    Patna: { lat: 25.5941, lng: 85.1376 },
    Gaya: { lat: 24.7914, lng: 85.0002 },
    Bhagalpur: { lat: 25.2425, lng: 87.0117 },

    // Odisha
    Bhubaneswar: { lat: 20.2961, lng: 85.8245 },
    Cuttack: { lat: 20.4625, lng: 85.883 },
    Rourkela: { lat: 22.2604, lng: 84.8536 },

    // Assam
    Guwahati: { lat: 26.1158, lng: 91.7086 },
    Silchar: { lat: 24.8333, lng: 92.7789 },

    // Jharkhand
    Ranchi: { lat: 23.3441, lng: 85.3096 },
    Jamshedpur: { lat: 22.8046, lng: 86.2029 },
    Dhanbad: { lat: 23.7957, lng: 86.4304 },
  }

  // Default fallback
  return coordMap[city] || { lat: 20.5937, lng: 78.9629 } // India center
}
