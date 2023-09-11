import { writable } from 'svelte/store'

export const locked = writable(new Set<string>)