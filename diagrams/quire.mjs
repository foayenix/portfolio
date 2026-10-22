import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 400, h: 416, label: 'One browser profile · one machine · no account' }),
  zone({ x: 600, y: 64, w: 320, h: 204, label: 'Out' }),

  arrow('M244,156 V200'),
  arrow('M244,278 V322', { accent: true }),
  arrow(elbow(424, 236, 600, 112, 520)),
  arrow(elbow(424, 368, 600, 206, 508)),
  // Nothing in this build reaches a network. The absent half is drawn absent.
  arrow(elbow(416, 404, 600, 360, 520), { dashed: true }),

  edgeLabel(260, 186, 'highlight a passage'),
  edgeLabel(260, 308, 'drag a thread onto a sentence'),

  node({
    x: 64, y: 96, w: 360,
    title: 'Canvas · React Flow',
    lines: ['sources, highlights and the draft on one surface'],
  }),
  node({
    x: 64, y: 200, w: 360,
    title: 'pdf.js reader and highlight layer',
    lines: ['a highlight is a stable reference into the source,', 'and survives the source being moved or re-laid out'],
  }),
  node({
    x: 64, y: 322, w: 360,
    title: 'The citation is the gesture',
    lines: [
      'the drag resolves to that passage and becomes an',
      'inline footnote. There is no second step to forget',
    ],
    focal: true,
  }),
  node({
    x: 64, y: 428, w: 170,
    title: 'IndexedDB',
    lines: ['the whole library'],
  }),
  node({
    x: 254, y: 428, w: 170,
    title: 'Ollama · local',
    lines: ['optional, local'],
    dashed: true,
  }),
  node({
    x: 632, y: 84, w: 256,
    title: 'Exporters',
    lines: ['.docx · LaTeX · PDF', 'three formats that each model', 'footnotes differently'],
  }),
  node({
    x: 632, y: 328, w: 256,
    title: 'Sync, sharing, collaboration',
    lines: ['not built. One profile, one', 'machine, one person'],
    dashed: true,
    tone: 'muted',
  }),
].join('\n')

export default page({
  title: 'Quire — architecture',
  eyebrow: 'Quire',
  heading: 'Everything is on one machine, and the drag that makes a citation is the only way to make one.',
  width: 960,
  height: 548,
  svg,
  label:
    'Sources, highlights and the draft sit on one canvas. A pdf.js reader produces highlights that are stable references into a source. Dragging a thread from a highlight onto a sentence resolves to that passage and becomes an inline footnote. The library is held in IndexedDB in the browser, with an optional local Ollama model beside it, and exports go out to .docx, LaTeX and PDF. Sync, sharing and collaboration are not built.',
  caption:
    'The outlined box is the whole design: the gesture <b>is</b> the citation, so there is no separate step that can be skipped or got wrong, and the thread has to survive the source being dragged across the canvas and still come out correct in three formats that each model footnotes differently. Everything else follows from keeping the library in the browser — it opens with no login and works with the network off, and it costs sync entirely, which is drawn here rather than left for someone to discover.',
})
