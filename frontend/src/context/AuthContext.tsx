import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockApi } from '../api/mockApi';
import type { User } from '../api/mockApi';

interface AuthContextType {
    user: User | null;
    login: (username: string) => Promise<void>;
    signup: (username: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'snakepro_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for persisted session
        const storedUser = localStorage.getItem(SESSION_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const loggedInUser = await MockApi.login(username);
            setUser(loggedInUser);
            localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (username: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const newUser = await MockApi.signup(username);
            setUser(newUser);
            localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        } catch (err: any) {
            setError(err.message || 'Signup failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
