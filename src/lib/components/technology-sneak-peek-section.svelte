<script lang="ts">
  import { inview } from 'svelte-inview';

  let isInView = false;
  let hasAnimated = false;

  const technologies = [
    {
      name: 'Stockfish 16',
      description: 'The most powerful open-source chess engine, providing deep tactical and positional analysis.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400',
      hoverBorderColor: 'hover:border-yellow-400'
    },
    {
      name: 'Google Gemini',
      description: 'Advanced AI for natural language explanations, making complex chess concepts easy to grasp.',
      color: 'text-sky-400',
      bgColor: 'bg-sky-400',
      hoverBorderColor: 'hover:border-sky-400'
    }
  ];
</script>

<section 
  id="tech-sneak-peek" 
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
      <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">Technology Sneak Peek</h2>
      <p class="mt-3 md:mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
        Powered by cutting-edge technology for unparalleled chess insights.
      </p>
    </div>

    <div class="max-w-2xl mx-auto">
      <ul class="space-y-6 md:space-y-8">
        {#each technologies as tech}
          <li 
            class="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl shadow-lg 
                       ring-1 ring-gray-700 
                       border-2 border-transparent 
                       hover:shadow-md hover:-translate-y-1 
                       transition-all duration-300 ease-in-out"
            class:hover:border-yellow-400={tech.hoverBorderColor === 'hover:border-yellow-400'}
            class:hover:border-sky-400={tech.hoverBorderColor === 'hover:border-sky-400'}
          >
            <div class="flex-shrink-0">
              <span class={`inline-block w-3 h-3 rounded-full ${tech.bgColor} mt-1.5`}></span>
            </div>
            <div>
              <h3 class={`text-xl md:text-2xl font-semibold ${tech.color} mb-1.5`}>{tech.name}</h3>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base">{tech.description}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section> 