<script setup lang="ts">
export type AppCardVariant = 'default' | 'primary' | 'outline'

const {
  title,
  eyebrow,
  variant = 'default',
  themeBadge = false,
} = defineProps<{
  title: string
  eyebrow?: string
  variant?: AppCardVariant
  /** Shows the active colour mode. */
  themeBadge?: boolean
}>()

const slots = defineSlots<{
  default?: () => unknown
  footer?: () => unknown
}>()

const theme = useThemeStore()
</script>

<template>
  <article class="app-card" :class="`app-card--${variant}`">
    <header class="app-card__header">
      <div>
        <p v-if="eyebrow" class="app-card__eyebrow">
          {{ eyebrow }}
        </p>
        <h2 class="app-card__title">
          {{ title }}
        </h2>
      </div>

      <span v-if="themeBadge" class="app-card__badge">
        <span class="app-card__badge-dot" aria-hidden="true" />
        {{ theme.mode }}
      </span>
    </header>

    <div class="app-card__body">
      <slot />
    </div>

    <footer v-if="slots.footer" class="app-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.app-card {
  display: flex;
  flex-direction: column;
  gap: o-space(4);
  padding: o-space(6);
  color: o-color(text);
  background-color: o-color(surface);
  border: 1px solid o-color(border);
  border-radius: o-radius(lg);
  box-shadow: o-shadow(sm);

  @include e(header) {
    display: flex;
    gap: o-space(3);
    align-items: flex-start;
    justify-content: space-between;
  }

  @include e(eyebrow) {
    margin-bottom: o-space(1);
    font-size: o-font-size(xs);
    font-weight: o-font-weight(semibold);
    color: o-color(primary, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.08em;

    @include when(app-card, primary) {
      color: o-color(on-primary, 0.75);
    }
  }

  @include e(title) {
    font-size: o-font-size(lg);
  }

  @include e(body) {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: o-space(4);
    color: o-color(text-muted);

    @include when(app-card, primary) {
      color: o-color(on-primary, 0.85);
    }
  }

  @include e(footer) {
    display: flex;
    flex-wrap: wrap;
    gap: o-space(2);
    padding-top: o-space(4);
    border-top: 1px solid o-color(border);

    @include when(app-card, primary) {
      border-top-color: o-color(on-primary, 0.2);
    }
  }

  @include e(badge) {
    display: inline-flex;
    flex-shrink: 0;
    gap: o-space(2);
    align-items: center;
    padding: o-space(1) o-space(3);
    font-size: o-font-size(xs);
    font-weight: o-font-weight(medium);
    color: o-color(primary);
    text-transform: capitalize;
    background-color: o-color(primary, 0.1);
    border: 1px solid o-color(primary, 0.25);
    border-radius: o-radius(pill);

    @include when(app-card, primary) {
      color: o-color(on-primary);
      background-color: o-color(on-primary, 0.12);
      border-color: o-color(on-primary, 0.3);
    }
  }

  @include e(badge-dot) {
    width: 0.5rem;
    height: 0.5rem;
    background-color: currentcolor;
    border-radius: 50%;
  }

  @include m(primary) {
    color: o-color(on-primary);
    background: linear-gradient(145deg, o-color(primary), o-mix(primary, on-primary, 18%));
    border-color: transparent;
    box-shadow: 0 12px 32px o-color(primary, 0.3);
  }

  @include m(outline) {
    background-color: transparent;
    border-style: dashed;
    box-shadow: none;
  }
}
</style>
