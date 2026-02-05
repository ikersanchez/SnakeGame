import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';

import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import { GamePage } from './pages/GamePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SpectatePage } from './pages/SpectatePage';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="game/:mode" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
                        <Route path="leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
                        <Route path="spectate" element={<ProtectedRoute><SpectatePage /></ProtectedRoute>} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
