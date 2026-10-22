// The shared chrome for every architecture diagram.
//
// Conventions follow diagram-design (MIT): orthogonal connectors only, zones
// drawn before arrows and arrows before nodes, at most two focal nodes per
// drawing, and a bridge on the less important line wherever two must cross.
// Everything is skinned to this site's own tokens, in both themes, so a
// diagram inside the site is not a visitor from another design system.
//
// The one rule worth stating: a label that does not fit its box fails the
// build. The first hand-authored diagram shipped a sublabel that ran out past
// its own node, and nobody notices that in a code review.

/** Rough advance widths, measured from the two faces the page actually loads. */
const TITLE_CH = 7.3; // Archivo 620 at 13px
const SUB_CH = 6.35; // DM Mono 400 at 10.5px
const PAD = 16;

const problems = [];
export const complaints = () => problems;

// Where the connectors run, and where the labels sit.
//
// A label that lands on the line it annotates is the one fault a screenshot
// catches and a code review never does, so the build checks for it. Both lists
// are cleared by page(), because they describe one drawing and not all of them.
let segments = [];
let labels = [];
let boxes = [];
let ends = [];
const LABEL_CH = 6.1;
// A 10.5px label's glyphs sit roughly from eight above its baseline to two below.
const ASCENT = 8;
const DESCENT = 2;

function checkEnds(where) {
  for (const point of ends) {
    for (const box of boxes) {
      const inside =
        point.x > box.x + 1 && point.x < box.x + box.w - 1 &&
        point.y > box.y + 1 && point.y < box.y + box.h - 1;
      if (inside) {
        problems.push(
          `${where}: a connector starts or ends inside "${box.title}" at ${point.x},${point.y}`,
        );
        break;
      }
    }
  }
}

function checkLabels(where) {
  for (const label of labels) {
    const top = label.y - ASCENT;
    const bottom = label.y + DESCENT;
    for (const seg of segments) {
      const hit =
        seg.kind === 'v'
          ? seg.x >= label.x1 - 2 && seg.x <= label.x2 + 2 && seg.from < bottom && seg.to > top
          : seg.y > top && seg.y < bottom && seg.from < label.x2 && seg.to > label.x1;
      if (hit) {
        problems.push(`${where}: a connector runs through "${label.text}"`);
        break;
      }
    }
  }
  segments = [];
  labels = [];
  boxes = [];
  ends = [];
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A dashed or solid region. Drawn first, so arrows and nodes sit on top. */
export function zone({ x, y, w, h, label }) {
  const mask = label.length * 6.1 + 12;
  return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="var(--zone)" stroke="var(--zone-rule)" stroke-width="0.8"/>
      <rect x="${x + 12}" y="${y - 6}" width="${mask.toFixed(0)}" height="12" fill="var(--paper)"/>
      <text class="z" x="${x + 18}" y="${y + 4}">${esc(label)}</text>`;
}

/** The height a node needs for its lines, so no caller has to count them. */
export const nodeH = (lines) => (lines.length === 0 ? 40 : 40 + 18 * lines.length);

/**
 * A component.
 *
 * `focal` is the accent treatment and is capped at two per diagram by the
 * build. `dashed` means optional, absent or not yet built, never a style
 * choice. `tone: 'muted'` greys the title for something that does not exist
 * yet.
 */
export function node({ x, y, w, title, lines = [], focal = false, dashed = false, tone }) {
  const h = nodeH(lines);
  const inner = w - PAD * 2;

  if (title.length * TITLE_CH > inner) {
    problems.push(`title overflows ${w}px box: "${title}"`);
  }
  for (const line of lines) {
    if (line.length * SUB_CH > inner) {
      problems.push(`line overflows ${w}px box: "${line}"`);
    }
  }

  const fill = focal ? 'var(--accent-tint)' : dashed ? 'none' : 'var(--paper-hi)';
  const stroke = focal ? 'var(--flo-deep)' : 'var(--rule)';
  const weight = focal ? 1.4 : 1;
  const dash = dashed ? ' stroke-dasharray="4,3"' : '';
  const titleFill = tone === 'muted' ? ' fill="var(--ink-2)"' : '';

  boxes.push({ x, y, w, h, title });

  const body = lines
    .map((line, i) => `<text class="s" x="${x + PAD}" y="${y + 42 + i * 18}">${esc(line)}</text>`)
    .join('\n      ');

  return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${weight}"${dash}/>
      <text class="n" x="${x + PAD}" y="${y + 24}"${titleFill}>${esc(title)}</text>
      ${body}`;
}

/**
 * A connector that leaves horizontally, turns once, and arrives horizontally.
 * The only other shape allowed is a straight line, because a diagonal between
 * two off-axis boxes reads as a mistake.
 */
export function elbow(x1, y1, x2, y2, midX, r = 8) {
  ends.push({ x: x1, y: y1 }, { x: x2, y: y2 });
  segments.push({ kind: 'h', y: y1, from: Math.min(x1, midX), to: Math.max(x1, midX) });
  if (Math.abs(y1 - y2) < 0.5) return `M${x1},${y1} H${x2}`;
  segments.push({ kind: 'h', y: y2, from: Math.min(midX, x2), to: Math.max(midX, x2) });
  segments.push({ kind: 'v', x: midX, from: Math.min(y1, y2), to: Math.max(y1, y2) });
  const sx = x1 < midX ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  const ex = midX < x2 ? 1 : -1;
  return [
    `M${x1},${y1}`,
    `H${midX - sx * r}`,
    `Q${midX},${y1} ${midX},${y1 + sy * r}`,
    `V${y2 - sy * r}`,
    `Q${midX},${y2} ${midX + ex * r},${y2}`,
    `H${x2}`,
  ].join(' ');
}

/** A bridge over a crossing, for the less important of the two lines. */
export const hop = (down = false) => `a 8,8 0 0,${down ? 0 : 1} 0,16`;

export const arrow = (d, { dashed = false, accent = false } = {}) => {
  // A plain vertical, which is where a start point hand-computed from a node's
  // height goes wrong. Anything more elaborate is the author's to check.
  const plain = /^M(-?[\d.]+),(-?[\d.]+) V(-?[\d.]+)$/.exec(d.trim());
  if (plain) {
    const x = Number(plain[1]);
    ends.push({ x, y: Number(plain[2]) }, { x, y: Number(plain[3]) });
  }
  return `<path d="${d}" fill="none" stroke="var(--ink-2)" stroke-width="${dashed ? 1 : 1.2}"${
    dashed ? ' stroke-dasharray="4,3"' : ''
  } marker-end="url(#${accent ? 'arrow-a' : 'arrow'})"/>`;
};

export const edgeLabel = (x, y, text, anchor = 'start') => {
  const w = text.length * LABEL_CH;
  const x1 = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
  labels.push({ text, y, x1, x2: x1 + w });
  return `<text class="a" x="${x}" y="${y}" text-anchor="${anchor}">${esc(text)}</text>`;
};

/** The page the SVG is served in. One file, both themes. */
export function page({ title, eyebrow, heading, caption, label, width, height, svg }) {
  checkEnds(eyebrow);
  checkLabels(eyebrow);
  return `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;620&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
<style>
  /* The portfolio's own tokens, copied from app/globals.css. */
  :root {
    --paper: #e6e5df; --paper-hi: #f2f1ec; --ink: #12233d; --ink-2: #4e5c72;
    --rule: #c6c5bb; --flo: #e0316b; --flo-deep: #c0184f;
    --accent-tint: rgba(224, 49, 107, 0.09);
    --zone: rgba(18, 35, 61, 0.025); --zone-rule: rgba(18, 35, 61, 0.12);
    color-scheme: light;
  }
  @media (prefers-color-scheme: dark) { :root:not([data-theme='light']) { ${darkTokens()} } }
  :root[data-theme='dark'] { ${darkTokens()} }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: var(--paper); }
  body { font-family: 'Archivo', system-ui, sans-serif; color: var(--ink); padding: 18px 16px 22px; }
  figure { margin: 0 auto; max-width: 1000px; }
  svg { display: block; width: 100%; height: auto; }
  .eyebrow { font-family: 'DM Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em;
             text-transform: uppercase; color: var(--ink-2); margin: 0 0 6px; }
  h1 { font-size: 19px; font-weight: 620; letter-spacing: -0.01em; margin: 0 0 14px; line-height: 1.3; }
  figcaption { margin-top: 14px; max-width: 78ch; font-size: 13px; line-height: 1.62; color: var(--ink-2);
               border-top: 1px solid var(--rule); padding-top: 10px; }
  figcaption b { color: var(--ink); font-weight: 500; }
  .n { font-size: 13px; font-weight: 620; fill: var(--ink); }
  .s { font-family: 'DM Mono', ui-monospace, monospace; font-size: 10.5px; fill: var(--ink-2); }
  .z { font-family: 'DM Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.08em;
       text-transform: uppercase; fill: var(--ink-2); }
  .a { font-family: 'DM Mono', ui-monospace, monospace; font-size: 10px; fill: var(--ink-2); }
</style>

<script>
  // The page is framed by the site, which cannot reach inside to set a theme,
  // so the frame asks for one in the query string. Without it the page follows
  // the reader's own system setting, which is the right answer on its own.
  (function () {
    try {
      var want = new URLSearchParams(location.search).get('theme');
      if (want === 'dark' || want === 'light') document.documentElement.setAttribute('data-theme', want);
    } catch (e) {}
  })();
</script>

<figure>
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h1>${heading}</h1>

  <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 z" fill="var(--ink-2)"/>
      </marker>
      <marker id="arrow-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9 z" fill="var(--flo-deep)"/>
      </marker>
    </defs>
${svg}
  </svg>

  <figcaption>${caption}</figcaption>
</figure>
`;
}

function darkTokens() {
  return `--paper: #0e1b2e; --paper-hi: #16273f; --ink: #e8e7e0; --ink-2: #93a2b8;
      --rule: #27394f; --flo: #ff5c8a; --flo-deep: #ff7ba1;
      --accent-tint: rgba(255, 92, 138, 0.12);
      --zone: rgba(232, 231, 224, 0.03); --zone-rule: rgba(232, 231, 224, 0.12);
      color-scheme: dark;`;
}
