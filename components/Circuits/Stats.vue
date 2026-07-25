<template>
  <UCard class="my-7">
    <div class="flex flex-col gap-2 px-3 py-3.5">
        <div class="max-w-sm">
            <UInput
                v-model="searchQuery"
                icon="i-heroicons-magnifying-glass-20-solid"
                placeholder="Filter players and teams..."
                inputClass="text-black"
                :ui="{ icon: { trailing: { pointer: '' } } }"
            >
                <template #trailing>
                <UButton
                    v-show="searchQuery !== ''"
                    color="gray"
                    variant="link"
                    icon="i-heroicons-x-mark-20-solid"
                    :padded="false"
                    @click="searchQuery = ''"
                />
                </template>
            </UInput>
        </div>

      <p class="text-sm text-gray-400">
        <strong>GPaR</strong> = Goal Participation
      </p>
    </div>

    <UTable
      v-model:sort="sort"
      :columns="filterColumns"
      :rows="paginatedPlayers"
      sort-mode="manual"
    >
      <template #shot_perc-data="{ row }">
        {{ formatPct(row.shot_perc) }}
      </template>

      <template #gpar_perc-data="{ row }">
        {{ formatPct(row.gpar_perc) }}
      </template>
    </UTable>

    <div class="flex justify-end px-3 py-3.5">
    <UPagination
        v-model="page"
        :total="filteredAndSortedPlayers.length"
        :page-size="itemsPerPage"
    />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
const route = useRoute()
const id = route.params.id as string

interface Player {
  user_id: number
  user_name: string
  team_name: string
  guild_id: number
  team_id: string
  division_id?: string
  rating: number
  games: number
  mvp: number
  score: number
  goals: number
  assists: number
  shots: number
  saves: number
  shot_perc: number
  gpar_perc: number
  demos_inflicted: number
  demos_taken: number
}

const playerStats = ref<Player[]>([])
const searchQuery = ref('')
const sort = ref({ column: 'rating', direction: 'desc' })
const page = ref(1)
const itemsPerPage = 10

// Fetch merged stats
const { data: statsData } = await useFetch<Player[]>(`/api/circuits/stats/${id}`, {
  query: { orderBy: sort.value.column, order: sort.value.direction },
  key: `stats-${id}-${sort.value.column}-${sort.value.direction}`,
  server: false,
  lazy: false,
  cache: 'no-store' as const
})

watch(statsData, (newData) => {
  if (Array.isArray(newData)) {
    playerStats.value = newData
  } else {
    playerStats.value = []
  }
}, { immediate: true })

// Reset pagination when data changes
watch(playerStats, () => {
  page.value = 1
}, { deep: true })

// Table columns
const filterColumns = [
  { key: 'user_name', label: 'Player', sortable: true },
  { key: 'team_name', label: 'Team', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'games', label: 'Games', sortable: true },
  { key: 'mvp', label: 'MVP', sortable: true },
  { key: 'score', label: 'Score', sortable: true },
  { key: 'goals', label: 'Goals', sortable: true },
  { key: 'assists', label: 'Assists', sortable: true },
  { key: 'shots', label: 'Shots', sortable: true },
  { key: 'saves', label: 'Saves', sortable: true },
  { key: 'shot_perc', label: 'Shot %', sortable: true },
  { key: 'gpar_perc', label: 'GPaR %', sortable: true },
  { key: 'demos_inflicted', label: 'Demos Inflicted', sortable: true },
  { key: 'demos_taken', label: 'Demos Taken', sortable: true }
]

// Filtering
const filteredPlayers = computed(() =>
  playerStats.value.filter(
    (p) =>
      p.user_name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.team_name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// Sorting
const filteredAndSortedPlayers = computed(() => {
  return [...filteredPlayers.value].sort((a, b) => {
    const key = sort.value.column as keyof Player
    const aVal = a[key] ?? ''
    const bVal = b[key] ?? ''

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sort.value.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    return sort.value.direction === 'asc'
      ? Number(aVal) - Number(bVal)
      : Number(bVal) - Number(aVal)
  })
})

// Pagination
const paginatedPlayers = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAndSortedPlayers.value.slice(start, end)
})

const formatPct = (val: unknown) => {
  const n = Number(val)
  return Number.isFinite(n) ? `${(n * 100).toFixed(2)}%` : '—'
}
</script>