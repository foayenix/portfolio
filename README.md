# Felix Ayeni — portfolio

A catalogue of 30 builds, which is also the CV. Next.js 15 (App Router) +
React 19 + TypeScript + Tailwind v4. No database, no CMS, no images: every page
renders from two data files and ships as static HTML.

The homepage leads with the role, then three flagship case studies, then the
full catalogue. Every build carries a `status`, because the site used to claim
in prose that everything was finished end to end while the catalogue itself
listed a prototype and an experiment.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 36 static pages into .next
npm start        # serve the production build
```

Deploy to Vercel by importing the repo: no environment variables, no settings
to change.

> Do not run `npm run build` while `npm run dev` is running. They share
> `.next/` and will corrupt each other; if that happens, `rm -rf .next`.

## The design

The site is set like a risograph print: one navy ink, one fluorescent pink, and
the paper showing between them. Pink is the ink an offset press cannot
simulate, so it is reserved for what the page asserts: the signature paragraph
on a build, the active filter, the entry currently being read. It is never used
as decoration or for body text.

Type is **Archivo** for display, **Newsreader** for body, and **DM Mono** on
real identifiers only (stack names, nothing else). Serif body copy is the
deliberate inversion of the usual developer-portfolio sans-and-mono.

Two details worth knowing before you edit:

- **Ink comes in two densities.** `--flo` is the bright plate, used for rules,
  marks and display type, where 3:1 contrast is enough. `--flo-deep` is the
  same ink laid heavier, and is the only one allowed under small text or as a
  fill behind text: bright pink on the stone ground is 3.45:1 and fails AA.
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
| `data/projects.ts` | All 30 builds: one-liner, signature detail, stack, tags, year, `status`, `featured`, `flagship`, an optional `caseStudy`, and optional `live` / `source` URLs. |
| `data/site.ts` | Name, role, specialism, location, bio, hiring block, email, phone, GitHub, and empty `cv` / `linkedin` slots. |

### Status is the field that must not flatter

Every build has one of five: `live`, `client`, `built`, `prototype`,
`experiment`. The labels and their definitions live in `STATUS` in
`data/projects.ts` and are printed in full on the profile page, so a label on a
card always resolves to a definition a reader can find.

`built` is the honest majority: finished, running, never released. Twenty-three
builds sit there, and the way to move one out is to deploy it, not to reword
it. Where a build is held up by something outside the code, `statusNote` says
what — a blocked pilot, a private repository, a site only the owner runs.

### Case studies

`caseStudy` answers the questions a reviewer would otherwise have to ask: who
needed it, what I built, what was hard, what the architecture cost, how to
check the claims, and what is missing. Three builds carry one and the homepage
leads with them, ranked by `flagship`.

There is deliberately no field for outcomes or usage. Nothing here has been
released to users, so an outcomes section would either be empty on every page
or be invented. Every sentence in a case study restates something the build
already establishes elsewhere in its own entry.

### CV and LinkedIn

`SITE.cv` and `SITE.linkedin` are empty strings. Fill either one and its button
appears on the profile page and in the footer; leave it empty and nothing
renders. No placeholder URL goes in these, for the same reason no build gets a
`source` pointing at a nearby repository: a dead link costs more than a missing
one.

**Links are only present where the URL was checked and returned 200.** A build
with no `live` renders no live button; of the 30, four have a live deployment
and 25 have public source. Every claim in the catalogue comes from
`foayenix/cv-site` (the twenty oldest entries) or from the repository itself
(every later one).

Two rules that are easy to break by accident:

- **Read the branch the work is on, not the default branch.** Several builds
  keep their newest state on a `claude/*` branch that was never merged. Shelf's
  App Store and index-recovery work is one of them, so a README on `main` can
  be months behind the code.
- **A private build gets no `source`, and never a link to a nearby public
  repository standing in for it.** Sanko's public repo holds the first Flask
  MVP and not the agent the entry describes, so that entry links nothing and
  says why in its `stackNote`. Football Frenzy's near-namesake public repo is a
  different game.

Adding a build is one object in `data/projects.ts`; the index, the filters,
the tag counts, the related-builds section, the static routes and the footer
count all derive from it.

## Structure

```
app/
  page.tsx            the index: role, three flagships, then every build
  work/page.tsx       the same catalogue, filterable by kind
  work/[slug]/        one page per build (generateStaticParams)
  profile/page.tsx    bio, the hiring route, the status key, and the three
                      arguments the builds keep making
  globals.css         tokens, both presses, and the component layer
components/
  Catalogue.tsx       the index list and its inking panel
  StatusTag.tsx       the status label, inked only for `live`
  WorkGrid.tsx        the filterable grid
  Nav / Footer / Mark / ThemeToggle
```
