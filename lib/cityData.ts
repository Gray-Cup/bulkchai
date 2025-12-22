import citiesData from '../cities.json'

// Types
export interface CityInfo {
    city: string
    state: string
    citySlug: string
    stateSlug: string
    nearbyAreas: string[]
    industries: string[]
    transitDays: string
    stateLogistics: string
}

export interface StateData {
    [state: string]: string[]
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

    Object.entries(cities).forEach(([state, cityList]) => {
        const stateSlug = slugify(state)
        cityList.forEach((city) => {
            pages.push({
                state: stateSlug,
                city: slugify(city),
            })
        })
    })

    return pages
}

// Find state and city names from slugs
export function getCityInfoFromSlugs(
    stateSlug: string,
    citySlug: string
): CityInfo | null {
    const cities = getAllCities()

    for (const [state, cityList] of Object.entries(cities)) {
        if (slugify(state) === stateSlug) {
            const city = cityList.find((c) => slugify(c) === citySlug)
            if (city) {
                return {
                    city,
                    state,
                    citySlug,
                    stateSlug,
                    nearbyAreas: getNearbyAreas(city, state),
                    industries: getCityIndustries(city, state),
                    transitDays: getTransitDays(state),
                    stateLogistics: getStateLogistics(state),
                }
            }
        }
    }

    return null
}

// Get nearby areas/localities for a city (for SEO - avoids "near me")
function getNearbyAreas(city: string, state: string): string[] {
    const areaMap: { [key: string]: string[] } = {
        // Maharashtra
        Mumbai: ['Andheri', 'Bandra', 'Thane', 'Navi Mumbai', 'Vashi', 'Borivali'],
        Pune: ['Hinjewadi', 'Kharadi', 'Wakad', 'Baner', 'Hadapsar', 'Shivajinagar'],
        Nagpur: ['Sitabuldi', 'Dharampeth', 'Sadar', 'MIDC Hingna'],

        // Karnataka
        Bengaluru: ['Whitefield', 'Electronic City', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Peenya'],
        Mysuru: ['Hebbal', 'Vijayanagar', 'Kuvempunagar', 'Hinkal'],

        // Tamil Nadu
        Chennai: ['Anna Nagar', 'T Nagar', 'Guindy', 'Ambattur', 'Perungalathur'],
        Coimbatore: ['Peelamedu', 'RS Puram', 'Ganapathy', 'Singanallur'],

        // Telangana
        Hyderabad: ['Gachibowli', 'Hitec City', 'Madhapur', 'Ameerpet', 'Kukatpally', 'Miyapur'],

        // Gujarat
        Ahmedabad: ['Satellite', 'Maninagar', 'Naranpura', 'Vastrapur', 'Chandkheda'],
        Surat: ['Udhna', 'Adajan', 'Vesu', 'Piplod', 'Katargam'],

        // Uttar Pradesh
        Lucknow: ['Gomti Nagar', 'Hazratganj', 'Alambagh', 'Aliganj'],
        Kanpur: ['Civil Lines', 'Govind Nagar', 'Kalyanpur', 'Panki'],

        // West Bengal
        Kolkata: ['Salt Lake', 'Park Street', 'Howrah', 'New Town', 'Rajarhat'],

        // Rajasthan
        Jaipur: ['Vaishali Nagar', 'Malviya Nagar', 'C-Scheme', 'Mansarovar'],

        // Andhra Pradesh
        Visakhapatnam: ['Gajuwaka', 'Madhurawada', 'Dwaraka Nagar', 'MVP Colony'],

        // Madhya Pradesh
        Indore: ['Vijay Nagar', 'Rau', 'Bhawarkuan', 'Schemes', 'Palasia'],
        Bhopal: ['MP Nagar', 'Arera Colony', 'Hoshangabad Road', 'Kolar'],

        // Punjab
        Ludhiana: ['Model Town', 'Civil Lines', 'Dugri', 'GIDC'],

        // Kerala
        Kochi: ['Edappally', 'Kakkanad', 'Palarivattom', 'Kaloor'],
    }

    return areaMap[city] || [
        `${city} City Center`,
        `${city} Industrial Area`,
        `${city} Commercial Zone`,
    ]
}

// Get typical industries/use-cases for a city
function getCityIndustries(city: string, state: string): string[] {
    const industryMap: { [key: string]: string[] } = {
        // IT hubs
        Bengaluru: ['IT offices', 'tech startups', 'corporate cafeterias'],
        Hyderabad: ['IT companies', 'pharmaceutical firms', 'tech parks'],
        Pune: ['IT firms', 'manufacturing units', 'automotive companies'],
        Chennai: ['IT offices', 'automotive sector', 'manufacturing plants'],

        // Manufacturing zones
        Coimbatore: ['textile mills', 'engineering firms', 'manufacturers'],
        Ludhiana: ['textile factories', 'garment exporters', 'industrial units'],
        Surat: ['textile industry', 'diamond polishing units', 'exporters'],

        // Commercial hubs
        Mumbai: ['corporate offices', 'trading houses', 'hotels and restaurants'],
        Delhi: ['corporate headquarters', 'government offices', 'hospitality sector'],
        Ahmedabad: ['textile traders', 'pharmaceutical companies', 'chemical firms'],

        // Tier 2 commercial
        Indore: ['FMCG distributors', 'pharmaceutical wholesalers', 'food processors'],
        Jaipur: ['hotels and resorts', 'handicraft exporters', 'tourism sector'],
    }

    return industryMap[city] || [
        'offices and corporate canteens',
        'local cafés and restaurants',
        'wholesale distributors',
    ]
}

// Get estimated transit days based on state (logistics variation)
function getTransitDays(state: string): string {
    const transitMap: { [key: string]: string } = {
        // Southern states - closer to tea origins (Assam/WB)
        'Tamil Nadu': '3-5 business days',
        Kerala: '4-5 business days',
        Karnataka: '3-4 business days',
        'Andhra Pradesh': '3-5 business days',
        Telangana: '3-4 business days',

        // Western states
        Maharashtra: '2-4 business days',
        Gujarat: '3-5 business days',
        Goa: '4-5 business days',

        // Northern states
        'Uttar Pradesh': '2-3 business days',
        'Madhya Pradesh': '2-4 business days',
        Rajasthan: '3-4 business days',
        Punjab: '2-3 business days',
        Haryana: '2-3 business days',
        Delhi: '2-3 business days',
        Uttarakhand: '3-4 business days',
        'Jammu & Kashmir': '4-6 business days',

        // Eastern states - closest to source
        'West Bengal': '1-2 business days',
        Bihar: '1-2 business days',
        Jharkhand: '1-2 business days',
        Odisha: '2-3 business days',
        Assam: '1-2 business days',
        Chhattisgarh: '2-3 business days',

        // North-East
        'North-East-Others': '3-5 business days',
    }

    return transitMap[state] || '3-5 business days'
}

// Get state-specific logistics description (SEO content variation)
function getStateLogistics(state: string): string {
    const logisticsMap: { [key: string]: string } = {
        // Coastal states - port logistics
        Maharashtra:
            'We leverage efficient freight networks connecting Mumbai port and inland transport hubs across Maharashtra. Our distribution system covers major MIDC zones and commercial centers throughout the state.',
        Gujarat:
            'Serving Gujarat through well-established logistics channels from major ports like Mundra and road networks. We efficiently supply to industrial clusters in Ahmedabad, Surat, and Rajkot regions.',
        'Tamil Nadu':
            'Our supply chain reaches Tamil Nadu via coastal freight routes and NH networks. We maintain strong distribution presence across industrial corridors including Chennai-Coimbatore belt.',
        Kerala:
            'Freight delivery to Kerala utilizes coastal shipping lanes and NH66 corridor. We service the entire Kochi-Thiruvananthapuram commercial belt and inland Malabar region.',

        // Northern states - railway + road
        'Uttar Pradesh':
            'Leveraging North India\'s extensive railway and highway networks, we efficiently supply bulk CTC tea to commercial hubs across UP. Strong connectivity via NH2, NH24, and major rail freight corridors.',
        Punjab:
            'Fast delivery to Punjab through Northern Railway freight corridors and GT Road (NH1). We serve the entire Ludhiana-Jalandhar-Amritsar industrial belt with reliable logistics.',
        Haryana:
            'Quick supply to Haryana via dedicated freight routes from tea-growing regions. Proximity to Delhi NCR ensures efficient last-mile delivery to Gurugram, Faridabad, and other commercial zones.',

        // Eastern states - shortest distance
        'West Bengal':
            'Being closest to Assam tea gardens, West Bengal enjoys fastest delivery times. Our warehousing in Kolkata and Siliguri ensures immediate availability for distributors and bulk buyers.',
        Bihar:
            'Direct freight access from Assam tea belt via NH31 and Eastern Railway. Bihar benefits from proximity to source, ensuring freshest stock and fastest turnaround for wholesale orders.',
        Jharkhand:
            'Efficient supply to Jharkhand through Eastern freight corridors. Close proximity to tea-growing regions ensures quick replenishment for industrial buyers and distributors.',

        // Central states
        'Madhya Pradesh':
            'Centrally located MP receives supply via major freight routes from East and West. We service industrial hubs in Indore, Bhopal, and manufacturing zones with reliable logistics partnerships.',
        Chhattisgarh:
            'Serving Chhattisgarh through Eastern railway corridors and NH130. Growing industrial base in Raipur-Bhilai region receives priority supply with competitive freight rates.',

        // Southern inland
        Karnataka:
            'Supply to Karnataka via multi-modal transport including rail and dedicated freight trucks. Bengaluru and other tech hubs receive regular shipments to meet corporate demand.',
        Telangana:
            'Freight delivery to Telangana through Southern Railway and NH44 corridor. Hyderabad\'s booming IT and pharma sectors benefit from our reliable bulk supply chains.',
        'Andhra Pradesh':
            'Serving coastal Andhra via Visakhapatnam port and inland routes. Industrial corridors and commercial centers receive consistent supply through established logistics networks.',
    }

    return (
        logisticsMap[state] ||
        'We maintain reliable freight partnerships to ensure timely bulk delivery across all major commercial and industrial zones in the state.'
    )
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
