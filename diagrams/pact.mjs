import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 216, label: 'Who touches it' }),
  zone({ x: 544, y: 64, w: 376, h: 436, label: 'The agreement, one state at a time' }),

  arrow(elbow(276, 122, 572, 104, 516)),
  arrow(elbow(276, 222, 572, 182, 492)),
  arrow('M732,142 V162'),
  arrow('M732,220 V240'),
  arrow('M732,316 V354', { accent: true }),
  arrow('M732,412 V432'),
  arrow(elbow(300, 350, 572, 196, 380)),
  arrow(elbow(300, 470, 572, 390, 420)),

  edgeLabel(304, 114, 'writes it in plain words'),
  edgeLabel(306, 500, 'added beside the signed version'),

  node({ x: 64, y: 96, w: 212, title: 'The author', lines: ['no template, no legal form'] }),
  node({
    x: 64, y: 184, w: 212,
    title: 'The counterparty',
    lines: ['reviews, negotiates and', 'signs from a private link.', 'Nothing to install'],
  }),
  node({
    x: 40, y: 320, w: 260,
    title: 'Agreement Check',
    lines: ['flags what is missing and what', 'is unclear. It never says the', 'agreement is valid'],
    focal: true,
  }),
  node({
    x: 40, y: 440, w: 260,
    title: 'Amendments',
    lines: ['a new version alongside, never', 'an edit of the signed one'],
    focal: true,
  }),

  node({ x: 572, y: 84, w: 320, title: 'Draft', lines: ['plain language, no clauses yet'] }),
  node({
    x: 572, y: 162, w: 320,
    title: 'Review',
    lines: ['every change is a diff with a name on it'],
  }),
  node({
    x: 572, y: 240, w: 320,
    title: 'Signed',
    lines: ['both sides, from the same link. This version', 'is the one that never changes again'],
  }),
  node({
    x: 572, y: 354, w: 320,
    title: 'Active',
    lines: ['what each side owes, and what has been done'],
  }),
  node({ x: 572, y: 432, w: 320, title: 'Complete', lines: ['with its evidence attached'] }),
].join('\n')

export default page({
  title: 'Pact — architecture',
  eyebrow: 'Pact',
  heading: 'An agreement has a state, and the signed version of it never changes.',
  width: 960,
  height: 560,
  svg,
  label:
    'An author writes an agreement in plain words and a counterparty reviews, negotiates and signs it from a private link with nothing installed. The agreement moves through draft, review, signed, active and complete, and every change in review arrives as a diff with a name on it. Agreement Check flags what is missing and what is unclear without claiming the agreement is valid. An amendment is a new version alongside the signed one rather than an edit of it.',
  caption:
    'The spine on the right is the product: the state of an agreement is legible without reading the document. Two boxes carry the rest. <b>Agreement Check</b> raises completeness and clarity warnings and stops short of implying legal validity, which is the line a tool like this has to hold. And an <b>amendment</b> is added beside the signed version rather than over it, so what both sides actually signed is still there to read.',
})
