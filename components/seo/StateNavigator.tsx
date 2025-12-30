'use client'

import { useState } from 'react'
import Link from 'next/link'

interface StateNavigatorProps {
  states: {
    [key: string]: {
      [key: string]: any
    }
  }
}

export default function StateNavigator({ states }: StateNavigatorProps) {
  const [expandedState, setExpandedState] = useState<string | null>(null)

  const toggleState = (state: string) => {
    if (expandedState === state) {
      setExpandedState(null)
    } else {
      setExpandedState(state)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Browse by State</h3>
      <div className="space-y-2">
        {Object.entries(states)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([state, cities]) => {
            const cityCount = Object.keys(cities).length
            const isExpanded = expandedState === state
            const stateSlug = state.toLowerCase().replace(/\s+/g, '-')

            return (
              <div
                key={state}
                className="border-b border-gray-100 last:border-0 dark:border-gray-800"
              >
                <button
                  onClick={() => toggleState(state)}
                  className="flex w-full items-center justify-between py-3 text-left hover:text-green-600 dark:hover:text-green-400"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">{state}</span>
                  <span className="flex items-center text-sm text-gray-500">
                    {cityCount} locations
                    <svg
                      className={`ml-2 h-4 w-4 transform transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
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

                {isExpanded && (
                  <div className="pb-4 pl-4">
                    <div className="mb-2">
                      <Link
                        href={`/${stateSlug}`}
                        className="text-sm font-semibold text-green-600 hover:text-green-700 dark:text-green-400"
                      >
                        View {state} Overview →
                      </Link>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {Object.keys(cities).map((city) => {
                        const citySlug = city
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^\w-]+/g, '')
                        return (
                          <li key={city}>
                            <Link
                              href={`/${stateSlug}/${citySlug}`}
                              className="text-sm text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                            >
                              {city}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
