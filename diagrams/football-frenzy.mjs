import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 288, label: 'In the browser' }),
  zone({ x: 544, y: 64, w: 376, h: 432, label: 'On the server' }),

  arrow(elbow(276, 232, 572, 112, 504)),
  arrow('M732,192 V232', { accent: true }),
  arrow('M732,328 V368'),
  arrow(elbow(572, 404, 300, 300, 364)),
  arrow('M170,172 V200'),

  edgeLabel(306, 224, 'snapshot, seed, decision log'),
  edgeLabel(316, 292, 'the result, and whether the card was legal'),
  edgeLabel(186, 184, 'a world, with no sign-up'),

  node({
    x: 64, y: 96, w: 212,
    title: 'A cookie, and a code',
    lines: ['no account. The recovery', 'code is how a world is kept'],
  }),
  node({
    x: 64, y: 200, w: 212,
    title: 'The match, on canvas',
    lines: ['five-a-side, minutes long.', 'Momentum cards mid-match'],
  }),
  node({
    x: 64, y: 290, w: 212,
    title: 'Leagues and cups',
    lines: ['friends join by share code'],
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'The decision log',
    lines: ['what the player did, and when, and the seed', 'the match started from'],
  }),
  node({
    x: 572, y: 232, w: 320,
    title: 'Re-simulation',
    lines: [
      'the server replays the match from the same',
      'prefix. A card play counts only if the replay',
      'produces it. The browser never decides',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 368, w: 320,
    title: 'PostgreSQL',
    lines: ['worlds, squads, fixtures and the economy:', 'wages, aging and retirement'],
  }),
].join('\n')

export default page({
  title: 'Football Frenzy · architecture',
  eyebrow: 'Football Frenzy',
  heading: 'Every match is a seed and a list of decisions, so the server can play it again and check.',
  width: 960,
  height: 552,
  svg,
  label:
    'A world is kept by a cookie and a recovery code rather than an account. Matches run on canvas in the browser and produce a snapshot pair, a seed and a decision log. The server replays the match from an identical prefix, so a mid-match card play counts only if the replay produces it, and the client never decides. Worlds, squads, fixtures and the economy live in PostgreSQL. Friends join leagues and cups by share code.',
  caption:
    'The outlined box is why the game can have stakes. A match that only happens in the browser is a match the browser can lie about, so every match is stored as the thing it was made from, a seed and the decisions taken, and the server replays it from an identical prefix. <b>A card play is legal only if the replay produces it.</b> That also makes every match reviewable after the fact, which is the part that makes a league worth winning.',
})
