import { contactInfo } from '@/lib/cityData'
import QuoteFormDialog from './QuoteFormDialog'

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

  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}`

  return (
    <div className="mb-10">
      <div className="prose prose-lg dark:prose-invert">
        <p>
          {cityDescription} presents distinct requirements for bulk tea and chai supply. Businesses
          here—including {buyerList}—need consistent quality, reliable delivery schedules, and
          competitive wholesale pricing to maintain their daily operations.{' '}
          <span className="not-prose inline-flex items-center gap-1 rounded-sm border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
            ✓ GST Supported
          </span>
        </p>

        <p>
          BulkChai serves establishments across {city} and surrounding areas such as {areaList}.
          Whether you operate a high-volume cafeteria serving hundreds of cups daily or a retail
          outlet catering to local demand, our supply chain is built to match your consumption
          patterns with flexible order quantities starting from <strong>50 kg</strong>.
        </p>

        <p>
          Every order includes GST-compliant invoicing, batch-consistent quality, and dedicated
          support to address the specific logistics of supplying {state}.
        </p>
        <p>You can call Arjun at +91 85279 14317</p>
      </div>

      <div className="not-prose mt-4 flex flex-wrap gap-2">
        <div className="rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            CTC Tea
          </p>
          <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-gray-100">
            ₹250 – ₹400<span className="ml-1 text-xs font-normal text-gray-500">/kg</span>
          </p>
        </div>
        <div className="rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/60">
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Tea Leaves
          </p>
          <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-gray-100">
            ₹400 – ₹1,300<span className="ml-1 text-xs font-normal text-gray-500">/kg</span>
          </p>
        </div>
      </div>

      <div className="not-prose mt-6 flex flex-wrap items-center gap-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-sm bg-green-600 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-green-700"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Get Bulk Quote on WhatsApp
        </a>
        <QuoteFormDialog city={city} state={state} />
        <a
          href="tel:+918527914317"
          className="inline-flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-6 py-3 text-sm font-semibold tracking-wide text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Now
        </a>
      </div>
    </div>
  )
}
