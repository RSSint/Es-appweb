import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

export class OrdersApi extends BaseApi {
    #locationsEndpoint;
    #ordersEndpoint;

    constructor() {
        super();
        this.#locationsEndpoint = new BaseEndpoint(this, '/cafe-locations');
        this.#ordersEndpoint = new BaseEndpoint(this, '/cafe-orders');
    }

    getLocations() {
        return this.#locationsEndpoint.getAll();
    }

    getOrders() {
        return this.#ordersEndpoint.getAll();
    }

    createOrder(resource) {
        return this.#ordersEndpoint.create(resource);
    }
}