import { arrow, edgeLabel, elbow, hop, node, page, zone } from './_kit.mjs'

const W = 960
const H = 600

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 112, label: 'Cloudflare' }),
  zone({ x: 40, y: 216, w: 260, h: 264, label: 'On the phone · no signal needed' }),
  zone({ x: 544, y: 64, w: 376, h: 416, label: 'Supabase · Postgres' }),

  arrow('M170,154 V248'),
  arrow(elbow(276, 272, 572, 112, 492)),
  arrow(elbow(276, 296, 572, 208, 444)),
  arrow('M732,266 V288'),
  arrow('M732,364 V388'),
  arrow(elbow(572, 424, 280, 320, 320)),
  // Queued, not sent. Bridged where it crosses the return path, because it is
  // the least important line on the page: nothing travels down it yet.
  arrow(`M576,236 H488 Q480,236 480,244 V416 ${hop(true)} V504`, { dashed: true }),

  edgeLabel(186, 196, 'serves the app'),
  edgeLabel(296, 266, 'phone + PIN + signature'),
  edgeLabel(300, 290, 'locked declarations'),
  edgeLabel(332, 340, 'differences, read-only'),
  edgeLabel(492, 330, 'queued'),

  node({ x: 64, y: 96, w: 212, title: 'Workers static assets', lines: ['apps/web/dist'] }),
  node({
    x: 64, y: 248, w: 212,
    title: 'Branch, store, factory',
    lines: ['PWA · 360 × 760', 'never sent stock on hand', 'or an expected cash figure'],
  }),
  node({
    x: 64, y: 372, w: 212,
    title: 'packages/domain',
    lines: ['a TypeScript copy of the', 'rules, for offline previews', 'only — same test vectors'],
    dashed: true,
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'login · admin-users',
    lines: ['edge functions · a new phone must be approved'],
  }),
  node({
    x: 572, y: 172, w: 320,
    title: 'Append-only ledger',
    lines: [
      'enforced in SQL. A correction is a new',
      'signed row with a reason and an approver,',
      'never an edit over the old one',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 288, w: 320,
    title: 'Rules in SQL — the authority',
    lines: ['differences computed only after the', 'declaration is locked'],
  }),
  node({
    x: 572, y: 388, w: 320,
    title: 'Row-level read access',
    lines: ['decides what a phone may see. This is why', 'a count cannot be made to agree'],
    focal: true,
  }),
  node({
    x: 340, y: 504, w: 280,
    title: 'WhatsApp receipts',
    lines: ['milestone 10 · waiting on Meta.', 'The copy says “queued”, never “sent”'],
    dashed: true,
    tone: 'muted',
  }),
].join('\n')

export default page({
  title: 'Yemkem branch stock and sales — architecture',
  eyebrow: 'Yemkem branch stock and sales',
  heading: 'SQL is the authority. The phone holds a copy it is only allowed to preview with.',
  width: W,
  height: H,
  svg,
  label:
    'A Cloudflare Worker serves the app to a phone that works with no signal; the phone carries a TypeScript copy of the rules used only for offline previews. The phone signs in through a Supabase edge function, pushes locked declarations into an append-only ledger, and the rules in SQL compute the differences. Row-level read access decides what returns to the phone, and it never returns stock on hand. WhatsApp receipts are queued and not sent.',
  caption:
    'Eighteen migrations carry the schema, the rules, row-level read access and the sync handlers. The two outlined boxes are the whole argument: the ledger <b>cannot be edited</b>, and read access decides what a phone is allowed to know. A branch phone is never sent stock on hand or an expected cash figure, so somebody counting a till has nothing to reconcile towards and <b>a count cannot be quietly made to agree</b>.',
})
