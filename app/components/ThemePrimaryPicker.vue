<script setup lang="ts">
const theme = useThemeStore()

const inputId = useId()

function onInput(event: Event) {
  theme.setPrimaryColor((event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="theme-primary-picker">
    <div class="theme-primary-picker__row">
      <label class="theme-primary-picker__field" :for="inputId">
        <input
          :id="inputId"
          class="theme-primary-picker__input"
          type="color"
          :value="theme.resolvedPrimaryColor"
          @input="onInput"
        >
        <span class="theme-primary-picker__label">
          <span class="theme-primary-picker__name">Primary</span>
          <code class="theme-primary-picker__value">{{ theme.resolvedPrimaryColor }}</code>
        </span>
      </label>

      <button
        type="button"
        class="o-button o-button--sm"
        :disabled="!theme.hasCustomPrimary"
        @click="theme.resetPrimaryColor()"
      >
        Reset
      </button>
    </div>

    <ul class="theme-primary-picker__presets" aria-label="Primary colour presets">
      <li v-for="preset in PRIMARY_PRESETS" :key="preset.value">
        <button
          type="button"
          class="theme-primary-picker__swatch"
          :class="{ 'theme-primary-picker__swatch--active': theme.primaryColor === preset.value }"
          :style="{ '--theme-primary-picker-swatch': preset.value }"
          :aria-label="preset.name"
          :aria-pressed="theme.primaryColor === preset.value"
          :title="preset.name"
          @click="theme.setPrimaryColor(preset.value)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.theme-primary-picker {
  display: flex;
  flex-direction: column;
  gap: o-space(4);

  @include e(row) {
    display: flex;
    gap: o-space(3);
    align-items: center;
    justify-content: space-between;
  }

  @include e(field) {
    display: inline-flex;
    gap: o-space(3);
    align-items: center;
    cursor: pointer;
  }

  @include e(input) {
    inline-size: 2.75rem;
    block-size: 2.75rem;
    padding: 0;
    cursor: pointer;
    background: none;
    border: 1px solid o-color(border);
    border-radius: o-radius(md);

    &::-webkit-color-swatch-wrapper {
      padding: 3px;
    }

    // Separate rules on purpose: one unknown vendor pseudo-element drops the whole selector list.
    &::-webkit-color-swatch {
      border: 0;
      border-radius: calc(#{o-radius(md)} - 3px);
    }

    &::-moz-color-swatch {
      border: 0;
      border-radius: calc(#{o-radius(md)} - 3px);
    }
  }

  @include e(label) {
    display: flex;
    flex-direction: column;
    line-height: o-line-height(snug);
  }

  @include e(name) {
    font-size: o-font-size(sm);
    font-weight: o-font-weight(medium);
    color: o-color(text);
  }

  @include e(value) {
    font-size: o-font-size(xs);
    color: o-color(text-muted);
  }

  @include e(presets) {
    display: flex;
    flex-wrap: wrap;
    gap: o-space(2);
    padding: 0;
    list-style: none;
  }

  @include e(swatch) {
    display: block;
    inline-size: 2rem;
    block-size: 2rem;
    background-color: var(--theme-primary-picker-swatch);
    border: 2px solid o-color(surface);
    border-radius: 50%;
    box-shadow: 0 0 0 1px o-color(border);

    @include motion-safe {
      transition: transform o-duration(fast) $o-easing;
    }

    &:hover {
      transform: scale(1.08);
    }

    @include m(active) {
      box-shadow: 0 0 0 2px o-color(text);
    }
  }
}
</style>
