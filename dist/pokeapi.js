import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache;
    constructor(cacheInterval) {
        this.#cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.#cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
        const cachedLocations = this.#cache.get(url);
        if (cachedLocations) {
            return cachedLocations;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations = await resp.json();
            this.#cache.add(url, locations);
            return locations;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e.message}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cachedLocation = this.#cache.get(url);
        if (cachedLocation) {
            return cachedLocation;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }
            const location = await resp.json();
            this.#cache.add(url, location);
            return location;
        }
        catch (e) {
            throw new Error(`Error fetching location '${locationName}': ${e.message}`);
        }
    }
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cachedPokemon = this.#cache.get(url);
        if (cachedPokemon) {
            return cachedPokemon;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`Response status: ${resp.status}`);
            }
            const pokemon = await resp.json();
            this.#cache.add(url, pokemon);
            return pokemon;
        }
        catch (e) {
            throw new Error(`Error fetching pokemon '${pokemonName}': ${e.message}`);
        }
    }
}
