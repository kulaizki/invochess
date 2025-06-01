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
			// user store will be updated by onAuthStateChange, 
			// then dashboard (if current page) will redirect.
			// For safety, or if not coming from dashboard, explicitly redirect.
			await goto('/'); 
		}
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 border-b-2 border-sky-300/10 bg-gradient-to-r from-sky-500/80 to-sky-700/10 p-4 text-white shadow-md backdrop-blur-md"
>
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="text-2xl font-bold"> Invochess </a>
		<div>
			{#if $user}
				<span class="mr-4 text-sm">{$user.email}</span>
				<button 
					on:click={handleLogout}
					class="rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-red-500/50 hover:text-red-100"
				>
					Logout
				</button>
				<a 
					href="/dashboard"
					class="ml-2 rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10"
				>
					Dashboard
				</a>
			{:else}
				<a
					href="/login"
					class="rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10"
					>Login</a
				>
				<a
					href="/signup"
					class="ml-2 rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-500/10"
					>Register</a
				>
			{/if}
		</div>
	</div>
</nav>
