<template>
  <div class="my-7">

    <!-- Team Status Legend -->
    <div class="flex items-stretch gap-3 mb-6">
      <div
        class="
          h-10
          inline-flex items-center gap-x-6
          px-4
          rounded-xl
          bg-neutral-900
          border border-neutral-700/60
          backdrop-blur
          text-sm text-gray-300
        "
      >
        <div class="flex items-center gap-2">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span>Approved</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-[#e7be60] opacity-60 animate-ping" />
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e7be60]" />
          </span>
          <span>Pending Approval</span>
        </div>
      </div>
    </div>

    <!-- No teams -->
    <div v-if="!displayedTeams.length" class="rounded my-5 p-3 text-center">
      <UCard>
        <p class="my-3 font-semibold">
          No teams have been found for this circuit.
        </p>
      </UCard>
    </div>

    <!-- Teams Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start"
    >
      <div
        v-for="team in displayedTeams"
        :key="team.team_id"
        class="flex justify-center"
      >
        <UCard class="w-full max-w-lg shadow-md">

          <!-- Header -->
          <template #header>
            <div class="flex justify-center items-center gap-3">
              <h4 class="text-2xl uppercase font-bold text-center bourgeois">

                <span v-if="is1v1Division">
                  {{ getSoloPlayer(team)?.user_name || team.team?.team_name }}
                </span>

                <span v-else>
                  {{ team.team?.team_name }}
                </span>
              </h4>

              <!-- Approval Status Pulse -->
              <span v-if="team.approval_status === 2" class="relative flex h-3 w-3">
                <span class="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>

              <span v-else-if="team.approval_status === 1" class="relative flex h-3 w-3">
                <span class="absolute inline-flex h-full w-full rounded-full bg-[#e7be60] opacity-60 animate-ping" />
                <span class="relative inline-flex h-3 w-3 rounded-full bg-[#e7be60]" />
              </span>

              <span v-else class="inline-flex h-3 w-3 rounded-full bg-gray-500" />
            </div>
          </template>

          <!-- Body -->
          <template #default>
            <div class="flex flex-col items-center gap-4">

              <!-- Logo + Stats -->
              <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-sm">
                <img
                  class="h-28 w-28 object-contain rounded-lg"
                  :src="getTeamLogo(team)"
                  loading="lazy"
                  alt="Team logo"
                />

                <div class="grid grid-cols-4 text-center text-sm font-medium w-full">
                  <div>
                    <p>{{ team.seed ?? team.stats?.seed ?? '-' }}</p>
                    <p class="text-xs text-gray-500">Seed</p>
                  </div>
                  <div>
                    <p>{{ team.match_record ?? team.stats?.match_record ?? '-' }}</p>
                    <p class="text-xs text-gray-500">Series</p>
                  </div>
                  <div>
                    <p>{{ team.game_record ?? team.stats?.game_record ?? '-' }}</p>
                    <p class="text-xs text-gray-500">Games</p>
                  </div>
                  <div>
                    <p>{{ team.game_diff ?? team.stats?.win_diff ?? '-' }}</p>
                    <p class="text-xs text-gray-500">Diff</p>
                  </div>
                </div>
              </div>

              <!-- Roster Toggle -->
              <div v-if="!is1v1Division" class="w-full max-w-sm mt-2">
                <button
                  @click="toggleRoster(team.team_id)"
                  class="w-full flex justify-between items-center
                         px-3 py-2 text-sm font-semibold
                         border border-gray-700 rounded-lg
                         bg-neutral-900 hover:bg-neutral-800 transition"
                >
                  <span>
                    {{ openStates[team.team_id] ? 'Hide Roster' : 'View Roster' }}
                  </span>
                  <Icon
                    :name="openStates[team.team_id] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                    class="text-gray-400"
                  />
                </button>

                <Transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="opacity-0 scale-y-95"
                  enter-to-class="opacity-100 scale-y-100"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="opacity-100 scale-y-100"
                  leave-to-class="opacity-0 scale-y-95"
                >
                  <div
                    v-show="openStates[team.team_id]"
                    class="p-3 border border-t-0 border-gray-700
                           rounded-b-lg bg-neutral-900
                           max-h-64 overflow-y-auto"
                  >
                    <UTable
                      :rows="getExpandedRoster(team.roster)"
                      :columns="[
                        { key: 'status', label: '' },
                        { key: 'role', label: '' },
                        { key: 'user_name', label: 'Player' }
                      ]"
                      :ui="{ td: { base: 'text-sm py-1' } }"
                    >
                      <template #status-data="{ row }">
                        <span
                          v-if="row.status === 2"
                          class="inline-flex h-2 w-2 rounded-full bg-green-500"
                        />
                        <span
                          v-else-if="row.status === 1"
                          class="inline-flex h-2 w-2 rounded-full bg-[#e7be60]"
                        />
                        <span
                          v-else
                          class="inline-flex h-2 w-2 rounded-full bg-gray-500"
                        />
                      </template>

                      <template #role-data="{ row }">
                        <Icon :name="getRoleIcon(row.role)" class="w-4 h-4" />
                      </template>
                    </UTable>
                  </div>
                </Transition>
              </div>
            </div>
          </template>

          <!-- Footer -->
          <template #footer v-if="!is1v1Division">
            <p class="text-center text-sm">
              {{ team.roster_removals }}/3 roster removals used.
            </p>
          </template>

        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { UCard, UTable, Icon } from '#components'

const props = defineProps<{ group: string }>()
const route = useRoute()
const divisionId = route.params.id

const { data: teams } = await useAsyncData(
  `teams-${divisionId}`,
  () => $fetch(`/api/circuits/teams/${divisionId}`)
)

function getTeamLogo(team: any) {
  return (
    team.team?.logo_full ||
    team.team?.logo_thumb ||
    '/img/frozen/royalty-series-assets/guild_1355656017366749444.png'
  )
}

const openStates = ref<Record<string, boolean>>({})

function toggleRoster(teamId: string) {
  openStates.value[teamId] = !openStates.value[teamId]
}

function getExpandedRoster(roster: any[]) {
  if (!roster) return []

  const order = { manager: 1, captain: 2, player: 3, coach: 4 }

  return roster
    .filter(p => p.user_name && p.user_name !== 'None')
    .map(p => ({
      status: p.status,
      role: capitalizeFirst(p.role),
      user_name: p.user_name
    }))
    .sort((a, b) =>
      (order[a.role.toLowerCase()] ?? 99) -
      (order[b.role.toLowerCase()] ?? 99)
    )
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getRoleIcon(role: string) {
  switch (role.toLowerCase()) {
    case 'manager': return 'fa6-solid:user-tie'
    case 'coach': return 'fa6-solid:user-graduate'
    case 'captain': return 'fa6-solid:crown'
    default: return 'fa6-solid:user'
  }
}

const displayedTeams = computed(() => {
  const list = Array.isArray(teams.value) ? teams.value : []
  const group = props.group?.toUpperCase?.()
  return [...list]
    .filter(t => t.team?.group?.toUpperCase?.() === group && t.team?.team_name !== 'BYE')
    .sort((a, b) =>
      Number(a.seed ?? a.stats?.seed ?? 9999) -
      Number(b.seed ?? b.stats?.seed ?? 9999)
    )
})

const is1v1Division = computed(() => {
  const list = Array.isArray(teams.value) ? teams.value : []
  return list.length && list[0]?.team?.gamemode === '1v1'
})

function getSoloPlayer(team: any) {
  return team.roster?.find(
    (p: any) => p.role === 'captain' && p.user_name && p.user_name !== 'None'
  )
}
</script>
