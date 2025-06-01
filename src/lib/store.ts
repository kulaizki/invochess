import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

// Writable store for the user. Can be null (logged out) or a User object (logged in).
export const user = writable<User | null>(null);

// You can add other global stores here if needed later.
// For example, a store for app loading state:
// export const appLoading = writable<boolean>(true); 