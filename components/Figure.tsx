'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * An Anatomy figure, embedded from public/figures/.
 *
 * The figures are self-contained pages rather than React components: the kit
 * that draws them writes SVG strings and drives them with its own loop, and
 * porting that into the render tree would buy nothing a visitor can see. They
 * are framed instead, which also keeps their stylesheet off every other page.
 *
 * Two files are built per figure, one per theme, because the drawing's tones
 * are baked into it. This component picks the file that matches the ink around
 * it and re-picks when the toggle in the nav changes it. Before the theme is
 * known nothing is loaded, so the frame never flashes the wrong one.
 *
 * It only loads once it is near the viewport: a figure is a page of its own,
 * and a visitor who never scrolls to it should not pay for it.
 */
export default function Figure({
  name,
  alt,
}: {
  /** The basename in public/figures, without the theme suffix. */
  name: string
  /** What the figure shows, for anyone who cannot see it. */
  alt: string
}) {
  const frame = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const read = (): 'dark' | 'light' => {
      const set = document.documentElement.getAttribute('data-theme')
      if (set === 'dark' || set === 'light') return set
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    setTheme(read())

    // The nav's toggle writes data-theme on <html>; follow it.
    const observer = new MutationObserver(() => setTheme(read()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // And follow the system, for anyone who has never touched the toggle.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onMedia = () => setTheme(read())
    media.addEventListener('change', onMedia)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', onMedia)
    }
  }, [])

  useEffect(() => {
    const node = frame.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const src = theme === 'light' ? `/figures/${name}-light.html` : `/figures/${name}.html`

  return (
    <div ref={frame} className="not-prose">
      <div className="relative w-full overflow-hidden border border-[var(--rule)]" style={{ aspectRatio: '820 / 470' }}>
        {near && theme ? (
          <iframe
            key={theme}
            src={src}
            title={alt}
            loading="lazy"
            scrolling="no"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        ) : (
          <div className="absolute inset-0" aria-hidden />
        )}
      </div>
      <p className="sr-only">{alt}</p>
    </div>
  )
}
