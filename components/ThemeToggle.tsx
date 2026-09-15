'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      return
    }
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  function flip() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode — the choice just does not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={theme === 'dark' ? 'Use the light press' : 'Use the dark press'}
      className="ui flex h-8 items-center gap-2 border border-[var(--rule)] px-2.5 text-[length:var(--text-micro)] text-[var(--ink-2)] transition-colors hover:border-[var(--flo)] hover:text-[var(--ink)]"
    >
      <span className="relative block h-[10px] w-[10px] rounded-full border border-current">
        <span className="absolute inset-0 rounded-full bg-current [clip-path:inset(0_50%_0_0)]" />
      </span>
      <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
