import { PROJECTS } from './projects'

// What the builds say about the person who made them, computed from the
// builds rather than asserted above them.
//
// The hero used to open with a job title. A title is a claim a reader has to
// take or leave, and it sits above a catalogue perfectly capable of making the
// argument itself. Everything in this file is either counted from
// data/projects.ts at build time, or a restatement of something a specific
// entry's own `signature` already establishes, and in that case it carries
// the slug, so the claim is one click from its evidence.
//
// Nothing here is hand-typed that could be counted. A number in the hero that
// disagrees with the catalogue would be the exact failure this site is built
// to avoid.

/**
 * One decision, and the build it was taken in.
 *
 * These are not themes read into the work after the fact. Each is a concrete
 * mechanism described in that entry's `signature`: a guard, a predicate, a
 * blank left blank, a button not built. They are listed because the same
 * decision recurring across twelve unrelated builds (a training log, a
 * backtester, a stock system, a bedside clock) is a fact about how somebody
 * works. A job title is not.
 */
export type Decision = {
  /** The build it is taken in. Must exist in data/projects.ts. */
  slug: string
  /** The decision, in one line. Restates that entry's signature, never adds to it. */
  decision: string
}

export const DECISIONS: Decision[] = [
  { slug: 'sett', decision: 'A training log with no streaks, no badges and no confetti.' },
  { slug: 'tbot', decision: 'A backtester with an explicit lookahead guard, so a strategy that peeked at tomorrow is thrown out.' },
  { slug: 'ybs', decision: 'A stock system whose phones are never sent the figure a count would otherwise be made to agree with.' },
  { slug: 'pank', decision: 'A money plan in which no model produces any amount and no model produces any date.' },
  { slug: 'proper', decision: 'A repository scanner whose explanation layer is fenced off from the findings underneath it.' },
  { slug: 'sanko', decision: 'An evaluation set that makes no model call until a practitioner has approved a hundred cases.' },
  { slug: 'bob', decision: 'A compliance engine that leaves a regulation value blank rather than guess it.' },
  { slug: 'plave', decision: 'A gift list that hides reservations from its own owner, in the database rather than in the interface.' },
  { slug: 'jibewa', decision: 'A clock whose GPU path is an enhancement, so it still tells the time when the GPU is gone.' },
  { slug: 'dansville-accessories', decision: 'A shop admin with no refund button, because the money and the evidence already live in Stripe.' },
  { slug: 'cork-podcast-studio', decision: 'A studio assistant that turns a question it cannot source into a staff enquiry instead of an answer.' },
  { slug: 'fathom', decision: 'A comprehension gauge instructed to judge honestly and never to flatter.' },
]

// A decision has to point at a build that exists, or the hero is decoration.
// Checked at module load, so a renamed slug fails the build rather than
// rendering a dead link under a claim about rigour.
{
  const slugs = new Set(PROJECTS.map((p) => p.slug))
  for (const { slug } of DECISIONS) {
    if (!slugs.has(slug)) {
      throw new Error(`data/portrait.ts: no build named "${slug}"`)
    }
  }
}

export const DECIDED = DECISIONS.map((d) => ({
  ...d,
  project: PROJECTS.find((p) => p.slug === d.slug)!,
}))

/**
 * What the builds are made of, counted from the stack each one declares.
 *
 * Matched on whole stack entries, never on substrings. The first version of
 * this matched substrings and reported two hardware builds, because one
 * invitation is served by Caddy and "Caddy" contains "CAD"; it also counted a
 * curriculum as graphics work, because "design canvas" contains "Canvas". A
 * figure in a hero that nobody checks is worth less than no figure, so every
 * list below is spelled out and every entry in it appears verbatim in some
 * build's `stack`.
 *
 * These are floors rather than a census: a build is counted here only where it
 * named the thing in its own stack.
 */
const BUILT_WITH: { label: string; entries: string[] }[] = [
  {
    label: 'Web',
    entries: [
      'Next.js', 'Next.js 14', 'Next.js 15', 'Next.js 16',
      'React', 'React 18', 'React 19',
      'Vite', 'Express', 'Express 5',
      'HTML', 'standalone HTML',
    ],
  },
  { label: 'iOS', entries: ['Swift', 'SwiftUI', 'iOS 17+', 'WidgetKit', 'watchOS', 'XcodeGen', 'Share Extension', 'Screen Time'] },
  { label: 'Flutter', entries: ['Flutter', 'Riverpod', 'Drift', 'go_router', 'home_widget', 'Hive'] },
  { label: 'Python', entries: ['Python', 'Python 3.12', 'FastAPI', 'SQLAlchemy', 'vectorised backtester'] },
  { label: 'Graphics and GPU', entries: ['WebGL2', 'HTML Canvas', 'Canvas 2D', 'TFLite', 'Stability AI'] },
  { label: 'Desktop', entries: ['Tauri 2', 'Rust', 'rusqlite'] },
  { label: 'WhatsApp', entries: ['WhatsApp Cloud API'] },
  { label: 'Hardware', entries: ['Raspberry Pi 5', 'CAD'] },
]

// Every marker has to be a stack entry that actually exists, or the list is
// quietly wrong rather than loudly wrong.
{
  const vocabulary = new Set(PROJECTS.flatMap((p) => p.stack))
  for (const { label, entries } of BUILT_WITH) {
    const absent = entries.filter((entry) => !vocabulary.has(entry))
    if (absent.length > 0) {
      throw new Error(`data/portrait.ts: ${label} names stack entries no build declares: ${absent.join(', ')}`)
    }
  }
}

export const SURFACES = BUILT_WITH.map(({ label, entries }) => ({
  surface: label,
  builds: PROJECTS.filter((p) => p.stack.some((entry) => entries.includes(entry))).length,
})).filter((s) => s.builds > 0)

const YEARS = PROJECTS.map((p) => p.year)

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty',
]

/**
 * A small count, spelled. The headline is a sentence, and a numeral in it
 * reads as a statistic rather than as something somebody is saying. Anything
 * past twenty falls back to the numeral, where a word would be worse.
 */
export const inWords = (n: number) => WORDS[n] ?? String(n)

/** Figures for the hero. Every one is counted here, never typed. */
export const PORTRAIT = {
  builds: PROJECTS.length,
  /** Distinct named technologies across every build's stack. */
  technologies: new Set(PROJECTS.flatMap((p) => p.stack)).size,
  /** Distinct kinds of work, from the tags the catalogue filters on. */
  domains: new Set(PROJECTS.flatMap((p) => p.tags)).size,
  surfaces: SURFACES.length,
  decisions: DECISIONS.length,
  caseStudies: PROJECTS.filter((p) => p.caseStudy).length,
  from: Math.min(...YEARS),
  to: Math.max(...YEARS),
}
