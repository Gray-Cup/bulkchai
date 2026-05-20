import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us | BulkChai',
  description:
    'Contact Gray Cup Enterprises Pvt. Ltd. for bulk chai orders, wholesale tea inquiries, order support, and business queries.',
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Contact Us
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
          We&apos;re here to help with bulk chai orders, product questions, and business inquiries.
          Reach out through any of the channels below.
        </p>
      </header>

      <section className="space-y-8">
        {/* Business details */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800/50">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Gray Cup Enterprises Pvt. Ltd.
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium text-neutral-600 dark:text-neutral-400">
                Email
              </dt>
              <dd>
                <a
                  href="mailto:bulk@graycup.in"
                  className="text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  bulk@graycup.in
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium text-neutral-600 dark:text-neutral-400">
                Phone
              </dt>
              <dd>
                <a
                  href="tel:+918527914317"
                  className="text-neutral-800 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-200"
                >
                  +91 85279 14317
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium text-neutral-600 dark:text-neutral-400">
                WhatsApp
              </dt>
              <dd>
                <a
                  href="https://wa.me/918527914317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline underline-offset-4 hover:text-green-800 dark:text-green-400"
                >
                  +91 85279 14317
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 font-medium text-neutral-600 dark:text-neutral-400">
                Website
              </dt>
              <dd>
                <a
                  href="https://www.bulkchai.com"
                  className="text-neutral-800 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-200"
                >
                  www.bulkchai.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-200">
            Order Inquiries
          </h2>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            For questions about your order, dispatch status, or product quality, email us at{' '}
            <a href="mailto:bulk@graycup.in" className="underline underline-offset-4">
              bulk@graycup.in
            </a>{' '}
            with your order ID (starts with <code className="text-sm">bc_</code>). We respond within
            24–48 business hours.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-200">
            Bulk &amp; Wholesale Inquiries
          </h2>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            For large volume orders (above 50 kg), custom blends, or recurring supply arrangements,
            reach us on WhatsApp or email and we&apos;ll connect you with our sales team.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-200">
            Response Times
          </h2>
          <ul className="mt-2 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li>Email — within 24–48 business hours</li>
            <li>
              WhatsApp — typically within a few hours during business hours (Mon–Sat, 9am–6pm IST)
            </li>
          </ul>
        </div>

        <div className="border-t border-neutral-200 pt-6 dark:border-neutral-700">
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            See also:{' '}
            <Link href="/refunds-and-cancellations" className="underline underline-offset-4">
              Refunds &amp; Cancellations
            </Link>{' '}
            ·{' '}
            <Link href="/terms-and-conditions" className="underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
