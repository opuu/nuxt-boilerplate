<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const title = computed(() => (error.status === 404 ? 'Page not found' : 'Something went wrong'))

useSeoMeta({ title })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="error-page">
    <p class="error-page__status">
      {{ error.status }}
    </p>
    <h1 class="error-page__title">
      {{ title }}
    </h1>
    <p v-if="error.message" class="error-page__message">
      {{ error.message }}
    </p>
    <button type="button" class="o-button o-button--primary" @click="goHome">Back to home</button>
  </main>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  gap: o-space(4);
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: o-space(8) o-space(4);
  text-align: center;

  @include e(status) {
    font-family: o-font(mono);
    font-size: o-font-size(sm);
    color: o-color(primary, 0.8);
  }

  @include e(message) {
    max-width: 32rem;
    color: o-color(text-muted);
  }
}
</style>
