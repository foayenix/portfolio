import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/data/site'
import { COUNTS, PROJECTS, STATUS, type Status } from '@/data/projects'
import StatusTag from '@/components/StatusTag'

export const metadata: Metadata = {
  title: 'Profile',
  description: SITE.lede,
}

/** Three arguments the builds keep making, each cited from the builds themselves. */
const PRINCIPLES = [
  {
    heading: 'A record you can check',
    body: 'A log that flatters you is not much use. SETT ships with no streaks, badges or confetti, and shows its reasoning for every suggested set. tbot throws out a strategy that peeked at tomorrow. Bob prints a regulation value only once someone has verified it. Proper scores a codebase from a deterministic scan, and keeps the explanation layer where it cannot reach the finding underneath.',
    cites: ['sett', 'tbot', 'bob', 'proper'],
  },
  {
    heading: 'It works with the network off',
    body: 'Most of what I build runs on your own machine with your own keys, and keeps running when the connection drops. Quire is a full thesis canvas with no login and no cloud. The Deposit Ledger is one SQLite file. Shelf stores notes as plain Markdown so the library outlives the app that made it.',
    cites: ['quire', 'the-deposit-ledger', 'shelf'],
  },
  {
    heading: 'Enforced, not implied',
    body: 'A rule that lives only in the interface is a suggestion. Plave hides gift reservations from the list owner with a row-level security policy in the database. Football Frenzy re-simulates every match server-side from a seed and a decision log, so nobody has to take the client’s word for the result.',
    cites: ['plave', 'football-frenzy'],
  },
]

export default function ProfilePage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <h1 className="display text-[length:var(--text-h1)]">
              What I do, and
              <br />
              how far it got.
            </h1>
            <div className="prose-body mt-8 text-[1.0625rem]">
              {SITE.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* The hiring route, stated rather than left to be inferred from a
              contact link. Roles first, because that is the question a reader
              arrives with and the site never used to answer. */}
          <aside className="lg:pt-3">
            <section className="border-t-[3px] border-[var(--flo)] pt-4">
              <h2 className="display text-[1.3rem]">{SITE.hiring.headline}</h2>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {SITE.hiring.roles.map((r) => (
                  <li
                    key={r}
                    className="ui border border-[var(--rule)] px-2 py-0.5 text-[0.75rem] text-[var(--ink-2)]"
                  >
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">
                {SITE.hiring.body}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="ui flex h-9 items-center bg-[var(--flo-deep)] px-3.5 text-[0.8125rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
                >
                  Email me
                </a>
                {SITE.cv && (
                  <a
                    href={SITE.cv}
                    className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
                  >
                    Download my CV
                  </a>
                )}
                {SITE.linkedin && (
                  <a
                    href={SITE.linkedin}
                    className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
                  >
                    LinkedIn
                  </a>
                )}
                <a
                  href={SITE.github}
                  className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
                >
                  GitHub
                </a>
              </div>
            </section>

            <dl className="mt-8 border-t border-[var(--rule)]">
              {[
                { k: 'Role', v: SITE.role },
                { k: 'Based', v: SITE.location },
                { k: 'Catalogued', v: `${COUNTS.builds} builds` },
                { k: 'Source public', v: `${COUNTS.source} builds` },
                { k: 'Live to open', v: `${COUNTS.live} builds` },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-2.5"
                >
                  <dt className="ui text-[0.75rem] text-[var(--ink-2)]">{row.k}</dt>
                  <dd className="text-right text-[0.9375rem]">{row.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* The key to the labels. It sits on the profile because it is a claim
          about how I describe my own work, not a property of any one build. */}
      <section aria-labelledby="status-key" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-10">
          <h2 id="status-key" className="display text-[length:var(--text-h2)]">
            What the labels mean
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            Every build carries one of these. Nothing here has been released to users,
            so no entry claims usage, revenue or measured outcomes.
          </p>
        </div>

        <dl className="mt-8 border-t border-[var(--rule)]">
          {(Object.keys(STATUS) as Status[]).map((s) => {
            const n = PROJECTS.filter((p) => p.status === s).length
            return (
              <div
                key={s}
                className="grid gap-2 border-b border-[var(--rule)] py-3.5 md:grid-cols-[12rem_1fr_4rem] md:items-baseline md:gap-6"
              >
                <dt>
                  <StatusTag status={s} size="md" />
                </dt>
                <dd className="text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                  {STATUS[s].blurb}
                </dd>
                <dd className="mono text-[length:var(--text-micro)] text-[var(--ink-2)] md:text-right">
                  {n} {n === 1 ? 'build' : 'builds'}
                </dd>
              </div>
            )
          })}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10">
        <h2 className="display border-t border-[var(--rule)] pt-10 text-[length:var(--text-h2)]">
          What the builds keep arguing
        </h2>

        <div className="mt-8 grid gap-px md:grid-cols-3">
          {PRINCIPLES.map((pr) => (
            <section key={pr.heading} className="border-t-[3px] border-[var(--flo)] pt-5 md:pr-8">
              <h3 className="display text-[1.3rem]">{pr.heading}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">{pr.body}</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {pr.cites.map((slug) => {
                  const p = PROJECTS.find((x) => x.slug === slug)
                  if (!p) return null
                  return (
                    <li key={slug}>
                      <Link
                        href={`/work/${slug}`}
                        className="ui text-[0.8125rem] underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:decoration-[var(--flo)] hover:text-[var(--flo-deep)]"
                      >
                        {p.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
