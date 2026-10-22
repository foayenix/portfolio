import { arrow, edgeLabel, elbow, node, page, zone } from './_kit.mjs'

const svg = [
  zone({ x: 40, y: 64, w: 260, h: 200, label: 'The browser' }),
  zone({ x: 352, y: 64, w: 256, h: 380, label: 'Vercel · the interface' }),
  zone({ x: 660, y: 64, w: 260, h: 380, label: 'Sites · the data, where it was' }),

  arrow(elbow(276, 122, 376, 104, 330)),
  arrow('M480,144 V192'),
  arrow('M480,286 V326', { accent: true }),
  arrow(elbow(584, 373, 684, 248, 636)),
  arrow('M790,178 V210'),
  arrow('M790,286 V320'),

  edgeLabel(306, 160, 'a password, no username'),
  edgeLabel(500, 182, 'again, on every route'),

  node({
    x: 64, y: 96, w: 212,
    title: 'One person',
    lines: ['this is a funding pipeline,', 'not a product'],
  }),
  node({
    x: 376, y: 84, w: 208,
    title: 'Signed session',
    lines: ['HttpOnly, SameSite=Lax'],
  }),
  node({
    x: 376, y: 192, w: 208,
    title: 'Every API route',
    lines: ['re-checks the session for', 'itself. A route is not safe', 'because its page was'],
  }),
  node({
    x: 376, y: 326, w: 208,
    title: 'The bridge',
    lines: [
      'the backend credential is',
      'used server-side and never',
      'reaches the browser',
    ],
    focal: true,
  }),
  node({
    x: 684, y: 84, w: 212,
    title: 'Three endpoints',
    lines: ['one fixed origin. Redirects', 'refused, writes cross-origin', 'rejected'],
    focal: true,
  }),
  node({
    x: 684, y: 210, w: 212,
    title: 'The register',
    lines: ['opportunities, deadlines,', 'notes, application stages'],
  }),
  node({
    x: 684, y: 320, w: 212,
    title: 'Daily at 08:00',
    lines: ['the research watch stays', 'here. It was never moved'],
  }),
].join('\n')

export default page({
  title: 'Sanko Funding Radar · architecture',
  eyebrow: 'Sanko Funding Radar',
  heading: 'A new front end on one host, reading a database and a schedule that never moved off another.',
  width: 960,
  height: 516,
  svg,
  label:
    'One person signs in with a password and no username. The session cookie is signed, HttpOnly and SameSite=Lax, and every API route re-checks it for itself rather than trusting that the page in front of it was protected. A server-side bridge holds the backend credential, which never reaches the browser, and speaks only to three known endpoints at one fixed origin with redirects refused and cross-origin writes rejected. The register and the daily 08:00 research watch stay on the original Sites deployment.',
  caption:
    'This is a bridge and not a migration, which is the unusual decision and the reason it is drawn as two hosts rather than one. The database and the daily research watch were never copied, so there is one authoritative register and one schedule rather than two that drift. The two outlined boxes are what makes that safe to do: the <b>credential stays on the server</b>, and the bridge will speak to <b>three endpoints at one origin</b> and nothing else, so a redirect cannot walk it somewhere new.',
})
