import { CafeOrder } from "../domain/model/cafe-order.entity.js";

export class CafeOrderAssembler {
    static toEntityFromResource(resource) {
        return new CafeOrder({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];
        const resources = response.data instanceof Array ? response.data : response.data['cafe-orders'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}