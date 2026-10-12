<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useOrdersStore from '../../../application/orders.store.js';
import { useOfferingsStore } from '../../../../offerings/application/offerings.store.js';

const { t } = useI18n();
const router = useRouter();
const ordersStore = useOrdersStore();
const offeringsStore = useOfferingsStore();

const form = ref({
  locationId: null,
  coffee: null,
  quantity: 1
});

const availableCoffees = ref([]);
const selectedCoffeeImage = ref('');
const capacityError = ref(false);

onMounted(() => {
  ordersStore.fetchLocations();
  ordersStore.fetchOrders();
});

const locations = computed(() => ordersStore.locations);

const selectedLocation = computed(() => {
  if (!form.value.locationId) return null;
  return ordersStore.getLocationById(form.value.locationId);
});

const availableCapacity = computed(() => {
  if (!selectedLocation.value) return 0;
  const locOrders = ordersStore.orders.filter(o => o.locationId === selectedLocation.value.id);
  const totalOrdered = locOrders.reduce((sum, o) => sum + o.quantity, 0);
  return selectedLocation.value.maxCapacity - totalOrdered;
});

const onLocationChange = async () => {
  form.value.coffee = null;
  selectedCoffeeImage.value = '';
  if (selectedLocation.value) {
    availableCoffees.value = await offeringsStore.fetchCoffeesByType(selectedLocation.value.coffeeType);
  }
};

const onCoffeeChange = (event) => {
  const coffee = event.value;
  if (coffee) {
    selectedCoffeeImage.value = coffee.image;
  } else {
    selectedCoffeeImage.value = '';
  }
};

const saveOrder = () => {
  if (form.value.quantity > availableCapacity.value) {
    capacityError.value = true;
    return;
  }
  capacityError.value = false;

  ordersStore.addOrder({
    locationId: selectedLocation.value.id,
    coffeeType: selectedLocation.value.coffeeType,
    coffeeId: form.value.coffee.id,
    coffeeName: form.value.coffee.title,
    quantity: form.value.quantity,
    registeredAt: new Date().toISOString()
  }).then(() => {
    router.push({ name: 'home' });
  });
};

const navigateBack = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="pt-6 p-4 md:p-5 max-w-4xl mx-auto">
    <div class="mb-4">
      <h1 class="text-3xl font-bold text-color m-0 mb-1">{{ t('order.new-title') }}</h1>
      <p class="m-0 text-color-secondary">{{ t('order.new-subtitle') }}</p>
    </div>

    <div class="grid">
      <div class="col-12 md:col-8">
        <form @submit.prevent="saveOrder" class="flex flex-column gap-3">
          <div class="field flex flex-column gap-2">
            <label for="location" class="font-medium">{{ t('order.location') }}</label>
            <pv-select
                id="location"
                v-model="form.locationId"
                :options="locations"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a Cafe Location"
                class="w-full"
                @change="onLocationChange"
                required
            />
          </div>

          <div v-if="selectedLocation" class="field flex flex-column gap-2">
            <label for="coffee" class="font-medium">{{ t('order.coffee') }}</label>
            <pv-select
                id="coffee"
                v-model="form.coffee"
                :options="availableCoffees"
                optionLabel="title"
                placeholder="Select a Coffee Option"
                class="w-full"
                @change="onCoffeeChange"
                required
            />
            <small class="text-color-secondary">Available Capacity: <strong>{{ availableCapacity }}</strong></small>
          </div>

          <div v-if="form.coffee" class="field flex flex-column gap-2">
            <label for="quantity" class="font-medium">{{ t('order.quantity') }}</label>
            <pv-input-number id="quantity" v-model="form.quantity" :min="1" :max="availableCapacity > 0 ? availableCapacity : 1" class="w-full" required />
            <small v-if="capacityError" class="text-red-500">{{ t('order.exceeds-capacity') }}</small>
          </div>

          <div class="flex gap-2 pt-2">
            <pv-button :label="t('order.save')" icon="pi pi-check" type="submit" />
            <pv-button :label="t('order.cancel')" severity="secondary" @click="navigateBack" />
          </div>
        </form>
      </div>

      <div class="col-12 md:col-4 flex justify-content-center align-items-start">
        <div v-if="selectedCoffeeImage" class="surface-card p-3 border-round-md shadow-1 text-center w-full">
          <p class="font-semibold mb-2">Coffee Preview</p>
          <img :src="selectedCoffeeImage" alt="Coffee Preview" class="border-round-md w-full h-12rem object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>