import type { SupplyChainInfo } from '@/lib/cityData'

interface HowBulkSupplyWorksProps {
  city: string
  state: string
  transitDays: string
  stateLogistics: string
  supplyChain?: SupplyChainInfo
}

export default function HowBulkSupplyWorks({
  city,
  state,
  transitDays,
  stateLogistics,
  supplyChain,
}: HowBulkSupplyWorksProps) {
  const deliveryMethod = supplyChain?.deliveryMethod || stateLogistics
  const packagingOptions = supplyChain?.packagingOptions || ['25kg sealed bags', '50kg bulk packs']
  const minOrder = supplyChain?.minOrderQty || '50 kg'
  const paymentTerms = supplyChain?.paymentTerms || '100% advance with GST invoice'
  const reorderCycle = supplyChain?.reorderCycle || 'Based on your consumption pattern'

  const rows = [
    { label: 'Delivery', value: deliveryMethod, sub: `Est. ${transitDays}` },
    { label: 'Minimum Order', value: minOrder, sub: 'Trial packs available for first-time buyers' },
    { label: 'Packaging', value: packagingOptions.join(' · ') },
    { label: 'Reorder Cycle', value: reorderCycle },
    { label: 'Payment', value: paymentTerms },
  ]

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        How Bulk Tea Supply Works in {city}
      </h2>

      <dl className="divide-y divide-gray-200 dark:divide-gray-700">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-8 py-3.5">
            <dt className="w-36 shrink-0 text-sm font-semibold text-gray-500 dark:text-gray-400">
              {row.label}
            </dt>
            <dd className="text-sm text-gray-800 dark:text-gray-200">
              {row.value}
              {row.sub && (
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">— {row.sub}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
