import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/data/site'
import { PROJECTS } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Profile',
  description: SITE.lede,
}

/** Three arguments the builds keep making, each cited from the builds themselves. */
const PRINCIPLES = [
  {
    heading: 'A record you can check',
    body: 'A log that flatters you is worth nothing. SETT ships with no streaks, badges or confetti and shows its reasoning for every suggested set. tbot throws out a strategy that peeked at tomorrow. Bob leaves every unverified regulation value blank rather than printing a plausible one.',
    cites: ['sett', 'tbot', 'bob'],
  },
  {
    heading: 'It works with the network off',
    body: 'Most of what I build runs on your own machine with your own keys, and keeps running when the connection does not. Quire is a full thesis canvas with no login and no cloud. The Deposit Ledger is one SQLite file. Shelf stores notes as plain Markdown so the library outlives the app that made it.',
    cites: ['quire', 'the-deposit-ledger', 'shelf'],
  },
  {
    heading: 'Enforced, not implied',
    body: 'A rule that lives only in the interface is a suggestion. Plave hides gift reservations from the list owner in the database with row-level security, not in the UI. Football Frenzy re-simulates every match server-side from a seed and a decision log, so fair play is structural rather than trusted.',
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
              I build things
              <br />
              and then I finish them.
            </h1>
            <div className="prose-body mt-8 text-[1.0625rem]">
              {SITE.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <aside className="lg:pt-3">
            <dl className="border-t border-[var(--rule)]">
              {[
                { k: 'Role', v: SITE.role },
                { k: 'Based', v: SITE.location },
                { k: 'Catalogued', v: `${PROJECTS.length} builds` },
                { k: 'Status', v: 'Taking client work' },
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

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${SITE.email}`}
                className="ui flex h-9 items-center bg-[var(--flo-deep)] px-3.5 text-[0.8125rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
              >
                Email me
              </a>
              <a
                href={SITE.github}
                className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
              >
                GitHub
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-10">
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
