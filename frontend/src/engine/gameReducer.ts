import type { GameState, Point, Direction, GameMode } from './types';
import { GRID_SIZE } from './types';

// Utilities
const getRandomPoint = (snake: Point[]): Point => {
    let newPoint: Point;
    while (true) {
        newPoint = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        // Check if on snake
        const onSnake = snake.some(s => s.x === newPoint.x && s.y === newPoint.y);
        if (!onSnake) break;
    }
    return newPoint;
};

export const INITIAL_STATE: GameState = {
    snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }], // Tail down
    food: { x: 5, y: 5 }, // Fixed start for determinism, or randomized
    score: 0,
    isGameOver: false,
    direction: 'UP',
    isPaused: false,
};

type Action =
    | { type: 'TICK'; mode: GameMode }
    | { type: 'CHANGE_DIRECTION'; direction: Direction }
    | { type: 'RESTART' }
    | { type: 'TOGGLE_PAUSE' };

export const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'RESTART':
            return { ...INITIAL_STATE, food: getRandomPoint(INITIAL_STATE.snake) };

        case 'TOGGLE_PAUSE':
            return { ...state, isPaused: !state.isPaused };

        case 'CHANGE_DIRECTION': {
            if (state.isGameOver || state.isPaused) return state;
            // Prevent 180 turn
            const { direction } = state;
            const newDir = action.direction;
            if (
                (direction === 'UP' && newDir === 'DOWN') ||
                (direction === 'DOWN' && newDir === 'UP') ||
                (direction === 'LEFT' && newDir === 'RIGHT') ||
                (direction === 'RIGHT' && newDir === 'LEFT')
            ) {
                return state;
            }
            return { ...state, direction: newDir };
        }

        case 'TICK': {
            if (state.isGameOver || state.isPaused) return state;

            const head = { ...state.snake[0] };

            // Move Head
            switch (state.direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Check Walls / Wrap
            if (action.mode === 'WALLS') {
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    return { ...state, isGameOver: true };
                }
            } else {
                // Pass Through
                if (head.x < 0) head.x = GRID_SIZE - 1;
                if (head.x >= GRID_SIZE) head.x = 0;
                if (head.y < 0) head.y = GRID_SIZE - 1;
                if (head.y >= GRID_SIZE) head.y = 0;
            }

            // Check Self Collision
            // We check against all body parts except the minimal tail which might move away
            // But simpler is just check all. If we hit the tail tip, it technically moves away same frame,
            // but usually snake head hitting any part is game over.
            if (state.snake.some(p => p.x === head.x && p.y === head.y)) {
                // Special case: if we hit the very last tail segment, but aren't growing, the tail moves.
                // However, standard snake usually kills you if you touch any part.
                // Let's implement strict collision for now.
                return { ...state, isGameOver: true };
            }

            const newSnake = [head, ...state.snake];
            let newScore = state.score;
            let newFood = state.food;

            // Check Food
            if (head.x === state.food.x && head.y === state.food.y) {
                newScore += 10;
                newFood = getRandomPoint(newSnake);
                // Don't pop tail -> Grow
            } else {
                newSnake.pop(); // Remove tail
            }

            return {
                ...state,
                snake: newSnake,
                score: newScore,
                food: newFood,
            };
        }

        default:
            return state;
    }
};
