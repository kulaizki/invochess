<script lang="ts">
  let profileLink: string = '';
  let analysisResult: string = '';
  let isLoading: boolean = false;

  async function handleAnalyzeProfile() {
    if (!profileLink) {
      alert('Please enter a profile link.');
      return;
    }
    isLoading = true;
    analysisResult = ''; // Clear previous results

    // Simulate API call and Gemini analysis
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // Placeholder analysis - replace with actual Gemini output in the future
    analysisResult = `Analysis for profile: ${profileLink}\n\nStrengths:\n- Good tactical awareness in open positions.\n- Solid endgame technique.\n\nAreas for Improvement:\n- Can sometimes miscalculate in complex middlegames.\n- Opening repertoire could be expanded against 1.d4.\n\nOverall: A strong player with potential to reach higher ratings by focusing on middlegame calculation and broadening their opening knowledge.`;
    isLoading = false;
  }
</script>

<div class="container mx-auto p-8 flex flex-col items-center">
  <h1 class="text-3xl font-bold mb-6 text-white">Profile Analyzer</h1>
  <p class="text-lg text-sky-300 mb-8 text-center max-w-xl">
    Enter your Lichess or Chess.com profile link below. Our AI will analyze your game statistics,
    playing style, strengths, and weaknesses to provide personalized insights.
  </p>

  <div class="w-full max-w-xl mb-6 flex items-center space-x-3 bg-gray-800 p-4 rounded-lg shadow-lg">
    <input 
      type="text" 
      bind:value={profileLink} 
      placeholder="Enter Lichess or Chess.com profile link..." 
      class="flex-grow p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-sky-500 focus:border-sky-500"
      disabled={isLoading}
    />
    <button 
      on:click={handleAnalyzeProfile} 
      disabled={isLoading}
      class="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if isLoading}
        Analyzing...
      {:else}
        Analyze Profile
      {/if}
    </button>
  </div>

  {#if isLoading}
    <div class="w-full max-w-xl mt-6 p-6 border border-gray-600 rounded-md bg-gray-800 text-center">
      <p class="text-sky-400 animate-pulse">Fetching profile data and generating insights...</p>
    </div>
  {/if}

  {#if analysisResult && !isLoading}
    <div class="w-full max-w-xl mt-6 p-6 border border-gray-600 rounded-md bg-gray-800 shadow-xl">
      <h2 class="text-2xl font-semibold mb-4 text-sky-400">Analysis Results:</h2>
      <pre class="text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{analysisResult}</pre>
    </div>
  {/if}

  <!-- Placeholder for future detailed stats, charts, etc. -->
  <div class="w-full max-w-xl mt-8 text-center text-gray-500">
    <p>(More detailed statistics, game history, and charts will appear here in future updates)</p>
  </div>
</div>
