import { Suspense } from 'react'
import { Metadata } from 'next'
import BuyChaiClient from './BuyChaiClient'

export const metadata: Metadata = {
  title: 'Order Chai Samples | Bulk Chai',
  description:
    'Order sample bags of Kadak Chai, Tea Stall Chai, Hotel Chai and premium blends. 3kg, 5kg, 10kg and 20kg bags shipped across India in 2–3 business days.',
  robots: { index: true, follow: true },
}

export default function BuyChaiPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
        <BuyChaiClient />
      </Suspense>
    </div>
  )
}
