// Single source of truth for the catalogue.
//
// Every claim here comes from foayenix/cv-site (the twenty oldest entries) or
// from the repository itself (every later one), read on whichever branch
// carries the newest work, which for several builds is not the default branch.
// The wording has been edited since; the facts have not. `live` and `source`
// are only set where the URL was checked and returned 200; a missing link means
// no link is rendered. A build whose code is private gets no `source`, and
// never a link to a nearby public repository standing in for it.

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
    slug: 'proper',
    name: 'Proper',
    year: 2026,
    featured: true,
    oneLiner:
      'A reader for software built with AI: point it at a repository and it returns project intelligence you can inspect, from a health score down to the individual checks behind it, the findings and their evidence, and a map of how the files connect.',
    signature:
      'The scanner is deterministic and offline. It uses the Node standard library and nothing else, makes no network call, and never writes to the repository it reads. The optional local explanation layer sits on top of those facts and cannot change a finding or a score. On the project map a solid line was read from the import graph and a dashed one is only the scanner’s own grouping of file paths, so a line never looks more certain than the evidence behind it. Comprehension is left unscored: each area reads “No evidence yet” until you answer for it.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Node', 'Ollama'],
    tags: ['Web', 'Tool', 'AI', 'Local-first'],
  },
  {
    slug: 'pact',
    name: 'Pact',
    year: 2026,
    oneLiner:
      'A responsive prototype for turning the agreements people make in conversation into structured, living records: plain language through negotiation and signature to obligations, amendments and evidence.',
    signature:
      'The Agreement Spine runs through every screen, from Draft to Review, Signed, Active and Complete, so the state of an agreement is legible without reading a document. A counterparty change arrives as an explicit, attributable diff. An amendment is added while the signed version stays as it was. Agreement Check raises completeness and clarity warnings, and stops short of implying legal validity. A counterparty reviews, negotiates and signs from a private link with nothing installed.',
    stack: ['Next.js 16', 'React 19', 'TypeScript'],
    tags: ['Web', 'Prototype'],
  },
  {
    slug: 'quire',
    name: 'Quire',
    year: 2026,
    featured: true,
    oneLiner:
      'A local-first thesis-production canvas for PhD researchers: source papers, highlights and your writing on one infinite canvas, connected by hand-drawn citation threads.',
    signature:
      'Dragging a thread from a source, or from a highlight inside it, onto a sentence is the citation, and it produces an inline footnote. Exports a properly cited .docx, LaTeX or PDF. Fully offline, no login, no cloud.',
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
      'A WhatsApp agent that lets African traditional-medicine practitioners document herbal formulations and track the patients they treat, by text, voice note or photograph, in English, Yorùbá, Igbo, Hausa or Pidgin.',
    signature:
      'There are no keywords and no fixed conversation steps. An inbound message becomes content blocks and enters a Claude tool-calling loop with eleven tools, and every executor resolves records by short code scoped to the calling practitioner, so a hallucinated FM-00042 comes back as “not found” and never as another practitioner’s patient. Conversation memory is replayed for 24 hours, so the agent picks up mid-thought across restarts and redeploys, and rapid-fire messages are debounced into a single turn. Local plant names map to botanical Latin through a 152-entry Nigerian lookup. The evaluation set makes no model call until at least a hundred cases carry a practitioner’s approval, and an admin review, a correction row or a synthetic paraphrase does not count. With the pilot blocked on a Meta production number, a simulator serves the same agent loop in a browser, every tool call and its result shown beside the reply, so you can see that a formulation reached the vault.',
    stack: ['Node.js 20', 'Express', 'Supabase', 'Whisper', 'Claude', 'Railway'],
    stackNote:
      'The agent replaced this build’s own six keyword-driven flows; before those, an MVP on Python, Flask, Twilio and Airtable. The current code is private, so there is no source link: the public repository holds that first MVP, and not what is described here.',
    tags: ['WhatsApp', 'AI', 'Health', 'Social impact'],
  },
  {
    slug: 'tbot',
    name: 'tbot',
    year: 2026,
    featured: true,
    oneLiner:
      'A backtesting framework for an OANDA FX trading bot, built to replace a “vibes” always-in-market crossover bot that shipped live with no backtest behind it.',
    signature:
      'An explicit lookahead guard means a decision taken on bar t applies only to the t+1 return. Around it sit a chronological train/test split, walk-forward validation that reports a distribution of out-of-sample results instead of one headline number, and a spread-plus-slippage cost model. Reports are self-contained HTML with inline SVG charts: no charting library, safe to commit, opens offline.',
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
      'A deterministic, replayable match engine: every match is a snapshot pair, a seed and a decision log, and it re-simulates server-side from an identical prefix, so the server decides whether a mid-match card play was legal. Anonymous cookie-keyed worlds with recovery codes, friends’ leagues and cups via share codes, and a full economy with wages, aging and retirement.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PostgreSQL', 'HTML Canvas'],
    stackNote:
      'A 2025 build of the same idea took a different shape, a fantasy draft game on Express, Socket.IO and React. It is a separate codebase, and not an earlier commit of this one.',
    tags: ['Web', 'Game'],
  },
  {
    slug: 'shelf',
    name: 'Shelf',
    year: 2026,
    oneLiner:
      'A personal reading library for saved Claude responses: keep what is worth keeping and read it later like a book, entirely offline.',
    signature:
      'Notes are plain Markdown files plus a single index.json, readable by any tool, with no database anywhere in the design, so the library outlives the app that made it. The Markdown is the source of truth and the index is not: an index that cannot be read is set aside under a timestamped name and rebuilt from the files, so nothing is overwritten on the way to recovery. Storage and capture live in a Swift package with a platform-independent test suite, and the Xcode project is generated from project.yml, because a committed .pbxproj is not reviewable. CI checks the App Store requirements on every build: the icon, both privacy manifests, and versions the app and its extension cannot disagree on. The optional iCloud mirror is file-based, newest file wins, with no CloudKit schema to outlive.',
    stack: ['Swift', 'SwiftUI', 'iOS 17+', 'XcodeGen', 'Share Extension'],
    tags: ['Mobile', 'Local-first', 'AI'],
    source: 'https://github.com/foayenix/shelf',
  },
  {
    slug: 'bob',
    name: 'Bob',
    year: 2026,
    oneLiner:
      'An experiment asking whether software can produce residential construction output an architect, structural engineer or building-control officer would sign off on.',
    signature:
      'All seven phases are built: compliance checker, building model, quantity takeoff, cost estimate, layout generation, drawing output and the combined report. Every regulation value and measurement convention is left blank pending verification, so no unverified number ever reaches the output. Scope is fixed and stated: England only, two-storey detached masonry, cavity wall, concrete strip foundation.',
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
      'A calm, local-first record of everything you train. It keeps the log and leaves the coaching to you.',
    signature:
      'No streaks, badges, confetti or red dots. Start a lift you have done before and SETT ghosts the next set from your own history using one progression rule it can always show you: add 2.5 kg if you hit every rep last time, otherwise repeat. One transition dims the room as you enter the live set; everything else stays quiet.',
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
      'An offline-first desktop application for logging daily research work and building a medicinal-plant materia medica corpus, in one SQLite file on one Mac.',
    signature:
      'Records form a single graph: a daily entry points at the monograph written that day, which carries sourced claims citing references, which feed the outputs published. Because they connect, one query answers which plants you have written about that have no human-trial evidence and that you have never published on. The migrations belong to the Python side and the Rust core never runs one. The frontend is vanilla DOM and hand-written CSS, held to a set of artboards that settle any disagreement between the build contract and the design. No server, no account, no sync, no second user.',
    stack: ['Tauri 2', 'Rust', 'rusqlite', 'TypeScript', 'Python 3.12', 'SQLite'],
    tags: ['Tool', 'Local-first', 'Research'],
    source: 'https://github.com/foayenix/tdl',
  },
  {
    slug: 'margin',
    name: 'margin',
    year: 2026,
    oneLiner: 'Time budgets, placed in advance, and a record of whether they happened.',
    signature:
      'Six targets across app, widgets, Live Activity, Dynamic Island and watch, with project.yml as the source of truth and the .xcodeproj generated from it. That keeps every target-membership decision reviewable: which files the widget can see, which the watch can, and where each App Group attaches. The engine’s test suite runs without a simulator.',
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'watchOS', 'Screen Time', 'XcodeGen'],
    tags: ['Mobile', 'Productivity'],
    source: 'https://github.com/foayenix/margin',
  },
  {
    slug: 'fathom',
    name: 'Fathom',
    year: 2026,
    oneLiner:
      'A depth gauge for research comprehension: drop in a concept you do not fully grasp and it reads how deep you already are, sizes a session to close the gap, then tutors you through it.',
    signature:
      'The reading lands on a vertical gauge: Surface, Working, Deep, Fluent. The prompts are instructed to judge honestly and never to flatter, and each reading opens into a resumable Socratic session. Per-user row-level security, and a research map plotting every concept you have sounded. It is built to read as a scholarly instrument.',
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
      'The homepage’s What’s On renders live from the database, so the owner’s edits appear without a redeploy and without a developer. Self-hostable on Coolify alongside self-hosted bookings and analytics, with a single bcrypt login and signed-cookie sessions, and no third-party auth dependency.',
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
      'It generates modules and lessons, then auto-links concepts across every plan you own by embedding similarity: cosine at or above 0.85 merges, 0.70 to 0.85 relates. The result is a concept graph with XP, levels and streaks on top. Runs entirely on your machine with no accounts, no cloud and no telemetry, and ships a deterministic offline mock provider so the tests never call a model.',
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
      'Each bookmark is enriched with thread text, article summaries and YouTube transcripts, auto-tagged with Claude, and indexed in full-text search. The sync resumes after a crash or a rate limit, and can run unattended on a schedule. Runs on your own machine with your own keys; there is no hosting, no account and no multi-user auth.',
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
      'Guided capture runs real-time image-quality analysis: sharpness by Laplacian variance, plus glare and blur detection. Then iridology zone mapping in polar coordinates and art generation, all local-first, with GDPR and MHRA-compliant “not a medical device” wording in place of health claims. Built across seven phases with analytics and backup/restore.',
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
      'Answer matching tolerates typos and British or American spelling, so a right answer is never marked wrong on a technicality. User-submitted riddles pass SHA-256 and SimHash duplicate detection into a moderation queue, and the whole economy (timer, caps, coin values) is tunable from Remote Config. Monetisation is rewarded ads only, with daily caps.',
    stack: ['Flutter', 'Firebase', 'Remote Config', 'AdMob'],
    tags: ['Mobile', 'Game'],
    source: 'https://github.com/foayenix/tbx-iam',
  },
  {
    slug: 'bishop',
    name: 'Bishop',
    year: 2025,
    oneLiner:
      'An AI inbox manager that connects to Gmail, cleans and sorts mail, and visualises where your inbox goes.',
    signature:
      'Syncs the last 90 days over Gmail OAuth, classifies into Finance, Promo, Social, Important and Personal, flags the mail that needs a reply, and drives a dashboard of volume, categories and top senders with bulk actions and background incremental sync.',
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
      'A weighted momentum score across water, workout, study and reading, and a smart-prompt priority chain that changes the journal question depending on how the day went. Entirely local: no backend, no auth, no network call anywhere.',
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
      'Static HTML with no framework, no build server and no dependency to rot: open index.html and it works. Self-hosted webfonts totalling 64 KB, a responsive image set generated from the original photographs by a small build script, and a vendored design system kept as tokens so the page layer never hard-codes a value.',
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
      'The entire menu lives in one data file and the contact details sit at the top of one page component, so the owner edits content in two known places. No environment variables and no database; it deploys as-is.',
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
      'Friends reserve gifts and the list owner never learns which. A row-level security policy in the database is what keeps it that way, so the interface has nothing to leak. A Save to Plave bookmarklet scrapes name, image and price off any shop page. Installable, offline, and registered as an Android share target.',
    stack: ['React 18', 'Vite', 'React Router', 'Supabase', 'PWA'],
    tags: ['Web', 'Consumer', 'PWA'],
  },
  {
    slug: 'housemate',
    name: 'HouseMate',
    year: 2025,
    oneLiner: 'A household-management app that replaces WhatsApp chaos for shared houses.',
    signature:
      'Automated weekly bin-rota rotation with swaps and reminders, photo-based maintenance reporting with status tracking, property-scoped group chat, and visitor logging. Landlords and tenants each get their own flows, not one screen with parts hidden.',
    stack: ['Flutter', 'Riverpod', 'Firebase', 'Hive', 'go_router'],
    tags: ['Mobile', 'Consumer'],
    source: 'https://github.com/foayenix/tbx-binap',
  },
  {
    slug: 'pal',
    name: 'PAL',
    year: 2025,
    oneLiner: 'A gym companion: photograph a machine and get instant guidance on how to use it.',
    signature:
      'The recognition service sits behind a clean interface so a mock can be swapped for a hosted model or on-device TFLite without touching the app. Fifteen equipment types, each with step-by-step form, target muscles, safety notes and the mistakes people commonly make.',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Firebase'],
    tags: ['Mobile', 'AI'],
    source: 'https://github.com/foayenix/pal-t1',
  },
  {
    slug: 'edo',
    name: 'EDO',
    year: 2025,
    oneLiner:
      'An agent that tests a website like a real user before launch, then upgrades its SEO into readiness for AI search.',
    signature:
      'It simulates a visitor clicking every page, form and button to surface broken flows, audits Core Web Vitals, accessibility and SEO, then scores each page on its likelihood of appearing in AI overviews and hands back a step-by-step upgrade plan to act on.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Zustand', 'Zod'],
    tags: ['Web', 'AI', 'Tool'],
    source: 'https://github.com/foayenix/s',
  },
  {
    slug: 'uspace',
    name: 'USPACE',
    year: 2025,
    oneLiner:
      'A WhatsApp tool that rewrites the heated message you are about to send into calmer alternatives. It is a writing tool, not therapy.',
    signature:
      'You send the message you were thinking of sending, choose Pause, Explain, Apologise or Boundary, and get three calmer options. It never messages the other person; you stay in control of sending. A keyword safety classifier routes self-harm, threat and abuse language to helplines, phone numbers are SHA-256 hashed, and /delete wipes everything.',
    stack: ['Node.js', 'TypeScript', 'Express', 'WhatsApp Cloud API', 'Prisma', 'Zod'],
    tags: ['WhatsApp', 'AI', 'Health'],
    source: 'https://github.com/foayenix/ema_c',
  },
  {
    slug: 'sana',
    name: 'SANA',
    year: 2025,
    oneLiner:
      'A dual-sided wellness platform connecting people with credible complementary-medicine practitioners, and measuring whether the treatment worked.',
    signature:
      'Ten named models carry the product, where one recommendation endpoint would have done: credential vetting that checks a practitioner’s qualification against the awarding institution, safety triage that detects a crisis before a match is made, and an outcome-uplift model using Thompson sampling to learn which interventions help. Outcomes are recorded on instruments a clinician already recognises: WHO-5, DASS-21 and VAS. Around that sit practice management and scheduling, marketplace discovery, Stripe payments and payouts, wearable integrations, an embeddable booking widget, and an enterprise tier with FHIR and multi-tenancy.',
    stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'pgvector', 'Flutter', 'Stripe'],
    stackNote: 'An earlier MVP of the same platform was built on NestJS, Prisma and Flutter.',
    tags: ['Web', 'Mobile', 'AI', 'Health'],
    source: 'https://github.com/foayenix/sana-abc3',
  },
  {
    slug: 'five-days',
    name: 'Five Days',
    year: 2026,
    oneLiner:
      'A private five-day itinerary page, compiled from a design canvas file instead of maintained as markup.',
    signature:
      'The canvas file is the source of truth and cannot be served, because it depends on a runtime that exists only inside the editor. A build script lifts its helmet into the head, its canvas markup into the body, and shims the one logic component to run in an ordinary browser. The plan is edited where it was designed, and the site is a build artefact. Query-string switches render the page as though it were any given date, so the whole thing can be checked without waiting for the calendar, and a missing photograph degrades to a gradient panel instead of a broken image. No framework and no dependencies.',
    stack: ['Node', 'static HTML', 'Vercel'],
    tags: ['Web', 'Tool'],
    source: 'https://github.com/foayenix/30-sec-wknd',
  },
]

export const TAG_ORDER = [
  'Web', 'Mobile', 'AI', 'Local-first', 'Tool', 'Game', 'Client',
  'WhatsApp', 'Health', 'Research', 'Productivity', 'Consumer',
  'PWA', 'Community', 'Finance', 'Social impact', 'Prototype',
]

export const ALL_TAGS = TAG_ORDER.filter((t) => PROJECTS.some((p) => p.tags.includes(t)))

export const FEATURED = PROJECTS.filter((p) => p.featured)

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
