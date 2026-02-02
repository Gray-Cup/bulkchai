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
  // Default values for backward compatibility
  const deliveryMethod = supplyChain?.deliveryMethod || stateLogistics
  const packagingOptions = supplyChain?.packagingOptions || [
    '25kg sealed bags',
    '50kg bulk packs',
  ]
  const minOrder = supplyChain?.minOrderQty || '50 kg'
  const paymentTerms = supplyChain?.paymentTerms || '100% advance with GST invoice'
  const reorderCycle = supplyChain?.reorderCycle || 'Based on your consumption pattern'

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        How Bulk Tea Supply Works in {city}
      </h2>

      <div className="space-y-6">
        {/* Delivery Coverage */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Delivery Coverage
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{deliveryMethod}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Estimated: {transitDays}
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Minimum Order */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Minimum Order
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{minOrder}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Trial packs available for first-time buyers
            </p>
          </div>

          {/* Reorder Cycle */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Recommended Reorder
            </h3>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{reorderCycle}</p>
          </div>
        </div>

        {/* Packaging Options */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Packaging Options
          </h3>
          <div className="flex flex-wrap gap-3">
            {packagingOptions.map((option, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {option}
              </span>
            ))}
          </div>
        </div>

        {/* Payment Terms */}
        <div className="rounded-lg border-l-4 border-primary-500 bg-primary-50 p-5 dark:bg-primary-900/20">
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
            Payment Terms
          </h3>
          <p className="text-gray-800 dark:text-gray-200">{paymentTerms}</p>
        </div>
      </div>
    </section>
  )
}
