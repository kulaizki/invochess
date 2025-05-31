<script lang="ts">
  import { inview } from 'svelte-inview';

  let isInView = false;
  let hasAnimated = false;

	const steps = [
    {
      name: 'Upload Your Game',
      description: 'Easily upload your game PGN (Portable Game Notation) file or paste the game text directly into our analyzer.',
    },
    {
      name: 'AI Analyzes Deeply',
      description: 'Stockfish, a powerful chess engine, performs a move-by-move analysis, identifying blunders, inaccuracies, and key moments.',
    },
    {
      name: 'Get Clear Explanations',
      description: 'Gemini, our integrated AI language model, translates complex engine lines into easy-to-understand insights and actionable advice.',
    },
    {
      name: 'Improve & Win',
      description: 'Apply your newfound understanding to future games, sharpen your decision-making, and watch your rating climb!',
    }
  ];
</script>

<section 
  id="how-it-works" 
  class="py-12 md:py-20"
  use:inview={{ threshold: 0.1, unobserveOnEnter: true }}
  on:inview_change={(event) => {
    if (event.detail.inView && !hasAnimated) {
      isInView = true;
      hasAnimated = true;
    }
  }}
>
  <div class="container mx-auto px-4 transition-all duration-1000 transform {isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">How Invochess Works</h2>
      <p class="mt-3 md:mt-4 text-lg md:text-xl text-sky-400 max-w-2xl mx-auto">
        A simple yet powerful process to unlock your chess potential.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
      {#each steps as step, i}
        <div class="text-center bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center ring-1 ring-gray-700 hover:shadow-sky-500/10 transition-shadow duration-300">
          <div class="flex-shrink-0 mb-5 bg-sky-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold shadow-md">
            {i + 1}
          </div>
          <h3 class="text-xl font-semibold text-white mb-2.5">{step.name}</h3>
          <p class="text-gray-300 text-sm leading-relaxed flex-grow">{step.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section> 