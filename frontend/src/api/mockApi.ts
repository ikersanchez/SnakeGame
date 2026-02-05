// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface User {
    id: string;
    username: string;
}

export interface Score {
    id: string;
    username: string;
    score: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface SpectateState {
    snake: Point[];
    food: Point;
    score: number;
    username: string;
}

// HTTP API Client
class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.detail || `HTTP ${response.status}: ${response.statusText}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Network request failed');
        }
    }

    // --- Auth ---
    async signup(username: string): Promise<User> {
        return this.request<User>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username }),
        });
    }

    async login(username: string): Promise<User> {
        return this.request<User>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username }),
        });
    }

    // --- Leaderboard ---
    async getLeaderboard(): Promise<Score[]> {
        return this.request<Score[]>('/leaderboard');
    }

    async submitScore(username: string, score: number): Promise<Score> {
        return this.request<Score>('/leaderboard', {
            method: 'POST',
            body: JSON.stringify({ username, score }),
        });
    }

    // --- Spectate ---
    async getSpectateState(): Promise<SpectateState> {
        return this.request<SpectateState>('/spectate/state');
    }
}

// Export singleton instance
export const Api = new ApiClient(API_BASE_URL);

// Maintain backward compatibility with existing code
export const MockApi = Api;
