<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let worker: Worker | null = null;
    let workerMessages: string[] = [];
    let stockfishReady = false;
    let bestMove = '';
    let evaluation = '';

    onMount(() => {
        // Vite/SvelteKit specific way to import a worker
        // The ?url suffix tells Vite to provide the URL of the worker script
        worker = new Worker(new URL('../../lib/stockfish.worker.ts', import.meta.url));

        worker.onmessage = (event: MessageEvent) => {
            const message = event.data as string;
            workerMessages = [...workerMessages, message];
            console.log('Main thread received:', message);

            if (message === 'worker_ready') {
                stockfishReady = true;
                workerMessages = [...workerMessages, "Stockfish Worker is ready to receive commands."];
                // Automatically send ucinewgame and position after worker is ready
                sendCommand('ucinewgame');
                sendCommand('position startpos');
            } else if (message.startsWith('bestmove')) {
                bestMove = message.split(' ')[1] || 'N/A';
            } else if (message.startsWith('info')) {
                // Simplistic evaluation parsing - look for "score cp"
                const cpMatch = message.match(/score cp (-?\d+)/);
                if (cpMatch && cpMatch[1]) {
                    evaluation = (parseInt(cpMatch[1]) / 100).toFixed(2);
                }
            }
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
            workerMessages = [...workerMessages, `WORKER ERROR: ${error.message}`];
        };

        return () => {
            if (worker) {
                worker.terminate();
                workerMessages = [...workerMessages, "Worker terminated."];
                stockfishReady = false;
            }
        };
    });

    function sendCommand(command: string) {
        if (worker && stockfishReady) {
            worker.postMessage(command);
            workerMessages = [...workerMessages, `SENT: ${command}`];
            // Clear previous results when sending new go command
            if (command.startsWith('go')) {
                bestMove = 'Analyzing...';
                evaluation = 'Analyzing...';
            }
        } else {
            workerMessages = [...workerMessages, "Cannot send command: Worker not ready or not initialized."];
            console.warn('Cannot send command:', command, 'Worker ready:', stockfishReady);
        }
    }

    function getBestMove() {
        sendCommand('go depth 15'); // Example: analyze for a certain depth
    }

    function evaluatePosition() {
        // For a quick eval, depth 1 might be enough or a short movetime
        sendCommand('go depth 10'); // Or sendCommand('go movetime 1000');
    }

</script>

<div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Stockfish Worker Test</h1>

    <div class="mb-4">
        <button 
            class="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded mr-2 disabled:opacity-50"
            on:click={getBestMove} 
            disabled={!stockfishReady}>Get Best Move (Depth 15)</button>
        <button 
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            on:click={evaluatePosition} 
            disabled={!stockfishReady}>Evaluate Position (Depth 10)</button>
    </div>

    {#if stockfishReady}
        <p class="text-green-400 mb-2">Stockfish Status: Ready</p>
        <p class="mb-1">Best Move: <span class="font-mono text-sky-300">{bestMove || '---'}</span></p>
        <p class="mb-4">Evaluation: <span class="font-mono text-sky-300">{evaluation || '---'}</span> (centipawns)</p>
    {:else}
        <p class="text-yellow-400 mb-4">Stockfish Status: Initializing or not ready...</p>
    {/if}

    <h2 class="text-xl font-semibold mt-6 mb-2">Worker Messages:</h2>
    <div class="bg-gray-800 p-4 rounded-md h-96 overflow-y-auto text-sm font-mono">
        {#each workerMessages as msg, i}
            <p class="{msg.startsWith('SENT:') ? 'text-yellow-300' : msg.startsWith('WORKER ERROR') ? 'text-red-400' : msg.includes('error') ? 'text-red-400' : 'text-gray-300'}">
                <span class="text-gray-500 mr-2">{i}:</span>{msg}
            </p>
        {/each}
    </div>
</div> 