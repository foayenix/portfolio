import Icon from '@/components/Icon'
import type { Story } from '@/data/projects'

/**
 * A build explained as a picture: who it is for, life before and after it,
 * how it works in a few steps, and what it promises. Written for a reader who
 * will never open the source, so the page shows rather than tells.
 */
export default function StoryVisual({ name, story }: { name: string; story: Story }) {
  const { forWho, before, after, steps, promises } = story

  return (
    <section aria-labelledby="at-a-glance" className="mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="border-t border-[var(--rule)] pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="at-a-glance" className="display text-[length:var(--text-h2)]">
            At a glance
          </h2>
          <p className="ui flex items-center gap-2.5 border border-[var(--ink)] px-3.5 py-2 text-[0.9375rem]">
            <Icon name="person" size={20} className="text-[var(--flo-deep)]" />
            <span>
              <span className="text-[var(--ink-2)]">For </span>
              {forWho}
            </span>
          </p>
        </div>

        {before && after && (
          <div className="mt-8 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-5">
            <div className="bg-[var(--paper-lo)] p-6 md:p-8">
              <p className="ui text-[length:var(--text-micro)] text-[var(--ink-2)]">
                Before
              </p>
              <p className="prose-body mt-3 text-[1.1875rem] leading-[1.5] text-[var(--ink-2)]">
                {before}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-[var(--flo-deep)] max-md:rotate-90"
            >
              <Icon name="arrow" size={36} />
            </div>
            <div className="border-[3px] border-[var(--flo)] bg-[var(--paper-hi)] p-6 md:p-8">
              <p className="ui text-[length:var(--text-micro)] text-[var(--flo-deep)]">
                With {name}
              </p>
              <p className="prose-body mt-3 text-[1.1875rem] leading-[1.5]">{after}</p>
            </div>
          </div>
        )}

        <h3 className="ui mt-12 text-[length:var(--text-micro)] text-[var(--ink-2)]">
          How it works
        </h3>
        <ol
          className={`mt-5 grid gap-y-8 md:gap-x-0 ${
            steps.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
          }`}
        >
          {steps.map((s, n) => (
            <li key={s.title} className="relative flex gap-5 md:block md:pr-8">
              {/* The line joining one step to the next: down the page on a
                  phone, across it on anything wider. */}
              {n < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-14 h-[calc(100%-1.5rem)] w-px bg-[var(--rule)] md:left-14 md:top-7 md:h-px md:w-[calc(100%-3.5rem)]"
                />
              )}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--paper)]">
                <Icon name={s.icon} size={26} />
                <span className="mono absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--flo-deep)] text-[0.6875rem] text-[var(--on-flo)]">
                  {n + 1}
                </span>
              </div>
              <div className="md:mt-5">
                <p className="display text-[1.25rem] leading-tight">{s.title}</p>
                <p className="mt-2 text-[1rem] leading-[1.55] text-[var(--ink-2)]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {promises && promises.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2.5">
            {promises.map((p) => (
              <li
                key={p.text}
                className="ui flex items-center gap-2 bg-[var(--paper-hi)] px-3.5 py-2.5 text-[0.9375rem]"
              >
                <Icon name={p.icon} size={20} className="text-[var(--flo-deep)]" />
                {p.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
