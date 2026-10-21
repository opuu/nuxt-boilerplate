<script setup lang="ts">
const theme = useThemeStore()

useSeoMeta({
  title: 'Theme playground',
  description: 'Runtime theming with CSS custom properties and color-mix().',
})

const primarySource = computed(() =>
  theme.hasCustomPrimary ? 'custom' : `${theme.mode} theme default`,
)
</script>

<template>
  <div class="home">
    <section class="home__hero">
      <p class="home__kicker">Nuxt 4 · Pinia · SCSS tokens · BEM</p>
      <h1 class="home__title">One token, <span class="home__highlight">every shade.</span></h1>
      <p class="home__lead">
        Every colour on this page reads from a <code>--o-*</code> custom property. Transparent and
        hover variants are derived in the browser with <code>color-mix()</code>, so changing one
        token restyles the page without a rebuild.
      </p>
    </section>

    <section class="home__grid" aria-label="Theme controls">
      <AppCard eyebrow="Customise" title="Theme">
        <p>The mode and primary colour are stored in cookies, so the server renders your choice.</p>
        <ThemeModeSwitch />
        <ThemePrimaryPicker />
      </AppCard>

      <AppCard eyebrow="o-color(primary, $alpha)" title="Opacity scale">
        <p><code>color-mix(in srgb, var(--o-primary) N%, transparent)</code> in ten steps.</p>
        <TokenAlphaScale />
        <dl class="home__readout">
          <dt>--o-primary</dt>
          <dd><code>{{ theme.resolvedPrimaryColor }}</code> ({{ primarySource }})</dd>
        </dl>
      </AppCard>
    </section>

    <section class="home__variants" aria-label="Card variants">
      <AppCard eyebrow="Variant" title="Default" theme-badge>
        <p>Surface token with a theme-tinted <code>o-shadow(sm)</code>.</p>
      </AppCard>

      <AppCard eyebrow="Variant" title="Primary" variant="primary" theme-badge>
        <p>
          Text uses <code>--o-on-primary</code>, which is recalculated for contrast when you pick a
          colour.
        </p>
      </AppCard>

      <AppCard eyebrow="Variant" title="Outline" variant="outline" theme-badge>
        <p>Transparent surface with a dashed border.</p>
        <template #footer>
          <button type="button" class="o-button o-button--sm" @click="theme.toggleMode()">
            Toggle mode
          </button>
          <button
            type="button"
            class="o-button o-button--ghost o-button--sm"
            :disabled="!theme.hasCustomPrimary"
            @click="theme.resetPrimaryColor()"
          >
            Reset colour
          </button>
        </template>
      </AppCard>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: o-space(10);

  @include e(hero) {
    display: flex;
    flex-direction: column;
    gap: o-space(4);
    max-width: 44rem;
  }

  @include e(kicker) {
    font-size: o-font-size(sm);
    font-weight: o-font-weight(medium);
    color: o-color(primary, 0.85);
  }

  @include e(highlight) {
    color: o-color(primary);
  }

  @include e(lead) {
    font-size: o-font-size(lg);
    color: o-color(text-muted);
  }

  @include e(grid) {
    display: grid;
    gap: o-space(6);

    @include bp-up(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @include e(variants) {
    display: grid;
    gap: o-space(6);

    @include bp-up(md) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @include e(readout) {
    display: flex;
    flex-wrap: wrap;
    gap: o-space(2);
    align-items: baseline;
    padding: o-space(3) o-space(4);
    font-size: o-font-size(sm);
    background-color: o-color(surface-sunken);
    border-radius: o-radius(md);

    dt {
      font-family: o-font(mono);
      color: o-color(text);
    }

    dd {
      margin: 0;
    }
  }
}
</style>
