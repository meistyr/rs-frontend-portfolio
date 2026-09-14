<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

useHead({
  title: 'Royalty Series',
  meta: [
    { name: 'charset', content: 'UTF-8' },
    { name: 'description', content: 'The Royalty Series is bringing next level gameplay to the Esports Scene!' },
    { name: 'author', content: 'Luke Ericksen' },
    { name: 'keywords', content: 'Esports, Rocket League, Royalty Series, Tournament, League' },
    { name: 'keywords', content: 'width=device-width, initial-scale=1.0' },
    { name: 'lang', content: 'English'},
  ]
})
</script>
