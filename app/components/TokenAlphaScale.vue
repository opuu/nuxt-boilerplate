<script setup lang="ts">
const { token = 'primary', steps = 10 } = defineProps<{
  token?: ColorToken
  steps?: number
}>()

const stops = computed(() =>
  Array.from({ length: steps }, (_, index) => Math.round(((index + 1) / steps) * 100)),
)
</script>

<template>
  <ol
    class="token-alpha-scale"
    :style="{ '--token-alpha-scale-color': `var(--o-${token})` }"
    :aria-label="`${token} at increasing opacity`"
  >
    <li v-for="stop in stops" :key="stop" class="token-alpha-scale__step">
      <span
        class="token-alpha-scale__swatch"
        :style="{ '--token-alpha-scale-alpha': `${stop}%` }"
      />
      <span class="token-alpha-scale__label">{{ stop }}</span>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
.token-alpha-scale {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  gap: o-space(1);
  padding: 0;
  list-style: none;

  @include bp-up(sm) {
    gap: o-space(2);
  }

  @include e(step) {
    display: flex;
    flex-direction: column;
    gap: o-space(1);
    align-items: center;
  }

  @include e(swatch) {
    inline-size: 100%;
    aspect-ratio: 1;

    // The alpha is only known at runtime, so o-color() can't be used here.
    // The checkerboard underneath makes the transparency visible.
    background:
      linear-gradient(
        color-mix(in srgb, var(--token-alpha-scale-color) var(--token-alpha-scale-alpha), transparent) 0 0
      ),
      repeating-conic-gradient(o-color(text, 0.08) 0 25%, transparent 0 50%) 0 0 / 10px 10px;
    border: 1px solid o-color(border, 0.6);
    border-radius: o-radius(sm);
  }

  @include e(label) {
    font-family: o-font(mono);
    font-size: o-font-size(xs);
    color: o-color(text-muted);
  }
}
</style>
