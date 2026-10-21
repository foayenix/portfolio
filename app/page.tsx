import Link from 'next/link'
import { SITE } from '@/data/site'
import { COUNTS, FLAGSHIPS } from '@/data/projects'
import { DECIDED, PORTRAIT, SURFACES, inWords } from '@/data/portrait'
import Catalogue from '@/components/Catalogue'
import StatusTag from '@/components/StatusTag'

export default function Home() {
  return (
    <>
      {/* The hero used to open with a job title, which is a claim a reader
          has to take or leave, sitting above a catalogue perfectly able to
          make the argument itself. It opens instead with the one thing the
          builds have in common, and every line of it links to the build it
          was found in. The title stays, demoted to a label, because it is
          still how somebody searches. */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">{SITE.role}</p>
            <h1 className="display mt-4 text-[length:var(--text-h1)]">
              The same decision,
              <br />
              taken {inWords(PORTRAIT.decisions)} times.
            </h1>
          </div>

          <div className="lg:pt-2">
            <p className="text-[length:var(--text-lede)] leading-[1.5]">
              Across {PORTRAIT.builds} builds and {PORTRAIT.technologies} named technologies &mdash;
              web, iOS, Flutter, a Rust desktop app, a WhatsApp agent, a bedside clock &mdash; the
              same decision keeps getting taken: the software declines to tell its user what they
              would rather hear.
            </p>
            <p className="mt-4 max-w-[46ch] leading-[1.6] text-[var(--ink-2)]">
              {SITE.lede}
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-3 border-t border-[var(--rule)] pt-4">
              {[
                { k: 'Builds', v: COUNTS.builds },
                { k: 'Public source', v: COUNTS.source },
                { k: 'Live to open', v: COUNTS.live },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">{s.k}</dt>
                  <dd className="display mt-1 text-[1.5rem]">{s.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${SITE.email}`}
                className="ui flex h-9 items-center bg-[var(--flo-deep)] px-3.5 text-[0.8125rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
              <Link
                href="/profile"
                className="ui flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo)] hover:text-[var(--flo-deep)]"
              >
                What I&rsquo;m looking for
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The evidence for the sentence above it. Every row names the build the
          decision was taken in and links to it, because a pattern asserted is
          worth nothing and a pattern you can check is the whole argument. */}
      <section aria-labelledby="pattern" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-10">
          <h2 id="pattern" className="display text-[length:var(--text-h2)]">
            Where that shows up.
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            {PORTRAIT.decisions} builds with nothing else in common &mdash; a training log, a
            backtester, a stock system, a bedside clock. Each line is a mechanism in that build,
            not a theme read into it afterwards. Open any of them and check.
          </p>
        </div>

        <ul className="mt-8 grid border-t border-[var(--rule)] md:grid-cols-2 md:gap-x-12">
          {DECIDED.map(({ slug, decision, project }) => (
            <li key={slug} className="border-b border-[var(--rule)]">
              <Link href={`/work/${slug}`} className="group flex gap-4 py-4">
                <span className="mono w-[7.5rem] shrink-0 text-[length:var(--text-micro)] leading-[1.7] text-[var(--ink-2)] transition-colors group-hover:text-[var(--flo-deep)]">
                  {project.name}
                </span>
                <span className="text-[0.9375rem] leading-[1.65]">{decision}</span>
              </Link>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            { k: 'Builds', v: String(PORTRAIT.builds) },
            { k: 'Technologies', v: String(PORTRAIT.technologies) },
            { k: 'Kinds of work', v: String(PORTRAIT.domains) },
            { k: 'Years', v: `${PORTRAIT.from}\u2013${PORTRAIT.to}` },
          ].map((s) => (
            <div key={s.k}>
              <dt className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">{s.k}</dt>
              <dd className="display mt-1 text-[1.5rem]">{s.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mono mt-6 text-[length:var(--text-micro)] leading-[1.9] text-[var(--ink-2)]">
          {SURFACES.map((s) => `${s.surface} ${s.builds}`).join('  /  ')}
        </p>
        <p className="mt-2 max-w-[62ch] text-[0.8125rem] leading-[1.6] text-[var(--ink-2)]">
          Every figure on this page is counted from the catalogue when the site is built, never
          typed in. The line above counts a build only where it named the thing in its own stack,
          so each number is a floor rather than a census.
        </p>
      </section>

      {/* Three to read first, so nobody has to guess which of thirty is worth
          their five minutes. */}
      <section aria-labelledby="start-here" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-10">
          <h2 id="start-here" className="display text-[length:var(--text-h2)]">
            Start with these three.
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            Each one is written up as a case study: the problem, the part that was hard,
            the architecture decision and what it cost, and how to check the claims.
          </p>
        </div>

        <div className="mt-8 grid gap-px md:grid-cols-3">
          {FLAGSHIPS.map((p) => (
            <article key={p.slug} className="border-t-[3px] border-[var(--flo)] pt-5 md:pr-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="display text-[1.5rem]">{p.name}</h3>
                <StatusTag status={p.status} />
              </div>

              <p className="mt-3 text-[0.9375rem] leading-[1.65]">{p.oneLiner}</p>

              {p.caseStudy && (
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-[var(--ink-2)]">
                  {p.caseStudy.hard}
                </p>
              )}

              <p className="mono mt-4 text-[length:var(--text-micro)] leading-[1.8] text-[var(--ink-2)]">
                {p.stack.slice(0, 4).join('  /  ')}
                {p.stack.length > 4 && ` / +${p.stack.length - 4}`}
              </p>

              <Link
                href={`/work/${p.slug}`}
                className="ui mt-5 inline-flex h-9 items-center border border-[var(--ink)] px-3.5 text-[0.8125rem] transition-colors hover:border-[var(--flo-deep)] hover:bg-[var(--flo-deep)] hover:text-[var(--on-flo)]"
              >
                Read the case study
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="catalogue" className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 id="catalogue" className="display text-[length:var(--text-h2)]">
            Everything else, in one list.
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            Move down the list to read each one. Or{' '}
            <Link
              href="/work"
              className="text-[var(--ink)] underline decoration-[var(--flo)] decoration-2 underline-offset-4 hover:text-[var(--flo-deep)]"
            >
              browse the work by what it is
            </Link>
            .
          </p>
        </div>

        <div className="mt-8">
          <Catalogue />
        </div>
      </section>
    </>
  )
}
