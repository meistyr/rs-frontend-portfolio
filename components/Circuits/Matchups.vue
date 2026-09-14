<template>
  <div class="my-7">

    <!-- Controls Row -->
    <div class="flex items-stretch gap-3 mb-4" v-if="stageItems.length">
      <!-- Week Selector -->
      <div
        v-if="activeStageKey === 'regular'"
        class="relative h-10 flex items-stretch"
      >
        <UButton
          color="white"
          size="sm"
          class="h-full px-4"
          :label="activeLabel"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          @click="toggleDropdown"
        />

        <div
          v-if="isDropdownOpen"
          class="absolute left-0 top-full mt-1 w-full rounded-md shadow-lg z-20"
        >
          <ul class="py-1 bg-slate-200 dark:bg-neutral-900 rounded-md">
            <li
              v-for="week in weekItems"
              :key="week.value"
              @click="handleWeekSelect(week.value)"
              class="block px-4 py-2 text-sm cursor-pointer aftetir hover:text-royalty-gold"
              :class="{
                'text-royalty-gold': activeWeek === week.value,
                'text-gray-300': activeWeek !== week.value
              }"
            >
              {{ week.label }}
            </li>
          </ul>
        </div>
      </div>

      <NuxtLink
        to="#"
        target="_blank"
        class="
          inline-flex items-center justify-center
          px-5 py-2
          rounded-full
          text-sm font-semibold
          border border-gray-900
          bg-gray-900
          text-gray-200
          transition
          hover:border-[#e7be60]
          hover:bg-[#e7be60]/70
          hover:text-gray-900
        "
      >
        Postseason Hub
      </NuxtLink>
    </div>

    <!-- REGULAR SEASON -->
    <template v-if="activeStageKey === 'regular'">
      <div
        v-if="
          !groupedMatchups.matchups[activeWeek]?.length &&
          !groupedMatchups.byes[activeWeek]?.length
        "
        class="rounded my-5 p-3 text-center"
      >
        <UCard>
          <p class="my-3 aftetir">
            <strong>No matchups have been found for this circuit.</strong>
          </p>
        </UCard>
      </div>

      <div v-else>
        <div
          v-if="groupedMatchups.matchups[activeWeek]"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4"
        >
          <div
            v-for="matchup in groupedMatchups.matchups[activeWeek]"
            :key="matchup.match_id"
          >
            <UCard>
              <div class="grid grid-rows-2 pt-3">
                <div class="flex items-center mb-2">
                  <img
                    :src="getTeamLogo(matchup.team_1_thumb)"
                    class="h-8 w-10 object-contain"
                  />
                  <div class="flex-grow pl-2 truncate">
                    {{ matchup.team_1_name }}
                  </div>
                  <div>{{ matchup.team_score1 || 0 }}</div>
                </div>

                <div class="flex items-center mb-2">
                  <img
                    :src="getTeamLogo(matchup.team_2_thumb)"
                    class="h-8 w-10 object-contain"
                  />
                  <div class="flex-grow pl-2 truncate">
                    {{ matchup.team_2_name }}
                  </div>
                  <div>{{ matchup.team_score2 || 0 }}</div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <div
          v-if="groupedMatchups.byes[activeWeek]"
          class="mt-8 flex justify-center"
        >
          <UCard>
            <div
              v-for="bye in groupedMatchups.byes[activeWeek]"
              :key="bye.match_id"
              class="p-3 text-center"
            >
              <strong>BYE | </strong> {{ bye.team_1_name  === 'BYE' ? bye.team_2_name : bye.team_1_name }}
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const divisionId = computed(() => route.params.id as string)

// Stage Tabs
const stageItemsBase = [
  { label: 'Regular Season', key: 'regular' },
  { label: 'Qualifiers', key: 'qualifier' },
  { label: 'Playoffs', key: 'playoff' }
]

const activeStageTab = ref(0)
const activeStageKey = computed(
  () => stageItems.value[activeStageTab.value]?.key
)

// Fetch Matchups
const { data: allMatchups, refresh } = await useAsyncData(
  () => `matchups-${divisionId.value}`,
  async () => {
    const res = await $fetch(`/api/circuits/matchups/${divisionId.value}`)
    return Array.isArray(res?.matches) ? res.matches : res
  }
)

watch(divisionId, refresh)

// Gamemode → available tabs
const gamemode = computed(
  () => allMatchups.value?.[0]?.gamemode ?? '3v3'
)

const stageItems = computed(() => {
  if (gamemode.value === '1v1') {
    return stageItemsBase.filter(i => i.key !== 'qualifier')
  }
  return stageItemsBase
})

// Regular Season Week Logic (legacy, untouched)
const activeWeek = ref<number>(1)
const isDropdownOpen = ref(false)

const groupedMatchups = computed(() => {
  const result = { matchups: {}, byes: {} } as any
  if (!Array.isArray(allMatchups.value)) return result

  for (const match of allMatchups.value) {
    const week = Number(match.week)

    const isBye =
      !match.team_id2 ||
      match.team_1_name === 'BYE' ||
      match.team_2_name === 'BYE'

    const target = isBye ? result.byes : result.matchups
    if (!target[week]) target[week] = []
    target[week].push(match)
  }

  return result
})

const weekItems = computed(() =>
  Object.keys(groupedMatchups.value.matchups)
    .map(Number)
    .sort((a, b) => a - b)
    .map(w => ({ value: w, label: `Week ${w}` }))
)

const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value)
const handleWeekSelect = (week: number) => {
  activeWeek.value = week
  isDropdownOpen.value = false
}

// Labels & Utils
const activeLabel = computed(
  () =>
    weekItems.value.find(w => w.value === activeWeek.value)?.label ??
    'Select Week'
)

function getTeamLogo(logo?: string) {
  return (
    logo ??
    '/img/frozen/royalty-series-assets/guild_1355656017366749444.png'
  )
}
</script>