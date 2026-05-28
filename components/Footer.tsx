import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import FooterLocations from '@/components/seo/FooterLocations'

export default function Footer() {
  return (
    <footer className="mt-24">
      <FooterLocations />
      <div className="rounded-xl bg-green-50 px-10 py-12 dark:bg-green-950/30">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xl font-black tracking-tight text-green-800 uppercase dark:text-green-400">
              {siteMetadata.headerTitle}
            </p>
            <p className="mt-2 text-sm text-green-700/60 dark:text-green-500/60">
              © {new Date().getFullYear()} {siteMetadata.author}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
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
                className="text-sm font-semibold text-green-700/70 transition-colors hover:text-green-800 dark:text-green-500/70 dark:hover:text-green-400"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
