import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Placed | Bulk Chai',
  description: 'Your chai order has been placed successfully.',
  robots: { index: false, follow: false },
}

export default function BuyChaiSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg
            className="h-8 w-8 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-100">Order Placed!</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Thank you for your order. We&apos;ve received your payment and will begin packing your chai
        right away.
      </p>

      <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 text-left dark:border-green-800 dark:bg-green-900/20">
        <h2 className="mb-3 font-semibold text-green-800 dark:text-green-200">What happens next?</h2>
        <ul className="space-y-2.5 text-sm text-green-700 dark:text-green-300">
          <li className="flex gap-2.5">
            <span>📦</span>
            <span>
              Your chai will be packed and dispatched within{' '}
              <strong>2–3 business days</strong>.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span>🚚</span>
            <span>
              Delivery takes <strong>3–5 days</strong> after dispatch depending on your location.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span>📱</span>
            <span>You&apos;ll receive an SMS confirmation with tracking details.</span>
          </li>
        </ul>
      </div>

      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Questions?{' '}
        <Link
          href="/contact-us"
          className="text-green-600 underline hover:text-green-700 dark:text-green-400"
        >
          Contact us
        </Link>
      </p>

      <Link
        href="/"
        className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  )
}
