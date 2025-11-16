import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
	const loc = await state.pokeAPI.fetchLocation(args[0]);
	console.log(`Exploring ${loc.location.name}...`);
	const pkms = loc.pokemon_encounters;

	if (!pkms || pkms.length === 0) {
		throw new Error(`No pokemon found at ${loc.location.name}`);
	}

	console.log("Found Pokemon:");
	for (const pkm of pkms) {
		const name = pkm.pokemon.name;
		console.log(`- ${name}`);
	}
}
