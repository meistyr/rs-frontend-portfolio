// This is a self-contained portfolio build: the live backend is decommissioned and the
// server/api routes serve a baked-in snapshot (see server/data + server/utils/frozen.ts).
// No external API URL or token is required, so the previous production env guard is removed.

export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },
  imports: {
    autoImport: true,
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  tailwindcss: {
    configPath: '@/tailwind.config.ts',
  },
  colorMode: {
    preference: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  },
  router: {
    options: {
      linkActiveClass: 'active',
    }
  },
  runtimeConfig: {
    session: {
      // No login flow is exposed on the portfolio build, so this only seals an empty
      // session cookie. Override via NUXT_SESSION_PASSWORD in Vercel if you prefer.
      password: process.env.NUXT_SESSION_PASSWORD || 'placeholder-not-a-secret-set-nuxt-session-password'
    },
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      }
    },
  },
  modules: [
    'nuxt-icon',
    "@nuxt/ui", 
    'nuxt-gtag',
    'nuxt-auth-utils',
    '@nuxt/image'
  ],
  // Analytics disabled on the portfolio copy so it never reports to the league's GA property.
  gtag: {
    enabled: false
  }
});
