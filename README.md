# Felix Ayeni — portfolio

A catalogue of 26 finished builds, and a CV by implication. Next.js 15 (App
Router) + React 19 + TypeScript + Tailwind v4. No database, no CMS, no images —
every page renders from two data files and ships as static HTML.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 32 static pages into .next
npm start        # serve the production build
```

Deploy to Vercel by importing the repo — no environment variables, no settings
to change.

> Do not run `npm run build` while `npm run dev` is running. They share
> `.next/` and will corrupt each other; if that happens, `rm -rf .next`.

## The design

The site is set like a risograph print: one navy ink, one fluorescent pink, and
the paper showing between them. Pink is the ink an offset press cannot
simulate, so it is reserved for the things the page actually asserts — the
signature paragraph on a build, the active filter, the entry currently being
read — and never used as decoration or for body text.

Type is **Archivo** for display, **Newsreader** for body, and **DM Mono** on
real identifiers only (stack names, nothing else). Serif body copy is the
deliberate inversion of the usual developer-portfolio sans-and-mono.

Two details worth knowing before you edit:

- **Ink comes in two densities.** `--flo` is the bright plate, used for rules,
  marks and display type, where 3:1 contrast is enough. `--flo-deep` is the
  same ink laid heavier, and is the only one allowed under small text or as a
  fill behind text — bright pink on the stone ground is 3.45:1 and fails AA.
- **Misregistration is a pointer affordance.** The offset pink ghost on the
  index (`.reg`) only exists at `lg` and above. Without a hover state it just
  looks like a printing fault on whichever entry happens to be first.

Everything in `app/globals.css` sits inside `@layer base` or `@layer
components` on purpose. Unlayered CSS outranks all of Tailwind's layered
utilities, so a bare `*` or `.display` rule would silently beat every utility
written in a component.

## Where content lives

Edit these two files; never edit layout to change copy.

| File | What it holds |
|---|---|
| `data/projects.ts` | All 26 builds — one-liner, signature detail, stack, tags, year, `featured`, and optional `live` / `source` URLs. |
| `data/site.ts` | Name, role, location, bio, email, phone, GitHub. |

**Links are only present where the URL was checked and returned 200.** A build
with no `live` renders no live button rather than a guess; of the 26, four have
a live deployment and 20 have public source. Copy for the first twenty entries
is carried over verbatim from `foayenix/cv-site`; the six later entries are
written from each repo's own README.

Adding a build is one object in `data/projects.ts` — the index, the filters,
the tag counts, the related-builds section, the static routes and the footer
count all derive from it.

## Structure

```
app/
  page.tsx            the index — every build in one list
  work/page.tsx       the same catalogue, filterable by kind
  work/[slug]/        one page per build (generateStaticParams)
  profile/page.tsx    bio and the three arguments the builds keep making
  globals.css         tokens, both presses, and the component layer
components/
  Catalogue.tsx       the index list and its inking panel
  WorkGrid.tsx        the filterable grid
  Nav / Footer / Mark / ThemeToggle
```
