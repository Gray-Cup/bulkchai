import type { TierLabel } from '@/data/chai-products'

export type CartItem = { slug: string; tier: TierLabel; quantity: number }

const KEY = 'bc_cart'
export const CART_EVENT = 'bc_cart_updated'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT))
}

export function addToCart(slug: string, tier: TierLabel, quantity: number): void {
  const cart = getCart()
  const existing = cart.find((i) => i.slug === slug && i.tier === tier)
  if (existing) {
    saveCart(
      cart.map((i) =>
        i.slug === slug && i.tier === tier ? { ...i, quantity: i.quantity + quantity } : i
      )
    )
  } else {
    saveCart([...cart, { slug, tier, quantity }])
  }
}

export function getCartCount(): number {
  return getCart().reduce((s, i) => s + i.quantity, 0)
}
