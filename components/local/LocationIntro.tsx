interface LocationIntroProps {
  city: string
  state: string
  locationDescriptor?: string
  primaryBuyerTypes?: string[]
  industries: string[]
  nearbyAreas: string[]
}

export default function LocationIntro({
  city,
  state,
  locationDescriptor,
  primaryBuyerTypes,
  industries,
  nearbyAreas,
}: LocationIntroProps) {
  // Build a unique intro based on available data
  const buyerList = primaryBuyerTypes?.length
    ? primaryBuyerTypes.slice(0, 3).join(', ')
    : industries.slice(0, 3).join(', ')

  const areaList = nearbyAreas.slice(0, 3).join(', ')

  // Use location descriptor if available, otherwise build contextually
  const cityDescription = locationDescriptor
    ? `${city}, ${locationDescriptor},`
    : `${city}, ${state},`

  return (
    <div className="prose prose-lg dark:prose-invert mb-10">
      <p>
        {cityDescription} presents distinct requirements for bulk tea and chai supply. Businesses
        here—including {buyerList}—need consistent quality, reliable delivery schedules, and
        competitive wholesale pricing to maintain their daily operations.
      </p>

      <p>
        BulkChai serves establishments across {city} and surrounding areas such as {areaList}.
        Whether you operate a high-volume cafeteria serving hundreds of cups daily or a retail
        outlet catering to local demand, our supply chain is built to match your consumption
        patterns with flexible order quantities starting from{' '}
        <strong>50 kg</strong>.
      </p>

      <p>
        Every order includes GST-compliant invoicing, batch-consistent quality, and dedicated
        support to address the specific logistics of supplying {state}.
      </p>
    </div>
  )
}
