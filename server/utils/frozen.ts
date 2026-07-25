// Frozen dataset loader. After the live Royalty Series backend was decommissioned,
// the server/api routes serve this baked-in snapshot (built by scripts/build-frozen-data.mjs)
// instead of proxying an external API. No token or network access required.
import circuits from '../data/circuits.json'
import sponsors from '../data/sponsors.json'
import divisions from '../data/divisions.json'
import matchups from '../data/matchups.json'
import standings from '../data/standings.json'
import teams from '../data/teams.json'
import playerStats from '../data/playerStats.json'

type ById<T> = Record<string, T>

export const frozenCircuits = circuits as { guild_id: string; divisions: any[] }
export const frozenSponsors = sponsors as any[]
export const frozenDivisions = divisions as ById<any>
export const frozenMatchups = matchups as ById<any[]>
export const frozenStandings = standings as ById<any[]>
export const frozenTeams = teams as ById<any[]>
export const frozenPlayerStats = playerStats as ById<any[]>
