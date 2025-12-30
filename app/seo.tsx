import { Metadata } from 'next'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

import { generatePageMetadata } from '@/lib/seo-utils'

export function genPageMetadata(props: PageSEOProps): Metadata {
  return generatePageMetadata(props)
}
