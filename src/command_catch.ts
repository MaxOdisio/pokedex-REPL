import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error("you must provide a pokemon name");
	}

	const name = args[0];
	const pokemon = await state.pokeAPI.fetchPokemon(name);

	console.log(`Throwing a Pokeball at ${name}...`);

	const res = Math.floor(Math.random() * pokemon.base_experience)

	if (res > 40) {
		console.log(`Woopsie, ${pokemon.name} escaped from the pokeball! Try again...`);
		return;
	}

	console.log(`Noice, you have a ${pokemon.name} now!`);
	console.log("You may now inspect it with the inspect command.");
	state.caughtPokemon[pokemon.name] = pokemon;
}
