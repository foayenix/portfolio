import Link from 'next/link'
import { SITE } from '@/data/site'
import { COUNTS, FLAGSHIPS } from '@/data/projects'
import { DECIDED, PORTRAIT, SURFACES, inWords } from '@/data/portrait'
import Catalogue from '@/components/Catalogue'
import StatusTag from '@/components/StatusTag'

export default function Home() {
  return (
    <>
      {/* Say what the builds are, then show the three best ones.
          
          This has been wrong twice. It opened with a job title, which is a
          claim a reader has to take on trust. Then it opened with the pattern
          the builds share, which is true and needs a paragraph of decoding
          before it means anything. A reader landing here wants to know what
          I make, in words that need no unpacking, and then wants to look at
          some. The pattern is still on the page; it reads better as the thing
          you notice after the three than as the thing you are asked to take
          on faith before them. */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">{SITE.role}</p>
            {/* A full sentence rather than three words, so it is set a step
                down from the site's largest display size. At --text-h1 it runs
                to five lines and pushes the three builds below the fold, which
                defeats the point of saying what I build and then showing it. */}
            <h1 className="display mt-4 text-[clamp(2.25rem,1rem+3.4vw,3.75rem)] leading-[1.08]">
              I build AI agents, local-first apps, and the software a business runs on.
            </h1>
          </div>

          <div className="lg:pt-2">
            <p className="text-[length:var(--text-lede)] leading-[1.5]">{SITE.lede}</p>
            <p className="mt-4 max-w-[48ch] leading-[1.6] text-[var(--ink-2)]">
              {PORTRAIT.builds} of them, in {PORTRAIT.technologies} named technologies: web, iOS, Flutter, a Rust
              desktop app, a WhatsApp agent, a bedside clock. Start with the three below. They are
              written up in full, and each one opens with a diagram of what it is made of.
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

      {/* Three to read first, so nobody has to guess which of thirty is worth
          their five minutes. */}
      <section aria-labelledby="start-here" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-10">
          <h2 id="start-here" className="display text-[length:var(--text-h2)]">
            Start with these three.
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            Each is written up in full: the problem, the part that was hard, the architecture
            decision and what it cost, and how to check every claim on the page.
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

      {/* What the three have in common, once you have looked at them. Every
          row names the build the decision was taken in and links to it,
          because a pattern asserted is worth nothing and a pattern you can
          check is the whole argument. */}
      <section aria-labelledby="pattern" className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[var(--rule)] pt-10">
          <h2 id="pattern" className="display text-[length:var(--text-h2)]">
            The same decision, {inWords(PORTRAIT.decisions)} times.
          </h2>
          <p className="max-w-[44ch] text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
            These {PORTRAIT.decisions} builds have nothing else in common: a training log, a backtester, a
            stock system, a bedside clock. In each one the software declines to tell its user what
            they would rather hear. Every line below names the mechanism that does it, so you can
            open the build and check rather than take my word for it.
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
