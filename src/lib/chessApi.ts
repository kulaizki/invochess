export interface ChessApiRequest {
    fen: string;
    variants?: number; // max: 5, default: 1
    depth?: number; // max: 18, default: 12
    maxThinkingTime?: number; // max: 100, default: 50 (ms)
    searchmoves?: string; // evaluate specific moves only, ex. 'd2d4 e2e4'
    input?: string; 
}

export interface ChessApiResponse {
    text: string;
    eval: number;
    move: string; // e.g., "b7b8q"
    fen: string;
    depth: number;
    winChance: number;
    continuationArr: string[];
    mate: number | null;
    centipawns: string;
    san: string; // e.g., "b8=Q+"
    lan: string; // e.g., "b7b8q"
    turn: 'w' | 'b';
    color: 'w' | 'b'; 
    piece: string; // e.g., "p"
    flags: string; // e.g., "np"
    isCapture: boolean;
    isCastling: boolean;
    isPromotion: boolean;
    from: string; // e.g., "b7"
    to: string; // e.g., "b8"
    fromNumeric: string; // e.g., "27"
    toNumeric: string; // e.g., "28"
    taskId: string;
    time: number; // milliseconds
    type: 'move' | 'bestmove' | 'info'; // "move" is progressive, "bestmove" is final.
    captured?: string; // piece name like 'r', 'n', etc.
    promotion?: 'q' | 'r' | 'b' | 'n';
}

const API_URL = 'https://chess-api.com/v1';

export async function getChessApiAnalysis(requestData: ChessApiRequest): Promise<ChessApiResponse> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Chess API request failed with status ${response.status}: ${errorText}`);
        }

        return await response.json() as ChessApiResponse;
    } catch (error) {
        console.error("Error calling Chess API:", error);
        throw error;
    }
} 