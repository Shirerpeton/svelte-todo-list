import { writable, type Writable } from 'svelte/store';

export const selectedFolderId: Writable<string | null> = writable('');