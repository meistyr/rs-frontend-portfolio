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
        backdrop-blur
      "
    >
      <div class="container mx-auto px-6 py-4 flex flex-col gap-1">
        <p class="text-[11px] uppercase tracking-widest text-gray-400">
          Royalty Series — Season VII
        </p>

        <h1 class="text-3xl md:text-4xl font-bold bourgeois">
          ONGOING CIRCUITS
        </h1>

        <p class="text-sm text-gray-400">
          Explore active circuits by region and game mode.
        </p>
      </div>
    </div>

    <!-- Status Legend -->
    <div class="bg-neutral-900 border-b border-neutral-700/40">
      <div
        class="container mx-auto px-6 py-3
               flex flex-wrap gap-x-6 gap-y-2
               text-sm text-gray-300"
      >
        <div class="flex items-center gap-2">
          <span class="relative flex h-3 w-3">
            <span class="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
            <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          <span>Live</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="relative flex h-3 w-3">
            <span class="absolute inline-flex h-full w-full rounded-full bg-[#e7be60] opacity-60 animate-ping" />
            <span class="relative inline-flex h-3 w-3 rounded-full bg-[#e7be60]" />
          </span>
          <span>Registration Open</span>
        </div>
      </div>
    </div>

    <!-- Circuits Content -->
    <div class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 gap-8 pb-7">

        <UCard
          v-for="region in regions"
          :key="region.key"
          class="w-full bg-neutral-900/90 border border-white/5"
        >
          <!-- Region Header -->
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl uppercase font-bold bourgeois">
                {{ region.label }}
              </h3>

              <span class="text-xs text-gray-400">
                {{ region.count }} circuits
              </span>
            </div>
          </template>

          <!-- Region Body -->
          <template #default>
            <div class="flex flex-col gap-5">

              <!-- Gamemode Pills -->
              <div class="flex gap-2">
                <button
                  v-for="group in region.groups"
                  :key="group.mode"
                  @click="setMode(region.key, group.mode)"
                  class="
                    px-4 py-1.5 rounded-full
                    text-sm font-semibold
                    border transition
                  "
                  :class="
                    activeMode[region.key] === group.mode
                      ? 'bg-[#e7be60] text-black border-transparent shadow-sm'
                      : 'text-gray-300 border-gray-700 hover:border-[#e7be60]/60 hover:text-[#e7be60]'
                  "
                >
                  {{ group.mode }}
                </button>
              </div>

              <!-- Division List -->
              <Transition name="mode-switch" mode="out-in">
                <div
                  :key="activeMode[region.key]"
                  class="flex flex-col divide-y divide-white/5"
                >
                  <NuxtLink
                    v-for="division in getActiveDivisions(region)"
                    :key="division.division_id"
                    :to="`/circuits/${division.division_id}`"
                    class="
                      group
                      relative
                      flex items-center justify-between
                      px-4 py-4
                      transition
                    "
                  >
                    <!-- Left Accent -->
                    <span
                      class="
                        absolute left-0 top-0 h-full w-[2px]
                        bg-transparent
                        group-hover:bg-[#e7be60]
                        transition
                      "
                    />

                    <!-- Hover Gradient -->
                    <span
                      class="
                        pointer-events-none
                        absolute inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition
                        bg-gradient-to-r
                        from-white/10
                        via-white/5
                        to-transparent
                      "
                    />

                    <!-- Content -->
                    <div class="relative flex items-center gap-4">
                      <!-- Status Dot -->
                      <span v-if="division.status === 3" class="relative flex h-3 w-3">
                        <span class="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                      </span>

                      <span v-else-if="division.status === 2" class="relative flex h-3 w-3">
                        <span class="absolute inline-flex h-full w-full rounded-full bg-[#e7be60] opacity-60 animate-ping" />
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-[#e7be60]" />
                      </span>

                      <span v-else class="inline-flex h-3 w-3 rounded-full bg-gray-500" />

                      <!-- Division Name -->
                      <span class="font-medium text-gray-100">
                        {{ division.division_name }}
                      </span>
                    </div>

                    <!-- Chevron -->
                    <Icon
                      name="mdi:chevron-right"
                      class="
                        relative
                        text-gray-400
                        opacity-0
                        group-hover:opacity-100
                        group-hover:translate-x-1
                        transition
                      "
                    />
                  </NuxtLink>
                </div>
              </Transition>

            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { UCard } from '#components'

const { data: circuits } = await useFetch('/api/circuits', {
  key: 'circuits-page'
})

type Gamemode = '3v3' | '2v2' | '1v1'

function tierRank(name: string) {
  if (/pinnacle/i.test(name)) return 6
  if (/exalted/i.test(name)) return 5
  if (/premier/i.test(name)) return 4
  if (/prodigy/i.test(name)) return 3
  if (/ascendant/i.test(name)) return 2
  if (/contender/i.test(name)) return 1
  if (/initiate/i.test(name)) return 0
  return 6
}

function buildGroups(region: 'NA' | 'EU') {
  if (!circuits.value?.divisions) return []

  const byMode: Record<Gamemode, any[]> = {
    '3v3': [],
    '2v2': [],
    '1v1': []
  }

  circuits.value.divisions
    .filter(d => d.region === region)
    .sort((a, b) => tierRank(a.division_name) - tierRank(b.division_name))
    .forEach(d => {
      byMode[d.gamemode]?.push(d)
    })

  return Object.entries(byMode)
    .filter(([, list]) => list.length)
    .map(([mode, circuits]) => ({ mode, circuits }))
}

const activeMode = reactive<Record<'NA' | 'EU', Gamemode>>({
  NA: '3v3',
  EU: '3v3'
})

function setMode(region: 'NA' | 'EU', mode: Gamemode) {
  activeMode[region] = mode
}

function getActiveDivisions(region: any) {
  const group = region.groups.find(
    g => g.mode === activeMode[region.key]
  )
  return group?.circuits ?? []
}

const regions = computed(() => [
  {
    key: 'NA',
    label: 'North America',
    groups: buildGroups('NA'),
    count: buildGroups('NA').reduce((n, g) => n + g.circuits.length, 0)
  },
  {
    key: 'EU',
    label: 'Europe',
    groups: buildGroups('EU'),
    count: buildGroups('EU').reduce((n, g) => n + g.circuits.length, 0)
  }
])
</script>

<style>
.mode-switch-enter-active,
.mode-switch-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.mode-switch-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.mode-switch-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>