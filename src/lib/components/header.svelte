<script lang="ts">
	import { user } from '$lib/store';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
			alert('Error logging out: ' + error.message);
		} else {
			await goto('/');
		}
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 border-b-2 border-sky-300/10 bg-gradient-to-r from-sky-600/80 to-sky-700/10 p-4 text-white shadow-md backdrop-blur-md"
>
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="flex items-center group">
			<img
				src="/invochess-logo.png"
				alt="Invochess Logo"
				class="h-8 w-auto group-hover:opacity-80 transition-opacity duration-150"
			/>
		</a>

		<!-- Navigation Links Area -->
		<div class="flex-grow flex justify-center items-center">
			{#if $user}
				<a
					href="/dashboard"
					class="px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10 rounded-md"
				>
					Dashboard
				</a>
				<a
					href="/openings-lab"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10 rounded-md"
				>
					Openings Lab
				</a>
				<a
					href="/game-analyzer"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10 rounded-md"
				>
					Game Analyzer
				</a>
				<a
					href="/profile-analyzer"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10 rounded-md"
				>
					Profile Analyzer
				</a>
			{/if}
		</div>

		<div class="flex items-center">
			{#if $user}
				<button
					on:click={handleLogout}
					class="rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-red-500/50 hover:text-red-100"
				>
					Logout
				</button>
			{:else}
				<a
					href="/login"
					class="rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10"
				>
					Login
				</a>
				<a
					href="/signup"
					class="ml-2 rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10"
				>
					Register
				</a>
			{/if}
		</div>
	</div>
</nav>
