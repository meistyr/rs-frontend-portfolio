<template>
  <UCard class="my-7">
    <div class="flex flex-col gap-2 px-3 py-3.5">
      <div class="max-w-sm">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Filter teams..."
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
        <strong>Diff</strong> = Game Differential,&nbsp;
      </p>
    </div>

    <div class="relative">

      <div class="overflow-x-auto pb-2">
        <div class="max-h-[600px] overflow-y-auto">
          <UTable
            v-model:sort="sort"
            :columns="columns"
            :rows="filteredAndSortedTeams"
            sort-mode="manual"
            class="min-w-max"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ group: string }>()
const route = useRoute()
const divisionId = route.params.id as string

const { data: teams } = await useAsyncData(
  `stats-${divisionId}`,
  () => $fetch(`/api/circuits/standings/${divisionId}`),
  { default: () => [] }
)

const searchQuery = ref('')
const sort = ref<{ column: string; direction: 'asc' | 'desc' }>({
  column: 'seed',
  direction: 'asc'
})

const columns = [
  { key: 'seed', label: 'Seed', sortable: true },
  { key: 'team_name', label: 'Team', sortable: true },
  { key: 'match_record', label: 'Series (W-L)', sortable: true },
  { key: 'game_record', label: 'Games (W-L)', sortable: true },
  { key: 'game_diff', label: 'Diff', sortable: true }
]

const numericCols = new Set([
  'seed',
  'score'
])

const num = (v: any) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const formatPct = (val: unknown) => {
  const n = Number(val)
  return Number.isFinite(n) ? `${(n * 100).toFixed(2)}%` : '—'
}

const filteredAndSortedTeams = computed(() => {
  const list = Array.isArray(teams.value) ? teams.value : []
  const q = searchQuery.value.trim().toLowerCase()

  const normalized = list.map((r: any) => ({
    ...r,
    score: r.score ?? '—'
  }))

  let rows = normalized.filter((r: any) => r.team_name !== 'BYE')

  if (q) {
    rows = rows.filter(
      (r: any) =>
        String(r.team_name ?? '').toLowerCase().includes(q) ||
        String(r.seed ?? '').toLowerCase().includes(q)
    )
  }

  const { column, direction } = sort.value
  const dir = direction === 'desc' ? -1 : 1

  return [...rows].sort((a: any, b: any) => {
    const av = a?.[column]
    const bv = b?.[column]
    if (numericCols.has(column)) return (num(av) - num(bv)) * dir
    return String(av ?? '').localeCompare(String(bv ?? '')) * dir
  })
})
</script>