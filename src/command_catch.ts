import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
	if (args.length !== 1) {
		throw new Error("you must provide a pokemon name");
	}

	const pokemon = args[0];
	console.log(`Throwing a Pokeball at ${pokemon}...`);
	const pkmData = await state.pokeAPI.fetchPokemon(pokemon);
	const chanceToCatch = calculateCaptureRate(pkmData.base_experience);
	const isCaught = (Math.random() * 100) < chanceToCatch;

	if (!isCaught) {
		console.log(`Woopsie, ${pkmData.name} escaped from the pokeball! Try again...`);
		return;
	} else {
		state.pokedex[pokemon] = pkmData;
		console.log(`Noice, you have a ${pkmData.name} now!`);
	}

}

// Valori di riferimento per la scala
const MAX_BASE_EXPERIENCE_REF = 300; // Il valore massimo "difficile" che ci aspettiamo
const MIN_CAPTURE_PERCENTAGE = 10;   // Percentuale minima di cattura
const MAX_CAPTURE_PERCENTAGE = 95;   // Percentuale massima di cattura

/**
 * Calcola la percentuale di probabilità di cattura in base alla base_experience.
 * La probabilità diminuisce linearmente all'aumentare di base_experience.
 * @param baseExp Il valore di base_experience del Pokémon.
 * @returns La probabilità di cattura in percentuale (0-100).
**/
function calculateCaptureRate(baseExp: number): number {
	// 1. Clampa baseExp: Assicurati che non vada oltre il nostro riferimento massimo
	const clampedBaseExp = Math.min(baseExp, MAX_BASE_EXPERIENCE_REF);

	// 2. Calcola la riduzione percentuale
	// (clampedBaseExp / MAX_BASE_EXPERIENCE_REF) ci dà un valore tra 0 e 1, 
	// dove 0 è facile e 1 è difficile.
	const difficultyFactor = clampedBaseExp / MAX_BASE_EXPERIENCE_REF;

	// 3. Calcola il range di probabilità effettivo
	const probabilityRange = MAX_CAPTURE_PERCENTAGE - MIN_CAPTURE_PERCENTAGE;

	// 4. Calcola la probabilità di cattura
	// Partiamo da MAX_CAPTURE_PERCENTAGE e sottraiamo la difficoltà proporzionale.
	let captureRate = MAX_CAPTURE_PERCENTAGE - (difficultyFactor * probabilityRange);

	// 5. Arrotonda il risultato per pulizia
	return Math.round(captureRate);
}
