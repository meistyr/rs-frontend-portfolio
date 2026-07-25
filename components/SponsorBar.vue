<template>
  <div class="royalty-marquee-container bg-slate-100 dark:bg-neutral-800"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div ref="track" class="royalty-marquee-track">
      <div
        v-for="(partner, index) in visiblePartners"
        :key="index"
        class="royalty-marquee-item"
      >
        <img
          :src="partner.logo_link"
          :alt="partner.sponsor_name"
          class="royalty-marquee-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const partners = ref<any[]>([])
const visiblePartners = ref<any[]>([])
const track = ref<HTMLElement | null>(null)
const isPaused = ref(false)
let animFrame: number
let offset = 0

const { data, error } = await useAsyncData('sponsors-marquee', () => $fetch('/api/marquee'))
if (!error.value && Array.isArray(data.value)) {
  partners.value = data.value.filter((s) => s.logo_link && s.status === 2)
} else {
  console.error('❌ Failed to load sponsors:', error.value)
}

onMounted(async () => {
  await nextTick()

  if (typeof window === 'undefined' || !partners.value.length) return

  const screenWidth = window.innerWidth
  const repeated: any[] = []

  while (repeated.length * 140 < screenWidth * 2) {
    repeated.push(...partners.value)
  }
  visiblePartners.value = repeated

  await nextTick()
  const el = track.value
  if (!el) return

  const speed = 0.2
  const loop = () => {
    if(!isPaused.value) {
      offset -= speed
      if (Math.abs(offset) >= el.scrollWidth / 2) offset = 0
      el.style.transform = `translateX(${offset}px)`
    }
    animFrame = requestAnimationFrame(loop)
  }

  loop()
})

onBeforeUnmount(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
.royalty-marquee-container {
  overflow: hidden;
  width: 100%;
  padding: 1rem 0;
  position: relative;
}

.royalty-marquee-track {
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  will-change: transform;
  transition: none;
}

.royalty-marquee-item {
  flex-shrink: 0;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.royalty-marquee-image {
  height: 90px;
  max-width: 90px;
  width: auto;
  object-fit: contain;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.royalty-marquee-image:hover {
  opacity: 1;
}
</style>
