import { useReducer, useEffect, useCallback } from 'react';
import { gameReducer, INITIAL_STATE } from './gameReducer';
import type { Direction, GameMode } from './types';

export const useSnakeGame = (mode: GameMode) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (!state.isGameOver && !state.isPaused) {
            interval = setInterval(() => {
                dispatch({ type: 'TICK', mode });
            }, 150); // Game Speed
        }
        return () => clearInterval(interval);
    }, [state.isGameOver, state.isPaused, mode]);

    const changeDirection = useCallback((direction: Direction) => {
        dispatch({ type: 'CHANGE_DIRECTION', direction });
    }, []);

    const restart = useCallback(() => {
        dispatch({ type: 'RESTART' });
    }, []);

    const togglePause = useCallback(() => {
        dispatch({ type: 'TOGGLE_PAUSE' });
    }, []);

    return {
        state,
        changeDirection,
        restart,
        togglePause
    };
};
