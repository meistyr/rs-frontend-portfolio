<template class="protect-img">
  <div class="protect-img">
    <SponsorBar v-if="!isHomePage" />

    <footer class="bg-neutral-900 text-gray-400 royalty-border">
      <div class="container mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">

        <!-- Brand -->
        <img
          src="@/assets/img/RS.png"
          alt="Royalty Series"
          class="h-12"
        />

        <!-- Socials -->
        <div class="flex gap-6 text-2xl text-gray-300">
          <a
            href="#"
            class="transition"
          >
            <Icon name="fa6-brands:discord" />
          </a>

          <a
            href="#"
            class="transition"
          >
            <Icon name="fa-brands:twitch" />
          </a>

          <a
            href="#"
            class="transition"
          >
            <Icon name="fa6-brands:x-twitter" />
          </a>

          <a
            href="#"
            class="transition"
          >
            <Icon name="fa-brands:youtube" />
          </a>

          <a
            href="#"
            class="transition"
          >
            <Icon name="fa-brands:tiktok" />
          </a>
        </div>

        <!-- Contact -->
        <a
          href="mailto:contact@royaltyseries.gg"
          class="text-sm transition"
        >
          contact@royaltyseries.gg
        </a>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-neutral-800 py-4 text-center text-xs text-gray-500">
        <p>Powered by LeagueCore</p>
        <p>
          © 2024–{{ new Date().getFullYear() }} Royalty Series. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
