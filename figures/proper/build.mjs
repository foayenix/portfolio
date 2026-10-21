// Fig 2 — Proper, drawn as a profile bench with a fence across the rail.
//
// The concept: Proper's scanner is deterministic, and the optional model-driven
// explanation layer sits on top of its output and cannot reach the findings.
// A model that can see a finding will restate it as a new one, so the scan runs
// to completion first and its output is the only thing the explanation layer is
// ever given. It can describe a finding. It cannot create one, remove one, or
// move a score. The second idea in the same picture: on the project map a solid
// line was read from the import graph and a dashed one is only the scanner's
// own grouping of file paths.
//
// The object: one rail carrying two carriages, with a hard stop bolted across
// it. The stylus carriage reads the workpiece and drops a token into a numbered
// well for every segment it has read; the dial is driven by the tokens. The pen
// carriage follows the stylus and runs into the stop. It can write on its card.
// It cannot reach a single well. The fence is geometry, not a rule written
// somewhere — which is the whole argument, made as a thing you can look at.
// The two linkages say the rest: a rigid tie-rod is a line read from the
// imports, a slack chain is only the scanner's own grouping.
//
// Build: node figures/proper/build.mjs [--light]

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 820;
const HEIGHT = 470;

const BASE = { x: -176, y: -88, w: 352, d: 176, r: 10 };
const PLATE_H = 13;
const FOOT_H = 6;

// The workpiece: seven segments of a repository, each its own height.
const SEG_W = 21;
const SEG_GAP = 3;
const SEG_FROM = -152;
const SEG_D = 34;
const SEG_H = [19, 31, 25, 39, 23, 35, 21];
const SEAT_Z = 9;
const segPlan = (i) => ({
  x: SEG_FROM + i * (SEG_W + SEG_GAP),
  y: -SEG_D / 2,
  w: SEG_W,
  d: SEG_D,
  r: 1.5,
});
const segMid = (i) => segPlan(i).x + SEG_W / 2;
const segTop = (i) => SEAT_Z + SEG_H[i];
// Rigid tie-rods: edges actually read from the imports.
const RODS = [[0, 1], [2, 3], [5, 6]];
// Slack chains: the scanner's own grouping of file paths, and nothing more.
const CHAINS = [[1, 2], [3, 4]];

const SEAT = { x: SEG_FROM - 6, y: -SEG_D / 2 - 5, w: 7 * SEG_W + 6 * SEG_GAP + 12, d: SEG_D + 10, r: 3 };

const POSTS = [-166, 152];
const POST_R = 6.5;
const NUT_Z = 92;
const POST_TOP = 132;

const RAIL = { x: -166, y: -6, w: 318, d: 12, r: 2 };
const RAIL_Z = 114;
const RAIL_H = 7;
const RAIL_TOP = RAIL_Z + RAIL_H;

// The fence. Everything about this figure turns on where this sits.
const FENCE_X = 48;

const CAR = { x: -16, y: -16, w: 32, d: 32, r: 3.5 };
const CAR_H = 11;
const CAR_TOP = RAIL_TOP + CAR_H;
const BUSHING_X = [-10, 10];

const PROBE_LEN = 26;
const PROBE_UP = 58;
const STYLUS_REACH = [segMid(0) - 8, FENCE_X - 22];

// The findings rack: one numbered well per segment, on the base in front.
const RACK = { x: -150, y: 40, w: 150, d: 24, r: 3 };
const WELL_R = 7;
const wellAt = (i) => [RACK.x + 13 + i * 20.6, RACK.y + RACK.d / 2];

// The card the pen writes on, on the far side of the fence.
const CARD = { x: 66, y: 26, w: 84, d: 38, r: 2 };

const DIAL = [152, -46];
const DIAL_Z = 62;
const DIAL_H = 11;
const DIAL_R = 15;
const DIAL_TOP = DIAL_Z + DIAL_H;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -PLATE_H - FOOT_H, 0),
    [POSTS[0], 0, POST_TOP + 4],
    [POSTS[1], 0, POST_TOP + 4],
    [DIAL[0] + DIAL_R, DIAL[1] + DIAL_R, DIAL_TOP],
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 46 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) =>
  [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const polyline3 = (points) =>
  points
    .map((point, index) => {
      const [sx, sy] = at(point);
      return `${index === 0 ? "M" : "L"}${sx.toFixed(2)} ${sy.toFixed(2)}`;
    })
    .join("");

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BASE, 24))) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.8, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6.2, -PLATE_H - FOOT_H + 1.8, FOOT_H - 1.8, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BASE, -PLATE_H, PLATE_H, P, 10, 1.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 6), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 12);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  const strip = { x: -156, y: BASE.y + BASE.d - 16, w: 312, d: 8, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.7, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 5, strip.x + strip.w - 5, 5, 5, strip.y + 1, 0.7, [2.2, 4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(
    D([at([strip.x + 2.5, strip.y + 4, 0.7]), at([strip.x + strip.w - 2.5, strip.y + 4, 0.7])], { size: 0.45 }),
  );

  const plate = { x: -160, y: -76, w: 56, d: 13, r: 1.5 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 2), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.8), 0.8, P, 1), { tone: "faint" }));
  out.push(
    k.faceTextSvg(k.topMatrix([plate.x + plate.w / 2, plate.y + 8.4], 0.8, P, "x"), "PROPER", {
      size: 5,
      tone: "lo",
      anchor: "middle",
    }),
  );
  return out.join("");
}

/** The seat the workpiece sits in, with a vee groove along it. */
function seat() {
  const out = [];
  out.push(S(k.slabOf(SEAT, 0, SEAT_Z, P, 3, 0.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(SEAT, 4), SEAT_Z, P, 2), { tone: "faint" }));
  for (const dy of [-SEG_D / 2 - 1.5, SEG_D / 2 + 1.5]) {
    out.push(L(k.lineOnTop([SEAT.x + 4, dy], [SEAT.x + SEAT.w - 4, dy], SEAT_Z, P), { tone: "lo" }));
  }
  const screws = k.corners(SEAT, 6);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 1.8, SEAT_Z, P, 12)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, SEAT_Z])), { size: 0.45 }));
  return out.join("");
}

/** The workpiece. Seven segments, each with its own height and its own number of screws. */
function workpiece() {
  const out = [];
  SEG_H.forEach((height, i) => {
    const plan = segPlan(i);
    out.push(S(k.slabOf(plan, SEAT_Z, height, P, 1.5, 0.6), { tone: "hi", crease: "lo" }));
    out.push(L(k.planOutline(k.insetPlan(plan, 3), segTop(i), P, 1.5), { tone: "faint" }));
    // A reading hole in the top of every segment: where the stylus lands.
    out.push(L(k.ring(segMid(i), 0, 2.6, segTop(i), P, 14), { tone: "lo" }));
    out.push(D([at([segMid(i), 0, segTop(i)])], { size: 0.5, tone: "lo" }));
    out.push(
      D(
        [
          at([plan.x + 4, plan.y + 4, segTop(i)]),
          at([plan.x + plan.w - 4, plan.y + 4, segTop(i)]),
          at([plan.x + 4, plan.y + plan.d - 4, segTop(i)]),
          at([plan.x + plan.w - 4, plan.y + plan.d - 4, segTop(i)]),
        ],
        { size: 0.4, tone: "lo" },
      ),
    );
  });
  return out.join("");
}

/**
 * The two kinds of linkage, both along the front face of the workpiece so the
 * contrast between them is the first thing the eye catches.
 *
 * A rigid tie-rod is an edge actually read from the imports: straight, taut,
 * bolted at both ends. A slack chain is only the scanner's own grouping of
 * file paths: it hangs, and it is drawn dashed. A line never looks more
 * certain than the evidence behind it, which is the rule the project map in
 * the software follows, and the reason this figure has two linkages at all.
 */
const LINK_Y = SEG_D / 2 + 2;

function rods() {
  const out = [];
  for (const [a, b] of RODS) {
    const za = segTop(a) + 5;
    const zb = segTop(b) + 5;
    // The stanchion each end of the rod is bolted to, so it lands on the part.
    for (const [x, z] of [[segMid(a), za], [segMid(b), zb]]) {
      out.push(S(k.cylinder(x, LINK_Y, 2.4, z - 5, 5, P, 16), { tone: "mid" }));
      out.push(S(k.cylinder(x, LINK_Y, 3.4, z - 1.4, 2.8, P, 18), { tone: "mid" }));
    }
    out.push(
      `<path class="iso-line" data-tone="mid" d="${polyline3([
        [segMid(a), LINK_Y, za],
        [segMid(b), LINK_Y, zb],
      ])}" style="stroke-width:2.1;stroke-linecap:round"/>`,
    );
    for (const [x, z] of [[segMid(a), za], [segMid(b), zb]]) {
      out.push(L(k.ring(x, LINK_Y, 3.4, z + 1.4, P, 14), { tone: "lo" }));
      out.push(D([at([x, LINK_Y, z + 1.4])], { size: 0.5, tone: "lo" }));
    }
  }
  return out.join("");
}

function chains() {
  const out = [];
  for (const [a, b] of CHAINS) {
    const za = segTop(a) + 3;
    const zb = segTop(b) + 3;
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      points.push([
        segMid(a) + (segMid(b) - segMid(a)) * t,
        LINK_Y,
        za + (zb - za) * t - Math.sin(t * Math.PI) * 13,
      ]);
    }
    out.push(
      `<path class="iso-line" data-tone="faint" d="${polyline3(points)}" style="stroke-width:0.95;stroke-dasharray:2.2 2.8"/>`,
    );
    // A staple at each end: a slack line still has to end on something.
    for (const [x, z] of [[segMid(a), za], [segMid(b), zb]]) {
      out.push(S(k.cylinder(x, LINK_Y, 1.6, z - 3, 3, P, 12), { tone: "mid", crease: "none" }));
      out.push(L(k.ring(x, LINK_Y, 2.2, z, P, 12), { tone: "lo" }));
      out.push(D([at([x, LINK_Y, z])], { size: 0.45, tone: "lo" }));
    }
  }
  return out.join("");
}

/** The findings rack: one numbered well per segment. A token drops in as it is read. */
function rack() {
  const out = [];
  out.push(S(k.slabOf(RACK, 0, 6, P, 3, 0.7), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(RACK, 2.5), 6, P, 2), { tone: "faint" }));
  // The numbered scale along the rack's front lip.
  const ticks = k.topTicks(RACK.x + 6, RACK.x + RACK.w - 6, 7, 1, RACK.y + RACK.d - 3, 6, [1.6, 3], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(
    D([at([RACK.x + 3, RACK.y + RACK.d - 3, 6]), at([RACK.x + RACK.w - 3, RACK.y + RACK.d - 3, 6])], {
      size: 0.4,
      tone: "lo",
    }),
  );
  for (let i = 0; i < SEG_H.length; i++) {
    const [x, y] = wellAt(i);
    out.push(L(k.ring(x, y, WELL_R, 6, P, 24), { tone: "lo" }));
    out.push(L(k.ring(x, y, WELL_R - 2.2, 6, P, 24), { tone: "faint" }));
    out.push(D([at([x, y, 6])], { size: 0.4, tone: "lo" }));
  }
  return out.join("");
}

/** A finding token, drawn once and revealed when the stylus has read that segment. */
function token(i) {
  const [x, y] = wellAt(i);
  const out = [];
  out.push(S(k.cylinder(x, y, WELL_R - 2.6, 6, 2.6, P, 24), { tone: "hi", lit: true }));
  out.push(L(k.ring(x, y, WELL_R - 4.4, 8.6, P, 18), { tone: "lit" }));
  out.push(D([at([x, y, 8.6])], { size: 0.45, tone: "lit" }));
  return out.join("");
}

function post(x, part) {
  const out = [];
  if (part === "lower") {
    out.push(S(k.cylinder(x, 0, POST_R + 3, 0, 5, P, 32), { tone: "mid" }));
    out.push(L(k.ring(x, 0, POST_R + 1.4, 5, P, 24), { tone: "lo" }));
    out.push(D(byDepth(k.corners({ x: x - 6, y: -6, w: 12, d: 12, r: 0 }, 0)).map(([cx, cy]) => at([cx, cy, 5])), { size: 0.45, tone: "lo" }));
    out.push(S(k.cylinder(x, 0, POST_R, 5, NUT_Z - 5, P, 32), { tone: "mid", crease: "none" }));
    out.push(L([28, 56, 84].map((z) => k.sideArc(x, 0, POST_R, z, P, 18)).join(""), { tone: "faint" }));
    return out.join("");
  }
  out.push(S(k.cylinder(x, 0, POST_R + 3.4, NUT_Z, 8, P, 12), { tone: "mid" }));
  out.push(L(k.knurl(x, 0, POST_R + 3.4, NUT_Z, NUT_Z + 8, 12, P), { tone: "lo" }));
  out.push(S(k.cylinder(x, 0, POST_R - 1.2, NUT_Z + 8, POST_TOP - NUT_Z - 8, P, 28), { tone: "mid", crease: "none" }));
  out.push(L(k.coil(x, 0, POST_R - 0.6, NUT_Z + 9, POST_TOP - 3, 7, P, 40), { tone: "faint" }));
  out.push(S(k.cylinder(x, 0, POST_R + 1.2, POST_TOP, 3, P, 28), { tone: "mid" }));
  out.push(D([at([x, 0, POST_TOP + 3])], { size: 0.55, tone: "lo" }));
  return out.join("");
}

function rail() {
  const out = [];
  out.push(S(k.slabOf(RAIL, RAIL_Z, RAIL_H, P, 2.5, 0.6), { tone: "mid" }));
  const ticks = k.topTicks(RAIL.x + 10, RAIL.x + RAIL.w - 10, 5, 6, RAIL.y + 1.8, RAIL_TOP, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  for (const x of [RAIL.x - 4, RAIL.x + RAIL.w - 1]) {
    out.push(S(k.slabOf({ x, y: -9, w: 5, d: 18, r: 1.2 }, RAIL_Z, RAIL_H + 4, P, 2, 0.5), { tone: "mid" }));
    out.push(D([at([x + 2.5, -4.5, RAIL_TOP + 4]), at([x + 2.5, 4.5, RAIL_TOP + 4])], { size: 0.45, tone: "lo" }));
  }
  return out.join("");
}

/** The fence: a stop bolted across the rail, and a stanchion under it. */
function fence() {
  const out = [];
  // The stanchion carries the load down to the base, so the stop is not a sticker.
  out.push(S(k.cylinder(FENCE_X, 0, 7, 0, 5, P, 28), { tone: "mid" }));
  out.push(L(k.ring(FENCE_X, 0, 5, 5, P, 20), { tone: "lo" }));
  out.push(S(k.cylinder(FENCE_X, 0, 4.2, 5, RAIL_Z - 5, P, 24), { tone: "mid", crease: "none" }));
  out.push(L([30, 60, 90].map((z) => k.sideArc(FENCE_X, 0, 4.2, z, P, 14)).join(""), { tone: "faint" }));
  // The stop itself, across the rail, with its clamp screws.
  // The brace: a stop that can actually take a carriage running into it.
  out.push(S(k.slabOf({ x: FENCE_X - 2.6, y: -3, w: 5.2, d: 26, r: 1.2 }, 5, 26, P, 1.5, 0.4), { tone: "mid", crease: "none" }));
  out.push(D([at([FENCE_X, 22, 31]), at([FENCE_X, 6, 10])], { size: 0.45, tone: "lo" }));
  const stop = { x: FENCE_X - 6, y: -17, w: 12, d: 34, r: 1.5 };
  out.push(S(k.slabOf(stop, RAIL_Z - 4, RAIL_H + 26, P, 1.5, 0.7), { tone: "mid", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(stop, 2.5), RAIL_Z + RAIL_H + 22, P, 1), { tone: "faint" }));
  // The shoulder the carriage stops against, on the side the carriage comes from.
  for (const side of [-1, 1]) {
    out.push(S(k.slabOf({ x: FENCE_X + side * 6 - (side < 0 ? 3.4 : 0), y: -12, w: 3.4, d: 24, r: 1 }, RAIL_TOP, 15, P, 1, 0.4), { tone: "mid" }));
    out.push(D([at([FENCE_X + side * 7, -8, RAIL_TOP + 15]), at([FENCE_X + side * 7, 8, RAIL_TOP + 15])], { size: 0.4, tone: "lo" }));
  }
  out.push(
    D(
      [
        at([FENCE_X, -11, RAIL_Z + RAIL_H + 22]),
        at([FENCE_X, 11, RAIL_Z + RAIL_H + 22]),
        at([FENCE_X, 0, RAIL_Z + RAIL_H + 22]),
      ],
      { size: 0.5, tone: "lo" },
    ),
  );
  for (const z of [RAIL_Z + 2, RAIL_Z + RAIL_H + 6]) {
    out.push(L(k.lineOnTop([FENCE_X - 6, -17], [FENCE_X - 6, 17], z, P), { tone: "faint" }));
    out.push(D([at([FENCE_X - 6, -17, z]), at([FENCE_X - 6, 17, z])], { size: 0.4, tone: "lo" }));
  }
  return out.join("");
}

function carriage(kind) {
  const out = [
    `<path class="iso-halo" d="${k.haloOf(k.insetPlan(CAR, 4), RAIL_TOP, 0.1, P)}" style="filter:blur(4px)"/>`,
  ];
  for (const x of BUSHING_X) {
    out.push(S(k.cylinder(x, 0, 5.2, RAIL_Z + 1, RAIL_H + 2, P, 24), { tone: "mid" }));
    out.push(L(k.sideArc(x, 0, 5.2, RAIL_Z + 4, P, 14), { tone: "faint" }));
  }
  out.push(S(k.slabOf(CAR, RAIL_TOP, CAR_H, P, 3.5, 0.7), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(CAR, 3), CAR_TOP, P, 2.5), { tone: "faint" }));
  out.push(D(BUSHING_X.map((x) => at([x, CAR.y + 3.5, CAR_TOP])), { size: 0.45, tone: "lo" }));
  out.push(D(BUSHING_X.map((x) => at([x, CAR.y + CAR.d - 3.5, CAR_TOP])), { size: 0.45, tone: "lo" }));
  const knob = [0, CAR.y + CAR.d + 2];
  out.push(S(k.slabOf({ x: -1.8, y: CAR.y + CAR.d - 1, w: 3.6, d: 3.4, r: 1 }, RAIL_TOP + 2, 4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(knob[0], knob[1] + 1.6, 4.6, RAIL_TOP + 1, 5.5, P, 24), { tone: "mid" }));
  out.push(L(k.knurl(knob[0], knob[1] + 1.6, 4.6, RAIL_TOP + 1, RAIL_TOP + 6.5, 20, P), { tone: "lo" }));
  out.push(L(k.lineOnTop([knob[0], knob[1] + 1.6], [knob[0] + 4.6, knob[1] + 1.6], RAIL_TOP + 6.5, P), { tone: "hi" }));
  out.push(D([at([knob[0], knob[1] + 1.6, RAIL_TOP + 6.5])], { size: 0.5, tone: "hi" }));
  if (kind === "pen") {
    // The pen carriage carries an inkwell and nothing that can reach a well.
    out.push(S(k.cylinder(0, CAR.y - 5, 4, RAIL_TOP + 1, 7, P, 20), { tone: "mid" }));
    out.push(L(k.ring(0, CAR.y - 5, 2.6, RAIL_TOP + 8, P, 16), { tone: "lo" }));
    out.push(D([at([0, CAR.y - 5, RAIL_TOP + 8])], { size: 0.45, tone: "lo" }));
  }
  return out.join("");
}

/** The stylus: what reads the workpiece. The one lit moving part. */
function stylus() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 2.6, PROBE_LEN - 4, 6, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(0, 0, 2.6, PROBE_LEN - 4, PROBE_LEN + 2, 14, P), { tone: "lo" }));
  out.push(S(k.cylinder(0, 0, 1.2, 2.4, PROBE_LEN - 4 + 0.2, P, 16), { tone: "hi", crease: "none", lit: true }));
  out.push(S(k.cylinder(0, 0, 2.2, 0, 2.4, P, 16), { tone: "hi", crease: "none", lit: true }));
  out.push(L(k.ring(0, 0, 2.2, 2.4, P, 14), { tone: "lit" }));
  out.push(D([at([0, 0, 0])], { size: 0.5, tone: "lit" }));
  return out.join("");
}

/** The pen. It can only ever touch its card. */
function pen() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 2.2, 16, 9, P, 18), { tone: "mid" }));
  out.push(L(k.knurl(0, 0, 2.2, 16, 25, P, 14), { tone: "lo" }));
  out.push(S(k.cylinder(0, 0, 1, 3, 13, P, 14), { tone: "hi", crease: "none" }));
  out.push(S(k.cylinder(0, 0, 0.45, 0, 3, P, 10), { tone: "hi", crease: "none" }));
  out.push(D([at([0, 0, 0])], { size: 0.45, tone: "lo" }));
  return out.join("");
}

/** The card the pen writes on. Ruled, with margins, on the far side of the fence. */
function card() {
  const out = [];
  out.push(S(k.slabOf(CARD, 0, 2.2, P, 2, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(CARD, 4), 2.2, P, 1.5), { tone: "faint" }));
  const marginX = [CARD.x + 7, CARD.x + CARD.w - 7];
  const edge = [CARD.y + 4, CARD.y + CARD.d - 4];
  out.push(L(marginX.map((x) => k.lineOnTop([x, edge[0]], [x, edge[1]], 2.2, P)).join(""), { tone: "faint" }));
  const rules = [10, 17, 24, 31, 38, 45, 52, 59]
    .map((offset) => CARD.y + offset)
    .filter((y) => y > edge[0] && y < edge[1])
    .map((y) => k.lineOnTop([marginX[0], y], [marginX[1], y], 2.2, P))
    .join("");
  out.push(L(rules, { tone: "faint" }));
  return out.join("");
}

function dial() {
  const out = [];
  const arm = { x: POSTS[1] - 3.2, y: DIAL[1] - 3, w: 6.5, d: -DIAL[1] - 4, r: 2 };
  out.push(S(k.cylinder(POSTS[1], 0, POST_R + 2.6, DIAL_Z - 11, 11, P, 32), { tone: "mid" }));
  out.push(L(k.knurl(POSTS[1], 0, POST_R + 2.6, DIAL_Z - 11, DIAL_Z, 28, P, 0.3), { tone: "lo" }));
  out.push(S(k.slabOf(arm, DIAL_Z - 8, 5.5, P, 2.5, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: POSTS[1] - 2.2, y: -24, w: 4.4, d: 17, r: 1 }, DIAL_Z - 15, 7, P, 1.5, 0.4), { tone: "mid", crease: "none" }));
  out.push(D([at([POSTS[1], -24, DIAL_Z - 8])], { size: 0.45, tone: "lo" }));
  out.push(S(k.cylinder(DIAL[0], DIAL[1], 3.4, DIAL_Z - 8, 8, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(DIAL[0], DIAL[1], DIAL_R, DIAL_Z, DIAL_H, P, 60, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(DIAL[0], DIAL[1], DIAL_R, DIAL_TOP - 3, DIAL_TOP, 64, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(DIAL[0], DIAL[1], DIAL_R, DIAL_TOP - 3, P, 34), { tone: "faint" }));
  out.push(L(k.ring(DIAL[0], DIAL[1], DIAL_R - 2.4, DIAL_TOP, P, 60), { tone: "lo" }));
  const ticks = k.radialTicks(DIAL[0], DIAL[1], DIAL_R - 3.2, 40, 10, DIAL_TOP, [1.3, 2.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(DIAL[0], DIAL[1], 1.8, DIAL_TOP, P, 14), { tone: "mid" }));
  out.push(S(k.slabOf({ x: DIAL[0] - 2.6, y: DIAL[1] + DIAL_R - 1, w: 5.2, d: 5, r: 1.2 }, DIAL_Z + 2, 5.5, P, 2.5), { tone: "mid" }));
  out.push(D([at([DIAL[0], DIAL[1] + DIAL_R + 2, DIAL_Z + 7.5])], { size: 0.45, tone: "lo" }));
  return out.join("");
}

const dialNeedleAt = (share) => {
  const angle = share * Math.PI * 1.6 - Math.PI * 0.8;
  const [x, y] = DIAL;
  return k.lineOnTop(
    [x - Math.sin(angle) * 3.4, y + Math.cos(angle) * 3.4],
    [x + Math.sin(angle) * (DIAL_R - 5), y - Math.cos(angle) * (DIAL_R - 5)],
    DIAL_TOP + 0.2,
    P,
  );
};

const startX = segMid(0);
const penStart = Math.max(startX, FENCE_X + 24);

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A profile bench. A workpiece of seven segments of different heights is clamped in a seat on the left; rigid tie-rods join three pairs of segments and slack dashed chains hang between two others. One rail runs the length of the bench carrying two carriages, with a stop bolted across the rail and braced down to the base. The left carriage carries a stylus that descends onto each segment and drops a token into a numbered well in the rack in front. The right carriage carries a pen over a ruled card, and runs into the stop: it cannot reach any well. A dial on the right post reads the score from the tokens.",
  body: [
    base(),
    post(POSTS[0], "lower"),
    seat(),
    workpiece(),
    rods(),
    chains(),
    post(POSTS[1], "lower"),
    dial(),
    `<path data-part="dial-needle" class="iso-line" data-tone="lit" data-free="start" d="${dialNeedleAt(0)}" style="stroke-width:1.05"/>`,
    rack(),
    `<g data-part="tokens">${SEG_H.map(
      (_, i) => `<g data-token="${i}" style="opacity:0">${token(i)}</g>`,
    ).join("")}</g>`,
    card(),
    post(POSTS[0], "upper"),
    post(POSTS[1], "upper"),
    rail(),
    `<g data-part="stylus-car" transform="${k.translateAlong(P, [startX, 0, 0])}">${carriage("stylus")}</g>`,
    `<g data-part="stylus" transform="${k.translateAlong(P, [startX, 0, PROBE_UP])}">${stylus()}</g>`,
    fence(),
    `<g data-part="pen-car" transform="${k.translateAlong(P, [penStart, 0, 0])}">${carriage("pen")}</g>`,
    `<g data-part="pen" transform="${k.translateAlong(P, [penStart, CARD.y + 20, 2.4])}">${pen()}</g>`,
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const SEG_H = ${JSON.stringify(SEG_H)};
const SEG_MID = ${JSON.stringify(SEG_H.map((_, i) => segMid(i)))};
const SEG_TOP = ${JSON.stringify(SEG_H.map((_, i) => segTop(i)))};
const REACH = ${JSON.stringify(STYLUS_REACH)};
const FENCE_X = ${FENCE_X}, PEN_MIN = ${FENCE_X + 24};
const PROBE_UP = ${PROBE_UP}, CARD_Y = ${CARD.y + 20};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const GRAB = 11;

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const stylusCar = svg.querySelector('[data-part="stylus-car"]');
const stylus = svg.querySelector('[data-part="stylus"]');
const penCar = svg.querySelector('[data-part="pen-car"]');
const pen = svg.querySelector('[data-part="pen"]');
const needle = svg.querySelector('[data-part="dial-needle"]');
const tokens = SEG_H.map((_, i) => svg.querySelector('[data-token="' + i + '"]'));
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const dialNeedleAt = ${dialNeedleAt.toString().replace("k.lineOnTop", "lineOnTop")};
const segmentAt = (x) => SEG_MID.findIndex((mx) => Math.abs(mx - x) <= GRAB);

const read = new Set();
let x = SEG_MID[0], target = x;
let tip = { at: PROBE_UP, rate: 0 };
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;
const tourAt = (t) => SEG_MID[Math.floor(t / 1.5) % SEG_MID.length];

function draw() {
  const segment = segmentAt(x);
  if (segment >= 0 && tip.at < SEG_TOP[segment] + 1.2) read.add(segment);
  // The pen follows the stylus, and the fence is where that following stops.
  const penX = Math.max(x, PEN_MIN);
  stylusCar.setAttribute("transform", translateAlong(P, [x, 0, 0]));
  stylus.setAttribute("transform", translateAlong(P, [x, 0, tip.at]));
  penCar.setAttribute("transform", translateAlong(P, [penX, 0, 0]));
  pen.setAttribute("transform", translateAlong(P, [penX, CARD_Y, 2.4]));
  tokens.forEach((node, i) => {
    const want = read.has(i) ? "1" : "0";
    if (node.style.opacity !== want) node.style.opacity = want;
  });
  // The dial is driven by the tokens, not by anything the pen did.
  needle.setAttribute("d", dialNeedleAt(read.size / SEG_H.length));
  const held = penX > x + 0.5;
  const text =
    (segment < 0 ? "between" : "segment " + (segment + 1)) +
    " · " + read.size + "/" + SEG_H.length + " read · pen " + (held ? "at the fence" : "free");
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(read.size));
  stage.setAttribute("aria-valuetext", text);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; target = tourAt(clock); }
  x = calm ? target : x + (target - x) * (1 - Math.exp(-dt / 0.26));
  if (Math.abs(target - x) < 0.01) x = target;
  const segment = segmentAt(x);
  const onSegment = segment >= 0 && Math.abs(target - x) < 0.6;
  const want = onSegment ? SEG_TOP[segment] + 0.4 : PROBE_UP;
  const stiff = 300, drag = calm ? 2 * Math.sqrt(300) : 24;
  for (let i = 0; i < 4; i++) {
    tip.rate += ((want - tip.at) * stiff - tip.rate * drag) * dt / 4;
    tip.at += tip.rate * dt / 4;
  }
  if (Math.abs(want - tip.at) < 0.005 && Math.abs(tip.rate) < 0.005) { tip.at = want; tip.rate = 0; }
  draw();
  const settled = !touring && x === target && tip.rate === 0 && tip.at === want;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}

const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => {
  touring = false;
  target = clamp(next, REACH[0], REACH[1]);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3800);
  run();
};

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);

if (still.matches) touring = false;

stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = clamp(((event.clientX - box.left) / box.width - 0.1) / 0.5, 0, 1);
  steer(REACH[0] + share * (REACH[1] - REACH[0]));
});
stage.addEventListener("pointerleave", () => steer(target));
stage.addEventListener("keydown", (event) => {
  const here = SEG_MID.reduce((best, mx, i) => (Math.abs(mx - target) < Math.abs(SEG_MID[best] - target) ? i : best), 0);
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(SEG_MID.length - 1, here + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, here - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = SEG_MID.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(SEG_MID[to]);
});
draw();
`;

const body = k.plateHtml({
  fig: "Fig 2",
  title: "Proper — the fence is geometry",
  hint: "Hover along the rail, or use the arrow keys",
  readout: "segment 1 · 0/7 read · pen at the fence",
  keys: [
    { mark: "lit", label: "Stylus and tokens: what reads the work, and what it drops in the rack" },
    { mark: "raised", label: "Seven segments of the workpiece, tie-rods rigid and chains slack" },
  ],
  caption:
    "One rail, two carriages and a stop bolted across it. The stylus reads a segment and drops a token into its numbered well; the dial is driven by the tokens and by nothing else. The pen follows the stylus until it reaches the stop, and there it waits: it can write on its card and it cannot reach a single well. That is the arrangement in the software — the scan finishes first, and its output is all the explanation layer is ever given — and it holds here for the same reason it holds there, because it is built into the shape of the thing rather than written down somewhere as a rule. The linkages carry the other half: a rigid tie-rod was read from the imports, a slack chain is only the scanner's own grouping of file paths.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Profile bench: arrow keys move the stylus from one segment to the next" aria-valuemin="0" aria-valuemax="7" aria-valuenow="0">${svg}</div>`,
});

const file = theme === "light" ? "proper-light.html" : "proper.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "Proper — profile bench", theme, body, script: kitScript() + live }));
console.log("wrote", file);
