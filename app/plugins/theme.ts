// A plugin rather than app.vue so that error.vue is themed too.
export default defineNuxtPlugin({
  name: 'theme',
  setup() {
    const theme = useThemeStore()

    useHead({
      htmlAttrs: {
        'data-theme': () => theme.mode,
        style: () => theme.tokenOverrides,
      },
    })
  },
})
