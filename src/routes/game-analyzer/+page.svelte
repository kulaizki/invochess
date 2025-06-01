<script lang="ts">
  import { Chess } from 'chess.js';
  import { Chessground } from 'svelte-chessground';

  let pgnInput = '';
  let game = new Chess();
  let currentFen = game.fen();
  let chessgroundComponent: Chessground; // To call methods on the component

  // Configuration for Chessground
  let config = {
    fen: currentFen,
    orientation: 'white' as "white" | "black", // Explicitly type orientation
    movable: {
      free: false, 
      // color: 'white', 
      // dests: toDests(game) 
    },
    events: {
      // move: (orig: any, dest: any, captured: any) => { /* Handle user moves */ }
    }
  };

  function loadPgn() {
    try {
      const newGame = new Chess();
      // Use loadPgn as per chess.js v1.x API and linter suggestion
      if (typeof newGame.loadPgn === 'function') {
        newGame.loadPgn(pgnInput);
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
    } catch (e: any) {
      console.error('Error loading PGN:', e);
      alert('Invalid PGN: ' + e.message);
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
    class="mb-6 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md transition-colors duration-150"
  >
    Load PGN & Analyze
  </button>

  <div class="w-full max-w-md mb-4">
    <Chessground bind:this={chessgroundComponent} {...config} />
  </div>

  <!-- Placeholder for Stockfish analysis output -->
  <div class="w-full max-w-2xl mt-6 p-4 border border-gray-600 rounded-md bg-gray-800">
    <h2 class="text-xl font-semibold mb-2">Analysis:</h2>
    <p class="text-gray-400">Stockfish analysis will appear here...</p>
    <pre class="text-sm text-gray-300 whitespace-pre-wrap">Current FEN: {currentFen}</pre>
  </div>
</div>

<style>
  :global(.cg-wrap) {
    width: 100%;
    height: auto; 
    max-width: 500px; /* Or your preferred max size */
    margin: 0 auto;
  }
</style>