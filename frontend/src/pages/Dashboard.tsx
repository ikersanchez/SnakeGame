import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { GameMode } from '../engine/types';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleStartGame = (mode: GameMode) => {
        navigate(`/game/${mode}`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                Ready, <span className="title-neon">{user?.username}</span>?
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                Select your game mode to begin
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Wall Mode Card */}
                <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--accent-color)' }}
                    onClick={() => handleStartGame('WALLS')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>WALLS MODE</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Classic snake experience. Hit the wall and you die. High risk, high reward.
                    </p>
                    <button className="btn-primary" style={{ background: 'var(--accent-color)', color: 'white', width: '100%' }}>
                        PLAY WALLS
                    </button>
                </div>

                {/* Pass Through Mode Card */}
                <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--secondary-color)' }}
                    onClick={() => handleStartGame('PASS_THROUGH')}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>PASS-THROUGH</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Modern twist. Walls are portals. Wrap around the screen for infinite movement strategies.
                    </p>
                    <button className="btn-primary" style={{ background: 'var(--secondary-color)', color: 'black', width: '100%' }}>
                        PLAY PASS-THROUGH
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>OR WATCH THE PROS</h3>
                <button
                    className="btn-primary"
                    style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/spectate')}
                >
                    ENTER SPECTATOR MODE
                </button>
            </div>
        </div>
    );
};
