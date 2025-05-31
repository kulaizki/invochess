<script lang="ts">
  // Placeholder for actual SVG icons or a more robust icon solution
  const icons = {
    analysis: `<svg class="w-12 h-12 md:w-14 md:h-14 text-sky-400 mx-auto mb-4 md:mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
    tutor: `<svg class="w-12 h-12 md:w-14 md:h-14 text-sky-400 mx-auto mb-4 md:mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`,
    focus: `<svg class="w-12 h-12 md:w-14 md:h-14 text-sky-400 mx-auto mb-4 md:mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`
  };

  const features = [
    {
      icon: icons.analysis,
      title: "Deep Analysis",
      description: "Go beyond surface-level evaluation with Stockfish. Explore variations and understand the engine's top choices."
    },
    {
      icon: icons.tutor,
      title: "Understand Why",
      description: "Get clear, human-like explanations for moves and strategies with our AI Tutor, powered by Google Gemini."
    },
    {
      icon: icons.focus,
      title: "Key Moment Focus",
      description: "AI highlights critical game moments, explaining complex decisions and their strategic impact."
    }
  ];
</script>

<section id="features" class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Core Features & Benefits</h2>
      <p class="text-lg md:text-xl text-sky-400 mt-3 md:mt-4">Everything you need to elevate your chess understanding.</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8 md:gap-10 items-stretch">
      {#each features as feature}
        <div class="text-center p-6 md:p-8 bg-gray-800 rounded-lg shadow-xl hover:shadow-sky-500/20 transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
          {@html feature.icon}
          <h3 class="text-2xl md:text-3xl font-semibold text-white mb-3">{feature.title}</h3>
          <p class="text-md text-gray-300">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section> 