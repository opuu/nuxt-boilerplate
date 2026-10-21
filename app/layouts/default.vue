<script setup lang="ts">
const theme = useThemeStore()

const toggleLabel = computed(() => (theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'))
</script>

<template>
  <div class="app-shell">
    <header class="app-shell__header">
      <NuxtLink to="/" class="app-shell__brand">
        <span class="app-shell__logo" aria-hidden="true" />
        Nuxt Boilerplate
      </NuxtLink>

      <button
        type="button"
        class="o-button o-button--ghost o-button--sm"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        @click="theme.toggleMode()"
      >
        <svg
          v-if="theme.isDark"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
        {{ theme.isDark ? 'Light' : 'Dark' }}
      </button>
    </header>

    <main class="app-shell__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  @include e(header) {
    position: sticky;
    top: 0;
    z-index: o-z(sticky);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: o-space(3) o-space(4);
    background-color: o-color(bg, 0.8);
    border-bottom: 1px solid o-color(border, 0.6);
    backdrop-filter: blur(12px);

    @include bp-up(md) {
      padding-inline: o-space(8);
    }
  }

  @include e(brand) {
    display: inline-flex;
    gap: o-space(2);
    align-items: center;
    font-weight: o-font-weight(semibold);
    color: o-color(text);
    letter-spacing: -0.01em;
    text-decoration: none;
  }

  @include e(logo) {
    width: 1.25rem;
    height: 1.25rem;
    background: linear-gradient(135deg, o-color(primary), o-color(primary, 0.35));
    border-radius: o-radius(sm);
  }

  @include e(main) {
    flex: 1;
    width: 100%;
    max-width: $o-container-max;
    padding: o-space(8) o-space(4) o-space(16);
    margin-inline: auto;

    @include bp-up(md) {
      padding-inline: o-space(8);
    }
  }
}
</style>
