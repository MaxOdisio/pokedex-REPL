export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        try {
            const theURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
            const resp = await fetch(theURL);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }
            const locations = await resp.json();
            return locations;
        }
        catch (err) {
            throw err;
        }
    }
    async fetchLocation(locationName) {
        try {
            const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }
            const location = await resp.json();
            return location;
        }
        catch (err) {
            throw err;
        }
    }
}
