import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */

export interface PageSEOProps {
  title: string
  description?: string
  image?: string
  noindex?: boolean
  canonical?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface StructuredDataAddress {
  streetAddress?: string
  addressLocality: string
  addressRegion: string
  postalCode?: string
  addressCountry: string
}

export interface StructuredDataGeo {
  latitude: number
  longitude: number
}

/* -------------------------------------------------------------------------- */
/*                           Metadata Generator                               */
/* -------------------------------------------------------------------------- */

/**
 * Generates Next.js Metadata object for a page
 * includes OpenGraph, Twitter, and Robot settings
 */
export function generatePageMetadata({
  title,
  description,
  image,
  noindex = false,
  canonical,
  ...rest
}: PageSEOProps): Metadata {
  const metaTitle = title.includes(siteMetadata.title) ? title : `${title} | ${siteMetadata.title}`
  const metaDescription = description || siteMetadata.description
  const metaImage = image ? [image] : [siteMetadata.socialBanner]

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: canonical
      ? {
          canonical: canonical,
        }
      : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: './',
      siteName: siteMetadata.title,
      images: metaImage,
      locale: siteMetadata.locale || 'en_US',
      type: 'website',
    },
    twitter: {
      title: metaTitle,
      description: metaDescription, // Twitter cards should have description too
      card: 'summary_large_image',
      images: metaImage,
      site: siteMetadata.twitter || siteMetadata.x,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...rest,
  }
}

/* -------------------------------------------------------------------------- */
/*                        Structured Data (JSON-LD)                           */
/* -------------------------------------------------------------------------- */

/**
 * Generates Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.headerTitle,
    url: siteMetadata.siteUrl,
    logo: siteMetadata.siteLogo || `${siteMetadata.siteUrl}/static/images/logo.png`,
    sameAs: [
      siteMetadata.facebook,
      siteMetadata.twitter,
      siteMetadata.x,
      siteMetadata.github,
      siteMetadata.linkedin,
      siteMetadata.instagram,
    ].filter(Boolean),
    contactPoint: siteMetadata.contactPoint,
  }
}

/**
 * Generates LocalBusiness Schema
 */
export function generateLocalBusinessSchema({
  name,
  description,
  url,
  image,
  address,
  geo,
  telephone,
  priceRange = '$$',
}: {
  name: string
  description: string
  url: string
  image?: string
  address: StructuredDataAddress
  geo?: StructuredDataGeo
  telephone?: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore', // More specific than LocalBusiness
    name: name,
    description: description,
    url: url,
    image: image,
    telephone: telephone || siteMetadata.contactPoint?.telephone,
    priceRange: priceRange,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    areaServed: {
      '@type': 'City',
      name: address.addressLocality,
    },
  }
}

/**
 * Generates FAQPage Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generates BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${siteMetadata.siteUrl}${item.item}`,
    })),
  }
}

/**
 * Generates Product Schema for Tea
 */
export function generateProductSchema({
  name,
  description,
  image,
  sku,
  brand = siteMetadata.headerTitle,
  priceCurrency = 'INR',
  price,
  availability = 'https://schema.org/InStock',
}: {
  name: string
  description: string
  image: string
  sku?: string
  brand?: string
  priceCurrency?: string
  price?: string | number
  availability?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    image: image,
    description: description,
    sku: sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteMetadata.siteUrl}/contact`,
      priceCurrency: priceCurrency,
      price: price, // Can be "0" or omitted for "Call for Price" scenarios usually, but schema prefers a value.
      // For B2B wholesale, often price is hidden. We can use AggregateOffer if needed.
      availability: availability,
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
}
