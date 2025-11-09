import { State } from "./state.js";

export function commandHelp(state: State) {
	console.log();
	console.log("Welcome to the Pokedex!")
	console.log("Usage:");
	console.log();
	const commands = state.commands;
	for (const command of Object.values(commands)) {
		console.log(`${command.name}: ${command.description}`);
	}
	console.log();
}
