import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 260, label: 'On your own machine' }),
  zone({ x: 544, y: 64, w: 376, h: 480, label: 'Hosted · the optional half' }),

  arrow('M170,156 V200'),
  arrow(elbow(276, 232, 572, 112, 500)),
  arrow(elbow(276, 256, 572, 206, 536)),
  arrow('M732,250 V292'),
  arrow('M732,378 V420'),
  arrow('M732,488 V516', { accent: true }),
  // The scanner is never run by a web request. The queue is the only way in.
  arrow(elbow(892, 206, 892, 250, 936), { dashed: true }),

  edgeLabel(186, 184, 'writes proper.json'),
  edgeLabel(300, 226, 'sign in · read-only app'),
  edgeLabel(300, 250, 'queue a scan at a pinned commit'),

  node({
    x: 64, y: 96, w: 212,
    title: 'npm run scan',
    lines: ['reads files, config, imports', 'and git history, offline.', 'Installs and runs nothing.'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'proper.json → local app',
    lines: ['a public HTTP asset, so the', 'hosted build excludes it'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'GitHub App · read-only',
    lines: ['credentials encrypted at rest'],
  }),
  node({
    x: 572, y: 172, w: 320,
    title: 'Web · Next.js',
    lines: ['never runs the scanner synchronously'],
  }),
  node({
    x: 572, y: 292, w: 320,
    title: 'Queue',
    lines: [
      'atomic admission limits, leased jobs,',
      'retry limits and fencing tokens, so a',
      'stale worker cannot publish a result',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 420, w: 320,
    title: 'Worker · its own database role',
    lines: ['downloads a bounded source archive.', 'The web role cannot publish a report'],
  }),
  node({
    x: 572, y: 516, w: 320,
    title: 'PostgreSQL · owner predicate and RLS',
    lines: ['a private report is gated twice, not once'],
    focal: true,
  }),
].join('\n')

export default page({
  title: 'Proper — architecture',
  eyebrow: 'Proper',
  heading: 'The scanner never runs inside a web request, and the role that serves pages cannot publish a report.',
  width: 960,
  height: 616,
  svg,
  label:
    'A local command-line scan reads a project offline and writes proper.json, which the local app loads. The optional hosted half signs in through a read-only GitHub App; the web application queues a scan at a pinned commit and never runs the scanner itself. A separate worker, holding its own database role, downloads a bounded source archive and publishes into PostgreSQL, where a private report is gated by an owner predicate and by row-level security.',
  caption:
    'The local scan is the product; the hosted half is optional and is drawn as the smaller claim it is. Two boundaries carry the design. The <b>queue</b> is the only way a scan starts, with leases and fencing tokens so a worker that woke up late cannot overwrite a newer result. And the role that serves web pages <b>cannot publish a report at all</b> — publishing belongs to the worker, which is a different database role, so a bug in a page handler is not a way to write one.',
})
