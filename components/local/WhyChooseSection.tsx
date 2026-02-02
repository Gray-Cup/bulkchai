interface WhyChooseSectionProps {
  city: string
  whyChooseUs?: string[]
  // Fallback data for cities without enhanced content
  industries: string[]
  transitDays: string
}

export default function WhyChooseSection({
  city,
  whyChooseUs,
  industries,
  transitDays,
}: WhyChooseSectionProps) {
  // Use enhanced content if available, otherwise generate from existing data
  const reasons = whyChooseUs?.length
    ? whyChooseUs
    : [
        `Reliable delivery within ${transitDays} across ${city} and surrounding areas`,
        `Experience serving ${industries.slice(0, 2).join(' and ')} in ${city}`,
        `Flexible order quantities from 50kg with no rigid minimum commitments`,
        `GST-compliant invoicing for seamless business accounting`,
        `Dedicated support for addressing ${city}-specific logistics requirements`,
      ]

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Why Businesses in {city} Choose BulkChai
      </h2>

      <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-white p-6 dark:border-gray-700 dark:from-green-900/20 dark:to-gray-800">
        <ul className="space-y-4">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
