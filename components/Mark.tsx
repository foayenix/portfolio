/**
 * The registration target: two plates, one navy, one fluorescent, offset by
 * the amount a real press would miss by. It appears exactly once per page, in
 * the wordmark.
 */
export default function Mark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block h-[11px] w-[11px] shrink-0 ${className}`}
    >
      <span className="absolute left-0 top-0 h-[8px] w-[8px] bg-[var(--ink)]" />
      <span className="absolute left-[3px] top-[3px] h-[8px] w-[8px] bg-[var(--flo)] mix-blend-multiply dark:mix-blend-screen" />
    </span>
  )
}
