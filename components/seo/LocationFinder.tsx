'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LocationFinderProps {
  cities: {
    state: string
    city: string
  }[]
}

export default function LocationFinder({ cities }: LocationFinderProps) {
  const [query, setQuery] = useState('')

  const filteredCities = cities
    .filter(
      (c) =>
        c.city.toLowerCase().includes(query.toLowerCase()) ||
        c.state.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 10) // Limit results

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for your city (e.g. Mumbai, Surat)..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="absolute top-3.5 left-3 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {query && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {filteredCities.length > 0 ? (
              <ul className="max-h-60 overflow-auto py-1">
                {filteredCities.map((c) => (
                  <li key={`${c.state}-${c.city}`}>
                    <Link
                      href={`/${c.state}/${c.city}`}
                      className="block px-4 py-2 hover:bg-green-50 dark:hover:bg-gray-800"
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100">{c.city}</div>{' '}
                      // Removed the .replace() logic here, relying on passed props to be clean or
                      slug logic to be handled elsewhere if needed for display? wait, href needs
                      slugs.
                      <div className="text-xs text-gray-500 dark:text-gray-400">{c.state}</div> //
                      Wait, the href needs slugs!
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">No locations found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
