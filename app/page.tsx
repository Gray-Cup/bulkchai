import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk Chai Supplier in India | Wholesale CTC Tea for Business',
  description:
    'BulkChai supplies wholesale CTC tea and bulk chai across India. Minimum 3 kg orders, GST invoicing, doorstep delivery to cafes, offices, hotels, and canteens. Get a quote today.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bulk Chai Supplier in India | Wholesale CTC Tea for Business',
    description:
      'BulkChai supplies wholesale CTC tea and bulk chai across India. Minimum 3 kg orders, GST invoicing, doorstep delivery to cafes, offices, hotels, and canteens.',
    url: 'https://www.bulkchai.com',
    locale: 'en_IN',
  },
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
