'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE } from '@/data/site'
import Mark from './Mark'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Work' },
  { href: '/profile', label: 'Profile' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_oklab,var(--paper)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <Link href="/" className="ui flex items-center gap-2.5 text-[0.9375rem] tracking-tight">
          <Mark />
          <span className="font-semibold">{SITE.name}</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`ui relative px-2.5 py-1 text-[0.8125rem] transition-colors sm:px-3 ${
                  active ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-2.5 -bottom-px h-[2px] bg-[var(--flo)] sm:inset-x-3" />
                )}
              </Link>
            )
          })}

          <span className="mx-1 hidden h-4 w-px bg-[var(--rule)] sm:block" />
          <ThemeToggle />

          <a
            href={`mailto:${SITE.email}`}
            className="ui ml-1 hidden h-8 items-center bg-[var(--flo-deep)] px-3.5 text-[0.8125rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90 sm:flex"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  )
}
