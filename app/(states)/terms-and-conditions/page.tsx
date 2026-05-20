import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | BulkChai',
  description:
    'Terms and Conditions for BulkChai — wholesale chai ordering, payment, delivery, and usage terms governed by Gray Cup Enterprises Pvt. Ltd.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Terms &amp; Conditions
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Last updated: May 2026</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none pt-10 pb-8">
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of{' '}
            <strong>www.bulkchai.com</strong> and any orders placed through it. The site is operated
            by <strong>Gray Cup Enterprises Pvt. Ltd.</strong> (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;), a company incorporated under the laws of India.
          </p>
          <p>
            By placing an order or using this website, you agree to be bound by these Terms. If you
            do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Products &amp; Services</h2>
          <p>
            BulkChai supplies bulk CTC chai and tea blends in pre-packaged bags to businesses and
            individual buyers across India. Our current product range and pricing is listed at{' '}
            <Link href="/products-and-services">Products &amp; Services</Link>.
          </p>
          <p>
            All prices are listed in <strong>Indian Rupees (INR)</strong> and are exclusive of GST
            unless stated otherwise. Tea attracts <strong>5% GST</strong> under Indian tax law.
          </p>
        </section>

        <section className="mb-8">
          <h2>3. Orders</h2>
          <ul>
            <li>
              Orders are placed through the <Link href="/buy-chai">Buy Chai</Link> page on this
              website.
            </li>
            <li>
              An order is confirmed only after successful payment via our payment partner,{' '}
              <strong>Cashfree Payments</strong>.
            </li>
            <li>
              We reserve the right to cancel or refuse any order at our discretion, with a full
              refund issued if payment has been collected.
            </li>
            <li>
              Product availability may vary. If an ordered product is out of stock, we will contact
              you to offer an alternative or a refund.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>4. Payments</h2>
          <ul>
            <li>
              All payments are processed securely through <strong>Cashfree Payments</strong>. We do
              not store your card or UPI details.
            </li>
            <li>
              Payment links expire <strong>30 minutes</strong> after generation. A new order must be
              placed if the link expires before payment.
            </li>
            <li>All transactions are in INR.</li>
            <li>
              GST invoices are issued upon request. Provide your GST number at checkout for
              inclusion on the invoice.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>5. Delivery</h2>
          <ul>
            <li>
              Orders are dispatched within <strong>2–3 business days</strong> of confirmed payment.
            </li>
            <li>
              Estimated delivery time after dispatch is <strong>3–5 business days</strong>,
              depending on your location within India.
            </li>
            <li>
              Delivery is available across India. Delivery charges, if applicable, are communicated
              before checkout.
            </li>
            <li>
              We are not liable for delays caused by courier partners, natural events, strikes, or
              other circumstances beyond our control.
            </li>
            <li>Risk of loss and title for products passes to you upon handover to the courier.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>6. Cancellations &amp; Refunds</h2>
          <p>
            Please refer to our{' '}
            <Link href="/refunds-and-cancellations">Refunds &amp; Cancellations Policy</Link> for
            full details.
          </p>
        </section>

        <section className="mb-8">
          <h2>7. Use of Website</h2>
          <ul>
            <li>You must be at least 18 years of age to place an order.</li>
            <li>
              You agree not to misuse this website, submit false information, or attempt to
              manipulate the payment system.
            </li>
            <li>
              All content on this website — including text, images, and product descriptions — is
              the property of Gray Cup Enterprises Pvt. Ltd. and may not be reproduced without
              permission.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Gray Cup Enterprises Pvt. Ltd. is not liable for
            any indirect, incidental, or consequential loss arising from use of this website or
            products purchased through it. Our total liability shall not exceed the amount paid by
            you for the specific order in question.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Privacy</h2>
          <p>
            Your personal data is handled in accordance with our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the website after changes
            are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2>11. Governing Law &amp; Disputes</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section className="mb-8">
          <h2>12. Contact</h2>
          <address className="not-italic">
            <strong>Gray Cup Enterprises Pvt. Ltd.</strong>
            <br />
            Email: <a href="mailto:bulk@graycup.in">bulk@graycup.in</a>
            <br />
            Phone: <a href="tel:+918527914317">+91 85279 14317</a>
            <br />
            Website:{' '}
            <a href="https://www.bulkchai.com" target="_blank" rel="noopener noreferrer">
              www.bulkchai.com
            </a>
          </address>
        </section>
      </div>
    </div>
  )
}
