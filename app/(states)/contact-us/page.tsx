import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact BulkChai | Bulk Chai & Wholesale Tea Information',
  description:
    'Contact BulkChai for information about bulk chai sourcing, wholesale tea quality, logistics, and procurement guidance for businesses in India.',
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-neutral-900">Contact BulkChai</h1>
        <p className="mt-4 leading-relaxed text-neutral-600">
          BulkChai is an informational platform by Gray Cup, created to help businesses understand
          bulk chai sourcing, wholesale tea quality, and procurement processes in India.
        </p>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium text-neutral-800">Business & Information Inquiries</h2>
          <p className="mt-2 text-neutral-600">
            If you are a café owner, office buyer, retailer, distributor, or tea professional
            looking to understand bulk chai sourcing, feel free to reach out.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-800">Email</h3>
          <p className="mt-1 text-neutral-700">
            <a
              href="mailto:support@graycup.org"
              className="text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
            >
              support@graycup.org
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-800">Response Time</h3>
          <p className="mt-1 text-neutral-600">We typically respond within 24–48 business hours.</p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <p className="text-sm leading-relaxed text-neutral-500">
            <strong>Note:</strong> BulkChai does not directly sell products. This website is
            intended for informational purposes only. For purchasing inquiries, you may be guided to
            official Gray Cup platforms.
          </p>
        </div>
      </section>
    </main>
  )
}
