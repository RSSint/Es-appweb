<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const unavailableRoute = route.fullPath;
</script>

<template>
  <section class="pt-6 p-4 md:p-5 max-w-3xl mx-auto">
    <pv-card>
      <template #title>{{ t('page-not-found.title') }}</template>
      <template #content>
        <p class="m-0 line-height-3 text-color-secondary">
          {{ t('page-not-found.content', { 'unavailable-route': unavailableRoute }) }}
        </p>
      </template>
      <template #footer>
        <pv-button :label="t('page-not-found.go-home')" icon="pi pi-home" @click="router.push({ name: 'home' })" />
      </template>
    </pv-card>
  </section>
</template>

<style scoped>
</style>