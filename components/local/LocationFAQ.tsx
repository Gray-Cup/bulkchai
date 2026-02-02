'use client'

import { useState } from 'react'
import type { FAQItem } from '@/lib/cityData'

interface LocationFAQProps {
  city: string
  state: string
  faqs?: FAQItem[]
  transitDays: string
}

// Generate FAQ schema for JSON-LD
export function generateLocationFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export default function LocationFAQ({ city, state, faqs, transitDays }: LocationFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Default FAQs if none provided
  const defaultFaqs: FAQItem[] = [
    {
      question: `What is the minimum order quantity for bulk tea delivery in ${city}?`,
      answer: `We deliver bulk CTC tea starting from 50kg per order across ${city}, ${state}. For first-time buyers, we can arrange smaller trial quantities to verify quality before committing to regular orders.`,
    },
    {
      question: `How long does bulk tea delivery take to ${city}?`,
      answer: `Standard delivery to ${city} takes ${transitDays} from order confirmation. Delivery times may vary based on specific locality and order volume.`,
    },
    {
      question: `Do you provide GST invoices for bulk tea purchases in ${city}?`,
      answer: `Yes, all bulk tea orders include proper GST invoices with HSN code 0902 for tea. This is essential for businesses in ${city} claiming input tax credit. We also provide delivery challans and quality certificates on request.`,
    },
    {
      question: `Which tea grade is best for high-volume chai service in ${city}?`,
      answer: `For businesses in ${city} serving high volumes, we typically recommend BOP (Broken Orange Pekoe) or medium CTC grades that brew quickly while maintaining consistent taste across batches. Our team can suggest the right grade based on your specific brewing method and water quality.`,
    },
  ]

  const displayFaqs = faqs?.length ? faqs : defaultFaqs
  const faqSchema = generateLocationFAQSchema(displayFaqs)

  return (
    <section className="mb-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Frequently Asked Questions - Bulk Tea Supply in {city}
      </h2>

      <div className="space-y-3">
        {displayFaqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left"
              aria-expanded={openIndex === index}
            >
              <h3 className="pr-4 text-base font-semibold text-gray-900 dark:text-gray-100">
                {faq.question}
              </h3>
              <span
                className={`flex-shrink-0 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>

            {openIndex === index && (
              <div className="border-t border-gray-200 px-5 pb-5 pt-4 dark:border-gray-700">
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
