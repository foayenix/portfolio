import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 212, label: 'One control' }),
  zone({ x: 40, y: 332, w: 260, h: 212, label: 'Two renderers' }),
  zone({ x: 544, y: 64, w: 376, h: 420, label: 'The night, as a state machine' }),

  arrow(elbow(276, 122, 572, 104, 500)),
  arrow(elbow(276, 404, 572, 290, 400)),
  arrow('M732,144 V182'),
  arrow('M732,258 V288'),
  arrow('M732,368 V406', { accent: true }),
  arrow('M732,500 V528'),

  edgeLabel(306, 96, 'turn, press, hold'),
  edgeLabel(306, 282, 'every frame'),

  node({
    x: 64, y: 96, w: 212,
    title: 'The dial',
    lines: ['it does not scroll a menu.', 'It bends the world on screen'],
  }),
  node({
    x: 64, y: 184, w: 212,
    title: 'No build step',
    lines: ['software/index.html opens', 'in a browser as it is'],
  }),
  node({
    x: 64, y: 364, w: 212,
    title: 'Canvas 2D · always',
    lines: ['every theme draws here first'],
  }),
  node({
    x: 64, y: 452, w: 212,
    title: 'WebGL2 · if present',
    lines: ['HDR particles, then bloom:', 'threshold, downsample, tent'],
    dashed: true,
  }),
  node({
    x: 572, y: 84, w: 320,
    title: 'Evening, and the wind-down',
    lines: ['the world dims with the hour'],
  }),
  node({
    x: 572, y: 182, w: 320,
    title: 'Sleep, then the sunrise',
    lines: ['the thirty minutes before the alarm are the', 'part a clock is judged on'],
  }),
  node({
    x: 572, y: 288, w: 320,
    title: 'Alarm · snooze · dismiss',
    lines: ['and then good morning'],
  }),
  node({
    x: 572, y: 406, w: 320,
    title: 'The time driver',
    lines: [
      '1×, 60× or 600×, and a jump to thirty minutes',
      'before the alarm. A night is testable in',
      'about a minute instead of overnight',
    ],
    focal: true,
  }),
  node({
    x: 572, y: 528, w: 320,
    title: '?gl=0 · a fallback you can look at',
    lines: ['the GPU path is an enhancement, and a clock', 'that stops telling the time is not a clock'],
    focal: true,
  }),
].join('\n')

export default page({
  title: 'JÍBẸ́WÀ · architecture',
  eyebrow: 'JÍBẸ́WÀ',
  heading: 'A whole night runs in a minute, and the clock still works when the GPU is gone.',
  width: 960,
  height: 644,
  svg,
  label:
    'One dial, turned, pressed and held, pushes and bends a generative world rather than scrolling a menu. Every theme draws on the 2D canvas first, and where WebGL2 exists it finishes the frame with HDR particles and a bloom chain. The night runs as a state machine through evening, wind-down, sleep, sunrise, alarm, snooze and dismiss. A time driver runs it at one, sixty or six hundred times speed, so a whole night can be watched in about a minute. Adding gl=0 forces the 2D renderer and the clock still works.',
  caption:
    'Both outlined boxes exist because of the same problem: a bedside clock is hard to work on. Its behaviour happens over eight hours, which nobody can iterate against, so the <b>time driver</b> runs the same clock at six hundred times speed and can jump to thirty minutes before the alarm. And the GPU path is an enhancement rather than a requirement, so <b>?gl=0</b> is a fallback you can look at rather than a claim: a clock that fails to show the time when a driver is missing is not a clock.',
})
