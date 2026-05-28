import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white py-6 dark:bg-gray-950">
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <span className="text-2xl font-black tracking-tight text-green-700 uppercase dark:text-green-400">
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
                className="text-sm font-bold tracking-wide text-gray-700 uppercase transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
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
