<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/store';

	onMount(() => {
		// Check initial session state
		supabase.auth.getSession().then(({ data: { session } }) => {
			user.set(session?.user ?? null);
		});

		// Listen for auth state changes (login, logout, token refresh)
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			user.set(session?.user ?? null);
		});

		// Cleanup listener on component unmount
		return () => {
			authListener?.subscription?.unsubscribe();
		};
	});
</script>

<div class="flex flex-col min-h-screen">
	<Header/>
	<main class="flex-grow flex flex-col pt-16 bg-gradient-to-br from-gray-900 to-gray-950">
		<slot />
	</main>
	<Footer/>
</div>
