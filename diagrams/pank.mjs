import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 200, label: 'One owner · no sign-up page' }),
  zone({ x: 544, y: 64, w: 376, h: 428, label: 'One process · one instance' }),

  arrow('M170,172 V200'),
  arrow(elbow(276, 232, 572, 112, 500)),
  arrow('M732,174 V214'),
  arrow('M732,308 V344', { accent: true }),
  arrow('M732,434 V470'),
  arrow(elbow(572, 500, 300, 196, 528)),

  edgeLabel(186, 184, 'scrypt, checked every request'),
  edgeLabel(300, 226, 'typed figures and a payslip'),
  edgeLabel(340, 492, 'export · restore · delete'),

  node({
    x: 64, y: 96, w: 212,
    title: 'The owner',
    lines: ['one allowlisted address,', 'no way to create a second'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'Session',
    lines: ['document links are signed', 'and expire in five minutes'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'Next.js 16 · one instance',
    lines: ['SQLite and the upload worker share it'],
  }),
  node({
    x: 572, y: 214, w: 320,
    title: 'Payslip review',
    lines: [
      'a model reads the upload, and what it read',
      'is shown beside the original. Nothing it',
      'extracted counts until you confirm it',
    ],
  }),
  node({
    x: 572, y: 344, w: 320,
    title: 'Forecast engine',
    lines: [
      'integer pence, on Europe/London dates.',
      'No model produces an amount or a date',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 470, w: 320,
    title: 'DATA_DIR · outside the web root',
    lines: ['the database and the payslip originals'],
    focal: true,
  }),
  node({
    x: 340, y: 536, w: 280,
    title: 'Moving money',
    lines: ['not built, and nothing on screen', 'implies it could be'],
    dashed: true,
    tone: 'muted',
  }),
].join('\n')

export default page({
  title: 'Pank — architecture',
  eyebrow: 'Pank',
  heading: 'A model may read a payslip. Nothing a model reads becomes a figure until you confirm it.',
  width: 960,
  height: 620,
  svg,
  label:
    'A single allowlisted owner signs in against a scrypt hash checked on every request; there is no sign-up page. One Next.js instance holds SQLite and the upload worker in the same process. An uploaded payslip is read by a model and shown beside the original for confirmation before any value counts. The forecast engine computes in integer pence on Europe/London dates, with no model producing an amount or a date. The database and the payslip originals live in DATA_DIR, outside the web root, and export, restore and delete all return to the owner. Moving money is not built.',
  caption:
    'The split across the middle is the point. A model is allowed in exactly one place — reading an uploaded payslip — and what it read is shown beside the image before it counts for anything. Everything downstream is <b>integer pence on London calendar dates</b>, so a forecast does not slide by a day across a clock change or lose a penny to a rounded division. The app records what you do and <b>never moves money</b>, which is drawn here as the absent box it is.',
})
