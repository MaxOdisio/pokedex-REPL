export function cleanInput(input) {
    const words = input.trim().split(" ");
    const wordsLowered = words.map((word) => word.toLowerCase());
    return wordsLowered;
}
export async function startREPL(state) {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }
        const commandName = words[0];
        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        let args = words.slice(1);
        try {
            await cmd.callback(state, ...args);
        }
        catch (e) {
            console.log(e.message);
        }
        state.readline.prompt();
    });
}
