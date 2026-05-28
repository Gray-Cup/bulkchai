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
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-green-50 dark:bg-gray-800 dark:text-neutral-200 dark:hover:bg-green-950/40"
      >
        <span>{tier}</span>
        <span className="text-sm text-neutral-500">{fmt(pricePerKg * kg)}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 z-20 mt-1 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
          {TIERS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => {
                onChange(t.label)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors ${
                t.label === tier
                  ? 'bg-green-600 text-white'
                  : 'text-neutral-700 hover:bg-green-50 dark:text-neutral-300 dark:hover:bg-green-950/30'
              }`}
            >
              <span className="font-semibold">{t.label}</span>
              <span
                className={`text-sm ${t.label === tier ? 'text-green-100' : 'text-neutral-400'}`}
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
    <div className="flex flex-col rounded-xl bg-white shadow-sm dark:bg-gray-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-base leading-snug font-bold text-neutral-900 dark:text-neutral-100">
            {product.name}
          </p>
          <p className="mt-1 text-xs font-semibold tracking-wider text-green-600 uppercase dark:text-green-500">
            {product.grade}
          </p>
        </div>

        <WeightDropdown tier={tier} pricePerKg={product.pricePerKg} onChange={setTier} />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-lg font-medium text-neutral-600 transition-colors hover:bg-green-100 hover:text-green-800 dark:bg-gray-800 dark:text-neutral-400 dark:hover:bg-green-950/40 dark:hover:text-green-400"
          >
            −
          </button>
          <span className="w-8 text-center text-base font-bold text-neutral-900 dark:text-neutral-100">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-lg font-medium text-neutral-600 transition-colors hover:bg-green-100 hover:text-green-800 dark:bg-gray-800 dark:text-neutral-400 dark:hover:bg-green-950/40 dark:hover:text-green-400"
          >
            +
          </button>
          <p className="ml-auto text-base font-bold text-neutral-900 dark:text-neutral-100">
            {fmt(price)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onBuyNow(product.slug, tier)}
            className="flex-1 cursor-pointer rounded-lg bg-green-600 py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-green-700"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 cursor-pointer rounded-lg py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-neutral-700 hover:bg-green-100 hover:text-green-800 dark:bg-gray-800 dark:text-neutral-300 dark:hover:bg-green-950/40 dark:hover:text-green-400'
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
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-green-600 uppercase dark:text-green-500">
              Order Now
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
              Order Chai
            </h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Shipped across India in 2–3 business days.
            </p>
          </div>
          <Link
            href="/cart"
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-green-700"
          >
            Cart →
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
        className="mb-8 text-sm font-bold tracking-widest text-green-600 uppercase transition-colors hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CheckoutForm selected={selected} orderTotal={orderTotal} />

        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl bg-green-50 p-6 dark:bg-green-950/20">
            <h2 className="mb-6 text-xl font-black tracking-tight text-green-900 uppercase dark:text-green-300">
              Order Summary
            </h2>
            <div className="space-y-4">
              {selected.map(({ slug, tier }) => {
                const product = getProductBySlug(slug)
                if (!product) return null
                const tierData = TIERS.find((t) => t.label === tier)!
                const price = calcBagPrice(product.pricePerKg, tierData.kg)
                return (
                  <div key={slug} className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {product.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {tier} · {fmt(price)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex justify-between rounded-lg bg-green-100 px-4 py-3 text-base font-black text-green-900 dark:bg-green-900/40 dark:text-green-100">
              <span>Total</span>
              <span>{formatINR(orderTotal)}</span>
            </div>
            <p className="mt-3 text-xs text-green-700/60 dark:text-green-500/60">
              + GST as applicable · All prices in INR
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
