<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/store';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

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
	<main class="flex-grow flex flex-col pt-12 bg-gradient-to-br from-gray-900 to-gray-950">
		{#if $user}
			{#key $page.url.pathname}
				<div class="flex-grow flex flex-col" in:fly={{ y: 20, duration: 500, delay: 200 }}>
					<slot />
				</div>
			{/key}
		{:else}
			<div class="flex-grow flex flex-col">
				<slot />
			</div>
		{/if}
	</main>
	<Footer/>
</div>
