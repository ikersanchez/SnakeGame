import { describe, it, expect } from 'vitest';
import { gameReducer, INITIAL_STATE } from './gameReducer';
import type { GameState } from './types';

describe('gameReducer', () => {
    it('should move the snake UP', () => {
        const initialState: GameState = {
            ...INITIAL_STATE,
            snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }],
            direction: 'UP'
        };
        const newState = gameReducer(initialState, { type: 'TICK', mode: 'WALLS' });
        expect(newState.snake[0]).toEqual({ x: 10, y: 9 });
    });

    it('should prevent 180 degree turns', () => {
        const initialState: GameState = {
            ...INITIAL_STATE,
            direction: 'UP'
        };
        const newState = gameReducer(initialState, { type: 'CHANGE_DIRECTION', direction: 'DOWN' });
        expect(newState.direction).toBe('UP');
    });

    describe('WALLS Mode', () => {
        it('should die when hitting a wall', () => {
            const initialState: GameState = {
                ...INITIAL_STATE,
                snake: [{ x: 0, y: 10 }], // At Left Edge
                direction: 'LEFT'
            };
            const newState = gameReducer(initialState, { type: 'TICK', mode: 'WALLS' });
            expect(newState.isGameOver).toBe(true);
        });
    });

    describe('PASS_THROUGH Mode', () => {
        it('should wrap around when hitting a wall', () => {
            const initialState: GameState = {
                ...INITIAL_STATE,
                snake: [{ x: 0, y: 10 }], // At Left Edge
                direction: 'LEFT'
            };
            const newState = gameReducer(initialState, { type: 'TICK', mode: 'PASS_THROUGH' });
            expect(newState.isGameOver).toBe(false);
            expect(newState.snake[0].x).toBe(19); // 20 - 1
        });
    });

    it('should grow and increase score when eating food', () => {
        const initialState: GameState = {
            ...INITIAL_STATE,
            snake: [{ x: 10, y: 10 }],
            food: { x: 10, y: 9 }, // Food is directly UP
            direction: 'UP',
            score: 0
        };
        const newState = gameReducer(initialState, { type: 'TICK', mode: 'WALLS' });
        expect(newState.score).toBe(10);
        expect(newState.snake.length).toBe(2); // Grew
        expect(newState.snake[0]).toEqual({ x: 10, y: 9 }); // Head on food
    });

    it('should die when hitting self', () => {
        // Create a snake that is about to hit itself
        //      H
        //      |
        //      |
        //      .---.
        //      |   |
        //      .---.
        // Impossible in 3 moves but let's setup a state manually
        const snake = [
            { x: 10, y: 10 }, // Head
            { x: 10, y: 11 },
            { x: 11, y: 11 },
            { x: 11, y: 10 }, // Body part right of head
        ];
        const initialState: GameState = {
            ...INITIAL_STATE,
            snake,
            direction: 'RIGHT' // Move Head (10,10) RIGHT to (11,10) which is occupied
        };
        const newState = gameReducer(initialState, { type: 'TICK', mode: 'WALLS' });
        expect(newState.isGameOver).toBe(true);
    });
});
