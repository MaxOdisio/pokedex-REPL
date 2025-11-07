export function commandHelp(commands) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
    console.log();
}
