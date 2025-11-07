import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
	console.log();
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log();
	for (const command of Object.values(commands)) {
		console.log(`${command.name}: ${command.description}`);
	}
	console.log();
}
