import type { LocalContextInfo } from '@/lib/cityData'

interface LocalContextSectionProps {
  city: string
  localContext?: LocalContextInfo
  // Fallback fields for backward compatibility
  cityContext: string
  usageFocus: string
  educationAngle: string
  localNote: string
}

export default function LocalContextSection({
  city,
  localContext,
  cityContext,
  usageFocus,
  educationAngle,
  localNote,
}: LocalContextSectionProps) {
  // Build context items from either new or legacy data
  const contextItems: { title: string; content: string }[] = []

  if (localContext) {
    if (localContext.businessHubs) {
      contextItems.push({
        title: 'Business Hubs & Demand Centres',
        content: localContext.businessHubs,
      })
    }
    if (localContext.teaCulture) {
      contextItems.push({
        title: 'Local Chai Culture',
        content: localContext.teaCulture,
      })
    }
    if (localContext.industrialRelevance) {
      contextItems.push({
        title: 'Industrial & Logistics Context',
        content: localContext.industrialRelevance,
      })
    }
    if (localContext.buyerChallenges) {
      contextItems.push({
        title: 'Common Buyer Challenges',
        content: localContext.buyerChallenges,
      })
    }
    if (localContext.seasonalFactors) {
      contextItems.push({
        title: 'Seasonal Considerations',
        content: localContext.seasonalFactors,
      })
    }
  }

  // Fallback to legacy format if no new localContext
  if (contextItems.length === 0) {
    contextItems.push(
      { title: 'Market Overview', content: cityContext },
      { title: 'Buyer Preferences', content: usageFocus },
      { title: 'Product Guidance', content: educationAngle }
    )
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Understanding the {city} Market
      </h2>

      <div className="space-y-6">
        {contextItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">{item.content}</p>
          </div>
        ))}

        {/* Local Note - always show if available */}
        {localNote && (
          <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-5 dark:bg-amber-900/20">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              <span className="font-semibold">Local Insight:</span> {localNote}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
