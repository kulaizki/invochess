<script lang="ts">
  import Hero from "$lib/components/hero.svelte";
  import ProblemSolution from "$lib/components/problem-solution.svelte";
  import KeyFeatures from "$lib/components/key-features.svelte";
  import HowItWorks from "$lib/components/how-it-works.svelte";
  import Technology from "$lib/components/technology.svelte";
  import ZigzagBorder from "$lib/components/zigzag-border.svelte";
  import FinalCTA from "$lib/components/final-cta.svelte";
</script>

<Hero/>
<ZigzagBorder/>

<div class="container mx-auto px-4 py-4 md:py-8">
  <ProblemSolution/> 
  <KeyFeatures/>
</div>

<HowItWorks/>
<Technology/>
<FinalCTA />
