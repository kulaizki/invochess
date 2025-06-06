<script lang="ts">
  import { inview } from 'svelte-inview';
  import { onMount } from 'svelte';

  let isInView = false;
  let hasAnimated = false;

  onMount(() => {
    isInView = true;
    hasAnimated = true;
  });
</script>

<section 
  class="hero-section text-white flex flex-col justify-center min-h-screen py-16 md:py-20 relative bg-cover bg-center bg-no-repeat border-b-2 border-sky-600"
  style="background-image: url('/chess-bg-min.png');"
  use:inview={{ threshold: 0.1, unobserveOnEnter: true }}
  on:inview_change={(event) => {
    if (event.detail.inView && !hasAnimated) {
      isInView = true;
      hasAnimated = true;
    }
  }}
>
  <div class="container relative z-[2] mx-auto text-center px-4 transition-all duration-1000 transform {isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
    <div class="mb-4 sm:mb-6 inline-block">
      <div class="p-0.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-500 hover:via-cyan-500 hover:to-sky-600 transition-all duration-300 shadow-lg">
        <span class="block bg-sky-700 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full">
          Powered by Gemini & Stockfish
        </span>
      </div>
    </div>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
      Unlock Your Chess Potential <span class="block bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent mt-1 md:mt-2 [filter:drop-shadow(0_0_5px_theme(colors.sky.300/0.5))]">with AI-Powered Insights</span>
    </h1>
    <p class="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto">
      Invochess combines Stockfish's analytical strength with Gemini's explanatory power to deepen your understanding and help you win more.
    </p>
    
    <div class="mt-8 mb-12">
      <a href="/signup" 
         class="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all duration-300 border-2 border-sky-900 bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105"
         title="Start your chess analysis journey with Invochess">
        Start Analyzing
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
          <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>  

<style>
  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(17, 24, 39, 0.75); /* Dark overlay */
    
  }
</style>  