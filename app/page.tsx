import Link from 'next/link'
import { SITE } from '@/data/site'
import { PROJECTS } from '@/data/projects'
import Catalogue from '@/components/Catalogue'

export default function Home() {
  const years = PROJECTS.map((p) => p.year)
  const withSource = PROJECTS.filter((p) => p.source).length

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <h1 className="display text-[length:var(--text-h1)]">
            Everything I&rsquo;ve
            <br />
            built, in one list.
          </h1>

          <div className="lg:pt-2">
            <p className="text-[length:var(--text-lede)] leading-[1.5]">{SITE.lede}</p>

            <dl className="mt-8 grid max-w-md grid-cols-3 border-t border-[var(--rule)] pt-4">
              <div>
                <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Builds</dt>
                <dd className="display mt-1 text-[1.5rem]">{PROJECTS.length}</dd>
              </div>
              <div>
                <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Source public</dt>
                <dd className="display mt-1 text-[1.5rem]">{withSource}</dd>
              </div>
              <div>
                <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Since</dt>
                <dd className="display mt-1 text-[1.5rem]">{Math.min(...years)}</dd>
              </div>
            </dl>

            <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
              Move down the list to read each one. Or{' '}
              <Link href="/work" className="text-[var(--ink)] underline decoration-[var(--flo)] decoration-2 underline-offset-4 hover:text-[var(--flo-deep)]">
                browse the work by what it is
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Catalogue" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Catalogue />
      </section>
    </>
  )
}
