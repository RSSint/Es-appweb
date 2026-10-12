import { defineStore } from "pinia";
import { ref } from "vue";
import { CoffeeApi } from "../infrastructure/coffee-api.js";
import { CoffeeAssembler } from "../infrastructure/coffee.assembler.js";

const coffeeApi = new CoffeeApi();

export const useOfferingsStore = defineStore('offerings', () => {
    const coffees = ref([]);
    const errors = ref([]);

    function fetchCoffeesByType(coffeeType) {
        const apiCall = coffeeType === 'iced' ? coffeeApi.getIcedCoffees() : coffeeApi.getHotCoffees();
        return apiCall.then(response => {
            coffees.value = CoffeeAssembler.toEntitiesFromResponse(response);
            return coffees.value;
        }).catch(error => {
            errors.value.push(error);
            return [];
        });
    }

    return {
        coffees,
        errors,
        fetchCoffeesByType
    };
});