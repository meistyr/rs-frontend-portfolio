// Builds the slimmed, de-identified "frozen" dataset that the server/api routes serve
// after the live backend is decommissioned. Reads the raw snapshot in data/raw-snapshot,
// writes final per-endpoint JSON to server/data, and rewrites CDN image URLs to local
// /img/frozen/* paths (see scripts/mirror-images.mjs for the download step).
//
// Run:  node scripts/build-frozen-data.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = join(ROOT, 'data', 'raw-snapshot')
const OUT = join(ROOT, 'server', 'data')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf-8'))
const writeJson = (p, v) => writeFileSync(p, JSON.stringify(v))

// ---- image URL localisation -------------------------------------------------
const IMG_HOSTS = ['leaguecore.nyc3.cdn.digitaloceanspaces.com']
const FALLBACK = 'https://leaguecore.nyc3.cdn.digitaloceanspaces.com/royalty-series-assets/guild_1355656017366749444.png'
const imageUrls = new Set()

// Map a remote image URL -> local public path (/img/frozen/<path-after-host>)
function localImg(url) {
  if (!url || typeof url !== 'string') return url
  try {
    const u = new URL(url)
    if (!IMG_HOSTS.includes(u.host)) return url // leave non-mirrored hosts alone
    imageUrls.add(url)
    return '/img/frozen' + u.pathname
  } catch { return url }
}

// The league's own crest, used wherever a team has no usable logo of its own.
const DEFAULT_TEAM_IMG = localImg(FALLBACK)

// 1v1 "teams" are individual players, so their team logo is that person's Discord avatar
// (a cdn.discordapp.com URL embedding their Discord user ID). Those are neither mirrored nor
// safe to publish, so every 1v1 entry is given the default crest instead.
const is1v1 = (mode) => mode === '1v1'

// ---- division list (/api/circuits) -----------------------------------------
const divisionsList = readJson(join(RAW, 'divisions_status3.json'))
const circuits = {
  guild_id: divisionsList.guild_id,
  divisions: divisionsList.divisions.map((d) => ({
    division_id: d.division_id,
    division_name: d.division_name,
    region: d.region,
    gamemode: d.gamemode,
    status: d.status,
  })),
}
writeJson(join(OUT, 'circuits.json'), circuits)

const ids = circuits.divisions.map((d) => d.division_id)
const modeById = Object.fromEntries(circuits.divisions.map((d) => [d.division_id, d.gamemode]))

// ---- sponsors (/api/marquee) -----------------------------------------------
const sponsorsRaw = readJson(join(RAW, 'sponsors.json'))
const sponsors = sponsorsRaw.map((s) => ({
  sponsor_name: s.sponsor_name,
  logo_link: localImg(s.logo_link),
  status: s.status,
}))
writeJson(join(OUT, 'sponsors.json'), sponsors)

// ---- per-division detail (/api/circuits/[id]) ------------------------------
const detail = {}
for (const id of ids) {
  const d = readJson(join(RAW, 'divisions', `${id}.json`))
  detail[id] = {
    division_id: d.division_id,
    division_name: d.division_name,
    region: d.region,
    gamemode: d.gamemode,
    status: d.status,
  }
}
writeJson(join(OUT, 'divisions.json'), detail)

// ---- matchups (/api/circuits/matchups/[id]) --------------------------------
const matchups = {}
for (const id of ids) {
  const raw = readJson(join(RAW, 'matches', `${id}.json`))
  const list = Array.isArray(raw?.matches) ? raw.matches : []
  matchups[id] = list.map((m) => {
    const solo = is1v1(modeById[id] ?? m.gamemode)
    return {
      match_id: m.match_id,
      week: m.week,
      playoff_round: m.playoff_round,
      team_id1: m.team_id1,
      team_id2: m.team_id2,
      team_1_name: m.team_1_name,
      team_2_name: m.team_2_name,
      team_score1: m.team_score1,
      team_score2: m.team_score2,
      team_1_thumb: solo ? DEFAULT_TEAM_IMG : localImg(m.team_1_thumb),
      team_2_thumb: solo ? DEFAULT_TEAM_IMG : localImg(m.team_2_thumb),
      gamemode: m.gamemode,
    }
  })
}
writeJson(join(OUT, 'matchups.json'), matchups)

// ---- teams (+roster) & standings -------------------------------------------
// Replicates server/api/circuits/teams/[id].ts and standings/[id].ts transforms.
const teamsOut = {}
const standingsOut = {}
for (const id of ids) {
  const teamsRaw = readJson(join(RAW, 'teams', `${id}.json`)).teams || []
  const standings = readJson(join(RAW, 'standings', `${id}.json`)).teamStandings || []
  const standingsMap = Object.fromEntries(standings.map((s) => [s.team_id, s]))
  const teamNameMap = Object.fromEntries(
    teamsRaw.map((t) => [t.team_id, t.team?.team_name ?? 'Unknown Team'])
  )

  // teams route: approval_status === 2, merged with standings
  teamsOut[id] = teamsRaw
    .filter((t) => t.approval_status === 2)
    .map((t) => {
      const s = standingsMap[t.team_id] || {}
      const solo = is1v1(modeById[id] ?? t.team?.gamemode)
      return {
        team_id: t.team_id,
        approval_status: t.approval_status,
        roster_removals: t.roster_removals,
        seed: s.seed ?? null,
        match_record: s.match_record ?? null,
        game_record: s.game_record ?? null,
        game_diff: s.game_diff ?? null,
        team: {
          team_id: t.team?.team_id,
          team_name: t.team?.team_name,
          group: t.team?.group ?? null,
          gamemode: t.team?.gamemode,
          logo_full: solo ? DEFAULT_TEAM_IMG : localImg(t.team?.logo_full),
          logo_thumb: solo ? DEFAULT_TEAM_IMG : localImg(t.team?.logo_thumb),
        },
        // Handles are kept (they were public on the live standings site); the
        // rocketleague.tracker.network links are dropped — they embedded Steam64/Epic
        // account identifiers and were the last external host in the snapshot.
        roster: (t.roster || []).map((p) => ({
          role: p.role,
          status: p.status,
          user_name: p.user_name,
        })),
      }
    })

  // standings route: standings enriched with team_name (teamStats are empty upstream)
  standingsOut[id] = standings.map((s) => ({
    team_id: s.team_id,
    seed: s.seed,
    team_name: teamNameMap[s.team_id],
    match_record: s.match_record,
    game_record: s.game_record,
    game_diff: s.game_diff,
  }))
}
writeJson(join(OUT, 'teams.json'), teamsOut)
writeJson(join(OUT, 'standings.json'), standingsOut)

// ---- player stats (/api/circuits/stats/[id]) -------------------------------
const STAT_KEYS = ['rating','games','mvp','score','goals','assists','shots','saves',
  'shot_perc','gpar_perc','demos_inflicted','demos_taken']
const playerStats = {}
for (const id of ids) {
  const arr = readJson(join(RAW, 'stats_players', `${id}.json`))
  playerStats[id] = (Array.isArray(arr) ? arr : []).map((p) => {
    const o = { user_name: p.user_name, team_name: p.team_name }
    for (const k of STAT_KEYS) o[k] = p[k]
    return o
  })
}
writeJson(join(OUT, 'playerStats.json'), playerStats)

// ---- fallback image + manifest ---------------------------------------------
imageUrls.add(FALLBACK)
const manifest = [...imageUrls].sort().map((url) => {
  const u = new URL(url)
  return { url, local: 'public/img/frozen' + u.pathname }
})
writeJson(join(ROOT, 'scripts', 'image-manifest.json'), manifest)

// ---- report ----------------------------------------------------------------
const sizes = readdirSync(OUT).filter((f) => f.endsWith('.json')).map((f) => {
  const b = readFileSync(join(OUT, f)).length
  return `  server/data/${f}  ${(b / 1024).toFixed(1)} KB`
})
console.log('Frozen data written:')
console.log(sizes.join('\n'))
console.log(`Divisions: ${ids.length}`)
console.log(`Unique images to mirror: ${manifest.length}`)
console.log(`Manifest: scripts/image-manifest.json`)
