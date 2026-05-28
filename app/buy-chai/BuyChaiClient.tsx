'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  CHAI_PRODUCTS,
  TIERS,
  TierLabel,
  calcBagPrice,
  formatINR,
  getProductBySlug,
} from '@/data/chai-products'
import CheckoutForm from '@/components/buy-chai/CheckoutForm'
import { addToCart } from '@/lib/cart'

type SelectedItem = { slug: string; tier: TierLabel }

const DEFAULT_TIER: TierLabel = '3kg'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const kg = TIERS.find((t) => t.label === tier)!.kg

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 border border-gray-200 bg-white px-3 py-2 text-sm text-neutral-700 transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-neutral-300"
      >
        <span className="font-medium">{tier}</span>
        <span className="text-xs text-neutral-400">{fmt(pricePerKg * kg)}</span>
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
        <div className="absolute top-full right-0 left-0 z-20 mt-0.5 border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
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
                className={`text-xs ${t.label === tier ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'}`}
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

function ProductCard({
  product,
  onBuyNow,
}: {
  product: (typeof CHAI_PRODUCTS)[number]
  onBuyNow: (slug: string, tier: TierLabel) => void
}) {
  const [tier, setTier] = useState<TierLabel>(DEFAULT_TIER)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const kg = TIERS.find((t) => t.label === tier)!.kg
  const price = calcBagPrice(product.pricePerKg, kg) * qty

  function handleAdd() {
    addToCart(product.slug, tier, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {product.badge && (
          <span className="absolute top-2 right-2 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <div>
          <p className="text-sm leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">{product.grade}</p>
        </div>

        <WeightDropdown tier={tier} pricePerKg={product.pricePerKg} onChange={setTier} />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-lg font-medium text-neutral-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-800"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-lg font-medium text-neutral-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-neutral-400 dark:hover:bg-gray-800"
          >
            +
          </button>
          <p className="ml-auto text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {fmt(price)}
          </p>
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onBuyNow(product.slug, tier)}
            className="flex-1 cursor-pointer bg-green-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 cursor-pointer py-2.5 text-sm font-medium transition-colors ${
              added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BuyChaiClient() {
  const [step, setStep] = useState<1 | 2>(1)
  const [selected, setSelected] = useState<SelectedItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const orderTotal = selected.reduce((sum, { slug, tier }) => {
    const product = getProductBySlug(slug)
    const tierData = TIERS.find((t) => t.label === tier)!
    if (!product) return sum
    return sum + calcBagPrice(product.pricePerKg, tierData.kg)
  }, 0)

  function handleBuyNow(slug: string, tier: TierLabel) {
    setSelected([{ slug, tier }])
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function backToSelection() {
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (!hydrated) return null

  // ─── Step 1: Product Grid ─────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Chai</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Shipped across India in 2–3 business days.
            </p>
          </div>
          <Link
            href="/cart"
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-gray-400 dark:border-gray-700 dark:text-neutral-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            View Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAI_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} onBuyNow={handleBuyNow} />
          ))}
        </div>
      </div>
    )
  }

  // ─── Step 2: Checkout ─────────────────────────────────────────────────────
  return (
    <div>
      <button
        onClick={backToSelection}
        className="mb-6 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CheckoutForm selected={selected} orderTotal={orderTotal} />

        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
              Order Summary
            </h2>
            <div className="space-y-3">
              {selected.map(({ slug, tier }) => {
                const product = getProductBySlug(slug)
                if (!product) return null
                const tierData = TIERS.find((t) => t.label === tier)!
                const price = calcBagPrice(product.pricePerKg, tierData.kg)
                return (
                  <div key={slug} className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {product.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {tier} · {fmt(price)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-bold text-gray-900 dark:border-gray-800 dark:text-gray-100">
              <span>Total</span>
              <span>{formatINR(orderTotal)}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              + GST as applicable · All prices in INR
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
