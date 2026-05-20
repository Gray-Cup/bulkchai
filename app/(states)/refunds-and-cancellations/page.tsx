import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refunds & Cancellations | BulkChai',
  description:
    'BulkChai refund and cancellation policy — order cancellations, damaged goods, and refund processing timelines for bulk chai orders.',
}

export default function RefundsAndCancellationsPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Refunds &amp; Cancellations
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Last updated: May 2026</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none pt-10 pb-8">
        <section className="mb-8">
          <h2>Overview</h2>
          <p>
            At BulkChai (operated by <strong>Gray Cup Enterprises Pvt. Ltd.</strong>), we want you
            to be satisfied with every order. This policy explains when cancellations and refunds
            are available and how they are processed.
          </p>
        </section>

        <section className="mb-8">
          <h2>Order Cancellations</h2>

          <h3>Before Dispatch</h3>
          <p>
            You may cancel your order within <strong>12 hours of placing it</strong>, provided it
            has not yet been dispatched. To cancel, contact us immediately at{' '}
            <a href="mailto:bulk@graycup.in">bulk@graycup.in</a> or{' '}
            <a href="https://wa.me/918527914317" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            with your order ID (starts with <code>bc_</code>).
          </p>
          <p>
            If your order has already been packed or handed to the courier, it cannot be cancelled.
          </p>

          <h3>After Dispatch</h3>
          <p>
            Once an order is dispatched, cancellations are not accepted. Please refer to the{' '}
            <strong>Returns</strong> section below if you have received a damaged or incorrect
            shipment.
          </p>
        </section>

        <section className="mb-8">
          <h2>Refunds</h2>

          <h3>Eligible Situations</h3>
          <p>Refunds are issued in the following cases:</p>
          <ul>
            <li>
              <strong>Order cancelled before dispatch</strong> — full refund of the amount paid.
            </li>
            <li>
              <strong>Product damaged in transit</strong> — full or partial refund after
              verification (see below).
            </li>
            <li>
              <strong>Wrong product delivered</strong> — full refund or replacement at our
              discretion.
            </li>
            <li>
              <strong>Product unavailable after payment</strong> — full refund processed promptly.
            </li>
          </ul>

          <h3>Non-Eligible Situations</h3>
          <ul>
            <li>Change of mind after dispatch.</li>
            <li>Incorrect delivery address provided at checkout.</li>
            <li>Delay in delivery due to courier or external factors (weather, strikes, etc.).</li>
            <li>Opened or used products (except in cases of quality defects).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Damaged or Incorrect Orders</h2>
          <p>
            If you receive a damaged or incorrect product, please{' '}
            <strong>contact us within 48 hours of delivery</strong> with:
          </p>
          <ul>
            <li>Your order ID</li>
            <li>A photo or video of the damaged/incorrect item and packaging</li>
            <li>A brief description of the issue</li>
          </ul>
          <p>
            Send this to <a href="mailto:bulk@graycup.in">bulk@graycup.in</a>. We will review and
            respond within 2 business days with a resolution — either a replacement shipment or a
            refund.
          </p>
        </section>

        <section className="mb-8">
          <h2>Refund Process &amp; Timelines</h2>
          <p>
            Refunds are processed back to the original payment method via{' '}
            <strong>Cashfree Payments</strong>. Once approved:
          </p>
          <ul>
            <li>
              <strong>UPI / Wallets</strong> — 1–3 business days
            </li>
            <li>
              <strong>Debit / Credit Card</strong> — 5–7 business days
            </li>
            <li>
              <strong>Net Banking</strong> — 3–5 business days
            </li>
          </ul>
          <p>
            Refund timelines may vary slightly depending on your bank. GST is not refundable once
            included in a processed invoice.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact for Refund Requests</h2>
          <address className="not-italic">
            <strong>Gray Cup Enterprises Pvt. Ltd.</strong>
            <br />
            FF122, Rodeo Drive Mall, GT Road, TDI City,
            <br />
            Kundli, Sonipat, Haryana 131030
            <br />
            GST: 06AAMCG4985H1Z4
            <br />
            Email: <a href="mailto:bulk@graycup.in">bulk@graycup.in</a>
            <br />
            WhatsApp:{' '}
            <a href="https://wa.me/918527914317" target="_blank" rel="noopener noreferrer">
              +91 85279 14317
            </a>
            <br />
            Response time: within 2 business days
          </address>
        </section>

        <section className="mb-8">
          <h2>Related Policies</h2>
          <ul>
            <li>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
