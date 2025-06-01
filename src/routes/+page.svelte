<script lang="ts">
  import HeroSection from "$lib/components/hero-section.svelte";
  import ProblemSolutionSection from "$lib/components/problem-solution-section.svelte";
  import KeyFeaturesSection from "$lib/components/key-features-section.svelte";
  import HowItWorksSection from "$lib/components/how-it-works-section.svelte";
  import TechnologySneakPeekSection from "$lib/components/technology-sneak-peek-section.svelte";
  import { inview } from 'svelte-inview';

  let finalCtaInView = false;
  let finalCtaHasAnimated = false;
</script>

<HeroSection />

<div class="container mx-auto px-4 py-4 md:py-8">
  <ProblemSolutionSection /> 
  <KeyFeaturesSection />
</div>

<HowItWorksSection />
<TechnologySneakPeekSection />

<section 
  id="final-cta" 
  class="py-16 md:py-24"
  use:inview={{ threshold: 0.1, unobserveOnEnter: true }}
  on:inview_change={(event) => {
    if (event.detail.inView && !finalCtaHasAnimated) {
      finalCtaInView = true;
      finalCtaHasAnimated = true;
    }
  }}
>
  <div class="container mx-auto px-4 text-center transition-all duration-1000 transform {finalCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Chess Game?</h2>
    <p class="text-lg md:text-xl text-sky-400 mb-10 md:mb-12 max-w-xl mx-auto">Join Invochess today to access powerful analysis tools and personalized AI-driven learning insights. Start winning more games!</p>
    <div class="mt-8">
      <a href="/signup"
         class="group relative inline-flex items-center text-white justify-center gap-2.5 px-10 py-4 text-xl font-semibold rounded-lg shadow-xl transition-all duration-300 border-2 border-sky-900 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105"
         title="Sign up for Invochess">
        Get Started Now
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5">
          <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
