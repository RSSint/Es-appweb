import { Coffee } from "../domain/model/coffee.entity.js";

export class CoffeeAssembler {
    static toEntityFromResource(resource) {
        return new Coffee({ ...resource });
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        const resources = response.data instanceof Array ? response.data : [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}