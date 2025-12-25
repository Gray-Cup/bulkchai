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
        <div>
  <h2 className="text-xl font-medium text-neutral-800">
    Other Informational Websites by Gray Cup
  </h2>

  <p className="mt-3 text-neutral-600 leading-relaxed">
    BulkChai is part of a small group of websites operated by <a href="https://graycup.org" target="_blank" rel="dofollow" className="underline underline-offset-4">Gray Cup</a>. Each
    website focuses on a specific area of tea knowledge and is designed to share
    information alongside product availability where applicable.
  </p>

  <ul className="mt-4 space-y-2 text-neutral-600 list-disc list-inside">
    <li>
      <a
        href="https://purecha.in"
        target="_blank"
        className="underline underline-offset-4"
      >
        PureCha.in
      </a>{" "}
      – An informational website focused on loose leaf tea, tea purity, leaf
      grades, and quality characteristics across different tea types.
    </li>

    <li>
      <a
        href="https://bulkctc.com"
        target="_blank"
        className="underline underline-offset-4"
      >
        BulkCTC.com
      </a>{" "}
      - An informational website focused specifically on CTC tea, including
      grades, processing methods, particle sizes, and brewing behaviour.
    </li>

    <li>
      <a
        href="https://graycup.org"
        target="_blank"
        className="underline underline-offset-4"
      >
        GrayCup.org
      </a>{" "}
      – The official company website of Gray Cup, providing information about the
      brand, sourcing philosophy, and its tea and coffee offerings.
    </li>
  </ul>
</div>

      </section>
    </main>
  )
}
