<template>
  <div class="mb-7 protect-img">

    <!-- Sticky Title Bar -->
    <div
      class="sticky top-[96px] z-30 bg-neutral-900 border-b border-neutral-700/60"
    >
      <div class="container mx-auto px-6 py-4 flex flex-col gap-1">
        <p class="text-[11px] uppercase tracking-widest text-gray-400">
          Royalty Series
        </p>

        <h1 class="text-3xl md:text-4xl font-bold bourgeois">
          SOCIALS
        </h1>

        <p class="text-sm text-gray-400">
          Official Platforms & Communities
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-6">

      <UCard
        class="bg-neutral-900/90 border border-white/5"
        :ui="{ body: { padding: 'p-0' } }"
      >

        <!-- Card Header -->
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl bourgeois uppercase bold-font">
              Official Channels
            </h2>

            <span class="text-xs text-gray-400">
              6 platforms
            </span>
          </div>
        </template>

        <!-- Social List -->
        <div class="flex flex-col divide-y divide-white/5">

          <!-- Social Row -->
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.url"
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

            <!-- Left Content -->
            <div class="flex items-center gap-4">
                <Icon
                    :name="social.icon"
                    class="
                        text-2xl
                        text-gray-400
                        group-hover:text-white
                        transition
                    "
                />

              <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-100">
                  {{ social.label }}
                </span>
                <span class="text-xs text-gray-400">
                  {{ social.handle }}
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <Icon
              name="mdi:chevron-right"
              class="relative
                    text-gray-400
                    opacity-0
                    group-hover:opacity-100
                    group-hover:translate-x-1
                    transition"
            />
          </a>

        </div>
      </UCard>

    </div>
  </div>
</template>

<script setup lang="ts">
const socials = [
  {
    label: 'Discord',
    handle: 'RoyaltySeries',
    url: '#',
    icon: 'mdi:discord'
  },
  {
    label: 'X (Twitter)',
    handle: 'RoyaltySeriesGG',
    url: '#',
    icon: 'mdi:twitter'
  },
  {
    label: 'Twitch',
    handle: 'RoyaltySeries',
    url: '#',
    icon: 'mdi:twitch'
  },
  {
    label: 'YouTube',
    handle: 'RoyaltySeriesGG',
    url: '#',
    icon: 'mdi:youtube'
  },
  {
    label: 'Instagram',
    handle: 'RoyaltySeries.GG',
    url: '#',
    icon: 'mdi:instagram'
  },
  {
    label: 'TikTok',
    handle: 'RoyaltySeries',
    url: '#',
    icon: 'mdi:music-note'
  }
]
</script>