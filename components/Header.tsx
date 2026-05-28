import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-5 dark:border-gray-800">
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <span className="text-2xl font-black tracking-tight text-black uppercase dark:text-white">
          {siteMetadata.headerTitle}
        </span>
      </Link>
      <div className="flex items-center gap-8">
        <nav className="no-scrollbar hidden items-center gap-8 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-gray-900 uppercase transition-colors hover:text-black dark:text-gray-200 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
