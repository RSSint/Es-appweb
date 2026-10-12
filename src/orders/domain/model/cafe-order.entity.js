export class CafeOrder {
    constructor({ id = null, locationId = null, coffeeType = '', coffeeId = null, coffeeName = '', quantity = 1, registeredAt = null }) {
        this.id = id;
        this.locationId = locationId;
        this.coffeeType = coffeeType;
        this.coffeeId = coffeeId;
        this.coffeeName = coffeeName;
        this.quantity = quantity;
        this.registeredAt = registeredAt || new Date().toISOString();
    }
}