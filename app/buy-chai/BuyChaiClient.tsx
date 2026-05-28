'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  CHAI_PRODUCTS,
  TIERS,
  TierLabel,
  calcBagPrice,
  formatINR,
  getProductBySlug,
} from '@/data/chai-products'
import CheckoutForm from '@/components/buy-chai/CheckoutForm'

type SelectedItem = { slug: string; tier: TierLabel }

const LS_SELECTED = 'bc_selected'
const LS_TIER = 'bc_tier'
const DEFAULT_TIER: TierLabel = '3kg'

export default function BuyChaiClient() {
  const searchParams = useSearchParams()

  const [step, setStep] = useState<1 | 2>(1)
  const [selected, setSelected] = useState<SelectedItem[]>([])
  const [activeTier, setActiveTier] = useState<TierLabel>(DEFAULT_TIER)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const storedTier = localStorage.getItem(LS_TIER) as TierLabel | null
      if (storedTier && TIERS.find((t) => t.label === storedTier)) {
        setActiveTier(storedTier)
      }

      const storedSelected = localStorage.getItem(LS_SELECTED)
      let parsed: SelectedItem[] = []
      if (storedSelected) {
        const raw = JSON.parse(storedSelected)
        parsed = raw.map((s: string | SelectedItem) =>
          typeof s === 'string' ? { slug: s, tier: DEFAULT_TIER } : s
        )
      }

      const urlSlug = searchParams.get('product')
      if (urlSlug && !parsed.find((s) => s.slug === urlSlug)) {
        parsed = [...parsed, { slug: urlSlug, tier: storedTier ?? DEFAULT_TIER }]
      }

      setSelected(parsed)
    } catch {
      // ignore localStorage errors
    }
    setHydrated(true)
  }, [searchParams])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(LS_SELECTED, JSON.stringify(selected))
  }, [selected, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(LS_TIER, activeTier)
  }, [activeTier, hydrated])

  const isSelected = (slug: string) => selected.some((s) => s.slug === slug)

  const getTier = (slug: string): TierLabel =>
    selected.find((s) => s.slug === slug)?.tier ?? activeTier

  const addProduct = (slug: string) => {
    if (isSelected(slug)) return
    setSelected((prev) => [...prev, { slug, tier: activeTier }])
  }

  const removeProduct = (slug: string) => {
    setSelected((prev) => prev.filter((s) => s.slug !== slug))
  }

  const updateTier = (slug: string, tier: TierLabel) => {
    setSelected((prev) => prev.map((s) => (s.slug === slug ? { ...s, tier } : s)))
  }

  const orderTotal = selected.reduce((sum, { slug, tier }) => {
    const product = getProductBySlug(slug)
    const tierData = TIERS.find((t) => t.label === tier)!
    if (!product) return sum
    return sum + calcBagPrice(product.pricePerKg, tierData.kg)
  }, 0)

  const proceedToCheckout = () => {
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const backToSelection = () => {
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (!hydrated) return null

  // ─── Step 1: Product Selection ────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="pb-32">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Chai</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Select your chai blends and bag size. Shipped across India in 2–3 business days.
          </p>
        </div>

        {/* Tier Tabs */}
        <div className="mb-2 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800">
            {TIERS.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTier(t.label)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors active:scale-95 ${
                  activeTier === t.label
                    ? 'bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-gray-100'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mb-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Bag size for new selections — you can change per-product in checkout
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAI_PRODUCTS.map((product) => {
            const sel = isSelected(product.slug)
            const tier = sel ? getTier(product.slug) : activeTier
            const tierData = TIERS.find((t) => t.label === tier)!
            const price = calcBagPrice(product.pricePerKg, tierData.kg)

            return (
              <div
                key={product.slug}
                className={`relative rounded-xl border-2 p-5 transition-all ${
                  sel
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
                }`}
              >
                {product.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                )}
                {sel && (
                  <span className="absolute top-3 left-3 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
                    ✓ Selected
                  </span>
                )}

                <div className="-mx-5 -mt-5 mb-3 overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {product.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {product.grade}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {formatINR(price)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tier} bag · ₹{product.pricePerKg}/kg
                    </div>
                  </div>

                  {sel ? (
                    <button
                      onClick={() => removeProduct(product.slug)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 active:scale-95 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addProduct(product.slug)}
                      className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 active:scale-95"
                    >
                      + Select
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sticky Bottom Bar */}
        <div
          className={`fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-2xl transition-transform duration-300 dark:border-gray-700 dark:bg-gray-900 ${
            selected.length > 0 ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {selected.length} blend{selected.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total: {formatINR(orderTotal)}
              </p>
            </div>
            <button
              onClick={proceedToCheckout}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 active:scale-95"
            >
              Proceed to Checkout →
            </button>
          </div>
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
        {/* Left: Checkout Form */}
        <CheckoutForm selected={selected} orderTotal={orderTotal} />

        {/* Right: Order Summary */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
              Order Summary
            </h2>

            <div className="space-y-4">
              {selected.map(({ slug, tier }) => {
                const product = getProductBySlug(slug)
                if (!product) return null
                const tierData = TIERS.find((t) => t.label === tier)!
                const price = calcBagPrice(product.pricePerKg, tierData.kg)

                return (
                  <div
                    key={slug}
                    className="rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.grade} · ₹{product.pricePerKg}/kg
                        </p>
                      </div>
                      <button
                        onClick={() => removeProduct(slug)}
                        className="text-sm text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Per-product tier selector */}
                    <div className="mt-2 flex gap-1">
                      {TIERS.map((t) => (
                        <button
                          key={t.label}
                          onClick={() => updateTier(slug, t.label)}
                          className={`rounded px-2 py-1 text-xs font-medium transition-colors active:scale-95 ${
                            tier === t.label
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 text-right font-semibold text-gray-900 dark:text-gray-100">
                      {formatINR(price)}
                    </div>
                  </div>
                )
              })}
            </div>

            {selected.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No blends selected.{' '}
                <button onClick={backToSelection} className="text-green-600 underline">
                  Go back
                </button>{' '}
                to add some.
              </p>
            )}

            <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <div className="flex justify-between text-base font-bold text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span>{formatINR(orderTotal)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                + GST as applicable · All prices in INR
              </p>
            </div>
          </div>

          {/* Add More Blends */}
          {CHAI_PRODUCTS.filter((p) => !isSelected(p.slug)).length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Add more blends
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {CHAI_PRODUCTS.filter((p) => !isSelected(p.slug)).map((product) => {
                  const tierData = TIERS.find((t) => t.label === activeTier)!
                  const price = calcBagPrice(product.pricePerKg, tierData.kg)
                  return (
                    <div
                      key={product.slug}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatINR(price)} / {activeTier} bag
                        </p>
                      </div>
                      <button
                        onClick={() => addProduct(product.slug)}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
