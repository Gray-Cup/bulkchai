'use client'

import { Dialog } from '@base-ui-components/react/dialog'
import QuoteForm from './QuoteForm'

interface QuoteFormDialogProps {
  city: string
  state: string
}

export default function QuoteFormDialog({ city, state }: QuoteFormDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-6 py-3 text-sm font-semibold tracking-wide text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800">
        Fill Form
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm bg-white shadow-xl transition-all duration-200 outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:bg-gray-900">
          <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div>
              <Dialog.Title className="text-base font-bold text-gray-900 dark:text-gray-100">
                Request a Bulk Quote
              </Dialog.Title>
              <Dialog.Description className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {city}, {state} · Min 50 kg
              </Dialog.Description>
            </div>
            <Dialog.Close className="mt-0.5 ml-4 rounded-sm p-1 text-gray-400 transition-colors hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:hover:text-gray-200">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="px-6 py-5">
            <QuoteForm defaultCity={city} defaultState={state} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
