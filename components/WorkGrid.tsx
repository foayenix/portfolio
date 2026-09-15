'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ALL_TAGS, PROJECTS } from '@/data/projects'

export default function WorkGrid() {
  const [tag, setTag] = useState<string | null>(null)

  const shown = useMemo(
    () => (tag ? PROJECTS.filter((p) => p.tags.includes(tag)) : PROJECTS),
    [tag],
  )

  return (
    <>
      <div className="sticky top-14 z-30 border-y border-[var(--rule)] bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div
            role="group"
            aria-label="Filter by kind"
            className="-mx-1 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <FilterButton on={tag === null} onClick={() => setTag(null)}>
              All {PROJECTS.length}
            </FilterButton>
            {ALL_TAGS.map((t) => {
              const n = PROJECTS.filter((p) => p.tags.includes(t)).length
              return (
                <FilterButton key={t} on={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                  {t} {n}
                </FilterButton>
              )
            })}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p aria-live="polite" className="sr-only">
          {shown.length} {shown.length === 1 ? 'build' : 'builds'} shown
        </p>

        <div className="grid border-[var(--rule)] md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.slug}
              className="group relative border-b border-[var(--rule)] md:[&:nth-child(2n+1)]:border-r xl:[&:nth-child(2n+1)]:border-r-0 xl:[&:not(:nth-child(3n))]:border-r"
            >
              {/* The ink bar: a swatch of the second plate, shown only while
                  this entry is the one being read. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[var(--flo)] transition-transform duration-300 group-hover:scale-y-100 group-focus-within:scale-y-100"
              />

              <Link href={`/work/${p.slug}`} className="block h-full px-5 py-7 md:px-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="display text-[1.4rem]">{p.name}</h2>
                  <span className="mono shrink-0 text-[length:var(--text-micro)] text-[var(--ink-2)]">
                    {p.year}
                  </span>
                </div>

                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                  {p.oneLiner}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="ui border border-[var(--rule)] px-1.5 py-0.5 text-[0.6875rem] text-[var(--ink-2)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mono mt-4 text-[length:var(--text-micro)] leading-[1.8] text-[var(--ink-2)]">
                  {p.stack.slice(0, 4).join('  /  ')}
                  {p.stack.length > 4 && ` / +${p.stack.length - 4}`}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function FilterButton({
  on,
  onClick,
  children,
}: {
  on: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`ui shrink-0 whitespace-nowrap border px-2.5 py-1 text-[0.75rem] transition-colors ${
        on
          ? 'border-[var(--flo-deep)] bg-[var(--flo-deep)] text-[var(--on-flo)]'
          : 'border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink-2)] hover:text-[var(--ink)]'
      }`}
    >
      {children}
    </button>
  )
}
