# SnakePro - Quick Start Guide

## Running the Application

### Option 1: Run Both Servers Together (Recommended)

From the **root directory**:

```bash
npm install  # First time only
npm run dev
```

This will start both the backend and frontend servers concurrently with color-coded output.

### Option 2: Run Servers Separately

#### Start the Backend Server
```bash
cd backend
make dev
```

The backend API will be available at `http://localhost:3000`

#### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## Available Commands

### Root Level Commands (Recommended)
```bash
npm run dev              # Run both backend and frontend
npm run dev:backend      # Run only backend
npm run dev:frontend     # Run only frontend
npm run build:frontend   # Build frontend for production
npm run test             # Run all tests
```

### Backend Commands
From the `backend` directory:
```bash
make dev        # Run with auto-reload
make run        # Run without auto-reload
make test       # Run tests
make test-v     # Run tests with verbose output
make clean      # Clean cache files
make init-db    # Initialize and seed the database
```

### Frontend Commands
From the `frontend` directory:
```bash
npm run dev     # Run development server
npm run build   # Build for production
npm run test    # Run tests
```

## Features

- **Signup/Login**: Create an account or login with an existing username
- **Play Snake**: Classic snake game with modern UI
- **Leaderboard**: View top scores from all players
- **Spectate**: Watch a bot player in real-time

## API Endpoints

All endpoints are prefixed with the base URL: `http://localhost:3000`

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login an existing user
- `GET /leaderboard` - Get top scores
- `GET /spectate/state` - Get current spectate game state

## Configuration

The frontend API URL can be configured via environment variable:

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

## Testing

### Run Backend Tests
```bash
cd backend
uv run pytest -v
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## Troubleshooting

### Backend won't start
- Ensure you're in the `backend` directory
- Make sure Python 3.12+ is installed
- Run `uv sync` to install dependencies

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check the console for CORS errors
- Ensure `.env` file has the correct `VITE_API_URL`

### CORS Issues
The backend is configured to allow requests from:
- `http://localhost:3000`
- `http://localhost:5173` (Vite default)

If you're running on a different port, update `main.py` in the backend.
