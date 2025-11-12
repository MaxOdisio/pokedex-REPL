export async function commandMapB(state) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const theURL = state.prevLocationsURL;
    const fetchLoc = await state.pokeapi.fetchLocations(theURL);
    const locations = fetchLoc.results;
    for (const location of locations) {
        console.log(location.name);
    }
    state.prevLocationsURL = fetchLoc.previous;
    state.nextLocationsURL = fetchLoc.next;
}
