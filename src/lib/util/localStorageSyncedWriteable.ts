import { writable } from 'svelte/store';

export function createLocalStorageSyncedWritableString(
	initialValue: string,
	localStorageKey: string
) {
	// Initialize with value from localStorage
	const existingValue = localStorage.getItem(localStorageKey);
	const store = writable(existingValue ?? initialValue);

	// Update localStorage when value changes
	store.subscribe((value) => {
		localStorage.setItem(localStorageKey, value);
	});

	return store;
}

export function createLocalStorageSyncedWritableInt(initialValue: number, localStorageKey: string) {
	// Initialize with value from localStorage
	const existingValue = parseInt(localStorage.getItem(localStorageKey) ?? '0', 10);
	const store = writable(existingValue || initialValue);

	// Update localStorage when value changes
	store.subscribe((value) => {
		localStorage.setItem(localStorageKey, String(value));
	});

	return store;
}

export function createLocalStorageSyncedWritableBool(
	initialValue: boolean,
	localStorageKey: string
) {
	// Initialize with value from localStorage
	const existingValue = localStorage.getItem(localStorageKey);
	const startingValue = existingValue === 'true' ? true : existingValue === 'false' ? false : null;
	const store = writable(startingValue ?? initialValue);

	// Update localStorage when value changes
	store.subscribe((value) => {
		localStorage.setItem(localStorageKey, value ? 'true' : 'false');
	});

	return store;
}

export function createLocalStorageSyncedWritableJSON<T>(initialValue: T, localStorageKey: string) {
	// Initialize with value from localStorage
	let existingValue = initialValue;
	try {
		existingValue = JSON.parse(localStorage.getItem(localStorageKey) ?? '');
	} catch (error) {
		console.error('Error parsing JSON from localStorage', error);
	}

	const store = writable(existingValue);

	// Update localStorage when value changes
	store.subscribe((value) => {
		localStorage.setItem(localStorageKey, JSON.stringify(value));
	});

	return store;
}
