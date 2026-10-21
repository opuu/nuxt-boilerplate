export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s %separator %siteName',
      templateParams: { separator: '·', siteName: 'Nuxt Boilerplate' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  css: ['~/assets/scss/main.scss'],

  compatibilityDate: '2026-10-01',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Makes tokens, functions and mixins available in every <style lang="scss">.
          // Safe because nothing under abstract/ outputs CSS.
          additionalData: '@use "~/assets/scss/abstract" as *;\n',
        },
      },
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        noFallthroughCasesInSwitch: true,
        noImplicitOverride: true,
        noImplicitReturns: true,
      },
    },
  },
})
