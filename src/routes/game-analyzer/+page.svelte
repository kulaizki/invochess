<script lang="ts">
  import { Chess } from 'chess.js';
  import { Chessground } from 'svelte-chessground';
  import { getChessApiAnalysis, type ChessApiRequest, type ChessApiResponse } from '$lib/chessApi';

  let pgnInput = '';
  let game = new Chess();
  let currentFen = game.fen();
  let chessgroundComponent: Chessground; // To call methods on the component

  // State for API interaction
  let isAnalyzing = false;
  let analysisResult: ChessApiResponse | null = null;
  let analysisError: string | null = null;

  // Configuration for Chessground
  let config = {
    fen: currentFen,
    orientation: 'white' as "white" | "black", // Explicitly type orientation
    movable: {
      free: false,
    },
    events: {
      // move: (orig: any, dest: any, captured: any) => { /* Handle user moves */ }
    }
  };

  async function fetchAnalysis(fenToAnalyze: string) {
    isAnalyzing = true;
    analysisResult = null;
    analysisError = null;
    try {
      const request: ChessApiRequest = { fen: fenToAnalyze };
      analysisResult = await getChessApiAnalysis(request);
    } catch (e: any) {
      analysisError = e.message || "An unknown error occurred during analysis";
    }
    isAnalyzing = false;
  }

  async function loadPgn() {
    try {
      const newGame = new Chess();
      // Preprocess PGN to remove comments within curly braces
      const cleanedPgnInput = pgnInput.replace(/\{[\s\S]*?\}/g, '');
      
      if (typeof newGame.loadPgn === 'function') {
        newGame.loadPgn(cleanedPgnInput);
      } else {
        console.error('loadPgn function not found in chess.js instance.');
        alert('Could not load PGN. Incompatible chess.js version or PGN error.');
        return;
      }
      game = newGame;
      currentFen = game.fen();
      config = {
        ...config,
        fen: currentFen,
      };
      alert('PGN Loaded Successfully!');
      await fetchAnalysis(currentFen); // Fetch analysis for the new FEN
    } catch (e: any) {
      console.error('Error loading PGN:', e);
      alert('Invalid PGN: ' + e.message);
      analysisError = 'Failed to load PGN: ' + e.message; // Show more specific error
      analysisResult = null;
    }
  }

</script>

<div class="container mx-auto p-8 flex flex-col items-center">
  <h1 class="text-3xl font-bold mb-6">Game Analyzer</h1>
  
  <div class="w-full max-w-2xl mb-6">
    <textarea 
      bind:value={pgnInput} 
      rows="6" 
      placeholder="Paste PGN here..." 
      class="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-sky-500 focus:border-sky-500 resize-none"
    ></textarea>
  </div>
  
  <button 
    on:click={loadPgn} 
    disabled={isAnalyzing}
    class="mb-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors duration-150 disabled:opacity-50"
  >
    {isAnalyzing ? 'Analyzing...' : 'Load PGN & Analyze'}
  </button>

  <div class="w-full max-w-md mb-4">
    <Chessground bind:this={chessgroundComponent} {...config} />
  </div>

  <!-- Stockfish analysis output -->
  <div class="w-full max-w-2xl mt-6 p-4 border border-gray-600 rounded-md bg-gray-800">
    <h2 class="text-xl font-semibold mb-2">Analysis:</h2>
    {#if isAnalyzing}
      <p class="text-gray-400">Fetching analysis from chess-api.com...</p>
    {:else if analysisError}
      <p class="text-red-400"><strong>Error:</strong> {analysisError}</p>
      <pre class="text-sm text-gray-300 whitespace-pre-wrap">Current FEN: {currentFen}</pre>
    {:else if analysisResult}
      <p><strong>Evaluation:</strong> {analysisResult.eval} ({analysisResult.text})</p>
      <p><strong>Best Move (SAN):</strong> {analysisResult.san}</p>
      <p><strong>Depth:</strong> {analysisResult.depth}</p>
      <p><strong>Win Chance:</strong> {(analysisResult.winChance * 100).toFixed(2)}%</p>
      <p><strong>Continuation:</strong> {analysisResult.continuationArr.join(' ')}</p>
      <p class="text-sm text-gray-400 mt-2">Raw FEN: {analysisResult.fen}</p>
      <details class="mt-2">
        <summary class="cursor-pointer text-sky-400 hover:text-sky-300">Show full API response</summary>
        <pre class="text-xs text-gray-300 whitespace-pre-wrap bg-gray-700 p-2 rounded-md mt-1">{JSON.stringify(analysisResult, null, 2)}</pre>
      </details>
    {:else}
      <p class="text-gray-400">Load a PGN to see analysis.</p>
      <pre class="text-sm text-gray-300 whitespace-pre-wrap">Current FEN: {currentFen}</pre>
    {/if}
  </div>
</div>

<style>
  :global(.cg-wrap) {
    width: 100%;
    height: auto; 
    max-width: 500px; 
    margin: 0 auto;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>