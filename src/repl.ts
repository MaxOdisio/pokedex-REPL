import { createInterface } from "node:readline";
import { getCommands } from "./command_list.js";

export function cleanInput(input: string): string[] {
	const words = input.trim().split(" ");
	const wordsLowered = words.map((word) => word.toLowerCase());
	return wordsLowered;
}

export function startREPL() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "pokedex > ",
	})
	const commands = getCommands();

	rl.prompt();
	rl.on("line", async (input: string) => {
		if (!input) {
			rl.prompt();
			return;
		}
		const userInput: string[] = cleanInput(input);
		const userCommand = userInput[0];
		if (userCommand in commands) {
			commands[userCommand].callback(commands);
			rl.prompt();
		} else {
			console.log(`Unknown command: "${userCommand}". Type "help" for a list of commands.`);
			rl.prompt();
		}
	});
}
