import axios from "axios";

export class CoffeeApi {
    getHotCoffees() {
        return axios.get("https://api.sampleapis.com/coffee/hot");
    }

    getIcedCoffees() {
        return axios.get("https://api.sampleapis.com/coffee/iced");
    }
}