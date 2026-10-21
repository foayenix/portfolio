# Figures

Three isometric figures, built with the [Anatomy](https://github.com/wheresryan22/anatomy)
skill (MIT; its licence is kept beside this file as `LICENSE-anatomy`, and its
kit is vendored under `kit/` and `scripts/` so these pages build without it).

Each figure invents a machine whose working *is* the idea, rather than drawing
boxes and arrows about it. The reader understands the argument because they
recognise the mechanism.

| Figure | The machine | The idea it carries |
|---|---|---|
| `quire/` | A bookbinder's sewing frame | The gesture is the citation. A quire is a gathering of leaves, and it becomes a book when thread is passed through it, so the citation and the stitch are the same act. |
| `proper/` | A profile bench with a stop bolted across the rail | The explanation layer cannot reach the findings. The pen follows the stylus until the fence, and the fence is geometry rather than a rule written down. |
| `sanko/` | A keyed gate over a bank of drawers | A predicate is not a prompt. The plate is cut through above the drawers this practitioner holds, so an invented code has nowhere to go but the chute. |

## Build

Needs Node 20.10+ and Chromium for the checks.

```sh
node figures/quire/build.mjs              # writes figures/quire/quire.html
node figures/quire/build.mjs --light      # and the light-theme page
```

Each figure is built in both themes because its tones are baked into the
drawing. Copy both into `public/figures/` to publish them; `components/Figure.tsx`
picks the one that matches the ink around it and follows the nav's toggle.

## Checks

`CHROME_PATH` has to point at a Chrome or Chromium binary.

```sh
CHROME_PATH=/path/to/chromium node figures/scripts/lines.mjs figures/quire/quire.html --out shots/lines.png
CHROME_PATH=/path/to/chromium node figures/scripts/capture.mjs figures/quire/quire.html --out shots/dark.png --wait 4000
```

`lines.mjs` must print `line ends: 0`: every seam, rule, rib and tick has to end
on a stroke, a dot or an outline rather than stopping in mid-air. All three
figures pass it in both themes. `capture.mjs` takes the screenshot to read —
the figures were revised against those screenshots, which is the only check
that catches a dial with nothing under it.

**Not run here:** `build.mjs --audit`, the kit's geometry audit. It needs the
recorder wired through every helper, and these three draw their thread, chains
and rods as lines rather than as `tube.mjs` routes, which is what the audit
exists to prove. The line check and the screenshots are what stands behind
them instead.

---

## Diagrams, and why they are a different thing

`diagrams/` holds architecture diagrams, which answer a different question from
the figures above and are built with a different tool.

An Anatomy figure explains **the one argument a build turns on** — the gesture
that is the citation, the fence the pen cannot pass, the hole that is either
cut or not. It invents a machine, and boxes and arrows would ruin it.

An architecture diagram answers **"what did you actually build"**, which is the
question a reader has for the twenty-six catalogue entries with no link. They
cannot open Proper or YBS or Pank, and a case study tells them about it in
paragraphs. A diagram shows the shape in one screen.

`diagrams/ybs-architecture.html` is the first, built on the conventions in
[diagram-design](https://github.com/cathrynlavery/diagram-design) (MIT):
orthogonal connectors only, zones drawn before arrows and arrows before nodes,
at most two focal nodes, and a target density around four out of ten. It is
skinned to this site's own tokens — the same `paper`, `ink`, `rule` and accent
values as `app/globals.css`, in both themes — so a diagram inside the site does
not read as a visitor from another design system.

Two tools, two jobs. Adding a third visual idiom would cost more in coherence
than it bought.
