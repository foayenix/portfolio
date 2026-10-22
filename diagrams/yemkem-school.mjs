import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 300, h: 356, label: 'The award ladder' }),
  zone({ x: 600, y: 64, w: 320, h: 356, label: 'What holds it up' }),

  arrow('M190,172 V190'),
  arrow('M190,266 V296'),
  arrow(elbow(340, 122, 632, 112, 480)),
  arrow(elbow(340, 230, 632, 206, 450)),
  arrow(elbow(340, 338, 632, 318, 510)),
  arrow(elbow(632, 392, 344, 452, 420)),

  edgeLabel(360, 468, 'and the page says what it does not confer'),

  node({
    x: 64, y: 96, w: 252,
    title: 'Certificate',
    lines: ['the entry award, with its own', 'module specifications'],
  }),
  node({
    x: 64, y: 190, w: 252,
    title: 'Diploma',
    lines: ['in African Herbal Medicine, the', 'award the school is built around'],
  }),
  node({
    x: 64, y: 296, w: 252,
    title: 'Professional Diploma',
    lines: ['and an open track of short courses', 'for practitioners already working'],
  }),
  node({
    x: 632, y: 84, w: 256,
    title: '1,920 learning hours',
    lines: ['benchmarked against', 'international curricula'],
  }),
  node({
    x: 632, y: 182, w: 256,
    title: '735 supervised clinical hours',
    lines: ['with a placement handbook', 'rather than a paragraph'],
  }),
  node({
    x: 632, y: 294, w: 256,
    title: 'Externally examined',
    lines: ['and a quality-assurance', 'handbook that says by whom'],
    focal: true,
  }),
  node({
    x: 40, y: 452, w: 300,
    title: 'Nine pages, written to one line',
    lines: ['“The tradition, taught to a standard.”', 'The institution leads; the founder sits', 'inside the heritage story, not in front'],
    focal: true,
  }),
].join('\n')

export default page({
  title: 'Yemkem School of Herbal Medicine · structure',
  eyebrow: 'Yemkem School of Herbal Medicine',
  heading: 'The hard part is a curriculum that survives being checked, not a website.',
  width: 960,
  height: 600,
  svg,
  label:
    'Three awards in a ladder: a certificate, the Diploma in African Herbal Medicine the school is built around, and a professional diploma with an open track of short courses. Each rests on 1,920 learning hours benchmarked against international curricula, 735 supervised clinical hours with their own placement handbook, and external examination described in a quality-assurance handbook. Nine designed pages are written to one line, with the institution leading and the founder inside the heritage story.',
  caption:
    'Heritage schools in this field look unserious to anyone with a science background, and academic ones have no reason to exist. Holding both is the brief, and it is carried by the right-hand column rather than by the prose: hours anyone can count, clinical placement with a handbook behind it, and an <b>external examiner</b> named in a quality-assurance document. The pages then do the thing most schools in this space leave out, which is to say on the page what an award <b>does not</b> confer.',
})
