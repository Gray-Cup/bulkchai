import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="border-b border-gray-200 pt-16 pb-12 dark:border-gray-800">
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase dark:text-gray-500">
          Wholesale Tea Supplier
        </p>
        <p className="max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
          {siteMetadata.description}
        </p>
      </div>

      {posts.length > 0 && (
        <div className="mt-16">
          <p className="mb-8 text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase dark:text-gray-500">
            Latest Updates
          </p>
          <ul className="grid gap-px divide-y divide-gray-200 border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, title } = post
              return (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex items-center justify-between px-6 py-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <h2 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-black dark:text-gray-100 dark:group-hover:text-white">
                      {title}
                    </h2>
                    <span className="ml-4 shrink-0 text-gray-400 transition-colors group-hover:text-black dark:group-hover:text-white">
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {posts.length > MAX_DISPLAY && (
            <div className="mt-6">
              <Link
                href="/blog"
                className="border-b border-current pb-0.5 text-sm font-semibold tracking-wide text-gray-900 uppercase transition-colors hover:text-black dark:text-gray-100 dark:hover:text-white"
                aria-label="All posts"
              >
                All Posts →
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}
