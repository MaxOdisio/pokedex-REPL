import { createInterface } from "node:readline";
import { getCommands } from "./command_list.js";
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});
const commands = getCommands();
export function cleanInput(input) {
    const words = input.trim().split(" ");
    const wordsLowered = words.map((word) => word.toLowerCase());
    return wordsLowered;
}
export function startREPL() {
    rl.prompt();
    rl.on("line", (input) => {
        if (!input) {
            rl.prompt();
            return;
        }
        const userInput = cleanInput(input);
        const userCommand = userInput[0];
        if (userCommand in commands) {
            commands[userCommand].callback(commands);
            if (userCommand !== "exit") {
                rl.prompt();
            }
        }
        else {
            console.log("Unknown command");
            rl.prompt();
        }
    });
}
