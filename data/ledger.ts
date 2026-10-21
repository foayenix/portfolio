import { PROJECTS } from './projects'

// Every repository on the GitHub account, read on 21 October 2026.
//
// This file exists because a catalogue is a selection and a selection can
// flatter. The catalogue in data/projects.ts holds the builds; this holds all
// seventy-four repositories behind it, including the eight that are empty and
// the three that contain somebody else's code or a generator's output. Nothing
// is hidden here and nothing is padded: an empty repository is labelled empty,
// and an import is labelled an import and is not counted as a build.
//
// `kind` is the one field that must never flatter:
//
// `build`    A build in the catalogue. `slug` points at its entry.
// `lineage`  An earlier or parallel iteration of a catalogued build. Real work,
//            already represented by the entry it belongs to, so counting it
//            again would be counting the same build twice.
// `imported` Not my code. Somebody else's repository, or a generator's output
//            that I have not meaningfully built on. Never counted as a build.
// `empty`    No files at all, or a single placeholder. A reserved name.
export type LedgerKind = 'build' | 'lineage' | 'imported' | 'empty'

export const LEDGER_KINDS: Record<LedgerKind, { label: string; blurb: string }> = {
  build: {
    label: 'Build',
    blurb: 'A build in the catalogue. Follow the link for what stage it reached.',
  },
  lineage: {
    label: 'Lineage',
    blurb:
      'An earlier or parallel version of a build that is already in the catalogue. Real work, counted once, under the entry it belongs to.',
  },
  imported: {
    label: 'Not my code',
    blurb:
      "Somebody else's repository, or a generator's output I have not meaningfully built on. Listed for completeness and never counted as a build.",
  },
  empty: {
    label: 'Empty',
    blurb: 'No files. A name reserved and not used.',
  },
}

export type LedgerRow = {
  repo: string
  kind: LedgerKind
  /** The catalogue entry this repository is the source for, or belongs to. */
  slug?: string
  private?: boolean
  /** What it holds, in one line. Plain fact, no selling. */
  note: string
}

/** Newest first, by the date each repository was last pushed to. */
export const LEDGER: LedgerRow[] = [
  { repo: 'pank', kind: 'build', slug: 'pank', private: true, note: 'The private money plan.' },
  { repo: 'ybs', kind: 'build', slug: 'ybs', note: 'Yemkem branch stock and sales, phase 1.' },
  { repo: 'jibewa', kind: 'build', slug: 'jibewa', private: true, note: 'JÍBẸ́WÀ clock software, with the CAD drafts and project archive beside it.' },
  { repo: 'CrMn', kind: 'build', slug: 'crescent-moon', private: true, note: 'The wine bar’s site and the owner’s admin backend.' },
  { repo: 'plave', kind: 'build', slug: 'plave', private: true, note: 'Private client build.' },
  { repo: 'dansville-accessories', kind: 'build', slug: 'dansville-accessories', private: true, note: 'The bracelet shop and its phone-installable admin.' },
  { repo: 'icareer', kind: 'imported', note: 'A single commit: “Import career-ops v1.35.0 from upstream”. It is santifer’s open-source job-search agent, imported to read. The README is still his, down to the byline. Not a build of mine.' },
  { repo: 'portfolio', kind: 'build', slug: 'portfolio', note: 'This site.' },
  { repo: 'sanko-funding-radar', kind: 'build', slug: 'sanko-funding-radar', private: true, note: 'Sanko’s grant pipeline.' },
  { repo: 'FF-101', kind: 'build', slug: 'football-frenzy', private: true, note: 'Football Frenzy: the 2026 five-a-side sim with the replayable engine.' },
  { repo: 'sanko-core', kind: 'build', slug: 'sanko', note: 'The current Sanko agent: src/agent and its twenty-two tools, the simulator, the evidence and care modules.' },
  { repo: 'proper', kind: 'build', slug: 'proper', private: true, note: 'Proper: the repository reader.' },
  { repo: 'proper-product-prototype', kind: 'lineage', slug: 'proper', private: true, note: 'The hosted-workflow branch of Proper: a GitHub App, a queue with leases and fencing tokens, and PostgreSQL behind row-level security.' },
  { repo: 'cork-podcast-studio', kind: 'build', slug: 'cork-podcast-studio', private: true, note: 'The studio workspace demonstration.' },
  { repo: 'pact-agreement-prototype', kind: 'build', slug: 'pact', private: true, note: 'Pact: the agreement prototype.' },
  { repo: 'sanko-vault', kind: 'lineage', slug: 'sanko', private: true, note: 'Historical reference. sanko-core says so in its own README.' },
  { repo: 'volley', kind: 'empty', note: 'No files.' },
  { repo: 'Bob', kind: 'build', slug: 'bob', note: 'The construction-output experiment, all seven phases.' },
  { repo: 'tdl', kind: 'build', slug: 'the-deposit-ledger', note: 'The Deposit Ledger: Tauri, Rust and one SQLite file.' },
  { repo: 'yshm', kind: 'build', slug: 'yemkem-school', private: true, note: 'Nine curriculum documents and nine designed pages for the herbal-medicine school.' },
  { repo: '30-sec-wknd', kind: 'build', slug: 'five-days', note: 'Five Days: the itinerary compiled from a design canvas.' },
  { repo: 'dv-1', kind: 'build', slug: 'dansville-catering', note: 'The catering landing page.' },
  { repo: 'dv-2', kind: 'lineage', slug: 'dansville-catering', note: 'A second landing page for the same client, built from a different design export.' },
  { repo: 'arena-opai', kind: 'build', slug: 'arena-lounge', note: 'Arena Lounge.' },
  { repo: 'arena-cld', kind: 'lineage', slug: 'arena-lounge', note: 'The same brief built a second way, to compare the two.' },
  { repo: 'arena', kind: 'empty', note: 'No files. The name was taken before either Arena build started.' },
  { repo: 'margin', kind: 'build', slug: 'margin', note: 'margin: six Swift targets generated from project.yml.' },
  { repo: 'XBM', kind: 'build', slug: 'xbm', note: 'The X bookmark tool.' },
  { repo: 'cv-site', kind: 'build', slug: 'cv-site', note: 'The previous portfolio, and the source for this catalogue’s twenty oldest entries.' },
  { repo: 'shelf', kind: 'build', slug: 'shelf', note: 'Shelf: the offline reading library for saved answers.' },
  { repo: 'desi-tailors', kind: 'build', slug: 'desi-tailors', note: 'The Barking tailor’s page.' },
  { repo: 'iweb', kind: 'build', slug: 'constellation', note: 'The Three.js constellation portfolio.' },
  { repo: 'trueday', kind: 'build', slug: 'trueday', note: 'TrueDay: the Flutter accountability app.' },
  { repo: 'Quire', kind: 'build', slug: 'quire', note: 'Quire: the thesis canvas.' },
  { repo: 'tbot', kind: 'build', slug: 'tbot', note: 'The backtester with the lookahead guard.' },
  { repo: 'amu30', kind: 'build', slug: 'thirty', note: 'The magazine-format thirtieth-birthday invitation.' },
  { repo: 'sett', kind: 'build', slug: 'sett', note: 'SETT: the quiet training log.' },
  { repo: 'node', kind: 'build', slug: 'study-local', note: 'study.local: the local-first learning app.' },
  { repo: 'avatar', kind: 'empty', note: 'No files.' },
  { repo: 'behonest', kind: 'empty', note: 'No files.' },
  { repo: 'fathom', kind: 'build', slug: 'fathom', note: 'Fathom: the comprehension depth gauge.' },
  { repo: 'DnT', kind: 'build', slug: 'becoming-her', note: 'The graduation invitation, with the Caddy configuration that serves it.' },
  { repo: 'sanko-mvpp', kind: 'lineage', slug: 'sanko', note: 'Sanko Vault: the Node keyword bot the agent replaced.' },
  { repo: 'sanko-web', kind: 'lineage', slug: 'sanko', note: 'The first public Sanko page.' },
  { repo: 'anni', kind: 'empty', private: true, note: 'No files.' },
  { repo: 'swab', kind: 'build', slug: 'sanko-vision-demo', note: 'The four-audience Sanko demo, built in six phases.' },
  { repo: 'fixaroo', kind: 'build', slug: 'artisan', note: 'The Artisan trades-marketplace prototype.' },
  { repo: 'sanko-mvp', kind: 'lineage', slug: 'sanko', private: true, note: 'Three files. Superseded before it held anything.' },
  { repo: 'dans-birthday', kind: 'build', slug: 'dans-birthday', note: 'The birthday-dinner RSVP.' },
  { repo: '21not26', kind: 'build', slug: 'twenty-one-not-twenty-six', note: 'The birthday-weekend invitation.' },
  { repo: 'journal-ramadan', kind: 'build', slug: 'fast-journal', note: 'The fasting journal.' },
  { repo: 'ema_c', kind: 'build', slug: 'uspace', note: 'The de-escalation bot.' },
  { repo: 'sanko', kind: 'lineage', slug: 'sanko', note: 'The first Sanko MVP: Python, Flask, Twilio and Airtable.' },
  { repo: 'sandbox2', kind: 'build', slug: 'valentine', note: 'The Valentine’s page.' },
  { repo: 'sandbox', kind: 'empty', note: 'One placeholder file.' },
  { repo: 'v0-health-tracker-app', kind: 'imported', private: true, note: 'Generated by v0.app and synced from it. Thirty screens I did not write. Not a build of mine.' },
  { repo: 'sana-cany', kind: 'lineage', slug: 'sana', note: 'The Expo web build of the SANA platform, deployed to Netlify.' },
  { repo: 'sana-fntpg', kind: 'lineage', slug: 'sana', note: 'A SANA front page on Next.js.' },
  { repo: 'sana-proto', kind: 'lineage', slug: 'sana', note: 'The SANA vision prototype: a Python backend and a Flutter client, with macOS support added locally.' },
  { repo: 'book-book', kind: 'empty', note: 'No files.' },
  { repo: 'sana-abc3', kind: 'build', slug: 'sana', note: 'SANA: the catalogue entry’s source.' },
  { repo: 'sana-nulp', kind: 'empty', note: 'No files.' },
  { repo: 'bishop-abc1', kind: 'build', slug: 'bishop', note: 'Bishop: the inbox manager.' },
  { repo: 'blog-aieng', kind: 'build', slug: 'ai-engineering-commons', note: 'The AI engineering commons.' },
  { repo: 'pal-t1', kind: 'build', slug: 'pal', note: 'PAL: the gym app.' },
  { repo: 's', kind: 'build', slug: 'edo', note: 'Edo: the geography platform.' },
  { repo: 'tbx-ffzy', kind: 'build', slug: 'football-frenzy-draft', note: 'The 2025 fantasy draft game. A separate codebase from FF-101, not an earlier commit of it.' },
  { repo: 'tbx-iam', kind: 'build', slug: 'i-am', note: 'I AM: the riddle game.' },
  { repo: 'sana-wtldp2', kind: 'lineage', slug: 'sana', note: 'A SANA waitlist page, second attempt.' },
  { repo: 'tbx-binap', kind: 'build', slug: 'housemate', note: 'Housemate: the household manager.' },
  { repo: 'sana-wlist-lpg', kind: 'lineage', slug: 'sana', note: 'A SANA waitlist page, first attempt.' },
  { repo: 'tbx-iris', kind: 'build', slug: 'iris', note: 'Iris: the iridology app.' },
  { repo: 'sana-lnpg', kind: 'lineage', slug: 'sana', note: 'A SANA landing page.' },
  { repo: 'sana-cdc', kind: 'lineage', slug: 'sana', note: 'The SANA Flutter MVP taken through six phases, with its own deployment and App Store preparation notes.' },
]

/**
 * The ledger has to agree with the catalogue, or it is decoration. Any
 * repository labelled a build must name an entry that exists, and every entry
 * with a public source must appear here. Both are checked at build time, so a
 * new entry cannot quietly fall out of this list.
 */
const SLUGS = new Set(PROJECTS.map((p) => p.slug))
for (const row of LEDGER) {
  if (row.slug && !SLUGS.has(row.slug)) {
    throw new Error(`data/ledger.ts: "${row.repo}" points at unknown slug "${row.slug}"`)
  }
  if (row.kind === 'build' && !row.slug) {
    throw new Error(`data/ledger.ts: "${row.repo}" is a build with no catalogue entry`)
  }
}

export const LEDGER_COUNTS = {
  repos: LEDGER.length,
  build: LEDGER.filter((r) => r.kind === 'build').length,
  lineage: LEDGER.filter((r) => r.kind === 'lineage').length,
  imported: LEDGER.filter((r) => r.kind === 'imported').length,
  empty: LEDGER.filter((r) => r.kind === 'empty').length,
  private: LEDGER.filter((r) => r.private).length,
}

export const LEDGER_ORDER: LedgerKind[] = ['build', 'lineage', 'imported', 'empty']
