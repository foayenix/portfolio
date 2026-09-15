import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <h1 className="display text-[length:var(--text-h1)]">Nothing is printed here.</h1>
      <p className="prose-body mt-5 text-[length:var(--text-lede)] text-[var(--ink-2)]">
        That page does not exist. Try the catalogue.
      </p>
      <Link
        href="/"
        className="ui mt-8 inline-flex h-10 items-center bg-[var(--flo-deep)] px-4 text-[0.875rem] font-medium text-[var(--on-flo)] transition-opacity hover:opacity-90"
      >
        Go to the index
      </Link>
    </section>
  )
}
