'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PROJECTS, STATUS } from '@/data/projects'
import StatusTag from './StatusTag'

/**
 * The index of everything, listed at once.
 *
 * Moving through the list inks the entry into the panel beside it. That is the
 * only motion on the page not answering a click. Below `lg` there is no panel:
 * each entry carries its own summary, because a phone has no hover state to
 * drive one.
 */
export default function Catalogue() {
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug)
  const active = PROJECTS.find((p) => p.slug === activeSlug) ?? PROJECTS[0]

  return (
    <div className="grid lg:grid-cols-[1fr_27rem] xl:grid-cols-[1fr_31rem]">
      {/* The list */}
      <ol className="border-t border-[var(--rule)]">
        {PROJECTS.map((p, i) => {
          const on = p.slug === activeSlug
          return (
            <li key={p.slug} className="border-b border-[var(--rule)]">
              <Link
                href={`/work/${p.slug}`}
                onMouseEnter={() => setActiveSlug(p.slug)}
                onFocus={() => setActiveSlug(p.slug)}
                className={`group block py-4 transition-colors lg:py-[0.85rem] lg:pr-10 ${
                  on ? 'reg-on' : ''
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="reg display shrink-0 text-[clamp(1.35rem,3.4vw,2rem)]"
                    data-reg={p.name}
                  >
                    {p.name}
                  </span>

                  <span
                    aria-hidden
                    className="hidden h-px flex-1 translate-y-[-0.3em] bg-[var(--rule)] lg:block"
                  />

                  <span className="mono ml-auto shrink-0 text-[length:var(--text-micro)] text-[var(--ink-2)] lg:ml-0">
                    {p.year}
                  </span>

                  {p.featured && (
                    <span
                      title="Pick of the catalogue"
                      className="hidden h-[7px] w-[7px] shrink-0 translate-y-[-0.35em] bg-[var(--flo)] lg:block"
                    >
                      <span className="sr-only">Pick of the catalogue</span>
                    </span>
                  )}
                </div>

                {/* Phones and tablets get the summary inline. */}
                <div className="lg:hidden">
                  <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-[1.55] text-[var(--ink-2)]">
                    {p.oneLiner}
                  </p>
                  <span className="mt-2.5 inline-block">
                    <StatusTag status={p.status} />
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>

      {/* The plate */}
      <aside className="hidden border-l border-t border-[var(--rule)] lg:block">
        <div className="sticky top-14">
          <article key={active.slug} className="ink-in px-8 py-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="display text-[1.75rem]">{active.name}</h2>
              <span className="mono text-[length:var(--text-micro)] text-[var(--ink-2)]">
                {active.year}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <StatusTag status={active.status} />
              {active.tags.map((t) => (
                <span
                  key={t}
                  className="ui border border-[var(--rule)] px-1.5 py-0.5 text-[0.6875rem] text-[var(--ink-2)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-5 text-[1.0625rem] leading-[1.6]">{active.oneLiner}</p>

            <p className="mt-3 text-[0.875rem] leading-[1.6] text-[var(--ink-2)]">
              {STATUS[active.status].blurb}
            </p>

            <p className="mt-4 border-t border-[var(--rule)] pt-4 text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">
              {active.signature}
            </p>

            <p className="mono mt-5 text-[length:var(--text-micro)] leading-[1.9] text-[var(--ink-2)]">
              {active.stack.join('  /  ')}
            </p>

            <Link
              href={`/work/${active.slug}`}
              className="ui mt-6 inline-flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo-deep)] hover:bg-[var(--flo-deep)] hover:text-[var(--on-flo)]"
            >
              Read the build
            </Link>
          </article>
        </div>
      </aside>
    </div>
  )
}
