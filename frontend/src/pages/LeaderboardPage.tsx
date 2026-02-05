import React, { useEffect, useState } from 'react';
import { MockApi } from '../api/mockApi';
import type { Score } from '../api/mockApi';

export const LeaderboardPage: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        MockApi.getLeaderboard().then(setScores);
    }, []);

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '2rem' }}>
            <h1 className="title-neon" style={{ textAlign: 'center', marginBottom: '3rem' }}>HALL OF FAME</h1>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>RANK</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>PLAYER</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((s, index) => (
                            <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem', color: index < 3 ? 'var(--primary-color)' : 'white', fontWeight: 'bold' }}>
                                    #{index + 1}
                                </td>
                                <td style={{ padding: '1rem' }}>{s.username}</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                                    {s.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
