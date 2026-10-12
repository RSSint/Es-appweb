<script setup>
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const items = [
  { label: 'option.home', to: '/home' },
  { label: 'option.new-cafe-order', to: '/cafe/orders/new' },
  { label: 'option.about', to: '/about' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

const changeLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <div class="min-h-screen surface-ground">
    <pv-toolbar class="border-noround sticky top-0 z-2">
      <template #start>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-coffee text-2xl text-primary" />
          <span class="font-bold text-lg">Blue Bottle</span>
        </div>
      </template>

      <template #center>
        <nav class="flex gap-2 align-items-center">
          <router-link v-for="item in items" :key="item.to" :to="item.to" custom v-slot="{ navigate, href, isActive }">
            <pv-button
                :label="t(item.label)"
                :severity="isActive ? 'primary' : 'secondary'"
                text
                :href="href"
                @click="navigate"
            />
          </router-link>

          <div class="flex gap-1 ml-3">
            <pv-button
              v-for="language in languages"
              :key="language.code"
              :label="language.label"
              :text="locale !== language.code"
              :severity="locale === language.code ? 'primary' : 'secondary'"
              size="small"
              rounded
              @click="changeLanguage(language.code)"
            />
          </div>
        </nav>
      </template>
    </pv-toolbar>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>