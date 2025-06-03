// src/lib/stockfish.worker.ts
/// <reference lib="webworker" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function Stockfish(options?: any): Promise<any>; // Ensure options can be passed

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let stockfish: any;
let isStockfishReady = false;

// We won't set self.Module initially, we will pass locateFile directly to Stockfish()

async function initStockfish() {
    try {
        const jsPath = '/stockfish_engine/stockfish-nnue-16-single.js';
        console.log(`WORKER: Attempting to import script from: ${jsPath}`);
        importScripts(jsPath);
        console.log(`WORKER: Script imported successfully: ${jsPath}`);

        if (typeof Stockfish === 'undefined') {
            const errorMsg = 'WORKER CRITICAL: Stockfish global function is UNDEFINED after script import.';
            console.error(errorMsg);
            self.postMessage(`error_initializing_stockfish: ${errorMsg}`);
            return;
        }
        console.log('WORKER: Stockfish() global function IS DEFINED. Attempting to initialize...');
        
        const stockfishOptions = {
            locateFile: (path: string, scriptDirectory?: string) => {
                console.log(`%%%% WORKER: Stockfish() INSTANCE locateFile CALLED %%%%`);
                console.log(`%%%% Path: "${path}", ScriptDirectory: "${scriptDirectory}" %%%%`);
                if (path.endsWith('.wasm')) {
                    const correctWasmPath = `/stockfish_engine/${path}`;
                    console.log(`%%%% Returning WASM path: "${correctWasmPath}" %%%%`);
                    return correctWasmPath;
                }
                const fallbackPath = scriptDirectory ? scriptDirectory + path : path;
                console.warn(`%%%% WORKER: Stockfish() INSTANCE locateFile called for UNEXPECTED file: "${path}", falling back to: "${fallbackPath}" %%%%`);
                return fallbackPath;
            }
        };

        stockfish = await Stockfish(stockfishOptions); 
        console.log('WORKER: Stockfish instance awaited successfully.');

        stockfish.addMessageListener((message: string) => {
            if (message === 'uciok') {
                stockfish.postMessage('isready');
            } else if (message === 'readyok') {
                isStockfishReady = true;
                self.postMessage('worker_ready');
                console.log('WORKER: Stockfish is READY (uciok, readyok received).');
            } else {
                self.postMessage(message);
            }
        });
        console.log('WORKER: Sending "uci" to engine.');
        stockfish.postMessage('uci');

    } catch (error) {
        const err = error as Error;
        const errorMsg = `WORKER CATCH BLOCK: ${err.message}`;
        console.error(errorMsg, err.stack);
        self.postMessage(`error_initializing_stockfish_detail: ${errorMsg} (Stack: ${err.stack ? err.stack.substring(0,250) : 'N/A'})`);
        self.postMessage(`error_initializing_stockfish: ${errorMsg}`);
    }
}

initStockfish();

self.onmessage = (event: MessageEvent) => {
    if (stockfish && isStockfishReady && typeof event.data === 'string') {
        stockfish.postMessage(event.data);
    } else {
        const reason = !stockfish ? "not_initialized" : "not_ready_or_command_invalid";
        const cmd = typeof event.data === 'string' ? event.data.substring(0, 50) : '[non-string_command]';
        console.warn(`WORKER: Stockfish ${reason}. Command '${cmd}...' ignored.`);
        self.postMessage(`error_stockfish_${reason}_command_ignored: ${cmd}`);
    }
}; 