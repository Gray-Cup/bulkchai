import siteMetadata from '@/data/siteMetadata'
import { headerTopNavLinks } from '@/data/headerNavLinks'
import Link from './Link'

const HeaderTop = () => {
  const headerClass = 'flex items-center w-full justify-between px-8'

  return (
    <header className={headerClass}>
      <div className="flex items-center justify-between hidden sm:flex">

        {typeof siteMetadata.headerTitle === 'string' ? (
          <div className="text-neutral-50 font-semibold sm:block">
            Namaste Ji
          </div>
        ) : (
          siteMetadata.headerTitle
        )}
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-12">
        <div className="no-scrollbar flex items-center overflow-x-auto">
          {headerTopNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-neutral-200 text-xs sm:text-base mx-2 font-medium text-nowrap text-neutral-50"
              >
                {link.title}
              </Link>
            ))}
        </div>
      </div>
    </header>
  )
}

export default HeaderTop;
