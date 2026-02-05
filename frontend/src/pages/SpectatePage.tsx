import React, { useEffect, useState } from 'react';
import { MockApi } from '../api/mockApi';
import { GameCanvas } from '../components/GameCanvas';
import type { GameState } from '../engine/types';
import { INITIAL_STATE } from '../engine/gameReducer';

export const SpectatePage: React.FC = () => {
    // We need a full GameState to satisfy GameCanvas prop
    // We'll mock it entirely here or fetch partials from MockApi
    const [spectateState, setSpectateState] = useState<Partial<GameState> | null>(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch spectate state from backend at regular intervals
        const fetchState = async () => {
            try {
                const state = await MockApi.getSpectateState();
                setSpectateState(state);
                setUsername(state.username);
            } catch (error) {
                console.error('Failed to fetch spectate state:', error);
            }
        };

        // Initial fetch
        fetchState();

        // Poll for updates
        const interval = setInterval(fetchState, 200);

        return () => clearInterval(interval);
    }, []);

    if (!spectateState) return <div>Loading Stream...</div>;

    // Merge with initial structure to ensure type safety
    const displayState: GameState = {
        ...INITIAL_STATE,
        ...spectateState as any, // Cast for simplicity in mock
        isGameOver: false,
        isPaused: false
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                    display: 'inline-block',
                    width: '10px', height: '10px',
                    background: 'red', borderRadius: '50%',
                    boxShadow: '0 0 10px red',
                    animation: 'blink 1s infinite'
                }} />
                <h2 style={{ margin: 0 }}>WATCHING: <span style={{ color: 'var(--secondary-color)' }}>{username}</span></h2>
            </div>

            <GameCanvas gameState={displayState} width={500} height={500} />

            <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};
