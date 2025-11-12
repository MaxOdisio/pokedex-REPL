import { State } from "./state.js";

export async function commandMap(state: State) {
	const theURL = state.nextLocationsURL;
	const fetchLoc = await state.pokeapi.fetchLocations(theURL);
	const locations = fetchLoc.results;

	for (const location of locations) {
		console.log(location.name);
	}
	state.nextLocationsURL = fetchLoc.next;
	state.prevLocationsURL = fetchLoc.previous;
}
