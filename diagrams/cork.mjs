import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 212, label: 'The customer' }),
  zone({ x: 40, y: 332, w: 260, h: 152, label: 'The studio' }),
  zone({ x: 544, y: 64, w: 376, h: 456, label: 'Next.js · one codebase, two runtimes' }),

  arrow(elbow(276, 122, 572, 104, 488)),
  arrow(elbow(276, 232, 572, 214, 452)),
  arrow('M732,144 V182', { accent: true }),
  arrow('M732,288 V326'),
  arrow('M732,420 V458'),
  arrow(elbow(572, 374, 300, 392, 372)),

  edgeLabel(306, 96, 'asks what is free'),
  edgeLabel(306, 206, 'books a slot'),
  edgeLabel(306, 468, 'moves it through the stages'),

  node({
    x: 64, y: 96, w: 212,
    title: 'Availability',
    lines: ['the studio’s real diary'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'The assistant',
    lines: ['a router over a set guide.', 'Not a model, and it invents', 'nothing it cannot source'],
  }),
  node({
    x: 64, y: 364, w: 212,
    title: 'Staff',
    lines: ['one project, several people,', 'and no silent overwrites'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'Slot reservation',
    lines: ['atomic, and idempotent on a retry'],
  }),
  node({
    x: 572, y: 182, w: 320,
    title: 'Two people, one last slot',
    lines: [
      'one booking and one refusal. A double tap',
      'or a retried request reserves once, which is',
      'the only behaviour a diary can afford',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 326, w: 320,
    title: 'Project · five stages',
    lines: ['a stage will not advance without its owner', 'and its checklist. Delivery needs a link'],
  }),
  node({
    x: 572, y: 458, w: 320,
    title: 'Optimistic concurrency',
    lines: ['saving over a newer edit is refused'],
    focal: true,
  }),
].join('\n')

export default page({
  title: 'Cork Podcast Studio — architecture',
  eyebrow: 'Cork Podcast Studio',
  heading: 'Two people reaching for the last slot of the day get one booking and one refusal.',
  width: 960,
  height: 596,
  svg,
  label:
    'A customer asks what is free and books a slot. The reservation is atomic and idempotent, so a double tap or a retried request reserves once and two people racing for the last slot get one booking and one refusal. Booking creates a project with a preparation checklist, an owner and an activity entry, which staff move through preparation, recording, editing, review and delivery. A stage will not advance without its owner and its checklist, delivery needs an HTTPS link, and saving over a colleague’s newer edit is refused. The assistant is a deterministic router over a curated guide.',
  caption:
    'Both outlined boxes are about two people and one record. A booking that is not atomic sells the same hour twice, and a retried request that is not idempotent sells it twice to the same person. A project update without optimistic concurrency lets whoever saves last win, silently. Neither is visible in a demo and both are the difference between a workspace and a spreadsheet. The assistant is a <b>deterministic router</b>, not a model: a question it cannot source becomes a staff enquiry, and marking that enquiry reviewed sends nobody a reply, because nothing here can send one.',
})
