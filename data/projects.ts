import type { IconName } from '@/components/Icon'

// Single source of truth for the catalogue.
//
// Every claim here comes from foayenix/cv-site (the twenty oldest entries) or
// from the repository itself (every later one), read on whichever branch
// carries the newest work, which for several builds is not the default branch.
// The wording has been edited since; the facts have not. `live` and `source`
// are only set where the URL was checked and returned 200; a missing link means
// no link is rendered. A build whose code is private gets no `source`, and
// never a link to a nearby public repository standing in for it.

/**
 * How far a build actually got. This is the one field that must never flatter.
 *
 * `live`       Deployed and open to anyone. The URL is on the page.
 * `client`     Built for a client rather than for release here.
 * `built`      Finished and runs, on a machine or a device. It has not been
 *              released — no public deployment, nothing on an App Store — and
 *              there is no claim that anyone else is using it.
 * `prototype`  Screens and flows are built. It is not a product.
 * `experiment` Built to answer a question, not to ship.
 *
 * No build has usage figures that can be shown, so no entry claims usage,
 * revenue or measured outcomes, the live and client builds included. Where a build is waiting on something
 * outside the code, `statusNote` says what.
 */
export type Status = 'live' | 'client' | 'built' | 'prototype' | 'experiment'

export const STATUS: Record<Status, { label: string; blurb: string }> = {
  live: {
    label: 'Live',
    blurb: 'Deployed and open to anyone. The link is on this page.',
  },
  client: {
    label: 'Client work',
    blurb: 'Built for a client rather than for release here.',
  },
  built: {
    label: 'Built, not released',
    blurb:
      'Finished and running, on a machine or a device. It has not been released to anyone: there is nothing public to open, and nobody else is using it yet.',
  },
  prototype: {
    label: 'Prototype',
    blurb: 'The screens and the flows are built. It is not a product.',
  },
  experiment: {
    label: 'Experiment',
    blurb: 'Built to answer a question rather than to ship.',
  },
}

/**
 * The evidence a reader needs to judge a build in a few minutes, rather than
 * take the signature paragraph on trust.
 *
 * Every field restates something the build itself establishes. `usage` is
 * deliberately absent everywhere: no build has usage figures to show, and
 * an invented outcome would cost more than an empty section.
 */
export type CaseStudy = {
  /** The problem, and who has it. */
  problem: string
  /** What I built, and its boundary. */
  role: string
  /** One substantial technical difficulty, and how it was resolved. */
  hard: string
  /** A decision, the alternative, and what the decision costs. */
  decision: string
  /** Concrete steps a reader can take to check the claims. */
  verify: string[]
  /** What is not there. Written before anyone has to ask. */
  limits: string
}

/**
 * The same build told as a picture, for a reader who will never open the
 * source. Plain words only: no stack names, no acronyms, nothing a
 * non-developer would have to look up. Every line restates something the
 * rest of the entry already establishes; none of it is new claim.
 */
export type Story = {
  /** Who it is for, in two to five words. */
  forWho: string
  /** Life before this build, in one short sentence. */
  before?: string
  /** Life with it, in one short sentence. */
  after?: string
  /** How it works, three or four steps, in the order a user meets them. */
  steps: { icon: IconName; title: string; text: string }[]
  /** What it promises, each a few words. */
  promises?: { icon: IconName; text: string }[]
}

/** A screenshot in public/work/<slug>/. Alt text says what the screen shows. */
export type Shot = { src: string; alt: string; caption?: string }

export type Project = {
  slug: string
  name: string
  year: number
  status: Status
  /** Why this build is not further along than its status says. */
  statusNote?: string
  /** Plain-language summary. One sentence, no selling. */
  oneLiner: string
  /** The thing that makes this build worth reading about. */
  signature: string
  stack: string[]
  tags: string[]
  /** Pulled to the top of the index. */
  featured?: boolean
  /** 1, 2, 3: the three builds the homepage leads with, in order. */
  flagship?: number
  caseStudy?: CaseStudy
  story?: Story
  shots?: Shot[]
  stackNote?: string
  live?: string
  source?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'proper',
    name: 'Proper',
    year: 2026,
    status: 'built',
    flagship: 2,
    statusNote:
      'No public source and no deployment, so nothing claimed on this page can be checked from outside it. A walkthrough is the honest substitute, and it is offered below.',
    featured: true,
    oneLiner:
      'A reader for software built with AI: point it at a repository and it returns project intelligence you can inspect, from a health score down to the individual checks behind it, the findings and their evidence, and a map of how the files connect.',
    signature:
      'The scanner is deterministic and offline. It uses the Node standard library and nothing else, makes no network call, and never writes to the repository it reads. The optional local explanation layer sits on top of those facts and cannot change a finding or a score. On the project map a solid line was read from the import graph and a dashed one is only the scanner’s own grouping of file paths, so a line never looks more certain than the evidence behind it. Comprehension is left unscored: each area reads “No evidence yet” until you answer for it.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Node', 'Ollama'],
    tags: ['Web', 'Tool', 'AI', 'Local-first'],
    story: {
      forWho: 'anyone taking over someone else’s code',
      before: 'Code arrives faster than anyone can read it, and the quick answers come from an AI you cannot check.',
      after: 'A report built from evidence. Every finding points to the exact line that caused it.',
      steps: [
        { icon: 'folder', title: 'Point it at a project', text: 'Choose a folder of code on your own machine.' },
        { icon: 'search', title: 'It reads every file', text: 'Offline, and without changing anything.' },
        { icon: 'map', title: 'See the whole picture', text: 'A health score and a map of how the files connect.' },
        { icon: 'target', title: 'Follow the evidence', text: 'Open any finding and land on the line behind it.' },
      ],
      promises: [
        { icon: 'offline', text: 'Never goes online' },
        { icon: 'lock', text: 'Never changes your code' },
        { icon: 'repeat', text: 'Same result every time' },
      ],
    },
    caseStudy: {
      problem:
        'Code now arrives faster than anyone can read it. Someone taking on an unfamiliar repository wants to know what it does, where the risk sits, and what the evidence is for each — and the tools that answer that quickly answer it by asking a model, which is the one kind of answer you cannot check.',
      role:
        'Solo build: the deterministic scanner and its checks, the health score and the per-check breakdown underneath it, the import-graph extraction and the project map, and the boundary the optional local explanation layer sits behind.',
      hard:
        'Keeping the explanation layer out of the findings. A model that can see a finding will restate it as a new one, so the scan runs to completion first and its output is the only thing the explanation layer is ever given. It can describe a finding. It cannot create one, remove one, or move a score.',
      decision:
        'The scanner uses the Node standard library and nothing else, makes no network call, and never writes to the repository it reads. The alternative was the ecosystem’s parsers and analysers, which would read more languages and read them more precisely. The constraint buys a scan that can be run on a private repository without asking anyone’s permission and that returns the same result every time. It costs depth: the import graph is only what can be recovered without a type system behind it, which is why a line read from imports is drawn solid and a line that is merely the scanner’s own grouping of file paths is drawn dashed.',
      verify: [
        'Point it at a repository you choose and watch the scan run with the network off.',
        'Open a finding and follow it down to the file and line it came from, and to the check that produced it.',
        'Turn the explanation layer off and re-run: the findings and the score are the same.',
        'Read the project map and check a solid line against an import that actually exists in the code.',
      ],
      limits:
        'Comprehension is deliberately unscored: each area reads “No evidence yet” until you answer for it. The real gap is the source, which is not public, so the determinism has to be taken on a walkthrough rather than read.',
    },
  },
  {
    slug: 'pact',
    name: 'Pact',
    year: 2026,
    status: 'prototype',
    oneLiner:
      'A responsive prototype for turning the agreements people make in conversation into structured, living records: plain language through negotiation and signature to obligations, amendments and evidence.',
    signature:
      'The Agreement Spine runs through every screen, from Draft to Review, Signed, Active and Complete, so the state of an agreement is legible without reading a document. A counterparty change arrives as an explicit, attributable diff. An amendment is added while the signed version stays as it was. Agreement Check raises completeness and clarity warnings, and stops short of implying legal validity. A counterparty reviews, negotiates and signs from a private link with nothing installed.',
    stack: ['Next.js 16', 'React 19', 'TypeScript'],
    tags: ['Web'],
    story: {
      forWho: 'people who agree things in conversation',
      steps: [
        { icon: 'pen', title: 'Write it plainly', text: 'Start the agreement in ordinary words.' },
        { icon: 'chat', title: 'Negotiate', text: 'The other side reviews it from a private link, nothing to install. Every change shows who made it.' },
        { icon: 'check', title: 'Sign', text: 'Both sides sign, from the same link.' },
        { icon: 'history', title: 'Keep it alive', text: 'Track what each side owes. Amendments are added; the signed version never changes.' },
      ],
      promises: [
        { icon: 'map', text: 'Its stage at a glance: draft, review, signed, active, complete' },
        { icon: 'shield', text: 'Flags gaps, without pretending to be legal advice' },
      ],
    },
  },
  {
    slug: 'quire',
    name: 'Quire',
    year: 2026,
    status: 'live',
    flagship: 1,
    featured: true,
    oneLiner:
      'A local-first thesis-production canvas for PhD researchers: source papers, highlights and your writing on one infinite canvas, connected by hand-drawn citation threads.',
    signature:
      'Dragging a thread from a source, or from a highlight inside it, onto a sentence is the citation, and it produces an inline footnote. Exports a properly cited .docx, LaTeX or PDF. Fully offline, no login, no cloud.',
    stack: ['React 19', 'TypeScript', 'Vite', 'React Flow', 'pdf.js', 'IndexedDB', 'Ollama'],
    tags: ['Web', 'Local-first', 'Research', 'AI'],
    story: {
      forWho: 'PhD researchers writing a thesis',
      before: 'Papers open in one window, the draft in another, and the link between them kept in your head until it gets lost.',
      after: 'Papers and writing on one canvas. Draw a line from a highlight to a sentence and the citation is done.',
      steps: [
        { icon: 'paper', title: 'Drop in your papers', text: 'PDFs sit on one big canvas beside your draft.' },
        { icon: 'highlight', title: 'Highlight what matters', text: 'Mark the passage you want to use.' },
        { icon: 'thread', title: 'Draw a thread', text: 'Drag from the highlight to your sentence. A footnote appears.' },
        { icon: 'download', title: 'Export', text: 'Out to Word, LaTeX or PDF with the citations in place.' },
      ],
      promises: [
        { icon: 'lock', text: 'No sign-up' },
        { icon: 'offline', text: 'Works with the internet off' },
        { icon: 'shield', text: 'Your thesis stays on your computer' },
      ],
    },
    caseStudy: {
      problem:
        'A PhD researcher writes with the sources open in one window and the draft in another. The link between a highlighted passage and the sentence it supports lives in the writer’s head until it is typed out as a citation, which is the point at which it gets lost or gets wrong.',
      role:
        'Solo build, end to end: the canvas and its connection model, the PDF reader and its highlight layer, the citation data model, local persistence, and the three exporters.',
      hard:
        'Making the gesture the citation. Dragging a thread from a highlight inside a source onto a sentence has to resolve to a stable reference to that passage, survive the source being moved or re-laid out on the canvas, and still come out as a correct inline footnote in three formats that each model footnotes differently.',
      decision:
        'Everything is kept in IndexedDB in the browser and the model runs locally through Ollama, rather than on a server with accounts and sync. That is what lets it open with no login and keep working offline, and it keeps an unfinished thesis off someone else’s disk. It costs sync: a library lives in one browser profile on one machine, and two people cannot work on the same canvas.',
      verify: [
        'Open the live canvas and drop in a PDF. Nothing asks you to sign in.',
        'Highlight a passage, drag a thread from the highlight onto a sentence, and read the inline footnote it produces.',
        'Export to .docx and open it in Word to see whether the footnote and the reference survive the round trip.',
        'Reload with the network off: the canvas, the sources and the highlights come back out of IndexedDB.',
        'Read the source on GitHub.',
      ],
      limits:
        'One machine, one browser profile, one person: no sync, no sharing, no collaborative editing. No thesis has been taken through it end to end, and nobody other than me has written in it.',
    },
    live: 'https://quire-three.vercel.app',
    source: 'https://github.com/foayenix/Quire',
  },
  {
    slug: 'sanko',
    name: 'Sanko',
    year: 2026,
    status: 'built',
    flagship: 3,
    statusNote:
      'The pilot is blocked on a Meta production number, so no practitioner is using it yet. A browser simulator runs the same agent loop, every tool call and its result shown beside the reply.',
    featured: true,
    oneLiner:
      'A WhatsApp agent that lets African traditional-medicine practitioners document herbal formulations and track the patients they treat, by text, voice note or photograph, in English, Yorùbá, Igbo, Hausa or Pidgin.',
    signature:
      'There are no keywords and no fixed conversation steps. An inbound message becomes content blocks and enters a Claude tool-calling loop with eleven tools, and every executor resolves records by short code scoped to the calling practitioner, so a hallucinated FM-00042 comes back as “not found” and never as another practitioner’s patient. Conversation memory is replayed for 24 hours, so the agent picks up mid-thought across restarts and redeploys, and rapid-fire messages are debounced into a single turn. Local plant names map to botanical Latin through a 152-entry Nigerian lookup. The evaluation set makes no model call until at least a hundred cases carry a practitioner’s approval, and an admin review, a correction row or a synthetic paraphrase does not count. With the pilot blocked on a Meta production number, a simulator serves the same agent loop in a browser, every tool call and its result shown beside the reply, so you can see that a formulation reached the vault.',
    stack: ['Node.js 20', 'Express', 'Supabase', 'Whisper', 'Claude', 'Railway'],
    stackNote:
      'The agent replaced this build’s own six keyword-driven flows; before those, an MVP on Python, Flask, Twilio and Airtable. The current code is private, so there is no source link: the public repository holds that first MVP, and not what is described here.',
    tags: ['WhatsApp', 'AI', 'Health', 'Social impact'],
    story: {
      forWho: 'African traditional-medicine practitioners',
      before: 'Remedies and patient histories kept on paper, in a language no form accepts, and lost when the paper is.',
      after: 'Kept safe by sending a WhatsApp message, in the practitioner’s own language.',
      steps: [
        { icon: 'chat', title: 'Send a message', text: 'Text, a voice note or a photo, on WhatsApp. No new app to learn.' },
        { icon: 'spark', title: 'The assistant understands', text: 'It reads the message and asks what it still needs.' },
        { icon: 'archive', title: 'It files the record', text: 'The remedy or the patient visit goes into the practitioner’s records.' },
        { icon: 'shield', title: 'Only theirs', text: 'Each practitioner can only ever reach their own records.' },
      ],
      promises: [
        { icon: 'language', text: 'English, Yorùbá, Igbo, Hausa, Pidgin' },
        { icon: 'mic', text: 'Voice notes understood' },
        { icon: 'globe', text: '152 local plant names translated' },
      ],
    },
    caseStudy: {
      problem:
        'A practitioner keeps formulations and patient histories on paper, in a language and a plant vocabulary a structured form will not accept. The record is the practice, and it is the part that does not survive.',
      role:
        'Solo build: the agent loop and its eleven tools, the executors and their scoping rules, the voice and image intake, the Nigerian plant-name lookup, the evaluation harness and its approval gate, and the browser simulator that stands in for the blocked pilot.',
      hard:
        'The invented identifier. There are no fixed steps, so the agent can produce a plausible record code like FM-00042 and ask for it. Every executor resolves records by short code scoped to the calling practitioner, so an invented code comes back as “not found” rather than as another practitioner’s patient. That scoping is a query predicate in the executor and not a line in the prompt, because a prompt is a request and a predicate is not.',
      decision:
        'No keywords and no fixed conversation steps: an inbound message becomes content blocks and enters a tool-calling loop. The alternative is the six keyword-driven flows this build replaced, which were predictable and could be tested exhaustively. The loop copes with a practitioner who says three things at once in two languages. What it costs is that the set of possible conversations is no longer enumerable, which is why an evaluation set exists at all and why it is gated behind practitioner approval.',
      verify: [
        'Run the browser simulator: every tool call and its result is shown beside the reply, so you can watch a formulation reach the vault.',
        'Send a made-up record code and check that it comes back as not found.',
        'Send a voice note in Yorùbá and read the transcription, the formulation extracted from it, and the botanical name it mapped to.',
        'Restart the service mid-conversation and carry on: memory is replayed for 24 hours.',
      ],
      limits:
        'No practitioner is using it; the pilot is blocked on a Meta production number. The evaluation set has not reached the hundred practitioner-approved cases it needs before it makes a single model call. The plant lookup is 152 Nigerian entries, so anything outside it gets no botanical mapping. The code is private, and the public repository holds the earlier Flask MVP rather than this.',
    },
  },
  {
    slug: 'tbot',
    name: 'tbot',
    year: 2026,
    status: 'built',
    featured: true,
    oneLiner:
      'A backtesting framework for an OANDA FX trading bot, built to replace a “vibes” always-in-market crossover bot that shipped live with no backtest behind it.',
    signature:
      'An explicit lookahead guard means a decision taken on bar t applies only to the t+1 return. Around it sit a chronological train/test split, walk-forward validation that reports a distribution of out-of-sample results instead of one headline number, and a spread-plus-slippage cost model. Reports are self-contained HTML with inline SVG charts: no charting library, safe to commit, opens offline.',
    stack: ['Python', 'requests', 'vectorised backtester'],
    tags: ['Tool', 'Finance'],
    story: {
      forWho: 'testing a currency-trading strategy',
      before: 'A trading bot went live with no testing behind it.',
      after: 'Every strategy is tested on past prices first, under rules that stop it cheating.',
      steps: [
        { icon: 'history', title: 'Replay the past', text: 'Run the strategy over historical prices.' },
        { icon: 'shield', title: 'No peeking ahead', text: 'A decision made today is only scored against tomorrow’s price.' },
        { icon: 'coin', title: 'Pay real costs', text: 'Every trade pays the spread and slippage it would pay for real.' },
        { icon: 'report', title: 'Read the report', text: 'A range of results on unseen data, not one flattering number.' },
      ],
      promises: [
        { icon: 'offline', text: 'Reports open offline' },
      ],
    },
    source: 'https://github.com/foayenix/tbot',
  },
  {
    slug: 'football-frenzy',
    name: 'Football Frenzy',
    year: 2026,
    status: 'built',
    statusNote:
      'No public source and no deployment. The engine claim below is the one worth checking, and checking it means a walkthrough rather than a link.',
    featured: true,
    oneLiner:
      'A fast five-a-side football sim with leagues, cups, momentum cards, training, a transfer market, seasons, wages and aging.',
    signature:
      'A deterministic, replayable match engine: every match is a snapshot pair, a seed and a decision log, and it re-simulates server-side from an identical prefix, so the server decides whether a mid-match card play was legal. Anonymous cookie-keyed worlds with recovery codes, friends’ leagues and cups via share codes, and a full economy with wages, aging and retirement.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PostgreSQL', 'HTML Canvas'],
    stackNote:
      'A 2025 build of the same idea took a different shape, a fantasy draft game on Express, Socket.IO and React. It is a separate codebase, and not an earlier commit of this one.',
    tags: ['Web', 'Game'],
    story: {
      forWho: 'football management fans',
      steps: [
        { icon: 'ball', title: 'Play a match', text: 'Fast five-a-side games.' },
        { icon: 'bolt', title: 'Play a card', text: 'Momentum cards mid-match. The server checks every play was fair.' },
        { icon: 'trophy', title: 'Win leagues and cups', text: 'Including against friends, joined with a share code.' },
        { icon: 'users', title: 'Run the club', text: 'Training, transfers and wages, while players age and retire.' },
      ],
      promises: [
        { icon: 'lock', text: 'No sign-up: a recovery code keeps your world' },
        { icon: 'repeat', text: 'Every match can be replayed exactly' },
      ],
    },
  },
  {
    slug: 'shelf',
    name: 'Shelf',
    year: 2026,
    status: 'built',
    oneLiner:
      'A personal reading library for saved Claude responses: keep what is worth keeping and read it later like a book, entirely offline.',
    signature:
      'Notes are plain Markdown files plus a single index.json, readable by any tool, with no database anywhere in the design, so the library outlives the app that made it. The Markdown is the source of truth and the index is not: an index that cannot be read is set aside under a timestamped name and rebuilt from the files, so nothing is overwritten on the way to recovery. Storage and capture live in a Swift package with a platform-independent test suite, and the Xcode project is generated from project.yml, because a committed .pbxproj is not reviewable. CI checks the App Store requirements on every build: the icon, both privacy manifests, and versions the app and its extension cannot disagree on. The optional iCloud mirror is file-based, newest file wins, with no CloudKit schema to outlive.',
    stack: ['Swift', 'SwiftUI', 'iOS 17+', 'XcodeGen', 'Share Extension'],
    tags: ['Mobile', 'Local-first', 'AI'],
    story: {
      forWho: 'people who save AI answers worth keeping',
      steps: [
        { icon: 'download', title: 'Save an answer', text: 'Keep a Claude response worth keeping.' },
        { icon: 'book', title: 'Read it later', text: 'Like a book, entirely offline.' },
        { icon: 'paper', title: 'Ordinary files', text: 'Every note is a plain text file that any app can open.' },
      ],
      promises: [
        { icon: 'offline', text: 'Works with the internet off' },
        { icon: 'archive', text: 'Your library outlives the app' },
      ],
    },
    source: 'https://github.com/foayenix/shelf',
  },
  {
    slug: 'bob',
    name: 'Bob',
    year: 2026,
    status: 'experiment',
    statusNote:
      'Every phase is built, and every regulation value and measurement convention is still blank pending verification. Nothing here has been signed off by an architect, a structural engineer or a building-control officer.',
    oneLiner:
      'An experiment asking whether software can produce residential construction output an architect, structural engineer or building-control officer would sign off on.',
    signature:
      'All seven phases are built: compliance checker, building model, quantity takeoff, cost estimate, layout generation, drawing output and the combined report. Every regulation value and measurement convention is left blank pending verification, so no unverified number ever reaches the output. Scope is fixed and stated: England only, two-storey detached masonry, cavity wall, concrete strip foundation.',
    stack: ['Python', 'CLI-first', 'read-only web surface'],
    tags: ['Tool', 'AI', 'Client'],
    story: {
      forWho: 'house-building in England (an experiment)',
      steps: [
        { icon: 'house', title: 'Describe the house', text: 'Two-storey, detached, brick and block, in England.' },
        { icon: 'shield', title: 'Check the rules', text: 'The design goes through the building-regulation checks. Each rule value stays blank until it is verified.' },
        { icon: 'coin', title: 'Count and cost it', text: 'Materials measured, then priced.' },
        { icon: 'ruler', title: 'Draw and report', text: 'Layouts, drawings and one combined report.' },
      ],
      promises: [
        { icon: 'blank', text: 'Leaves a number blank rather than guess it' },
      ],
    },
    live: 'https://bob-mu-livid.vercel.app',
    source: 'https://github.com/foayenix/Bob',
  },
  {
    slug: 'sett',
    name: 'SETT',
    year: 2026,
    status: 'live',
    oneLiner:
      'A calm, local-first record of everything you train. It keeps the log and leaves the coaching to you.',
    signature:
      'No streaks, badges, confetti or red dots. Start a lift you have done before and SETT ghosts the next set from your own history using one progression rule it can always show you: add 2.5 kg if you hit every rep last time, otherwise repeat. One transition dims the room as you enter the live set; everything else stays quiet.',
    stack: ['React', 'IndexedDB'],
    tags: ['Web', 'Local-first', 'Health'],
    story: {
      forWho: 'people who lift weights',
      before: 'Fitness apps chase you with streaks, badges, confetti and red dots.',
      after: 'A quiet log that tells you what to lift next, and shows you why.',
      steps: [
        { icon: 'weight', title: 'Start a lift', text: 'Pick an exercise you have done before.' },
        { icon: 'history', title: 'Get your next set', text: 'Hit every rep last time? Add 2.5 kg. If not, repeat it.' },
        { icon: 'check', title: 'Log it', text: 'The room dims while you lift. Everything else stays quiet.' },
      ],
      promises: [
        { icon: 'bell', text: 'No streaks, badges or nagging' },
        { icon: 'offline', text: 'Works with the internet off' },
      ],
    },
    live: 'https://sett-swart.vercel.app',
    source: 'https://github.com/foayenix/sett',
  },
  {
    slug: 'the-deposit-ledger',
    name: 'The Deposit Ledger',
    year: 2026,
    status: 'built',
    oneLiner:
      'An offline-first desktop application for logging daily research work and building a medicinal-plant materia medica corpus, in one SQLite file on one Mac.',
    signature:
      'Records form a single graph: a daily entry points at the monograph written that day, which carries sourced claims citing references, which feed the outputs published. Because they connect, one query answers which plants you have written about that have no human-trial evidence and that you have never published on. The migrations belong to the Python side and the Rust core never runs one. The frontend is vanilla DOM and hand-written CSS, held to a set of artboards that settle any disagreement between the build contract and the design. No server, no account, no sync, no second user.',
    stack: ['Tauri 2', 'Rust', 'rusqlite', 'TypeScript', 'Python 3.12', 'SQLite'],
    tags: ['Tool', 'Local-first', 'Research'],
    story: {
      forWho: 'a researcher writing about medicinal plants',
      steps: [
        { icon: 'pen', title: 'Log the day', text: 'A daily entry of the research done.' },
        { icon: 'leaf', title: 'Write up a plant', text: 'A write-up for each plant, every claim with its source.' },
        { icon: 'thread', title: 'Everything connects', text: 'Days, plants, sources and published work link together.' },
        { icon: 'search', title: 'Ask across it all', text: 'Which plants have I covered with no human trials, and never published on?' },
      ],
      promises: [
        { icon: 'offline', text: 'No internet, no account' },
        { icon: 'lock', text: 'One file, on one Mac' },
      ],
    },
    source: 'https://github.com/foayenix/tdl',
  },
  {
    slug: 'margin',
    name: 'margin',
    year: 2026,
    status: 'built',
    oneLiner: 'Time budgets, placed in advance, and a record of whether they happened.',
    signature:
      'Six targets across app, widgets, Live Activity, Dynamic Island and watch, with project.yml as the source of truth and the .xcodeproj generated from it. That keeps every target-membership decision reviewable: which files the widget can see, which the watch can, and where each App Group attaches. The engine’s test suite runs without a simulator.',
    stack: ['Swift', 'SwiftUI', 'WidgetKit', 'watchOS', 'Screen Time', 'XcodeGen'],
    tags: ['Mobile', 'Productivity'],
    story: {
      forWho: 'people who plan their time',
      steps: [
        { icon: 'calendar', title: 'Budget your time', text: 'Set time aside for things, in advance.' },
        { icon: 'phone', title: 'See it everywhere', text: 'In the app, on widgets, the lock screen, the Dynamic Island and the watch.' },
        { icon: 'check', title: 'Record what happened', text: 'Did the time you planned actually happen?' },
      ],
    },
    source: 'https://github.com/foayenix/margin',
  },
  {
    slug: 'fathom',
    name: 'Fathom',
    year: 2026,
    status: 'built',
    statusNote:
      'It runs against Supabase and the Messages API with my own keys. There is no hosted instance to open.',
    oneLiner:
      'A depth gauge for research comprehension: drop in a concept you do not fully grasp and it reads how deep you already are, sizes a session to close the gap, then tutors you through it.',
    signature:
      'The reading lands on a vertical gauge: Surface, Working, Deep, Fluent. The prompts are instructed to judge honestly and never to flatter, and each reading opens into a resumable Socratic session. Per-user row-level security, and a research map plotting every concept you have sounded. It is built to read as a scholarly instrument.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Anthropic Messages API'],
    tags: ['Web', 'AI', 'Research'],
    story: {
      forWho: 'researchers facing a hard concept',
      steps: [
        { icon: 'search', title: 'Drop in a concept', text: 'One you do not fully grasp yet.' },
        { icon: 'chart', title: 'See how deep you are', text: 'Surface, Working, Deep or Fluent. It judges honestly and never flatters.' },
        { icon: 'chat', title: 'Close the gap', text: 'A tutoring session sized to the gap, run by questions. Pick it up later.' },
        { icon: 'map', title: 'Map what you know', text: 'Every concept you have explored, on one map.' },
      ],
      promises: [
        { icon: 'lock', text: 'Your work is visible only to you' },
      ],
    },
    source: 'https://github.com/foayenix/fathom',
  },
  {
    slug: 'crescent-moon',
    name: 'Crescent Moon',
    year: 2026,
    status: 'client',
    statusNote:
      'The source is public. There is no deployment of mine to link, so this page cannot prove the site is running.',
    oneLiner:
      'A wine bar’s public site and the owner’s admin backend in a single application, replacing an old static site.',
    signature:
      'The homepage’s What’s On renders live from the database, so the owner’s edits appear without a redeploy and without a developer. Self-hostable on Coolify alongside self-hosted bookings and analytics, with a single bcrypt login and signed-cookie sessions, and no third-party auth dependency.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL'],
    tags: ['Web', 'Client'],
    story: {
      forWho: 'a wine bar and its owner',
      before: 'Every change to What’s On needed a developer and a redeploy.',
      after: 'The owner edits it, and the website updates straight away.',
      steps: [
        { icon: 'lock', title: 'The owner logs in', text: 'One private login.' },
        { icon: 'pen', title: 'Edit What’s On', text: 'Change the listings in the admin.' },
        { icon: 'globe', title: 'It is live', text: 'The homepage shows it at once. No developer involved.' },
      ],
      promises: [
        { icon: 'shield', text: 'Runs on servers the owner controls' },
      ],
    },
    caseStudy: {
      problem:
        'A wine bar had a static site, so every change to What’s On needed a developer and a redeploy. The owner needed to be able to change it without either.',
      role:
        'Solo build: the public site, the owner’s admin backend, the schema, the authentication, and the self-hosted deployment.',
      hard:
        'Authentication for exactly one person. A wine bar owner does not need a third-party identity provider, a cross-device reset flow, or a dependency that can change its pricing. It is a single bcrypt login and a signed-cookie session: a small amount of code to get exactly right instead of a large amount to configure and keep paying for.',
      decision:
        'The public site and the admin backend are one application reading one database, rather than a CMS sitting behind the site, which is why an edit appears without a redeploy. Self-hosting it on Coolify beside the bookings and the analytics keeps the running cost predictable and the data on infrastructure the owner controls. It costs the convenience of a managed platform, which is a real cost when the owner is not a developer.',
      verify: [
        'Read the source: the admin routes, the session handling and the schema are all in it.',
        'Change a What’s On row in the database and reload the homepage. No redeploy is involved.',
      ],
      limits:
        'There is no deployment I can link here, so this page cannot show the site running. It is built for a single administrator: a second login, and a record of who changed what, would both be new work.',
    },
    source: 'https://github.com/foayenix/CrMn',
  },
  {
    slug: 'study-local',
    name: 'study.local',
    year: 2026,
    status: 'built',
    oneLiner:
      'A local-first learning app: paste text, a PDF or a video link and a local model turns it into a structured study plan.',
    signature:
      'It generates modules and lessons, then auto-links concepts across every plan you own by embedding similarity: cosine at or above 0.85 merges, 0.70 to 0.85 relates. The result is a concept graph with XP, levels and streaks on top. Runs entirely on your machine with no accounts, no cloud and no telemetry, and ships a deterministic offline mock provider so the tests never call a model.',
    stack: ['Express', 'better-sqlite3', 'React', 'Vite', 'Ollama', 'Whisper'],
    tags: ['Web', 'Local-first', 'AI'],
    story: {
      forWho: 'people teaching themselves',
      steps: [
        { icon: 'paper', title: 'Paste anything', text: 'Text, a PDF or a video link.' },
        { icon: 'spark', title: 'Get a study plan', text: 'Modules and lessons, made by an AI running on your own computer.' },
        { icon: 'map', title: 'Ideas connect', text: 'Related ideas across all your plans are linked for you.' },
        { icon: 'trophy', title: 'Level up', text: 'Points, levels and streaks as you go.' },
      ],
      promises: [
        { icon: 'offline', text: 'No accounts, no cloud, no tracking' },
      ],
    },
    source: 'https://github.com/foayenix/node',
  },
  {
    slug: 'xbm',
    name: 'XBM',
    year: 2026,
    status: 'built',
    oneLiner:
      'A local, single-user tool that pulls your X bookmarks, enriches them, auto-tags them, and gives you a searchable web interface with a watch-later queue.',
    signature:
      'Each bookmark is enriched with thread text, article summaries and YouTube transcripts, auto-tagged with Claude, and indexed in full-text search. The sync resumes after a crash or a rate limit, and can run unattended on a schedule. Runs on your own machine with your own keys; there is no hosting, no account and no multi-user auth.',
    stack: ['Python', 'FastAPI', 'SQLite FTS5', 'Claude', 'OAuth 2.0 PKCE'],
    tags: ['Tool', 'Local-first', 'AI'],
    story: {
      forWho: 'people with too many X bookmarks',
      steps: [
        { icon: 'download', title: 'Pull your bookmarks', text: 'From X, picking up where it left off if interrupted.' },
        { icon: 'spark', title: 'Fill in the gaps', text: 'Adds the full thread, article summaries and video transcripts.' },
        { icon: 'tag', title: 'Tag them', text: 'Each bookmark is tagged for you by AI.' },
        { icon: 'search', title: 'Find and watch later', text: 'Search everything, with a watch-later queue.' },
      ],
      promises: [
        { icon: 'lock', text: 'Runs on your own computer' },
      ],
    },
    source: 'https://github.com/foayenix/XBM',
  },
  {
    slug: 'trueday',
    name: 'TrueDay',
    year: 2026,
    status: 'built',
    oneLiner:
      'A manual lock-screen accountability and time-tracking app with gentle nudges and a widget for your current and next activity.',
    signature:
      'Smart reflow with anchor blocks: fixed commitments stay put while flexible ones flow around them. An impromptu-task parser reads “Meeting 10:00 30m” as written. Clean architecture with functional Either error handling and around 39 unit tests across the parser, schedule and summary logic.',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Drift', 'home_widget'],
    tags: ['Mobile', 'Health', 'Productivity'],
    story: {
      forWho: 'people who want to keep to their plan',
      steps: [
        { icon: 'calendar', title: 'Plan the day', text: 'Fixed commitments stay put; flexible tasks flow around them.' },
        { icon: 'pen', title: 'Add things as they come', text: 'Type “Meeting 10:00 30m” and it understands.' },
        { icon: 'phone', title: 'Glance at the lock screen', text: 'A widget shows what you are on now, and what is next.' },
        { icon: 'nudge', title: 'Gentle nudges', text: 'A quiet reminder to stay accountable.' },
      ],
    },
    source: 'https://github.com/foayenix/trueday',
  },
  {
    slug: 'iris',
    name: 'Iris',
    year: 2025,
    status: 'built',
    oneLiner:
      'Turn a photograph of your iris into AI art while exploring wellness insights drawn from traditional iridology.',
    signature:
      'Guided capture runs real-time image-quality analysis: sharpness by Laplacian variance, plus glare and blur detection. Then iridology zone mapping in polar coordinates and art generation, all local-first, with GDPR and MHRA-compliant “not a medical device” wording in place of health claims. Built across seven phases with analytics and backup/restore.',
    stack: ['Flutter', 'Riverpod', 'Hive', 'Stability AI', 'TFLite'],
    tags: ['Mobile', 'AI', 'Health'],
    story: {
      forWho: 'the curious (wellness, not medicine)',
      steps: [
        { icon: 'camera', title: 'Photograph your eye', text: 'The app guides you, and checks the photo is sharp, without glare or blur.' },
        { icon: 'map', title: 'Map the zones', text: 'The iris is mapped to the zones of traditional iridology.' },
        { icon: 'spark', title: 'Make it art', text: 'Your iris, turned into an AI artwork.' },
      ],
      promises: [
        { icon: 'shield', text: 'Not a medical device, and says so' },
        { icon: 'lock', text: 'Kept on your device' },
      ],
    },
    source: 'https://github.com/foayenix/tbx-iris',
  },
  {
    slug: 'i-am',
    name: 'I AM',
    year: 2025,
    status: 'built',
    oneLiner:
      'A timed “I am…” riddle game with leaderboards, user-generated content and a rewarded-ads economy.',
    signature:
      'Answer matching tolerates typos and British or American spelling, so a right answer is never marked wrong on a technicality. User-submitted riddles pass SHA-256 and SimHash duplicate detection into a moderation queue, and the whole economy (timer, caps, coin values) is tunable from Remote Config. Monetisation is rewarded ads only, with daily caps.',
    stack: ['Flutter', 'Firebase', 'Remote Config', 'AdMob'],
    tags: ['Mobile', 'Game'],
    story: {
      forWho: 'riddle lovers',
      steps: [
        { icon: 'clock', title: 'Beat the clock', text: 'Solve the “I am…” riddle before time runs out.' },
        { icon: 'check', title: 'Fair answers', text: 'Typos and British or American spelling still count.' },
        { icon: 'trophy', title: 'Climb the leaderboard', text: 'See how you rank.' },
        { icon: 'pen', title: 'Write your own', text: 'Submitted riddles are checked for repeats, then moderated.' },
      ],
      promises: [
        { icon: 'coin', text: 'Ads only when you choose to watch one' },
      ],
    },
    source: 'https://github.com/foayenix/tbx-iam',
  },
  {
    slug: 'bishop',
    name: 'Bishop',
    year: 2025,
    status: 'built',
    oneLiner:
      'An AI inbox manager that connects to Gmail, cleans and sorts mail, and visualises where your inbox goes.',
    signature:
      'Syncs the last 90 days over Gmail OAuth, classifies into Finance, Promo, Social, Important and Personal, flags the mail that needs a reply, and drives a dashboard of volume, categories and top senders with bulk actions and background incremental sync.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth v5', 'Gmail API', 'Recharts'],
    tags: ['Web', 'AI', 'Tool'],
    story: {
      forWho: 'people drowning in email',
      steps: [
        { icon: 'mail', title: 'Connect Gmail', text: 'It reads your last 90 days of mail.' },
        { icon: 'tag', title: 'Sort it', text: 'Finance, Promo, Social, Important and Personal.' },
        { icon: 'nudge', title: 'Flag what needs a reply', text: 'The mail waiting on you, picked out.' },
        { icon: 'chart', title: 'See where it goes', text: 'Volume, categories and top senders, with bulk clean-up.' },
      ],
    },
    source: 'https://github.com/foayenix/bishop-abc1',
  },
  {
    slug: 'ai-engineering-commons',
    name: 'AI Engineering Commons',
    year: 2025,
    status: 'built',
    oneLiner: 'A community knowledge hub for AI and ML engineering with reputation-based governance.',
    signature:
      'Five-tier weighted voting with role weights from 1 to 16, automatic promotion at reputation thresholds, and an approval gate that needs both a weighted score and reviewer sign-off before an article publishes. Articles are MDX with full version history, and citations between them build a knowledge graph.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'shadcn/ui', 'NextAuth', 'PostgreSQL', 'Prisma', 'MDX'],
    tags: ['Web', 'Community'],
    story: {
      forWho: 'AI and machine-learning engineers',
      steps: [
        { icon: 'pen', title: 'Write an article', text: 'Share what you know.' },
        { icon: 'users', title: 'Peers vote', text: 'Votes count for more as a member’s reputation grows.' },
        { icon: 'check', title: 'Approved to publish', text: 'It needs enough votes and a reviewer’s sign-off.' },
        { icon: 'map', title: 'Knowledge connects', text: 'Articles cite each other, building a map of the field.' },
      ],
      promises: [
        { icon: 'history', text: 'Every version kept' },
      ],
    },
    source: 'https://github.com/foayenix/blog-aieng',
  },
  {
    slug: 'fast-journal',
    name: '30-Day Fast Journal',
    year: 2026,
    status: 'built',
    oneLiner: 'A minimal, offline-first daily check-in app for a 30-day fasting challenge.',
    signature:
      'A weighted momentum score across water, workout, study and reading, and a smart-prompt priority chain that changes the journal question depending on how the day went. Entirely local: no backend, no auth, no network call anywhere.',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    tags: ['Mobile', 'Local-first', 'Health'],
    story: {
      forWho: 'people doing a 30-day fast',
      steps: [
        { icon: 'check', title: 'Check in daily', text: 'Water, workout, study and reading.' },
        { icon: 'chart', title: 'Watch your momentum', text: 'One score for how the days are going.' },
        { icon: 'pen', title: 'Answer one question', text: 'The journal question changes with how the day went.' },
      ],
      promises: [
        { icon: 'offline', text: 'No account, no internet needed' },
      ],
    },
    source: 'https://github.com/foayenix/journal-ramadan',
  },
  {
    slug: 'dansville-catering',
    name: 'Dansville Catering',
    year: 2026,
    status: 'client',
    statusNote:
      'Deployed and open at the link below.',
    oneLiner:
      'A one-page site for a family-run Nigerian and intercontinental caterer in Colchester.',
    signature:
      'Static HTML with no framework, no build server and no dependency to rot: open index.html and it works. Self-hosted webfonts totalling 64 KB, a responsive image set generated from the original photographs by a small build script, and a vendored design system kept as tokens so the page layer never hard-codes a value.',
    stack: ['HTML', 'CSS', 'design tokens', 'Python build script'],
    tags: ['Web', 'Client'],
    story: {
      forWho: 'a family-run caterer in Colchester',
      steps: [
        { icon: 'globe', title: 'One page', text: 'A Nigerian and intercontinental caterer, on a single page.' },
        { icon: 'bolt', title: 'Loads fast', text: 'Light fonts, and photos sized for every screen.' },
        { icon: 'shield', title: 'Nothing to go stale', text: 'Plain web pages: no framework or server to keep updated.' },
      ],
    },
    live: 'https://dv-1.vercel.app',
    source: 'https://github.com/foayenix/dv-1',
  },
  {
    slug: 'arena-lounge',
    name: 'Arena Lounge',
    year: 2026,
    status: 'client',
    statusNote:
      'Built to be handed over and edited without a developer. There is no deployment of mine to link.',
    oneLiner: 'A restaurant site for Arena Lounge, built to be handed over and edited without a developer.',
    signature:
      'The entire menu lives in one data file and the contact details sit at the top of one page component, so the owner edits content in two known places. No environment variables and no database; it deploys as-is.',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    tags: ['Web', 'Client'],
    story: {
      forWho: 'a restaurant and its owner',
      steps: [
        { icon: 'paper', title: 'Menu in one file', text: 'The whole menu lives in one place.' },
        { icon: 'phone', title: 'Contacts in one place', text: 'The contact details sit together, at the top of one page.' },
        { icon: 'globe', title: 'Goes live as it is', text: 'No database and no settings to configure.' },
      ],
    },
    source: 'https://github.com/foayenix/arena-opai',
  },
  {
    slug: 'plave',
    name: 'Plave',
    year: 2025,
    status: 'built',
    statusNote:
      'No public source and no deployment to link.',
    oneLiner:
      'A wishlist planner that turns saved links into a plan: log savings, watch a progress ring fill, and get a forecast of the month each goal lands at your pace.',
    signature:
      'Friends reserve gifts and the list owner never learns which. A row-level security policy in the database is what keeps it that way, so the interface has nothing to leak. A Save to Plave bookmarklet scrapes name, image and price off any shop page. Installable, offline, and registered as an Android share target.',
    stack: ['React 18', 'Vite', 'React Router', 'Supabase', 'PWA'],
    tags: ['Web', 'Consumer', 'PWA'],
    story: {
      forWho: 'people saving up for things they want',
      steps: [
        { icon: 'download', title: 'Save a link', text: 'One button grabs the name, picture and price from any shop.' },
        { icon: 'coin', title: 'Log your savings', text: 'A ring fills as you go.' },
        { icon: 'calendar', title: 'See when', text: 'A forecast of the month you get there, at your pace.' },
        { icon: 'gift', title: 'Share with friends', text: 'Friends reserve gifts, and you never find out which.' },
      ],
      promises: [
        { icon: 'offline', text: 'Installs like an app, works offline' },
        { icon: 'lock', text: 'Surprises protected by the database itself' },
      ],
    },
  },
  {
    slug: 'housemate',
    name: 'HouseMate',
    year: 2025,
    status: 'built',
    oneLiner: 'A household-management app that replaces WhatsApp chaos for shared houses.',
    signature:
      'Automated weekly bin-rota rotation with swaps and reminders, photo-based maintenance reporting with status tracking, property-scoped group chat, and visitor logging. Landlords and tenants each get their own flows, not one screen with parts hidden.',
    stack: ['Flutter', 'Riverpod', 'Firebase', 'Hive', 'go_router'],
    tags: ['Mobile', 'Consumer'],
    story: {
      forWho: 'shared houses, tenants and landlords',
      before: 'House admin lost in a WhatsApp group.',
      after: 'Bins, repairs, chat and visitors, each in its own place.',
      steps: [
        { icon: 'repeat', title: 'Bin rota', text: 'Rotates every week, with swaps and reminders.' },
        { icon: 'camera', title: 'Report a repair', text: 'Snap a photo and follow its progress.' },
        { icon: 'chat', title: 'House chat', text: 'One group chat per property.' },
        { icon: 'users', title: 'Log visitors', text: 'Keep a record of who visits.' },
      ],
      promises: [
        { icon: 'users', text: 'Separate views for landlords and tenants' },
      ],
    },
    source: 'https://github.com/foayenix/tbx-binap',
  },
  {
    slug: 'pal',
    name: 'PAL',
    year: 2025,
    status: 'built',
    oneLiner: 'A gym companion: photograph a machine and get instant guidance on how to use it.',
    signature:
      'The recognition service sits behind a clean interface so a mock can be swapped for a hosted model or on-device TFLite without touching the app. Fifteen equipment types, each with step-by-step form, target muscles, safety notes and the mistakes people commonly make.',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Firebase'],
    tags: ['Mobile', 'AI'],
    story: {
      forWho: 'gym-goers unsure of a machine',
      steps: [
        { icon: 'camera', title: 'Photograph the machine', text: 'Point your phone at it.' },
        { icon: 'search', title: 'Identify it', text: 'It matches the photo to one of 15 types of equipment.' },
        { icon: 'weight', title: 'Learn to use it', text: 'Step-by-step form, the muscles it works, safety notes and common mistakes.' },
      ],
    },
    source: 'https://github.com/foayenix/pal-t1',
  },
  {
    slug: 'edo',
    name: 'EDO',
    year: 2025,
    status: 'built',
    oneLiner:
      'An agent that tests a website like a real user before launch, then upgrades its SEO into readiness for AI search.',
    signature:
      'It simulates a visitor clicking every page, form and button to surface broken flows, audits Core Web Vitals, accessibility and SEO, then scores each page on its likelihood of appearing in AI overviews and hands back a step-by-step upgrade plan to act on.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Zustand', 'Zod'],
    tags: ['Web', 'AI', 'Tool'],
    story: {
      forWho: 'website owners before launch',
      steps: [
        { icon: 'search', title: 'Visits like a person', text: 'Clicks every page, form and button.' },
        { icon: 'shield', title: 'Finds what is broken', text: 'Broken journeys, speed, accessibility and search basics.' },
        { icon: 'chart', title: 'Scores for AI search', text: 'How likely each page is to appear in AI answers.' },
        { icon: 'report', title: 'Hands you a plan', text: 'Step by step, what to fix.' },
      ],
    },
    source: 'https://github.com/foayenix/s',
  },
  {
    slug: 'uspace',
    name: 'USPACE',
    year: 2025,
    status: 'built',
    oneLiner:
      'A WhatsApp tool that rewrites the heated message you are about to send into calmer alternatives. It is a writing tool, not therapy.',
    signature:
      'You send the message you were thinking of sending, choose Pause, Explain, Apologise or Boundary, and get three calmer options. It never messages the other person; you stay in control of sending. A keyword safety classifier routes self-harm, threat and abuse language to helplines, phone numbers are SHA-256 hashed, and /delete wipes everything.',
    stack: ['Node.js', 'TypeScript', 'Express', 'WhatsApp Cloud API', 'Prisma', 'Zod'],
    tags: ['WhatsApp', 'AI', 'Health'],
    story: {
      forWho: 'anyone about to send a message they may regret',
      steps: [
        { icon: 'chat', title: 'Send it here first', text: 'The message you were about to send, on WhatsApp.' },
        { icon: 'tag', title: 'Pick a goal', text: 'Pause, Explain, Apologise or Boundary.' },
        { icon: 'spark', title: 'Get three calmer versions', text: 'You choose which, if any, to send.' },
        { icon: 'check', title: 'You stay in control', text: 'It never messages the other person.' },
      ],
      promises: [
        { icon: 'heart', text: 'Points to helplines when someone is at risk' },
        { icon: 'bin', text: 'One command deletes everything' },
      ],
    },
    source: 'https://github.com/foayenix/ema_c',
  },
  {
    slug: 'sana',
    name: 'SANA',
    year: 2025,
    status: 'built',
    oneLiner:
      'A dual-sided wellness platform connecting people with credible complementary-medicine practitioners, and measuring whether the treatment worked.',
    signature:
      'Ten named models carry the product, where one recommendation endpoint would have done: credential vetting that checks a practitioner’s qualification against the awarding institution, safety triage that detects a crisis before a match is made, and an outcome-uplift model using Thompson sampling to learn which interventions help. Outcomes are recorded on instruments a clinician already recognises: WHO-5, DASS-21 and VAS. Around that sit practice management and scheduling, marketplace discovery, Stripe payments and payouts, wearable integrations, an embeddable booking widget, and an enterprise tier with FHIR and multi-tenancy.',
    stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'pgvector', 'Flutter', 'Stripe'],
    stackNote: 'An earlier MVP of the same platform was built on NestJS, Prisma and Flutter.',
    tags: ['Web', 'Mobile', 'AI', 'Health'],
    story: {
      forWho: 'people seeking complementary therapy, and practitioners',
      steps: [
        { icon: 'shield', title: 'Vetted practitioners', text: 'Qualifications checked with the institution that awarded them.' },
        { icon: 'heart', title: 'Safety first', text: 'A crisis is spotted before any match is made.' },
        { icon: 'calendar', title: 'Find, book and pay', text: 'In one place, for both sides.' },
        { icon: 'chart', title: 'Did it help?', text: 'Progress measured on questionnaires clinicians already use, and it learns what works.' },
      ],
      promises: [
        { icon: 'users', text: 'Built for clients and practitioners alike' },
      ],
    },
    source: 'https://github.com/foayenix/sana-abc3',
  },
  {
    slug: 'five-days',
    name: 'Five Days',
    year: 2026,
    status: 'built',
    statusNote:
      'A private page, so there is no live link and no way to open it from here.',
    oneLiner:
      'A private five-day itinerary page, compiled from a design canvas file instead of maintained as markup.',
    signature:
      'The canvas file is the source of truth and cannot be served, because it depends on a runtime that exists only inside the editor. A build script lifts its helmet into the head, its canvas markup into the body, and shims the one logic component to run in an ordinary browser. The plan is edited where it was designed, and the site is a build artefact. Query-string switches render the page as though it were any given date, so the whole thing can be checked without waiting for the calendar, and a missing photograph degrades to a gradient panel instead of a broken image. No framework and no dependencies.',
    stack: ['Node', 'static HTML', 'Vercel'],
    tags: ['Web', 'Tool'],
    story: {
      forWho: 'one private five-day trip',
      steps: [
        { icon: 'pen', title: 'Plan it as a design', text: 'The itinerary is laid out on a design canvas.' },
        { icon: 'bolt', title: 'Turn it into a page', text: 'A script turns the design into an ordinary web page.' },
        { icon: 'calendar', title: 'Check any day', text: 'Preview the page as it looks on any date of the trip.' },
      ],
      promises: [
        { icon: 'shield', text: 'A missing photo shows a colour panel, not a broken image' },
      ],
    },
    source: 'https://github.com/foayenix/30-sec-wknd',
  },
]

export const TAG_ORDER = [
  'Web', 'Mobile', 'AI', 'Local-first', 'Tool', 'Game', 'Client',
  'WhatsApp', 'Health', 'Research', 'Productivity', 'Consumer',
  'PWA', 'Community', 'Finance', 'Social impact',
]

export const ALL_TAGS = TAG_ORDER.filter((t) => PROJECTS.some((p) => p.tags.includes(t)))

export const FEATURED = PROJECTS.filter((p) => p.featured)

/**
 * The three builds the homepage leads with, in the order it shows them.
 * Reordering the lead is a one-line change: move the `flagship` numbers.
 */
export const FLAGSHIPS = PROJECTS.filter((p) => p.flagship).sort(
  (a, b) => a.flagship! - b.flagship!,
)

/** What a visitor can open or read without asking me for anything. */
export const COUNTS = {
  builds: PROJECTS.length,
  source: PROJECTS.filter((p) => p.source).length,
  live: PROJECTS.filter((p) => p.live).length,
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
