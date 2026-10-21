// Fig 1 — Quire, drawn as a bookbinder's sewing frame.
//
// The concept: in Quire the gesture *is* the citation. You drag a thread from a
// highlight inside a source onto a sentence in your draft, and that drag is
// what produces the footnote — there is no separate "add citation" step to
// forget.
//
// The object: a bookbinder's sewing frame, which is the machine the word
// "quire" comes from. A quire is a gathering of leaves, and it becomes a book
// when thread is passed through it. So the mapping is not a metaphor laid over
// the software: the needle carriage rides a rail over a stack of source leaves
// and a draft leaf, and when it stops over a highlighted column it descends and
// leaves a thread behind. The thread is the citation. The counter on the right
// post reads how many have been sewn, and it is driven by the same array the
// threads are drawn from, so it cannot disagree with the picture.
//
// Build: node figures/quire/build.mjs [--light]

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 820;
const HEIGHT = 470;

// ── The world. 1 unit ≈ 1 px of the real bench. ────────────────────────────
const BASE = { x: -168, y: -84, w: 336, d: 168, r: 10 };
const PLATE_H = 13;
const FOOT_H = 6;

const BED = { x: -138, y: -64, w: 276, d: 128, r: 5 };
const BED_H = 9;
const BED_TOP = BED_H;

const LEAF_H = 1.7;
const SRC = { x: -118, y: -50, w: 104, d: 100, r: 2.5 };
const SRC_N = 6;
const SRC_TOP = BED_TOP + SRC_N * LEAF_H;

const DRAFT = { x: 16, y: -50, w: 104, d: 100, r: 2.5 };
const DRAFT_N = 3;
const DRAFT_TOP = BED_TOP + DRAFT_N * LEAF_H;

// Three highlighted columns on the source leaf. These are the lit parts: the
// one thing on the bench that the reader's eye should land on first.
const STRIPE_W = 13;
const STRIPES = [-98, -67, -36];
// The sentences in the draft each thread lands on, and where the stitch sits.
const SENTENCES = [-27, 1, 29];
const STITCH_X = DRAFT.x + 24;
// The ruled lines of the draft page, of which three are cited.
const RULES = [-39, -27, -15, -3, 1, 9, 17, 29, 37];

const POSTS = [-150, 150];
const POST_R = 6.5;
const NUT_Z = 92;
const POST_TOP = 130;

const RAIL = { x: -150, y: -5.5, w: 300, d: 11, r: 2 };
const RAIL_Z = 114;
const RAIL_H = 7;
const RAIL_TOP = RAIL_Z + RAIL_H;

const CARRIAGE = { x: -17, y: -15, w: 34, d: 30, r: 3.5 };
const CARRIAGE_H = 11;
const CARRIAGE_TOP = RAIL_TOP + CARRIAGE_H;
const BUSHING_X = [-11, 11];

const NEEDLE_LEN = 30;
const NEEDLE_UP = 44; // tip height when the needle is clear of the leaves
const NEEDLE_DOWN = SRC_TOP + 0.5;
const REACH = [STRIPES[0] - 26, STRIPES[STRIPES.length - 1] + 26];

const SPOOL = [-150, 46];
const SPOOL_Z = 56;
const SPOOL_H = 17;
const SPOOL_R = 11;
const FLANGE_R = 14.5;

const COUNTER = [150, -46];
const COUNTER_Z = 60;
const COUNTER_H = 11;
const COUNTER_R = 14;
const COUNTER_TOP = COUNTER_Z + COUNTER_H;

const EYELETS = [-120, -74];
const EYELET_Z = RAIL_Z - 1;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -PLATE_H - FOOT_H, 0),
    [POSTS[0], 0, POST_TOP + 4],
    [POSTS[1], 0, POST_TOP + 4],
    [SPOOL[0] - FLANGE_R, SPOOL[1] + FLANGE_R, SPOOL_Z + SPOOL_H],
    [COUNTER[0] + COUNTER_R, COUNTER[1] + COUNTER_R, COUNTER_TOP],
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

/** A 3D polyline in screen space. Used for thread, which really is a line. */
const polyline3 = (points) =>
  points
    .map((point, index) => {
      const [sx, sy] = at(point);
      return `${index === 0 ? "M" : "L"}${sx.toFixed(2)} ${sy.toFixed(2)}`;
    })
    .join("");

/** A sewn thread: source highlight to draft sentence, sagging under its own weight. */
function threadPath(index, steps = 26) {
  const from = [STRIPES[index], 0, SRC_TOP];
  const to = [STITCH_X, SENTENCES[index], DRAFT_TOP];
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lift = Math.sin(t * Math.PI) ** 0.72 * 30;
    points.push([
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
      from[2] + (to[2] - from[2]) * t + lift,
    ]);
  }
  return polyline3(points);
}

/** The working thread: off the spool, through both eyelets, down to the needle eye. */
function workingThread(carriageX, tipZ, steps = 10) {
  const eye = [carriageX, 0, tipZ + NEEDLE_LEN - 5];
  const run = [
    [SPOOL[0] + SPOOL_R * 0.85, SPOOL[1], SPOOL_Z + SPOOL_H - 1],
    [EYELETS[0], 0, EYELET_Z],
    [EYELETS[1], 0, EYELET_Z],
  ];
  const points = [];
  for (let seg = 0; seg < run.length; seg++) {
    const a = run[seg];
    const b = seg + 1 < run.length ? run[seg + 1] : eye;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push([
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t - Math.sin(t * Math.PI) * 3.5,
      ]);
    }
  }
  return polyline3(points);
}

// ── The bench ───────────────────────────────────────────────────────────────
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

  // A ruler strip along the front edge, because a bench measures what is on it.
  const strip = { x: -150, y: BASE.y + BASE.d - 17, w: 300, d: 8, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.7, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 5, strip.x + strip.w - 5, 5, 5, strip.y + 1, 0.7, [2.2, 4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(
    D([at([strip.x + 2.5, strip.y + 4, 0.7]), at([strip.x + strip.w - 2.5, strip.y + 4, 0.7])], {
      size: 0.45,
    }),
  );

  // The one engraved label on the whole drawing.
  const plate = { x: -146, y: -72, w: 52, d: 13, r: 1.5 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 2), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.8), 0.8, P, 1), { tone: "faint" }));
  out.push(
    k.faceTextSvg(k.topMatrix([plate.x + plate.w / 2, plate.y + 8.4], 0.8, P, "x"), "QUIRE", {
      size: 5.4,
      tone: "lo",
      anchor: "middle",
    }),
  );
  return out.join("");
}

function bed() {
  const out = [];
  out.push(S(k.slabOf(BED, 0, BED_H, P, 5, 1), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(BED, 5), BED_TOP, P, 4), { tone: "faint" }));
  // Corner screws holding the bed to the base.
  const screws = k.corners(BED, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, BED_TOP, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, BED_TOP])), { size: 0.45 }));
  // The groove the bone folder lies in.
  const groove = { x: 132, y: -24, w: 0, d: 0, r: 0 };
  void groove;
  return out.join("");
}

/** A stack of leaves: each leaf is its own slab, so the fore-edge reads as paper. */
function leaves(plan, count, tone) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const inset = i * 0.5;
    out.push(
      S(k.slabOf(k.insetPlan(plan, inset), BED_TOP + i * LEAF_H, LEAF_H, P, plan.r, 0.3), {
        tone,
        crease: i === count - 1 ? "lo" : "none",
      }),
    );
  }
  return out.join("");
}

function sourceLeaves() {
  const out = [leaves(SRC, SRC_N, "hi")];
  const top = k.insetPlan(SRC, (SRC_N - 1) * 0.5);
  out.push(L(k.planOutline(k.insetPlan(top, 6), SRC_TOP, P, 2), { tone: "faint" }));
  // The highlighted columns: the lit part of the bench.
  STRIPES.forEach((x) => {
    const stripe = { x: x - STRIPE_W / 2, y: top.y + 7, w: STRIPE_W, d: top.d - 14, r: 1 };
    out.push(S(k.slabOf(stripe, SRC_TOP, 0.9, P, 1.5), { tone: "hi", lit: true, crease: "none" }));
    out.push(L(k.planOutline(stripe, SRC_TOP + 0.9, P, 1.5), { tone: "lit" }));
  });
  // The stitch holes the threads leave from.
  out.push(L(STRIPES.map((x) => k.ring(x, 0, 2.4, SRC_TOP + 0.9, P, 14)).join(""), { tone: "lit" }));
  out.push(D(STRIPES.map((x) => at([x, 0, SRC_TOP + 0.9])), { size: 0.6, tone: "lit" }));
  return out.join("");
}

function draftLeaves() {
  const out = [leaves(DRAFT, DRAFT_N, "hi")];
  const top = k.insetPlan(DRAFT, (DRAFT_N - 1) * 0.5);
  out.push(L(k.planOutline(k.insetPlan(top, 6), DRAFT_TOP, P, 2), { tone: "faint" }));
  // Ruled paper has margins, and the rules end on them. Draw the margins first
  // so every ruled line lands on a stroke rather than stopping in the page.
  const marginX = [top.x + 9, top.x + top.w - 9];
  const edge = [top.y + 6, top.y + top.d - 6];
  out.push(
    L(marginX.map((x) => k.lineOnTop([x, edge[0]], [x, edge[1]], DRAFT_TOP, P)).join(""), {
      tone: "faint",
    }),
  );
  const rules = RULES.filter((y) => y > edge[0] && y < edge[1])
    .map((y) => k.lineOnTop([marginX[0], y], [marginX[1], y], DRAFT_TOP, P))
    .join("");
  out.push(L(rules, { tone: "faint" }));
  // Each cited sentence is marked, and the thread ends on that mark.
  out.push(
    L(
      SENTENCES.map((y) => k.ring(STITCH_X, y, 2.2, DRAFT_TOP, P, 14)).join(""),
      { tone: "lo" },
    ),
  );
  out.push(D(SENTENCES.map((y) => at([STITCH_X, y, DRAFT_TOP])), { size: 0.55 }));
  return out.join("");
}

/** Spare needles in a drilled block, and a cake of wax. Both sit on the base. */
function bench() {
  const out = [];
  const block = { x: -152, y: 48, w: 54, d: 15, r: 2 };
  out.push(S(k.slabOf(block, 0, 5.5, P, 2, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(block, 2.5), 5.5, P, 1.5), { tone: "faint" }));
  const holes = [0, 1, 2, 3, 4].map((i) => [block.x + 8 + i * 9.5, block.y + block.d / 2]);
  out.push(L(holes.map(([hx, hy]) => k.ring(hx, hy, 1.9, 5.5, P, 12)).join(""), { tone: "lo" }));
  // Three of the five holes still have a needle in them.
  for (const [hx, hy] of byDepth(holes.slice(0, 3))) {
    out.push(S(k.cylinder(hx, hy, 0.85, 5.5, 13, P, 12), { tone: "hi", crease: "none" }));
    out.push(D([at([hx, hy, 18.5])], { size: 0.4, tone: "lo" }));
  }
  out.push(D(holes.slice(3).map(([hx, hy]) => at([hx, hy, 5.5])), { size: 0.4, tone: "lo" }));

  const wax = [-74, 56];
  out.push(S(k.cylinder(wax[0], wax[1], 11, 0, 5, P, 36, 0.8), { tone: "mid" }));
  out.push(L(k.ring(wax[0], wax[1], 7.5, 5, P, 32), { tone: "faint" }));
  // The groove the thread has worn across the wax.
  out.push(L(k.lineOnTop([wax[0] - 8, wax[1] - 2.5], [wax[0] + 8, wax[1] + 2.5], 5, P), { tone: "lo" }));
  out.push(D([at([wax[0] - 8, wax[1] - 2.5, 5]), at([wax[0] + 8, wax[1] + 2.5, 5])], { size: 0.4, tone: "lo" }));
  return out.join("");
}

/** The bone folder, lying in its place on the bench. */
function boneFolder() {
  const out = [];
  const body = { x: 74, y: 62, w: 72, d: 9, r: 4.5 };
  out.push(S(k.slabOf(body, 0, 2.6, P, 4.5, 0.6), { tone: "hi", crease: "lo" }));
  out.push(S(k.slabOf({ x: body.x + 50, y: body.y + 1.4, w: 24, d: 6.2, r: 3 }, 0, 1.8, P, 3, 0.5), { tone: "hi", crease: "none" }));
  out.push(L(k.lineOnTop([body.x + 8, body.y + 4.5], [body.x + 46, body.y + 4.5], 2.6, P), { tone: "faint" }));
  out.push(D([at([body.x + 6, body.y + 4.5, 2.6]), at([body.x + 48, body.y + 4.5, 2.6])], { size: 0.4, tone: "lo" }));
  return out.join("");
}

/** A frame post, in two segments with the height-adjusting nut between them. */
function post(x, part) {
  const out = [];
  if (part === "lower") {
    out.push(S(k.cylinder(x, 0, POST_R + 3, 0, 5, P, 32), { tone: "mid" }));
    out.push(L(k.ring(x, 0, POST_R + 1.4, 5, P, 24), { tone: "lo" }));
    out.push(D(byDepth(k.corners({ x: x - 6, y: -6, w: 12, d: 12, r: 0 }, 0)).map(([cx, cy]) => at([cx, cy, 5])), { size: 0.45, tone: "lo" }));
    out.push(S(k.cylinder(x, 0, POST_R, 5, NUT_Z - 5, P, 32), { tone: "mid", crease: "none" }));
    out.push(L([26, 52, 78].map((z) => k.sideArc(x, 0, POST_R, z, P, 18)).join(""), { tone: "faint" }));
    return out.join("");
  }
  // The nut, and the threaded rod above it.
  out.push(S(k.cylinder(x, 0, POST_R + 3.4, NUT_Z, 8, P, 12), { tone: "mid" }));
  out.push(L(k.knurl(x, 0, POST_R + 3.4, NUT_Z, NUT_Z + 8, 12, P), { tone: "lo" }));
  out.push(S(k.cylinder(x, 0, POST_R - 1.2, NUT_Z + 8, POST_TOP - NUT_Z - 8, P, 28), { tone: "mid", crease: "none" }));
  // The thread of the threaded rod, as a visible coil.
  out.push(L(k.coil(x, 0, POST_R - 0.6, NUT_Z + 9, POST_TOP - 3, 7, P, 40), { tone: "faint" }));
  out.push(S(k.cylinder(x, 0, POST_R + 1.2, POST_TOP, 3, P, 28), { tone: "mid" }));
  out.push(D([at([x, 0, POST_TOP + 3])], { size: 0.55, tone: "lo" }));
  return out.join("");
}

/** The thread spool, on a bracket off the left post. */
function spool() {
  const out = [];
  const arm = { x: POSTS[0] - 3, y: 7, w: 6.5, d: SPOOL[1] - 4, r: 2 };
  out.push(S(k.cylinder(POSTS[0], 0, POST_R + 2.6, SPOOL_Z - 10, 11, P, 32), { tone: "mid" }));
  out.push(L(k.knurl(POSTS[0], 0, POST_R + 2.6, SPOOL_Z - 10, SPOOL_Z + 1, 28, P, 0.3), { tone: "lo" }));
  out.push(S(k.slabOf(arm, SPOOL_Z - 7, 5.5, P, 2.5, 0.5), { tone: "mid" }));
  // The gusset: the arm is braced back to the post rather than cantilevered.
  out.push(S(k.slabOf({ x: POSTS[0] - 2, y: 7, w: 4, d: 17, r: 1 }, SPOOL_Z - 14, 7, P, 1.5, 0.4), { tone: "mid", crease: "none" }));
  out.push(D([at([POSTS[0], 24, SPOOL_Z - 7])], { size: 0.45, tone: "lo" }));
  out.push(D([at([arm.x + 3.2, arm.y + 5, SPOOL_Z - 1.5]), at([arm.x + 3.2, arm.y + arm.d - 5, SPOOL_Z - 1.5])], { size: 0.45, tone: "lo" }));
  out.push(S(k.cylinder(SPOOL[0], SPOOL[1], 3, SPOOL_Z - 7, SPOOL_H + 12, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(SPOOL[0], SPOOL[1], FLANGE_R, SPOOL_Z, 2, P, 40, 0.5), { tone: "mid" }));
  out.push(S(k.cylinder(SPOOL[0], SPOOL[1], SPOOL_R, SPOOL_Z + 2, SPOOL_H - 4, P, 40), { tone: "hi", crease: "lo" }));
  // Wound thread reads as fine turns around the barrel.
  out.push(L(k.coil(SPOOL[0], SPOOL[1], SPOOL_R + 0.4, SPOOL_Z + 3.4, SPOOL_Z + SPOOL_H - 3.4, 9, P, 54), { tone: "lo" }));
  out.push(S(k.cylinder(SPOOL[0], SPOOL[1], FLANGE_R, SPOOL_Z + SPOOL_H - 2, 2, P, 40, 0.5), { tone: "mid" }));
  out.push(L(k.knurl(SPOOL[0], SPOOL[1], FLANGE_R, SPOOL_Z + SPOOL_H - 2, SPOOL_Z + SPOOL_H, 44, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(SPOOL[0], SPOOL[1], FLANGE_R - 3, SPOOL_Z + SPOOL_H, P, 40), { tone: "faint" }));
  // The tension spring that keeps the thread honest.
  out.push(L(k.coil(SPOOL[0] + FLANGE_R + 5, SPOOL[1], 3.4, SPOOL_Z + 1, SPOOL_Z + 14, 6, P, 30), { tone: "lo" }));
  out.push(D([at([SPOOL[0] + FLANGE_R + 5, SPOOL[1], SPOOL_Z + 14])], { size: 0.45, tone: "lo" }));
  out.push(D([at([SPOOL[0], SPOOL[1], SPOOL_Z + SPOOL_H])], { size: 0.5, tone: "lo" }));
  return out.join("");
}

/** The footnote counter: a dial on the right post, reading threads sewn. */
function counter() {
  const out = [];
  const arm = { x: POSTS[1] - 3.2, y: COUNTER[1] - 3, w: 6.5, d: -COUNTER[1] - 4, r: 2 };
  out.push(S(k.cylinder(POSTS[1], 0, POST_R + 2.6, COUNTER_Z - 11, 11, P, 32), { tone: "mid" }));
  out.push(L(k.knurl(POSTS[1], 0, POST_R + 2.6, COUNTER_Z - 11, COUNTER_Z, 28, P, 0.3), { tone: "lo" }));
  out.push(S(k.slabOf(arm, COUNTER_Z - 8, 5.5, P, 2.5, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: POSTS[1] - 2.2, y: -24, w: 4.4, d: 17, r: 1 }, COUNTER_Z - 15, 7, P, 1.5, 0.4), { tone: "mid", crease: "none" }));
  out.push(D([at([POSTS[1], -24, COUNTER_Z - 8])], { size: 0.45, tone: "lo" }));
  out.push(D([at([arm.x + 3.2, arm.y + 5, COUNTER_Z - 2.5]), at([arm.x + 3.2, arm.y + arm.d - 5, COUNTER_Z - 2.5])], { size: 0.45, tone: "lo" }));
  out.push(S(k.cylinder(COUNTER[0], COUNTER[1], 3.4, COUNTER_Z - 8, 8, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(COUNTER[0], COUNTER[1], COUNTER_R, COUNTER_Z, COUNTER_H, P, 56, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(COUNTER[0], COUNTER[1], COUNTER_R, COUNTER_TOP - 3, COUNTER_TOP, 60, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(COUNTER[0], COUNTER[1], COUNTER_R, COUNTER_TOP - 3, P, 32), { tone: "faint" }));
  out.push(L(k.ring(COUNTER[0], COUNTER[1], COUNTER_R - 2.2, COUNTER_TOP, P, 56), { tone: "lo" }));
  const ticks = k.radialTicks(COUNTER[0], COUNTER[1], COUNTER_R - 3, 36, 12, COUNTER_TOP, [1.2, 2.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(COUNTER[0], COUNTER[1], 1.7, COUNTER_TOP, P, 14), { tone: "mid" }));
  // The bezel lug, so the dial has a front.
  out.push(S(k.slabOf({ x: COUNTER[0] - 2.6, y: COUNTER[1] + COUNTER_R - 1, w: 5.2, d: 5, r: 1.2 }, COUNTER_Z + 2, 5.5, P, 2.5), { tone: "mid" }));
  out.push(D([at([COUNTER[0], COUNTER[1] + COUNTER_R + 2, COUNTER_Z + 7.5])], { size: 0.45, tone: "lo" }));
  return out.join("");
}

const counterNeedle = (share) => {
  const angle = share * Math.PI * 1.6 - Math.PI * 0.8;
  const [x, y] = COUNTER;
  return k.lineOnTop(
    [x - Math.sin(angle) * 3.2, y + Math.cos(angle) * 3.2],
    [x + Math.sin(angle) * (COUNTER_R - 5), y - Math.cos(angle) * (COUNTER_R - 5)],
    COUNTER_TOP + 0.2,
    P,
  );
};

function rail() {
  const out = [];
  out.push(S(k.slabOf(RAIL, RAIL_Z, RAIL_H, P, 2.5, 0.6), { tone: "mid" }));
  const ticks = k.topTicks(RAIL.x + 10, RAIL.x + RAIL.w - 10, 5, 6, RAIL.y + 1.6, RAIL_TOP, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  for (const x of [RAIL.x - 4, RAIL.x + RAIL.w - 1]) {
    out.push(S(k.slabOf({ x, y: -8, w: 5, d: 16, r: 1.2 }, RAIL_Z, RAIL_H + 4, P, 2, 0.5), { tone: "mid" }));
    out.push(D([at([x + 2.5, -4, RAIL_TOP + 4]), at([x + 2.5, 4, RAIL_TOP + 4])], { size: 0.45, tone: "lo" }));
  }
  // The two eyelets the working thread runs through.
  for (const x of EYELETS) {
    out.push(S(k.slabOf({ x: x - 2, y: -2, w: 4, d: 4, r: 1 }, EYELET_Z - 3, 4, P, 1.5), { tone: "mid", crease: "none" }));
    out.push(L(k.ring(x, 0, 2.6, EYELET_Z - 3, P, 16), { tone: "lo" }));
    out.push(D([at([x, 0, EYELET_Z - 3])], { size: 0.45, tone: "lo" }));
  }
  return out.join("");
}

function carriage() {
  const out = [
    `<path class="iso-halo" d="${k.haloOf(k.insetPlan(CARRIAGE, 4), RAIL_TOP, 0.1, P)}" style="filter:blur(4px)"/>`,
  ];
  for (const x of BUSHING_X) {
    out.push(S(k.cylinder(x, 0, 5.2, RAIL_Z + 1, RAIL_H + 2, P, 24), { tone: "mid" }));
    out.push(L(k.sideArc(x, 0, 5.2, RAIL_Z + 4, P, 14), { tone: "faint" }));
  }
  out.push(S(k.slabOf(CARRIAGE, RAIL_TOP, CARRIAGE_H, P, 3.5, 0.7), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(CARRIAGE, 3), CARRIAGE_TOP, P, 2.5), { tone: "faint" }));
  out.push(D(BUSHING_X.map((x) => at([x, CARRIAGE.y + 3, CARRIAGE_TOP])), { size: 0.45, tone: "lo" }));
  out.push(D(BUSHING_X.map((x) => at([x, CARRIAGE.y + CARRIAGE.d - 3, CARRIAGE_TOP])), { size: 0.45, tone: "lo" }));
  // The knob the binder turns to lower the needle.
  const knob = [0, CARRIAGE.y + CARRIAGE.d + 2];
  out.push(S(k.slabOf({ x: -1.8, y: CARRIAGE.y + CARRIAGE.d - 1, w: 3.6, d: 3.4, r: 1 }, RAIL_TOP + 2, 4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(knob[0], knob[1] + 1.6, 4.6, RAIL_TOP + 1, 5.5, P, 24), { tone: "mid" }));
  out.push(L(k.knurl(knob[0], knob[1] + 1.6, 4.6, RAIL_TOP + 1, RAIL_TOP + 6.5, 20, P), { tone: "lo" }));
  out.push(L(k.lineOnTop([knob[0], knob[1] + 1.6], [knob[0] + 4.6, knob[1] + 1.6], RAIL_TOP + 6.5, P), { tone: "hi" }));
  out.push(D([at([knob[0], knob[1] + 1.6, RAIL_TOP + 6.5])], { size: 0.5, tone: "hi" }));
  return out.join("");
}

/** The needle. Built once at rest and moved, so its shape never changes. */
function needle() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 2.4, NEEDLE_LEN - 4, 6, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(0, 0, 2.4, NEEDLE_LEN - 4, NEEDLE_LEN + 2, 14, P), { tone: "lo" }));
  out.push(S(k.cylinder(0, 0, 1.15, 2.2, NEEDLE_LEN - 4 + 0.2, P, 16), { tone: "hi", crease: "none", lit: true }));
  out.push(S(k.cylinder(0, 0, 0.55, 0, 2.2, P, 12), { tone: "hi", crease: "none", lit: true }));
  out.push(L(k.ring(0, 0, 1.5, NEEDLE_LEN - 6.5, P, 12), { tone: "lit" }));
  out.push(D([at([0, 0, 0])], { size: 0.5, tone: "lit" }));
  return out.join("");
}

// ── Assemble, back to front and bottom to top ───────────────────────────────
const startX = STRIPES[0];
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A bookbinder's sewing frame on a steel base. A stack of six source leaves lies on the left of the bed with three highlighted columns marked on the top leaf; a draft leaf of three sheets lies on the right, ruled with lines. Two posts carry a rail, and a needle carriage rides along it. Where the needle stops over a highlighted column it descends and leaves a thread behind it, running from that column to a marked sentence on the draft. A spool on the left post feeds the thread; a dial on the right post counts the threads sewn.",
  body: [
    base(),
    bed(),
    post(POSTS[0], "lower"),
    spool(),
    sourceLeaves(),
    `<g data-part="threads">${STRIPES.map(
      (_, index) =>
        `<path class="iso-line" data-tone="lit" data-thread="${index}" d="${threadPath(index)}" style="stroke-width:1.05;opacity:0"/>`,
    ).join("")}</g>`,
    draftLeaves(),
    post(POSTS[1], "lower"),
    counter(),
    `<path data-part="counter-needle" class="iso-line" data-tone="lit" data-free="start" d="${counterNeedle(0)}" style="stroke-width:1.05"/>`,
    post(POSTS[0], "upper"),
    post(POSTS[1], "upper"),
    rail(),
    `<path data-part="working" class="iso-line" data-tone="lo" d="${workingThread(startX, NEEDLE_UP)}" style="stroke-width:0.85"/>`,
    `<g data-part="carriage" transform="${k.translateAlong(P, [startX, 0, 0])}">${carriage()}</g>`,
    `<g data-part="needle" transform="${k.translateAlong(P, [startX, 0, NEEDLE_UP])}">${needle()}</g>`,
    bench(),
    boneFolder(),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const STRIPES = ${JSON.stringify(STRIPES)};
const SENTENCES = ${JSON.stringify(SENTENCES)};
const REACH = ${JSON.stringify(REACH)};
const EYELETS = ${JSON.stringify(EYELETS)};
const SPOOL = ${JSON.stringify(SPOOL)};
const COUNTER = ${JSON.stringify(COUNTER)};
const SRC_TOP = ${SRC_TOP}, DRAFT_TOP = ${DRAFT_TOP}, STITCH_X = ${STITCH_X};
const NEEDLE_UP = ${NEEDLE_UP}, NEEDLE_DOWN = ${NEEDLE_DOWN}, NEEDLE_LEN = ${NEEDLE_LEN};
const SPOOL_Z = ${SPOOL_Z}, SPOOL_H = ${SPOOL_H}, SPOOL_R = ${SPOOL_R};
const EYELET_Z = ${EYELET_Z}, COUNTER_R = ${COUNTER_R}, COUNTER_TOP = ${COUNTER_TOP};
const GRAB = 11;

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const carriage = svg.querySelector('[data-part="carriage"]');
const needle = svg.querySelector('[data-part="needle"]');
const working = svg.querySelector('[data-part="working"]');
const dialNeedle = svg.querySelector('[data-part="counter-needle"]');
const threads = STRIPES.map((_, i) => svg.querySelector('[data-thread="' + i + '"]'));
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

const at = (point) => iso(point, P);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const polyline3 = (points) => points.map((p, i) => { const s = at(p); return (i ? "L" : "M") + s[0].toFixed(2) + " " + s[1].toFixed(2); }).join("");

const workingThread = ${workingThread.toString()
  .replace(/\bat\(/g, "at(")
  .replace("steps = 10", "steps = 10")};
const counterNeedle = ${counterNeedle.toString().replace("k.lineOnTop", "lineOnTop")};

// Which highlighted column the needle is over, or -1 between columns.
const columnAt = (x) => STRIPES.findIndex((sx) => Math.abs(sx - x) <= GRAB);

const sewn = new Set();
let x = STRIPES[0], target = x;
let tip = { at: NEEDLE_UP, rate: 0 };
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;
const tourAt = (t) => STRIPES[Math.floor(t / 2.4) % STRIPES.length];

function draw() {
  carriage.setAttribute("transform", translateAlong(P, [x, 0, 0]));
  needle.setAttribute("transform", translateAlong(P, [x, 0, tip.at]));
  working.setAttribute("d", workingThread(x, tip.at));
  const column = columnAt(x);
  // A thread exists once the needle has actually reached the leaf over a column.
  if (column >= 0 && tip.at < NEEDLE_DOWN + 1.2) sewn.add(column);
  threads.forEach((node, i) => {
    const on = sewn.has(i);
    const want = on ? "1" : "0";
    if (node.style.opacity !== want) node.style.opacity = want;
  });
  dialNeedle.setAttribute("d", counterNeedle(sewn.size / STRIPES.length));
  const text =
    (column < 0 ? "between highlights" : "highlight " + (column + 1) + " of " + STRIPES.length) +
    " · " + sewn.size + (sewn.size === 1 ? " footnote" : " footnotes");
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(sewn.size));
  stage.setAttribute("aria-valuetext", text);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; target = tourAt(clock); }
  x = calm ? target : x + (target - x) * (1 - Math.exp(-dt / 0.3));
  if (Math.abs(target - x) < 0.01) x = target;
  // The needle descends only once the carriage has settled over a column.
  const overColumn = columnAt(x) >= 0 && Math.abs(target - x) < 0.6;
  const want = overColumn ? NEEDLE_DOWN : NEEDLE_UP;
  const stiff = 260, drag = calm ? 2 * Math.sqrt(260) : 23;
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
  const share = clamp(((event.clientX - box.left) / box.width - 0.18) / 0.42, 0, 1);
  steer(REACH[0] + share * (REACH[1] - REACH[0]));
});
stage.addEventListener("pointerleave", () => steer(target));
stage.addEventListener("keydown", (event) => {
  const here = STRIPES.reduce((best, sx, i) => (Math.abs(sx - target) < Math.abs(STRIPES[best] - target) ? i : best), 0);
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(STRIPES.length - 1, here + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, here - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = STRIPES.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(STRIPES[to]);
});
draw();
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Quire — the citation is the gesture",
  hint: "Hover along the rail, or use the arrow keys",
  readout: "highlight 1 of 3 · 0 footnotes",
  keys: [
    { mark: "lit", label: "Needle, thread and the highlighted columns: what the gesture touches" },
    { mark: "raised", label: "Six source leaves and a three-sheet draft, on the bed" },
  ],
  caption:
    "A bookbinder's sewing frame, which is where the word quire comes from: a quire is a gathering of leaves, and it becomes a book when thread is passed through it. Stop the needle over a highlighted column and it descends and leaves a thread running to a marked sentence in the draft. The thread is the citation — there is no separate step that can be skipped — and the dial on the right post counts the threads from the same record the threads are drawn from, so the reading cannot disagree with the picture.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Sewing frame: arrow keys move the needle from one highlighted column to the next" aria-valuemin="0" aria-valuemax="3" aria-valuenow="0">${svg}</div>`,
});

const file = theme === "light" ? "quire-light.html" : "quire.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "Quire — sewing frame", theme, body, script: kitScript() + live }));
console.log("wrote", file);
