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

/**
 * Why a finished build has no link, where the reason is somebody else.
 *
 * This is a separate axis from `status`, deliberately. Status says how far a
 * build got; these builds got all the way. What stops them being openable is
 * not the state of the code, it is that the page carries a real person’s name,
 * address or plans — an invitation, a guest list, an itinerary — and that is
 * theirs to release rather than mine.
 *
 * Where this is set, no `live` and no `source` is rendered, because a link to
 * the file is the publication. Withholding the deployment while linking the
 * repository that holds the same HTML would be a gesture rather than a
 * decision.
 */
export const WITHHELD = {
  label: 'Link withheld',
  blurb:
    'Finished, and deliberately not published. The page carries someone else’s name, address or plans, and releasing that is theirs rather than mine. The source is not linked either: a link to the file is the publication.',
}

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

/**
 * An isometric figure in public/figures/, drawn with the Anatomy skill.
 *
 * A figure is not decoration and not a diagram of boxes and arrows: it invents
 * a real machine whose working is the idea, so the reader understands the
 * argument by recognising the mechanism. Three builds carry one, because three
 * is what could be drawn to this standard rather than an arbitrary cut.
 */
export type Figure = {
  /** The basename in public/figures, without the -light suffix. */
  name: string
  /** What the figure shows, for anyone who cannot see it. */
  alt: string
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
  figure?: Figure
  /**
   * Whose privacy costs this entry its link, in one line. Set this and no
   * `live` and no `source` is rendered for the build, whatever they hold.
   */
  withheld?: string
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
    figure: {
      name: 'proper',
      alt: 'A profile bench. One rail carries two carriages with a stop bolted across it and braced to the base. The left carriage reads a workpiece of seven segments and drops a token into a numbered well for each one; rigid tie-rods join some segments and slack dashed chains hang between others. The right carriage carries a pen over a ruled card and runs into the stop, so it can never reach a well.',
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
    figure: {
      name: 'quire',
      alt: 'A bookbinder’s sewing frame. A needle carriage rides a rail over a stack of source leaves marked with three highlighted columns and a ruled draft leaf. Where the needle stops over a column it descends and leaves a thread running from that column to a marked sentence in the draft, and a dial on the right post counts the threads sewn.',
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
      'There are no keywords and no fixed conversation steps. An inbound message becomes content blocks and enters a tool-calling loop with twenty-two tools, and every executor resolves records by short code scoped to the calling practitioner, so a hallucinated FM-00042 comes back as “not found” and never as another practitioner’s patient. Conversation memory is replayed for 24 hours, so the agent picks up mid-thought across restarts and redeploys, and rapid-fire messages are debounced into a single turn. Local plant names map to botanical Latin through a 152-entry Nigerian lookup. The evaluation set makes no model call until at least a hundred cases carry a practitioner’s approval, and an admin review, a correction row or a synthetic paraphrase does not count. With the pilot blocked on a Meta production number, a simulator serves the same agent loop in a browser, every tool call and its result shown beside the reply, so you can see that a formulation reached the vault.',
    stack: ['Node.js 20', 'Express 5', 'Supabase', 'PostgreSQL', 'Ollama', 'Whisper', 'Claude'],
    stackNote:
      'The agent replaced this build’s own six keyword-driven flows; before those, an MVP on Python, Flask, Twilio and Airtable. The model layer takes either backend: a local Ollama server running qwen2.5:32b is the default, and Anthropic is the alternative, so where a practitioner’s message goes is a configuration fact and not a claim this page can make for you. Three earlier repositories survive as lineage rather than as the build: foayenix/sanko (the Flask MVP), foayenix/sanko-mvpp (the Node keyword bot) and foayenix/sanko-web (the first public page).',
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
        'Solo build: the agent loop and its twenty-two tools, the executors and their scoping rules, the voice and image intake, the Nigerian plant-name lookup, the evaluation harness and its approval gate, and the browser simulator that stands in for the blocked pilot.',
      hard:
        'The invented identifier. There are no fixed steps, so the agent can produce a plausible record code like FM-00042 and ask for it. Every executor resolves records by short code scoped to the calling practitioner, so an invented code comes back as “not found” rather than as another practitioner’s patient. That scoping is a query predicate in the executor and not a line in the prompt, because a prompt is a request and a predicate is not.',
      decision:
        'No keywords and no fixed conversation steps: an inbound message becomes content blocks and enters a tool-calling loop. The alternative is the six keyword-driven flows this build replaced, which were predictable and could be tested exhaustively. The loop copes with a practitioner who says three things at once in two languages. What it costs is that the set of possible conversations is no longer enumerable, which is why an evaluation set exists at all and why it is gated behind practitioner approval.',
      verify: [
        'Run the browser simulator: every tool call and its result is shown beside the reply, so you can watch a formulation reach the vault.',
        'Send a made-up record code and check that it comes back as not found.',
        'Send a voice note in Yorùbá and read the transcription, the formulation extracted from it, and the botanical name it mapped to.',
        'Restart the service mid-conversation and carry on: memory is replayed for 24 hours.',
        'Read src/agent/tools.js for all twenty-two tools, and the executors beside it for the scoping predicate that makes an invented code fail.',
      ],
      limits:
        'No practitioner is using it; the pilot is blocked on a Meta production number. The evaluation set has not reached the hundred practitioner-approved cases it needs before it makes a single model call. The plant lookup is 152 Nigerian entries, so anything outside it gets no botanical mapping. The simulator is password-protected, because it writes to the live database and spends credits, so the source is what an outside reader can actually check.',
    },
    figure: {
      name: 'sanko',
      alt: 'A sorting gate. A hopper takes a letter slot, a microphone and a lens into one throat; an index wheel of twenty-two toothed stations sits on the left post. A lid over a cabinet of three drawers is cut through above each drawer and solid and hatched above a fourth station. A card on a carriage drops through a hole into its drawer, and at the fourth station it cannot pass and slides down a stepped chute into a tray.',
    },
    source: 'https://github.com/foayenix/sanko-core',
  },
  {
    slug: 'ybs',
    name: 'Yemkem Branch Stock and Sales',
    year: 2026,
    status: 'built',
    featured: true,
    statusNote:
      'Phase 1 is built and the source is public. No branch is running on it: the WhatsApp receipt channel is waiting on Meta approval, and the seeded sign-ins are development-only and never deployed.',
    oneLiner:
      'A stock and sales system for a Nigerian herbal-medicine manufacturer and its branches, run from staff phones that keep working with no signal and that are never told what the books expect them to find.',
    signature:
      'Blind counting is enforced by the architecture, not by policy. A branch or store phone is never sent stock-on-hand or an expected cash figure, so somebody counting a till or a shelf has nothing to reconcile towards and a count cannot be quietly made to agree. Differences are computed on the server only after the declaration is locked; offline, the phone says the differences will appear when the count reaches the office rather than showing a number it should not have. The ledger is append-only and SQL enforces it, so a correction is a new signed row carrying a reason and an approver and never an edit over the top of the old one. Eighteen migrations carry the schema, the rules, row-level read access and the sync handlers. SQL is the authority; the TypeScript copy in packages/domain exists only so a phone can preview a rule offline, and both are tested against the same vectors. Record references are composed per phone, so S-OJT1-0143 cannot collide with a reference another phone invented while both were offline, and the sync flags the clock offset it measured and any impossible ordering instead of trusting the handset’s own clock.',
    stack: ['TypeScript', 'Supabase', 'PostgreSQL', 'PWA', 'Playwright', 'Cloudflare Workers'],
    stackNote:
      'A wrangler.jsonc is committed, serving the built app as static assets from Cloudflare with single-page fallback, so the hosting decision is made and reviewable rather than pending.',
    tags: ['Web', 'PWA', 'Tool', 'Client', 'Local-first'],
    story: {
      forWho: 'a manufacturer and its shop branches',
      before: 'Stock and takings kept on paper, and a count that can be made to agree with whatever the office expects.',
      after: 'Every sale, delivery and count recorded on a phone that works with no signal, and no way to fudge a count.',
      steps: [
        { icon: 'phone', title: 'Record it on the phone', text: 'Sales, deliveries and stock counts, with or without a signal.' },
        { icon: 'lock', title: 'Count blind', text: 'The phone never shows what the office expects, so a count cannot be nudged to match.' },
        { icon: 'check', title: 'Lock the declaration', text: 'Once it is locked, the server works out the difference.' },
        { icon: 'shield', title: 'Nothing is overwritten', text: 'A mistake is corrected by a new signed entry with a reason, not by changing the old one.' },
      ],
      promises: [
        { icon: 'offline', text: 'Works with no signal' },
        { icon: 'archive', text: 'Nothing is ever edited away' },
      ],
    },
    caseStudy: {
      problem:
        'A manufacturer sells through branches it cannot stand in. The records that matter — what sold, what arrived, what is on the shelf, what is in the till — are produced by the same people the records are there to check, on phones that spend part of the day with no signal.',
      role:
        'Solo build: the schema and its eighteen migrations, the append-only enforcement and row-level read access, the rule engine in SQL with its offline TypeScript twin, the sync handlers, the phone app, and the test vectors both sides are held to.',
      hard:
        'A phone that cannot be trusted with the answer. Sending a branch its expected stock or cash makes every count a reconciliation, and a reconciliation can be made to agree. Withholding it breaks the design’s own comparison screens, which showed differences on the phone before the count was locked. The resolution puts the lock first: counts are declared, then the server returns the differences in one round trip for a read-only view, and offline the copy promises the differences later instead of inventing them. The phones are never sent stock-on-hand at all.',
      decision:
        'SQL is the authority for every rule, and the TypeScript domain package is a copy used only for offline previews. The alternative — one shared rule module both sides import — would mean a single definition to maintain. It was rejected because the phone is the one place the rules cannot be enforced: a handset that can decide a rule can be made to decide it differently. The cost is two implementations of the same arithmetic, which is why the test vectors in tests/vectors are run against both the TypeScript and the SQL.',
      verify: [
        'Run pnpm db:start and pnpm test: the domain tests, the rule tests against the local API with real user tokens, and the browser tests at 360 by 760.',
        'Read the append-only enforcement in supabase/migrations and try an UPDATE against a ledger row.',
        'Read DECISIONS.md: every conflict between the spec, the brief and the designs is listed with the call made and whether it is still open.',
        'Sign in on a seeded phone number, then watch the first sign-in be refused until the phone is approved.',
      ],
      limits:
        'Phase 1. No branch is using it, and the seed data is for local development only. The WhatsApp receipt says queued rather than sent, because that channel is a later milestone waiting on Meta. A split payment is limited to cash plus one other method. Several decisions in DECISIONS.md are still marked as needing an answer.',
    },
    source: 'https://github.com/foayenix/ybs',
  },
  {
    slug: 'pank',
    name: 'Pank',
    year: 2026,
    status: 'built',
    statusNote:
      'A single-owner application with no sign-up page and no public deployment, so there is nothing here to open. The source is private.',
    oneLiner:
      'A private money plan: income, payslips, bills, credit cards and debts turned into a dated forecast of what you can put towards a large purchase, when you could afford it, and how much you can pay yourself each week.',
    signature:
      'Every amount is computed deterministically in integer pence on Europe/London calendar dates, and no model produces any figure or any date — the one place a model is used is reading an uploaded payslip, and what it extracts is shown beside the original for you to confirm before it counts. The app records what you do and never moves money: nothing on screen implies it can, so the Activity page is a checklist of payments to make yourself and a place to record that you made them. There is no bank connection and no sign-up; a single allowlisted owner is checked on every request against a scrypt hash, and document links are signed and expire in five minutes. Payoff estimates are labelled as estimates, and a stale balance is shown as stale rather than quietly used.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'SQLite', 'pdf.js', 'Zod', 'Vitest', 'Playwright'],
    stackNote:
      'better-sqlite3 and the upload worker live in one process, so it is deliberately a single-instance application rather than something that scales horizontally.',
    tags: ['Web', 'Local-first', 'Finance', 'Productivity'],
    story: {
      forWho: 'one person planning their own money',
      before: 'A large purchase you cannot date, and a weekly allowance you are guessing at.',
      after: 'A dated plan: what you can set aside, the earliest you could buy, and what you can pay yourself this week.',
      steps: [
        { icon: 'pen', title: 'Enter what is true', text: 'Accounts, income, bills and debts. Balances are typed in, not pulled from a bank.' },
        { icon: 'paper', title: 'Add a payslip', text: 'Upload it and check what was read off it against the original before it counts.' },
        { icon: 'calendar', title: 'See the dated plan', text: 'A forecast by date, with the earliest you could afford the thing you are saving for.' },
        { icon: 'check', title: 'Record what you did', text: 'A checklist of payments to make yourself, and a place to tick them off.' },
      ],
      promises: [
        { icon: 'lock', text: 'No bank connection' },
        { icon: 'blank', text: 'No figure or date is produced by AI' },
        { icon: 'shield', text: 'It never moves money' },
      ],
    },
    caseStudy: {
      problem:
        'Budgeting tools answer what you spent. The question that decides a large purchase is a different one: given the pay dates, the bills, the statement minimums and the promotional APR windows actually in front of you, what is the earliest date this is affordable, and what can you pay yourself in the meantime without breaking it.',
      role:
        'Solo build: the deterministic forecast engine, the pay-cycle allocation and weekly allowance, the debt model with its APR segments and promotions, the payslip upload and review flow, the single-owner session layer, and the export, restore and delete paths.',
      hard:
        'Money arithmetic that cannot drift. Every amount is an integer number of pence and every date is resolved on the Europe/London calendar, so a forecast does not slide by a day across a clock change or lose a penny to a rounded division. The payslip reader is the one component that is allowed to be wrong, which is why its output is never used until it has been confirmed against the image beside it.',
      decision:
        'No bank connection, and no AI anywhere near an amount or a date. The alternative is open banking, which would remove the typing and keep balances fresh. It was rejected because this is a single-owner app holding payslips, and a bank credential is a far larger thing to protect than a typed number. The cost is real: balances go stale, and the app has to show that staleness on the Today page rather than pretend the figure is current.',
      verify: [
        'Turn on the fictional sample data from Settings and upload fixtures/sample-payslip.pdf: the review screen shows every extracted value beside the original.',
        'Read the forecast code and check that amounts are integer pence throughout.',
        'Export to JSON and CSV, delete everything, and restore it.',
        'Look for a sign-up page: there is none. The owner is a single allowlisted address checked on every request.',
      ],
      limits:
        'One owner, one instance, no sync and no second user. Balances are manual, so they are only as fresh as the last time they were typed. Payoff figures are estimates and are labelled as such. The source is private, so none of the above can be read from outside.',
    },
  },
  {
    slug: 'jibewa',
    name: 'JÍBẸ́WÀ',
    year: 2026,
    status: 'built',
    statusNote:
      'The software runs, in a browser and on a Raspberry Pi 5. The device itself is at CAD-draft stage, so there is no hardware to hold. The repository is private.',
    oneLiner:
      'The software for a bedside clock with a long bar display and one physical dial, where every theme is a generative world and the dial pushes, swirls and bends it rather than just scrolling a menu.',
    signature:
      'Themes draw on the 2D canvas, and where WebGL2 exists the frame is finished on the GPU: particles accumulate additively in floating point so a dense cluster becomes a real light source instead of clipping to white, then a threshold, a thirteen-tap downsample chain and a tent-filter upsample put a scattering bloom over it — the bloom chain modern games use, running on a Pi. Nothing about that is load-bearing for the clock: ?gl=0 forces the 2D renderer and the clock still tells the time. A developer panel runs the night at sixty or six hundred times speed, so wind-down, sleep, sunrise, alarm, snooze and dismiss can be watched in about a minute instead of overnight, and the Demo plays the same night with captions in two minutes and puts the clock, alarm and settings back exactly as they were. The first start plays a welcome that says good morning in sixteen languages; on the Pi a boot splash carries its first point of light from power-on, so the device never shows a console.',
    stack: ['JavaScript', 'WebGL2', 'Canvas 2D', 'Raspberry Pi 5', 'CAD'],
    stackNote:
      'No build step and no framework: the software opens from software/index.html in a browser. The repository also carries the CAD drafts, hardware notes and a dated project archive that keeps superseded versions with their status and assumptions written down.',
    tags: ['Consumer', 'Design', 'Local-first'],
    story: {
      forWho: 'waking up without a phone',
      before: 'A phone on the nightstand, which is the problem rather than the clock.',
      after: 'A clock whose face is alive, turned by one dial, with nothing to scroll.',
      steps: [
        { icon: 'clock', title: 'It shows the time', text: 'On a long bar display, in a world that moves.' },
        { icon: 'nudge', title: 'Turn the dial', text: 'One dial. It pushes, swirls and bends what is on screen.' },
        { icon: 'spark', title: 'Wake to a sunrise', text: 'The screen works through wind-down, sleep and sunrise before the alarm.' },
        { icon: 'bolt', title: 'Watch a whole night in a minute', text: 'Fast-forward the night to check it, instead of waiting for it.' },
      ],
      promises: [
        { icon: 'offline', text: 'No account, no cloud, no phone' },
        { icon: 'shield', text: 'Falls back to a plain renderer and still tells the time' },
      ],
    },
    caseStudy: {
      problem:
        'A bedside clock has to be beautiful enough to replace the phone it is there to displace, and it has one dial and no keyboard. Both halves are hard: the display has to carry real visual weight on a Raspberry Pi, and the entire interface has to be reachable by turning, pressing and holding one control.',
      role:
        'Solo build: the renderers and the GPU path, the themes, the dial interaction model, the night cycle, the welcome and boot splash, and the archive that records what was superseded and why.',
      hard:
        'Making a night testable. A clock’s behaviour happens over eight hours, which is not a thing anyone can iterate against. The developer panel drives the same clock at sixty and six hundred times speed and can jump to thirty minutes before the alarm, and the Demo replays the sequence with captions and then restores the previous clock, alarm and settings exactly — so a two-minute run is a real test of the night rather than a video of one.',
      decision:
        'The GPU path is an enhancement and never a requirement. Every theme draws correctly on the 2D canvas first, and WebGL2 only finishes the frame. The alternative was to build for the GPU and treat 2D as the broken case, which would have bought a better-looking floor. It was rejected because a bedside clock that fails to show the time when a driver is missing is not a clock. ?gl=0 makes the fallback a thing you can look at rather than a claim.',
      verify: [
        'Open software/index.html in a browser: no install and no build step, and the page is a mock-up of the device you can turn and press.',
        'Press D, then fast-forward at 600 times speed and watch a whole night in about a minute.',
        'Add ?gl=0 and confirm the clock still works without the GPU path.',
        'Run ?demo=loop and check the clock, alarm and settings are exactly as they were afterwards.',
      ],
      limits:
        'There is no device. The CAD is draft, and everything visual has been judged on a desktop browser and a Pi 5 rather than on the real bar display. The repository is private, so none of this can be opened from outside.',
    },
  },
  {
    slug: 'dansville-accessories',
    name: 'Dansville Accessories',
    year: 2026,
    status: 'client',
    statusNote:
      'Every part that lives in the codebase is finished. Going live needs the owner’s own Stripe and domain logins, which are theirs to enter, so the remaining steps are written as a runbook rather than done.',
    oneLiner:
      'A bracelet shop and the owner’s admin dashboard, built so the shop is run from a phone with no developer and no redeploy.',
    signature:
      'The admin installs to the owner’s home screen as a phone app, and signs in with an eight-digit code from an email rather than a link — because on an iPhone an emailed link opens in Safari, which keeps its own session, and the home-screen app would still be signed out. A product is added by taking a photograph on the phone. Price, stock, collections, discount codes, delivery options, the free-delivery threshold and the announcement bar are all data, so a change reaches the live shop in about thirty seconds with nothing rebuilt and nobody deployed. Refunds and disputes are deliberately not in the dashboard: they stay in Stripe, where the audit trail and the liability already live.',
    stack: ['TypeScript', 'React 19', 'Drizzle', 'Neon', 'Stripe', 'Resend', 'Vercel'],
    tags: ['Web', 'Commerce', 'Client', 'PWA'],
    story: {
      forWho: 'a bracelet shop and its owner',
      before: 'Changing a price or adding a product means asking a developer.',
      after: 'The owner runs the whole shop from an app on their phone.',
      steps: [
        { icon: 'camera', title: 'Photograph a bracelet', text: 'Add a product from the phone, with the photo taken on it.' },
        { icon: 'coin', title: 'Set price and stock', text: 'Plus collections, discount codes and delivery prices.' },
        { icon: 'bell', title: 'Orders arrive', text: 'An email for every order, with the address and items to copy.' },
        { icon: 'check', title: 'Mark it dispatched', text: 'With a tracking number, from the same phone.' },
      ],
      promises: [
        { icon: 'phone', text: 'Installs to the home screen, no App Store' },
        { icon: 'bolt', text: 'Changes reach the shop in about 30 seconds' },
        { icon: 'shield', text: 'Refunds stay in Stripe, on purpose' },
      ],
    },
    caseStudy: {
      problem:
        'A small shop owner cannot have a developer between them and their own prices. Every ordinary act of running a shop — adding a bracelet, changing a price, switching a discount code off, raising the free-delivery threshold — has to be something they do themselves, on the phone they already have, without anything being rebuilt.',
      role:
        'Solo build: the shop, the bag and the Stripe checkout, the webhook that turns a paid session into an order, the admin dashboard and its sign-in, the image pipeline, the discount engine, the audit log, and the go-live runbook.',
      hard:
        'Signing in on an iPhone. The obvious design emails a magic link, but a link opens in Safari and a home-screen app is a separate browsing context, so the owner taps the link, Safari signs in, and the app they installed is still logged out. The fix is to email an eight-digit code instead: the owner reads it from Safari or Mail and types it into whichever surface they are actually standing in. Sessions last thirty days so this is rare.',
      decision:
        'Refunds and disputes are not in the dashboard. Building them would have been straightforward. They were left out because Stripe already holds the money, the evidence and the chargeback deadlines, and a second place to issue a refund is a second place for the record to be wrong. The cost is that the owner uses two apps, and the ADMIN guide says so plainly rather than hiding it.',
      verify: [
        'Read api/stripe-webhook.ts and follow a paid checkout session through to an order row.',
        'Read ADMIN.md: it is written for the owner, not for a developer, down to the Add to Home Screen steps per phone.',
        'Read the discount engine and check that a usage limit and a last day are both enforced server-side.',
        'Read GO-LIVE.md and STRIPE_INTEGRATION_TODO.md for exactly what is left and why it needs the owner’s own logins.',
      ],
      limits:
        'It is not yet taking real orders: that waits on the owner’s Stripe keys and domain. The repository is private, so none of this is readable from outside, and the README in it is still the starter template’s rather than this build’s. There is one administrator role, and refunds are out of scope by design.',
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
    withheld:
      'Five dated days: where someone is staying, what is booked and when. An itinerary is a record of where a person will be, which is the last thing to put at a public address.',
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
  },
  {
    slug: 'cork-podcast-studio',
    name: 'Cork Podcast Studio',
    year: 2026,
    status: 'prototype',
    statusNote:
      'A working, database-backed demonstration of the whole workflow, and explicitly not ready for real customers: the staff names, studio capacity, slot lengths and delivery targets are illustrative, and there is no customer or staff authorisation yet.',
    oneLiner:
      'A studio’s whole working day in one workspace: availability and booking at the front, and a project moving through preparation, recording, editing, review and delivery behind it.',
    signature:
      'Booking a slot is atomic and idempotent, so a double tap or a retried request reserves once rather than twice, and two people racing for the last slot of the day get one booking and one refusal. A project update uses optimistic concurrency, so saving over a colleague’s newer edit is refused instead of silently winning. A stage will not advance until its preparation and its owner are in place, and delivery will not complete without an HTTPS link. The assistant is a deterministic router over a curated guide, not a model: a question it cannot answer from that guide becomes a staff enquiry rather than an invented fact, and marking the enquiry reviewed does not send a reply, because nothing here can send one.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Drizzle', 'PostgreSQL', 'Cloudflare D1'],
    stackNote:
      'One codebase, two runtimes: separate TypeScript configurations select Cloudflare D1 for the Sites build and PostgreSQL for the Next.js build, and neither database adapter is imported by the other runtime’s bundle. Each deployment therefore has its own records.',
    tags: ['Web', 'Client', 'Tool'],
    story: {
      forWho: 'a podcast studio and its staff',
      steps: [
        { icon: 'calendar', title: 'A customer books a slot', text: 'From the studio’s own availability. Booking twice by accident still books once.' },
        { icon: 'folder', title: 'A project appears', text: 'With a preparation checklist, an owner and a history, created for you.' },
        { icon: 'check', title: 'Move it through the stages', text: 'Preparation, recording, editing, review, delivery. It will not skip a step that is not ready.' },
        { icon: 'chat', title: 'Questions it cannot answer', text: 'Go to a person as an enquiry, instead of being guessed at.' },
      ],
      promises: [
        { icon: 'shield', text: 'Will not overwrite a colleague’s newer edit' },
        { icon: 'blank', text: 'The assistant invents nothing' },
      ],
    },
  },
  {
    slug: 'sanko-funding-radar',
    name: 'Sanko Funding Radar',
    year: 2026,
    status: 'built',
    statusNote:
      'Private and password-protected, and deliberately so: it is one person’s funding pipeline. There is nothing here to open.',
    oneLiner:
      'A funding pipeline for Sanko: a source-checked register of grant opportunities with deadlines, eligibility, fit assessments, private notes and application stages, refreshed by a daily research watch.',
    signature:
      'A front end on one host reading a database and a scheduled research watch that stay on another, which is the unusual part: it is a deliberate bridge rather than a migration, so the daily 08:00 research run and the authoritative records were never copied or duplicated. The backend credential is used server-side only and never reaches the browser, requests are restricted to three known endpoints at one fixed origin, redirects are refused and cross-origin writes rejected. Every page sits behind a signed, HttpOnly session cookie and every API route re-validates it independently, so a route is not protected merely because the page in front of it was. Weak or missing configuration blocks access and explains itself, rather than failing open.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Zod', 'Vercel'],
    tags: ['Web', 'Tool', 'Research'],
    story: {
      forWho: 'one founder chasing grant funding',
      before: 'Opportunities, deadlines and half-written applications spread across tabs and notes.',
      after: 'One register with every deadline, what you are eligible for, and where each application stands.',
      steps: [
        { icon: 'search', title: 'Opportunities arrive', text: 'A daily research run adds them, with their sources checked.' },
        { icon: 'calendar', title: 'See the deadlines', text: 'As a calendar, or as an agenda on a phone.' },
        { icon: 'pen', title: 'Add notes and next actions', text: 'Private to you.' },
        { icon: 'chart', title: 'Track the applications', text: 'Through the whole pipeline.' },
      ],
      promises: [
        { icon: 'lock', text: 'Password-protected on every page and every route' },
      ],
    },
  },
  {
    slug: 'yemkem-school',
    name: 'Yemkem School of Herbal Medicine',
    year: 2026,
    status: 'client',
    statusNote:
      'The curriculum documents and the page designs are written. Nothing is accredited, nothing is enrolled, and there is no deployed site: this is the specification and the design, not a running institution.',
    oneLiner:
      'The programme specification and public pages for a Nigerian herbal-medicine school: nine curriculum documents down to module level, and nine designed pages that say honestly what each award does and does not confer.',
    signature:
      'The hard part is not the website. It is a curriculum written to be defensible — 1,920 learning hours, 735 supervised clinical hours, externally examined, benchmarked against international curricula — carried through a master programme specification, module specifications at three levels, a clinical placement and internship handbook and a quality-assurance handbook. The positioning brief then forbids the two easy exits: it is not a weekend certificate mill and not a wellness brand, and the content rule is that the institution leads while the founder appears inside the heritage story rather than in front of it. What an award confers is stated on the page, which is the sentence most schools in this space leave out.',
    stack: ['HTML', 'design canvas', 'curriculum specification'],
    tags: ['Web', 'Education', 'Client', 'Design'],
    story: {
      forWho: 'a herbal-medicine school and its students',
      steps: [
        { icon: 'book', title: 'The programme, written down', text: 'Hours, modules, clinical placement and examination, in nine documents.' },
        { icon: 'shield', title: 'Standards stated plainly', text: 'What the award does and does not confer is on the page.' },
        { icon: 'person', title: 'The school leads', text: 'Not the founder. The heritage story carries him, not the homepage.' },
      ],
      promises: [
        { icon: 'blank', text: 'Claims no accreditation it does not have' },
      ],
    },
  },
  {
    slug: 'sanko-vision-demo',
    name: 'Sanko Vision Demo',
    year: 2026,
    status: 'prototype',
    statusNote:
      'A clickable demonstration with fixture data. Nothing in it is wired to the real Sanko backend.',
    oneLiner:
      'The Sanko argument shown rather than described: the same evidence record seen in turn by a practitioner, a researcher, a regulator and the public.',
    signature:
      'It is built in six numbered phases, one per audience, which is also the point it is making: the practitioner’s vault, the researcher’s view, the regulator’s view and the public view are the same records under different permissions, so the demo argues that documenting traditional medicine properly is worth something to four different people at once. Fixture data throughout, labelled as such.',
    stack: ['React', 'Vite'],
    tags: ['Web', 'Health', 'Social impact'],
    story: {
      forWho: 'explaining Sanko to someone in five minutes',
      steps: [
        { icon: 'archive', title: 'A practitioner’s vault', text: 'The remedies and patients they have recorded.' },
        { icon: 'chart', title: 'A researcher’s view', text: 'The same records, as evidence.' },
        { icon: 'shield', title: 'A regulator’s view', text: 'The same records again, for oversight.' },
        { icon: 'globe', title: 'And the public’s', text: 'What anyone is allowed to see.' },
      ],
    },
    source: 'https://github.com/foayenix/swab',
  },
  {
    slug: 'artisan',
    name: 'Artisan',
    year: 2026,
    status: 'prototype',
    oneLiner:
      'A clickable mobile prototype for a local trades marketplace, built as screens you can tap through rather than a description of them.',
    signature:
      'It ships as a single standalone HTML file alongside the screen sources, so the prototype can be sent to someone and opened with nothing installed and no build step — which is the only property that matters for a prototype whose job is to be looked at. The screens are drawn inside an iOS frame so the thing being judged is the app and not the browser around it.',
    stack: ['React', 'standalone HTML'],
    tags: ['Web', 'Design'],
    story: {
      forWho: 'finding a local tradesperson',
      steps: [
        { icon: 'search', title: 'Describe the job', text: 'What needs doing.' },
        { icon: 'users', title: 'See who can do it', text: 'Local tradespeople for that job.' },
        { icon: 'calendar', title: 'Book them', text: 'Through the flow, end to end.' },
      ],
      promises: [
        { icon: 'offline', text: 'One file: opens with nothing installed' },
      ],
    },
    source: 'https://github.com/foayenix/fixaroo',
  },
  {
    slug: 'football-frenzy-draft',
    name: 'Football Frenzy (draft game)',
    year: 2025,
    status: 'built',
    statusNote:
      'The 2025 build of the idea, kept because it is public and openable. The 2026 Football Frenzy above is a separate codebase, not a later commit of this one.',
    oneLiner:
      'A fast fantasy-football draft game: pick a squad of real Premier League players and play out simulated matches that finish in minutes rather than a season.',
    signature:
      'The whole design is built around session length. A fantasy league takes a season to resolve, so this resolves a match in minutes, with tactical boosts as the decision that carries the stakes a season normally supplies. Express and Socket.IO behind a React front end, so a draft happens live between players rather than by submitted forms.',
    stack: ['Express', 'Socket.IO', 'React', 'JavaScript'],
    tags: ['Web', 'Game'],
    story: {
      forWho: 'fantasy football players with no patience',
      steps: [
        { icon: 'users', title: 'Draft a squad', text: 'Real Premier League players, picked live against other players.' },
        { icon: 'ball', title: 'Play the match', text: 'Simulated, and finished in minutes.' },
        { icon: 'bolt', title: 'Spend a boost', text: 'Tactical boosts are where the risk sits.' },
      ],
    },
    source: 'https://github.com/foayenix/tbx-ffzy',
  },
  {
    slug: 'desi-tailors',
    name: 'Desi Tailors',
    year: 2026,
    status: 'built',
    statusNote:
      'A single page for a Barking tailor. There is no deployment of mine to link, so this page cannot show it running.',
    oneLiner:
      'A one-page site for a bespoke South Asian tailoring shop in Barking.',
    signature:
      'One HTML file and nothing else: no framework, no build, no dependency that can age out from under a small shop. A business of this size should not inherit a toolchain it cannot maintain, and the entire site is a file anyone can open and edit.',
    stack: ['HTML', 'CSS'],
    tags: ['Web', 'Client'],
    story: {
      forWho: 'a bespoke tailoring shop',
      steps: [
        { icon: 'globe', title: 'One page', text: 'What the shop does, and how to reach it.' },
        { icon: 'archive', title: 'One file', text: 'Nothing to rebuild, nothing to keep updated.' },
      ],
    },
    source: 'https://github.com/foayenix/desi-tailors',
  },
  {
    slug: 'becoming-her',
    name: 'Becoming Her',
    year: 2026,
    status: 'built',
    withheld:
      'The page is built around one graduate’s name, her own words to her guests, and the menu for the evening. None of that is mine to put on a public address.',
    oneLiner:
      'A graduation party invitation and RSVP page, with the menu attached and a Caddy configuration to serve it.',
    signature:
      'An invitation is a page that has to work on the first try, on a phone, from a link in a message, for guests who will never visit it twice — so it carries its own menu as both images and a PDF and ships with the server configuration that puts it online. There is no framework and nothing to build.',
    stack: ['HTML', 'CSS', 'Caddy'],
    tags: ['Web', 'Events'],
    story: {
      forWho: 'one graduation, and its guests',
      steps: [
        { icon: 'mail', title: 'Open the invitation', text: 'From a link in a message, on a phone.' },
        { icon: 'book', title: 'Read the menu', text: 'As images, or as a PDF.' },
        { icon: 'check', title: 'RSVP', text: 'On the same page.' },
      ],
    },
  },
  {
    slug: 'thirty',
    name: 'Thirty',
    year: 2026,
    status: 'built',
    withheld:
      'The invitation carries the guest of honour’s full name, the date and the venue, set as the cover of a magazine. Publishing it would publish all three.',
    oneLiner:
      'A thirtieth-birthday invitation laid out as a fashion magazine: a cover, an issue number, a scrolling marquee and an RSVP.',
    signature:
      'The conceit is the whole build. An invitation to a milestone show is set as Vol. 30, No. 07, with a masthead, a running marquee and editorial typography, so the format carries the occasion instead of a headline announcing it. One HTML file and one script.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    tags: ['Web', 'Events', 'Design'],
    story: {
      forWho: 'one thirtieth birthday, and its guests',
      steps: [
        { icon: 'book', title: 'It opens like a magazine', text: 'A cover, an issue number and a masthead.' },
        { icon: 'calendar', title: 'The date and the place', text: 'Set like editorial pages.' },
        { icon: 'check', title: 'RSVP', text: 'At the end of the issue.' },
      ],
    },
  },
  {
    slug: 'twenty-one-not-twenty-six',
    name: '21not26',
    year: 2026,
    status: 'built',
    withheld:
      'The page holds a weekend’s plan and the people it was written for. A link to it is a link to where they were going to be.',
    oneLiner: 'A single-page invitation and itinerary for a birthday weekend.',
    signature:
      'One page holding a whole weekend: the invitation, the plan and the response, so a guest never has to find a second link. No framework and no build step.',
    stack: ['HTML', 'CSS'],
    tags: ['Web', 'Events'],
    story: {
      forWho: 'one birthday weekend, and its guests',
      steps: [
        { icon: 'mail', title: 'The invitation', text: 'On one page, on a phone.' },
        { icon: 'calendar', title: 'The weekend’s plan', text: 'On the same page.' },
      ],
    },
  },
  {
    slug: 'dans-birthday',
    name: 'Dan’s 24th',
    year: 2026,
    status: 'built',
    withheld:
      'The page is one person’s name, their birthday and the restaurant. There is nothing in it that is mine to release.',
    oneLiner: 'An RSVP page for a twenty-fourth birthday dinner.',
    signature:
      'The smallest thing in this catalogue, and it is here because the catalogue lists what was built rather than what flatters: one page, one guest list, one response.',
    stack: ['HTML', 'CSS'],
    tags: ['Web', 'Events'],
    story: {
      forWho: 'one birthday dinner, and its guests',
      steps: [
        { icon: 'mail', title: 'The invitation', text: 'One page.' },
        { icon: 'check', title: 'RSVP', text: 'On it.' },
      ],
    },
  },
  {
    slug: 'valentine',
    name: 'Will You Be My Valentine',
    year: 2026,
    status: 'built',
    withheld:
      'Written for one person, on one day. It is listed because it was built, and it is not published because it was never addressed to anybody else.',
    oneLiner: 'A one-page Valentine’s proposal built to be opened on a phone, once.',
    signature:
      'Built in an afternoon for an audience of one, which is the only requirement it had. It is listed because leaving it out would make this catalogue a curated highlight reel rather than a record.',
    stack: ['React', 'TypeScript'],
    tags: ['Web', 'Events'],
    story: {
      forWho: 'one person, on one day',
      steps: [
        { icon: 'heart', title: 'Open it on a phone', text: 'That is the whole thing.' },
      ],
    },
  },
  {
    slug: 'cv-site',
    name: 'cv-site',
    year: 2026,
    status: 'built',
    statusNote:
      'Superseded by the site you are reading. It is kept because this catalogue’s twenty oldest entries were written from it, so it is the source for part of what is on this page.',
    oneLiner:
      'The previous portfolio: twenty builds presented as an engineering instrument, in near-black with a single signal-amber accent.',
    signature:
      'One committed aesthetic rather than a neutral template — near-black canvas, one accent colour, a monospace face for every label and metadata field and a display face for headings. It is in the catalogue because it is the primary source for the earliest entries here, and because a portfolio that hides its own previous portfolio is doing the thing this one is built not to do.',
    stack: ['Vite', 'React 19', 'TypeScript', 'Tailwind', 'Framer Motion'],
    tags: ['Web', 'Design'],
    story: {
      forWho: 'anyone who asked what I had built, in 2026',
      steps: [
        { icon: 'archive', title: 'Twenty builds', text: 'Listed as an instrument panel rather than a gallery.' },
        { icon: 'paper', title: 'It doubled as a CV', text: 'One page for both jobs.' },
      ],
    },
    source: 'https://github.com/foayenix/cv-site',
  },
  {
    slug: 'constellation',
    name: 'Foayenix constellation',
    year: 2026,
    status: 'experiment',
    oneLiner:
      'A single-page portfolio whose landing screen is an interactive three-dimensional constellation.',
    signature:
      'An experiment in whether a portfolio can lead with an interactive object instead of a sentence. The answer, judged honestly, was no for this purpose — the constellation is the memorable part and the work is behind it, which is the wrong way round — and the site you are reading now leads with a sentence instead. It is listed because the negative result is the useful part.',
    stack: ['Three.js', 'JavaScript', 'CSS'],
    tags: ['Web', 'Design'],
    story: {
      forWho: 'an experiment in portfolio design',
      steps: [
        { icon: 'spark', title: 'A constellation you can turn', text: 'The landing screen is an interactive object.' },
        { icon: 'archive', title: 'The work sits behind it', text: 'Which turned out to be the problem.' },
      ],
    },
    source: 'https://github.com/foayenix/iweb',
  },
  {
    slug: 'portfolio',
    name: 'This site',
    year: 2026,
    status: 'live',
    oneLiner:
      'The catalogue you are reading, and the ledger behind it: every repository on the account, labelled for what it actually is.',
    signature:
      'Every claim on this site is traceable to a repository or to the previous portfolio, and the one field that is never allowed to flatter is status: live, client work, built but unreleased, prototype and experiment are separate things, and no entry claims usage, revenue or a measured outcome, because none can be shown. A link is only rendered where the URL was checked. The ledger page then lists all seventy-four repositories on the account, including eight that are empty and three that hold other people’s code or a generator’s output — labelled as such, because a catalogue that quietly drops its own shells is not a record.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4'],
    tags: ['Web', 'Design'],
    story: {
      forWho: 'anyone deciding whether to work with me',
      steps: [
        { icon: 'archive', title: 'Read the catalogue', text: 'Every build, with what stage it actually reached.' },
        { icon: 'target', title: 'Check a claim', text: 'Each entry says how to verify it, and what is missing.' },
        { icon: 'ruler', title: 'Read the ledger', text: 'All seventy-four repositories, including the empty ones.' },
      ],
      promises: [
        { icon: 'blank', text: 'No usage or revenue figures, because there are none to show' },
        { icon: 'offline', text: 'No link unless the URL was checked' },
      ],
    },
    source: 'https://github.com/foayenix/portfolio',
  },
]

export const TAG_ORDER = [
  'Web', 'Mobile', 'AI', 'Local-first', 'Tool', 'Game', 'Client',
  'WhatsApp', 'Health', 'Research', 'Productivity', 'Consumer',
  'PWA', 'Community', 'Finance', 'Social impact',
  'Design', 'Commerce', 'Education', 'Events',
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
  withheld: PROJECTS.filter((p) => p.withheld).length,
}

/** Finished builds whose link is withheld because the page is somebody else’s. */
export const WITHHELD_BUILDS = PROJECTS.filter((p) => p.withheld)

// A withheld build must not carry a link, or the rule above is decoration.
// Checked here so a `live` or `source` added later fails the build instead of
// quietly publishing a guest list.
for (const project of WITHHELD_BUILDS) {
  if (project.live || project.source) {
    throw new Error(
      `data/projects.ts: "${project.slug}" is withheld and still carries a link`,
    )
  }
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
