import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { OrdersApi } from "../infrastructure/orders-api.js";
import { CafeLocationAssembler } from "../infrastructure/cafe-location.assembler.js";
import { CafeOrderAssembler } from "../infrastructure/cafe-order.assembler.js";
import { CafeOrder } from "../domain/model/cafe-order.entity.js";

const ordersApi = new OrdersApi();

const useOrdersStore = defineStore('orders', () => {
    const locations = ref([]);
    const orders = ref([]);
    const errors = ref([]);

    function fetchLocations() {
        ordersApi.getLocations().then(response => {
            locations.value = CafeLocationAssembler.toEntitiesFromResponse(response);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchOrders() {
        ordersApi.getOrders().then(response => {
            orders.value = CafeOrderAssembler.toEntitiesFromResponse(response);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function addOrder(orderPayload) {
        const order = new CafeOrder(orderPayload);
        return ordersApi.createOrder(order).then(response => {
            const newOrder = CafeOrderAssembler.toEntityFromResource(response.data);
            orders.value.push(newOrder);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getLocationById(id) {
        return locations.value.find(l => l.id === parseInt(id));
    }

    return {
        locations,
        orders,
        errors,
        fetchLocations,
        fetchOrders,
        addOrder,
        getLocationById
    };
});

export default useOrdersStore;