<script setup lang="ts">
const theme = useThemeStore()

const options: readonly { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]
</script>

<template>
  <fieldset class="theme-mode-switch">
    <legend class="theme-mode-switch__legend">Colour mode</legend>
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="theme-mode-switch__option"
      :class="{ 'theme-mode-switch__option--active': theme.mode === option.value }"
      :aria-pressed="theme.mode === option.value"
      @click="theme.setMode(option.value)"
    >
      {{ option.label }}
    </button>
  </fieldset>
</template>

<style lang="scss" scoped>
.theme-mode-switch {
  display: inline-grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: o-space(1);
  min-inline-size: 0;
  padding: o-space(1);
  margin: 0;
  background-color: o-color(surface-sunken);
  border: 1px solid o-color(border);
  border-radius: o-radius(md);

  @include e(legend) {
    @include visually-hidden;
  }

  @include e(option) {
    min-width: 5rem;
    padding: o-space(2) o-space(4);
    font-size: o-font-size(sm);
    font-weight: o-font-weight(medium);
    color: o-color(text-muted);
    background: none;
    border: 0;
    border-radius: o-radius(sm);

    @include motion-safe {
      transition:
        background-color o-duration(fast) $o-easing,
        color o-duration(fast) $o-easing;
    }

    &:hover {
      color: o-color(text);
    }

    @include m(active) {
      color: o-color(on-primary);
      background-color: o-color(primary);
      box-shadow: 0 2px 8px o-color(primary, 0.35);

      &:hover {
        color: o-color(on-primary);
      }
    }
  }
}
</style>
