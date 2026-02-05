import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const { signup, error, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;
        try {
            await signup(username);
            navigate('/');
        } catch {
            // Error handled by context
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <h1 className="title-neon" style={{ marginBottom: '2rem' }}>JOIN THE ARENA</h1>

            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Choose Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Unique username"
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
                        {isLoading ? 'Creating...' : 'SIGN UP'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Already played before? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
                </div>
            </div>
        </div>
    );
};
