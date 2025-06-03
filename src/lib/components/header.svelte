<script lang="ts">
	import { user } from '$lib/store';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition'; // For menu animation

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
			alert('Error logging out: ' + error.message);
		} else {
			mobileMenuOpen = false; // Close menu on logout
			await goto('/');
		}
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 border-b-2 border-sky-700/50 bg-gray-950/85 p-2 text-white shadow-md backdrop-blur-md"
>
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="flex items-center group z-10" on:click={() => mobileMenuOpen = false}>
			<img
				src="/invochess-logo.png"
				alt="Invochess Logo"
				class="h-8 w-auto group-hover:opacity-90 transition-opacity duration-150"
			/>
			{#if !$user}
				<span class="ml-2 text-2xl font-bold group-hover:text-sky-100 transition-colors duration-150">Invochess</span>
			{/if}
		</a>

		<!-- Desktop Navigation Links -->
		<div class="hidden md:flex flex-grow justify-center items-center">
			{#if $user}
				<a
					href="/dashboard"
					class="px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80 rounded-md"
				>
					Dashboard
				</a>
				<a
					href="/openings-lab"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80 rounded-md"
				>
					Openings Lab
				</a>
				<a
					href="/game-analyzer"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80 rounded-md"
				>
					Game Analyzer
				</a>
				<a
					href="/profile-analyzer"
					class="ml-2 px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80 rounded-md"
				>
					Profile Analyzer
				</a>
			{/if}
		</div>

		<!-- Desktop User Actions -->
		<div class="hidden md:flex items-center">
			{#if $user}
				<button
					on:click={handleLogout}
					class="hover:cursor-pointer rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80 hover:text-sky-100"
				>
					Logout
				</button>
			{:else}
				<a
					href="/login"
					class="rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80"
				>
					Login
				</a>
				<a
					href="/signup"
					class="ml-2 rounded-md px-3 py-2 font-semibold transition-colors duration-150 hover:bg-sky-700/80"
				>
					Register
				</a>
			{/if}
		</div>

		<!-- Hamburger Menu Button (Mobile) -->
		{#if $user} <!-- Only show hamburger if user is logged in -->
		<div class="md:hidden flex items-center z-10">
			<button
				on:click={toggleMobileMenu}
				aria-label="Toggle menu"
				class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white relative w-8 h-8"
			>
				<span class="sr-only">Open main menu</span>
				<!-- Animated Hamburger/Close Icon -->
				<div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}"></span>
					<span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {mobileMenuOpen ? 'opacity-0' : ''}"></span>
					<span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}"></span>
				</div>
			</button>
		</div>
		{/if}

		{#if !$user && !mobileMenuOpen} <!-- Show login/register on mobile if not logged in and menu is closed -->
		<div class="md:hidden flex items-center">
			<a
				href="/login"
				class="rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-sky-700/80"
			>
				Login
			</a>
			<a
				href="/signup"
				class="ml-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-sky-700/80"
			>
				Register
			</a>
		</div>
		{/if}
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen && $user}
		<div transition:fly={{ y: -20, duration: 300 }} class="md:hidden fixed inset-x-0 top-16 bg-gray-900/90 backdrop-blur-sm shadow-lg pt-2 pb-4 z-40">
			<div class="container mx-auto px-4 flex flex-col space-y-2">
				<a href="/dashboard" class="block px-3 py-2 rounded-md hover:bg-sky-600/50" on:click={toggleMobileMenu}>Dashboard</a>
				<a href="/openings-lab" class="block px-3 py-2 rounded-md hover:bg-sky-600/50" on:click={toggleMobileMenu}>Openings Lab</a>
				<a href="/game-analyzer" class="block px-3 py-2 rounded-md hover:bg-sky-600/50" on:click={toggleMobileMenu}>Game Analyzer</a>
				<a href="/profile-analyzer" class="block px-3 py-2 rounded-md hover:bg-sky-600/50" on:click={toggleMobileMenu}>Profile Analyzer</a>
				<button 
					on:click={handleLogout} 
					class="block w-full text-left px-3 py-2 rounded-md hover:bg-sky-700/80 hover:text-sky-100 font-semibold"
				>
					Logout
				</button>
			</div>
		</div>
	{/if}
</nav>
