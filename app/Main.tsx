import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="rounded-xl bg-green-50 px-10 py-12 dark:bg-green-950/20">
        <p className="mb-4 text-xs font-bold tracking-[0.25em] text-green-600 uppercase dark:text-green-500">
          Wholesale Tea Supplier
        </p>
        <p className="max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {siteMetadata.description}
        </p>
      </div>

      {posts.length > 0 && (
        <div className="mt-16">
          <p className="mb-8 text-xs font-bold tracking-[0.25em] text-green-600 uppercase dark:text-green-500">
            Latest Updates
          </p>
          <ul className="flex flex-col gap-3">
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, title } = post
              return (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex items-center justify-between rounded-lg bg-gray-50 px-8 py-5 transition-colors hover:bg-green-50 dark:bg-gray-900 dark:hover:bg-green-950/30"
                  >
                    <h2 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-green-800 dark:text-gray-100 dark:group-hover:text-green-400">
                      {title}
                    </h2>
                    <span className="ml-4 shrink-0 text-gray-400 transition-colors group-hover:text-green-600 dark:group-hover:text-green-500">
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {posts.length > MAX_DISPLAY && (
            <div className="mt-8">
              <Link
                href="/blog"
                className="text-sm font-bold tracking-wide text-green-700 uppercase transition-colors hover:text-green-900 dark:text-green-500 dark:hover:text-green-400"
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
