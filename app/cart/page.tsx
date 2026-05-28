'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CHAI_PRODUCTS,
  TIERS,
  TierLabel,
  calcBagPrice,
  formatINR,
  getProductBySlug,
} from '@/data/chai-products'
import { getCart, saveCart, addToCart, CART_EVENT, type CartItem } from '@/lib/cart'
import CheckoutForm from '@/components/buy-chai/CheckoutForm'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

type EnrichedItem = CartItem & { product: (typeof CHAI_PRODUCTS)[number] }

function WeightDropdown({
  tier,
  pricePerKg,
  onChange,
}: {
  tier: TierLabel
  pricePerKg: number
  onChange: (t: TierLabel) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center justify-between gap-2 border border-gray-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-neutral-300"
      >
        <span className="font-medium">{tier}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-0.5 min-w-[130px] border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {TIERS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => {
                onChange(t.label)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                t.label === tier
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-gray-800'
              }`}
            >
              <span className="font-medium">{t.label}</span>
              <span
                className={`text-xs ${t.label === tier ? 'text-neutral-300' : 'text-neutral-400'}`}
              >
                {fmt(pricePerKg * t.kg)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCart(getCart())
    setMounted(true)
    const update = () => setCart(getCart())
    window.addEventListener(CART_EVENT, update)
    return () => window.removeEventListener(CART_EVENT, update)
  }, [])

  function updateItem(slug: string, oldTier: TierLabel, changes: Partial<CartItem>) {
    const newTier = (changes.tier ?? oldTier) as TierLabel
    let updated = [...cart]
    if (newTier !== oldTier) {
      const cur = updated.find((i) => i.slug === slug && i.tier === oldTier)
      const existingIdx = updated.findIndex((i) => i.slug === slug && i.tier === newTier)
      if (existingIdx >= 0 && cur) {
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + cur.quantity,
        }
        updated = updated.filter((i) => !(i.slug === slug && i.tier === oldTier))
      } else {
        updated = updated.map((i) =>
          i.slug === slug && i.tier === oldTier ? { ...i, ...changes } : i
        )
      }
    } else {
      updated = updated.map((i) =>
        i.slug === slug && i.tier === oldTier ? { ...i, ...changes } : i
      )
    }
    setCart(updated)
    saveCart(updated)
  }

  function removeItem(slug: string, tier: TierLabel) {
    const updated = cart.filter((i) => !(i.slug === slug && i.tier === tier))
    setCart(updated)
    saveCart(updated)
  }

  function addOther(slug: string, tier: TierLabel) {
    addToCart(slug, tier, 1)
    setCart(getCart())
  }

  if (!mounted) return <div className="min-h-screen" />

  const enriched: EnrichedItem[] = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as EnrichedItem[]

  const total = enriched.reduce(
    (s, i) =>
      s +
      calcBagPrice(i.product.pricePerKg, TIERS.find((t) => t.label === i.tier)!.kg) * i.quantity,
    0
  )

  const cartSlugs = new Set(enriched.map((i) => i.slug))
  const otherProducts = CHAI_PRODUCTS.filter((p) => !cartSlugs.has(p.slug))

  if (enriched.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Your Cart
            </h1>
            <Link href="/buy-chai" className="text-sm text-green-600 hover:underline">
              ← Continue shopping
            </Link>
          </div>
          <p className="mb-10 text-neutral-500 dark:text-neutral-400">Your cart is empty.</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CHAI_PRODUCTS.map((product) => (
              <SuggestedCard key={product.slug} product={product} onAdd={addOther} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const checkoutSelected = enriched.map((i) => ({ slug: i.slug, tier: i.tier }))

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Your Cart
          </h1>
          <Link href="/buy-chai" className="text-sm text-green-600 hover:underline">
            ← Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_380px]">
          {/* Cart items */}
          <div className="border border-gray-200 dark:border-gray-700">
            {enriched.map((item, i) => {
              const price = calcBagPrice(
                item.product.pricePerKg,
                TIERS.find((t) => t.label === item.tier)!.kg
              )
              return (
                <div
                  key={`${item.slug}-${item.tier}`}
                  className={`flex gap-4 p-4 ${i < enriched.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-neutral-50">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-neutral-400">{item.product.grade}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.tier)}
                        className="mt-0.5 shrink-0 cursor-pointer text-sm text-gray-300 transition-colors hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <WeightDropdown
                        tier={item.tier}
                        pricePerKg={item.product.pricePerKg}
                        onChange={(t) => updateItem(item.slug, item.tier, { tier: t })}
                      />

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            item.quantity > 1
                              ? updateItem(item.slug, item.tier, { quantity: item.quantity - 1 })
                              : removeItem(item.slug, item.tier)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center border border-gray-200 text-neutral-600 hover:bg-gray-50 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-800"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(item.slug, item.tier, { quantity: item.quantity + 1 })
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center border border-gray-200 text-neutral-600 hover:bg-gray-50 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>

                      <p className="ml-auto text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {fmt(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="flex justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Total</p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {fmt(total)}
              </p>
            </div>
          </div>

          {/* Checkout panel */}
          <div className="sticky top-8 border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <CheckoutForm selected={checkoutSelected} orderTotal={total} />
          </div>
        </div>

        {/* Other products */}
        {otherProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              You might also want
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {otherProducts.map((product) => (
                <SuggestedCard key={product.slug} product={product} onAdd={addOther} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SuggestedCard({
  product,
  onAdd,
}: {
  product: (typeof CHAI_PRODUCTS)[number]
  onAdd: (slug: string, tier: TierLabel) => void
}) {
  const [tier, setTier] = useState<TierLabel>('3kg')
  const [added, setAdded] = useState(false)
  const kg = TIERS.find((t) => t.label === tier)!.kg

  function handleAdd() {
    onAdd(product.slug, tier)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">{product.grade}</p>
        </div>
        <WeightDropdown tier={tier} pricePerKg={product.pricePerKg} onChange={setTier} />
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {fmt(product.pricePerKg * kg)}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full cursor-pointer py-2.5 text-sm font-medium transition-colors ${
            added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
