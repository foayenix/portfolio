// Fig 3 — Sanko, drawn as a keyed gate over a bank of drawers.
//
// The concept: Sanko's agent has no keywords and no fixed steps, so it can
// produce a plausible record code like FM-00042 and ask for it. Every executor
// resolves records by short code scoped to the calling practitioner, so an
// invented code comes back as "not found" rather than as another practitioner's
// patient. That scoping is a query predicate in the executor and not a line in
// the prompt, because a prompt is a request and a predicate is not.
//
// The object: a sorting gate. Messages arrive through three mouths — typed,
// spoken, photographed — and become one card on a carriage. The card can only
// go down a hole in the gate plate, and the only holes cut in that plate are
// the ones over this practitioner's own drawers. A code with no drawer under it
// is not refused by anybody's judgement; there is simply nowhere for it to go
// but the reject chute. The index wheel on the post carries the other fact:
// twenty-two stations, one per tool, with a detent that lands on exactly one.
//
// Build: node figures/sanko/build.mjs [--light]

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

// The drawer cabinet: one drawer per record this practitioner actually holds.
const CAB = { x: -126, y: -30, w: 158, d: 80, r: 3 };
const CAB_H = 58;
const DRAWER_D = 72;
const DRAWER_W = 44;
const DRAWERS = [-118, -68, -18];
const DRAWER_OPEN = 32;

// The gate plate. Four positions, and a hole under only three of them.
const GATE = { x: -132, y: -34, w: 216, d: 88, r: 3 };
const GATE_Z = CAB_H;
const GATE_H = 5;
const GATE_TOP = GATE_Z + GATE_H;
const SLOT_W = 19;
const SLOT_D = 26;
const STATIONS = [-96, -46, 4, 56];
const DRAWER_OF = [0, 1, 2, -1]; // the fourth station has no drawer under it

// The reject chute: where a code with no drawer goes. A stepped slide to a tray.
const CHUTE_STEPS = 5;
const TRAY = { x: 104, y: 44, w: 56, d: 34, r: 2.5 };

const POSTS = [-162, 152];
const POST_R = 6.5;
const NUT_Z = 92;
const POST_TOP = 132;

const RAIL = { x: -162, y: -6, w: 314, d: 12, r: 2 };
const RAIL_Z = 114;
const RAIL_H = 7;
const RAIL_TOP = RAIL_Z + RAIL_H;

const CAR = { x: -16, y: -16, w: 32, d: 32, r: 3.5 };
const CAR_H = 11;
const CAR_TOP = RAIL_TOP + CAR_H;
const BUSHING_X = [-10, 10];

const CARD = { x: -9, y: -12, w: 18, d: 24, r: 1.5 };
const CARD_UP = 98;
const CARD_THROUGH = GATE_Z - 32; // through the plate, into the drawer
const CARD_BLOCKED = GATE_TOP + 1; // resting on solid plate
const REACH = [STATIONS[0] - 14, STATIONS[3] + 14];

// The index wheel: twenty-two stations, one per tool.
const WHEEL = [-162, 46];
const WHEEL_Z = 58;
const WHEEL_H = 9;
const WHEEL_R = 20;
const WHEEL_TOP = WHEEL_Z + WHEEL_H;
const TOOLS = 22;

// The intake: typed, spoken, photographed. Three mouths, one hopper.
const HOPPER = { x: -66, y: 52, w: 74, d: 32, r: 3 };
const HOPPER_H = 22;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -PLATE_H - FOOT_H, 0),
    [POSTS[0], 0, POST_TOP + 4],
    [POSTS[1], 0, POST_TOP + 4],
    [WHEEL[0] - WHEEL_R, WHEEL[1] - WHEEL_R, WHEEL_TOP],
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

  const plate = { x: 92, y: -76, w: 56, d: 13, r: 1.5 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 2), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.8), 0.8, P, 1), { tone: "faint" }));
  out.push(
    k.faceTextSvg(k.topMatrix([plate.x + plate.w / 2, plate.y + 8.4], 0.8, P, "x"), "SANKO", {
      size: 5,
      tone: "lo",
      anchor: "middle",
    }),
  );
  return out.join("");
}

/** The cabinet carcass. The drawers are drawn separately, because they move. */
function cabinet() {
  const out = [];
  out.push(S(k.slabOf(CAB, 0, CAB_H, P, 3, 0.8), { tone: "mid" }));
  // The dividers between the drawer bays.
  for (const x of [-72, -22]) {
    out.push(L(k.lineOnTop([x, CAB.y], [x, CAB.y + CAB.d], CAB_H, P), { tone: "faint" }));
    out.push(D([at([x, CAB.y, CAB_H]), at([x, CAB.y + CAB.d, CAB_H])], { size: 0.4, tone: "lo" }));
  }
  const screws = k.corners(CAB, 8);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, CAB_H, P, 12)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, CAB_H])), { size: 0.45 }));
  return out.join("");
}

/** One drawer, built at its closed position and moved. */
function drawer(i) {
  const x = DRAWERS[i];
  const plan = { x, y: CAB.y + 4, w: DRAWER_W, d: DRAWER_D, r: 2 };
  const out = [];
  out.push(S(k.slabOf(plan, 4, CAB_H - 8, P, 2, 0.6), { tone: "hi", crease: "lo" }));
  // The front face: a pull and a number plate, so a drawer reads as a drawer.
  const front = plan.y + plan.d;
  out.push(S(k.slabOf({ x: x + 2, y: front - 2, w: DRAWER_W - 4, d: 3.5, r: 1.2 }, 5, CAB_H - 10, P, 1.5, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(x + DRAWER_W / 2, front + 2.4, 4.6, CAB_H / 2 - 2, 3.2, P, 22), { tone: "mid" }));
  out.push(L(k.ring(x + DRAWER_W / 2, front + 2.4, 2.6, CAB_H / 2 + 1.2, P, 14), { tone: "lo" }));
  out.push(D([at([x + DRAWER_W / 2, front + 2.4, CAB_H / 2 + 1.2])], { size: 0.5, tone: "lo" }));
  // A drawer this tall shows its runners.
  for (const z of [CAB_H * 0.28, CAB_H * 0.72]) {
    out.push(L(k.lineOnTop([x + 2, front - 2], [x + DRAWER_W - 2, front - 2], z, P), { tone: "faint" }));
    out.push(D([at([x + 2, front - 2, z]), at([x + DRAWER_W - 2, front - 2, z])], { size: 0.4, tone: "lo" }));
  }
  out.push(
    D(
      [at([x + 7, front + 0.8, CAB_H - 5]), at([x + DRAWER_W - 7, front + 0.8, CAB_H - 5])],
      { size: 0.45, tone: "lo" },
    ),
  );
  return out.join("");
}

/**
 * The gate plate. The holes are the whole argument: there is one over each
 * drawer this practitioner holds, and the plate is solid everywhere else.
 */
function gate() {
  const out = [];
  out.push(S(k.slabOf(GATE, GATE_Z, GATE_H, P, 3, 0.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(GATE, 5), GATE_TOP, P, 2.5), { tone: "faint" }));
  out.push(L(k.planOutline(k.insetPlan(GATE, 10), GATE_TOP, P, 2), { tone: "lo" }));
  const screws = k.corners(GATE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.1, GATE_TOP, P, 12)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, GATE_TOP])), { size: 0.45 }));
  // A scale across the lid, so a station can be read off the plate itself.
  const scale = k.topTicks(GATE.x + 14, GATE.x + GATE.w - 14, 8, 5, GATE.y + GATE.d - 13, GATE_TOP, [1.6, 3.2], P);
  out.push(L(scale.minor, { tone: "lo" }), L(scale.major, { tone: "mid" }));
  out.push(
    D([at([GATE.x + 11, GATE.y + GATE.d - 10, GATE_TOP]), at([GATE.x + GATE.w - 11, GATE.y + GATE.d - 10, GATE_TOP])], {
      size: 0.42,
      tone: "lo",
    }),
  );

  STATIONS.forEach((x, i) => {
    const slot = { x: x - SLOT_W / 2, y: -SLOT_D / 2, w: SLOT_W, d: SLOT_D, r: 1.5 };
    if (DRAWER_OF[i] >= 0) {
      // A hole: the plate is cut through, and you can see down into the bay.
      out.push(S(k.slabOf(slot, GATE_Z - 16, 16, P, 1.5, 0.4), { tone: "lo", crease: "none" }));
      // The cut edge of the plate, and the shaft wall below it.
      out.push(L(k.planOutline(slot, GATE_TOP, P, 1.5), { tone: "mid" }));
      out.push(L(k.planOutline(slot, GATE_Z - 1, P, 1.5), { tone: "faint" }));
      for (const corner of [[slot.x, slot.y], [slot.x + slot.w, slot.y], [slot.x, slot.y + slot.d], [slot.x + slot.w, slot.y + slot.d]]) {
        out.push(L(polyline3([[corner[0], corner[1], GATE_TOP], [corner[0], corner[1], GATE_Z - 1]]), { tone: "faint" }));
      }
      out.push(
        D(
          [
            at([slot.x, slot.y, GATE_TOP]),
            at([slot.x + slot.w, slot.y, GATE_TOP]),
            at([slot.x, slot.y + slot.d, GATE_TOP]),
            at([slot.x + slot.w, slot.y + slot.d, GATE_TOP]),
          ],
          { size: 0.45, tone: "lo" },
        ),
      );
    } else {
      // No hole. The plate is scribed where a hole would have been, and solid.
      out.push(L(k.planOutline(slot, GATE_TOP, P, 1.5), { tone: "faint" }));
      const hatch = [];
      for (let h = -8; h <= 8; h += 4) {
        hatch.push(k.lineOnTop([slot.x + 2, h], [slot.x + slot.w - 2, h], GATE_TOP, P));
      }
      out.push(L(hatch.join(""), { tone: "faint" }));
      for (let h = -8; h <= 8; h += 4) {
        out.push(D([at([slot.x + 2, h, GATE_TOP]), at([slot.x + slot.w - 2, h, GATE_TOP])], { size: 0.38, tone: "lo" }));
      }
    }
    // A station mark on the plate, in front of each position.
    out.push(L(k.ring(x, SLOT_D / 2 + 8, 2.4, GATE_TOP, P, 12), { tone: "lo" }));
    out.push(D([at([x, SLOT_D / 2 + 8, GATE_TOP])], { size: 0.45, tone: "lo" }));
  });
  return out.join("");
}

/** The reject chute: a stepped slide from under the last station to a tray. */
function chute() {
  const out = [];
  const fromX = STATIONS[3] + 4;
  const fromZ = GATE_Z - 4;
  for (let i = 0; i < CHUTE_STEPS; i++) {
    const t = i / (CHUTE_STEPS - 1);
    const plan = {
      x: fromX + t * (TRAY.x - fromX - 6),
      y: -8 + t * (TRAY.y + 6),
      w: 26,
      d: 20,
      r: 1.5,
    };
    const z = fromZ - t * (fromZ - 7);
    out.push(S(k.slabOf(plan, z, 3, P, 1.5, 0.4), { tone: "mid" }));
    // The side rail that keeps a card on the slide.
    out.push(L(k.lineOnTop([plan.x, plan.y], [plan.x + plan.w, plan.y], z + 3, P), { tone: "faint" }));
    out.push(D([at([plan.x, plan.y, z + 3]), at([plan.x + plan.w, plan.y, z + 3])], { size: 0.4, tone: "lo" }));
  }
  out.push(S(k.slabOf(TRAY, 0, 6, P, 2.5, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(TRAY, 4), 6, P, 2), { tone: "faint" }));
  const screws = k.corners(TRAY, 6);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 1.8, 6, P, 12)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 6])), { size: 0.45 }));
  return out.join("");
}

/** The intake: one mouth for typed text, one for a voice note, one for a photograph. */
function hopper() {
  const out = [];
  out.push(S(k.slabOf(HOPPER, 0, HOPPER_H, P, 3, 0.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(HOPPER, 4), HOPPER_H, P, 2), { tone: "faint" }));
  // Typed: a letter slot.
  const slot = { x: HOPPER.x + 8, y: HOPPER.y + 10, w: 16, d: 3.2, r: 1 };
  out.push(S(k.slabOf(slot, HOPPER_H - 1, 1.6, P, 1, 0.3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(slot, HOPPER_H + 0.6, P, 1), { tone: "lo" }));
  // Spoken: a microphone grille.
  const mic = [HOPPER.x + 38, HOPPER.y + 16];
  out.push(S(k.cylinder(mic[0], mic[1], 7, HOPPER_H, 4.5, P, 28), { tone: "mid" }));
  out.push(L(k.ring(mic[0], mic[1], 4.6, HOPPER_H + 4.5, P, 20), { tone: "lo" }));
  out.push(L(k.ring(mic[0], mic[1], 2.4, HOPPER_H + 4.5, P, 14), { tone: "faint" }));
  out.push(D([at([mic[0], mic[1], HOPPER_H + 4.5])], { size: 0.45, tone: "lo" }));
  // Photographed: a lens.
  const lens = [HOPPER.x + 60, HOPPER.y + 22];
  out.push(S(k.cylinder(lens[0], lens[1], 8, HOPPER_H, 6, P, 30), { tone: "mid" }));
  out.push(L(k.knurl(lens[0], lens[1], 8, HOPPER_H, HOPPER_H + 6, 24, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(lens[0], lens[1], 5, HOPPER_H + 6, P, 20), { tone: "lo" }));
  out.push(L(k.ring(lens[0], lens[1], 2.6, HOPPER_H + 6, P, 14), { tone: "faint" }));
  out.push(D([at([lens[0], lens[1], HOPPER_H + 6])], { size: 0.45, tone: "lo" }));
  // All three feed one throat, which is the point: they become one kind of thing.
  out.push(S(k.slabOf({ x: HOPPER.x + 24, y: HOPPER.y - 9, w: 24, d: 11, r: 2 }, HOPPER_H - 7, 7, P, 2, 0.5), { tone: "mid" }));
  out.push(D([at([HOPPER.x + 30, HOPPER.y - 5, HOPPER_H]), at([HOPPER.x + 42, HOPPER.y - 5, HOPPER_H])], { size: 0.45, tone: "lo" }));
  return out.join("");
}

/** The index wheel: twenty-two stations, one per tool, with a detent pawl. */
function wheel() {
  const out = [];
  const arm = { x: POSTS[0] - 3.2, y: WHEEL[1] - 3, w: 6.5, d: -WHEEL[1] - 4, r: 2 };
  out.push(S(k.cylinder(POSTS[0], 0, POST_R + 2.6, WHEEL_Z - 11, 11, P, 32), { tone: "mid" }));
  out.push(L(k.knurl(POSTS[0], 0, POST_R + 2.6, WHEEL_Z - 11, WHEEL_Z, 28, P, 0.3), { tone: "lo" }));
  out.push(S(k.slabOf(arm, WHEEL_Z - 8, 5.5, P, 2.5, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: POSTS[0] - 2.2, y: -24, w: 4.4, d: 17, r: 1 }, WHEEL_Z - 15, 7, P, 1.5, 0.4), { tone: "mid", crease: "none" }));
  out.push(D([at([POSTS[0], -24, WHEEL_Z - 8])], { size: 0.45, tone: "lo" }));
  out.push(S(k.cylinder(WHEEL[0], WHEEL[1], 3.4, WHEEL_Z - 8, 8, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(WHEEL[0], WHEEL[1], WHEEL_R, WHEEL_Z, WHEEL_H, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideArc(WHEEL[0], WHEEL[1], WHEEL_R, WHEEL_Z + 2.5, P, 34), { tone: "faint" }));
  // Twenty-two teeth, and twenty-two station marks inside them.
  out.push(L(k.knurl(WHEEL[0], WHEEL[1], WHEEL_R, WHEEL_Z, WHEEL_TOP, TOOLS, P, 0.55), { tone: "lo" }));
  const ticks = k.radialTicks(WHEEL[0], WHEEL[1], WHEEL_R - 3, TOOLS, 1, WHEEL_TOP, [2.2, 2.2], P);
  out.push(L(ticks.minor, { tone: "mid" }));
  out.push(L(k.ring(WHEEL[0], WHEEL[1], WHEEL_R - 5.4, WHEEL_TOP, P, 56), { tone: "lo" }));
  out.push(L(k.ring(WHEEL[0], WHEEL[1], 2, WHEEL_TOP, P, 14), { tone: "mid" }));
  // The pawl that lands the wheel on exactly one station.
  const pawl = { x: WHEEL[0] - 1.8, y: WHEEL[1] + WHEEL_R - 1, w: 3.6, d: 11, r: 1.2 };
  out.push(S(k.slabOf(pawl, WHEEL_TOP - 2.5, 3, P, 1.2, 0.4), { tone: "mid" }));
  out.push(D([at([WHEEL[0], WHEEL[1] + WHEEL_R + 8, WHEEL_TOP + 0.5])], { size: 0.5, tone: "lo" }));
  return out.join("");
}

const wheelMark = (share) => {
  const angle = share * Math.PI * 2;
  const [x, y] = WHEEL;
  return k.lineOnTop(
    [x - Math.sin(angle) * 2.4, y + Math.cos(angle) * 2.4],
    [x + Math.sin(angle) * (WHEEL_R - 6.4), y - Math.cos(angle) * (WHEEL_R - 6.4)],
    WHEEL_TOP + 0.2,
    P,
  );
};

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

function carriage() {
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
  // The grip that holds the card and the rod it hangs on.
  out.push(S(k.cylinder(0, 0, 2.2, RAIL_Z - 14, 16, P, 18), { tone: "mid", crease: "none" }));
  return out.join("");
}

/** The card. One message, whatever mouth it came in through. */
function card() {
  const out = [];
  out.push(S(k.slabOf(CARD, 0, 2.4, P, 1.5, 0.4), { tone: "hi", crease: "lo", lit: true }));
  out.push(L(k.planOutline(k.insetPlan(CARD, 3), 2.4, P, 1), { tone: "lit" }));
  // The code punched into it: three holes in a row.
  const holes = [-4.5, 0, 4.5].map((dx) => [dx, -3]);
  out.push(L(holes.map(([hx, hy]) => k.ring(hx, hy, 1.5, 2.4, P, 10)).join(""), { tone: "lit" }));
  out.push(D(holes.map(([hx, hy]) => at([hx, hy, 2.4])), { size: 0.45, tone: "lit" }));
  out.push(L(k.lineOnTop([CARD.x + 3, 4], [CARD.x + CARD.w - 3, 4], 2.4, P), { tone: "lit" }));
  out.push(L(k.lineOnTop([CARD.x + 3, 8], [CARD.x + CARD.w - 3, 8], 2.4, P), { tone: "lit" }));
  out.push(
    D(
      [
        at([CARD.x + 3, 4, 2.4]), at([CARD.x + CARD.w - 3, 4, 2.4]),
        at([CARD.x + 3, 8, 2.4]), at([CARD.x + CARD.w - 3, 8, 2.4]),
      ],
      { size: 0.4, tone: "lit" },
    ),
  );
  out.push(S(k.cylinder(0, CARD.y + 2.5, 1.6, 2.4, 3, P, 12), { tone: "mid" }));
  return out.join("");
}

const startX = STATIONS[0];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A sorting gate on a steel base. On the left a hopper takes three kinds of intake — a letter slot, a microphone grille and a lens — into one throat, and an index wheel of twenty-two toothed stations sits on the left post with a pawl resting in one of them. In the middle a gate plate covers a cabinet of three drawers. The plate is cut through above each drawer and is solid, scribed and hatched above the fourth station. A card hangs from a carriage on the rail above; where the plate is cut the card drops through and the drawer below slides open, and at the fourth station the card cannot pass and slides down a stepped chute into a tray on the right.",
  body: [
    base(),
    post(POSTS[0], "lower"),
    wheel(),
    `<path data-part="wheel-mark" class="iso-line" data-tone="lit" data-free="start" d="${wheelMark(0)}" style="stroke-width:1.05"/>`,
    post(POSTS[1], "lower"),
    cabinet(),
    ...DRAWERS.map(
      (_, i) =>
        `<g data-drawer="${i}" transform="${k.translateAlong(P, [0, 0, 0])}">${drawer(i)}</g>`,
    ),
    gate(),
    chute(),
    hopper(),
    post(POSTS[0], "upper"),
    post(POSTS[1], "upper"),
    rail(),
    `<g data-part="carriage" transform="${k.translateAlong(P, [startX, 0, 0])}">${carriage()}</g>`,
    `<g data-part="card" transform="${k.translateAlong(P, [startX, 0, CARD_UP])}">${card()}</g>`,
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const STATIONS = ${JSON.stringify(STATIONS)};
const DRAWER_OF = ${JSON.stringify(DRAWER_OF)};
const DRAWERS = ${JSON.stringify(DRAWERS)};
const REACH = ${JSON.stringify(REACH)};
const CARD_UP = ${CARD_UP}, CARD_THROUGH = ${CARD_THROUGH}, CARD_BLOCKED = ${CARD_BLOCKED};
const DRAWER_OPEN = ${DRAWER_OPEN}, TOOLS = ${TOOLS};
const WHEEL = ${JSON.stringify(WHEEL)}, WHEEL_R = ${WHEEL_R}, WHEEL_TOP = ${WHEEL_TOP};
const TRAY = ${JSON.stringify([TRAY.x + TRAY.w / 2, TRAY.y + TRAY.d / 2])};
const GRAB = 15;

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const carriage = svg.querySelector('[data-part="carriage"]');
const cardNode = svg.querySelector('[data-part="card"]');
const mark = svg.querySelector('[data-part="wheel-mark"]');
const drawers = DRAWERS.map((_, i) => svg.querySelector('[data-drawer="' + i + '"]'));
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const wheelMark = ${wheelMark.toString().replace("k.lineOnTop", "lineOnTop")};
const stationAt = (x) => STATIONS.findIndex((sx) => Math.abs(sx - x) <= GRAB);
// The codes are the practitioner's own, except the last, which is invented.
const CODES = ["FM-00118", "FM-00204", "FM-00231", "FM-00042"];

let x = STATIONS[0], target = x;
let card = { at: CARD_UP, rate: 0 };
let slide = DRAWERS.map(() => ({ at: 0, rate: 0 }));
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;
const tourAt = (t) => STATIONS[Math.floor(t / 2.6) % STATIONS.length];

function draw() {
  const station = stationAt(x);
  const bay = station >= 0 ? DRAWER_OF[station] : -1;
  carriage.setAttribute("transform", translateAlong(P, [x, 0, 0]));
  // Below the plate the card is in the drawer; at the blocked station it rides
  // the chute to the tray instead, which is the only other place it can go.
  const rejected = station === STATIONS.length - 1 && card.at <= CARD_BLOCKED + 0.6;
  const slid = rejected ? clamp((CARD_BLOCKED + 8 - card.at) / 8, 0, 1) : 0;
  cardNode.setAttribute(
    "transform",
    translateAlong(P, [x + slid * (TRAY[0] - x), slid * TRAY[1], card.at - slid * (card.at - 9)]),
  );
  drawers.forEach((node, i) => node.setAttribute("transform", translateAlong(P, [0, slide[i].at, 0])));
  mark.setAttribute("d", wheelMark(station < 0 ? 0 : (station * 6 + 3) / TOOLS));
  const text =
    station < 0
      ? "between stations"
      : CODES[station] + " · " + (bay >= 0 ? "drawer " + (bay + 1) : "not found");
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(station < 0 ? 0 : station + 1));
  stage.setAttribute("aria-valuetext", text);
}

function spring(state, want, dt, stiff, calm) {
  const drag = calm ? 2 * Math.sqrt(stiff) : 22;
  for (let i = 0; i < 4; i++) {
    state.rate += ((want - state.at) * stiff - state.rate * drag) * dt / 4;
    state.at += state.rate * dt / 4;
  }
  if (Math.abs(want - state.at) < 0.005 && Math.abs(state.rate) < 0.005) { state.at = want; state.rate = 0; }
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; target = tourAt(clock); }
  x = calm ? target : x + (target - x) * (1 - Math.exp(-dt / 0.3));
  if (Math.abs(target - x) < 0.01) x = target;
  const station = stationAt(x);
  const settledOver = station >= 0 && Math.abs(target - x) < 0.6;
  const bay = station >= 0 ? DRAWER_OF[station] : -1;
  // The plate decides how far the card gets. Nothing else does.
  const want = !settledOver ? CARD_UP : bay >= 0 ? CARD_THROUGH : CARD_BLOCKED;
  spring(card, want, dt, 190, calm);
  let rest = true;
  slide.forEach((state, i) => {
    const open = settledOver && bay === i && card.at < CARD_BLOCKED ? DRAWER_OPEN : 0;
    spring(state, open, dt, 150, calm);
    if (state.rate !== 0 || state.at !== open) rest = false;
  });
  draw();
  const settled = !touring && x === target && card.rate === 0 && card.at === want && rest;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}

const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => {
  touring = false;
  target = clamp(next, REACH[0], REACH[1]);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 4200);
  run();
};

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);

if (still.matches) touring = false;

stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = clamp(((event.clientX - box.left) / box.width - 0.14) / 0.52, 0, 1);
  steer(REACH[0] + share * (REACH[1] - REACH[0]));
});
stage.addEventListener("pointerleave", () => steer(target));
stage.addEventListener("keydown", (event) => {
  const here = STATIONS.reduce((best, sx, i) => (Math.abs(sx - target) < Math.abs(STATIONS[best] - target) ? i : best), 0);
  let to = null;
  if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(STATIONS.length - 1, here + 1);
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, here - 1);
  if (event.key === "Home") to = 0;
  if (event.key === "End") to = STATIONS.length - 1;
  if (to === null) return;
  event.preventDefault();
  steer(STATIONS[to]);
});
draw();
`;

const body = k.plateHtml({
  fig: "Fig 3",
  title: "Sanko — a predicate is not a prompt",
  hint: "Hover along the rail, or use the arrow keys",
  readout: "FM-00118 · drawer 1",
  keys: [
    { mark: "lit", label: "The card: one message, whichever mouth it arrived through" },
    { mark: "raised", label: "Three drawers, and a plate cut through above each of them" },
  ],
  caption:
    "Typed, spoken and photographed all go in one throat and come out as one card. Above each drawer this practitioner holds, the gate plate is cut through, and the card drops into it. Above the fourth station the plate is solid: the code is well formed, it looks exactly like the others, and there is simply nowhere for it to go but the chute. Nothing judges it and nothing refuses it — the hole is either there or it is not, which is the difference between a predicate in the executor and a line in a prompt. The wheel on the post has twenty-two stations, one per tool, and the pawl lands it on one.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Sorting gate: arrow keys move the card from one station to the next" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1">${svg}</div>`,
});

const file = theme === "light" ? "sanko-light.html" : "sanko.html";
writeFileSync(join(HERE, file), k.pageHtml({ title: "Sanko — keyed gate", theme, body, script: kitScript() + live }));
console.log("wrote", file);
