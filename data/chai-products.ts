export type TierLabel = '3kg' | '5kg' | '10kg' | '20kg'

export interface TierOption {
  label: TierLabel
  kg: number
}

export interface ChaiProduct {
  slug: string
  name: string
  description: string
  grade: string
  pricePerKg: number
  badge?: string
  accent: string
  image: string
}

export const CHAI_PRODUCTS: ChaiProduct[] = [
  {
    slug: 'tea-stall-chai',
    name: 'Tea Stall Chai',
    description:
      'Strong CTC blend for high-volume tea stalls. Bold liquor, deep colour, brews perfectly with milk.',
    grade: 'CTC Dust',
    pricePerKg: 155,
    badge: 'Best Value',
    accent: 'bg-amber-500',
    image: '/4-3-chai.webp',
  },
  {
    slug: 'kadak-chai',
    name: 'Kadak Chai',
    description:
      'Extra bold dust grade for cutting chai. Intense flavour and deep colour that holds well in milk.',
    grade: 'CTC Extra Bold',
    pricePerKg: 175,
    badge: 'Most Popular',
    accent: 'bg-orange-600',
    image: '/4-3-chai.webp',
  },
  {
    slug: 'hotel-chai',
    name: 'Hotel Chai',
    description:
      'Balanced CTC blend for budget hotels and mid-range eateries. Consistent quality in every cup.',
    grade: 'CTC Fannings',
    pricePerKg: 195,
    accent: 'bg-yellow-600',
    image: '/4-3-chai.webp',
  },
  {
    slug: '3-star-hotel-chai',
    name: '3-Star Hotel Chai',
    description:
      'Premium CTC with fine leaf for 3-star properties. Clean, consistent cup guests will appreciate.',
    grade: 'Premium CTC',
    pricePerKg: 240,
    accent: 'bg-green-600',
    image: '/4-3-chai.webp',
  },
  {
    slug: '5-star-hotel-chai',
    name: '5-Star Hotel Chai',
    description:
      'Select Assam blend for luxury hospitality. Rich aroma, golden liquor — an elevated tea experience.',
    grade: 'Select Assam',
    pricePerKg: 320,
    badge: 'Premium',
    accent: 'bg-emerald-700',
    image: '/4-3-chai.webp',
  },
]

export const TIERS: TierOption[] = [
  { label: '3kg', kg: 3 },
  { label: '5kg', kg: 5 },
  { label: '10kg', kg: 10 },
  { label: '20kg', kg: 20 },
]

export function calcBagPrice(pricePerKg: number, kg: number): number {
  return pricePerKg * kg
}

export function getProductBySlug(slug: string): ChaiProduct | undefined {
  return CHAI_PRODUCTS.find((p) => p.slug === slug)
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
