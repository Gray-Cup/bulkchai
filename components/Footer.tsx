import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import FooterLocations from '@/components/seo/FooterLocations'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 dark:border-gray-800">
      <FooterLocations />
      <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-black tracking-tight text-black uppercase dark:text-white">
            {siteMetadata.headerTitle}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {siteMetadata.author}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            { href: 'https://graycup.org/', label: 'Graycup' },
            { href: '/privacy-policy', label: 'Privacy' },
            { href: '/contact-us', label: 'Contact' },
            { href: '/about', label: 'About' },
            { href: '/sitemap.xml', label: 'Sitemap' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
