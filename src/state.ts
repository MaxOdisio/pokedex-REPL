import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => Promise<void>;
};

export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeapi: PokeAPI;
	nextLocationsURL: string;
	prevLocationsURL: string | null;
}

export async function initState(): Promise<State> {

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
