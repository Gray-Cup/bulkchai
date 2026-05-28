'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CHAI_PRODUCTS, TIERS, TierLabel, calcBagPrice } from '@/data/chai-products'
import { addToCart } from '@/lib/cart'
import { useRouter } from 'next/navigation'

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
        className="flex w-full cursor-pointer items-center justify-between gap-3 border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-black dark:border-gray-600 dark:bg-gray-900 dark:text-neutral-200 dark:hover:border-white"
      >
        <span className="font-semibold">{tier}</span>
        <span className="text-sm text-neutral-500">{fmt(pricePerKg * kg)}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 z-20 mt-px border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
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
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-neutral-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-gray-800'
              }`}
            >
              <span className="font-semibold">{t.label}</span>
              <span
                className={`text-sm ${t.label === tier ? 'text-neutral-400 dark:text-neutral-600' : 'text-neutral-500'}`}
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

function ProductCard({ product }: { product: (typeof CHAI_PRODUCTS)[number] }) {
  const router = useRouter()
  const [tier, setTier] = useState<TierLabel>('3kg')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const kg = TIERS.find((t) => t.label === tier)!.kg
  const price = calcBagPrice(product.pricePerKg, kg) * qty

  function handleAdd() {
    addToCart(product.slug, tier, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addToCart(product.slug, tier, qty)
    router.push('/cart')
  }

  return (
    <div className="flex flex-col border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-black px-2.5 py-1 text-xs font-bold tracking-widest text-white uppercase dark:bg-white dark:text-black">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-base leading-snug font-bold text-neutral-900 dark:text-neutral-100">
            {product.name}
          </p>
          <p className="mt-1 text-xs font-medium tracking-wider text-neutral-400 uppercase">
            {product.grade}
          </p>
        </div>

        <WeightDropdown tier={tier} pricePerKg={product.pricePerKg} onChange={setTier} />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-300 text-lg font-medium text-neutral-600 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:text-neutral-400 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          >
            −
          </button>
          <span className="w-8 text-center text-base font-bold text-neutral-900 dark:text-neutral-100">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-300 text-lg font-medium text-neutral-600 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:text-neutral-400 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
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
            onClick={handleBuyNow}
            className="flex-1 cursor-pointer bg-black py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 cursor-pointer py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
              added
                ? 'bg-green-600 text-white'
                : 'border border-gray-300 text-neutral-700 hover:border-black hover:text-black dark:border-gray-600 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
            }`}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProductsSection() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-700">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase dark:text-neutral-500">
            Order Now
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
            Bulk Chai Blends
          </h2>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-sm font-bold tracking-widest text-neutral-700 uppercase transition-colors hover:border-black hover:bg-black hover:text-white dark:border-gray-600 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
        >
          Cart →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-200 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 dark:bg-gray-700">
        {CHAI_PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
