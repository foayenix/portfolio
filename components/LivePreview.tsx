'use client'

import { useState } from 'react'
import Icon from '@/components/Icon'

type Device = 'desktop' | 'phone'

/**
 * The live build, inside the page, in a browser frame. Nothing loads until the
 * visitor asks for it: a page view never runs someone else's app, and a slow
 * app never slows this page. The new-tab link is always there, because a site
 * can refuse to be framed and a frame is never the whole experience.
 */
export default function LivePreview({ name, url }: { name: string; url: string }) {
  const [loaded, setLoaded] = useState(false)
  const [device, setDevice] = useState<Device>('desktop')
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <section aria-labelledby="try-it" className="mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="border-t border-[var(--rule)] pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="try-it" className="display text-[length:var(--text-h2)]">
              Try it
            </h2>
            <p className="mt-2 text-[1rem] text-[var(--ink-2)]">
              The real {name}, running live. Click around: nothing here is a mock-up.
            </p>
          </div>

          {/* A phone frame needs room beside it to mean anything, so the
              switch only appears where there is room. */}
          <div role="group" aria-label="Preview size" className="ui hidden gap-1 md:flex">
            {(['desktop', 'phone'] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
                className={`h-9 px-3.5 text-[0.8125rem] capitalize transition-colors ${
                  device === d
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'border border-[var(--rule)] hover:border-[var(--ink)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`mx-auto mt-6 overflow-hidden border border-[var(--ink)] bg-[var(--paper-hi)] transition-[max-width] duration-300 ${
            device === 'phone' ? 'max-w-[390px] rounded-[28px]' : 'max-w-full'
          }`}
        >
          {/* Browser chrome: enough to say "this is a website", no more. */}
          <div className="flex items-center gap-3 border-b border-[var(--rule)] px-4 py-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--rule)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--rule)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--rule)]" />
            </span>
            <span className="mono min-w-0 flex-1 truncate bg-[var(--paper)] px-3 py-1 text-[0.75rem] text-[var(--ink-2)]">
              {host}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ui shrink-0 text-[0.8125rem] text-[var(--flo-deep)] hover:underline"
            >
              New tab ↗
            </a>
          </div>

          {/* The frame only takes the full height once there is something in
              it; until then it is a poster, not an empty box. */}
          <div
            className={
              !loaded
                ? 'h-[300px] md:h-[380px]'
                : device === 'phone'
                  ? 'h-[720px]'
                  : 'h-[min(78vh,760px)] min-h-[480px]'
            }
          >
            {loaded ? (
              <iframe
                src={url}
                title={`${name}, live`}
                className="h-full w-full bg-white"
                loading="lazy"
                allow="clipboard-write; fullscreen"
              />
            ) : (
              <>
                {/* A whole app inside a phone-width page is cramped and traps
                    the scroll, so on a phone the poster opens it properly. */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center md:hidden"
                >
                  <Poster name={name} verb="Open" note="It opens in a new tab." />
                </a>
                <button
                  type="button"
                  onClick={() => setLoaded(true)}
                  className="group hidden h-full w-full flex-col items-center justify-center gap-4 px-6 text-center md:flex"
                >
                  <Poster
                    name={name}
                    verb="Load"
                    suffix=" here"
                    note="It runs inside this page. For the full experience, open it in a new tab."
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {loaded && (
          <p className="mt-3 text-center text-[0.875rem] text-[var(--ink-2)]">
            Blank frame? Some sites will not run inside another page.{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-[var(--flo-deep)] underline">
              Open {name} in a new tab
            </a>
            .
          </p>
        )}
      </div>
    </section>
  )
}

function Poster({
  name,
  verb,
  suffix = '',
  note,
}: {
  name: string
  verb: string
  suffix?: string
  note: string
}) {
  return (
    <>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--flo-deep)] text-[var(--on-flo)] transition-transform group-hover:scale-105">
        <Icon name="arrow" size={28} />
      </span>
      <span className="display text-[1.5rem]">
        {verb} {name}
        {suffix}
      </span>
      <span className="max-w-[40ch] text-[0.9375rem] text-[var(--ink-2)]">{note}</span>
    </>
  )
}
