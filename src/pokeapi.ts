import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#cache: Cache;

	constructor(cacheInterval: number) {
		this.#cache = new Cache(cacheInterval);
	}

	closeCache() {
		this.#cache.stopReapLoop();
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;

		const cachedLocations = this.#cache.get<ShallowLocations>(url);
		if (cachedLocations) {
			return cachedLocations;
		}

		try {
			const resp = await fetch(url);
			if (!resp.ok) {
				throw new Error(`${resp.status} ${resp.statusText}`);
			}
			const locations: ShallowLocations = await resp.json();
			this.#cache.add(url, locations);
			return locations;
		} catch (e) {
			throw new Error(`Error fetching locations: ${(e as Error).message}`);
		}
	}

	async fetchLocation(locationName: string): Promise<Location> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

		const cachedLocation = this.#cache.get<Location>(url);
		if (cachedLocation) {
			return cachedLocation;
		}

		try {
			const resp = await fetch(url);
			if (!resp.ok) {
				throw new Error(`Response status: ${resp.status}`);
			}
			const location: Location = await resp.json();
			this.#cache.add(url, location);
			return location;
		} catch (e) {
			throw new Error(
				`Error fetching location '${locationName}': ${(e as Error).message}`,
			);
		}

	}

	async fetchPokemon(pokemonName: string): Promise<Pokemon> {
		const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

		const cachedPokemon = this.#cache.get<Pokemon>(url);
		if (cachedPokemon) {
			return cachedPokemon;
		}

		try {
			const resp = await fetch(url);
			if (!resp.ok) {
				throw new Error(`Response status: ${resp.status}`);
			}
			const pokemon: Pokemon = await resp.json();
			this.#cache.add(url, pokemon);
			return pokemon;
		} catch (e) {
			throw new Error(`Error fetching pokemon '${pokemonName}': ${(e as Error).message}`);
		}
	}
}

export type ShallowLocations = {
	count: number;
	next: string;
	previous: string;
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
	game_index: number;
	id: number;
	location: {
		name: string;
		url: string;
	};
	name: string;
	names: {
		language: {
			name: string;
			url: string;
		};
		name: string;
	}[];
	pokemon_encounters: {
		pokemon: {
			name: string;
			url: string;
		};
		version_details: {
			encounter_details: {
				chance: number;
				condition_values: any[];
				max_level: number;
				method: {
					name: string;
					url: string;
				};
				min_level: number;
			}[];
			max_chance: number;
			version: {
				name: string;
				url: string;
			};
		}[];
	}[];
};

export interface Pokemon {
	abilities: Ability2[];
	base_experience: number;
	cries: Cries;
	forms: Ability[];
	game_indices: Gameindex[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Move[];
	name: string;
	order: number;
	past_abilities: Pastability[];
	past_types: any[];
	species: Ability;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
	weight: number;
}

export interface Type {
	slot: number;
	type: Ability;
}

export interface Stat {
	base_stat: number;
	effort: number;
	stat: Ability;
}

export interface Sprites {
	back_default: string;
	back_female?: any;
	back_shiny: string;
	back_shiny_female?: any;
	front_default: string;
	front_female?: any;
	front_shiny: string;
	front_shiny_female?: any;
	other: Other;
	versions: Versions;
}

export interface Versions {
	'generation-i': Generationi;
	'generation-ii': Generationii;
	'generation-iii': Generationiii;
	'generation-iv': Generationiv;
	'generation-v': Generationv;
	'generation-vi': Generationvi;
	'generation-vii': Generationvii;
	'generation-viii': Generationviii;
}

export interface Generationviii {
	icons: Dreamworld;
}

export interface Generationvii {
	icons: Dreamworld;
	'ultra-sun-ultra-moon': Home;
}

export interface Generationvi {
	'omegaruby-alphasapphire': Home;
	'x-y': Home;
}

export interface Generationv {
	'black-white': Blackwhite;
}

export interface Blackwhite {
	animated: Showdown;
	back_default: string;
	back_female?: any;
	back_shiny: string;
	back_shiny_female?: any;
	front_default: string;
	front_female?: any;
	front_shiny: string;
	front_shiny_female?: any;
}

export interface Generationiv {
	'diamond-pearl': Showdown;
	'heartgold-soulsilver': Showdown;
	platinum: Showdown;
}

export interface Generationiii {
	emerald: Officialartwork;
	'firered-leafgreen': Fireredleafgreen;
	'ruby-sapphire': Fireredleafgreen;
}

export interface Fireredleafgreen {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
}

export interface Generationii {
	crystal: Crystal;
	gold: Gold;
	silver: Gold;
}

export interface Gold {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
	front_transparent: string;
}

export interface Crystal {
	back_default: string;
	back_shiny: string;
	back_shiny_transparent: string;
	back_transparent: string;
	front_default: string;
	front_shiny: string;
	front_shiny_transparent: string;
	front_transparent: string;
}

export interface Generationi {
	'red-blue': Redblue;
	yellow: Redblue;
}

export interface Redblue {
	back_default: string;
	back_gray: string;
	back_transparent: string;
	front_default: string;
	front_gray: string;
	front_transparent: string;
}

export interface Other {
	dream_world: Dreamworld;
	home: Home;
	'official-artwork': Officialartwork;
	showdown: Showdown;
}

export interface Showdown {
	back_default: string;
	back_female?: any;
	back_shiny: string;
	back_shiny_female?: any;
	front_default: string;
	front_female?: any;
	front_shiny: string;
	front_shiny_female?: any;
}

export interface Officialartwork {
	front_default: string;
	front_shiny: string;
}

export interface Home {
	front_default: string;
	front_female?: any;
	front_shiny: string;
	front_shiny_female?: any;
}

export interface Dreamworld {
	front_default: string;
	front_female?: any;
}

export interface Pastability {
	abilities: Ability3[];
	generation: Ability;
}

export interface Ability3 {
	ability?: any;
	is_hidden: boolean;
	slot: number;
}

export interface Move {
	move: Ability;
	version_group_details: Versiongroupdetail[];
}

export interface Versiongroupdetail {
	level_learned_at: number;
	move_learn_method: Ability;
	order?: (null | number)[];
	version_group: Ability;
}

export interface Gameindex {
	game_index: number;
	version: Ability;
}

export interface Cries {
	latest: string;
	legacy: string;
}

export interface Ability2 {
	ability: Ability;
	is_hidden: boolean;
	slot: number;
}

export interface Ability {
	name: string;
	url: string;
}
