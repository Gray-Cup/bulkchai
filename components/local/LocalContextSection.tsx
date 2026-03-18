import type { LocalContextInfo } from '@/lib/cityData'

interface LocalContextSectionProps {
  city: string
  localContext?: LocalContextInfo
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
  const contextItems: { title: string; content: string }[] = []

  if (localContext) {
    if (localContext.businessHubs) {
      contextItems.push({
        title: 'Business Hubs & Demand Centres',
        content: localContext.businessHubs,
      })
    }
    if (localContext.teaCulture) {
      contextItems.push({ title: 'Local Chai Culture', content: localContext.teaCulture })
    }
    if (localContext.industrialRelevance) {
      contextItems.push({
        title: 'Industrial & Logistics Context',
        content: localContext.industrialRelevance,
      })
    }
    if (localContext.buyerChallenges) {
      contextItems.push({ title: 'Common Buyer Challenges', content: localContext.buyerChallenges })
    }
    if (localContext.seasonalFactors) {
      contextItems.push({ title: 'Seasonal Considerations', content: localContext.seasonalFactors })
    }
  }

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

      <div className="space-y-5">
        {contextItems.map((item, index) => (
          <div key={index}>
            <p className="mb-1 text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
              {item.title}
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">{item.content}</p>
          </div>
        ))}

        {localNote && (
          <p className="border-l-2 border-gray-300 pl-4 text-sm leading-relaxed text-gray-500 dark:border-gray-600 dark:text-gray-400">
            {localNote}
          </p>
        )}
      </div>
    </section>
  )
}
