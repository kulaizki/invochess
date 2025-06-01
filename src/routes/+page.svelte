<script lang="ts">
  import Hero from "$lib/components/hero.svelte";
  import ProblemSolution from "$lib/components/problem-solution.svelte";
  import KeyFeatures from "$lib/components/key-features.svelte";
  import HowItWorks from "$lib/components/how-it-works.svelte";
  import Technology from "$lib/components/technology.svelte";
  import ZigzagBorder from "$lib/components/zigzag-border.svelte";
  import FinalCTA from "$lib/components/final-cta.svelte";

  import { user } from "$lib/store";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    // If the user is logged in when they land on the homepage,
    // redirect them to the dashboard.
    const unsubscribe = user.subscribe(currentUser => {
      if (currentUser) {
        if (typeof window !== 'undefined') { 
          goto("/dashboard", { replaceState: true });
        }
      }
    });
    return unsubscribe; // Cleanup subscription
  });

</script>

{#if !$user}
  <Hero/>
  <ZigzagBorder/>

  <div class="container mx-auto px-4 py-4 md:py-8">
    <ProblemSolution/> 
    <KeyFeatures/>
  </div>

  <HowItWorks/>
  <Technology/>
  <FinalCTA />
{:else}
  <div class="flex-grow flex flex-col items-center justify-center">
    <p class="text-white text-xl">Redirecting to your dashboard...</p>
  </div>
{/if}
