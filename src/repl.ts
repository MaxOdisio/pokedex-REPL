import { createInterface } from "node:readline";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
});

export function cleanInput(input: string): string[] {
	const words = input.trim().split(" ");
	const wordsLowered = words.map((word) => word.toLowerCase());
	return wordsLowered;
}

export function startREPL() {
	rl.prompt();
	rl.on("line", (input: string) => {
		if (!input) {
			rl.prompt();
			return;
		}
		const userInput = cleanInput(input);
		console.log(`Your command was: ${userInput[0]}`);
		rl.prompt();
	});
}
