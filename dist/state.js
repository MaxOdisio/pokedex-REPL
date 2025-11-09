import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    const cmdList = getCommands();
    const state = { readline: rl, commands: cmdList };
    return state;
}
