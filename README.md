# Royalty Series — Frontend (Portfolio Archive)

A live, self-contained copy of the Royalty Series competitive Rocket League league site
(Nuxt 3). The original site pulled circuits, teams, matchups, standings, and player stats
from a private backend API. That backend has been decommissioned, so this build serves a
**frozen snapshot** of the real data baked into the app — no backend, database, API token,
or external CDN required. It runs entirely on its own.

## How the frozen data works

- **Served data** lives in [`server/data/`](server/data) as slimmed JSON (22 divisions of
  teams, rosters, matchups, standings, and player stats). Team names and player handles are
  retained — they were publicly listed on the live standings site. Everything that tied a
  handle to an off-site account was dropped: the roster links to external tracker profiles
  (which embedded Steam/Epic account ids) and the Discord avatars used as 1v1 team logos
  (which embedded Discord user ids). 1v1 entries show the league crest instead, since a 1v1
  "team" is one person and its logo was that person's avatar rather than an org mark.
  The snapshot references no external hosts at all.
- The [`server/api/`](server/api) routes read from that snapshot via
  [`server/utils/frozen.ts`](server/utils/frozen.ts) instead of proxying a live backend.
  The response shapes are identical to the original API, so the pages/components are
  unchanged in how they consume data.
- **Images** (team logos, match thumbnails, sponsor logos) were mirrored from the league
  CDN into [`public/img/frozen/`](public/img/frozen) and the data points at those local
  paths, so nothing depends on the CDN staying online.

### Regenerating the snapshot

The scripts in [`scripts/`](scripts) rebuild the served data from a raw capture:

```bash
node scripts/build-frozen-data.mjs   # raw snapshot -> slimmed server/data + image manifest
node scripts/mirror-images.mjs       # download referenced images -> public/img/frozen
```

The full-fidelity raw capture (`data/raw-snapshot/`, which contains internal IDs) is kept
locally and git-ignored; only the slimmed data in `server/data/` is committed.

> Note: two large 3v3 divisions have partial roster coverage — every team is present with
> its name, logo, seed, and record, but some "View Roster" panels are empty because the
> original API truncated those oversized responses at the source. All other 20 divisions
> have complete rosters.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & preview

```bash
npm run build
node .output/server/index.mjs
```

## License

Source-available, not open source: © 2024-2026 Luke Ericksen, all rights reserved.
You may read the code and run it locally to evaluate the work; any other use needs
written permission. Third-party components — the OFL typefaces and the league's team
and sponsor marks — keep their own terms. See [LICENSE](LICENSE).

## Deploy to Vercel

This is a standard Nuxt 3 app — Vercel auto-detects it (Nitro uses the Vercel preset
automatically). No environment variables are required. Import the repo in Vercel, or:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
