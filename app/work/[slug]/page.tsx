import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/data/projects'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return { title: p.name, description: p.oneLiner }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const i = PROJECTS.findIndex((x) => x.slug === p.slug)
  const prev = PROJECTS[i - 1]
  const next = PROJECTS[i + 1]

  // Builds that share the most ground with this one — a reader who liked the
  // local-first argument should be one click from the rest of it.
  const related = PROJECTS.filter((x) => x.slug !== p.slug)
    .map((x) => ({ p: x, overlap: x.tags.filter((t) => p.tags.includes(t)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.p.year - a.p.year)
    .slice(0, 3)

  return (
    <article>
      <header className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10 md:pt-14">
        <Link
          href="/work"
          className="ui text-[0.8125rem] text-[var(--ink-2)] transition-colors hover:text-[var(--flo-deep)]"
        >
          Back to the work
        </Link>

        <div className="mt-8 grid gap-8 border-b border-[var(--rule)] pb-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <h1 className="display text-[length:var(--text-h1)]">{p.name}</h1>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="ui border border-[var(--rule)] px-2 py-0.5 text-[0.75rem] text-[var(--ink-2)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[length:var(--text-lede)] leading-[1.5] lg:pt-3">{p.oneLiner}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* The assertion. The second plate marks it, because this paragraph
              is the part of the page that is actually making a claim. */}
          <section className="self-start border-l-[3px] border-[var(--flo)] pl-6 md:pl-8">
            <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">
              What makes it worth reading
            </h2>
            <p className="prose-body mt-3 text-[1.1875rem] leading-[1.62]">{p.signature}</p>
          </section>

          <aside className="space-y-8 lg:pt-1">
            <section>
              <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Built with</h2>
              <ul className="mt-3 border-t border-[var(--rule)]">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="mono border-b border-[var(--rule)] py-1.5 text-[0.8125rem]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              {p.stackNote && (
                <p className="mt-3 text-[0.875rem] italic leading-[1.6] text-[var(--ink-2)]">
                  {p.stackNote}
                </p>
              )}
            </section>

            <section>
              <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Shipped</h2>
              <p className="mono mt-2 text-[0.8125rem]">{p.year}</p>
            </section>

            {(p.live || p.source) && (
              <section>
                <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Go and look</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      className="ui flex h-9 items-center bg-[var(--flo-deep)] px-3.5 text-[0.8125rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
                    >
                      Open the live site
                    </a>
                  )}
                  {p.source && (
                    <a
                      href={p.source}
                      className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
                    >
                      Read the source
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 md:px-10">
          <h2 className="display border-t border-[var(--rule)] pt-10 text-[1.5rem]">
            Shares ground with
          </h2>
          <div className="mt-6 grid md:grid-cols-3">
            {related.map(({ p: r }) => (
              <Link
                key={r.slug}
                href={`/work/${r.slug}`}
                className="group border-t-[3px] border-[var(--rule)] py-5 transition-colors hover:border-[var(--flo)] md:mr-8"
              >
                <h3 className="display text-[1.2rem] transition-colors group-hover:text-[var(--flo-deep)]">
                  {r.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                  {r.oneLiner}
                </p>
                <p className="ui mt-3 text-[0.75rem] text-[var(--ink-2)]">
                  {r.tags.filter((t) => p.tags.includes(t)).join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav
        aria-label="Other builds"
        className="mx-auto grid max-w-[1440px] border-t border-[var(--rule)] px-5 md:grid-cols-2 md:px-10"
      >
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group border-b border-[var(--rule)] py-7 md:border-b-0 md:border-r md:pr-8"
          >
            <span className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Previous</span>
            <span className="display mt-1.5 block text-[1.4rem] transition-colors group-hover:text-[var(--flo-deep)]">
              {prev.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group py-7 md:pl-8 md:text-right"
          >
            <span className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Next</span>
            <span className="display mt-1.5 block text-[1.4rem] transition-colors group-hover:text-[var(--flo-deep)]">
              {next.name}
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
