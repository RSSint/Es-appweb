import { CafeLocation } from "../domain/model/cafe-location.entity.js";

export class CafeLocationAssembler {
    static toEntityFromResource(resource) {
        return new CafeLocation({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];
        const resources = response.data instanceof Array ? response.data : response.data['cafe-locations'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}