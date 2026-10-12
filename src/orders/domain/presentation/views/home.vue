<script setup>
import { useI18n } from "vue-i18n";
import { onMounted, computed } from "vue";
import useOrdersStore from "../../../orders/application/orders.store.js";
import CafeLocationSummary from "../components/cafe-location-summary.vue";

const { t } = useI18n();
const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.fetchLocations();
  ordersStore.fetchOrders();
});

const locations = computed(() => ordersStore.locations);
const orders = computed(() => ordersStore.orders);
</script>

<template>
  <section class="pt-6 p-4 md:p-5">
    <div class="flex flex-column gap-4">
      <div>
        <h1 class="text-3xl font-bold text-color m-0 mb-2">{{ t('home.title') }}</h1>
        <p class="m-0 line-height-3 text-color-secondary">{{ t('home.content') }}</p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-color mb-3">{{ t('home.my-orders') }}</h2>
        <div class="grid">
          <div v-for="loc in locations" :key="loc.id" class="col-12 md:col-6">
            <cafe-location-summary :location="loc" :orders="orders" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>