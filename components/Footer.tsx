import Link from 'next/link'
import { SITE } from '@/data/site'
import { COUNTS } from '@/data/projects'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 border-b border-[var(--rule)] py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <p className="display text-[length:var(--text-h3)] md:text-[2rem]">
              {SITE.hiring.headline}
            </p>
            <p className="prose-body mt-3 text-[var(--ink-2)]">
              {SITE.hiring.roles.join(' · ')}. Tell me what you need built and roughly
              when you need it. I reply within a day.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="ui flex h-10 items-center bg-[var(--flo-deep)] px-4 text-[0.875rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="ui flex h-10 items-center border border-[var(--rule)] px-4 text-[0.875rem] transition-colors hover:border-[var(--flo)]"
              >
                {SITE.phone}
              </a>
            </div>
          </div>

          <nav aria-label="Site">
            <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Pages</h2>
            <ul className="mt-3 space-y-1.5">
              {[
                { href: '/', label: 'Index' },
                { href: '/work', label: 'Work' },
                { href: '/profile', label: 'Profile' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--ink-2)] hover:text-[var(--flo-deep)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">Elsewhere</h2>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href={SITE.github} className="text-[var(--ink-2)] hover:text-[var(--flo-deep)]">
                  GitHub
                </a>
              </li>
              {SITE.linkedin && (
                <li>
                  <a href={SITE.linkedin} className="text-[var(--ink-2)] hover:text-[var(--flo-deep)]">
                    LinkedIn
                  </a>
                </li>
              )}
              {SITE.cv && (
                <li>
                  <a href={SITE.cv} className="text-[var(--ink-2)] hover:text-[var(--flo-deep)]">
                    CV
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${SITE.email}`} className="text-[var(--ink-2)] hover:text-[var(--flo-deep)]">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 py-6">
          <p className="mono text-[length:var(--text-micro)] text-[var(--ink-2)]">
            {COUNTS.builds} builds catalogued, {COUNTS.source} with public source, {SITE.location}
          </p>
          <p className="mono text-[length:var(--text-micro)] text-[var(--ink-2)]">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
