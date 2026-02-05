import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="app-container">
            <header style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '2rem'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" className="title-neon" style={{ fontSize: '2rem', textDecoration: 'none' }}>
                        SNAKE PRO
                    </Link>

                    <nav>
                        {user ? (
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Play</Link>
                                <Link to="/leaderboard" style={{ color: 'var(--text-secondary)' }}>Leaderboard</Link>
                                <Link to="/spectate" style={{ color: 'var(--text-secondary)' }}>Spectate</Link>
                                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{user.username}</span>
                                <button onClick={handleLogout} style={{ color: 'var(--accent-color)' }}>Logout</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', background: 'transparent', color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>Login</Link>
                                <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>Sign Up</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            <main className="container">
                <Outlet />
            </main>
        </div>
    );
};
