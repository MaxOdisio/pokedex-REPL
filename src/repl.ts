import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
	const words = input.trim().split(" ");
	const wordsLowered = words.map((word) => word.toLowerCase());
	return wordsLowered;
}

export function startREPL(state: State) {
	const rl = state.readline;
	const commands = state.commands;

	rl.prompt();
	rl.on("line", async (input: string) => {
		if (!input) {
			rl.prompt();
			return;
		}
		const userInput: string[] = cleanInput(input);
		const userCommand = userInput[0];
		if (userCommand in commands) {
			commands[userCommand].callback(state);
			rl.prompt();
		} else {
			console.log(`Unknown command: "${userCommand}". Type "help" for a list of commands.`);
			rl.prompt();
		}
	});
}
