# Putting the work on Cloudflare

Read on 21 October 2026, against the repositories as they actually stand.

The point of this is not to host the portfolio somewhere else. It is that
**twenty-six builds in the catalogue have no link**, and a reader who cannot
open anything has to take the page on trust. Every demo that goes up turns a
paragraph into something clickable.

One account, one `npx wrangler`, no adapter for anything static. Everything
below is a command you run; nothing here needs a token pasted into a chat.

---

## Before anything

```sh
npm i -g wrangler        # or npx wrangler@latest in each repo
wrangler login           # opens a browser, stores a token locally
```

You need a domain on Cloudflare for the custom names below. If you have not
moved one yet, every Worker still gets a free `*.workers.dev` URL and the
catalogue can link to that — a `workers.dev` link is still a link, and the rule
in `data/projects.ts` is that a URL goes in once it has been checked and
returns 200.

---

## Tier 1 — static, deployable this week

These have no backend at all. The build output is files; Cloudflare serves
files. Nothing to provision, nothing to pay for beyond the free plan.

| Build | Repo | What to deploy | Why it is worth doing first |
|---|---|---|---|
| **JÍBẸ́WÀ** | `jibewa` (private) | `software/` as-is | No build step. The WebGL bloom runs in any recent browser, and `?demo` plays a whole night in two minutes. This is the single most convincing thing on the account and nobody can see it. |
| **Quire** | `Quire` | `vite build` → `dist/` | Already live on Vercel. Moving it is optional; the reason to is that it is local-first and belongs on a host with no server at all. |
| **SETT** | `sett` | `vite build` → `dist/` | Same: IndexedDB, no backend, nothing to run. |
| **Sanko Vision Demo** | `swab` | `vite build` → `dist/` | Fixture data throughout. Four audiences, six phases, nothing to connect. |
| **Artisan** | `fixaroo` | `index.html` as-is | A standalone prototype file. It is already a deployable artefact. |
| **Dansville Catering** | `dv-1` | repo root as-is | A real client's landing page with no deployment of mine to link. |
| **Arena Lounge** | `arena-opai` | repo root as-is | Same. |
| **Desi Tailors** | `desi-tailors` | `desi_tailors.html` → `index.html` | One file. |
| **Sanko** (the pitch page) | `sanko-web` | repo root as-is | Gives Sanko a public face that is not the agent itself. |
| **Foayenix constellation** | `iweb` | repo root as-is | An experiment that reads as one, which is the honest frame for it. |
| **cv-site** | `cv-site` | `vite build` → `dist/` | The previous portfolio, kept as a record. |
| **This site** | `portfolio` | `STATIC_EXPORT=1 npm run build` → `out/` | Config is already committed: see `wrangler.jsonc` at the repo root. |

### The command, for a repo that is already static

```sh
cd <repo>
cp /path/to/portfolio/deploy/wrangler/static.jsonc ./wrangler.jsonc
# edit "name" and "assets.directory" in it
npx wrangler deploy
```

### The command, for a Vite build

```sh
cd <repo>
cp /path/to/portfolio/deploy/wrangler/vite-spa.jsonc ./wrangler.jsonc
npm ci && npm run build
npx wrangler deploy
```

### This site

```sh
cd portfolio
STATIC_EXPORT=1 npm run build     # writes ./out
npx wrangler deploy               # reads wrangler.jsonc at the repo root
```

---

## Tier 2 — needs a backend, and two of them are already configured for it

| Build | Repo | What it needs | State |
|---|---|---|---|
| **Yemkem branch stock and sales** | `ybs` | Workers static assets + the existing Supabase project | **`wrangler.jsonc` is already committed.** `pnpm build` then `npx wrangler deploy`. The decision was made; it has just never been run. |
| **Cork Podcast Studio** | `cork-podcast-studio` | Cloudflare D1 | **A D1 build path already exists**: `npm run build:sites`, and the initial migration is in `drizzle/`. Separate TypeScript configs keep the D1 and PostgreSQL adapters out of each other's bundles. |
| **Dansville Accessories** | `dansville-accessories` | Workers + Hyperdrive to Neon, or leave it on Vercel | Stripe webhooks and a Neon database. Moving it is work with no reward: it is going live on Vercel, and a half-moved shop is worse than a settled one. **Leave it.** |
| **Proper** | `proper-product-prototype` | PostgreSQL, a GitHub App, a worker queue | Out of scope for a demo. A recorded walkthrough is the honest substitute, and the catalogue entry already says so. |

---

## Tier 3 — cannot be demoed, and should not pretend otherwise

- **iOS and Flutter**: `shelf`, `margin`, `trueday`, `tbx-iris`, `tbx-iam`,
  `pal-t1`, `tbx-binap`. A web demo would not be the build. A screen recording
  is the honest version.
- **Desktop**: `tdl` is a Tauri app around one SQLite file on one Mac. That is
  the point of it.
- **Local-first tools with your own keys**: `tbot`, `XBM`, `node`, `Bob`.
  Hosting them means either shipping your keys or building a quota layer that
  does not exist. `Bob` is already deployed; leave the rest.

---

## What must not go up

The event pages — `DnT`, `amu30`, `21not26`, `dans-birthday`, `sandbox2`,
`30-sec-wknd` — carry real people's names, a private address, a dated plan and
in one case a proposal. They are in the catalogue because they were built. They
are not demos, and a public URL for any of them publishes somebody else's
details, which is theirs to decide and not yours. **Leave them unlinked.**

`sanko-funding-radar` and `pank` are single-owner applications holding live
private data. They stay password-protected where they are.

`yshm` is a client's unaccredited curriculum. A public URL implies a school
that is taking students. Ask first.

---

## The order I would do it in

1. **JÍBẸ́WÀ.** One afternoon, no build step, and it is the best thing you have.
2. **`ybs`.** The config is already committed and has never been run. That is a
   deploy, not a project.
3. **The portfolio**, so the whole thing sits on one account.
4. **Quire, SETT, Sanko Vision Demo** in one session: three `vite build`s.
5. **The static client pages** — `dv-1`, `arena-opai`, `desi-tailors`,
   `sanko-web` — in one more.
6. **Cork Podcast Studio** on D1, which is the only one that is actual work.

After each one: check the URL returns 200, then put it in `data/projects.ts` as
`live:`. The rule in that file is that a link is only rendered where the URL was
checked, and a dead link costs more than a missing one.

---

## Cost

Everything in Tier 1 fits the Workers free plan: 100,000 requests a day and
unlimited static asset requests. Tier 2 needs D1 (free to 5 GB) and, for
`ybs`, the Supabase project that already exists. A custom domain is the
registration fee and nothing more — Cloudflare does not mark up bandwidth.

The realistic bill for all of Tier 1 and both of Tier 2 is **£0/month plus the
domain.**
