import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
	try {
		const state = await initState();
		startREPL(state);
	} catch (err) {
		throw err;
	}
}

main();
