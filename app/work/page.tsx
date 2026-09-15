import type { Metadata } from 'next'
import WorkGrid from '@/components/WorkGrid'
import { PROJECTS } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: `${PROJECTS.length} finished builds across web, mobile, AI, games, tooling and client work.`,
}

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 md:px-10 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <h1 className="display text-[length:var(--text-h1)]">
            The work,
            <br />
            sorted by kind.
          </h1>
          <p className="max-w-[46ch] text-[length:var(--text-lede)] leading-[1.5] lg:pt-2">
            Filter down to what you came for. Every entry names the stack it actually
            uses and links to the source where the source is public.
          </p>
        </div>
      </section>

      <WorkGrid />
    </>
  )
}
