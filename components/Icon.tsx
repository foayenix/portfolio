// A small set of line icons for the project pages, drawn on a 24px grid with
// one stroke weight so they read as one family. Inline SVG, no icon library:
// the set is small and fixed, and every icon inherits the ink around it.

const PATHS = {
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-6 8-6s8 2 8 6',
  paper: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
  highlight: 'M4 20h7M14.5 4.5l5 5L11 18H6v-5z',
  thread: 'M9 15 15 9M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7l-1.8 1.8M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  offline: 'M3 3l18 18M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 4-2.4M12 9.5a10 10 0 0 1 7 3.4M2 9.3a15 15 0 0 1 3.6-2.5M10.7 5.1A15 15 0 0 1 22 9.3M12 20h.01',
  lock: 'M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11',
  chat: 'M4 5h16v11H9l-5 4z',
  mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM6 11a6 6 0 0 0 12 0M12 17v4',
  camera: 'M4 8h3.5L9 5.5h6L16.5 8H20v11H4zM12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  archive: 'M3 4h18v4H3zM5 8v12h14V8M10 12h4',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6zM8.5 12l2.5 2.5 4.5-4.5',
  folder: 'M3 6h6l2 2h10v11H3z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM16 16l5 5',
  map: 'M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 6.5 16.5 10M16.6 12.5 9.4 17.8',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01',
  repeat: 'M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4',
  weight: 'M2 12h2M20 12h2M6 7v10M18 7v10M4 9v6M20 9v6M6 12h12',
  history: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 3',
  check: 'M4 12.5 9 17.5 20 6.5',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4M3 3l18 18',
  house: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6',
  coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15 8.5a3 3 0 0 0-5.5 1.5v6.5M8 16.5h8M8 12.5h5',
  ruler: 'M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2',
  report: 'M5 3h14v18H5zM9 15v2M12 11v6M15 8v9',
  blank: 'M4 4h16v16H4zM8 12h8',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  language: 'M4 5h8M8 3v2M5.5 5c.5 3 3 6 6 7M10.5 5c-.5 3-3 6-6.5 7M13 21l4-9 4 9M14.5 17.5h5',
} as const

export type IconName = keyof typeof PATHS

export default function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
