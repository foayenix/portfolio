import { WITHHELD } from '@/data/projects'

/**
 * Marks a finished build whose link is withheld because the page is somebody
 * else's.
 *
 * It sits beside the status tag rather than replacing it, because the two say
 * different things: the status is how far the build got, and this is why you
 * still cannot open it. The border is dashed and the ink is neutral — a
 * withheld link is a decision, not an achievement and not a failure, and
 * inking it like either would be the wrong claim.
 */
export default function WithheldTag({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const pad = size === 'md' ? 'px-2 py-0.5 text-[0.75rem]' : 'px-1.5 py-0.5 text-[0.6875rem]'

  return (
    <span
      title={WITHHELD.blurb}
      className={`ui inline-block whitespace-nowrap border border-dashed border-[var(--rule)] text-[var(--ink-2)] ${pad}`}
    >
      {WITHHELD.label}
    </span>
  )
}
