export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";

	constructor() { }

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		try {
			const theURL = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
			const resp = await fetch(theURL);
			if (!resp.ok) {
				throw new Error(`Response status: ${resp.status}`);
			}
			const locations: ShallowLocations = await resp.json();
			return locations;
		} catch (err) {
			throw err;
		}
	}

	async fetchLocation(locationName: string): Promise<Location> {
		try {
			const resp = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
			if (!resp.ok) {
				throw new Error(`Response status: ${resp.status}`);
			}
			const location: Location = await resp.json();
			return location;
		} catch (err) {
			throw err;
		}

	}
}

export type ShallowLocations = {
	count: number;
	next: string;
	previous: null | string;
	results: {
		name: string;
		url: string;
	}[];
};

export type Location = {
	encounter_method_rates: {
		encounter_method: {
			name: string;
			url: string,
		},
		version_details: {
			rate: number;
			version: {
				name: string;
				url: string;
			};
		}[];
	}[];
};
