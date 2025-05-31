<script lang="ts">
  import HeroSection from "$lib/components/hero-section.svelte";
  import ProblemSolutionSection from "$lib/components/problem-solution-section.svelte";
  import KeyFeaturesSection from "$lib/components/key-features-section.svelte";
  import HowItWorksSection from "$lib/components/how-it-works-section.svelte";
  import TechnologySneakPeekSection from "$lib/components/technology-sneak-peek-section.svelte";
</script>

<HeroSection />

<div class="container mx-auto px-4 py-4 md:py-8">
  <ProblemSolutionSection /> 
  <KeyFeaturesSection />
</div>

<HowItWorksSection />
<TechnologySneakPeekSection />

<section id="signup" class="py-16 md:py-24">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Chess Game?</h2>
    <p class="text-lg md:text-xl text-sky-400 mb-10 md:mb-12 max-w-xl mx-auto">Sign up now to access powerful analysis tools and personalized AI-driven learning insights.</p>
    <div class="w-full max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
      <form class="space-y-5">
        <div>
          <label for="email-signup" class="sr-only">Email address</label>
          <input 
            type="email" 
            name="email-signup" 
            id="email-signup" 
            class="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm text-base border border-gray-600 focus:border-sky-500"
            placeholder="Enter your email to get started">
        </div>
        <button 
          type="submit" 
          class="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out shadow-lg transform hover:scale-105 text-lg">
          Create Account & Analyze
        </button>
      </form>
    </div>
  </div>
</section>
