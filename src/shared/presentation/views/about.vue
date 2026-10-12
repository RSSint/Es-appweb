<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="pt-6 p-4 md:p-5 max-w-4xl mx-auto">
    <pv-card>
      <template #title>{{ t('option.about') }}</template>
      <template #content>
        <p class="m-0 line-height-3 text-color-secondary">
          Blue Bottle helps coffee lovers discover specialty coffee options and organize cafe orders in one place.
        </p>
      </template>
    </pv-card>
  </section>
</template>

<style scoped>
</style>