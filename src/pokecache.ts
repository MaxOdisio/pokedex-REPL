export type CacheEntry<T> = {
	createdAt: number;
	val: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop();
	}

	add<T>(key: string, val: T) {
		this.#cache.set(key, { createdAt: Date.now(), val: val });
	}

	get<T>(key: string) {
		const entry = this.#cache.get(key);
		if (entry) {
			return entry.val as T;
		}
		return undefined;
	}

	#reap() {
		const limit = Date.now() - this.#interval;
		for (const [key, value] of this.#cache.entries()) {
			if (value.createdAt <= limit) {
				this.#cache.delete(key);
			}
		}
	}

	#startReapLoop() {
		if (this.#reapIntervalId) return;
		this.#reapIntervalId = setInterval(() => {
			this.#reap();
		}, this.#interval)
	}

	stopReapLoop() {
		if (this.#reapIntervalId) {
			clearInterval(this.#reapIntervalId);
			this.#reapIntervalId = undefined;
		}
	}

}
