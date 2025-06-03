<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import ProblemSolution from '$lib/components/problem-solution.svelte';
	import KeyFeatures from '$lib/components/key-features.svelte';
	import HowItWorks from '$lib/components/how-it-works.svelte';
	import Technology from '$lib/components/technology.svelte';
	import ZigzagBorder from '$lib/components/zigzag-border.svelte';
	import FinalCTA from '$lib/components/final-cta.svelte';

	import { user } from '$lib/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// If the user is logged in when they land on the homepage,
		// redirect them to the dashboard.
		const unsubscribe = user.subscribe((currentUser) => {
			if (currentUser) {
				if (typeof window !== 'undefined') {
					goto('/dashboard', { replaceState: true });
				}
			}
		});
		return unsubscribe; // Cleanup subscription
	});
</script>

{#if !$user}
	<Hero />
	<ProblemSolution />
	<ZigzagBorder />
	<KeyFeatures />
	<ZigzagBorder />
	<HowItWorks />
	<ZigzagBorder />
	<Technology />
	<ZigzagBorder />
	<FinalCTA />
{:else}
	<div class="flex flex-grow flex-col items-center justify-center">
		<p class="text-xl text-white">Redirecting to your dashboard...</p>
	</div>
{/if}
