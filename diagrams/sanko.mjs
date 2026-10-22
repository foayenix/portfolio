import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 232, label: 'How a message arrives' }),
  zone({ x: 544, y: 64, w: 376, h: 448, label: 'The agent · Node 20 · Express 5' }),

  arrow('M170,172 V200'),
  arrow(elbow(276, 244, 572, 122, 520)),
  arrow('M732,160 V182'),
  arrow('M732,266 V292', { accent: true }),
  arrow('M732,394 V428'),
  arrow(elbow(572, 465, 300, 358, 356)),
  arrow('M700,494 V578 Q700,586 692,586 H620', { dashed: true }),

  edgeLabel(186, 184, 'same runAgent()'),
  edgeLabel(300, 238, 'text, voice note or photo'),
  edgeLabel(376, 452, 'records, scoped'),
  edgeLabel(712, 572, 'approved cases'),

  node({
    x: 64, y: 96, w: 212,
    title: 'WhatsApp Cloud API',
    lines: ['the pilot, blocked on a', 'Meta production number'],
    dashed: true,
    tone: 'muted',
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'Browser simulator',
    lines: ['the same agent loop, with', 'every tool call beside it'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'Intake · Whisper and vision',
    lines: ['local model servers. A voice note in Yorùbá', 'becomes the same content blocks as text'],
  }),
  node({
    x: 572, y: 182, w: 320,
    title: 'Tool-calling loop · 22 tools',
    lines: ['no keywords and no fixed steps. Ollama by', 'default, Anthropic as the alternative'],
  }),
  node({
    x: 572, y: 292, w: 320,
    title: 'Executors',
    lines: [
      'resolve every record by short code scoped',
      'to the calling practitioner. That scoping is',
      'query predicate, not a line in the prompt',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 428, w: 320,
    title: 'Supabase · records and a private bucket',
    lines: ['152 Nigerian plant names → botanical Latin'],
  }),
  node({
    x: 64, y: 332, w: 236,
    title: 'An invented FM-00042',
    lines: ['comes back “not found”, never', 'another practitioner’s patient'],
    focal: true,
  }),
  node({
    x: 340, y: 548, w: 280,
    title: 'Evaluation set',
    lines: ['makes no model call until a hundred', 'cases carry a practitioner’s approval'],
    dashed: true,
    tone: 'muted',
  }),
].join('\n')

export default page({
  title: 'Sanko — architecture',
  eyebrow: 'Sanko',
  heading: 'The scoping is a query predicate in the executor, because a prompt is a request and a predicate is not.',
  width: 960,
  height: 640,
  svg,
  label:
    'A message arrives either from the WhatsApp Cloud API, where the pilot is blocked on a Meta production number, or from a browser simulator running the same agent loop. Intake turns text, a voice note or a photograph into the same content blocks using local Whisper and vision servers. A tool-calling loop with twenty-two tools runs over them, with Ollama by default and Anthropic as the alternative. Every executor resolves records by short code scoped to the calling practitioner, so an invented code returns not found rather than another practitioner’s patient. Records and media go to Supabase. The evaluation set makes no model call until a hundred cases carry a practitioner’s approval.',
  caption:
    'The two outlined boxes are one mechanism and its consequence. The agent has no keywords and no fixed steps, so it can produce a plausible record code and ask for it — and the scoping that stops that is a <b>query predicate in the executor</b>, not an instruction in the prompt, because a prompt is a request and a predicate is not. The evaluation set is drawn dashed on purpose: it exists and it has not run, and it will not run until a hundred cases carry a practitioner’s approval.',
})
