<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  location: { type: Object, required: true },
  orders: { type: Array, default: () => [] }
});

const { t } = useI18n();

const locationOrders = computed(() => props.orders.filter(o => o.locationId === props.location.id));
const totalOrdered = computed(() => locationOrders.value.reduce((sum, o) => sum + o.quantity, 0));
const availableCapacity = computed(() => props.location.maxCapacity - totalOrdered.value);
</script>

<template>
  <pv-card class="shadow-1 border-round-md h-full">
    <template #title>{{ location.name }}</template>
    <template #content>
      <div v-if="locationOrders.length === 0" class="text-color-secondary italic">
        {{ t('orders.no-orders') }}
      </div>
      <ul v-else class="list-none p-0 m-0 flex flex-column gap-2">
        <li v-for="order in locationOrders" :key="order.id" class="flex justify-content-between">
          <span class="font-medium">{{ order.coffeeName }}</span>
          <span class="text-color-secondary">Qty: {{ order.quantity }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex justify-content-between text-sm pt-2 border-top-1 surface-border">
        <span><strong>{{ t('orders.total-ordered') }}:</strong> {{ totalOrdered }}</span>
        <span><strong>{{ t('orders.available-capacity') }}:</strong> {{ availableCapacity }}</span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
</style>