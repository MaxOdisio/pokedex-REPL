import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export async function initState() {
    // Creates Readline Interface
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    // Sets up PokeAPI object and locations
    const pokeapi = new PokeAPI;
    return {
        readline: rl,
        commands: getCommands(),
        pokeapi: pokeapi,
        nextLocationsURL: "",
        prevLocationsURL: null,
    };
}
