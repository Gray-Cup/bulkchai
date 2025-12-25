import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About BulkChai | Bulk CTC Tea & Chai Supplier in India',
  description:
    'BulkChai supplies bulk CTC chai while sharing clear information about tea grades, processing, color, and quality. Built for businesses that value consistency and clarity.',
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold text-neutral-900">About BulkChai</h1>
        <p className="mt-4 leading-relaxed text-neutral-600">
          BulkChai is a bulk chai and CTC tea platform built for businesses that care about tea
          quality, consistency, and clarity. Alongside supplying chai in bulk, we share practical
          information about CTC tea, grades, processing methods, and quality differences.
        </p>
      </header>

      <section className="space-y-10">
        <div>
          <h2 className="text-xl font-medium text-neutral-800">What BulkChai Focuses On</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            Chai is often discussed only in terms of price, but quality depends on much more — CTC
            grades, leaf size, oxidation levels, color, strength, and freshness. BulkChai focuses on
            explaining these factors clearly so buyers understand what they are purchasing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-neutral-800">Chai, CTC Tea & Grades Explained</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            Not all chai looks or tastes the same. Some brews appear darker, stronger, or brisker
            due to differences in CTC processing, particle size, and leaf composition. BulkChai
            shares information about how CTC tea is made, how grades differ, and how these
            differences affect taste, color, and consistency.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-neutral-800">Bulk Supply for Businesses</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            BulkChai supplies chai in bulk quantities for cafés, offices, retailers, traders, and
            other commercial buyers. Our platform is designed to help business buyers make informed
            decisions while sourcing chai that meets their requirements.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-neutral-800">Who BulkChai Is For</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            BulkChai is intended for business owners, procurement teams, tea traders, and
            professionals who want both access to bulk chai and a better understanding of CTC tea
            quality, grades, and characteristics.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-neutral-800">Relationship with Gray Cup</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">
            BulkChai is operated by Gray Cup. While this website provides educational content about
            chai and CTC tea, it also serves as a platform where eligible buyers can explore bulk
            chai sourcing options through official Gray Cup channels.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <p className="text-sm leading-relaxed text-neutral-500">
            BulkChai combines product access with educational content to help buyers understand what
            goes into a good cup of chai at scale.
          </p>
        </div>
      </section>
    </main>
  )
}
