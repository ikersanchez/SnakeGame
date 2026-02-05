import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const { login, error, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;
        try {
            await login(username);
            navigate('/');
        } catch {
            // Error handled by context
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <h1 className="title-neon" style={{ marginBottom: '2rem' }}>WELCOME BACK</h1>

            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoFocus
                        />
                    </div>

                    {error && <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>{error}</div>}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                        style={{ width: '100%' }}
                    >
                        {isLoading ? 'Loading...' : 'LOGIN'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};
