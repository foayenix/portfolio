import type { Metadata } from 'next'
import Link from 'next/link'
import { LEDGER, LEDGER_COUNTS, LEDGER_KINDS, LEDGER_ORDER } from '@/data/ledger'
import { COUNTS, WITHHELD, getProject } from '@/data/projects'
import StatusTag from '@/components/StatusTag'
import WithheldTag from '@/components/WithheldTag'

export const metadata: Metadata = {
  title: 'Ledger',
  description: `All ${LEDGER_COUNTS.repos} repositories on the account, read on 21 October 2026 and labelled for what each one actually is.`,
}

/**
 * The whole account, not the good half.
 *
 * The catalogue is a selection, and a selection can flatter by omission. This
 * page is the defence against that: every repository, in one table, with the
 * empty ones and the imports named as such. It is deliberately plainer than
 * the catalogue — a register, read down a column, with no card and no image.
 */
export default function LedgerPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <h1 className="display text-[length:var(--text-h1)]">
            Every repository,
            <br />
            including the empty ones.
          </h1>

          <div className="lg:pt-2">
            <p className="text-[length:var(--text-lede)] leading-[1.5]">
              All {LEDGER_COUNTS.repos} repositories on the account, read on 21 October 2026.
            </p>
            <p className="mt-4 max-w-[48ch] leading-[1.6] text-[var(--ink-2)]">
              The catalogue shows {COUNTS.builds} builds. This shows everything behind it, so
              you can see what was left out and why. {LEDGER_COUNTS.empty} repositories hold
              no files. {LEDGER_COUNTS.imported} hold code I did not write. The rest are
              either a build or an earlier run at one, and nothing is counted twice.
            </p>
          </div>
        </div>

        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--rule)] pt-4 sm:grid-cols-4">
          {LEDGER_ORDER.map((k) => (
            <div key={k}>
              <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">
                {LEDGER_KINDS[k].label}
              </dt>
              <dd className="display mt-1 text-[1.5rem]">{LEDGER_COUNTS[k]}</dd>
            </div>
          ))}
        </dl>
      </section>

      {LEDGER_ORDER.map((kind) => {
        const rows = LEDGER.filter((r) => r.kind === kind)
        if (rows.length === 0) return null

        return (
          <section key={kind} className="mx-auto max-w-[1440px] px-5 pb-14 md:px-10">
            <div className="border-t border-[var(--ink)] pt-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="display text-[1.4rem]">{LEDGER_KINDS[kind].label}</h2>
                <span className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">
                  {rows.length}
                </span>
              </div>
              <p className="mt-1.5 max-w-[62ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                {LEDGER_KINDS[kind].blurb}
              </p>
            </div>

            <ul className="mt-4 border-t border-[var(--rule)]">
              {rows.map((row) => {
                const project = row.slug ? getProject(row.slug) : undefined
                // A repository is named here whatever it holds, because that is
                // what a complete ledger is. It is only linked where opening it
                // publishes nothing that belongs to anybody else.
                const open = !row.private && !project?.withheld

                return (
                  <li
                    key={row.repo}
                    className="grid grid-cols-1 gap-x-6 gap-y-1.5 border-b border-[var(--rule)] py-3.5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-baseline"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      {!open ? (
                        <span className="ui text-[0.9375rem]">{row.repo}</span>
                      ) : (
                        <a
                          href={`https://github.com/foayenix/${row.repo}`}
                          className="ui text-[0.9375rem] underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:decoration-[var(--flo)] hover:text-[var(--flo-deep)]"
                        >
                          {row.repo}
                        </a>
                      )}

                      {row.private && (
                        <span className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">
                          private
                        </span>
                      )}
                      {!row.private && project?.withheld && <WithheldTag />}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                        {row.note}
                      </p>

                      {project && (
                        <p className="mt-1.5 flex flex-wrap items-center gap-2">
                          <Link
                            href={`/work/${project.slug}`}
                            className="ui text-[0.8125rem] underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:decoration-[var(--flo)] hover:text-[var(--flo-deep)]"
                          >
                            {project.name}
                          </Link>
                          <StatusTag status={project.status} />
                          {project.withheld && <WithheldTag />}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10">
        <div className="max-w-[62ch] space-y-3 border-t border-[var(--rule)] pt-4 text-[0.9375rem] leading-[1.7] text-[var(--ink-2)]">
          <p>
            A private repository is named here but not linked, because the link would
            only return a 404 for you. Where a build is private, its catalogue entry
            says what cannot be checked from outside and offers a walkthrough instead.
          </p>
          <p>
            {COUNTS.withheld} public repositories are named and not linked either, which is a
            different thing. {WITHHELD.blurb} They are invitations and an itinerary: real
            names, a venue, a guest list, five dated days. Listing them is a record of what
            I built. Linking them would hand you somebody else&rsquo;s evening.
          </p>
        </div>
      </section>
    </>
  )
}
