import type { Metadata } from 'next'
import Link from 'next/link'
import { CHAI_PRODUCTS, TIERS, calcBagPrice } from '@/data/chai-products'

export const metadata: Metadata = {
  title: 'Products & Services | BulkChai',
  description:
    'Full list of bulk chai products and bag sizes offered by BulkChai — CTC tea blends in 3kg, 5kg, 10kg and 20kg bags with INR pricing.',
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ProductsAndServicesPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Products &amp; Services
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Bulk chai blends supplied by Gray Cup Enterprises Pvt. Ltd. · All prices in INR · 5% GST
          additional
        </p>
      </div>

      <div className="pt-10 pb-8">
        {/* Products */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Chai Blends</h2>

          <div className="space-y-8">
            {CHAI_PRODUCTS.map((product) => (
              <div
                key={product.slug}
                className="rounded-xl border border-gray-200 p-6 dark:border-gray-700"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                      Grade: {product.grade}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Base rate</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ₹{product.pricePerKg}/kg
                    </p>
                  </div>
                </div>

                {/* Pricing table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-2 text-left font-medium text-gray-600 dark:text-gray-400">
                          Bag Size
                        </th>
                        <th className="pb-2 text-left font-medium text-gray-600 dark:text-gray-400">
                          Weight
                        </th>
                        <th className="pb-2 text-right font-medium text-gray-600 dark:text-gray-400">
                          Price (INR)
                        </th>
                        <th className="pb-2 text-right font-medium text-gray-600 dark:text-gray-400">
                          Price + 5% GST
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {TIERS.map((tier) => {
                        const price = calcBagPrice(product.pricePerKg, tier.kg)
                        const withGst = Math.round(price * 1.05)
                        return (
                          <tr key={tier.label}>
                            <td className="py-2 font-medium text-gray-900 dark:text-gray-100">
                              {tier.label} bag
                            </td>
                            <td className="py-2 text-gray-600 dark:text-gray-400">{tier.kg} kg</td>
                            <td className="py-2 text-right text-gray-900 dark:text-gray-100">
                              {formatINR(price)}
                            </td>
                            <td className="py-2 text-right text-gray-900 dark:text-gray-100">
                              {formatINR(withGst)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Services</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">
                    Price (INR)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    Standard Delivery
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Pan-India courier delivery, 3–5 days after dispatch
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">
                    Included / as quoted
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    Bulk Quote &amp; Consultation
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Custom pricing for orders above 50 kg, repeat supply, or custom blends
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">Free</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    GST Invoice
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    Tax invoice with GSTIN on request (5% GST applies to tea)
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h3 className="mb-3 font-semibold text-amber-800 dark:text-amber-200">Pricing Notes</h3>
          <ul className="space-y-1.5 text-sm text-amber-700 dark:text-amber-300">
            <li>All prices are in Indian Rupees (INR) and are subject to change without notice.</li>
            <li>
              5% GST is applicable on all tea products as per Indian tax law and is charged in
              addition to the listed price.
            </li>
            <li>
              Prices shown are indicative. Final rates for large orders depend on quantity, grade,
              and delivery location.
            </li>
            <li>Payment is processed securely via Cashfree Payments.</li>
          </ul>
        </section>

        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to order?{' '}
            <Link
              href="/buy-chai"
              className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
            >
              Browse and order chai →
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Questions?{' '}
            <Link href="/contact-us" className="underline underline-offset-4">
              Contact us
            </Link>{' '}
            ·{' '}
            <Link href="/refunds-and-cancellations" className="underline underline-offset-4">
              Refunds &amp; Cancellations
            </Link>{' '}
            ·{' '}
            <Link href="/terms-and-conditions" className="underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
