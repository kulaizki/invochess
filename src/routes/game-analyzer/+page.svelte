<script lang="ts">
  import { Chess } from 'chess.js';
  import { Chessground } from 'svelte-chessground';
  import { getChessApiAnalysis, type ChessApiRequest, type ChessApiResponse } from '$lib/chessApi';
  import { fade } from 'svelte/transition'; 

  let pgnInput = '';
  let game = new Chess();
  let currentFen = game.fen();
  let chessgroundComponent: Chessground; // To call methods on the component

  // State for API interaction
  let isAnalyzing = false;
  let analysisResult: ChessApiResponse | null = null;
  let analysisError: string | null = null;

  // Toast state
  let showToast = false;
  let toastMessage = '';
  let toastTimeout: ReturnType<typeof setTimeout>;

  // Configuration for Chessground
  let config = {
    fen: currentFen,
    orientation: 'white' as "white" | "black",
    movable: {
      free: false,
    },
    events: {
      // move: (orig: any, dest: any, captured: any) => { /* Handle user moves */ }
    }
  };

  function triggerToast(message: string, duration: number = 3000) {
    toastMessage = message;
    showToast = true;
    clearTimeout(toastTimeout); // Clear any existing timeout
    toastTimeout = setTimeout(() => {
      showToast = false;
    }, duration);
  }

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
      const cleanedPgnInput = pgnInput.replace(/\{[\s\S]*?\}/g, '');
      
      if (typeof newGame.loadPgn === 'function') {
        newGame.loadPgn(cleanedPgnInput);
      } else {
        console.error('loadPgn function not found in chess.js instance.');
        triggerToast('Could not load PGN. Incompatible chess.js version or PGN error.', 5000);
        return;
      }
      game = newGame;
      currentFen = game.fen();
      config = {
        ...config,
        fen: currentFen,
      };
      triggerToast('PGN Loaded Successfully!');
      await fetchAnalysis(currentFen);
    } catch (e: any) {
      console.error('Error loading PGN:', e);
      triggerToast('Invalid PGN: ' + e.message, 5000);
      analysisError = 'Failed to load PGN: ' + e.message;
      analysisResult = null;
    }
  }

</script>

{#if showToast}
  <div transition:fade={{ duration: 300 }} class="toast-notification">
    {toastMessage}
  </div>
{/if}

<div class="page-container w-full max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-center">
  <h1 class="text-3xl font-bold mb-6 text-center">Game Analyzer</h1>
  
  <div class="main-content-area w-full flex flex-col md:flex-row gap-4 md:gap-8">
    <!-- Left Column: Chessboard -->
    <div class="left-column w-full md:w-1/2 flex justify-center items-center">
      <div class="chessboard-container w-full">
        <Chessground bind:this={chessgroundComponent} {...config} />
      </div>
    </div>

    <!-- Right Column: PGN Input and Analysis -->
    <div class="right-column w-full md:w-1/2 flex flex-col gap-6">
      <div class="pgn-input-section">
        <textarea 
          bind:value={pgnInput} 
          rows="8" 
          placeholder="Paste PGN here..." 
          class="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-sky-500 focus:border-sky-500 resize-y"
        ></textarea>
        <button 
          on:click={loadPgn} 
          disabled={isAnalyzing}
          class="mt-2 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isAnalyzing ? 'Analyzing...' : 'Load PGN & Analyze'}
        </button>
      </div>

      <div class="analysis-section w-full p-4 border border-gray-600 rounded-md bg-gray-800 min-h-[200px]">
        <h2 class="text-xl font-semibold mb-2">Analysis:</h2>
        {#if isAnalyzing}
          <p class="text-gray-400">Fetching analysis from chess-api.com...</p>
        {:else if analysisError}
          <p class="text-red-400"><strong>Error:</strong> {analysisError}</p>
          <pre class="text-sm text-gray-300 whitespace-pre-wrap mt-2">Current FEN: {currentFen}</pre>
        {:else if analysisResult}
          <p><strong>Evaluation:</strong> {analysisResult.eval} ({analysisResult.text})</p>
          <p><strong>Best Move (SAN):</strong> {analysisResult.san}</p>
          <p><strong>Depth:</strong> {analysisResult.depth}</p>
          <p><strong>Win Chance:</strong> {(analysisResult.winChance * 100).toFixed(2)}%</p>
          <p><strong>Continuation:</strong> {analysisResult.continuationArr.join(' ')}</p>
          <p class="text-sm text-gray-400 mt-2">FEN from API: {analysisResult.fen}</p>
        {:else}
          <p class="text-gray-400">Load a PGN to see analysis.</p>
          <pre class="text-sm text-gray-300 whitespace-pre-wrap mt-2">Current FEN: {currentFen}</pre>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .chessboard-container :global(.cg-wrap) {
    width: 100% !important; 
    height: 0 !important; 
    padding-bottom: 100%;
    position: relative;
    display: block; 
  }
  .chessboard-container :global(cg-board) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) { 
    .main-content-area {
      flex-direction: column;
    }
    .left-column,
    .right-column {
      width: 100%;
    }
    .chessboard-container {
        max-width: 400px; 
        margin-left: auto;
        margin-right: auto;
    }
    .chessboard-container :global(.cg-wrap) {
        padding-bottom: 100%; 
    }
  }

  .toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #00a1f1; /* Sky blue background */
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 9999; /* Ensure it's on top */
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
</style>