# Diagrams

Architecture diagrams, one per build, built as self-contained HTML with inline
SVG and no script beyond three lines that read a theme out of the query string.

They answer the question a reader has about a build they cannot open: **what is
this made of, and where are its boundaries.** Twenty-six entries in the
catalogue have no link, so for most of them this is the only thing there is to
look at.

| Diagram | The boundary it draws |
|---|---|
| `ybs` | SQL is the authority; the phone holds a copy it may only preview with, and is never sent the figure a count would be reconciled towards. |
| `proper` | The scanner never runs inside a web request, and the database role that serves pages cannot publish a report. |
| `quire` | Everything is on one machine, and the drag that makes a citation is the only way to make one. |
| `sanko` | The scoping is a query predicate in the executor, not a line in the prompt. |
| `pank` | A model may read a payslip; nothing a model reads becomes a figure until the owner confirms it. |
| `dansville` | A price is only ever decided on the server, and a paid session becomes an order in exactly one place. |

## Build

```sh
node diagrams/build.mjs     # writes public/diagrams/*.html
```

Conventions follow [diagram-design](https://github.com/cathrynlavery/diagram-design)
(MIT): orthogonal connectors only, zones drawn before arrows and arrows before
nodes, at most two focal nodes, a target density around four out of ten, and a
bridge on the less important line wherever two must cross. `_kit.mjs` holds the
skin — the same `paper`, `ink`, `rule` and accent tokens as `app/globals.css`,
in both themes — so a diagram inside the site is not a visitor from another
design system.

## The build refuses to ship two faults

Both were real, and both were found by looking at a screenshot rather than at
the code, which is exactly why they are checks now.

- **A label that does not fit its box.** The first hand-authored diagram shipped
  a sublabel that ran out past its own node. `node()` measures every title and
  line against the box's inner width and fails the build. It caught nine more
  the first time it ran.
- **A connector that runs through a label.** `elbow()` records where it runs,
  `edgeLabel()` records where it sits, and `page()` checks the two against each
  other for that diagram. It caught ten, including three I had already looked
  at and missed.

Neither check sees a hand-written path, so a route written as a raw `d` string
is on its author. There is one, in `sanko.mjs`, and it is commented as such.

## Screenshots

`CHROME_PATH` has to point at a Chrome or Chromium binary.

```sh
CHROME_PATH=/path/to/chromium node diagrams/scripts/capture.mjs \
  http://localhost:3000/diagrams/ybs.html --out shots/ybs.png --select figure --theme light
```

Read the PNG. The checks above catch overlap; they do not catch a box carrying
a claim that is not true, or a diagram that is dense enough to be two.

`scripts/` is the capture tool from the [Anatomy](https://github.com/wheresryan22/anatomy)
skill (MIT), kept for its headless-Chrome handling; its licence sits beside it.
