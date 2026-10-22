import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 300, label: 'The list owner' }),
  zone({ x: 40, y: 404, w: 260, h: 140, label: 'A friend' }),
  zone({ x: 544, y: 64, w: 376, h: 420, label: 'Supabase' }),

  arrow(elbow(276, 122, 572, 104, 488)),
  arrow(elbow(276, 256, 572, 196, 452)),
  arrow(elbow(276, 464, 572, 404, 380)),
  arrow('M732,144 V182'),
  arrow('M732,272 V310', { accent: true }),
  arrow(elbow(572, 346, 300, 318, 340)),

  edgeLabel(306, 96, 'name, image and price'),
  edgeLabel(306, 188, 'what you have saved'),
  edgeLabel(306, 396, 'reserves one'),

  node({
    x: 64, y: 96, w: 212,
    title: 'Save to Plave',
    lines: ['a bookmarklet. It reads any', 'shop page you are on'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'The wishlist',
    lines: ['savings logged, a ring fills', 'and the month you get there'],
  }),
  node({
    x: 64, y: 296, w: 212,
    title: 'What the owner sees',
    lines: ['the list. No reservations'],
  }),
  node({
    x: 64, y: 436, w: 212,
    title: 'The friend',
    lines: ['no account needed to reserve'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'Items',
    lines: ['name, image, price, target'],
  }),
  node({
    x: 572, y: 182, w: 320,
    title: 'Reservations',
    lines: ['who has claimed which gift'],
  }),
  node({
    x: 572, y: 310, w: 320,
    title: 'Row-level security',
    lines: [
      'the owner’s own query cannot return a',
      'reservation row. The interface has nothing',
      'to leak, because it is never sent anything',
    ],
    focal: true,
  }),
].join('\n')

export default page({
  title: 'Plave · architecture',
  eyebrow: 'Plave',
  heading: 'The secret is kept in the database, one layer below anything the interface could get wrong.',
  width: 960,
  height: 572,
  svg,
  label:
    'A bookmarklet reads the name, image and price off any shop page into a wishlist, where savings are logged against a target and a forecast says which month it lands. Friends reserve gifts without an account. A row-level security policy means the owner’s own query cannot return a reservation row, so the interface is never sent one and has nothing to hide.',
  caption:
    'The surprise is the whole product, and the obvious way to build it is to hide reservations in the interface. That works until one bug, one API route or one export undoes it. Here the policy sits in the database: the owner’s query <b>cannot return a reservation row at all</b>, so there is nothing for the interface to leak. It installs to a home screen, works offline, and registers as an Android share target, which is how a link gets into it in one tap.',
})
