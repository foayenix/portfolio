// Single source of truth for the catalogue.
//
// Copy for the first twenty entries is carried over verbatim from
// foayenix/cv-site; the six later entries are written from each repo's own
// README. `live` and `source` are only set where the URL was checked and
// returned 200 — a missing link means no link is rendered, never a guess.

export type Project = {
  slug: string
  name: string
  year: number
  /** Plain-language summary. One sentence, no selling. */
  oneLiner: string
  /** The thing that makes this build worth reading about. */
  signature: string
  stack: string[]
  tags: string[]
  /** Pulled to the top of the index. */
  featured?: boolean
  stackNote?: string
  live?: string
  source?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'quire',
    name: 'Quire',
    year: 2026,
    featured: true,
    oneLiner:
      'A local-first thesis-production canvas for PhD researchers: source papers, highlights and your writing on one infinite canvas, connected by hand-drawn citation threads.',
    signature:
      'Drag-to-cite — dragging a thread from a source, or from a highlight inside it, to a sentence is the citation, producing an inline footnote. Exports a properly-cited .docx, LaTeX or PDF. Fully offline, no login, no cloud.',
    stack: ['React 19', 'TypeScript', 'Vite', 'React Flow', 'pdf.js', 'IndexedDB', 'Ollama'],
    tags: ['Web', 'Local-first', 'Research', 'AI'],
    live: 'https://quire-three.vercel.app',
    source: 'https://github.com/foayenix/Quire',
  },
  {
    slug: 'sanko',
    name: 'Sanko',
    year: 2026,
    featured: true,
    oneLiner:
      'A WhatsApp bot that lets African traditional-medicine practitioners document herbal formulations and track patient outcomes by voice and photo — no app, no typing, just WhatsApp.',
    signature:
      'Speak naturally, Whisper transcribes, Claude structures the result, and local plant names in Yoruba or Pidgin map to botanical Latin through a 152-entry lookup before anything is stored under row-level security. It reads handwritten notebook pages from a photograph. Webhook signatures are verified, 105 of 105 tests pass, and a public institutional dashboard sits on top.',
    stack: ['Node.js 20', 'Express', 'Supabase', 'Whisper', 'Claude', 'Railway'],
    stackNote: 'Evolved from an earlier Python/Flask + Twilio + Airtable MVP.',
    tags: ['WhatsApp', 'AI', 'Health', 'Social impact'],
    source: 'https://github.com/foayenix/sanko',
  },
  {
    slug: 'tbot',
    name: 'tbot',
    year: 2026,
    featured: true,
    oneLiner:
      'An honest backtesting framework for an OANDA FX trading bot, built to replace a “vibes” always-in-market crossover bot that shipped live with no backtest at all.',
    signature:
      'An explicit lookahead guard means a decision taken on bar t can only ever apply to the t+1 return. On top of that: a chronological train/test split, walk-forward validation producing a distribution of out-of-sample results rather than a single flattering number, and a spread-plus-slippage cost model. Reports are self-contained HTML with inline SVG charts — no charting library, safe to commit, opens offline.',
    stack: ['Python', 'requests', 'vectorised backtester'],
    tags: ['Tool', 'Finance'],
    source: 'https://github.com/foayenix/tbot',
  },
  {
    slug: 'football-frenzy',
    name: 'Football Frenzy',
    year: 2026,
    featured: true,
    oneLiner:
      'A fast five-a-side football sim with leagues, cups, momentum cards, training, a transfer market, seasons, wages and aging.',
    signature:
      'A deterministic, replayable match engine: every match is a snapshot pair, a seed and a decision log, and it re-simulates server-side from an identical prefix — so mid-match card plays are PvP-fair by construction rather than by trust. Anonymous cookie-keyed worlds with recovery codes, friends’ leagues and cups via share codes, and a full economy with wages, aging and retirement.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PostgreSQL', 'HTML Canvas'],
    tags: ['Web', 'Game'],
  },
  {
    slug: 'shelf',
    name: 'Shelf',
    year: 2026,
    oneLiner:
      'A personal reading library for saved Claude responses — keep what is worth keeping and read it later like a book, entirely offline.',
    signature:
      'Notes are plain Markdown files plus a single index.json, readable by any tool, with no database anywhere in the design — so the library outlives the app that made it. Storage and capture live in a Swift package with a platform-independent test suite; the Xcode project is generated from project.yml rather than committed, because a .pbxproj is not reviewable.',
    stack: ['Swift', 'SwiftUI', 'iOS 17+', 'XcodeGen', 'Share Extension'],
    tags: ['Mobile', 'Local-first', 'AI'],
    source: 'https://github.com/foayenix/shelf',
  },
  {
    slug: 'bob',
    name: 'Bob',
    year: 2026,
    oneLiner:
      'An experiment asking whether software can produce residential construction output an architect, structural engineer or building-control officer would actually sign off on.',
    signature:
      'All seven phases are built — compliance checker, building model, quantity takeoff, cost estimate, layout generation, drawing output and the combined report — and every regulation value and measurement convention is deliberately left blank pending verification. Bob refuses to print a number nobody has checked. Scope is fixed and stated: England only, two-storey detached masonry, cavity wall, concrete strip foundation.',
    stack: ['Python', 'CLI-first', 'read-only web surface'],
    tags: ['Tool', 'AI', 'Client'],
    live: 'https://bob-mu-livid.vercel.app',
    source: 'https://github.com/foayenix/Bob',
  },
  {
    slug: 'sett',
    name: 'SETT',
    year: 2026,
    oneLiner:
      'A calm, local-first record of everything you train — a record you trust, not a coach and not a game.',
    signature:
      'No streaks, badges, confetti or red dots. Start a lift you have done before and SETT ghosts the next set from your own history using one transparent progression rule — add 2.5 kg if you hit every rep last time, otherwise repeat — that can always show its reasoning. One orchestrated transition dims the room as you enter the live set; everything else stays quiet.',
    stack: ['React', 'IndexedDB'],
    tags: ['Web', 'Local-first', 'Health'],
    live: 'https://sett-swart.vercel.app',
    source: 'https://github.com/foayenix/sett',
  },
  {
    slug: 'the-deposit-ledger',
    name: 'The Deposit Ledger',
    year: 2026,
    oneLiner:
      'An offline-first desktop application for logging daily research work and building a medicinal-plant materia medica corpus — one SQLite file on one Mac.',
    signature:
      'Records form a single graph: a daily entry points at the monograph written that day, which carries sourced claims citing references, which feed the outputs published. The connectedness is the point — one query answers which plants you have written about that have no human-trial evidence and that you have never published on. No server, no account, no sync, no second user.',
    stack: ['SQLite', 'Desktop', 'local-only'],
    tags: ['Tool', 'Local-first', 'Research'],
    source: 'https://github.com/foayenix/tdl',
  },
  {
    slug: 'margin',
    name: 'margin',
    year: 2026,
    oneLiner: 'Time budgets, placed — and the truth about whether they happened.',
    signature:
      'Six targets across app, widgets, Live Activity, Dynamic Island and watch, with project.yml as the source of truth and the .xcodeproj generated rather than committed — every target-membership decision is a real, reviewable one about which files the widget can see, which the watch can, and where each App Group attaches. The engine’s test suite runs without a simulator.',
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'watchOS', 'XcodeGen'],
    tags: ['Mobile', 'Productivity'],
    source: 'https://github.com/foayenix/margin',
  },
  {
    slug: 'fathom',
    name: 'Fathom',
    year: 2026,
    oneLiner:
      'A depth gauge for research comprehension: drop in a concept you do not fully grasp and it gauges how deep you already are, sizes a session to close the gap, then tutors you through it.',
    signature:
      'A candid reading on a vertical gauge — Surface, Working, Deep, Fluent — where the prompts are instructed to judge honestly and never to flatter, followed by a resumable Socratic session. Per-user row-level security, and a research map plotting every concept you have sounded. The tone target is scholarly instrument, not streak-and-confetti.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic Messages API'],
    tags: ['Web', 'AI', 'Research'],
    source: 'https://github.com/foayenix/fathom',
  },
  {
    slug: 'crescent-moon',
    name: 'Crescent Moon',
    year: 2026,
    oneLiner:
      'A wine bar’s public site and the owner’s admin backend in a single application, replacing an old static site.',
    signature:
      'The homepage’s What’s On renders live from the database, so the owner’s edits appear without a redeploy and without a developer. Self-hostable on Coolify alongside self-hosted bookings and analytics, with a single bcrypt login and signed-cookie sessions rather than a third-party auth dependency.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL'],
    tags: ['Web', 'Client'],
    source: 'https://github.com/foayenix/CrMn',
  },
  {
    slug: 'study-local',
    name: 'study.local',
    year: 2026,
    oneLiner:
      'A local-first learning app: paste text, a PDF or a video link and a local model turns it into a structured study plan.',
    signature:
      'It generates modules and lessons, then auto-links concepts across every plan you own by embedding similarity — cosine at or above 0.85 merges, 0.70 to 0.85 relates — building a concept graph with XP, levels and streaks on top. Runs entirely on your machine with no accounts, no cloud and no telemetry, and ships a deterministic offline mock provider so the tests never call a model.',
    stack: ['Express', 'better-sqlite3', 'React', 'Vite', 'Ollama', 'Whisper'],
    tags: ['Web', 'Local-first', 'AI'],
    source: 'https://github.com/foayenix/node',
  },
  {
    slug: 'xbm',
    name: 'XBM',
    year: 2026,
    oneLiner:
      'A local, single-user tool that pulls your X bookmarks, enriches them, auto-tags them, and gives you a searchable web interface with a watch-later queue.',
    signature:
      'Each bookmark is enriched with thread text, article summaries and YouTube transcripts, auto-tagged with Claude, and indexed in full-text search — resumable after a crash or a rate limit, with an optional unattended scheduled sync. Runs on your own machine with your own keys; there is no hosting, no account and no multi-user auth.',
    stack: ['Python', 'FastAPI', 'SQLite FTS5', 'Claude', 'OAuth 2.0 PKCE'],
    tags: ['Tool', 'Local-first', 'AI'],
    source: 'https://github.com/foayenix/XBM',
  },
  {
    slug: 'trueday',
    name: 'TrueDay',
    year: 2026,
    oneLiner:
      'A manual lock-screen accountability and time-tracking app with gentle nudges and a widget for your current and next activity.',
    signature:
      'Smart reflow with anchor blocks: fixed commitments stay put while flexible ones flow around them. An impromptu-task parser reads “Meeting 10:00 30m” as written. Clean architecture with functional Either error handling and around 39 unit tests across the parser, schedule and summary logic.',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Drift', 'home_widget'],
    tags: ['Mobile', 'Health', 'Productivity'],
    source: 'https://github.com/foayenix/trueday',
  },
  {
    slug: 'iris',
    name: 'Iris',
    year: 2025,
    oneLiner:
      'Turn a photograph of your iris into AI art while exploring wellness insights drawn from traditional iridology.',
    signature:
      'Guided capture with real-time image-quality analysis — sharpness by Laplacian variance, plus glare and blur detection — then iridology zone mapping in polar coordinates and art generation, all local-first and framed with GDPR and MHRA-compliant “not a medical device” language rather than health claims. Built across seven phases with analytics and backup/restore.',
    stack: ['Flutter', 'Riverpod', 'Hive', 'Stability AI', 'TFLite'],
    tags: ['Mobile', 'AI', 'Health'],
    source: 'https://github.com/foayenix/tbx-iris',
  },
  {
    slug: 'i-am',
    name: 'I AM',
    year: 2025,
    oneLiner:
      'A timed “I am…” riddle game with leaderboards, user-generated content and a rewarded-ads economy.',
    signature:
      'Answer matching tolerates typos and British or American spelling, so a right answer is never marked wrong on a technicality. User-submitted riddles pass SHA-256 and SimHash duplicate detection into a moderation queue, and the entire economy — timer, caps, coin values — is tunable from Remote Config, monetised by rewarded ads only, with daily caps.',
    stack: ['Flutter', 'Firebase', 'Remote Config', 'AdMob'],
    tags: ['Mobile', 'Game'],
    source: 'https://github.com/foayenix/tbx-iam',
  },
  {
    slug: 'bishop',
    name: 'Bishop',
    year: 2025,
    oneLiner:
      'An AI inbox manager that connects to Gmail, cleans and sorts mail, and visualises where your inbox actually goes.',
    signature:
      'Syncs the last 90 days over Gmail OAuth, classifies into Finance, Promo, Social, Important and Personal, flags the mail that genuinely needs a reply, and drives a dashboard of volume, categories and top senders with bulk actions and background incremental sync.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth v5', 'Gmail API', 'Recharts'],
    tags: ['Web', 'AI', 'Tool'],
    source: 'https://github.com/foayenix/bishop-abc1',
  },
  {
    slug: 'ai-engineering-commons',
    name: 'AI Engineering Commons',
    year: 2025,
    oneLiner: 'A community knowledge hub for AI and ML engineering with reputation-based governance.',
    signature:
      'Five-tier weighted voting with role weights from 1 to 16, automatic promotion at reputation thresholds, and an approval gate that needs both a weighted score and reviewer sign-off before an article publishes. Articles are MDX with full version history, and citations between them build a knowledge graph.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'shadcn/ui', 'NextAuth', 'PostgreSQL', 'Prisma', 'MDX'],
    tags: ['Web', 'Community'],
    source: 'https://github.com/foayenix/blog-aieng',
  },
  {
    slug: 'fast-journal',
    name: '30-Day Fast Journal',
    year: 2026,
    oneLiner: 'A minimal, offline-first daily check-in app for a 30-day fasting challenge.',
    signature:
      'A weighted momentum score across water, workout, study and reading, and a smart-prompt priority chain that changes the journal question depending on how the day actually went. Entirely local — no backend, no auth, no network call anywhere.',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    tags: ['Mobile', 'Local-first', 'Health'],
    source: 'https://github.com/foayenix/journal-ramadan',
  },
  {
    slug: 'dansville-catering',
    name: 'Dansville Catering',
    year: 2026,
    oneLiner:
      'A one-page site for a family-run Nigerian and intercontinental caterer in Colchester.',
    signature:
      'Static HTML with no framework, no build server and no dependency to rot — open index.html and it works. Self-hosted webfonts totalling 64 KB, a responsive image set generated from the original photographs by a small build script, and a vendored design system kept as tokens so the page layer never hard-codes a value.',
    stack: ['HTML', 'CSS', 'design tokens', 'Python build script'],
    tags: ['Web', 'Client'],
    live: 'https://dv-1.vercel.app',
    source: 'https://github.com/foayenix/dv-1',
  },
  {
    slug: 'arena-lounge',
    name: 'Arena Lounge',
    year: 2026,
    oneLiner: 'A restaurant site for Arena Lounge, built to be handed over and edited without a developer.',
    signature:
      'The entire menu lives in one data file and the contact details sit at the top of one page component, so the owner changes content in two known places rather than hunting through markup. No environment variables and no database — it deploys as-is.',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    tags: ['Web', 'Client'],
    source: 'https://github.com/foayenix/arena-opai',
  },
  {
    slug: 'plave',
    name: 'Plave',
    year: 2025,
    oneLiner:
      'A wishlist planner that turns saved links into a plan: log savings, watch a progress ring fill, and get a forecast of the month each goal lands at your pace.',
    signature:
      'Owner-blind gift reservations — friends reserve gifts and the owner never learns which, enforced in the database with row-level security rather than merely hidden in the interface. A Save to Plave bookmarklet scrapes name, image and price off any shop page. Installable, offline, and registered as an Android share target.',
    stack: ['React 18', 'Vite', 'React Router', 'Supabase', 'PWA'],
    tags: ['Web', 'Consumer', 'PWA'],
  },
  {
    slug: 'housemate',
    name: 'HouseMate',
    year: 2025,
    oneLiner: 'A household-management app that replaces WhatsApp chaos for shared houses.',
    signature:
      'Automated weekly bin-rota rotation with swaps and reminders, photo-based maintenance reporting with status tracking, property-scoped group chat and visitor logging — with genuinely separate experiences for landlords and tenants rather than one screen with things hidden.',
    stack: ['Flutter', 'Riverpod', 'Firebase', 'Hive', 'go_router'],
    tags: ['Mobile', 'Consumer'],
  },
  {
    slug: 'pal',
    name: 'PAL',
    year: 2025,
    oneLiner: 'A gym companion: photograph a machine and get instant guidance on how to use it.',
    signature:
      'The recognition service sits behind a clean interface so a mock can be swapped for a hosted model or on-device TFLite without touching the app. Fifteen equipment types, each with step-by-step form, target muscles, safety notes and the mistakes people actually make.',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Firebase'],
    tags: ['Mobile', 'AI'],
  },
  {
    slug: 'edo',
    name: 'EDO',
    year: 2025,
    oneLiner:
      'An agent that tests a website like a real user before launch, then upgrades its SEO into readiness for AI search.',
    signature:
      'It simulates a visitor clicking every page, form and button to surface broken flows, audits Core Web Vitals, accessibility and SEO, then scores each page on its likelihood of appearing in AI overviews and hands back a step-by-step upgrade plan rather than a score alone.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Zustand', 'Zod'],
    tags: ['Web', 'AI', 'Tool'],
  },
  {
    slug: 'uspace',
    name: 'USPACE',
    year: 2025,
    oneLiner:
      'A WhatsApp tool that rewrites the heated message you are about to send into calmer alternatives. A writing tool, not therapy.',
    signature:
      'You send the message you were thinking of sending, choose Pause, Explain, Apologise or Boundary, and get three calmer options. It never messages the other person — you stay in control of sending. A keyword safety classifier routes self-harm, threat and abuse language to helplines, phone numbers are SHA-256 hashed, and /delete wipes everything.',
    stack: ['Node.js', 'TypeScript', 'Express', 'WhatsApp Cloud API', 'Prisma', 'Zod'],
    tags: ['WhatsApp', 'AI', 'Health'],
  },
]

export const TAG_ORDER = [
  'Web', 'Mobile', 'AI', 'Local-first', 'Tool', 'Game', 'Client',
  'WhatsApp', 'Health', 'Research', 'Productivity', 'Consumer',
  'PWA', 'Community', 'Finance', 'Social impact',
]

export const ALL_TAGS = TAG_ORDER.filter((t) => PROJECTS.some((p) => p.tags.includes(t)))

export const FEATURED = PROJECTS.filter((p) => p.featured)

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
