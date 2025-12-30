/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Bulk Chai Supplier in India | Wholesale Tea for Business',
  author: 'Gray Cup Enterprises Pvt. Ltd.',
  headerTitle: 'Bulk Chai',
  description:
    'Looking for bulk chai supply in India? Learn about wholesale tea sourcing, pricing, logistics, and quality standards for cafes, offices, and businesses.',
  language: 'en-IN',
  theme: 'light', // system, dark or light
  siteUrl: 'https://bulkchai.com',
  // siteRepo: 'https://github.com/timlrx/bulkchai',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/og.png`,
  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'bulk@graycup.in',
  github: 'https://github.com/gray-cup',
  x: 'https://twitter.com/thegraycup',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://www.facebook.com/groups/1177349100659004',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/company/gray-cup/',
  // threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com/thegraycup',
  // medium: 'https://medium.com',
  locale: 'en-IN',
  // set to true if you want a navbar fixed to the top
  stickyNav: true,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. bulkchai.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  // Business Schema Data
  companyName: 'Gray Cup Enterprises Pvt. Ltd.',
  foundingDate: '2019',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  defaultKeywords: [
    'bulk chai',
    'wholesale tea',
    'ctc tea supplier',
    'tea distributor',
    'bulk tea powder',
    'chai business',
    'tea wholesale price',
  ],
}

module.exports = siteMetadata
