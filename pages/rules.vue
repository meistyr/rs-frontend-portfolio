<template>
  <div class="mb-7">

    <!-- Sticky Title Bar -->
    <div
      class="
        sticky
        top-[96px]
        z-30
        bg-neutral-900
        border-b border-neutral-700/60
      "
    >
      <div class="container mx-auto px-6 py-4 flex flex-col gap-1">
        <p class="text-[11px] uppercase tracking-widest text-gray-400">
          Royalty Series
        </p>

        <h1 class="text-3xl md:text-4xl font-bold bourgeois">
          RULES & REGULATIONS
        </h1>

        <p class="text-sm text-gray-400">
          Revised on January 14, 2026
        </p>
      </div>
    </div>

    <!-- Rules Content -->
    <div class="container mx-auto px-6 py-6">

      <!-- SINGLE CARD -->
      <UCard class="bg-neutral-900/90 border border-white/5">
        <template #header>
            <div class="flex items-center justify-between">
            <h2 class="text-xl bourgeois uppercase bold-font">
                Competition Rulebook
            </h2>

            <span class="text-xs text-gray-400">
                {{ sections.length }} sections
            </span>
            </div>
        </template>

        <div class="flex flex-col divide-y divide-white/5">

          <!-- RULE SECTION -->
            <div
                v-for="section in sections"
                :key="section.id"
                class="relative group py-4"
            >

            <span
                class="
                    absolute left-0 top-0 h-full w-0.5
                    bg-[#e7be60]
                    opacity-0
                    transition-opacity
                    duration-200
                "
                :class="openSections[section.id]
                    ? 'opacity-100'
                    : 'group-hover:opacity-100'"
            />

            <span
                class="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-r
                    from-white/5
                    via-white/3
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                "
                :class="openSections[section.id]
                    ? 'opacity-100'
                    : 'group-hover:opacity-60'"
            />

            <!-- Section Header -->
            <button
              class="w-full flex items-center justify-between text-left px-2"
              @click="toggle(section.id)"
            >
              <h3 class="text-lg font-semibold bourgeois text-gray-100">
                {{ section.label }}
              </h3>

              <Icon
                name="mdi:chevron-down"
                class="relative
                    text-gray-400
                    opacity-40
                    group-hover:opacity-100
                    group-hover:translate-x-1
                    transition"
                :class="openSections[section.id] ? 'rotate-180' : ''"
              />
            </button>

            <!-- Section Body -->
            <Transition name="rule-expand">
            <div
                v-if="openSections[section.id]"
                class="mt-4 px-2 text-sm text-gray-200 overflow-hidden"
            >
              <!-- Section Body -->
                <template v-if="openSections[section.id]">
                    <div class="pt-4 text-sm text-gray-200">

                        <!-- 1. Code of Conduct -->
                        <template v-if="section.id === 'code-of-conduct'">
                            <ol class="aftetir">
                                <li>
                                1.1 &rarr; All members participating in the Royalty Series are responsible for following and abiding by the league’s code of conduct. Failure to follow the code of conduct may result in suspension or disqualification.
                                <ul class="indent-list">
                                    <li class="mt-2">1.1.1 &rarr; Cheating by exploiting software or game mechanics is strictly prohibited.</li>
                                    <li class="mt-2">1.1.2 &rarr; Use of un‑rostered and/or unapproved alternate accounts is strictly prohibited.</li>
                                    <li class="mt-2">1.1.3 &rarr; Offensive, vulgar, obscene, or inappropriate imagery or language is prohibited.</li>
                                    <li class="mt-2">1.1.4 &rarr; Any toxicity and/or harassment is not permitted in official league channels (including Rocket League chat or league streams).</li>
                                    <li class="mt-2">1.1.5 &rarr; Collusion (secret agreement or cooperation especially for an illegal or deceitful purpose) among teams will result in disqualification.</li>
                                    <li class="mt-2">1.1.6 &rarr; Intentionally delaying a game or series will result in a forfeit.</li>
                                    <li class="mt-2">1.1.7 &rarr; Attempting to bribe league organizers or players will result in removal and blacklisting.</li>
                                </ul>
                                </li>
                                <li class="mt-3">1.2 &rarr; League staff have the right to impose disciplinary actions; league management has final say.</li>
                                <li class="mt-3">1.3 &rarr; Rule violations should be submitted via a ticket in the League Discord.</li>
                                <li class="mt-3">1.4 &rarr; Do not DM or tag staff publicly—use tickets to maintain transcripts.</li>
                                <li class="mt-3">1.5 &rarr; Advertising without consent is strictly prohibited.</li>
                            </ol>
                        </template>

                        <!-- 2. Competitor Eligibility -->
                        <template v-else-if="section.id === 'competitor-eligibility'">
                            <ol class="aftetir">
                                <li >2.1 &rarr; Players must be <strong>14 years old</strong> to participate.</li>
                                <li class="mt-3">2.2 &rarr; Smurfing, sandbagging, or rank manipulation is strictly prohibited.
                                    <ul class="indent-list">
                                        <li class="mt-2">2.2.1 &rarr; Teams found intentionally playing with smurfed account will be removed, suspended, or blacklisted.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">2.3 &rarr; Players must meet minimum activity requirements by circuit:</li>
                                    <ul>
                                        <li class="indent-list mt-2">2.3.1 &rarr; Win Requirements (all-time):
                                            <ul class="indent-list">
                                                <li>Contender: 1100+</li>
                                                <li>Ascendant: 1300+</li>
                                                <li>Premier: 1500+</li>
                                                <li>Pinnacle: 1700+</li>
                                            </ul>
                                        </li>
                                        <li class="indent-list mt-2">2.3.2 &rarr; Doubles and Standard Match Requirements (last 3 seasons):
                                            <ul class="indent-list">
                                                <li>Contender: 250+</li>
                                                <li>Ascendant: 300+</li>
                                                <li>Premier: 350+</li>
                                                <li>Pinnacle: 350+</li>
                                            </ul>
                                        </li>
                                        <li class="indent-list mt-2">2.3.3 &rarr; Solo Match Requirements (last 3 seasons): 50 matches in the Solo gamemode.</li>
                                        <li class="indent-list mt-2">2.3.4 &rarr; Solo Circuit Rank Ranges:
                                            <ul class="indent-list">
                                                <li>Initiate: -749</li>
                                                <li>Contender: 750-899</li>
                                                <li>Ascendant: 900-999</li>
                                                <li>Prodigy: 1000-1099</li>
                                                <li>Premier: 1100-1199</li>
                                                <li>Exalted: 1200-1299</li>
                                                <li>Pinnacle: 1300+</li>
                                            </ul>
                                        </li>
                                    </ul>
                                <li class="mt-3">2.4 &rarr; Doubles and Standard Rank peaks:
                                    <ul class="indent-list">
                                        <li class="mt-2">2.4.1 &rarr; Last 6 seasons cannot exceed circuit MMR range by more than one rank.</li>
                                        <li class="mt-2">2.4.2 &rarr; Last 3 seasons peak cannot exceed circuit MMR range.</li>
                                        <li class="mt-2">2.4.3 &rarr; Players are allowed a MAXIMUM of one rank peak exceeding the circuit MMR range during the season (ex., C3 can remain in C1-2, a GC1 cannot).</li>
                                        <li class="mt-2">2.4.4 &rarr; Premier circuit: max 2000 MMR for in-season peaks before removal.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">2.5 &rarr; Solo Rank peaks:
                                    <ul class="indent-list">
                                        <li class="mt-2">2.5.1 &rarr; Last 6 seasons cannot exceed circuit MMR range by more than 50.</li>
                                        <li class="mt-2">2.5.2 &rarr; Last 3 seasons peak cannot exceed circuit MMR range.</li>
                                        <li class="mt-2">2.5.3 &rarr; Players are allowed a MAXIMUM of 60 MMR above the circuit MMR range during the season.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">2.6 &rarr; Main or highest-rated account must be used; no alternate/unrostered accounts.</li>
                                <li class="mt-3">2.7 &rarr; All roster players must join the Royalty Series Discord in order to participate.</li>
                                <li class="mt-3">2.8 &rarr; Player trackers must be linked at registration.
                                    <ul class="indent-list">
                                        <li class="mt-2">2.8.1 &rarr; If a username changes, notify staff via ticket with new username and tracker link.</li>
                                        <li class="mt-2">2.8.2 &rarr; Steam usernames must match roster listing during league play.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">2.9 &rarr; Players who receive a Rocket League ban can NOT participate until the ban ends. An alternate account cannot be used to circumvent the ban.</li>
                                <li class="mt-3">2.10 &rarr; Cross-region play is allowed with conditions:
                                    <ul class="indent-list">
                                        <li class="mt-2">Standard: the captain and one other player must be located in the same region as the circuit.</li>
                                        <li class="mt-2">Doubles: the captain must be located in the same region as the circuit.</li>
                                        <li class="mt-2">Solo: player must be located in the same region as the circuit or agree to play on the servers of the circuit region.</li>
                                        <li class="mt-2">Exclusions: MENA, Africa, Oceania, Asia play EU; South America plays NA.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">2.11 &rarr; Players can only play one region per gamemode at a time.</li>
                                <li class="mt-3">2.12 &rarr; Staff may deny players lacking tracker data or history.</li>
                            </ol>
                        </template>

                        <!-- 3. Team Eligibility -->
                        <template v-else-if="section.id === 'team-eligibility'">
                            <ol class="aftetir">
                                <li>3.1 &rarr; Doubles and Standard Circuit rank ranges:
                                    <ul class="indent-list">
                                        <li>Contender: (1075–1314 MMR)</li>
                                        <li>Ascendant: (1315–1574 MMR)</li>
                                        <li>Premier: (1575–1861 MMR)</li>
                                        <li>Pinnacle: (1862+ MMR)</li>
                                    </ul>
                                </li>
                                <li class="mt-3">3.2 &rarr; Standard teams: mininum of 3 players. Doubles teams: mininum of 2 players.</li>
                                <li class="mt-3">3.3 &rarr; Team composition:
                                    <ul class="indent-list">
                                        <li class="mt-2">Standard: no more than 2 players can be below circuit MMR range.</li>
                                        <li class="mt-2">Doubles: only captain must meet circuit MMR range.</li>
                                        <li class="mt-2">Exception: Diamond teams may join Challenger if Prospect canceled; all players must be at least Diamond 1.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">3.4 &rarr; Roster additions allowed until the end of week 7.</li>
                                <li class="mt-3">3.5 &rarr; Only two roster changes per team (changes are counted on removal).</li>
                                <li class="mt-3">3.6 &rarr; After week 5 lock, one emergency addition is allowed if your roster has a vacant slot.</li>
                                <li class="mt-3">3.7 &rarr; Roster changes requested less than 24h before series may not be approved in time.</li>
                            </ol>
                        </template>

                        <!-- 4. Season Format -->
                        <template v-else-if="section.id === 'season-format'">
                            <ol class="aftetir">
                                <li>4.1 &rarr; Doubles and Standard Regular season duration: 7 weeks.
                                    <ul class="indent-list">
                                        <li class="mt-2">4.1.1 &rarr; Modified round robin.</li>
                                        <li class="mt-2">4.1.2 &rarr; One series per week.</li>
                                        <li class="mt-2">4.1.3 &rarr; All series are Best-of-5.</li>
                                        <li class="mt-2">4.1.4 &rarr; Regular season performance decides spot in qualifier event.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">4.2 &rarr; Doubles and Standard Qualifier is a one day, pre-schedule weekend event.
                                    <ul class="indent-list">
                                        <li class="mt-2">4.2.1 &rarr; 3 round true swiss bracket.</li>
                                        <li class="mt-2">4.2.2 &rarr; All series are Best-of-7.</li>
                                    </ul>
                                    <img src="@/assets/img/brackets/swiss_bracket.png" alt="Qualifier Format" class="w-full max-w-md mt-4">
                                </li>
                                <li class="mt-3">4.3 &rarr; Doubles and Standard Playoffs: hybrid bracket over three weeks with a weekend Finals event. 16 team bracket requires Semis and Finals weekend.
                                    <ul class="indent-list">
                                        <li class="mt-2">4.3.1 &rarr; Top 8 or 16 teams advance depending on circuit size.</li>
                                        <li class="mt-2">4.3.2 &rarr; All rounds: Best-of-7.</li>
                                    </ul>
                                    <img src="@/assets/img/brackets/hybrid_bracket.png" alt="Playoff Format" class="w-full max-w-lg mt-4">
                                </li>
                                <li class="mt-3">4.4 &rarr; Solos Regular season duration: 5 weeks.
                                    <ul class="indent-list">
                                        <li class="mt-2">4.4.1 &rarr; Modified round robin.</li>
                                        <li class="mt-2">4.4.2 &rarr; One series per week.</li>
                                        <li class="mt-2">4.4.3 &rarr; All series are Best-of-5.</li>
                                        <li class="mt-2">4.4.4 &rarr; Regular season performance decides spot in playoff event.</li>
                                    </ul>  
                                </li>
                                <li class="mt-3">4.5 &rarr; Solos Playoffs: hybrid bracket over five weeks scheduled by the players.
                                    <ul class="indent-list">
                                        <li class="mt-2">4.5.1 &rarr; Top 8 or 16 players advance depending on circuit size.</li>
                                        <li class="mt-2">4.5.2 &rarr; All rounds: Best-of-7.</li>
                                    </ul>
                                </li>
                            </ol>
                        </template>

                        <!-- 5. Scheduling -->
                        <template v-else-if="section.id === 'scheduling'">
                            <ol class="aftetir">
                                <li>5.1 &rarr; Scheduling window: Midnight to the following Sunday 11:59 (NA EST/EDT or EU GMT/BST).
                                    <ul class="indent-list">
                                        <li class="mt-2">5.1.1 &rarr; If no scheduling discussion by Thursday 10:00 PM (NA EST/EDT or EU GMT/BST), submit ticket to staff.</li>
                                        <li class="mt-2">5.1.2 &rarr; Team with most availability wins if opponent unresponsive.</li>
                                        <li class="mt-2">5.1.3 &rarr; Missed scheduling resulting in a forfeit may prevent a team from finishing season.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">5.2 &rarr; No‑show/no‑play at scheduled time → automatic forfeit.
                                    <ul class="indent-list">
                                        <li class="mt-2">5.2.1 &rarr; 15‑minute grace period after start time.</li>
                                        <li class="mt-2">5.2.3 &rarr; If opponent is absent after 15 minutes create a ticket with evidence.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">5.3 &rarr; Both teams are responsible for submitting scores by Sunday 00:00.
                                    <ul class="indent-list">
                                        <li class="mt-2">5.3.1 &rarr; Missed submissions will result in a double forfeit.</li>
                                        <li class="mt-2">5.3.2 &rarr; Proof via Ballchasing links or replay files is required for ALL series including playoffs; a manual option available.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">5.4 &rarr; Trying to force forfeit will result in a loss for the offending party.</li>
                            </ol>
                        </template>

                        <!-- 6. Match Rules -->
                        <template v-else-if="section.id === 'match-rules'">
                            <ol class="aftetir">
                                <li>6.1 The use of Rocket League's "Match Admin" is strictly prohibited.</li>
                                <li class="mt-3">6.2 &rarr; Match Setup/Settings:
                                    <ul class="indent-list">
                                        <li class="mt-2">6.2.2 &rarr; Standard Rocket League maps only.
                                            <ul class="indent-list">
                                                <li><strong>Prohibited</strong> maps:</li>
                                                <li>Snowy Beckwith</li>
                                                <li>DFH Snowy</li>
                                                <li>Forbidden Temple Fire & Ice</li>
                                                <li>Mannfield Snowy</li>
                                                <li>Neo Tokyo Comic/Hacked</li>
                                                <li>Neon Fields</li>
                                                <li>Salty Shores (Day)</li>
                                                <li>Starbase Arc Aftermath</li>
                                                <li>Utopia Coliseum Snowy</li>
                                                <li>Non‑standard/maps</li>
                                                <li>Rocket Lab - all prohibited</li>
                                            </ul>
                                        </li>
                                        <li class="mt-2">6.2.3 &rarr; No mutator settings.</li>
                                        <li class="mt-2">6.2.4 &rarr; Match lobby team names must match roster.</li>
                                        <li class="mt-2">6.2.5 &rarr; Play on US East / EU servers; other servers allowed only with staff approval via ticket.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">6.3 &rarr; Casted Matches:
                                    <ul class="indent-list">
                                        <li class="mt-2">6.3.1 &rarr; Both teams must consent to stream before booking a caster; all playoffs must be streamed unless stated.</li>
                                        <li class="mt-2">6.3.2 &rarr; Casters must share lobby info and follow all Royalty Series rules before casting any series.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">6.4 &rarr; Spectators rules:
                                    <ul class="indent-list">
                                        <li class="mt-2">6.4.1 &rarr; Max of one spectator per team with approval from both teams (space must be available for a caster or co-caster or producer)</li>
                                        <li class="mt-2">6.4.2 &rarr; No spectator changes mid-series.</li>
                                        <li class="mt-2">6.4.3 &rarr; Once the series has started, the decision to allow spectators cannot be changed.</li>
                                        <li class="mt-2">6.4.4 &rarr; Staff may join to spectate at any time if a rule break or toxicity is reported.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">6.5 &rarr; Timeouts:
                                    <ul class="indent-list">
                                        <li class="mt-2">6.5.1 &rarr; One timeout per series only in a playoff series, 1 minute and 30 seconds, only between games.</li>
                                        <li class="mt-2">6.5.2 &rarr; Teams can run down the timer between games during a Best-of-5 or a Best-of-7.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">6.6 &rarr; Substitutions are allowed only between games.</li>
                                <li class="mt-3">6.7 &rarr; Connection issues:
                                    <ul class="indent-list"> 
                                        <li class="mt-2">6.7.1 &rarr; If within 1 minute and no goals, teams can request server reset; both teams must comply. Failure to comply will result in staff review, reporting team must provide evidence including a screenshot or screen recording.</li>
                                        <li class="mt-2">6.7.2 &rarr; After 1 minute or a goal, the series continues unless both teams agree to reset.</li>
                                        <li class="mt-2">6.7.3 &rarr; Mid-series disconnect: players have a 5‑minute graceperiod to rejoin. If not, the team with lack of players forfeits unless both teams agree to reschedule.</li>
                                        <li class="mt-2">6.7.4 &rarr; Between-game server reset requests must be honored; score still recorded.</li>
                                    </ul>
                                </li>
                            </ol>
                        </template>

                        <!-- 7. Forfeits -->
                        <template v-else-if="section.id === 'forfeits'">
                            <ol class="aftetir">
                                <li>7.1 &rarr; A forfeit defined as:
                                    <ul class="indent-list">
                                        <li class="mt-2">7.1.1 &rarr; Unable to complete series on time.</li>
                                        <li class="mt-2">7.1.2 &rarr; Prior notice of inability to play.</li>
                                        <li class="mt-2">7.1.3 &rarr; Score not submitted on time results in a double forfeit.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">7.2 &rarr; Forfeit submissions must include screenshot of opponent's forfeit or staff decision.</li>
                            </ol>
                        </template>

                        <!-- 8. Disqualifications / Suspensions -->
                        <template v-else-if="section.id === 'discipline'">
                            <ol class="aftetir">
                                <li>8.1 &rarr; Team may be disqualified from current/future seasons if:
                                    <ul class="indent-list">
                                        <li class="mt-2">8.1.1 &rarr; 2+ forfeits in one season.</li>
                                        <li class="mt-2">8.1.2 &rarr; Repeated failure to submit scores.</li>
                                        <li class="mt-2">8.1.3 &rarr; Forfeit in playoff series.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">8.2 &rarr; Team may be suspended for:
                                    <ul class="indent-list">
                                        <li class="mt-2">8.2.1 &rarr; Joining others’ matches.</li>
                                        <li class="mt-2">8.2.2 &rarr; Excessive mid-season forfeits (3+ forfeits).</li>
                                        <li class="mt-2">8.2.3 &rarr; Poor sportsmanship.</li>
                                    </ul>
                                </li>
                                <li class="mt-3">8.3 &rarr; Three season disqualifications will result in an indefinite ban.</li>
                                <li class="mt-3">8.4 &rarr; Any rule violation could result in disqualification or suspension of player/team.</li>
                            </ol>
                        </template>

                        <!-- 9. Disputes -->
                        <template v-else-if="section.id === 'disputes'">
                            <ol class="aftetir">
                                <li>9.1 &rarr; Disputes must be submitted via ticket; league management decisions are final.</li>
                                <li class="mt-3">9.2 &rarr; No public dispute discussion; doing so may lead to disciplinary action.</li>
                            </ol>
                        </template>

                        <!-- 10. Terms of Service -->
                        <template v-else-if="section.id === 'tos'">
                            <ol class="aftetir">
                                <li>By participating in the Royalty Series, you agree to abide by all rules listed above.</li>
                                <li>All members must follow Discord and Rocket League TOS:</li>
                                    <ul class="indent-list">
                                        <li class="mt-2">Discord TOS: <nuxt-link to="https://discordapp.com/terms" target="_blank">https://discordapp.com/terms</nuxt-link></li>
                                        <li class="mt-2">Rocket League TOS: <nuxt-link to="https://rocketleague.com/en/news/rocket-league-code-of-conduct" target="_blank">https://rocketleague.com/en/news/rocket-league-code-of-conduct</nuxt-link></li>
                                    </ul>
                            </ol>
                        </template>
                    </div>
                </template>
            </div>
            </Transition>
          </div>

        </div>
      </UCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const sections = [
  { id: 'code-of-conduct', label: '1. Code of Conduct' },
  { id: 'competitor-eligibility', label: '2. Competitor Eligibility' },
  { id: 'team-eligibility', label: '3. Team Eligibility' },
  { id: 'season-format', label: '4. Season Format' },
  { id: 'scheduling', label: '5. Scheduling & Scores' },
  { id: 'match-rules', label: '6. Match Rules' },
  { id: 'forfeits', label: '7. Forfeits' },
  { id: 'discipline', label: '8. Disqualifications & Suspensions' },
  { id: 'disputes', label: '9. Disputes' },
  { id: 'tos', label: '10. Terms of Service' }
]

const openSections = reactive<Record<string, boolean>>({})

function toggle(id: string) {
  openSections[id] = !openSections[id]
}
</script>

<style>
.rule-expand-enter-active,
.rule-expand-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease,
    max-height 260ms ease;
}

.rule-expand-enter-from,
.rule-expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
  max-height: 0;
}

.rule-expand-enter-to,
.rule-expand-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 2000px;
}
</style>