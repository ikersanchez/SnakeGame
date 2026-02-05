import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnakeGame } from '../engine/useSnakeGame';
import { GameCanvas } from '../components/GameCanvas';
import type { GameMode } from '../engine/types';
import { useAuth } from '../context/AuthContext';
import { MockApi } from '../api/mockApi';

export const GamePage: React.FC = () => {
    const { mode } = useParams<{ mode: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Default to WALLS if invalid mode, though routing should prevent this or we handle
    const validMode = (mode === 'PASS_THROUGH' ? 'PASS_THROUGH' : 'WALLS') as GameMode;

    const { state: gameState, changeDirection, restart, togglePause } = useSnakeGame(validMode);

    useEffect(() => {
        if (gameState.isGameOver && user && gameState.score > 0) {
            MockApi.submitScore(user.username, gameState.score)
                .catch(err => console.error('Failed to submit score:', err));
        }
    }, [gameState.isGameOver, user, gameState.score]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': changeDirection('UP'); break;
                case 'ArrowDown': changeDirection('DOWN'); break;
                case 'ArrowLeft': changeDirection('LEFT'); break;
                case 'ArrowRight': changeDirection('RIGHT'); break;
                case ' ': togglePause(); break;
                case 'Escape': togglePause(); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [changeDirection, togglePause]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px', alignItems: 'center' }}>
                <button onClick={() => navigate('/')} style={{ color: 'var(--text-secondary)' }}>← Back</button>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Score: <span style={{ color: 'var(--primary-color)' }}>{gameState.score}</span>
                </div>
                <button onClick={togglePause} style={{ color: 'var(--text-primary)' }}>
                    {gameState.isPaused ? 'RESUME' : 'PAUSE'}
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                <GameCanvas gameState={gameState} width={500} height={500} />

                {gameState.isGameOver && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px'
                    }}>
                        <h2 className="title-neon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>GAME OVER</h2>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Final Score: {gameState.score}</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={restart}
                                className="btn-primary"
                            >
                                TRY AGAIN
                            </button>
                            <button
                                onClick={() => navigate('/leaderboard')}
                                className="btn-primary"
                                style={{ background: 'transparent', border: '1px solid white', color: 'white' }}
                            >
                                LEADERBOARD
                            </button>
                        </div>
                    </div>
                )}

                {gameState.isPaused && !gameState.isGameOver && (
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2rem',
                        borderRadius: '8px',
                        pointerEvents: 'none'
                    }}>
                        <h2>PAUSED</h2>
                    </div>
                )}
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Use Arrow Keys to Move • Space to Pause
            </p>
        </div>
    );
};
