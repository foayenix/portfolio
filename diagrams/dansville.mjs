import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 212, label: 'The shop' }),
  zone({ x: 40, y: 332, w: 260, h: 212, label: 'The owner’s phone' }),
  zone({ x: 544, y: 64, w: 376, h: 480, label: 'Serverless · Vercel' }),

  arrow(elbow(276, 128, 572, 112, 436)),
  arrow(elbow(276, 232, 572, 214, 400)),
  arrow('M732,174 V214', { accent: true }),
  arrow('M732,308 V326'),
  arrow('M732,398 V438'),
  arrow(elbow(276, 400, 572, 438, 360)),
  arrow(elbow(572, 356, 300, 468, 420), { dashed: true }),

  edgeLabel(300, 122, 'bag → Checkout'),
  edgeLabel(300, 208, 'paid session'),
  edgeLabel(300, 394, 'an 8-digit code'),
  edgeLabel(316, 486, 'order email'),

  node({
    x: 64, y: 96, w: 212,
    title: 'Shop · React 19',
    lines: ['catalogue, bag, codes'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'Stripe Checkout',
    lines: ['Stripe holds the card', 'details, never this build'],
  }),
  node({
    x: 64, y: 364, w: 212,
    title: 'Admin on the home screen',
    lines: ['installs from the browser.', 'No App Store, no cost'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'api/checkout',
    lines: ['prices the bag on the server, so a discount', 'cannot be argued with from the browser'],
  }),
  node({
    x: 572, y: 214, w: 320,
    title: 'api/stripe-webhook',
    lines: [
      'a paid session becomes an order here and',
      'nowhere else, once, however many times',
      'the webhook is delivered',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 326, w: 320,
    title: 'Neon · Drizzle',
    lines: ['products, orders, codes, settings, audit log'],
  }),
  node({
    x: 572, y: 438, w: 320,
    title: 'Code sign-in',
    lines: [
      'an emailed link opens in Safari, which would',
      'leave the installed app signed out, so the',
      'email carries a code the owner types instead',
    ],
    focal: true,
  }),
  node({
    x: 340, y: 560, w: 280,
    title: 'Refunds and disputes',
    lines: ['deliberately not built. Stripe holds', 'the money, the evidence and the dates'],
    dashed: true,
    tone: 'muted',
  }),
].join('\n')

export default page({
  title: 'Dansville Accessories · architecture',
  eyebrow: 'Dansville Accessories',
  heading: 'The owner runs the shop from a phone, and a price is only ever decided on the server.',
  width: 960,
  height: 644,
  svg,
  label:
    'The shop prices a bag through a serverless checkout route and hands off to Stripe Checkout, which holds the card details. A paid session becomes an order in the Stripe webhook, once, however many times it is delivered. Products, orders, discount codes, settings and an audit log live in Neon through Drizzle. The owner installs the admin to a phone home screen and signs in with an eight-digit code emailed to them, because a link would open in Safari and leave the installed app signed out. Refunds and disputes are deliberately not built.',
  caption:
    'Two outlined boxes, two decisions. The webhook is the <b>only</b> place a paid session becomes an order, and it is idempotent, because Stripe will deliver the same event more than once and a shop that creates two orders for one payment is worse than one that creates none. And the admin signs in with a code rather than a link: on an iPhone the link opens in Safari, which keeps its own session, so the owner would tap it and find the installed app still signed out. Refunds stay in Stripe on purpose. A second place to issue one is a second place for the record to be wrong.',
})
