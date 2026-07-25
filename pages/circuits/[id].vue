<template>
  <div class="mb-7">

    <!-- Sticky Title + Page Tabs -->
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
      <div
        class="
          container mx-auto px-6 py-4
          flex flex-col lg:flex-row
          lg:items-center lg:justify-between
          gap-4
        "
      >
        <!-- Title Block -->
        <div class="flex flex-col gap-1">
          <p class="text-[11px] uppercase tracking-widest text-gray-400">
            Royalty Series — Season VII
          </p>

          <h1 class="text-3xl md:text-4xl font-bold bourgeois">
            {{ circuitTitle }}
          </h1>

          <p class="text-sm text-gray-400">
            Circuit Overview
          </p>
        </div>

        <!-- ✅ SINGLE Page Tabs (source of truth) -->
        <UTabs
          :items="items"
          v-model="activeTab"
          class="w-full lg:w-auto"
        />
      </div>
    </div>

    <!-- Page Content -->
    <div class="container mx-auto px-6 py-8">
      <CircuitsTeams
        v-if="activeTabKey === 'teams'"
        :teams="teams"
      />

      <CircuitsMatchups
        v-else-if="activeTabKey === 'matchups'"
      />

      <CircuitsStandings
        v-else-if="activeTabKey === 'standings'"
      />

      <CircuitsStats
        v-else-if="activeTabKey === 'stats'"
      />
    </div>

    <ToTopButton />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToTopButton from '~/components/ToTopButton.vue'

const route = useRoute()
const id = route.params.id

const { data: circuitData } = await useAsyncData(`circuit-${id}`, () =>
  $fetch(`/api/circuits/${id}`)
)

const teams = computed(() =>
  Array.isArray(circuitData.value?.teams) ? circuitData.value.teams : []
)

const division = computed(() => circuitData.value || {})

const circuitTitle = computed(() => {
  const sponsor = division.value?.sponsor?.sponsor_name || 'Royalty Series'
  const name = division.value?.division_name || ''
  return `${sponsor} ${name}`.toUpperCase()
})

const items = [
  { label: 'Teams', icon: 'fa6-solid:user-group', key: 'teams' },
  { label: 'Matchups', icon: 'fa6-solid:users', key: 'matchups' },
  { label: 'Standings', icon: 'fa6-solid:chart-line', key: 'standings' },
  { label: 'Stats', icon: 'fa6-solid:chart-pie', key: 'stats' }
]

// ✅ INDEX-based state (Nuxt UI requirement)
const activeTab = ref(0)

// ✅ Derived semantic key
const activeTabKey = computed(() => items[activeTab.value]?.key)
</script>
