import { STATUS, type Status } from '@/data/projects'

/**
 * How far a build got, said in one word wherever the build is named.
 *
 * The second plate is spent on `live` alone, because that is the only status a
 * visitor can act on without asking me for anything. Every other status is set
 * in neutral ink: they are facts, not failures, and inking them differently
 * would turn the scale into a ranking.
 */
export default function StatusTag({
  status,
  size = 'sm',
}: {
  status: Status
  size?: 'sm' | 'md'
}) {
  const live = status === 'live'
  const pad = size === 'md' ? 'px-2 py-0.5 text-[0.75rem]' : 'px-1.5 py-0.5 text-[0.6875rem]'

  return (
    <span
      className={`ui inline-block whitespace-nowrap ${pad} ${
        live
          ? 'bg-[var(--flo-deep)] text-[var(--on-flo)]'
          : 'border border-[var(--rule)] text-[var(--ink-2)]'
      }`}
    >
      {STATUS[status].label}
    </span>
  )
}
