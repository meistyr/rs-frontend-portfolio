<template>
  <div class="home-page protect-img text-gray-100">
    <section
      class="home-hero relative overflow-hidden border-b border-white/5 bg-neutral-950"
      :style="heroStyle"
      @mousemove="handleHeroMouseMove"
      @mouseleave="resetHeroMouse"
    >
      <div class="absolute inset-0">
        <div class="home-hero-gradient absolute inset-0" />
        <div class="home-hero-grid absolute inset-0" />
        <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/35" />
      </div>

      <div class="relative container mx-auto px-6 py-16 md:py-24 lg:px-12">
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div class="max-w-2xl">
            <p class="mb-3 text-[11px] uppercase tracking-widest text-gray-400">
              Welcome to the
            </p>

            <img
              class="mb-6 h-12 md:h-16"
              src="@/assets/img/royalty_horizontal.png"
              alt="Royalty Series"
            />

            <h1 class="bourgeois text-4xl uppercase leading-tight md:text-6xl">
              Competition for the crown.
            </h1>

            <div class="my-5 h-px w-20 bg-[#e7be60]/70" />

            <p class="mb-3 text-lg leading-relaxed text-gray-100 aftetir">
              A competitive space built to uplift players and community.
            </p>

            <p class="text-sm leading-relaxed text-gray-300 aftetir md:text-base">
              Royalty Series is a competitive Rocket League league built for players who care about growth, sportsmanship, and community. We offer structured competition across multiple skill tiers while fostering an environment where players, staff, and supporters feel valued and supported. Whether you're chasing improvement, meaningful competition, or a place to belong, Royalty Series is where competition and community thrive together.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <NuxtLink
                to="/circuits"
                class="inline-flex items-center justify-center rounded-full bg-[#e7be60] px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#f7d47d] hover:text-neutral-950"
              >
                View Circuits
              </NuxtLink>

              <NuxtLink
                to="#"
                class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-100 transition hover:border-[#e7be60]/70 hover:text-[#e7be60]"
              >
                Join Discord
              </NuxtLink>

              <span class="text-sm font-semibold tracking-wide text-[#e7be60]">
                #TakeTheCrown
              </span>
            </div>
          </div>

          <div class="home-media-card relative rounded-lg border border-white/10 p-2 shadow-2xl shadow-black/30">
            <div class="absolute -top-3 left-5 rounded-full border border-[#e7be60]/30 bg-neutral-950 px-3 py-1 text-[11px] uppercase tracking-widest text-[#e7be60]">
              Season VII
            </div>

            <div class="home-media-frame relative aspect-video w-full rounded-md">
              <img
                src="@/assets/img/royalty-banner.png"
                alt="Royalty Series"
                class="block h-full w-full object-contain"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <SponsorBar />

    <section class="border-y border-white/5 bg-neutral-900/80">
      <div class="container mx-auto px-6 py-8 lg:px-12">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-[1.2fr_2fr] md:items-center">
          <div>
            <p class="mb-2 text-[11px] uppercase tracking-widest text-gray-400">
              Official Platforms
            </p>
            <h2 class="bourgeois text-4xl uppercase md:text-5xl">
              FOLLOW US
            </h2>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="rounded-lg border border-white/5 bg-neutral-950/50 p-4">
              <h3 class="mb-3 text-sm text-gray-300 aftetir">@RoyaltySeriesGG</h3>
              <div class="flex gap-3">
                <a href="#" class="social-link" aria-label="Royalty Series on X">
                  <Icon name="fa6-brands:x-twitter" />
                </a>
                <a href="#" class="social-link" aria-label="Royalty Series on YouTube">
                  <Icon name="fa-brands:youtube" />
                </a>
              </div>
            </div>

            <div class="rounded-lg border border-white/5 bg-neutral-950/50 p-4">
              <h3 class="mb-3 text-sm text-gray-300 aftetir">@RoyaltySeries</h3>
              <div class="flex gap-3">
                <a href="#" class="social-link" aria-label="Royalty Series on Twitch">
                  <Icon name="fa-brands:twitch" />
                </a>
                <a href="#" class="social-link" aria-label="Royalty Series on TikTok">
                  <Icon name="fa-brands:tiktok" />
                </a>
              </div>
            </div>

            <div class="rounded-lg border border-white/5 bg-neutral-950/50 p-4">
              <h3 class="mb-3 text-sm text-gray-300 aftetir">@RoyaltySeries.GG</h3>
              <div class="flex gap-3">
                <a href="#" class="social-link" aria-label="Royalty Series on Instagram">
                  <Icon name="fa-brands:instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-16">
      <UContainer>
        <UCard class="bg-neutral-900/90 border border-white/5" :ui="{ body: { padding: 'p-0' } }">
          <div class="flex flex-col gap-3 border-b border-white/5 px-6 py-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="mb-2 text-[11px] uppercase tracking-widest text-gray-400">
                Competitive Path
              </p>
              <h2 class="bourgeois text-3xl uppercase md:text-4xl">
                How Royalty Series Works
              </h2>
              <p class="text-sm text-gray-400">
                Competitive Rocket League, made simple.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div class="home-step-card">
              <span class="home-step-number">01</span>
              <h3 class="mb-1 text-lg font-semibold">1. Join the Community</h3>
              <p class="text-sm text-gray-300">
                Connect on Discord for announcements, support, and registration access.
              </p>
            </div>

            <div class="home-step-card">
              <span class="home-step-number">02</span>
              <h3 class="mb-1 text-lg font-semibold">2. Register for a Circuit</h3>
              <p class="text-sm text-gray-300">
                Choose your region, game mode, and skill tier during open registration.
              </p>
            </div>

            <div class="home-step-card border-t border-white/5 md:border-t">
              <span class="home-step-number">03</span>
              <h3 class="mb-1 text-lg font-semibold">3. Compete Weekly</h3>
              <p class="text-sm text-gray-300">
                Play scheduled matches with standings and stats tracked live.
              </p>
            </div>

            <div class="home-step-card border-t border-white/5 md:border-t">
              <span class="home-step-number">04</span>
              <h3 class="mb-1 text-lg font-semibold">4. Advance & Win</h3>
              <p class="text-sm text-gray-300">
                Qualify for playoffs and compete for prizes and seasonal recognition.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 border-t border-white/5 px-6 py-6">
            <NuxtLink
              to="/circuits"
              class="inline-flex items-center justify-center rounded-full border border-gray-700 px-5 py-2 text-sm font-semibold text-gray-200 transition hover:border-[#e7be60]/70 hover:text-[#e7be60]"
            >
              View Circuits
            </NuxtLink>

            <NuxtLink
              to="#"
              class="inline-flex items-center justify-center rounded-full border border-gray-700 px-5 py-2 text-sm font-semibold text-gray-200 transition hover:border-[#e7be60]/70 hover:text-[#e7be60]"
            >
              Join Discord
            </NuxtLink>
          </div>
        </UCard>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const heroX = ref(50)
const heroY = ref(36)

const heroStyle = computed(() => ({
  '--hero-x': `${heroX.value}%`,
  '--hero-y': `${heroY.value}%`
}))

function handleHeroMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  heroX.value = ((event.clientX - rect.left) / rect.width) * 100
  heroY.value = ((event.clientY - rect.top) / rect.height) * 100
}

function resetHeroMouse() {
  heroX.value = 50
  heroY.value = 36
}
</script>

<style scoped>
.home-page {
  background:
    radial-gradient(circle at 15% 10%, rgba(75, 37, 105, 0.35), transparent 32rem),
    radial-gradient(circle at 85% 35%, rgba(231, 190, 96, 0.12), transparent 28rem),
    rgba(10, 10, 10, 0.78);
}

.home-hero {
  --hero-x: 50%;
  --hero-y: 36%;
}

.home-hero-gradient {
  background:
    radial-gradient(circle at var(--hero-x) var(--hero-y), rgba(231, 190, 96, 0.24), transparent 22rem),
    radial-gradient(circle at calc(100% - var(--hero-x)) calc(100% - var(--hero-y)), rgba(75, 37, 105, 0.62), transparent 30rem),
    linear-gradient(135deg, rgba(21, 10, 26, 0.98), rgba(8, 8, 8, 0.96) 58%, rgba(47, 23, 65, 0.74));
  transition: background 160ms ease-out;
}

.home-hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent 80%);
  opacity: 0.36;
}

.home-media-card {
  background:
    linear-gradient(135deg, rgba(75, 37, 105, 0.7), rgba(12, 12, 12, 0.88) 54%, rgba(231, 190, 96, 0.14)),
    rgba(23, 23, 23, 0.88);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.36),
    0 0 42px rgba(75, 37, 105, 0.24);
}

.home-media-frame {
  align-items: center;
  background:
    radial-gradient(circle at 18% 18%, rgba(231, 190, 96, 0.16), transparent 22rem),
    linear-gradient(135deg, rgba(34, 17, 45, 0.96), rgba(10, 10, 10, 0.78));
  display: flex;
  justify-content: center;
}

.social-link {
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  color: #f1f3f4;
  display: inline-flex;
  font-size: 1.35rem;
  height: 2.5rem;
  justify-content: center;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
  width: 2.5rem;
}

.social-link:hover {
  border-color: rgba(231, 190, 96, 0.7);
  color: #e7be60;
  transform: translateY(-1px);
}

.home-step-card {
  min-height: 13rem;
  padding: 1.5rem;
  position: relative;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.home-step-card:hover {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
}

.home-step-number {
  color: rgba(231, 190, 96, 0.42);
  display: block;
  font-family: 'Chakra Petch', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.75rem;
  line-height: 1;
  margin-bottom: 1.25rem;
}

@media screen and (max-width: 768px) {
  .home-step-card {
    min-height: auto;
  }
}
</style>
