import { State } from "./state.js";

export async function commandInspect(state: State, ...params: string[]) {
	if (params.length !== 1) {
		throw new Error("You must provide a pokemon name");
	}

	const name = params[0];
	if (!(name in state.caughtPokemon)) {
		console.log("you have not caught that pokemon");
		return;
	}

	const pokemon = state.caughtPokemon[name];
	console.log(`Name: ${pokemon.name}`);
	console.log(`Height: ${pokemon.height}`);
	console.log(`Weight: ${pokemon.weight}`);
	console.log(`Stats:`);
	for (const el of pokemon.stats) {
		console.log(`-${el.stat.name}: ${el.base_stat}`);
	}
	console.log("Types:");
	for (const t of pokemon.types) {
		console.log(`- ${t.type.name}`);
	}
}
