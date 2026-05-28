import { headerTopNavLinks } from '@/data/headerNavLinks'
import Link from './Link'

const HeaderTop = () => {
  return (
    <header className="flex w-full items-center justify-between px-8 py-3 sm:px-12">
      <span className="hidden text-xs font-semibold tracking-[0.2em] text-green-100/70 uppercase sm:block">
        Bulk Chai — India
      </span>
      <div className="flex items-center gap-8">
        {headerTopNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-xs font-bold tracking-widest text-white uppercase transition-colors hover:text-green-100"
            >
              {link.title}
            </Link>
          ))}
      </div>
    </header>
  )
}

export default HeaderTop
