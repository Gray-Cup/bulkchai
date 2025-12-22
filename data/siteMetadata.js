/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Bulk Chai',
  author: 'Gray Cup Enterprises Pvt. Ltd.',
  headerTitle: 'Bulk Chai',
  description: 'A blog created with Next.js and Tailwind.css',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://bulkchai.vercel.app',
  siteRepo: 'https://github.com/timlrx/bulkchai',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'bulk@graycup.in',
  github: 'https://github.com/gray-cup',
  x: 'https://twitter.com/thegraycup',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/company/gray-cup/',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com/thegraycup',
  // medium: 'https://medium.com',
  locale: 'en-US',
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
}

module.exports = siteMetadata
