export type Point = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameMode = 'WALLS' | 'PASS_THROUGH';

export interface GameState {
    snake: Point[];
    food: Point;
    score: number;
    isGameOver: boolean;
    direction: Direction;
    isPaused: boolean;
}

export const GRID_SIZE = 20; // 20x20 grid
