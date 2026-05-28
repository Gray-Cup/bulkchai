import { headerTopNavLinks } from '@/data/headerNavLinks'
import Link from './Link'

const HeaderTop = () => {
  return (
    <header className="flex w-full items-center justify-between px-6 py-2.5 sm:px-10">
      <span className="hidden text-xs font-medium tracking-[0.2em] text-white/60 uppercase sm:block">
        Bulk Chai — India
      </span>
      <div className="flex items-center gap-6">
        {headerTopNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:text-white/60"
            >
              {link.title}
            </Link>
          ))}
      </div>
    </header>
  )
}

export default HeaderTop
